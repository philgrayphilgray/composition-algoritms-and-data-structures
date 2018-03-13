const _ = {};

_.each = function(list, callback) {
  const isArray = Array.isArray(list);
  const isObject = typeof list === 'object';

  if (isArray && isObject) {
    for (let value of list) {
      callback(value, list.indexOf(value), list);
    }
  } else if (isObject) {
    for (let prop in list) {
      callback(list[prop], prop, list);
    }
  } else {
    return;
  }
};

_.map = function(list, callback) {
  //tests
  const isArray = Array.isArray(list);
  const isObject = typeof list === 'object';
  const isEmpty = list => {
    for (let key in list) {
      if (list.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  const newArray = [];

  if (isArray && isObject) {
    for (let value of list) {
      newArray.push(callback(value, list.indexOf(value), list));
    }
  } else if (isObject) {
    let index = 0;
    for (let key in list) {
      newArray.push(callback(list[key], key, index++, list));
    }
  }
  return newArray;
};

_.filter = function(list, callback) {
  const isArray = Array.isArray(list);
  const isObject = typeof list === 'object';
  const isEmpty = list => {
    for (let key in list) {
      if (list.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  const filteredArray = [];

  if (isArray && isObject) {
    for (let value of list) {
      if (callback(value, list.indexOf(value), list)) {
        filteredArray.push(value);
      }
    }
  } else if (isObject) {
    for (let key in list) {
      if (callback(list[key], key, list)) {
        filteredArray.push(list[key]);
      }
    }
  }

  return filteredArray;
};

_.from = function(list) {
  const newArray = [];
  for (value in list) {
    newArray.push(list[value]);
  }
  return newArray;
};

_.reduce = function(list, callback, initial) {
  const isArray = Array.isArray(list);
  const isObject = typeof list === 'object';
  const isEmpty = list => {
    for (let key in list) {
      if (list.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  let index = 0;

  if (isArray && isObject) {
    for (let value of list) {
      if (index === 0 && initial === undefined) {
        initial = list[0];
      } else {
        initial = callback(initial, value, index++, list);
      }
    }
  } else if (isObject) {
    for (let key in list) {
      initial = callback(initial, list[key], index++, list);
    }
  }
  return initial;
};

_.curry = function(func, arity = func.length) {
  // const args = [];
  // for (let i = 0; i < arity; i++) {
  //   args.push('arg' + i + 1);
  // }
  // let returnFunction = func(...args);
  // for (let i = arity - 1; i >= 0; i--) {
  //   let arg = args[i];
  //   returnFunction = arg => returnFunction();
  //   console.log(returnFunction);
  // }
  // return returnFunction;
};

module.exports = _;
