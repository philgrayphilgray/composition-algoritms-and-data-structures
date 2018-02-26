function Queue() {
  this.data = {};
  this.counter = 0;
}

Queue.prototype.size = function() {
  return Object.values(this.data).length;
};

Queue.prototype.enqueue = function(value) {
  const index = this.size();
  this.data[index] = value;
};

Queue.prototype.dequeue = function() {
  if (this.size() === 0) {
    this.counter = 0;
    return;
  }
  const item = this.data[this.counter];
  delete this.data[this.counter];
  this.counter++;
  return item;
};

module.exports = Queue;
