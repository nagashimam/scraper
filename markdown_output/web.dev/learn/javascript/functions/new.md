*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# The new keyword Stay organized with collections Save and categorize content based on your preferences.

Calling a function with `new` creates a new object using the called function as the "constructor" for that object:

```
function MyFunction() {}
const myObject = new MyFunction();

typeof myObject;
> "object"`
```

This lets a "constructor function" provide a template for the creation of objects that follow the same structural pattern:

```
function MyFunction() {
  this.myProperty = true;
}
const myObject = new MyFunction();

myObject.myProperty;
> true
```

The value of [`this`](/learn/javascript/functions/this) within a constructor function refers to the object being created, letting the object be populated with properties and methods at the time of creation. This allows for the creation of objects that contain data values and any methods needed to act on that data as a single portable unit, a concept called "encapsulation":

```
function MyFunction( myArgument ) {
    this.myValue = myArgument;
    this.doubleMyValue = () => myArgument * 2;
}
const myObject = new MyFunction( 10 );

myObject.myValue;
> 10

myObject.doubleMyValue();
> 20
```

[`this`](/learn/javascript/functions/this) refers to the current execution context of a function, meaning that a constructor function follows the same rules for the value of `this` as any other function. For example, a function intended as a constructor uses [global binding](/learn/javascript/functions/this#global-binding) for the value of `this` when invoked independently:

```
function MyFunction() {
    console.log( this  );
}
const myObject = new MyFunction();
> MyFunction { }

MyFunction(); // Global `this` binding outside of strict mode is `globalThis`
> Window { … }

(function() {
    "use strict";
    function MyFunction() {
            console.log( this );
    }
    MyFunction();  // Global `this` binding inside of strict mode is `undefined`
}());
> undefined
```

It's conventional to capitalize the first character of a constructor function's identifier, following the naming pattern established by JavaScript's built-in factory functions. Though you may sometimes see the terms used interchangeably, constructor functions—functions intended to act on a newly-constructed object when invoked with the `new` keyword—differ from "factory functions," which _explicitly_ [`return`](/learn/javascript/functions/return) an object when invoked normally:

```
function myFunction( myArgument = false ) {
  return { "myProperty" : myArgument };
}
const myObject = myFunction( true );

myObject;
> Object { myProperty: true }
```

Though the underlying principles are the same, the use cases for custom constructor functions are better served by the more fully-featured [Class](/learn/javascript/classes) syntax introduced in ES6.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.