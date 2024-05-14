// 1. Implement a middleware system
// 2. How do you handle async middleware functions?
// 3. Add retries. Make it configurable at initialization
// 4. Allow skip on failure
// 5. Optional: Report errors to other units of the system

class Middleware {
  middlewareArray;
  requestObj;
  maxRetries;
  requestRetriesMap;

  constructor(maxRetries) {
    this.middlewareArray = [];
    this.requestObj = {};
    this.maxRetries = maxRetries;
    this.requestRetriesMap = new Map();
  }

  use(callback) {
    this.middlewareArray.push(callback);
  }

  handleRetry(middleWareCallback) {
    const key = JSON.stringify(middleWareCallback);

    // I have already retired
    if (this.requestRetriesMap.has(key)) {
      let currentRetries = this.requestRetriesMap.get(key);

      if (currentRetries < this.maxRetries) {
        currentRetries += 1;
        this.requestRetriesMap.set(key, currentRetries);
        console.log("retrying again");
        this.callMiddleWare(middleWareCallback);
      } else {
        throw new Error("Hey can not execute, reached max limit of retires");
      }
    } else {
      this.requestRetriesMap.set(key, 1);
      this.callMiddleWare(middleWareCallback);
    }
  }

  callMiddleWare(middleware) {
    try {
      middleware(this.requestObj, this.executeMiddleware.bind(this));
    } catch (error) {
      this.handleRetry(middleware);
    }
  }

  executeMiddleware() {
    if (!this.middlewareArray.length) {
      return console.log(this.requestObj);
    }

    let middleWareCallback = this.middlewareArray.shift();
    this.callMiddleWare(middleWareCallback);
  }

  start(requestData) {
    this.requestObj = {
      ...requestData,
    };

    this.executeMiddleware();
  }
}

const reqInterceptorOne = (req, next) => {
  console.log("reqInterceptorOne");
  req.a = 1;
  next();
};

let counter = 1;
const reqInterceptorTwo = (req, next) => {
  req.c = 2;
  console.log("reqInterceptorTwo");

  if (counter > 0) {
    counter--;
    throw new Error("Failed");
  } else {
    next();
  }
};

const reqInterceptorThree = (req, next) => {
  console.log("reqInterceptorThree");
  req.b = 3;
  next();
};

const middleware = new Middleware(5);

middleware.use(reqInterceptorOne);
middleware.use(reqInterceptorTwo);
middleware.use(reqInterceptorThree);
middleware.start({ c: 3 });
