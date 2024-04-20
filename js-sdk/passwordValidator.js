/**
 * Takes in a string and
 *  - return what all the rules has been broken in the given password in array format
 *  - If not rule broken the return empty array
 *
 *
 *  Rules
 *  1 - Should have length atleast 16
 *  2 - Should not contain value 'password', this is not case-sensitive.
 *  3 - Should not contain any letter more than 4 times, letters are considered case sensitive here, 'a' and 'A' are different
 *  4 - Should contain atleast one of the following letter - @, $, #,
 *  5 - Should contain atleast one Upper case and oneLower case letter
 */
class PasswordValidator {
  checkValidLength(string) {
    return string.length >= 16;
  }

  containsInvalidKeyword(string) {
    return string.toLowerCase().indexOf("password") !== -1;
  }

  checkIfCorrectWordCount(string) {
    let wordMap = {};
    let isCorrectString = true;

    for (let word of string.split("")) {
      if (word in wordMap) {
        let occurance = wordMap[word];
        if (occurance === 4) {
          isCorrectString = false;
        } else {
          wordMap[word] = occurance + 1;
        }
      } else {
        wordMap[word] = 1;
      }
    }
    return isCorrectString;
  }

  hasLowerCase(string) {
    return string !== string.toUpperCase();
  }

  hasUpperCase(string) {
    return string !== string.toLowerCase();
  }

  hasRequiredKeyowrds(string) {
    return (
      string.indexOf("*") !== -1 ||
      string.indexOf("@") !== -1 ||
      string.indexOf("#") !== -1
    );
  }

  validatePassword(string) {
    const conditionsBrokenArray = [];

    if (!checkValidLength(string)) {
      conditionsBrokenArray.push(1);
    }

    if (containsInvalidKeyword(string)) {
      conditionsBrokenArray.push(2);
    }

    if (!checkIfCorrectWordCount(string)) {
      conditionsBrokenArray.push(3);
    }

    if (!hasRequiredKeyowrds(string)) {
      conditionsBrokenArray.push(5);
    }

    if (!hasUpperCase(string) || !hasLowerCase(string)) {
      conditionsBrokenArray.push(4);
    }

    return conditionsBrokenArray;
  }
}

const passwordValidator = new PasswordValidator();

passwordValidator.validatePassword("StrongPassw@rd#1232232");
