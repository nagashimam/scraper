Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Appendix Stay organized with collections Save and categorize content based on your preferences.

## Prototypal inheritance

With the exception of `null` and `undefined`, each primitive data type has a _prototype_, a corresponding object wrapper that provides methods for working with values. When a method or property lookup is invoked on a primitive, JavaScript wraps the primitive behind the scenes and calls the method or performs the property lookup on the wrapper object instead.

For example, a string literal has no methods of its own, but you can call the `.toUpperCase()` method on it thanks to the corresponding `String` object wrapper:

```
"this is a string literal".toUpperCase();
> THIS IS A STRING LITERAL
```

This is called _prototypal inheritance_—inheriting properties and methods from a value's corresponding constructor.

```
Number.prototype
> Number { 0 }
>  constructor: function Number()
>  toExponential: function toExponential()
>  toFixed: function toFixed()
>  toLocaleString: function toLocaleString()
>  toPrecision: function toPrecision()
>  toString: function toString()
>  valueOf: function valueOf()
>  <prototype>: Object { … }
```

You can create primitives using these constructors, instead of just defining them by their value. For example, using the `String` constructor creates a string object, not a string literal: an object that not only contains our string value, but all the inherited properties and methods of the constructor.

```
const myString = new String( "I'm a string." );

myString;
> String { "I'm a string." }

typeof myString;
> "object"

myString.valueOf();
> "I'm a string."
```

For the most part, the resulting objects behave as the values we've used to define them. For example, even though defining a number value using the `new Number` constructor results in an object containing all the methods and properties of the `Number` prototype, you can use mathematical operators on those objects just as you would on number literals:

```
const numberOne = new Number(1);
const numberTwo = new Number(2);

numberOne;
> Number { 1 }

typeof numberOne;
> "object"

numberTwo;
> Number { 2 }

typeof numberTwo;
> "object"

numberOne + numberTwo;
> 3
```

You'll very rarely need to use these constructors, because JavaScript's built-in prototypal inheritance means they provide no practical benefit. Creating primitives using constructors can also lead to unexpected results, because the result is an object, not a simple literal:

```
let stringLiteral = "String literal."

typeof stringLiteral;
> "string"

let stringObject = new String( "String object." );

stringObject
> "object"
```

This can complicate the use of strict comparison operators:

```
const myStringLiteral = "My string";
const myStringObject = new String( "My string" );

myStringLiteral === "My string";
> true

myStringObject === "My string";
> false
```

## Automatic semicolon insertion (ASI)

While parsing a script, JavaScript interpreters can use a feature called automatic semicolon insertion (ASI) to try to correct instances of omitted semicolons. If the JavaScript parser encounters a token that isn't allowed, it tries to add a semicolon before that token to fix the potential syntax error, as long as one or more of the following conditions is true:

*   That token is separated from the previous token by a line break.
*   That token is `}`.
*   The previous token is `)`, and the inserted semicolon would be the ending semicolon of a `do`…`while` statement.

For more information, refer to [the ASI rules](https://262.ecma-international.org/7.0/#sec-rules-of-automatic-semicolon-insertion).

For example, omitting semicolons after the following statements won't cause a syntax error because of ASI:

```
const myVariable = 2
myVariable + 3
> 5
```

However, ASI can't account for multiple statements on the same line. If you write more than one statement on the same line, make sure to separate them with semicolons:

```
const myVariable = 2 myVariable + 3
> Uncaught SyntaxError: unexpected token: identifier

const myVariable = 2; myVariable + 3;
> 5
```

ASI is an attempt at error correction, not a kind of syntactic flexibility built into JavaScript. Make sure to use semicolons where appropriate so you don't rely on it to produce correct code.

## Strict mode

The standards that govern how JavaScript is written have evolved far beyond anything considered during the early design of the language. Every new change to JavaScript's expected behavior must avoid causing errors in older websites.

ES5 addresses some long-standing issues with JavaScript semantics without breaking existing implementations by introducing "strict mode," a way to opt into a more restrictive set of language rules for either an entire script or an individual function. To enable strict mode, use the string literal `"use strict"`, followed by a semicolon, on the first line of a script or function:

```
"use strict";
```

```
function myFunction() {
  "use strict";
}
```

Strict mode prevents certain "unsafe" actions or deprecated features, throws explicit errors in place of common "silent" ones, and prohibits the use of syntaxes that might collide with future language features. For example, early design decisions around [variable scope](/learn/javascript/data-types/variable#scope) made it more likely for developers to mistakenly "pollute" the global scope when declaring a variable, regardless of the containing context, by omitting the `var` keyword:

```
(function() {
  mySloppyGlobal = true;
}());

mySloppyGlobal;
> true
```

Modern JavaScript runtimes can't correct this behavior without the risk of breaking any website that relies on it, either mistakenly or deliberately. Instead, modern JavaScript prevents it by letting developers opt into strict mode for new work, and enabling strict mode by default only in the context of new language features where they won't break legacy implementations:

```
(function() {
    "use strict";
    mySloppyGlobal = true;
}());
> Uncaught ReferenceError: assignment to undeclared variable mySloppyGlobal
```

You must write `"use strict"` as a [string literal](https://262.ecma-international.org/6.0/#sec-directive-prologues-and-the-use-strict-directive). A [template literal](/learn/javascript/data-types/string#template-literals) (`use strict`) won't work. You must also include `"use strict"` before any executable code in its intended context. Otherwise, the interpreter ignores it.

```
(function() {
    "use strict";
    let myVariable = "String.";
    console.log( myVariable );
    sloppyGlobal = true;
}());
> "String."
> Uncaught ReferenceError: assignment to undeclared variable sloppyGlobal

(function() {
    let myVariable = "String.";
    "use strict";
    console.log( myVariable );
    sloppyGlobal = true;
}());
> "String." // Because there was code prior to "use strict", this variable still pollutes the global scope
```

## By-reference, by-value

Any variable, including properties of an object, [function parameters](/learn/javascript/functions), and elements in an [array](/learn/javascript/collections/indexed#array), [set](/learn/javascript/collections/keyed#set), or [map](/learn/javascript/collections/keyed#map), can contain either a primitive value or a _reference value_.

When a primitive value is assigned from one variable to another, the JavaScript engine creates a copy of that value and assigns it to the variable.

When you assign an object (class instances, arrays, and functions) to a variable, instead of creating a new copy of that object, the variable contains a reference to the object's stored position in memory. Because of this, changing an object referenced by a variable changes the object being referenced, not just a value contained by that variable. For example, if you initialize a new variable with a variable containing an object reference, then use the new variable to add a property to that object, the property and its value are added to the original object:

```
const myObject = {};
const myObjectReference = myObject;

myObjectReference.myProperty = true;

myObject;
> Object { myProperty: true }
```

This is important not only for altering objects, but also for performing strict comparisons, because strict equality between objects requires both variables to reference _the same object_ to evaluate to `true`. They can't reference different objects, even if those objects are structurally identical:

```
const myObject = {};
const myReferencedObject = myObject;
const myNewObject = {};

myObject === myNewObject;
> false

myObject === myReferencedObject;
> true
```

## Memory allocation

JavaScript uses automatic memory management, meaning that memory doesn't need to be explicitly allocated or deallocated during the course of development. While the details of JavaScript engines' approaches to memory management are beyond the scope of this module, understanding how memory is allocated provides useful context for working with reference values.

There are two "areas" in memory: the "stack" and the "heap." The stack stores static data—primitive values and references to objects—because the fixed amount of space needed to store this data can be allocated before the script executes. The heap stores objects, which need dynamically-allocated space because their size can change during execution. Memory is freed by a process called "garbage collection," which removes objects with no references from memory.

### The main thread

JavaScript is a fundamentally single-threaded language with a "synchronous" execution model, meaning it can execute only one [task](/articles/optimize-long-tasks) at a time. This sequential execution context is called the _main thread_.

The main thread is shared by other browser tasks, such as parsing HTML, rendering and re-rendering parts of the page, running CSS animations, and handling user interactions ranging from the simple (like highlighting text) to the complex (like interacting with form elements). Browser vendors have found ways to optimize the tasks performed by the main thread, but more complex scripts can still use too much of the main thread's resources and impact overall page performance.

Some tasks can be executed in background threads called [Web Workers](/articles/off-main-thread), with some limitations:

*   Worker threads can only act on standalone JavaScript files.
*   They have severely reduced or no access to the browser window and UI.
*   They're limited in how the can communicate with the main thread.

These limitations make them ideal for focused, resource-intensive tasks that might otherwise occupy the main thread.

### The call stack

The data structure used to manage "execution contexts"—the code being actively executed—is a list called the _call stack_ (frequently just "the stack"). When a script is first executed, the JavaScript interpreter creates a "global execution context" and pushes it to the call stack, with statements inside that global context executed one at a time, from top to bottom. When the interpreter encounters a function call while executing the global context, it pushes a "function execution context" for that call onto the top of the stack, pauses the global execution context, and executes the function execution context.

Each time a function is called, the function execution context for that call is pushed onto the top of the stack, just above the current execution context. The call stack operates on a "last in, first out" basis, meaning that the most recent function call, which is highest in the stack, is executed and continues until it resolves. When that function is complete, the interpreter removes it from the call stack, and the execution context that contains that function call becomes the highest item in the stack again and resumes execution.

These execution contexts capture any values necessary to their execution. They also establish the variables and functions available within the scope of the function based on its parent context, and determine and set the value of the `this` keyword in the context of the function.

### The event loop and callback queue

This sequential execution means that asynchronous tasks that include callback functions, such as fetching data from a server, responding to user interaction, or waiting for timers set with `setTimeout` or `setInterval`, would either block the main thread until that task is complete, or unexpectedly interrupt the current execution context the moment the callback function's execution context is added to the stack. To address this, JavaScript manages asynchronous tasks using an event-driven "concurrency model" made up of the "event loop" and the "callback queue" (sometimes referred to as the "message queue").

When an asynchronous task is executed on the main thread, the callback function's execution context is placed in the callback queue, not on top of the call stack. The event loop is a pattern sometimes called a [reactor](https://en.wikipedia.org/wiki/Reactor_pattern), which continuously polls the status of the call stack and the callback queue. If there are tasks in the callback queue and the event loop determines that the call stack is empty, tasks from the callback queue are pushed to the stack one at a time to be executed.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.