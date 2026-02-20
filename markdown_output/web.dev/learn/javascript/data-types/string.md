Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Strings Stay organized with collections Save and categorize content based on your preferences.

Any set of characters—letters, numbers, symbols, and so on—between a set of either double quotation marks (`"`), single quotation marks (`'`), or backticks (\`) is a string primitive. You've already seen a few examples of strings in this course: the instances of `console.log` in the previous module contained string primitives.

```
console.log( "Hello, World." );
> Hello, World.
```

`"Hello, World."` is a string primitive. You get the same result with single quotes or backticks:

```
console.log( 'Hello, World.' );
> Hello, World.

console.log(`Hello, World.`);
> Hello, World.
```

A series of characters enclosed in quotation marks is called a _string literal_. Double and single quotes behave in the same way, and one can contain the other as a character in the string itself:

```
console.log( "I'm a string." );
> I'm a string.

console.log( '"A string," I said.' );
> "A string," I said.
```

An instance of the same enclosing character within the string "closes" the string, likely causing errors:

```
console.log( '"I'm a string," I said.' );
> Uncaught SyntaxError: missing ) after argument list
```

To avoid this, escape the character using a backslash (`\`):

```
console.log( '"I\'m a string," I said.' );
> "I'm a string," I said.
```

## String object

When called as a function, the `String` object coerces a specified value to a string literal.

```
let myString = String( 10 );

myString
> "10"

typeof myString
> string
```

As detailed in [prototypal inheritance](/learn/javascript/appendix#prototyal-inheritance), you'll rarely need to use the `String` object as a constructor. It creates a string object containing the specified value, alongside the methods and properties already afforded by the `String` object, instead of a string literal.

```
let stringObj = new String( "My new string." );

typeof stringObj
> object

stringObj
> String { "My new string." }
```

## Concatenation

When used in the context of strings instead of numbers, a single plus sign (`+`) acts as a concatenation operator, combining multiple string values into a single string:

```
console.log( "My" + " string." );
> My string.
```

## String literals and template literals

Single quotes, double quotes, and backticks can be used interchangeably for creating string primitives. However, you can also use backticks to specify _template literals_ (sometimes called "template strings"). Unlike the _string literals_ created by single or double quotes, template literals allow for multi-line strings and string interpolation.

```
const myString = "This
is a string.";
> Uncaught SyntaxError: "" string literal contains an unescaped line break

const myString = `This
is a string.`;

console.log( myString );

> This
is a string.
```

Template literals can contain placeholder expressions marked by a dollar sign and curly braces (`${}`). These placeholders are "interpolated" by default, meaning that the result of the expression replaces the placeholder in the final string.

```
console.log( "The result is " + ( 2 + 4 ) + "." );
> The result is 6.
```

```
console.log( `The result is ${ 2 + 4 }.` );
> The result is 6.
```

A template literal can be passed to a [custom function](/learn/javascript/functions) to create a _tagged template_, a function call that uses a single template literal as a set of arguments and lets its placeholders populate based on author-defined logic.

The first argument of a tag function contains an array of string values, and the remaining arguments define the placeholders. This array of string values is created by "splitting" the template literal at each placeholder it contains. The first element in the array contains any characters up to the first placeholder, the second element contains any characters between the first and second placeholders, and so on. Each placeholder is passed to the tag function as a standalone value with an associated placeholder.

```
const myNoun = "template literal";

function myTagFunction( myStrings, myPlaceholder ) {
    const myInitialString = myStrings[ 0 ];
    console.log( `${ myInitialString }modified ${ myPlaceholder }.` );
}

myTagFunction`I'm a ${ myNoun }.`;
> "I'm a modified template literal."
```

## Check your understanding

Which character is used to escape characters?

A backslash (`∖`)

A double quote (`"`)

A forward slash (`/`)

Which character is used for concatenation?

`+`

`&`

`.`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.