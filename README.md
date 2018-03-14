# Exploring Composition Patterns with Algorithms and Data Structures

* [Building Blocks](#building-blocks)
  * [Functions](#functions)
  * [Objects Literals with Methods](#objects-literals-with-methods)
  * [Factory Functions](#factory-functions)
  * [Functional Inheritence](#functional-inheritence)
  * [Factory Functions with Mixins or Objects Linked as Other Objects using Object.create](#factory-functions-with-mixins-or-objects-linked-as-other-objects-using-objectcreate)
  * [Classes](#classes)
* [Compositional Patterns](#compositional-patterns)
  * [Reduce](#reduce)
  * [Curry](#curry)
  * [Compose](#compose)
  * [Pipe](#pipe)
  * [Functors](#functors)
  * [Functional Mixins](#functional-mixins)
  * [Factory Functions with Mixins](#factory-functions-with-mixins)
  * [Monads](#monads)
* [Asynchronous Patterns](#asynchronous-patterns)
  * [Parallel vs. Async](#parallel-vs-async)
  * [Callbacks](#callbacks)
    * [Parallel Request Sequencing Pattern](#parallel-request-sequencing-pattern)
    * [Deficiencies](#deficiencies)
  * [Thunks](#thunks)
    * [synchronous thunk](#synchronous-thunk)
    * [asynchronous thunk](#asynchronous-thunk)
    * [Thunk Request Sequencing Pattern](#thunk-request-sequencing-pattern)
  * [Promises](#promises)
    * [Promise.all](#promiseall)
    * [Promise.race](#promiserace)
  * [Generators](#generators)
  * [Observables](#observables)
* [File Module Pattern](#file-module-pattern)
  * [CommonJS Modules](#commonjs-modules)
  * [AMD](#amd)
  * [ES6 Imports](#es6-imports)
* [Functional Programming Utilities](#functional-programming-utilities)
  * [forEach](#foreach)
  * [map](#map)
  * [filter](#filter)
  * [reduce](#reduce)
  * [flip](#flip)
  * [reverseArgs](#reverseargs)
  * [spreadArgs](#spreadargs)
* [Data Structures](#data-structures)
  * [Stacks](#stacks)
  * [Queues](#queues)
  * [Trees](#trees)
  * [Linked Lists](#linked-lists)
  * [Binary Search Trees](#binary-search-trees)
  * [Graphs](#graphs)
  * [Hash Tables](#hash-tables)
  * [Tries](#tries)
* [Algorithms](#algorithms)
  * [Recursion](#recursion)
  * [Memoization](#memoization)
  * [Bubble Sort](#bubble-sort)
  * [Insertion Sort](#insertion-sort)
  * [Selection Sort](#selection-sort)
  * [Merge Sort](#merge-sort)
  * [Quick Sort](#quick-sort)
  * [Heap Sort](#heap-sort)
  * [Radix Sort](#radix-sort)
  * [BST Traversal](#bst-traversal)
  * [Graph Traversal](#graph-traversal)
  * [Depth-First Search](#depth-first-search)
    * [three variations for serializing:](#three-variations-for-serializing)
      * [preorder:](#preorder)
      * [inorder:](#inorder)
      * [postorder:](#postorder)
  * [Breadth-First Search](#breadth-first-search)
  * [Bloom Filter](#bloom-filter)
  * [Pathfinding](#pathfinding)

## Building Blocks

### Functions

* Predictable and easy to test as long (as long as you separate "pure" functions from functions with side effects)

```js
const Identity = val => val;
```

```shell
> Identity(3); //3
```

### Objects Literals with Methods

* Provides namespacing
* Supports method chaining
* Supports only one instance

```js
const counter = {
  count: 0,
  increase() {
    this.count++;
    return this;
  },
  double() {
    this.count *= 2;
    return this;
  }
};
```

```shell
> counter.count // 0
> counter.increase().count // 1
> counter.increase().double().count // 4
```

### Factory Functions

* Supports many instances
* Supports encapsulation or hiding internal state from a public api

```js
const counter = () => ({
  count: 0,
  increase() {
    this.count++;
    return this;
  },
  double() {
    this.count *= 2;
    return this;
  }
});
```

```shell
> counter().increase().increase().double().count
4
> counter().count
0
```

```js
const bartender = () => {
  const secretIngredient = 'ice';
  const api = {
    makeDrink: function(order = 'vodka') {
      let drink = `${order}-${secretIngredient}`;
      return api.serveDrink(drink);
    },
    serveDrink: function(drink) {
      return drink;
    }
  };
  return api;
};
```

```shell
> bartender().makeDrink()
> 'vodka-ice'
> bartender().makeDrink('whisky')
> 'whisky-ice'
```

```js
// Singleton (IIFE variation)

const bartender = (() => {
  const secretIngredient = 'ice';
  const api = {
    makeDrink: function(order = 'vodka') {
      let drink = `${order}-${secretIngredient}`;
      api.serveDrink(drink);
    },
    serveDrink: function(drink) {
      console.log(drink);
    }
  };
  return api;
})();
```

```shell
> bartender.makeDrink('whisky');
whisky-ice
```

```js
// Passing State (Redux-like)

const store = (state = { bottles_of_beer: 99 }, action) => {
  switch (action) {
    case 'TAKE_ONE_DOWN':
      return {
        ...state,
        bottles_of_beer: state.bottles_of_beer - 1
      };
    case 'SING':
      console.log(`${state.bottles_of_beer} bottles of beer on the wall`);
      return state;
    default:
      return state;
  }
};
```

```shell
> store(store(undefined, 'TAKE_ONE_DOWN'), 'SING');
98 bottles of beer on the wall
{ bottles_of_beer: 98 }
```

### Functional Inheritence

* Mimics class behavior, but includes class inheritence is-a relationship hurdles

```js
const staff = (business, manager, employees) => {
  const data = { business, manager, employees };
  data.getNumberOfStaff = () => employees.length + 1;
  data.getWorstPerformer = () =>
    employees.sort((a, b) => a.performance - b.performance)[0];
  data.fireOne = () => {
    const worstIndex = data.employees.indexOf(data.getWorstPerformer());
    const unluckyOne = data.employees[worstIndex];
    console.log(
      `${manager.name}: ${unluckyOne.name}, come into my office please.`
    );
    data.employees.splice(worstIndex, 1);
  };
  return data;
};

const kitchenStaff = (business, manager, employees) => {
  const data = staff(business, manager, employees);
  data.assignRoles = (first, second) =>
    data.employees.forEach(
      (employee, index) =>
        index % 2 === 0
          ? (employee.role = 'cook')
          : (employee.role = 'dishwasher')
    );
  data.getCooks = () =>
    data.employees.filter(employee => employee.role === 'cook');
  return data;
};
```

```shell
const myKitchenStaff = kitchenStaff('Amen Ramen', {name: 'Cheongah'}, [{name: 'Phil', performance: 89}, {name: 'Bob', performance: 56}, {name: 'Bob 2', performance: 99}]);

> myKitchenStaff.employees
[ { name: 'Phil', performance: 89 },
  { name: 'Bob', performance: 56 },
  { name: 'Bob 2', performance: 99 } ]

> myKitchenStaff.assignRoles()

> myKitchenStaff.employees
[ { name: 'Phil', performance: 89, role: 'cook' },
  { name: 'Bob', performance: 56, role: 'dishwasher' },
  { name: 'Bob 2', performance: 99, role: 'cook' } ]

> myKitchenStaff.fireOne()
Cheongah: Bob, come into my office please.

> myKitchenStaff.getNumberOfStaff()
3
> myKitchenStaff.assignRoles()
undefined

> myKitchenStaff.getCooks()
[ { name: 'Phil', performance: 89, role: 'cook' } ]
```

### Factory Functions with Mixins or Objects Linked as Other Objects using Object.create

* Offers all practical benefits of classes but without `new` keyword syntax or prototype confusion

```js
const newer = proto => Object.create(proto);

const counter = {
  count: 0,
  increase() {
    this.count++;
    return this;
  },
  double() {
    this.count *= 2;
    return this;
  }
};

const drinkCounter = newer(counter);
```

```shell
// inherit properties from the prototype and customize them
> const drinkCounter = newer(counter);
undefined
> drinkCounter.count = 99;
99
> drinkCounter.takeOneDown = function(){ this.count--; return this;}
[Function]
> drinkCounter.sing = function(){ return `${this.count} bottles of beer on the wall!`;}
[Function]
> drinkCounter.passItAround = function(){ return this; }
[Function]
> drinkCounter.takeOneDown().passItAround().sing();
'98 bottles of beer on the wall!'
> drinkCounter.takeOneDown().passItAround().takeOneDown().passItAround().sing();
'96 bottles of beer on the wall!'
> drinkCounter.double().sing();
'192 bottles of beer on the wall!'
> counter.goToStore = function(){ this.double(); return this;}
[Function]
> drinkCounter.goToStore().sing()
'384 bottles of beer on the wall!'
```

* Use `.__proto__` to find the prototype object

```
> drinkCounter.__proto__
{ count: 0,
  increase: [Function: increase],
  double: [Function: double],
  goToStore: [Function] }
```

* Use `for...in` to iterate through all enumerable properties available to the instance:

```shell
 // properties on the prototype
> const protoProps = []; for(prop in counter){protoProps.push(prop);}
4
> protoProps;
[ 'count', 'increase', 'double', 'goToStore' ]

// properties on the instance
> const props = []; for(prop in drinkCounter){props.push(prop);}
7
> props;
[ 'count',
  'takeOneDown',
  'sing',
  'passItAround',
  'increase',
  'double',
  'goToStore' ]
```

* What about `.constructor` or `.prototype`?

```shell
> drinkCounter.contructor
undefined
> drinkCounter.prototype
undefined
```

### Classes

```js
// ES5

function Barista() {
  this.menu = [
    { name: 'americano', price: { small: 2.99, medium: 3.2 } },
    { name: 'drip', price: { small: 1.99, medium: 2.3 } },
    { name: 'pour-over', price: { small: 3.2, medium: 3.5 } }
  ];
  this.customer = '';
  this.selectedItem = '';
  this.size = '';
  this.quantity = 0;
  this.taxes = 0.0575;
  this.total = 0;
}

Barista.prototype.order = function(customer, quantity, size, selectedItem) {
  this.customer = customer;
  this.quantity = quantity;
  this.size = size;
  this.selectedItem = selectedItem;
  this.setTotal();
};

Barista.prototype.setTotal = function() {
  const selectedItemPrice = this.menu.filter(
    item => item.name === this.selectedItem
  )[0].price[this.size];
  const subtotal = selectedItemPrice * this.quantity;
  this.total = (subtotal + subtotal * this.taxes).toFixed(2);
  this.printReceipt();
};

Barista.prototype.printReceipt = function() {
  console.log(`Your total is: $${this.total}.
	Please wait for your name to be called.`);
  this.serve();
};

Barista.prototype.serve = function() {
  setTimeout(this.callCustomer.bind(this), 3000);
};

Barista.prototype.callCustomer = function() {
  console.log(`Here's ${this.quantity}
	${this.quantity > 1 ? this.selectedItem + 's' : this.selectedItem}
	for a ${this.customer}!`);
};
```

```shell
> const myBarista = new Barista();
undefined
> myBarista.order('Phil', 1, 'small', 'americano');
Your total is: $3.16.
        Please wait for your name to be called.
undefined
> Here's 1
        americano
        for a Phil!
myBarista.order('Phil', 3, 'medium', 'drip');
Your total is: $7.30.
        Please wait for your name to be called.
undefined
> Here's 3
        drips
        for a Phil!
```

```js
// ES6 with "Syntactic Sugar"

class Barista {
  constructor() {
    this.menu = [
      { name: 'americano', price: { small: 2.99, medium: 3.2 } },
      { name: 'drip', price: { small: 1.99, medium: 2.3 } },
      { name: 'pour-over', price: { small: 3.2, medium: 3.5 } }
    ];
    this.customer = '';
    this.selectedItem = '';
    this.size = '';
    this.quantity = 0;
    this.taxes = 0.0575;
    this.total = 0;
  }

  order(customer, quantity, size, selectedItem) {
    this.customer = customer;
    this.quantity = quantity;
    this.size = size;
    this.selectedItem = selectedItem;
    this.setTotal();
  }

  setTotal() {
    const selectedItemPrice = this.menu.filter(
      item => item.name === this.selectedItem
    )[0].price[this.size];
    const subtotal = selectedItemPrice * this.quantity;
    this.total = (subtotal + subtotal * this.taxes).toFixed(2);
    this.printReceipt();
  }

  printReceipt() {
    console.log(`Your total is: $${this.total}.
	Please wait for your name to be called.`);
    this.serve();
  }

  serve() {
    setTimeout(this.callCustomer.bind(this), 3000);
  }

  callCustomer() {
    console.log(`Here's ${this.quantity}
	${this.quantity > 1 ? this.selectedItem + 's' : this.selectedItem}
	for a ${this.customer}!`);
  }
}
```

## Compositional Patterns

Notes from reading Eric Elliott's [series on medium](https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea).

### Reduce

### Curry

```js
const curry = (f, arr = []) => (...args) =>
  (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args]);
```

### Compose

* Passes a value to the input of the last function which returns its output to the input of the previous function, from right to left
* f(g(x))

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```

### Pipe

* Passes a value to the input of the first function which returns its output to the input of the next function, from left to right
* g(f(x))

```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```

### Functors

* Must have a `.map()` interface
* Must obey identity and composition laws
* Should always return the same functor data structure

### Functional Mixins

* Composable factory functions that pipe together
* Encapsulation
* Inheriting private state
* Inheriting from multiple sources
* No base class is required

Return a new object with Object.assign({}, o={}, {})

```js
// TODO: write a more relevant example (composing with has-a, uses-a, can-do, and not is-a).

const person = o => {
  return Object.assign({}, o, {
    say(myName, something) {
      console.log(`${myName}: ${something}`);
      return this;
    }
  });
};

const bartender = o => {
  const minAge = 21;
  const bartenderName = 'Bartender';
  return Object.assign({}, o, {
    askForID() {
      this.say(bartenderName, 'Let me see your ID.');
      this.showID(minAge);
      return this;
    },
    checkID(isOldEnough) {
      if (!isOldEnough) {
        this.say(bartenderName, 'Sorry. Go talk to Congress.');
        return this;
      }
      this.say(bartenderName, 'Old enough.');
      this.takeOrder();
      return this;
    },
    initiateOrder() {
      this.say(bartenderName, 'Hello.');
      this.askForID();
      return this;
    },
    takeOrder() {
      this.say(bartenderName, 'What do you want?');
      this.orderDrink();
      return this;
    },
    makeDrink(drink) {
      this.say(bartenderName, `Okay. Here's your ${drink}.`);
      return this;
    }
  });
};

const customer = o => {
  let isOldEnough = false;
  let { age, drink, name } = o;
  return Object.assign({}, o, {
    getAttention() {
      this.say(name, 'Hey.');
      this.initiateOrder();
      return this;
    },
    showID(min) {
      isOldEnough = age >= min;
      this.checkID(isOldEnough);
      return this;
    },
    orderDrink() {
      this.say(name, drink);
      this.makeDrink(drink);
      return this;
    }
  });
};

const createBar = customerInfo => person(bartender(customer(customerInfo)));
```

```shell
> const myBarScene = createBar({age: 31, drink: 'scotch', name: 'Phil'})

> myBarScene.getAttention()

Phil: Hey.
Bartender: Hello.
Bartender: Let me see your ID.
Bartender: Old enough.
Bartender: What do you want?
Phil: scotch
Bartender: Okay. Here's your scotch.

{ age: 31,
  drink: 'scotch',
  name: 'Phil',
  getAttention: [Function: getAttention],
  showID: [Function: showID],
  orderDrink: [Function: orderDrink],
  checkID: [Function: checkID],
  initiateOrder: [Function: initiateOrder],
  takeOrder: [Function: takeOrder],
  makeDrink: [Function: makeDrink],
  say: [Function: say] }
```

### Factory Functions with Mixins

```js
const withConstructor = constructor => o => {
  const proto = Object.assign({}, Object.getPrototypeOf(o), { constructor });
  return Object.assign(Object.create(proto), o);
};

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const canSpeak = ({ myName }) => o => {
  return {
    ...o,
    says(words) {
      console.log(`${myName}: ${words}`);
    }
  };
};

const canServe = ({ beverage }) => o => {
  return {
    ...o,
    order: '',
    initiateOrder() {
      this.says(`What kind of ${beverage} do you want?`);
      return this;
    },
    receiveOrder(order) {
      this.order = order;
      this.says(`I\'ll get you one ${order}.`);
      return this;
    },
    makeDrink() {
      this.says(`Here\'s your ${this.order}.`);
      return this;
    }
  };
};

const newBarista = ({ beverage = 'coffee' }) =>
  pipe(
    canSpeak({ myName: 'Barista' }),
    canServe({ beverage }),
    withConstructor(newBarista)
  )({});
const myBarista = newBarista({});
```

```shell
> myBarista.initiateOrder().receiveOrder('americano').makeDrink();
Barista: What kind of coffee do you want?
Barista: I'll get you one americano.
Barista: Here's your americano.
newBarista {
  says: [Function: says],
  order: 'americano',
  initiateOrder: [Function: initiateOrder],
  receiveOrder: [Function: receiveOrder],
  makeDrink: [Function: makeDrink] }
```

### Monads

## Asynchronous Patterns

Notes from [Rethinking Asynchronous JavaScript](https://frontendmasters.com/courses/rethinking-async-js/)

### Parallel vs. Async

* Parallel is expressed through threads
* Async runs on a single thread; only one function can be running at any given time; (event loop/call stack)
* Concurrency is two higher level tasks happening within the same timeframe

### Callbacks

```js
const result = {};

function reqListener() {
  const poets = JSON.parse(this.responseText);
  poets.forEach(poet => {
    ajax(`${api}/poems`, function() {
      const poems = JSON.parse(this.responseText)
        .filter(poem => poem.author === poet.name)
        .map(poem => poem.title);
      result[poet.name] = poems;
      if (Object.keys(result).length === poets.length) {
        console.log(result);
      }
    });
  });
}

ajax(`${api}/poets`, reqListener);
```

#### Parallel Request Sequencing Pattern

* Each time a request is made, store a record of the request in an array; store each response in an object; loop through the requests array inside the callback for each response; if there's a call for which there isn't a response, return to exit the loop; for each call for which there is a response and the response hasn't been processed, process it and then set it to processed so that it is skipped in the next iteration.

#### Deficiencies

* Inversion of Control: "there's part of my program that I'm control of executing, and then there's another portion that I'm not in control of executing. The first half of my program executes now, and the second half executes in a calllback, and when I put that in a callback, that gives them control..."
* Trust: not too early, not too late, not too many times, not too few times, no lost context, no swallowed errors
* Not reasonable

### Thunks

* A pattern ontop of callbacks
* A function that has everything it needs to do to give you a value back
* A function with some closured state keeping track of some value(s) and gives you back those whenever you call it
* A container wrapped around that particular collection of state that you can pass around anywhere in your program; which is the fundamental nature of a promise — a wrapper around a value

#### synchronous thunk

```js
function add(x, y) {
  return x + y;
}

var thunk = function() {
  return add(10, 15);
};

thunk(); //25
```

#### asynchronous thunk

* We don't know, nor do we have to care, whether that value is available immediately or will take a while
* Same concept but we need to pass in a callback
* "Thunks are promises without the fancy api"
* A lazy thunk doesn't do the work until you call it the first time
* An active thunk would do the work and hold onto the responses

```js
function addAsync(x, y, cb) {
  setTimeout(function() {
    cb(x + y);
  }, 1000);
}

var thunk = function(cb) {
  addAsync(10, 15, cb);
};

thunk(function(sum) {
  sum;
});
```

#### Thunk Request Sequencing Pattern

* Assign requests to variables, with only the url argument applied
* Call the first request, passing in a callback (for what to do with the response data)
* Inside that callback call the second request, again passing in a callback
* Repeat as required
* Write the request function. Wrap the ajax method in another function that will store a later received response and a later applied callback
* Within this request function, create state variables for the response and the callback.
* Call the ajax method with the url and a new callback
* Inside the ajax callback, check if the later applied request callback has been assigned to its internal variable; if yes, call it, passing in the response; otherwise, save the response to its internal variable
* Return function that captures the later applied callback
* Inside this function, check if the later received response has been assigned to its internal variable; if yes, call the callback with the response variable as its argumen; otherwise, save the callback to the internal callback variable

```js
// the ajax wrapper to store the callback and response until both are ready

function getFile(url) {
  let text, fn;

  ajax(url, function() {
    if (fn) fn(this.responseText);
    else text = this.responseText;
  });

  return function(cb) {
    if (text) cb(text);
    else fn = cb;
  };
}

// partiallaly applied calls to the ajax wrapper
var th1 = getFile(`${api}/poets`);
var th2 = getFile(`${api}/poems`);

//coordinate the responses
th1(function(response) {
  const poets = JSON.parse(response);
  th2(function(response2) {
    const poems = JSON.parse(response2);
    poets.forEach(
      poet =>
        (result[poet.name] = poems
          .filter(poem => poem.author === poet.name)
          .map(poem => poem.title))
    );
    console.log(result);
  });
});
```

### Promises

* Essentially a monad (from functional programming)
* "Promises uninvert the inversion of control"
* A promise is like an event listener, but rather than having a "completion" event, we call that event `then`
* A promise can either `resolve` or `reject`, those are the only two options
* The `then` event is called whenever the promise is either resolved or rejected
* Promises do not eliminate callbacks
* Promises are designed to install trust into the transaction, as a kind of callback manager
* They are resolved only once
* Either success or error
* messages passed/kept
* exceptions become errors
* immutable once resolved
* Chaining promises: in the `then` handler for promise `a`, return promise `b`
* Chaining is not the most important feature. There are better ways to do flow control then promise chaining.

```js
const result = {};

function getFile(url) {
  return new Promise(function(resolve, reject) {
    ajax(url, resolve, reject);
  });
}

var p1 = getFile(`${api}/poets`);
var p2 = getFile(`${api}/poems`);

//coordinate the responses

//need to store the response of the first promise for use in the next promise
let poets;

p1
  .then(response => {
    poets = JSON.parse(response);
  })
  .then(() => p2)
  .then(response => {
    const poems = JSON.parse(response);
    poets.forEach(poet => {
      result[poet.name] = poems
        .filter(poem => poem.author === poet.name)
        .map(poem => poem.title);
    });
    console.log(result);
  })
  .catch(err => console.error('Error: ' + err.statusText));
```

* Avoid nesting pattern; chaining is preferrable

Composing Promises

* Start with an array of urls
* map through them to the ajax request wrapper function
* reduce, using `Promise.resolve()` as the initial value; this creates a resolved Promise
* chain `then`'s to handle each resolved promise

```js
function getFile(url) {
  return new Promise(function(resolve, reject) {
    ajax(url, resolve, reject);
  });
}

const results = {};
let count = 0;

function storeInResults(response) {
  const parsed = JSON.parse(response);
  if (count === 0) {
    results['poets'] = parsed;
  } else if (count === 1) {
    results['poems'] = parsed;
  } else {
    results[count] = parsed;
  }
  count++;
}

function processResults() {
  return results.poets.map(poet => {
    return {
      poet: poet.name,
      poems: results.poems
        .filter(poem => poem.author === poet.name)
        .map(poem => poem.title)
    };
  });
}

[`${api}/poets`, `${api}/poems`]
  .map(getFile)
  .reduce(
    (chain, pr) => chain.then(() => pr).then(storeInResults),
    Promise.resolve()
  )
  .then(processResults)
  .then(console.log)
  .catch(console.error);
```

#### Promise.all

* A type of gate
* Requires successful completion of all to complete

#### Promise.race

* Whichever happens first gets returned to the next `then`
* Can be used to set a time limit

### Generators

### Observables

## File Module Pattern

### CommonJS Modules

* Works out-of-the-box in Node
* Browsers require a loader library or transpiling
* Synchronous API
* One module per file unless used with destructuring

```js
/** Export an anonymous function **/


// tip-utility.js

module.exports = (total, tip) => {
	return total + (total * (tip < 1 ? tip : tip/100));
}

// app.js

const totalWithTip = require('./tip-utility.js');
totalWithTip(50, 20); // 60


/** Export a named function **/

// tip-utility.js

const totalWithTip = (total, tip) => {
	return total + (total * (tip < 1 ? tip : tip/100));
}

module.exports = totalWithTip;

// app.js

const totalWithTip = require('./tip-utility.js');
totalWithTip(50, 20); // 60

/** Export named functions with destructuring **/

// bar-utilities.js

const totalWithTip = (total, tip) => {
    return total + (total * (tip < 1 ? tip : tip / 100));
}

const BAC = (numberOfDrinks, hours, weight, gender) => {
    const alcoholInGrams = numberOfDrinks * 14; // standard drink
    const genderConstant = gender === 'male' ? .68 : .55;
    const bodyWeightInGrams = weight * 454; // lbs only
    const elapsedTime = hours * .015;

    return ((alcoholInGrams / (bodyWeightInGrams * genderConstant)) * 100) - elapsedTime;
}

export.defaults = { totalWithTip, BAC };

// app.js

const { totalWithTip, BAC } = require('./bar-utilities.js');



BAC(5, 2, 165, 'male').toFixed(2); // '0.11'
totalWithTip(50, 20); // 60
```

### AMD

* Support asynchronous module loading

### ES6 Imports

* Requires Babel transpiling for Node and the browser
* Future support for both
* Supports asynchronous module loading

```js
// tip-utility.js

export default (total, tip) => {
	return total + (total * (tip < 1 ? tip : tip/100));
}

// app.js
import totalWithTip from ('./tip-utility.js');
totalWithTip(50, 20); // 60


/** Export named constants **/

// actionTypes.js
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";


// auth.js
import * as actionTypes from "./actionTypes";

actionTypes.AUTH_START; // "AUTH_START"

/** Destructured import example **/

// auth.js
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "./actionTypes";

AUTH_START; // "AUTH_START"
```

## Functional Programming Utilities

### forEach

### map

### filter

### reduce

### flip

### reverseArgs

### spreadArgs

## Data Structures

### Stacks

* First shall be last and last shall be first.
* A good example is the JavaScript function call stack.
* A data container with 2 required methods: `push()` and `pop()`, functionally equivelent to Array.prototype methods of the same name.
* 2 optional methods: `peek()` and `size()`.
* Use a counter to keep track of the last index.

### Queues

* First come, first serve.
* A data container with 2 required methods: `enqueue()` and `dequeue`, functionally equivelent to Array.prototype methods `push()` and `shift()`, respectively.
* 2 optional methods: `peek()` and `size()`.
* Use a counter to keep track of the first and last index.

### Trees

* Optimized to be searchable.
* Everything in the left sub-tree is smaller, everything in the right sub-tree is bigger.
* Occasionally you need to serialize the entire tree into a fat data structure.

### Linked Lists

### Binary Search Trees

### Graphs

* Unidirectional, like Twitter; I follow you but you don't follow me
* Bidirectional, like Facebook; I'm friends with you, you're friends with me
* Models how things connect together
* Trees are a special kind of graph
* Unlike trees, there are circular references, and there's no clear parent-child relationship
* Use breadth first traversal

Source: 4 Semesters of CS in 5 Hours
Part II on [Front End Masters](https://btholt.github.io/four-semesters-of-cs-part-two/).

### Hash Tables

### Tries

* A type of tree
* Classic example use case is for autocomplete
* Starts with a root node that doesn't represent any particular thing; often it's given a `value` of `''`
* It has a bunch of child nodes that represent one letter, each of their children represent second letters of words

## Algorithms

### Recursion

* Iterating by calling a function from within itself.
* DRYer code.
* Can always be implemented as a loop
* Loops are more performant

Examples

* Wrapper functions
* Memos
* Accumulators

Steps to Implement

1.  Identify base case(s).
2.  Identify recursive case(s).
3.  Return where appropriate.
4.  Write procedure for each case that you bring closer the base case(s).

Source: Data Structures and Algorithms in Javascript on [Front End Masters](https://frontendmasters.com/courses/data-structures-algorithms/template-for-a-recursive-function).

### Memoization

### Bubble Sort

### Insertion Sort

### Selection Sort

### Merge Sort

### Quick Sort

### Heap Sort

### Radix Sort

### BST Traversal

### Graph Traversal

### Depth-First Search

* when you know what you're looing for is farther away from the root node
* usually a good use case for recursion

#### three variations for serializing:

##### preorder:

* process the node, then recursibely call the method on the left subtree and then the right subtree
* good for a sorted list of a BST

##### inorder:

* recursively call the method on the left tree, then process the node, and then call the method on the right tree
* good for a deep copy of a tree

##### postorder:

* recursively call the method on the left subtree, then the right subtree, and then process the node.
* good for when you're deleting a tree; delete the node only after you've deleted its children

Source: 4 Semesters of CS in 5 Hours
Part II on [Front End Masters](https://btholt.github.io/four-semesters-of-cs-part-two/).

### Breadth-First Search

* when you know what you're looking for is closer to the root node
* process one layer at a time
* use a queue
* useful for path-finding

Source: 4 Semesters of CS in 5 Hours
Part II on [Front End Masters](https://btholt.github.io/four-semesters-of-cs-part-two/).

### Bloom Filter

### Pathfinding

* finds the shortest path between point A and point B
* use breadth-first traversal
