/**
 * Build a rate limiter which does the following
 *
 *  1 - Allows a given number of requests to run parallely.
 *  2 - If more than given number requests are coming in then
 *      2a - return an error for extra requests.
 *      2b - return the success or error message for these requests.
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

  sendRequest(task) {
    return (...args) => {
      return this.#currentRunningTasks === this.#allowedRequestsPerSecCount
        ? this._throwError(task, ...args)
        : this._executeRequest(task, ...args);
    };
  }
}

/***************************** EXECUTION ******************************/

const mockRequest = (id) => {
  return new Promise((resolve) => {
    console.log("Executing Request-", id);
    setTimeout(() => {
      console.log("Resolving Request- ", id);
      resolve();
    }, 1000);
  });
};
const rateLimiter = new RateLimiter();

const sendRequestWithRateLimiter = rateLimiter.sendRequest(mockRequest);

console.log(sendRequestWithRateLimiter(1));
console.log(sendRequestWithRateLimiter(2));
console.log(sendRequestWithRateLimiter(3));
console.log(sendRequestWithRateLimiter(4));
console.log(sendRequestWithRateLimiter(5));
