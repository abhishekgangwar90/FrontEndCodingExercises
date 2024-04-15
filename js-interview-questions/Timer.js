/**
 * Build a timer function that calls a specific method for given frequency and at given interval
 */

// companies asked in - Upstox, Roku

/**
 * creates a promise that wait for specific miliseconds
 * @param {*} millisecond
 * @returns
 */
const wait = (millisecond) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, millisecond);
  });
};

/**
 * Timer function
 * @param {*} callback
 * @param {*} frequency
 * @param {*} interval
 * @returns
 */
async function customTimer(callback, frequency, interval) {
  let currentFrequency = 0;

  if (frequency === 0) {
    return;
  }

  while (currentFrequency < frequency) {
    currentFrequency++;
    await wait(interval);
    await Promise.resolve(callback());
  }
}

let callbackRef = () => {
  console.log("callback called");
};

customTimer(callbackRef, 10, 1000);
