const Constructor = require('./index');

describe('`Constructor`', () => {
  it('is a constructor', () => {
    expect(typeof Constructor.prototype.constructor).toEqual('function');
  });
  it('has methods on the prototype', () => {
    /** Object.getOwnPropertyNames returns an array in which the first item is the contructor  **/
    expect(
      Object.getOwnPropertyNames(Constructor.prototype).length,
    ).toBeGreaterThan(1);
  });
});
