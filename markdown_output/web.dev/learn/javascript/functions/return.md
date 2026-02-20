Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# The return keyword Stay organized with collections Save and categorize content based on your preferences.

Use `return` to specify the value that the function should produce as a final result. When the interpreter reaches a `return` statement, the function that contains that statement immediately ends, and the specified value is returned to the context where the function was called:

```
const myFunction = function() {
   return 2 + 2;
}

myFunction();
> 4
```

A function that returns a value can be effectively treated as the data it contains, similar to a variable:

```
const myFunction = function() {
   return 2 + 2;
}

myFunction() + myFunction();
> 8
```

A `return` statement without an expression ends the function and returns `undefined`:

```
const myFunction = function() {
   return;
}

myFunction();
> undefined
```

Because the `return` keyword signals the end of a function, any code that follows an encountered `return` isn't executed:

```
const myFunction = function() {
   return true;
   console.log( "This is a string." );
}

myFunction();
> true
```

Additionally, code following an encountered `return` statement might result in a warning (but not an error) in some browsers' development consoles:

```
const myFunction = function() {
   return true;
   console.log( "This is a string." );
}
> unreachable code after return statement

myFunction();
> true
```

Again, this only applies to a `return` statement encountered during the execution of the function, not any code that follows a `return` statement sequentially:

```
const myFunction = function( myParameter ) {
   if( myParameter === undefined ) {
    return "This is the result.";
   }
   return "This is the alternate result.";
}

myFunction();
> "This is the result."

myFunction( true );
> "This is the alternate result."
```

"Short circuiting" a function using an early `return` can allow for more concise code than a single `return` statement at the end of a function. For example, the following function determines whether a passed value is a string containing five or more characters. If the passed value isn't a string literal, the code that counts the characters is unnecessary, and the function can return a `false` result immediately:

```
function myFunction( myString ) {
   if( typeof myString !== "string" ) {
    return false;
   }
   if( myString.length >= 5 ) {
    return true;
   } else {
    return false;
   }
}

myFunction( 100 );
> false

myFunction( "St" );
> false

myFunction( "String." );
> true
```

[Arrow function expressions](/learn/javascript/functions/function-expressions#arrow-functions) are unique in that the `return` keyword is implied when an arrow function body contains a single expression and no block syntax:

```
const myFunction = () => 2 + 2;

myFunction();
> 4
```

If you use block syntax to define the arrow function body, an explicit `return` is required, even if the function body only contains a single expression:

```
const myFunction = () => { 2 + 2 };

myFunction();
> undefined
```

```
const myFunction = () => { return 2 + 2 };

myFunction();
> 4
```

## Check your understanding

What is `return` used for?

Specifying the final result of a function.

Returning the code to the start of the function.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.