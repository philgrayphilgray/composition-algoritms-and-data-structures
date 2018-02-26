const Stack = function(){
this.storage = '';
}

Stack.prototype.push = function(value){
this.storage += '|' + value;
}

Stack.prototype.pop = function(){
const tempStorage = this.storage.split('|').reverse();
const item = tempStorage.splice(0,1).join('');
this.storage = tempStorage.reverse().join('|');
return item;
}

Stack.prototype.size = function(){
return this.storage.split('|').length - 1;
}

const myStack = new Stack();

module.exports = myStack;
