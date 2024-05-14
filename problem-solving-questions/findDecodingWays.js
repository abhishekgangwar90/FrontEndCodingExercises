//leetcode.com/problems/decode-ways/
/**
 * A message containing letters from A-Z can be encoded into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
To decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, "11106" can be mapped into:

"AAJF" with the grouping (1 1 10 6)
"KJF" with the grouping (11 10 6)
Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string s containing only digits, return the number of ways to decode it.
 * @param {*} string 
 * @returns 
 */

function decodeString(string) {
  if (string.length === 0) return 0;

  function checkIfNotOutofBound(currentIndex) {
    const doubleDigit = string.substring(currentIndex, currentIndex + 2);
    return doubleDigit >= "10" && doubleDigit <= "26";
  }

  function getTotalWays(index) {
    if (string[index] === "0") return 0;
    if (index === string.length) return 1;

    let totalWays = 0;

    if (index < string.length) {
      totalWays = totalWays + getTotalWays(index + 1);
    }

    if (index + 1 < string.length) {
      if (checkIfNotOutofBound(index)) {
        totalWays = totalWays + getTotalWays(index + 2);
      }
    }

    return totalWays;
  }

  return getTotalWays(0);
}
