# Exploring Composition Patterns with Algorithms and Data Structures

## Building Blocks

### Functions

* Predictable and easy to test as long (as long as you separate "pure" functions from functions with side effects)

```
const Identity = val => val;

/** Console
*
* Identity(3); //3
*
**/
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

/** Console
*
* counter.count // 0
* counter.increase().count // 1
* counter.increase().double().count // 4
*
**/
```

### Factory Functions

* Supports many instances
* Supports encapsulation or hiding internal state from a public api

```
const counter = () => ({
	count: 0,
	increase(){
		this.count++;
		return this;
	},
	double(){
		this.count *= 2;
		return this;
	}
})

/** Console
*
* counter().increase().increase().double().count // 4
* counter().count // 0
*
**/

const bartender = () => {
	const secretIngredient = 'ice';
	const api = {
		makeDrink: function(order = 'vodka'){
			let drink = `${order}-${secretIngredient}`;
			return api.serveDrink(drink);
		},
		serveDrink: function(drink){
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
		makeDrink: function(order = 'vodka'){
			let drink = `${order}-${secretIngredient}`;
			api.serveDrink(drink);
		},
		serveDrink: function(drink){
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
	state = { bottles_of_beer: 99},
	action) => {
	switch(action){
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

### Factory Functions with Mixins or Objects Linked as Other Objects using Object.create

* Offers all practical benefits of classes but without `new` keyword syntax or prototype confusion

```
const newer = proto => Object.create(proto);

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

function Barista(){
	this.menu = [
		{name: "americano", price: {small: 2.99, medium: 3.20}},
		{name: "drip", price: {small: 1.99, medium: 2.30}},
		{name: "pour-over", price: {small: 3.20, medium: 3.50}}
		];
	this.customer = '';
	this.selectedItem = '';
	this.size = '';
	this.quantity = 0;
	this.taxes = .0575;
	this.total = 0;
}

Barista.prototype.order = function(customer, quantity, size, selectedItem){
	this.customer = customer;
	this.quantity = quantity;
	this.size = size;
	this.selectedItem = selectedItem;
	this.setTotal();
}

Barista.prototype.setTotal = function(){
	const selectedItemPrice = this.menu
	.filter(item => item.name === this.selectedItem)[0].price[this.size];
	const subtotal = selectedItemPrice * this.quantity;
	this.total = (subtotal + (subtotal * this.taxes)).toFixed(2);
	this.printReceipt();
}

Barista.prototype.printReceipt = function(){
	console.log(`Your total is: $${this.total}.
	Please wait for your name to be called.`);
	this.serve();
}

Barista.prototype.serve = function(){
	setTimeout(this.callCustomer.bind(this), 3000);
}

Barista.prototype.callCustomer = function(){
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
	constructor(){
	this.menu = [
		{name: "americano", price: {small: 2.99, medium: 3.20}},
		{name: "drip", price: {small: 1.99, medium: 2.30}},
		{name: "pour-over", price: {small: 3.20, medium: 3.50}}
		];
	this.customer = '';
	this.selectedItem = '';
	this.size = '';
	this.quantity = 0;
	this.taxes = .0575;
	this.total = 0;
	}

order(customer, quantity, size, selectedItem){
	this.customer = customer;
	this.quantity = quantity;
	this.size = size;
	this.selectedItem = selectedItem;
	this.setTotal();
}

setTotal(){
	const selectedItemPrice = this.menu
	.filter(item => item.name === this.selectedItem)[0]
	.price[this.size];
	const subtotal = selectedItemPrice * this.quantity;
	this.total = (subtotal + (subtotal * this.taxes)).toFixed(2);
	this.printReceipt();
}

printReceipt(){
	console.log(`Your total is: $${this.total}.
	Please wait for your name to be called.`);
	this.serve();
}

serve(){
	setTimeout(this.callCustomer.bind(this), 3000);
}

callCustomer(){
	console.log(`Here's ${this.quantity}
	${this.quantity > 1 ? this.selectedItem + 's' : this.selectedItem}
	for a ${this.customer}!`);
}

}
```

## Composition

### Curry

### Memoize

### Reduce

### Compose

### Pipe

### Functors

### Functional Mixins

### Monads

## Modules

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
	return total + (total * (tip < 1 ? tip : tip/100));
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

### Queues

### Trees

### Linked Lists

### Binary Search Trees

### Graphs

### Hash Tables

## Algorithms

### Recursion

### Bubble Sort

### Insertion Sort

### Selection Sort

### Merge Sort

### Quick Sort

### BST Traversal

### Graph Traversal

### Depth-First Search

### Breadth-First Search
