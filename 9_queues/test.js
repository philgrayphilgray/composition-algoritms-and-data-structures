const Queue = require('./index');

describe('Queue', () => {
  const myQueue = new Queue();
  const firstItem = 'first';
  const secondItem = 'second';
  afterEach(() => {
    myQueue.data = {};
    myQueue.counter = 0;
  });

  describe('size', () => {
    it('returns 0 as the initial size', () => {
      const expected = 0;
      const actual = myQueue.size();
      expect(actual).toEqual(expected);
    });
  });

  describe('enqueue', () => {
    it('adds a value to the stack', () => {
      myQueue.enqueue(firstItem);
      expect(Object.values(myQueue.data)).toContain(firstItem);
    });
    it('adds multiple values to the stack', () => {
      myQueue.enqueue(firstItem);
      myQueue.enqueue(secondItem);
      expect(Object.values(myQueue.data)).toContain(secondItem);
    });
  });
  describe('dequeue', () => {
    beforeEach(() => {
      myQueue.enqueue(firstItem);
      myQueue.enqueue(secondItem);
    });

    it('removes the first item from the stack', () => {
      myQueue.dequeue();

      expect(Object.values(myQueue.data)).not.toContain(firstItem);
    });

    it('returns the first item from the stack', () => {
      const actual = myQueue.dequeue();
      expect(actual).toEqual(firstItem);
    });
    it('removes and returns a second item from the stack', () => {
      myQueue.dequeue();
      const actual = myQueue.dequeue();
      expect(actual).toEqual(secondItem);
    });
    it('returns nothing and resets the counter if there are no items', () => {
      myQueue.dequeue();
      myQueue.dequeue();
      const actual = myQueue.dequeue();

      expect(actual).toBeFalsy();
      expect(myQueue.counter).toEqual(0);
    });
  });
});
