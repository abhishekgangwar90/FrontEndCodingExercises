function checkIfPanlindrom(string) {
  return string.split("").reverse().join("") === string;
}

function findingLongestPlalindrom(inputString) {
  let longestPalindrom = "";

  for (let i = 0; i <= inputString.length; i++) {
    for (let j = i; j <= inputString.length; j++) {
      const subString = inputString.substring(i, j);
      const subStringLength = subString.length;
      if (
        checkIfPanlindrom(subString) &&
        subStringLength > longestPalindrom.length
      ) {
        longestPalindrom = subString;
      }
    }
  }

  return longestPalindrom;
}

console.log(findingLongestPlalindrom("abcd"));
