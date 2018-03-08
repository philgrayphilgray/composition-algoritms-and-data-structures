const { loopN, recurseLoopN, exponent, recurseExponent } = require('./index');

describe('`loopN`', () => {
  it('is a function that loops through the numbers `n` down to 0', () => {
    //setup
    const expected = 0;

    // exercise
    const loopActual = loopN(5);

    // verify
    expect(loopActual).toEqual(expected);
  });
});
describe('`recurseLoopN`', () => {
  it('is a function that loops through the numbers `n` down to 0', () => {
    //setup
    const expected = 0;

    // exercise
    const recurseActual = recurseLoopN(5);

    // verify
    expect(recurseActual).toEqual(expected);
  });
});

describe('`exponent`', () => {
  it('a function `exponent` that takes two arguments base, and expo and returns the exponenet value of the base', () => {
    // setup
    const base = 9;
    const expo = 2;
    const expected = 81;

    // exercise
    const loopActual = exponent(base, expo);

    // verify
    expect(loopActual).toEqual(expected);
  });
});
describe('`recurseExponent`', () => {
  it('a function `exponent` that takes two arguments base, and expo and returns the exponenet value of the base', () => {
    // setup
    const base = 9;
    const expo = 2;
    const expected = 81;

    // exercise
    const recurseActual = recurseExponent(base, expo);

    // verify
    expect(recurseActual).toEqual(expected);
  });
});
describe('`recursiveMultiplier`', () => {
  const arr = [1, 2, 3, 4];
  const num = 2;
  const expected = [2, 4, 6, 8];

  const actual = recursiveMultiplier(arr, num);

  expect(actual).toEqual(expected);
});
