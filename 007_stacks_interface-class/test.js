const Stack = require('./index.js');

describe('Stack', () => {
  const myStack = new Stack();
  const props = Object.getOwnPropertyNames(Object.getPrototypeOf(myStack));
  const data = props[0];
  const firstItem = 'first';
  const secondItem = 'second';

  afterEach(() => {
    // teardown: depopulate the stack
    myStack.data = {};
  });

  it('initiates with an empty `data` object', () => {
    expect(Object.keys(myStack[data]).length).toEqual(0);
  });

  describe('push', () => {
    it('has a method called `push`', () => {
      expect(props).toContain('push');
    });

    it('adds an item to the data object', () => {
      myStack.push(firstItem);
      expect(Object.values(myStack.data)).toContain(firstItem);
    });

    it('adds multiple items to the data object', () => {
      // setup: populate the stack
      myStack.push(firstItem);
      myStack.push(secondItem);
      expect(Object.values(myStack.data).length).toEqual(2);
      expect(Object.values(myStack.data)[1]).toEqual(secondItem);
    });
  });

  describe('pop', () => {
    it('has a  method called `pop`', () => {
      expect(props).toContain('pop');
    });

    it('removes the last item from the data object and returns it', () => {
      // setup: populate the stack
      myStack.push(firstItem);
      myStack.push(secondItem);

      // verify
      expect(myStack.pop()).toEqual(secondItem);
      expect(Object.values(myStack.data).length).toEqual(1);
      expect(Object.values(myStack.data)[0]).toEqual(firstItem);
    });
  });

  describe('size', () => {
    it('gives the size of the stack with one item', () => {
      // setup: add 1 item
      myStack.push(firstItem);

      const expected = 1;
      const actual = myStack.size();

      // verify
      expect(actual).toEqual(expected);
    });

    it('gives the size of the stack with multiple items', () => {
      // setup: add 3 items
      myStack.push(firstItem);
      myStack.push(secondItem);
      myStack.push(firstItem);

      const expected = 3;
      const actual = myStack.size();

      // verify
      expect(actual).toEqual(expected);
    });
  });
});
