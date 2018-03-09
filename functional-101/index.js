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

module.exports = _;
