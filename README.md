# Exploring Composition Patterns with Algorithms and Data Structures

## Building Blocks

### Functions

* Predictable and easy to test as long (as long as you separate "pure" functions from functions with side effects)

```
const Identity = val => val;

> Identity(3); //3
```

### Objects Literals with Methods

* Provides namespacing
* Supports method chaining
* Supports only one instance

```
const counter = {
	count: 0,
	increase(){
		this.count++;
		return this;
	},
	double(){
		this.count *= 2;
		return this;
	}
}

> counter.count // 0
> counter.increase().count // 1
> counter.increase().double().count // 4
```

### Factory Functions

* Supports many instances
* Supports encapsulation or hiding internal state from a public api

```
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

/** Console
*
* counter().increase().increase().double().count // 4
* counter().count // 0
*
**/

const bartender = () => {
    const secretIngredient = 'ice';
    const api = {
        makeDrink: function (order = 'vodka') {
            let drink = `${order}-${secretIngredient}`;
            return api.serveDrink(drink);
        },
        serveDrink: function (drink) {
            return drink;
        }
    }
    return api;
};

/** Console
*
* bartender().makeDrink() // 'vodka-ice'
* bartender().makeDrink('whisky') // 'whisky-ice'
*
**/

// Singleton (IIFE variation)

const bartender = (() => {
    const secretIngredient = 'ice';
    const api = {
        makeDrink: function (order = 'vodka') {
            let drink = `${order}-${secretIngredient}`;
            api.serveDrink(drink);
        },
        serveDrink: function (drink) {
            console.log(drink);
        }
    }
    return api;
})();

/** Console
*
* bartender.makeDrink('whisky'); // whisky-ice
*
**/


// Passing State (Redux-like)

const store = (
    state = { bottles_of_beer: 99 },
    action) => {
    switch (action) {
        case 'TAKE_ONE_DOWN':
            return {
                ...state,
                bottles_of_beer: state.bottles_of_beer - 1
            }
        case 'SING':
            console.log(`${state.bottles_of_beer} bottles of beer on the wall`);
            return state;
        default:
            return state;
    }
}

/** Console
*
* store(store(undefined, 'TAKE_ONE_DOWN'), 'SING'); // 98 bottles of beer on the wall
* // { bottles_of_beer: 98 }
*
**/
```

### Functional Inheritence

* Mimics class behavior, but includes class inheritence is-a relationship hurdles

```
const staff = (business, manager, employees) => {
    const data = { business, manager, employees };
    data.getNumberOfStaff = () => employees.length + 1;
    data.getWorstPerformer = () => employees.sort((a, b) => a.performance - b.performance)[0];
    data.fireOne = () => {
        const worstIndex = data.employees.indexOf(data.getWorstPerformer());
        const unluckyOne = data.employees[worstIndex];
        console.log(`${manager.name}: ${unluckyOne.name}, come into my office please.`);
        data.employees.splice(worstIndex, 1);
    };
    return data;
}

const kitchenStaff = (business, manager, employees) => {
    const data = staff(business, manager, employees);
    data.assignRoles = (first, second) => data.employees
        .forEach((employee, index) => index % 2 === 0 ? employee.role = 'cook' : employee.role = 'dishwasher');
    data.getCooks = () => data.employees.filter(employee => employee.role === 'cook');
    return data;
}

/**
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

**/
```

### Factory Functions with Mixins or Objects Linked as Other Objects using Object.create

* Offers all practical benefits of classes but without `new` keyword syntax or prototype confusion

```
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
}

const drinkCounter = newer(counter);

/** Console
* // inherit properties from the prototype and customize them
* drinkCounter.count = 99;
* drinkCounter.takeOneDown = function(){ this.count--; return this;}
* drinkCounter.sing = function(){ return `${this.count} bottles of beer on the wall!`;}
* drinkCounter.passItAround = function(){ return this; }
*
* drinkCounter.takeOneDown().passItAround().sing(); // '98 bottles of beer on the wall!'
* drinkCounter.takeOneDown().passItAround().takeOneDown().passItAround().sing(); // '96 bottles of beer on the wall!'
* drinkCounter.double().sing(); // '192 bottles of beer on the wall!'
*
* // add methods to the prototype
* counter.goToStore = function(){ this.double(); return this;}
* drinkCounter.goToStore().sing() // '384 bottles of beer on the wall!'
*
*
**/
```

* Use `.__proto__` to find the prototype object

```
/**
*
* drinkCounter.__proto__
*
*{ count: 0,
* increase: [Function: increase],
* double: [Function: double],
* goToStore: [Function] }
*
**/
```

* Use `for...in` to iterate through all enumerable properties available to the instance:

```
/**
*
* // properties on the prototype
* const protoProps = []; for(prop in counter){protoProps.push(prop);} protoProps; // [ 'count', 'increase', 'double', 'goToStore' ]
*
* // properties on the instance
* const props = []; for(prop in drinkCounter){props.push(prop);} props; // ['takeOneDown','sing','passItAround','count','increase','double','goToStore']
*
**/
```

* What about `.constructor` or `.prototype`?

```
/**
*
* drinkCounter.contructor // undefined
* drinkCounter.prototype // undefined
*
**/
```

### Classes

```
// ES5

function Barista() {
    this.menu = [
        { name: "americano", price: { small: 2.99, medium: 3.20 } },
        { name: "drip", price: { small: 1.99, medium: 2.30 } },
        { name: "pour-over", price: { small: 3.20, medium: 3.50 } }
    ];
    this.customer = '';
    this.selectedItem = '';
    this.size = '';
    this.quantity = 0;
    this.taxes = .0575;
    this.total = 0;
}

Barista.prototype.order = function (customer, quantity, size, selectedItem) {
    this.customer = customer;
    this.quantity = quantity;
    this.size = size;
    this.selectedItem = selectedItem;
    this.setTotal();
}

Barista.prototype.setTotal = function () {
    const selectedItemPrice = this.menu
        .filter(item => item.name === this.selectedItem)[0].price[this.size];
    const subtotal = selectedItemPrice * this.quantity;
    this.total = (subtotal + (subtotal * this.taxes)).toFixed(2);
    this.printReceipt();
}

Barista.prototype.printReceipt = function () {
    console.log(`Your total is: $${this.total}.
	Please wait for your name to be called.`);
    this.serve();
}

Barista.prototype.serve = function () {
    setTimeout(this.callCustomer.bind(this), 3000);
}

Barista.prototype.callCustomer = function () {
    console.log(`Here's ${this.quantity}
	${this.quantity > 1 ? this.selectedItem + 's' : this.selectedItem}
	for a ${this.customer}!`);
}


/**
*
* const myBarista = new Barista();
* myBarista.order('Phil', 1, 'small', 'americano'); // Your total is: $3.16. Please wait for your name to be called.
* // Here's 1 americano for a Phil!
*
* myBarista.order('Phil', 3, 'medium', 'drip'); // Your total is: $7.30. Please wait for your name to be called.
* // Here's 3 drips for a Phil!
**/


// ES6 with "Syntactic Sugar"

class Barista {
    constructor() {
        this.menu = [
            { name: "americano", price: { small: 2.99, medium: 3.20 } },
            { name: "drip", price: { small: 1.99, medium: 2.30 } },
            { name: "pour-over", price: { small: 3.20, medium: 3.50 } }
        ];
        this.customer = '';
        this.selectedItem = '';
        this.size = '';
        this.quantity = 0;
        this.taxes = .0575;
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
        const selectedItemPrice = this.menu
            .filter(item => item.name === this.selectedItem)[0]
            .price[this.size];
        const subtotal = selectedItemPrice * this.quantity;
        this.total = (subtotal + (subtotal * this.taxes)).toFixed(2);
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

```
const curry = (f, arr = []) =>
(...args) =>
(a => a.length === f.length ? f(...a) : curry(f, a))([...arr, ...args]);
```

### Compose

* Passes a value to the input of the last function which returns its output to the input of the previous function, from right to left
* f(g(x))

```
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```

### Pipe

* Passes a value to the input of the first function which returns its output to the input of the next function, from left to right
* g(f(x))

```
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

```
// TODO: write a more relevant example (composing with has-a, uses-a, can-do, and not is-a).

const person = o => {
    return Object.assign({}, o, {
        say(myName, something) {
            console.log(`${myName}: ${something}`);
            return this;
        }
    })
}

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
                this.say(bartenderName, "Sorry. Go talk to Congress.");
                return this;
            }
            this.say(bartenderName, 'Old enough.')
            this.takeOrder();
            return this;
        },
        initiateOrder() {
            this.say(bartenderName, 'Hello.')
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
    })
}

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
    })
}

const createBar = customerInfo => person(bartender(customer(customerInfo)));

/**

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
**/
```

### Factory Functions with Mixins

```
const withConstructor = constructor => o => {
    const proto = Object.assign({},
        Object.getPrototypeOf(o),
        { constructor }
    );
    return Object.assign(Object.create(proto), o);
};

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const canSpeak = ({ myName }) => o => {
    return {
        ...o,
        says(words) {
            console.log(`${myName}: ${words}`);
        }
    }
}

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
            this.says(`I\'ll get you one ${order}.`)
            return this;
        },
        makeDrink() {
            this.says(`Here\'s your ${this.order}.`);
            return this;
        }
    }
}

const newBarista = ({ beverage = 'coffee' }) => pipe(canSpeak({ myName: 'Barista' }), canServe({ beverage }), withConstructor(newBarista))({});
const myBarista = newBarista({});

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
>
```

### Monads

## File Module Pattern

### CommonJS Modules

* Works out-of-the-box in Node
* Browsers require a loader library or transpiling
* Synchronous API
* One module per file unless used with destructuring

```
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

```
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
import * as actionTypes from './actionTypes";

actionTypes.AUTH_START; // "AUTH_START"


/** Destructured import example **/

// auth.js
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './actionTypes";

AUTH_START; // "AUTH_START"
```

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

### Linked Lists

### Binary Search Trees

### Graphs

### Hash Tables

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

1. Identify base case(s).
2. Identify recursive case(s).
3. Return where appropriate.
4. Write procedure for each case that you bring closer the base case(s).

Source: Data Structures and Algorithms in Javascript on [Front End Masters](https://frontendmasters.com/courses/data-structures-algorithms/template-for-a-recursive-function).

### Memoization

### Bubble Sort

### Insertion Sort

### Selection Sort

### Merge Sort

### Quick Sort

### BST Traversal

### Graph Traversal

### Depth-First Search

### Breadth-First Search
