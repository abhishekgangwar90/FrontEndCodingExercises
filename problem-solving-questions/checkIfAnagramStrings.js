function checkIfAnagram(firstString, secondString) {
  const firstStringArray = firstString
    .split("")
    .map((elm) => elm.toUpperCase());

  const secondStringArray = secondString
    .split("")
    .map((elm) => elm.toUpperCase());
  let isAnagram = true;

  for (let char of firstStringArray) {
    if (secondStringArray.indexOf(char) === -1) {
      return false;
    }
  }

  return isAnagram;
}

console.log(checkIfAnagram("Mary", "Army"));
