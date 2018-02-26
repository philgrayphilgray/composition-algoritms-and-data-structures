module.exports = function Queue() {
  return (publicAPI = {
    data: {},
    counter: 0,
    size: function() {
      return Object.values(this.data).length;
    },
    enqueue: function(value) {
      this.data[this.counter] = value;
      this.counter = Math.max(...Object.keys(this.data)) + 1;
    },
    dequeue: function() {
      if (this.size() === 0) {
        return;
      }
      const queuedIndex = Math.min(...Object.keys(this.data));
      const item = this.data[queuedIndex];
      delete this.data[queuedIndex];
      return item;
    },
  });
};
