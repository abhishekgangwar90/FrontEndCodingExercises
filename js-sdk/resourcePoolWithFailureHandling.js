class ResourcePool {
  #maxResourceLimit;
  #totalCreatedResouces = 0;
  #maxWaitingTimeLimit = 0;
  resourcePool = [];
  waitingList = [];
  requestTimeoutRef = 0;

  constructor(factoryFunction, maxLimit, timeout) {
    this.#maxResourceLimit = maxLimit;
    this.factoryFunction = factoryFunction;
    this.#maxWaitingTimeLimit = timeout;
  }

  retrieve() {
    return new Promise(async (resolve, reject) => {
      if (this.resourcePool.length) {
        const pulledResource = this.resourcePool.pop();
        return resolve(pulledResource);
      } else if (this.#totalCreatedResouces < this.#maxResourceLimit) {
        const newResource = await this.factoryFunction();
        this.#totalCreatedResouces++;
        return resolve(newResource);
      }

      this.registerRejectionTimeout(reject);
      return this.addToTheWaitingList(resolve);
    });
  }

  registerRejectionTimeout(reject) {
    requestTimeoutRef = setTimeout(() => {
      this.waitingList.shift();
      reject("Hey Reached max timeout");
    }, this.#maxWaitingTimeLimit);
  }

  addToTheWaitingList(callback) {
    this.waitingList.push(callback);
  }

  checkTheWaitingPoolAndRepondBack() {
    if (!this.resourcePool.length || !this.waitingList.length) {
      return;
    }

    const newResource = this.resourcePool.pop();
    const resolve = this.waitingList.shift();
    clearTimeout(requestTimeoutRef);
    resolve(newResource);
  }

  returnResource(resouce) {
    if (this.resourcePool.length < this.#maxResourceLimit) {
      this.resourcePool.push(resouce);
      this.checkTheWaitingPoolAndRepondBack();
    }
  }
}

function createUsableExpensiveObject() {
  // Just a stub implementation
  // Contains logic to create the object
  // Its implementation is irrelevant to the library
  return Promise.resolve({ foo: 0 | (Math.random() * 1000) });
}

async function appCode() {
  try {
    const maxResources = 3; // max resources that can be created
    const pool = new ResourcePool(
      createUsableExpensiveObject,
      maxResources,
      3000
    );

    setTimeout(() => {
      pool.returnResource(r1);
    }, 3000);
    const r1 = await pool.retrieve();
    console.log("r1", r1);
    const r2 = await pool.retrieve();
    console.log("r2", r2);
    const r3 = await pool.retrieve();
    console.log("r3", r3);
    const r4 = await pool.retrieve();
    console.log("r4", r4);

    // r1 is given back to the resource pool

    const r5 = await pool.retrieve();
    console.log("r5", r5);
    console.log("r1", r1); // should return the resource that's available now
  } catch (error) {
    console.log("error", error);
  }
}

appCode();
