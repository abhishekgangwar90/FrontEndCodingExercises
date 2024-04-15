/**
 * Questions 1
 * Return the output of the Function
 */

function firstSequence() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);

  setTimeout(() => {
    console.log(3);
  }, 100);

  Promise.resolve().then(() => {
    console.log(4);
  });

  Promise.reject().then(() => {
    console.log(5);
  });

  setTimeout(() => {
    console.log(6);
  }, -1);

  (() => {
    console.log(7);
  })();

  console.log(8);
}

firstSequence();
// output = 1, 7, 8, 4, 2, 6, 3

/********************************************************************************/

/**
 * Questions 2
 * Return the output of the function
 */

function secondSequence() {
  console.log(1);
  const promise = new Promise((resolve) => {
    console.log(2);
    resolve();
    console.log(3);
  });

  console.log(4);

  promise
    .then(() => {
      console.log(5);
    })
    .then(() => {
      console.log(6);
    });

  console.log(7);

  setTimeout(() => {
    console.log(8);
  }, 10);

  setTimeout(() => {
    console.log(9);
  }, 0);
}

secondSequence();

//output
// 1, 2, 3, 4, 7, 5, 6,9,8
/********************************************************************************/
