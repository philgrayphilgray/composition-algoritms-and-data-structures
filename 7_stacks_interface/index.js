function Stack() {
  this.data = {};
}
Stack.prototype.push = function(value) {
  const index = Object.keys(this.data).length + 1;
  this.data[index] = value;
};

Stack.prototype.pop = function() {
  const index = Object.keys(this.data).length;
  const item = this.data[index];
  if (index > 0) {
    delete this.data[index];
    return item;
  }
};

Stack.prototype.size = function() {
  return Object.keys(this.data).length;
};

module.exports = Stack;
