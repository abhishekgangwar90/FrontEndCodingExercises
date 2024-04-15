/**
 * polyfill of SetInterval using SetTimeout
 * @param {*} callback
 * @param {*} callbackInterval
 * @returns
 */
function customSetInterval(callback, callbackInterval) {
  let intervalTimer;

  function invokeCallback(callback, delay) {
    intervalTimer = setTimeout(() => {
      callback();
      invokeCallback(callback, delay);
    }, delay);
  }

  // used for clearing the timer
  function clearCustomInterval() {
    clearTimeout(intervalTimer);
  }

  invokeCallback(callback, callbackInterval);
  return { intervalTimer, clearCustomInterval };
}

// Testing
const logToConsole = () => {
  console.log("Callback");
};

const { x, clearCustomInterval } = customSetInterval(logToConsole, 1000);

setTimeout(() => clearCustomInterval(x), 5000);
