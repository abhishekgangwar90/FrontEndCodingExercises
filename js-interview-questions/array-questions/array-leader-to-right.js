/**
 * Given an array of interger, write a function that returns an array that contains
 * all the element that are bigger than all the right elements
 *
 * Example - Input [12, 22, 10, 2, 0, 6];
 *         - Output [22,10,6]
 * Explanation
 *          - 22 is bigger than all the element to it's right i.e. 10,2,0,6
 *          - same goes for 10
 *          - 6 is last element so it is always a leader
 */

/**
 *
 * @param {*} array
 * @returns
 */
function findLeader(array) {
  const reverseArray = array.reverse();
  const result = [];

  let maxValue = reverseArray[0];
  result.push(maxValue);

  for (const item of reverseArray) {
    if (item > maxValue) {
      result.push(item);
      maxValue = item;
    }
  }

  return result.reverse();
}
