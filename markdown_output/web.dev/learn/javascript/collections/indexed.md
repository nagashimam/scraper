*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Indexed collections Stay organized with collections Save and categorize content based on your preferences.

An indexed collection is a data structure in which elements are stored and accessed using numbered indexes. Values stored in an indexed collection are assigned numbered indexes starting from `0`, a pattern called "zero-indexing." You can then access the values stored in an indexed collection by referencing their indexes.

## Array

An array is a container that can hold zero or more values of any data type, including complex objects or other arrays. Values stored in an array are sometimes called "elements" of the array.

### Create an array

As with primitive data types, there are two approaches to creating an array: as an array literal, or by invoking JavaScript's built-in `Array()` constructor with `new Array()`. Assigning an array to a variable provides a highly portable and [iterable](/learn/javascript/control-flow#iterators) way to assign multiple values to a single identifier.

Array literal syntax uses a set of brackets (`[]`) surrounding zero or more comma-separated data values:

```
const myArray = [];
```

Array constructor syntax uses JavaScript's built-in `Array` object as a constructor with the `new` keyword:

```
const myArray = new Array();
```

Both array literal and array constructor syntaxes let you populate an array with information when it's created, though the syntaxes differ slightly in how those values are defined. Array literal syntax uses comma-separated values between the brackets, which looks the same as the resulting array:

```
const myArray = [ true, null, "String", false ];

myArray;
> [ true, null, "String", false ]
```

The array constructor syntax takes comma-separated values as arguments, with one special behavioral exception:

```
const myArray = new Array( true, null, "String", false );

myArray;
> Array(4) [ true, null, "String", false ]
```

When a single _numerical_ value is passed to the `Array` constructor, that value isn't assigned to the zeroth position in the resulting array. Instead, an array is created with that number of _empty_ slots for values. This doesn't impose any limitations on the array. Items can be added and removed from it in the same way as with an array literal.

```
// Firefox:\
const myArray = new Array( 10 );

myArray;
> Array(10) [ <10 empty slots> ]
```

```
// Chrome:
const myArray = new Array( 10 );

myArray;
> (10) [empty × 10]
```

Arrays containing empty slots (sometimes called "sparse arrays") are special cases. Instead of containing an `undefined` or explicitly `null` value, empty slots are often, but not always, treated as `undefined` values elsewhere in the language.

You can accidentally create a sparse array using array literal syntax by omitting a value between commas when you create an array literal:

```
const myArray = [ true,, true, false ];

myArray;
> Array(4) [ true, <1 empty slot>, true, false ]
```

Despite not being treated as a meaningful value in all contexts, an empty slot is factored into the total length of the array, potentially leading to unexpected results when [iterating over](/learn/javascript/control-flow#loops) an array's values:

```
const myArray = [ 1,, 3, 4 ];

myArray.length;
> 4

for( const myValue of myArray ) {
  console.log( myValue + 10 );
}
> 11
> NaN
> 13
> 14
```

This behavior is a holdover from some of JavaScript's earliest design decisions. Avoid using sparse arrays in modern development.

As with primitives, an array literal [inherits properties and methods from its corresponding constructor](/learn/javascript/appendix#prototypal-inheritance). Because an array is a special form of object, array literal syntax and `new Array()` syntax create functionally identical results: an object that inherits its prototype from the `Array` constructor.

```
const arrayLiteral = [];
const arrayConstructor = new Array();

typeof arrayLiteral;
> "object"

arrayLiteral;
> Array []
    length: 0
    <prototype>: Array []

typeof arrayConstructor;
> "object"

arrayConstructor;
> Array []
    length: 0
    <prototype>: Array []
```

Because the two results are identical, and array literal syntax is more concise and literal, we strongly recommend always using array literal syntax instead of `new Array()` syntax.

#### Access array values

You can access individual elements inside the array using bracket notation, a set of brackets (`[]`) following the array or its identifier that contains a number referring to that element's index:

```

[ "My string", "My other string" ][ 1 ];
> "My other string"

const myArray = [ "My string", 50, true ];

myArray[ 0 ];
> "My string"

myArray[ 1 ];
> 50

myArray[ 2 ];
> true
```

Arrays in JavaScript aren't [associative](https://en.wikipedia.org/wiki/Associative_array), meaning you can't use an arbitrary string as an index. However, the numeric values used to access elements in an array are coerced to a string value behind the scenes, meaning that you can use a string value containing only numeric characters:

```
const myArray = [ "My string", 50, true ];

myArray[ 2 ];
> true

myArray[ "2" ];
> true
```

Trying to access an element outside those defined in the array results in `undefined`, not an error:

```
const myArray = [ "My string", 50, true ];

myArray[ 9 ];
> undefined
```

### Destructuring assignment

Destructuring assignment is a concise way of extracting a range of values from arrays or [objects](/learn/javascript/objects) and assigning them to a set of identifiers, a process sometimes called "unpacking" the original data structure, though it doesn't modify the original array or object.

Destructuring assignment uses an array- or object-like list of identifiers to keep track of values. In its simplest form, called _binding pattern_ destructuring, each value is unpacked from the array or object and assigned to a corresponding variable, initialized using `let` or `const` (or `var`):

```
const myArray = [ "A string", "A second string" ];
const [ myFirstElement, mySecondElement ] = myArray;

const myObject = { firstValue: false, secondValue: true };
const { myProp, mySecondProp } = myObject;

myFirstElement;
> "My string"

mySecondElement;
> "Second string"

myProp;
> false

mySecondProp;
> true
```

Use curly braces (`{}`) to destructure an object, and square brackets (`[]`) to destructure an array.

```
const myArray = [ false, true ];
const myObject = { firstValue: false, secondValue: true };

const [ myProp, mySecondProp ] = myObject;
> Uncaught TypeError: myObject is not iterable

const { myElement, mySecondElement } = myArray;

myElement
> undefined

mySecondElement;
> undefined
```

Destructuring an array happens in sequential order, from left to right. Each identifier in the destructuring assignment corresponds to the element of the array with the same index:

```
const myArray = [ 1, 2, 3 ];
const [ myElement, mySecondElement, myThirdElement ] = myArray;

myElement;
> 1

mySecondElement;
> 2

myThirdElement;
> 3
```

This is also the default behavior when destructuring an object. However, if the identifiers used in the destructuring assignment match the keys of the object's properties, those identifiers are populated with the corresponding property values regardless of the order they're specified in:

```
const myObject = { firstValue: 1, secondValue: 2, thirdValue 3 };
const { secondValue, thirdValue, firstValue } = myObject;

firstValue;
> 1

secondValue;
> 2

thirdValue;
> 3
```

Elements can be skipped by omitting an identifier:

```
const myArray = [ 1, 2, 3 ];
const [ firstValue,, secondValue ] = myArray;

firstValue;
> 1

secondValue;
> 3
```

Destructuring syntax also lets you assign default values in case a destructured value is either an empty slot, as in the case of a sparse array, or an `undefined` value.

```
const myArray = [ true, ];
const [ firstValue = "Default string.", secondValue = "Default string." ] = myArray;

firstValue;
> true

secondValue;
> "Default string."
```

Deconstruction doesn't coerce values to particular types. This means that ["falsy"](/learn/javascript/comparison#truthy-falsy) values, such as empty strings (`""`) or `null`, are still considered meaningful deconstructed values:

```
const myArray = [ false, null, 0, "",, undefined ];
const [ falseValue = true, nullValue = true, zeroValue = true, emptyStringValue = true, emptySlot = true, undefinedValue = true ] = myArray;

falseValue;
> false;

nullValue;
> null

zeroValue;
> 0

emptyStringValue;
> ""

emptySlot;
> true

undefinedValue;
> true
```

### Spread operator

Use the spread operator (`...`), introduced in ES6 to expand an iterable data structure such as an array, string, or object literal into individual elements. The spread operator is immediately followed by the data structure to be expanded or the identifier of a variable containing that data structure.

```
const myArray = [ 1, 2, 3 ];

console.log( ...myArray );
> 1 2 3
```

Spread syntax is used primarily to copy and combine arrays:

```
const myArray = [ 4, 5, 6 ];
const mySecondArray = [1, 2, 3, ...myArray ];

mySecondArray;
> Array(6) [ 1, 2, 3, 4, 5, 6 ]
```

You can use spread syntax in only the following contexts:

For arrays and strings, spread syntax applies only where zero or more arguments in a function call or elements in an array are expected. The first example of spread operator syntax in this section works because it passes `...myArray` as an argument to the built-in `console.log` method.

For example, you can't assign the data being spread to a variable outside another array:

```
const myArray = [ 1, 2, 3 ];
const spreadVariable = ...myArray;
> Uncaught SyntaxError: Unexpected token '...'
```

But you copy an array by spreading the original array into an array literal:

```
const myArray = [ 1, 2, 3 ];
const spreadArray = [ ...myArray ];

spreadArray;
> Array(3) [ 1, 2, 3 ]
```

To merge the elements that make up two or more arrays into a single array:

```
const myArray = [ 1, 2, 3 ];
const mySecondArray = [ 4, 5, 6 ];
const myNewArray = [ ...myArray, ...mySecondArray ];

myNewArray;
> Array(6) [ 1, 2, 3, 4, 5, 6 ]
```

Or to pass elements of an array as individual arguments in a function call:

```
const myArray = [ true, false ];
const myFunction = ( myArgument, mySecondArgument ) => {
    console.log( myArgument, mySecondArgument );
};

myFunction( ...myArray );
> true false
```

The spread operator was expanded to work with [object literals in ES2018](https://caniuse.com/mdn-javascript_operators_spread_spread_in_object_literals). As with arrays, you can use the spread operator to duplicate or merge objects:

```
const myObj = { myProperty : true };
const mySecondObj = { ...myObj };

mySecondObj;
> Object { myProperty: true }
```

```
const myFirstObj = { myProperty : true };
const mySecondObj = { additionalProperty : true };
const myMergedObj = { ...myFirstObj, ...mySecondObj };

myMergedObj;
> Object { myProperty: true, additionalProperty: true }
```

The spread operator creates "shallow" copies. This means it doesn't copy the original object's prototype and [non-enumerable](/learn/javascript/objects/property-descriptors) properties.

```
const myCustomPrototype = { protoProp: "My prototype." };
const myObj = Object.create( myCustomPrototype, {
    myEnumerableProp: {
        value: true,
        enumerable: true
    },
    myNonEnumerableProp: {
        value: false,
        enumerable: false
    }
});
const myNewObj = { ...myObj };

myObj;
> Object { myEnumerableProp: true, … }
    myEnumerableProp: true
    myNonEnumerableProp: false
    <prototype>: Object { protoProp: "My prototype." }

myNewObj;
> Object { myEnumerableProp: true }
    myEnumerableProp: true
    <prototype>: Object { … }
```

Bear in mind that arrays and objects can't be used interchangeably. You can't spread an object into an array, or an array into an object.

#### Rest operator

Though the syntax of the operator itself is the same, the rest operator (`...`) performs the opposite function based on the context it's used in. Instead of expanding an iterable data structure into individual elements, as it does in [destructuring assignment](#destructuring-assignment) or as a [function parameter](/learn/javascript/functions), the rest operator combines elements into an iterable data structure. The name comes from the fact that it's used to gather "the rest" of a set of data values.

When used with destructuring assignment, the syntax is called "rest property" syntax.

```
const myArray = [ "First", "Second", "Third", "Fourth", "Fifth" ];

[ myFirstElement, mySecondElement, ...remainingElements ] = myArray;

myFirstElement;
> "First"

mySecondElement;
> "Second"

remainingElements;
> Array(3) [ "Third", "Fourth", "Fifth"]
```

When used to provide an [indefinite number of arguments to a function](/learn/javascript/control-flow#iterators), the syntax is called "rest parameter" syntax:

```
function myFunction( ...myParameters ) {
    let result = 0;
    myParameters.forEach( ( myParam ) => {
        result += myParam;
    });
    return result;
};

myFunction( 2, 2 );
> 4

myFunction( 1, 1, 1, 10, 5 );
> 18

myFunction( 10, 11, 25 );
> 46
```

## `%TypedArray%`

_Typed arrays_ are an ES6 feature designed to store structured binary data, for example when working with uploaded files or [WebGL](/articles/webgl-typed-arrays#webgl).

As with [Symbols](/learn/javascript/data-types/symbol), the `%TypedArray%` _intrinsic function_ (usually documented as either `%TypedArray%` or `@@TypedArray` so it can't be mistaken for a global property) isn't a constructor function in the conventional sense, and you can't invoke it with `new` or call it directly. Instead, `%TypedArray%` refers to a parent superclass of individual constructors, each of which works with a specific binary data format. The intrinsic `%TypedArray%` superclass provides properties and utility methods that all `%TypedArray%` constructor subclasses and their instances inherit.

## Check your understanding

Given \`const myArray = \[ 30, 50, 70 \];\` what does \`myArray\[1\]\` return?

50

30

`70`

If \`myArray\` has three values, what does \`myArray\[9\]\` return?

`Undefined`

An error message

`9`

`Null`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.