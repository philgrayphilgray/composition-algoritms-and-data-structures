const _ = require('./index');

describe('_', () => {
  describe('.each', () => {
    it('should pass each item of an array as the first argument of a callback, executing that callback', () => {
      const arr = [1, 2, 3];
      const result = [];
      const expected = [2, 4, 6];
      const cb = num => {
        result.push(num * 2);
      };
      _.each(arr, cb);

      expect(result).toEqual(expected);
    });

    it('should pass the index as the second argument to the callback', () => {
      const arr = [1, 2, 3];
      const result = {};
      const expected = { 0: 1, 1: 2, 2: 3 };
      const cb = (num, index) => {
        result[index] = num;
      };

      _.each(arr, cb);
      expect(result).toEqual(expected);
    });

    it('should pass the original array as the third argument to the callback', () => {
      const arr = [1];
      let actual = {};
      const cb = (num, index, list) => {
        actual = list;
      };
      _.each(arr, cb);
      expect(actual).toEqual(arr);
    });

    it('should pass each value in an object as the first argument of a callback, executing that callback', () => {
      const obj = {
        people: 3,
        cats: 2,
        chickens: 1
      };

      const result = [];
      const expected = [6, 4, 2];
      const cb = num => {
        result.push(num * 2);
      };

      _.each(obj, cb);
      expect(result).toEqual(expected);
    });

    it('should also pass each key in an object as the second argument to the callback', () => {
      const obj = {
        people: 3,
        cats: 2,
        chickens: 1
      };

      const result = [];
      const expected = ['people', 'cats', 'chickens'];
      const cb = (num, key) => {
        result.push(key);
      };

      _.each(obj, cb);
      expect(result).toEqual(expected);
    });

    it('should pass the original object as the third argument to the callback', () => {
      const obj = {
        people: 3,
        cats: 2,
        chickens: 1
      };

      let actual = {};
      const cb = (num, key, list) => {
        actual = list;
      };

      _.each(obj, cb);
      expect(actual).toEqual(obj);
    });

    it('should return undefined when it is not an array or object', () => {
      const result = [];
      //   const unexpected = ['h', 'e', 'y'];
      const str = 'hey';
      const cb = letter => {
        result.push(letter);
      };
      const actual = _.each(str, cb);

      expect(actual).toEqual(undefined);
    });
  });

  describe('.map', () => {
    it('should pass each value of an array into a callback, and return a new array of values', () => {
      const arr = [1, 2, 3];
      const expected = [2, 4, 6];

      const double = num => {
        return num * 2;
      };
      const actual = _.map(arr, double);

      expect(actual).toEqual(expected);
    });
  });
  it('should not mutate the original array', () => {
    const arr = [1, 2, 3];
    const expected = [2, 4, 6];

    const double = num => {
      return num * 2;
    };
    _.map(arr, double);

    expect(arr).toEqual(arr);
  });

  it('should also pass an index for each value of the array to the callback', () => {
    const arr = ['cat', 'dog', 'frog'];
    const expected = [[0, 'cat'], [1, 'dog'], [2, 'frog']];

    const toKeyValuePairs = (value, index) => {
      return [index, value];
    };
    const actual = _.map(arr, toKeyValuePairs);

    expect(actual).toEqual(expected);
  });

  it('should pass the original array as the third argument to the callback', () => {
    const arr = [1, 2, 3];
    const expected = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];

    const to2dArray = (num, index, list) => {
      return list;
    };
    const actual = _.map(arr, to2dArray);

    expect(actual).toEqual(expected);
  });
  //   it('should pass each value of an object into a callback, and return a new object of values', () => {
  //     const obj = { 0: 'cat', 1: 'dog', 2: 'frog' };
  //     const expected = { 0: 'cats', 1: 'dogs', 2: 'frogs' };

  //     const pluralize = val => {
  //       return val + 's';
  //     };

  //     const actual = _.map(obj, pluralize);

  //     expect(actual).toEqual(expected);
  //   });
  //   it('should not mutate the original object', () => {
  //     const obj = { 0: 'cat', 1: 'dog', 2: 'frog' };
  //     const expected = { 0: 'cats', 1: 'dogs', 2: 'frogs' };

  //     const pluralize = val => {
  //       return val + 's';
  //     };
  //     _.map(obj, pluralize);

  //     expect(obj).toEqual(obj);
  //   });
  //   it('should also pass each key in the object as the second argument to the callback', () => {
  //     //assuming this should be alpha
  //     const obj = { cats: 2, dogs: 2, frogs: 1 };
  //     const expected = {
  //       0: { type: 'cats', count: 2 },
  //       1: { type: 'dogs', count: 2 },
  //       2: { type: 'frogs', count: 1 }
  //     };
  //     const hydrateObject = (value, key) => {
  //       return { type: key, count: value };
  //     };

  //     const actual = _.map(obj, hydrateObject);

  //     expect(actual).toEqual(expected);
  //   });

  /* OOPS: IT SHOULD ALWAYS RETURN AN ARRAY */

  it('should pass each value of an object into a callback, and return a new array of the values', () => {
    const obj = { 0: 'cat', 1: 'dog', 2: 'frog' };
    const expected = ['cats', 'dogs', 'frogs'];

    const pluralize = val => {
      return val + 's';
    };

    const actual = _.map(obj, pluralize);

    expect(actual).toEqual(expected);
  });

  it('should pass each key in the object as the second argument to the callback', () => {
    const obj = { 0: 'cat', 1: 'dog', 2: 'frog' };
    const expected = [['0', 'cat'], ['1', 'dog'], ['2', 'frog']];

    const toKeyValuePairs = (val, key) => {
      return [key, val];
    };

    const actual = _.map(obj, toKeyValuePairs);

    expect(actual).toEqual(expected);
  });

  it('should also pass an index for each iteration as a third argument to the callback', () => {
    const obj = { 0: 'cat', 1: 'dog', 2: 'frog' };
    const expected = [[0, 'cat'], [1, 'dog'], [2, 'frog']];

    const toIndexValuePairs = (val, key, index) => {
      return [index, val];
    };

    const actual = _.map(obj, toIndexValuePairs);

    expect(actual).toEqual(expected);
  });

  it('should pass the original object as the fourth argument to the callback', () => {
    const obj = { 0: 'cat', 1: 'dog', 2: 'frog' };
    const expected = [
      { 0: 'cat', 1: 'dog', 2: 'frog' },
      { 0: 'cat', 1: 'dog', 2: 'frog' },
      { 0: 'cat', 1: 'dog', 2: 'frog' }
    ];

    const toRepeatingObjects = (val, key, index, original) => {
      return original;
    };

    const actual = _.map(obj, toRepeatingObjects);

    expect(actual).toEqual(expected);
  });

  it('should return an empty array when the first argument is not an array or object, or is otherwise empty', () => {
    const obj = {};
    const expected = [];

    const pluralize = val => {
      return val + 's';
    };

    const actual = _.map(obj, pluralize);

    expect(actual).toEqual(expected);
  });
});
