Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Functions Stay organized with collections Save and categorize content based on your preferences.

A function is a modular, reusable block of statements used to perform a set of related tasks, such as calculating and returning a value based on arguments provided to the function. As with [all non-primitive values](/learn/javascript/objects), functions are objects. They are unique objects in that they can be [called](#function-calling) to execute code, be passed data in the form of [arguments](#function-calling), and [return](/learn/javascript/functions/return) a value.

Functions are thought of as "[first class](https://en.wikipedia.org/wiki/First-class_citizen)" objects, meaning that despite their unique behavior, they can be used in all the same contexts as any other JavaScript object. For example, a function can be assigned to a variable, passed as an argument to other functions, and returned by other functions.

```
function myFunction() {
   console.log( "This is my function." );
};
```

A function defined as a property of an [object](/learn/javascript/objects) is usually called a "method." As with [variables declared using `var`](/learn/javascript/data-types/variable)\`, function declarations made outside an enclosing function are added to the [global object](/learn/javascript/data-types/variable#global-scope) as methods.

## Function declarations

A function declaration (also called a "function statement" or "function definition") creates a named function that can be invoked elsewhere in its containing scope. Function declarations consist of the `function` keyword followed by an identifier, a list of comma-separated parameters enclosed in parentheses, and a [block statement](/learn/javascript/introduction#block-statements) called the "function body." You'll frequently encounter function declarations that don't end with a semicolon; because a function declaration is a statement, trailing semicolons can be inferred by [ASI](/learn/javascript/appendix#ASI).

```
function myFunction() {
   console.log( "This is my function." );
};

myFunction();
> "This is my function."
```

As a holdover from JavaScript's early design decisions, function declarations are subject to the same legacy [hoisting](/learn/javascript/data-types/variable#hoisting) behavior as variables declared with `var`, meaning that a function declaration is hoisted to the top of its scope, and can be called prior to declaration as a result, whether or not that scope is governed by [strict mode](/learn/javascript/appendix#strict-mode):

```
"use strict";
{
    myFunction();
    function myFunction() {
        console.log( "This is my function." );
    };
}
> "This is my function."
```

Outside [strict mode](/learn/javascript/appendix#strict-mode), function declarations use JavaScript's legacy [scoping](/learn/javascript/data-types/variable#scope) behavior, meaning that a function declaration is scoped to its closest enclosing function:

```
function myFunction() {
    function myNestedFunction() {
        console.log( "This is my nested function." );
    }
    myNestedFunction();
};

myFunction();
> "This is my nested function."

myNestedFunction();
>Uncaught ReferenceError: myNestedFunction is not defined
```

In [strict mode](/learn/javascript/appendix#strict-mode), function declarations are scoped to their nearest enclosing block, as with variables declared using `let` or `const`:

```
"use strict";
{
    function myFunction() {
        console.log( "This is my function." );
    };
}

myFunction();
> Uncaught ReferenceError: myFunction is not defined
```

## Function calling

As with variables, the identifier used when declaring a function acts as a symbolic name for a value. Referencing a function by identifier alone returns only the function object, and doesn't execute the function it contains:

```
function myFunction() {
   console.log( "This is my function." );
};

myFunction;
> myFunction() {
   console.log( "This is my function." );
}
```

To execute the code inside the function body, _call_ (or _invoke_) the function by following the function name with a matched pair of parentheses:

```
function myFunction() {
    console.log( "My function has been executed." );
}

myFunction();
> "My function has been executed."
```

The parameters in the function definition act as placeholder variables for values that can be passed into the function body when the function is called. The values in the parentheses when a function is called are "arguments" (though you might see "arguments" used to describe both arguments and parameters in some documentation):

```
function myFunction( myParameter ) {
   console.log( `The value is: ${ myParameter }.` );
};

myFunction( "this string" );
> "The value is: this string."
```

If an expected argument is omitted, the resulting parameter contains an `undefined` value, because the parameter is declared to the function body but not initialized with a value:

```
function myFunction( myParameter ) {
   console.log( `The value is: ${ myParameter }.` );
};

myFunction();
> "The value is: undefined."
```

You can set default parameter values by initializing them the same way you would initialize a variable: an assignment operator (`=`) followed by a value. If you later specify an argument for that function, that new value overrides the default value:

```
function myFunction( myParameter = "omitted" ) {
   console.log( `The value is: ${ myParameter }.` );
};

myFunction( "this string" );
> "The value is: this string."

myFunction();
> "The value is: omitted."
```

The body of a [non-arrow](/learn/javascript/functions/function-expressions#arrow-functions) function also has access to a zero-indexed, [array](/learn/javascript/collections/indexed#array)\-like `arguments` object containing any values passed as arguments, whether or not the function definition specifies parameters:

```
function myFunction() {
   console.log( arguments );
};

myFunction( 3, true, "My string" );
> Arguments { 0: 3, 1: true, 2: "My string", … }
```

### Variadic functions

The `arguments` object lets you create basic _variadic functions_, which can accept a variable number of arguments:

```
function myFunction() {
    let result = "";
    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i] + " - ";
    }
    console.log( result );
};

myFunction( "My first string", "My second string", "my third string" );\
> "My first string - My second string - my third string - "
```

However, this approach to variadic functions is rarely used in modern JavaScript development. It's more common to use the more modern and readable [rest parameter syntax](/learn/javascript/collections/indexed#rest-operator), which creates a named parameter initialized as an array containing any arguments beyond those explicitly specified:

```
function myFunction( mySeparator, ...myStrings ) {
  console.log( myStrings.join( mySeparator ) );
};

myFunction( " - ", "My first string", "My second string", "my third string" );
> "My first string - My second string - my third string"
```

Unlike `parameter` binding, rest parameter syntax works as expected with arrow function parameters:

```
function myOuterFunction() {
    let myInnerArrowFunction = ( ...myParams ) => {
        console.log( myParams[ 0 ] );
    }
    myInnerArrowFunction( true );
};

myOuterFunction( false );
> true

let myArrowFunction = ( ...myParams ) => {
    console.log( myParams[ 0 ] );
};

myArrowFunction( true );
> true`
``
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.