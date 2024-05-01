/**
 *  API/Task Rate Throttler
 *
 *  Write an API throttler such that
 *   - It executes no of APIs/Tasks per second or in given time (in ms).
 *   - If Receives more than allowed tasks, then it adds them in a queue and executes them one by one later
 */

// class RateThrottler {
//   #allowedTasks;
//   #currentlyRunningTasks;
//   #tasksStartedAt;
//   #rateInMs;
//   #taskQueue;

//   constructor(allowedTasks, rateInMilliseconds) {
//     this.#allowedTasks = allowedTasks;
//     this.#rateInMs = rateInMilliseconds;
//   }

//   executeTask(tasks) {
//     return (...args) => {
//       if (Date.now() - this.#tasksStartedAt > this.#rateInMs) {
//         // window expired
//       } else {
//         if (this.#currentlyRunningTasks === this.#allowedTasks) {
//           this.#addToTheQueue(task, ...args);
//         } else {
//           this.#currentlyRunningTasks++;
//           this.#runTask();
//         }
//       }
//     };
//   }

//   #runTask(task, ...args) {
//     task(...args).finally(() => {
//       this.#currentlyRunningTasks--;
//       this.#checkAndExecuteTasksFromQueue();
//     });
//   }

//   #addToTheQueue(task, ...args) {
//     this.#taskQueue.push({ task, params: { ...args } });
//   }

//   #removeFromTheQueue() {}

//   #checkAndExecuteTasksFromQueue() {
//     if (this.#taskQueue.length > 0) {
//       const nextTask = this.#taskQueue.shift();
//       this.executeTask(task);
//     }
//   }
// }

class ApiRateThrottler {
  taskQueue = [];
  currentlyRunningTasks = 0;
  lastUsedAt = null;

  constructor(limit) {
    this.allowTaskPerSecond = limit;
  }

  executeTask(task) {
    return (...args) => {
      if (Date.now() - this.lastUsedAt > 3000) {
        // reset currentRunning tasks;
        this.currentlyRunningTasks = 0;
        this.lastUsedAt = Date.now();
        this.runTask(task, args);
      } else {
        // check if currentRunning tasks are over the limit
        if (this.currentlyRunningTasks == this.allowTaskPerSecond) {
          this.addTasksToQueue(task, args);
        } else {
          this.runTask(task, args);
        }
      }
    };
  }

  runTask(task, args) {
    this.currentlyRunningTasks++;
    task(...args).finally((_) => {
      this.currentlyRunningTasks--;
      this.checkAndExecuteTaskFromQueue();
    });
  }

  addTasksToQueue(task, args) {
    this.taskQueue.push({ task, args });
  }

  checkAndExecuteTaskFromQueue() {
    if (!this.taskQueue.length) {
      return;
    }
    const { task, args } = this.taskQueue.shift();
    this.runTask(task, args);
  }
}

const apiCall = (id) => {
  console.log("executing - ", id);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("resolving - ", id);
      resolve();
    }, 3000);
  });
};

const rateLimiter = new ApiRateThrottler(3);

const taskExecutor = rateLimiter.executeTask(apiCall);

taskExecutor(1);
taskExecutor(2);
taskExecutor(3);
taskExecutor(4);
taskExecutor(5);
taskExecutor(6);
taskExecutor(7);
