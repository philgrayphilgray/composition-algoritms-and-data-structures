var Stack = function() {
  this.storage = '';
};

Stack.prototype.push = function(value) {
  this.storage = this.storage.concat('***', value);
};

Stack.prototype.pop = function() {
  const lastDelimeter = this.storage.lastIndexOf('***');
  const item = this.storage.slice(lastDelimeter + 3);
  this.storage = this.storage.slice(0, lastDelimeter);
  return item;
};

Stack.prototype.size = function() {
  return this.storage.split('***').length - 1;
};

module.exports = Stack;
