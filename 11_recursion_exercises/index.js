//src: https://raw.githubusercontent.com/kuychaco/algoClass/master/recursion/recursionIntro.js

//1. Write a function that loops through the numbers n down to 0. If you haven't done so try using a while loop to do this.

const loopN = n => {
  while (n > 0) {
    n--;
  }
  return n;
};

//2. Next, try looping just like above except using recursion

const recurseLoopN = n => {
  if (n === 0) return n;
  return recurseLoopN(n - 1);
};

//3.Write a function 'exponent' that takes two arguments base, and expo, uses a while loop to return the exponenet value of the base.

const exponent = (base, expo) => {
  let result = 1;
  while (expo > 0) {
    result *= base;
    expo--;
  }
  return result;
};

//4. Write a function 'RecursiveExponent' that takes two arguments base, and expo, recursively returns exponent value of the base.

function recurseExponent(base, expo) {
  if (expo === 0) {
    return 1;
  }
  return base * recurseExponent(base, --expo);
}

//5. Write a function 'recursiveMultiplier' that takes two arguments, 'arr and num', and multiplies each arr value into by num and returns an array of the values.

const recursiveMultiplier = (arr, num) => {};

//6. Write a function 'recursiveReverse' that takes an array and uses recursion to return its contents in reverse

const recursiveReverse = arr => {};

module.exports = { loopN, recurseLoopN, exponent, recurseExponent };
