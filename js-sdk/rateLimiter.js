/**
 * Build a rate limiter which does the following
 *
 *  1 - Allows a given number of requests per seconds.
 *  2 - If more than given number requests are coming in then
 *      2a - return an error for extra requests
 */

class RateLimiter {
  #allowedRequestsPerSecCount;
  #currentRunningTasks = 0;

  constructor(requestCount = 2) {
    this.#allowedRequestsPerSecCount = requestCount;
  }

  _throwError(_ = {}, args = {}) {
    return new Error(
      "Maxium request limit reached, could not run the task",
      args
    );
  }

  _executeRequest(task, args) {
    this.#currentRunningTasks++;
    return task(args).finally(() => {
      this.#currentRunningTasks--;
    });
  }

  sendRequest(task, ...args) {
    return this.#currentRunningTasks === this.#allowedRequestsPerSecCount
      ? this._throwError(task, ...args)
      : this._executeRequest(task, ...args);
  }
}

const rateLimiter = new RateLimiter();

const mockRequest = (id) => {
  return new Promise((resolve) => {
    console.log("Executing Request-", id);
    setTimeout(() => {
      console.log("Resolving Request- ", id);
      resolve();
    }, 1000);
  });
};

console.log(rateLimiter.sendRequest(mockRequest, 1));
console.log(rateLimiter.sendRequest(mockRequest, 2));
console.log(rateLimiter.sendRequest(mockRequest, 3));
console.log(rateLimiter.sendRequest(mockRequest, 4));
console.log(rateLimiter.sendRequest(mockRequest, 5));
