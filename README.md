## Functions

```
const foo = function(val){
	return val;
	}
```

## Objects (or namespacing)

```
const foo = {
	o: { bar: "bar"},
	bar(){
	console.log(this.o.bar);
	}
};

foo.bar();

```

## Factory Functions or Module Pattern

- can encapsulate or hide a part of the application that we don't want to expose
- more difficult to unit test (may require dependency injection) unless all you care about is testing the public api

// singleton

```
const foo = (function(){
	const publicAPI = {
		bar: function(){
		publicAPI.baz();
	},
	baz: function(){
		console.log('baz');
	}
	}
	return publicAPI;
})();

foo.bar();
```

// module factory function

```
const foo = function(){
	const publicAPI = {
	bar: function(){
	publicAPI.baz();
	},
	baz: function(){
	console.log('baz');
		}
	}
	return publicAPI;
}
foo().bar();
```

// es6 file-based module pattern

// foo.js

```
const o = {
bar: "bar"
};

export function bar(){
return o.bar;
}

import {bar} from "foo.js";
bar();
```

## Functional Mixins? Delegation: Objects Linked as Other Objects using Object.create



## ES5 Prototypal Classes

What properties are available to my class?

for...in iterates over all the numerable properties of an object, including those in the prototype chain.




## ES6 Syntactic Prototypal Classes

```
Object.create = function(o) {
function F(){}
F.prototype = o;
return new F();
}
```


Object.assign( );

for event handlers use this.method.bind(this);




