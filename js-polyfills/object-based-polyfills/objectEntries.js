/**
 * Polyfill for Object entries
 * @param {*} object
 */
function objectEntriesPolyfill(object) {
  const resultArray = [];
  if (Object.keys(object).length === 0) {
    return resultArray;
  }

  for (key in object) {
    resultArray.push([key, object[key]]);
  }

  return resultArray;
}
