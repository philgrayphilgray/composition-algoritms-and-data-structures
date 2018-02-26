class Stack {
  constructor() {
    this.storage = '';
  }
  push(value) {
    this.storage = this.storage.concat('___', value);
  }

  pop() {
    const delimeter = this.storage.lastIndexOf('___');
    const item = this.storage.slice(delimeter + 3);
    this.storage = this.storage.slice(0, delimeter);
    return item;
  }

  size() {
    return this.storage.split('___').length - 1;
  }
}

module.exports = Stack;
