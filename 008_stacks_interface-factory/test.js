const Stack = require('./index.js');

describe('Stack', () => {
  const myStack = Stack();
  const firstItem = 'first';
  const secondItem = 'second';

  afterEach(() => {
    // teardown: depopulate the stack
    myStack.data = {};
  });
  it('allows for multiple separate instances', () => {
    const secondStack = Stack();
    myStack.push(firstItem);
    expect(secondStack.pop()).not.toEqual(firstItem);
  });

  describe('push', () => {
    it('adds a value to the stack', () => {
      myStack.push(firstItem);
      expect(Object.values(myStack.data)).toContain(firstItem);
    });
    it('adds a second value to the stack', () => {
      myStack.push(firstItem);
      myStack.push(secondItem);
      expect(Object.values(myStack.data)).toContain(secondItem);
    });
  });

  describe('pop', () => {
    it('removes the most recently added item from the stack', () => {
      myStack.push(firstItem);
      myStack.push(secondItem);
      myStack.pop();
      expect(Object.values(myStack.data)).not.toContain(secondItem);
    });
    it('returns the most recently added item', () => {
      myStack.push(firstItem);
      myStack.push(secondItem);
      expect(myStack.pop()).toEqual(secondItem);
    });
  });

  describe('size', () => {
    it('initially returns 0 items in the stack', () => {
      expect(myStack.size()).toEqual(0);
    });
    it('returns the length of the stack with multiple items', () => {
      myStack.push(firstItem);
      myStack.push(secondItem);
      expect(myStack.size()).toEqual(2);
    });
  });
});
