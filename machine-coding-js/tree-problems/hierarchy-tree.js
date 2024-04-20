/**
 * Create an Employee Directory Tree
 * Given an array of object relations
 */

// Input
// [{ "SeniorManager": ''}, {"manager1": "SeniorManager"}, {"manager2": "SeniorManager"}, {"employee1": "manager1"}, {"employee2": "manager2"}]

// output
// {
//   SeniorManager: {
//     manager1: {
//       employee1: "";
//     }
//     manager2: {
//       employee2: "";
//     }
//   }
// }

function generateDirectory(empData) {
  let resultDirectory = {};

  empData.forEach((employee) => {
    const [subordinate, manager] = Object.entries(employee)[0];

    if (!manager) {
      resultDirectory[subordinate] = {};
    } else {
      if (!resultDirectory[manager]) {
        resultDirectory[manager] = {};
      }

      resultDirectory[manager][subordinate] = {};
    }
  });

  return resultDirectory;
}
