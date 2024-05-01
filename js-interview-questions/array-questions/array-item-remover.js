/**
 * Removes the first matching item from array
 */
function removeItemsFromArray(array, value) {
  let hasRemoved = false;
  const resultArray = [];

  for (let item of array) {
    if (item === value && !hasRemoved) {
      hasRemoved = true;
    } else {
      resultArray.push(item);
    }
  }

  return resultArray;
}

function removeItemsFromArrayUsingIndexOf(array, value) {
  const itemIndex = array.indexOf(value);
  const resultArray = [...array];

  if (itemIndex !== -1) {
    resultArray.splice(itemIndex, 1);
  }

  return resultArray;
}

removeItemsFromArrayUsingIndexOf(
  ["dog", "cat", "mouse", "house", "cat"],
  "cat"
);
removeItemsFromArray(["dog", "cat", "mouse", "house", "cat"], "cat");
