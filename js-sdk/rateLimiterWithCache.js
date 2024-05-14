/**
 * write a rate limiter as such
 *  - which is singleTon
 *  - it takes ratelimit
 *      - allows only those number of parallel requests at a time.
 *      - If requests are more than given limit, queue those first and later once any api call is resolved then return the response.
 * - It also caches the Response for given time
 *     - if response is present in cache and has not expired then pick from the cache first
 *     - if response has expired then call the api and restore the response.
 */

class RateLimiterWithCache {
  allowedRequestsPerSecCount;
  currentRunningTasks = 0;
  requestQueue = [];
  responseCache = new Map();

  constructor(rateLimit = 3) {
    if (RateLimiterWithCache.instance) {
      return RateLimiterWithCache.instance;
    }

    this.allowedRequestsPerSecCount = rateLimit;
    RateLimiterWithCache.instance = this;
  }

  async _checkAndExecuteFromQueue() {
    if (this.requestQueue.length) {
      const { request, args, resolve } = this.requestQueue.shift();
      resolve(this._checkTheCacheOrExecuteRequest(request, args));
    }
  }

  async _executeRequest(apiRequest, args) {
    this.currentRunningTasks++;
    return new Promise(async (resolve) => {
      const response = await apiRequest(...args);
      this.responseCache.set(JSON.stringify(args), {
        response,
        lastUsedAt: Date.now(),
      });

      resolve(response);
      this.currentRunningTasks--;
      this._checkAndExecuteFromQueue();
    });
  }

  _checkTheCacheOrExecuteRequest(request, args) {
    let key = JSON.stringify(args);
    if (this.responseCache.has(key)) {
      const { response, lastUsedAt } = this.responseCache.get(key);
      if (Date.now() - lastUsedAt < 3000) {
        return Promise.resolve(response);
      }
    }
    return this._executeRequest(request, args);
  }

  _addToTheQueue(request, args) {
    return new Promise((resolve) => {
      this.requestQueue.push({ request, args, resolve });
    });
  }

  invokeApi(request) {
    return (...args) => {
      return this.currentRunningTasks === this.allowedRequestsPerSecCount
        ? this._addToTheQueue(request, args)
        : this._checkTheCacheOrExecuteRequest(request, args);
    };
  }
}

function apiCall(args) {
  console.log("**********  api called for", args);
  return new Promise((res) => {
    setTimeout(() => {
      res(args);
    }, 1000);
  });
}

function waitFor(timeInMs) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, timeInMs);
  });
}

const rateLimiter = new RateLimiterWithCache();

const apiCallWithRateLimiter = rateLimiter.invokeApi(apiCall);

apiCallWithRateLimiter(100).then(console.log);
apiCallWithRateLimiter(200).then(console.log);
apiCallWithRateLimiter(300).then(console.log);
apiCallWithRateLimiter(400).then(console.log);
apiCallWithRateLimiter(500).then(console.log);
apiCallWithRateLimiter(200).then(console.log);
apiCallWithRateLimiter(100).then(console.log);

// should not call the api
setTimeout(() => {
  apiCallWithRateLimiter(300).then(console.log);
}, 2000);

// cache invalidated, it should call the api
setTimeout(() => {
  apiCallWithRateLimiter(100).then(console.log);
}, 5000);
