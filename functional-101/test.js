const _ = require('./index');

describe('_', () => {
  describe('`.each`', () => {
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

  describe('`.map`', () => {
    it('should pass each value of an array into a callback, and return a new array of values', () => {
      const arr = [1, 2, 3];
      const expected = [2, 4, 6];

      const double = num => {
        return num * 2;
      };
      const actual = _.map(arr, double);

      expect(actual).toEqual(expected);
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

  describe('`.filter`', () => {
    it('should pass values of an array through a callback and return a new array of only the values that return true', () => {
      const arr = [1, 2, 3, 4];
      const expected = [2, 4];

      const filterByEven = num => {
        return num % 2 === 0;
      };

      const actual = _.filter(arr, filterByEven);

      expect(actual).toEqual(expected);
    });

    it('should pass the index as the second argument to the callback', () => {
      const arr = [1, 2, 3, 4];
      const expected = [1, 3];

      const filterByEvenIndex = (num, index) => {
        return index % 2 === 0;
      };

      const actual = _.filter(arr, filterByEvenIndex);

      expect(actual).toEqual(expected);
    });

    it('should pass the original array as the third argument to the callback', () => {
      const arr = [1, 2, 3, 4];
      const expected = [1, 2, 3, 4];

      const filterByEvenToMatrix = (num, index, original) => {
        return original.indexOf(num) !== -1;
      };

      const actual = _.filter(arr, filterByEvenToMatrix);

      expect(actual).toEqual(expected);
    });
    it('should pass values in an object through a callback and return a new array of only the values that return true', () => {
      const obj = { dogs: 3, cats: 2, birds: 4, spiders: 100 };
      const expected = [4, 100];

      const filterByGreaterThanThree = num => {
        return num > 3;
      };

      const actual = _.filter(obj, filterByGreaterThanThree);

      expect(actual).toEqual(expected);
    });

    it('should return an empty array when the first argument is not an array or object, or is otherwise empty', () => {
      const str = 'something else';
      const expected = [];

      const identity = item => {
        return item;
      };
      const actual = _.filter(str, identity);

      expect(actual).toEqual(expected);
    });
  });
  describe('`.from`', () => {
    it('should return a new array of the enumerable values from a non-array data structure', () => {
      const notArray = { 0: 'bird', 1: 'dog' };

      // has a non-enumerable array-like method
      Object.defineProperty(notArray, 'length', {
        enumerable: false,
        value: function() {
          let l = 0;
          for (let key in this) {
            if (this.propertyIsEnumerable(key)) {
              l++;
            }
          }
          return l;
        }.bind(notArray)
      });

      const expected = ['bird', 'dog'];

      const actual = _.from(notArray);

      expect(actual).toEqual(expected);
    });
  });

  describe('`.reduce`', () => {
    it('it calls a function for each item, passing in the return value of the previous call', () => {
      const arr = [1, 2, 3, 4];
      const expected = 10;
      const initial = 0;
      const sum = (acc, curr) => acc + curr;

      const actual = _.reduce(arr, sum, initial);

      expect(actual).toEqual(expected);
    });

    // it('uses the first value of the collection when no initial value is specified', () => {
    //   const arr = [1, 2, 3, 4];
    //   const expected = 11;
    //   const sum = (acc, curr) => acc + curr;

    //   const actual = _.reduce(arr, sum);

    //   expect(actual).toEqual(expected);
    // });

    it('it can accept an object as the list argument', () => {
      const obj = { cats: 2, dogs: 2, birds: 2, fish: 6 };
      const expected = 12;
      const initial = 0;
      const sum = (acc, curr) => acc + curr;

      const actual = _.reduce(obj, sum, initial);

      expect(actual).toEqual(expected);
    });
  });
});
