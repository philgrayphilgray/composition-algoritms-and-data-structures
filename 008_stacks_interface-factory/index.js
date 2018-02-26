function Stack() {
  const publicAPI = {
    data: {},
    push: function(value) {
      const index = Object.keys(this.data).length + 1;
      this.data[index] = value;
    },
    pop: function() {
      const index = Object.keys(this.data).length;
      const item = this.data[index];
      if (index > 0) {
        delete this.data[index];
        return item;
      }
    },
    size: function() {
      return Object.keys(this.data).length;
    },
  };
  return publicAPI;
}

module.exports = Stack;
