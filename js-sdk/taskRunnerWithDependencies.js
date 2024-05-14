class TaskRunner {
  constructor(tasksList) {
    this.tasksList = tasksList;
    this.currentRunningTask = new Map();
    this.finishedTask = new Map();
  }

  runTasks(allDone) {
    Object.keys(this.tasksList).map((taskID) => {
      const currentTask = this.tasksList[taskID];
      const isRunning = this.currentRunningTask.has(taskID);
      const isFinished = this.finishedTask.has(taskID);

      if (!isFinished && !isRunning) {
        const depenciesResolved =
          currentTask.dependencies && currentTask.dependencies.length > 0
            ? currentTask.dependencies.every((id) => this.finishedTask.has(id))
            : true;

        if (depenciesResolved) {
          const executeCallback = () => {
            this.currentRunningTask.delete(taskID);
            this.finishedTask.set(taskID, "true");
            this.runTasks(allDone);
          };
          this.currentRunningTask.set(taskID, "true");
          currentTask.task(executeCallback);
        }
      }
    });

    if (this.finishedTask.size === Object.keys(this.tasksList).length) {
      allDone();
    }
  }
}

const tasks = {
  a: {
    task: function (doneCb) {
      console.log("-------calling a");
      setTimeout(() => {
        console.log("resolving a");
        doneCb();
      }, 4000);
    },
  },
  b: {
    task: function (doneCb) {
      console.log("-------calling b");
      setTimeout(() => {
        console.log("resolving b");
        doneCb();
      }, 1000);
    },
    dependencies: ["a"],
  },
  c: {
    task: function (doneCb) {
      console.log("-------calling c");
      setTimeout(() => {
        console.log("resolving c");
        doneCb();
      }, 2000);
    },
  },
  d: {
    task: function (doneCb) {
      console.log("-------calling d");
      setTimeout(() => {
        console.log("resolving d");
        doneCb();
      }, 1000);
    },
    dependencies: ["b", "c"],
  },
  e: {
    task: function (doneCb) {
      console.log("-------calling e");
      setTimeout(() => {
        console.log("resolving e");
        doneCb();
      }, 1000);
    },
    dependencies: ["a", "d"],
  },
};

const taskRunner = new TaskRunner(tasks);

function allDoneCallback() {
  console.log("debugger called the final Callback");
}

taskRunner.runTasks(allDoneCallback);
