Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Control flow Stay organized with collections Save and categorize content based on your preferences.

_Control flow_ is the order in which the JavaScript interpreter executes statements. If a script doesn't include statements that alter its flow, it's executed from beginning to end, one line at a time. _Control structures_ are used to determine whether or not a set of statements are executed based on a defined set of criteria, execute a set of statements repeatedly, or interrupt a sequence of statements.

## Conditional statements

Conditional statements determine whether code should be executed based on one or more conditions. A conditional statement executes the code it contains if the associated condition (or set of conditions) evaluates to `true`. Otherwise, the code is skipped.

### `if`…`else`

An `if` statement evaluates a condition inside the matched parentheses that follow. If the condition inside the parentheses evaluates to `true`, the statement or [block statement](/learn/javascript/introduction#block-statements) that follows the matched parentheses is executed:

```
if ( true ) console.log( "True." );
> "True."

if ( true ) {
    const myString = "True.";
    console.log( myString );
}
> "True."
```

If the condition inside the parentheses evaluates to `false`, the statement that follows it is ignored:

```
if ( false ) console.log( "True." );
```

An `else` keyword immediately following an `if` statement and its conditionally-executed statement specifies the statement to be executed if the `if` condition evaluates to `false`:

```
if ( false ) console.log( "True." )''
else console.log( "False" );
> "False."
```

To chain multiple `if` statements together, you can make the conditionally-executed statement following `else` another `if` statement:

```
const myCondition = 2;
if ( myCondition === 5 ) console.log( "Five." );
else if ( myCondition === 2 ) console.log( "Two." );
```

We strongly recommend using block statement syntax following conditionals to improve readability, but `else if` clauses are often an exception to this:

```
if ( myCondition === 5 ) {
    console.log( "Five." );
} else if ( myCondition === 3 ) {
    console.log( "Three" );
} else {
    console.log( "Neither five nor three." );
}
> "Neither five nor three."
```

#### Ternary operator

`if` conditionally executes a statement. The ternary operator (more accurately but less commonly called the _ternary conditional operator_) is shorthand used to conditionally execute an expression. As the name implies, the ternary operator is the only JavaScript operator that uses three operands:

*   A condition to be evaluated, followed by a question mark (`?`).
*   The expression to execute if the condition evaluates to `true`, followed by a colon (`:`).
*   The expression to execute if the condition evaluates to `false`.

This is frequently used to conditionally set or pass a value:

```
const myFirstResult  = true  ? "First value." : "Second value.";
const mySecondResult = false ? "First value." : "Second value.";

myFirstResult;
> "First value."

mySecondResult;
> "Second value."
```

### `switch`…`case`

Use the `switch` statement to compare the value of an expression to a list of potential values defined using one or more `case` keywords. This syntax is unusual because it comes from some of JavaScript's earliest design decisions. `switch`…`case` syntax uses the `switch` keyword, followed by an expression to be evaluated wrapped in parentheses, followed by a matched pair of curly braces. The body of the `switch` can contain `case` keywords, usually one or more, followed by an expression or value, followed by a colon (`:`).

When the interpreter reaches a `case` with a value matching the expression being evaluated in the parentheses following the `switch` keyword, it executes any statements that follow that `case` clause:

```
switch ( 2 + 2 === 4 ) {
  case false:
    console.log( "False." );
  case true:
    console.log( "True." );
}
> "True."

```

All statements following the matching `case` are executed, even if they're enclosed in a [block statement](/learn/javascript/introduction#block-statements).

```
switch ( 2 + 2 === 4 ) {
    case false:
    console.log( "False." );
  case true:
    let myVariable = "True.";
    console.log( myVariable );

}
> "True."
```

One pitfall of using `switch…case` is that, after a match is found, the JavaScript interpreter executes _any_ statement that follows the matched `case`, even those within other `case` clauses. This is called "falling through" to the next `case`:

```
switch ( 2 + 2 === 7 ) {
    case false:
    console.log( "False." );
  case true:
    console.log( "True." );
}
> "False."
> "True."
```

To prevent fall-through, end each case with the `break` keyword, which immediately stops evaluation of the `switch` body:

```
switch ( 2 + 2 === 7 ) {
    case false:
    console.log( "False." );
    break;
  case true:
    console.log( "True." );
    break;
}
> "False."
```

If no `case` matches the conditional value, the `switch` selects the `default` clause if there is one:

```
switch ( 20 ) {
    case 5:
    console.log( "The value was five." );
    break;
  case 10:
    console.log( "The value was ten." );
    break;
  default:
    console.log( "The value was something unexpected." );
}
> "The value was something unexpected."

```

However, fall-through applies to `default` as well, potentially leading to unexpected results. To fix this, end your `default` statement with `break`, or place it last in the list of cases.

```
switch ( 20 ) {
  default:
    console.log( "The value was something unexpected." );
  case 10:
    console.log( "The value was ten." );
    break;
  case 5:
    console.log( "The value was five." );
    break;
}
> The value was something unexpected.
> The value was ten.
```

Because `case` clauses don't require a [block statement](/learn/javascript/introduction#block-statements) for grouping multiple statements, `case` and `default` clauses don't create [lexical scope](/learn/javascript/data-types/variable#scope) by themselves:

```
let myVariable;
switch ( true ) {
  case true:
    let myVariable = "True.";
    break;
  default:
    let myVariable = "False.";
    break;
}
> Uncaught SyntaxError: redeclaration of let myVariable
```

To manage scope, use block statements:

```
let myVariable;
switch ( true ) {
  case true: {
    let myVariable = "True.";
    break;
  }
  default: {
    let myVariable = "False.";
    break;
  }
}
```

## Loops and iteration

Loops let you repeat a set of statements for as long as a condition is met, or until a condition is met. Use loops to execute a set of instructions a fixed number of times, until a specific result is achieved, or until the interpreter reaches the end of an iterable data structure (for example, the final element in an array, map, or set, the final property of an object, or the last character in a string).

Loops interrupt the "top to bottom" flow of a script's execution by iterating over a set of statements until one or more conditions are met, or are no longer met, depending on the syntax used to create the loop. After the loop ends, execution continues to the statements that follow it. In the following example, the statements in the body of the loop are executed three times before the interpreter moves on:

```
let iterationCount = 0;
console.log( "Pre-loop." );
while( iterationCount < 3 ) {
  iterationCount++;
  console.log( "Loop iteration." );
}
console.log( "Continuing on." );
> "Pre-loop."
> "Loop iteration."
> "Loop iteration."
> "Loop iteration."
> "Continuing on."
```

If the conditions can't be met during the loop's execution, the loop continues indefinitely. These _infinite loops_ are a common programming pitfall that can cause the [main execution thread](/learn/javascript/appendix#main-thread) to pause indefinitely, or even crash a browser tab.

The following example executes for as long as the boolean value `true` remains `true`. Because [boolean values are immutable](/learn/javascript/data-types/boolean), this creates an infinite loop.

**Warning:** executing the following code can slow your browser or crash your current browser tab.

```
console.log( "Pre-loop." );
while( true ) {
console.log( "Loop iteration." );
}
> "Pre-loop."
> "Loop iteration."
> "Loop iteration."
> "Loop iteration."
> "Loop iteration."
> "Loop iteration."
…
```

Avoid leaving infinite loops in your production code. If you accidentally create one during development, you can fix it by closing the browser tab it's running in, updating your code so the loop is no longer infinite, and reopening the page.

### `while`

A `while` loop is created using the `while` keyword followed by a pair of matched parentheses containing a condition to be evaluated. If the specified condition initially evaluates to `true`, the statement (or [block statement](/learn/javascript/introduction#block-statements)) that follows those parentheses is executed. If not, the loop never runs. After each iteration, the condition is reevaluated, and if it's still `true`, the loop repeats.

```
let iterationCount = 0;
while( iterationCount < 3 ) {
  iterationCount++;
  console.log( `Loop ${ iterationCount }.` );
}
> "Loop 1."
> "Loop 2."
> "Loop 3."
```

If the interpreter finds a `continue` statement in a `while` loop, it stops that iteration, reevaluates the condition, and continues the loop if possible:

```
let iterationCount = 0;
while( iterationCount <= 5 ) {
  iterationCount++;
  if( iterationCount === 3 ) {
    continue;
  }
  console.log( `Loop ${ iterationCount }.` );
}
console.log( "Loop ended." );
> "Loop 1."
> "Loop 2."
> "Loop 4."
> "Loop 5."
> "Loop ended."
```

If the interpreter finds a `break` statement in a `while` loop, that iteration stops and the condition isn't reevaluated, letting the interpreter move on:

```
let iterationCount = 1;
while( iterationCount <= 5 ) {
  if( iterationCount === 3 ) {
    console.log(`Iteration skipped.``);`
    break;
  }
  console.log( `Loop ${ iterationCount }.` );
  iterationCount++;
}
console.log( "Loop ended." );
> "Loop 1."
> "Loop 2."
> "Iteration skipped.
> "Loop ended."
```

You can use `while` to iterate a specified number of times, as seen in the previous example, but the most common use case for `while` is a loop of indeterminate length:

```
let randomize = () => Math.floor( Math.random() * 10 );
let randomNum = randomize();
while( randomNum !== 3 ){
  console.log( `The number is not ${ randomNum }.` );
  randomNum = randomize();
}
console.log( `The correct number, ${ randomNum }, was found.` );
> "The number is not 0."
> "The number is not 6."
> "The number is not 1."
> "The number is not 8."
> "The correct number, 3, was found."
```

### `do`…`while`

`do`…`while` is a variant of the `while` loop in which the conditional evaluation happens at the _end_ of each iteration of the loop. This means the body of the loop is always executed at least once.

To create a `do`…`while` loop, use the `do` keyword followed by the statement (or [block statement](/learn/javascript/introduction#block-statements)) to be executed on each iteration of the loop. Immediately after that statement, add `while` and matched parentheses containing the condition to be evaluated. When this condition no longer evaluates to `true`, the loop ends.

```
let iterationCount = 1;
do {
  console.log( `Loop ${ iterationCount }.` );
  iterationCount++;
} while ( iterationCount < 3 );
> "Loop 1."
> "Loop 2."
> "Loop 3."
```

As with a `while` loop, the most common use case for `do`…`while` is a loop of indeterminate length:

```
let randomNum;
do {
  randomNum = ( () => Math.floor( Math.random() * 10 ) )();
  console.log( `Is the number ${ randomNum }?` );
} while ( randomNum !== 3 );
console.log( `Yes, ${ randomNum } was the correct number.` );
> "Is the number 9?"
> "Is the number 2?"
> "Is the number 8?"
> "Is the number 2?"
> "Is the number 3?"
> "Yes, 3 was the correct number."
```

### `for`

Use `for` loops to iterate over a known quantity. In legacy codebases, this was frequently used to iterate over the elements in an array.

To create a `for` loop, use the `for` keyword, followed by a set of parentheses that accepts the following three expressions in order and separated by semicolons:

1.  An expression to be evaluated when the loop begins
2.  A condition that determines whether the loop should continue
3.  An expression to be executed at the conclusion of each loop

After these parentheses, add the statement (typically a [block statement](/learn/javascript/introduction#block-statements)) to be executed during the loop.

```
for( let i = 0; i < 3; i++ ) {
  console.log( "This loop will run three times.")
}
```

The first expression initializes a variable that acts as a counter. This expression is evaluated once, before the first iteration of the loop. You can initialize this variable using `let` (or `var`, historically) like any other variable, and its scope is the body of the loop. These variables can have any valid identifier, but they're frequently called `i` for "iteration" or "index". This does seem to contradict established [best-practices for predictable identifier names](/learn/javascript/data-types/variable), but the convention is well established enough to be clear to other developers at a glance. Because [indexed collections are zero indexed](/learn/javascript/collections/indexed), these variables almost always have an initial value of `0`.

As with other forms of loop, the condition is an expression that determines whether the loop should be executed. This is most often used to set an upper bound for the iteration counter. The interpreter evaluates the condition before executing the `for` loop for the first time.If the condition doesn't initially evaluate to `true`, the body of the loop isn't executed.

The final expression is executed at the end of each iteration through the loop. It's typically used to increment the identifier by one.

You'll most commonly see `for` loops iterating through arrays in older codebases. In these cases, the condition specified for continuing the loop is an iteration count less than or equal to the length of the array being iterated through. The variable used to track the current iteration count is used to look up the value associated with that index in the array, allowing each element in the array to be acted on in order:

```
var myArray = [ true, false, true ];
for( let i = 0; i < myArray.length; i++ ) {
  console.log( myArray[ i ] );
}
> true
> false
> true
```

This approach has fallen out of use in favor of more modern approaches to looping through [iterable data structures](#iterators).

#### `for` \[…\] `of` \[…\]

Use `for`…`of`… loops to iterate over the values stored in an [iterable data structure](#iterators), such as an array, set, or map.

A `for`…`of`… loop uses the `for` keyword followed by a set of parentheses containing a variable, followed by `of`, then the data structure being iterated over. The variable can be a declaration performed here using `let`, `const`, or `var`, a variable declared previously within the current scope, an object property, or an instance of [destructuring assignment](/learn/javascript/collections/indexed#destructuring-assignment). It contains the value of the element that corresponds with the current iteration of the loop.

```
const myIterable = [ true, false, true ];
for( const myElement of myIterable ) {
  console.log( myElement );
}
> true
> false
> true
```

In this example, using `const` for `myElement` works even though `myElement` is given a new value in each iteration of the loop. This is because variables declared with `let` or `const` are scoped to the block statement within the loop. The variable is initialized at the start of each iteration, and removed at the end of that iteration.

#### `for`…`in`…

Use `for`…`in`… loops to iterate over the enumerable properties of an object, including enumerable inherited properties. As with a `for`…`of`… loop, a `for`…`in`… loop uses the `for` keyword followed by a set of parentheses containing a variable that contains the value of the property key corresponding with the current iteration of the loop. This variable is followed by the `in` keyword, then the object being iterated over:

```
const myObject = { "myProperty" : true, "mySecondProperty" : false };
for( const myKey in myObject ) {
  console.log( myKey );
}
> "myProperty"
> "mySecondProperty"
```

Again, despite the value of `myKey` changing with each iteration of the loop, you can use `const` without error because the variable is effectively discarded at the end of each iteration, then recreated at the start.

The value associated with each property key isn't directly available to the `for`…`in`… syntax. However, because the loop has access a the property key in each iteration, you can use that key to "look up" its value:

```
const myObject = { "myProperty" : true, "mySecondProperty" : false };
for( const myKey in myObject ) {
  const myValue = myObject[ myKey ];
  console.log( `${ myKey } : ${ myValue }` );
}
> "myProperty : true"
> "mySecondProperty : false"
```

Properties inherited from built-in constructors are non-enumerable, meaning that `for`…`in`… doesn't iterate through properties inherited from the `Object` constructor. However, any enumerable properties within the object's [prototype chain](/learn/javascript/objects/property-descriptors) are included:

```
const myPrototype = { "protoProperty" : true };
const myObject = Object.create( myPrototype, {
    myProperty: {
    value: true,
    enumerable: true
    }
});
for ( const myKey in myObject ) {
  const myValue = myObject[ myKey ];
  console.log( `${ myKey } : ${ myValue }` );
}
> "myProperty : true"
> "protoProperty : true"
```

JavaScript provides built-in methods for determining whether a property is a direct property of the object rather than a property on the object's prototype chain: the [modern](https://caniuse.com/mdn-javascript_builtins_object_hasown) `Object.hasOwn()` and legacy `Object.prototype.hasOwnProperty()` methods. These methods evaluate whether a specified property is inherited (or undeclared), returning `true` only for the immediate properties of a specified object:

```
const myPrototype = { "protoProperty" : true };
const myObject = Object.create( myPrototype, {
    myProperty: {
    value: true,
    enumerable: true
    }
});
for ( const myKey in myObject ) {
  const myValue = myObject[ myKey ];
  if ( Object.hasOwn( myObject, myKey ) ) {
    console.log( `${ myKey } : ${ myValue }` );
  }
}
> "myProperty : true"
```

There are also three static methods that each return an Array made up of an Object's enumerable keys (`Object.keys()`), values (`Object.values()`), or key-value pairs (`Object.entries()`):

```
const myObject = { "myProperty" : true, "mySecondProperty" : false };
Object.keys( myObject );
> Array [ "myProperty", "mySecondProperty" ]
```

This lets you iterate Object keys, values, or key-value pairs (using [destructuring assignment](/learn/javascript/collections/indexed#destructuring-assignment)) over without including properties owned by that Object's prototype:

```
const myPrototype = { "protoProperty" : "Non-enumerable property value." };
const myObject = Object.create( myPrototype, {
    myProperty: {
    value: "Enumerable property value.",
    enumerable: true
    }
});

for ( const propKey of Object.keys( myObject ) ) {
  console.log( propKey );
}
> "myProperty"

for ( const propValue of Object.values( myObject ) ) {
  console.log( propValue );
}
> "Enumerable property value."

for ( const [ propKey, propValue ] of Object.entries( myObject ) ) {
  console.log( `${ propKey } : ${ propValue }` );
}
> "myProperty : Enumerable property value."
```

#### `forEach()`

The `forEach()` methods provided by the [Array](/learn/javascript/collections/indexed#array), [Map](/learn/javascript/collections/keyed#map), [Set](/learn/javascript/collections/keyed#set), and NodeList constructors provide a useful shorthand for iterating over a data structure in the context of a callback function. Unlike other forms of loop, a loop created with any `forEach()` method can't be interrupted using `break` or `continue`.

`forEach` is a method owned by each data structure's prototype. Each `forEach` method expects a callback function as an argument, though they vary slightly in terms of the arguments included when that function is called. A second, optional argument specifies a `this` value to use as the invoking context for the callback function.

The callback function used with `Array.forEach` provides parameters containing the value of the current element, the index of the current element, and the array the `forEach` method was invoked on:

```
const myArray = [ true, false ];
myArray.forEach( ( myElement, i, originalArray ) => {
  console.log( i, myElement, originalArray  );
});
> 0 true Array(3) [ true, false ]
> 1 false Array(3) [ true, false ]
```

The callback function used with `Map.forEach` provides parameters containing the value associated with the current element, the key associated with the current element, and the Map the `forEach` method was invoked on:

```
const myMap = new Map([
  ['myKey', true],
  ['mySecondKey', false ],
]);
myMap.forEach( ( myValue, myKey, originalMap ) => {
    console.log( myValue, myKey, originalMap  );
});
> true "myKey" Map { myKey → true, mySecondKey → false }
> false "mySecondKey" Map { myKey → true, mySecondKey → false }
```

A `Set.forEach` callback includes similar parameters. Because Set doesn't have indexes or keys distinct from values, the second argument instead provides a redundant, ignorable value, strictly to keep the syntax consistent with the other `forEach` methods.

```
const mySet = new Set([ true, false ]);
mySet.forEach( ( myValue, myKey, originalSet ) => {
  console.log( myValue, myKey, originalSet  );
});
> true true Set [ true, false ]
> false false Set [ true, false ]
```

### Iterators

An _iterable_ is any data structure made up of individual elements that can be iterated over using the approaches detailed previously. An _iterator_ is an iterable object that follows _iterator protocol_, which means it must implement a `next()` method that advances through the elements it contains one at a time, each time that method is called, returning an object for each sequential element in a specific format.

JavaScript's built-in iterable data structures (such as [Array](/learn/javascript/collections/indexed#array), [Map](/learn/javascript/collections/keyed#map), and [Set](/learn/javascript/collections/keyed#set)) aren't iterators in and of themselves, but they do all inherit an `iterator` method, accessible using the `@@iterator` [well-known Symbol](/learn/javascript/data-types/symbol#well-known), which returns an iterator object created from the iterable data structure:

```
const myIterable = [ 1, 2, 3 ];
const myIterator = myIterable[ Symbol.iterator ]();

myIterable;
> (3) [1, 2, 3]

myIterator;
> Array Iterator {}
```

Calling the `next()` method on an iterator steps through the elements it contains one at a time, with each call returning an object containing two properties: `value`, which contains the value of the current element, and `done`, a boolean that tells us if the iterator has passed the last element in the data structure. The value of `done` is `true` only when a call to `next()` results in an attempt to access an element beyond the last element in the iterator.

```
const myIterable = [ 1, 2, 3 ];
const myIterator = myIterable[ Symbol.iterator ]();

myIterator.next();
> Object { value: 1, done: false }

myIterator.next();
> Object { value: 2, done: false }

myIterator.next();
> Object { value: 3, done: false }

myIterator.next();
> Object { value: undefined, done: true }
```

#### Generator Functions

Use the `function*` keyword (note the asterisk) to declare a generator function or define a generator function expression:

```
function* myGeneratorFunction() { };
```

Like [iterators](#iterators), generator functions maintain state. Calling a generator function returns a new Generator object but doesn't immediately execute the code in the body of the function:

```
function* myGeneratorFunction() {
  console.log( "Generator function body ")
};
const myGeneratorObject = myGeneratorFunction();

myGeneratorObject;
> Generator {  }

typeof myGeneratorObject;
> "object"
```

Generator objects follow [iterator protocol](#iterators). The value each call to `next()` on a generator function returns is determined by a `yield` expression, which pauses execution of the generator function and returns the value of the expression that contains the `yield` keyword. Later calls to `next()` continue execution of the function, pausing at the next `yield` expression and returning the associated value.

```
function* myGeneratorFunction() {
  yield "My first yielded value.";
  yield "My second yielded value.";
};
const myGeneratorObject = myGeneratorFunction();

myGeneratorObject.next();
> Object { value: "My first yielded value.", done: false }

myGeneratorObject.next();
> Object { value: "My second yielded value.", done: false }
```

When `next()` is called after no further values are specified using `yield`, `return`, or `throw` (in the event of an error), the remainder of the function body executes, and the returned Object has a `value` of `undefined` and a `done` property of `true`:

```

function* myGeneratorFunction() {
    console.log( "Start of the generator function." );
    yield "First";
    console.log( "Second part of the generator function."  );
    yield "Second";
    console.log( "Third part of the generator function." );
    yield "Third";
};
const myGeneratorObject = myGeneratorFunction();

myGeneratorObject.next();
> "Start of the generator function."
> Object { value: "First", done: false }

myGeneratorObject.next();
> "Second part of the generator function."
> Object { value: "Second", done: false }

myGeneratorObject.next();
> "Third part of the generator function."
> Object { value: "Third", done: false }

myGeneratorObject.next();
> Object { value: undefined, done: true }
```

Use `next()` only on the Object the generator function returns, not the generator function itself. Otherwise, each call to the generator function creates a new generator Object:

```
function* myGeneratorFunction() {
  yield "First";
  yield "Second";
};

myGeneratorFunction().next();
> Object { value: "First", done: false }

myGeneratorFunction().next();
> Object { value: "First", done: false }
```

As with any function, the generator function halts when it encounters a `return` keyword. It then returns an Object to the invoking context that contains the returned value and a `done` property with the value `true`.

```
function* myGeneratorFunction() {
  yield 1;
  yield 2;
  return 3;
};
const myGeneratorObject = myGeneratorFunction();

myGeneratorObject.next();
> Object { value: 1, done: false }

myGeneratorObject.next();
> Object { value: 2, done: false }

myGeneratorObject.next();
> Object { value: 3, done: true }
```

A `yield` expression can take on some of the semantics of an identifier, allowing two-way "communication" from and back to the suspended portion of the generator function. When a value is passed to a generator's `next()` method as an argument, it replaces the value associated with the previous, suspended `yield` expression:

```
function* myGeneratorFunction() {
    const firstYield = yield;
    yield firstYield + 10;
};
const myGeneratorObject = myGeneratorFunction();

myGeneratorObject.next();
> Object { value: undefined, done: false }

myGeneratorObject.next( 5 );
> Object { value: 15, done: false }
```

Bear in mind that this replaces the entire expression associated with the previous `yield`, and doesn't just reassign the value of the previous `yield` to the value specified in `next()`:

```
function* myGeneratorFunction() {
    const firstYield = yield;
    const secondYield = yield firstYield + 100;
    yield secondYield + 10;
};
const myGeneratorObject = myGeneratorFunction();

myGeneratorObject.next();
> Object { value: undefined, done: false }

myGeneratorObject.next( 10 ); // Can be thought of as changing the value of the `firstYield` variable to `10
> Object { value: 110, done: false }

myGeneratorObject.next( 20 ); // Can be thought of as changing the value of the `secondYield` variable to `20`, _not_ `20 + 100;`
> Object { value: 30, done: false }
```

Any argument passed to the first call to `next()` is ignored, because there's no previous `yield` expression to accept that value. As with any other function, arguments passed to the initial generator function call are available throughout the scope of the generator function's body:

```
function* myGeneratorFunction( startingValue ) {
    let newValue = yield startingValue + 1;
    newValue = yield newValue + 10;
    yield startingValue + 20;
};
const myGeneratorObject = myGeneratorFunction( 2 );

myGeneratorObject.next( 1 );
> Object { value: 3, done: false }

myGeneratorObject.next( 5 );
> Object { value: 15, done: false }

myGeneratorObject.next( 10 );
Object { value: 22, done: false }
```

The `yield*` (note the asterisk) operator is used with an iterable, such as another generator function, to iterate over and yield each value its operand returns:

```
function* mySecondaryGenerator() {
  yield 2;
  yield 3;
}

function* myGenerator() {
  yield 1;
  yield* mySecondaryGenerator();
  yield 4;
  return 5;
}

const myIterator = myGenerator();

myIterator.next();
> Object { value: 1, done: false }

myIterator.next();
> Object { value: 2, done: false }

myIterator.next();
> Object { value: 3, done: false }

myIterator.next();
> Object { value: 4, done: false }

myIterator.next();
> Object { value: 5, done: true }
```

## Asynchronous JavaScript

Although JavaScript is fundamentally [synchronous](/learn/javascript/appendix#main-thread) in execution, there are mechanisms that allow developers to take advantage of the [event loop](/learn/javascript/appendix#event-loop) to perform asynchronous tasks.

### Promises

A Promise is a placeholder for a value that isn't known when the promise is created. It's a container that dictates an asynchronous operation, the terms by which the operation is considered a success or failure, the actions to be taken in either case, and the value that results.

Create a Promise instance using the `new` operator with the built-in `Promise` constructor function. This constructor accepts a function called the _executor_ as an argument. That executor function is typically used to perform one or more asynchronous actions, then dictate the terms by which the Promise should be considered successfully fulfilled or rejected. A Promise is defined as _pending_ while the executor function is running. After the executor finishes, a Promise is considered _fulfilled_ (or _resolved_, in some sources of documentation) if the executor function and asynchronous action it performs are completed successfully, and _rejected_ if the executor function encounters an error, or the asynchronous action being performed fails. After a Promise is fulfilled or rejected, it's considered _settled_.

```
const myPromise = new Promise( () => { });
```

The constructor calls the executor function with two arguments. Those arguments are functions that let you manually fulfill or reject the Promise:

```
const  myPromise = new Promise( ( fulfill, reject ) => { });
```

The functions used to fulfill or reject a Promise are called with the resulting value of the Promise as an argument (typically an error for rejection):

```
const myPromise = new Promise( ( fulfill, reject ) => {
  const myResult = true;
  setTimeout(() => {
    if( myResult === true ) {
        fulfill( "This Promise was successful." );    
    } else {
        reject( new Error( "This Promise has been rejected." ) );
    }
  }, 10000);
});

myPromise;
> Promise { <state>: "pending" }

myPromise;
> Promise { <state>: "fulfilled", <value>: "This Promise was successful." }
```

#### Promise Chaining

The resulting Promise object can be acted on using the `then()`, `catch()`, and `finally()` methods inherited from the Promise constructor. Each of these methods returns a Promise, which can immediately be acted on with `then()`, `catch()`, or `finally()` again, letting you _chain_ the resulting Promises.

`then()` provides two callback functions as arguments. Use the first to fulfill the resulting Promise, and the second to reject it. Both methods accept a single argument that gives the resulting Promise its value.

```
const myPromise = new Promise( ( fulfill, reject ) => {
  const myResult = true;
  setTimeout(() => {
    if( myResult === true ) {
        fulfill( "This Promise was fulfilled." );    
    } else {
        reject( new Error( "This Promise has been rejected." ) );
    }
  }, 100);
});

myPromise.then( successfulResult => console.log( successfulResult ), failedResult => console.error( failedResult ) );
> "This Promise was successful."
```

You can also use `then()` to handle only the fulfilled state, and `catch` to handle the rejected state. Call `catch` with a single argument containing the value provided in the Promise's rejection method:

```
const myPromise = new Promise( ( fulfill, reject ) => {
  const myResult = false;
  setTimeout(() => {
    if( myResult === true ) {
        fulfill( "This Promise was fulfilled." );    
    } else {
        reject( new Error( "This Promise has been rejected." ) );
    }
  }, 100);
});

myPromise
  .then( fulfilledResult => console.log(fulfilledResult ) )
  .catch( rejectedResult => console.log( rejectedResult ) )
  .finally( () => console.log( "The Promise has settled." ) );
> "Error: This Promise has been rejected."
> "The Promise has settled."
```

Unlike `then` and `catch`, which allow a handler function to run when a Promise is fulfilled or rejected, a function passed as an argument to the `finally` method is called regardless of whether the Promise was fulfilled or rejected. The handler function is called with no arguments, because it's not intended to work with the values passed from the Promise, only to execute code after the Promise is complete.

#### Concurrency

The Promise constructor provides four methods for working with multiple related Promises, using an [iterable](#iterators) containing Promise objects. These methods each return a Promise, which is fulfilled or rejected based on the state of the Promises passed to it. `Promise.all()`, for example, creates a Promise that is fulfilled only if every Promise passed to that method is fulfilled:

```
const firstPromise  = new Promise( ( fulfill, reject ) => fulfill( "Successful. ") );
const secondPromise = new Promise( ( fulfill, reject ) => fulfill( "Successful. ") );
const thirdPromise  = new Promise( ( fulfill, reject ) => fulfill( "Successful. ") );
const failedPromise = new Promise( ( fulfill, reject ) => reject( "Failed.") );
const successfulPromises = [ firstPromise, secondPromise, thirdPromise ];
const oneFailedPromise = [ failedPromise, ...successfulPromises ];

Promise.all( successfulPromises )
  .then( ( allValues ) => {
    console.log( allValues );
  })
  .catch( ( failValue ) => {
    console.error( failValue );
  });
> Array(3) [ "Successful. ", "Successful. ", "Successful. " ]

Promise.all( oneFailedPromise  )
    .then( ( allValues ) => {
      console.log( allValues );
    })
    .catch( ( failValue ) => {
     console.error( failValue );
    });
> "Failed."
```

The Promise concurrency methods are as follows:

`Promise.all()`

Fulfilled only if all supplied Promises are fulfilled.

`Promise.any()`

Fulfilled if any one of the supplied Promises is fulfilled, and rejected only if all Promises are rejected.

`Promise.allSettled()`

Fulfilled when Promises have settled, regardless of their result.

`Promise.race()`

Rejected or fulfilled based on the result of the first Promise to settle, ignoring all Promises settled later.

#### `async`/`await`

When you use the `async` keyword before a [function declaration](/learn/javascript/functions) or [function expression](/learn/javascript/functions/function-expressions), any value that function returns is returned as a fulfilled Promise containing that value. This lets you run and manage asynchronous operations using the same workflows as synchronous development.

```
async function myFunction() {
  return "This is my returned value.";
}

myFunction().then( myReturnedValue => console.log( myReturnedValue ) );
> "This is my returned value."
```

The `await` expression pauses the execution of an asynchronous function while the associated Promise is settled. After the Promise is settled, the value of the `await` expression is the fulfilled or rejected value of the Promise.

```
async function myFunction() {
  const myPromise  = new Promise( ( fulfill, reject ) => { setTimeout( () => fulfill( "Successful. "), 5000 ); });
  const myPromisedResult = await myPromise;
  return myPromisedResult;
}

myFunction()
  .then( myResult => console.log( myResult ) )
  .catch( myFailedResult => console.error( myFailedResult ) );
> "Successful."
```

Any non-Promise value included in an `await` expression is returned as a fulfilled Promise:

```
async function myFunction() {
  const myPromisedResult = await "String value.";
  return myPromisedResult;
}

myFunction()
  .then( myResult => console.log( myResult ) )
  .catch( myFailedResult => console.error( myFailedResult ) );
> "String value."
```

## Check your understanding

Which kind of loop do you use to iterate over a known quantity?

`for`

`while`

`do...while`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.