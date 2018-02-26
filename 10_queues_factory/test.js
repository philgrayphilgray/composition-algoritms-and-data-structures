const Queue = require('./index');

describe('Queue', () => {
  const myQueue = Queue();
  const firstItem = 'first';
  const secondItem = 'second';

  afterEach(() => {
    myQueue.data = {};
    myQueue.counter = 0;
  });

  describe('size', () => {
    it('initially returns 0', () => {
      const expected = 0;
      const actual = myQueue.size();
      expect(actual).toEqual(expected);
    });

    it('returns the correct size when multiple items are in the stack', () => {
      const expected = 2;
      myQueue.data = {firstItem, secondItem};
      const actual = myQueue.size();
      expect(actual).toEqual(expected);
    });
  });
  describe('enqueue', () => {
    it('adds items to the stack', () => {
      const expected = {'0': firstItem, '1': secondItem};
      myQueue.enqueue(firstItem);
      myQueue.enqueue(secondItem);
      const actual = myQueue.data;
      expect(actual).toEqual(expected);
    });
  });
  describe('dequeue', () => {
    beforeEach(() => {
      myQueue.enqueue(firstItem);
      myQueue.enqueue(secondItem);
    });

    it('removes the first item from the stack', () => {
      const expected = {'1': secondItem};
      myQueue.dequeue();
      const actual = myQueue.data;
      expect(actual).toEqual(expected);
    });
    it('returns the first item removed from the stack', () => {
      const expected = firstItem;
      const actual = myQueue.dequeue();
      expect(actual).toEqual(expected);
    });
    it('removes and returns the second item from the stack', () => {
      const expected = secondItem;
      myQueue.dequeue();
      const actual = myQueue.dequeue();
      expect(actual).toEqual(expected);
    });
  });
});
