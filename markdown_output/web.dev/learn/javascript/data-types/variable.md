Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Variables Stay organized with collections Save and categorize content based on your preferences.

Variables are a data structure that assigns a representative name to a value. They can contain data of any kind.

A variable's name is called an _identifier_. A valid identifier must follow these rules:

*   Identifiers can contain Unicode letters, dollar signs ($), underscore characters (\_), digits (0-9), and even some Unicode characters.
*   Identifiers can't contain whitespace, because the parser uses whitespace to separate input elements. For example, if you try to call a variable `my Variable` instead of `myVariable`, the parser sees two identifiers, `my` and `Variable`, and throws a syntax error ("unexpected token: identifier").
*   Identifiers must start with a letter, underscore (`_`), or dollar sign (`$`). They can't start with digits, to prevent confusion between numbers and identifiers:
    
    ```
    let 1a = true;
    
    > Uncaught SyntaxError: Invalid or unexpected token
    ```
    
    If JavaScript allowed numbers at the start of an identifier, that would allow identifiers made up of only numbers, causing conflicts between numbers used as numbers and numbers used as identifiers:
    
    ```
    let 10 = 20
    
    10 + 5
    > ?
    ```
    
*   "[Reserved words](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Lexical_grammar#keywords)" that are already syntactically meaningful can't be used as identifiers.
    
*   Identifiers can't contain special characters (`! . , / \ + - * =`).
    

The following aren't strict rules for creating identifiers, but they are industry best practices that make maintaining your code easier. If your specific project has different standards, follow those instead for consistency.

Following the example set by JavaScript's built-in methods and properties, _camel case_ (also stylized as "camelCase") is a very common convention for identifiers made up of multiple words. Camel case is the practice of capitalizing the first letter of every word except the first for improved readability without spaces.

```
let camelCasedIdentifier = true;
```

Some projects use other naming conventions depending on context and the nature of the data. For example, the first letter of a [class](/learn/javascript/classes) is typically capitalized, so multi-word class names often use a variant of camel case commonly called "upper camel case" or [Pascal](https://en.wikipedia.org/wiki/Pascal_\(programming_language\)) case.

```
class MyClass {

}
```

Identifiers should concisely describe the nature of the data they contain (for example, `currentMonthDays` is a better name than `theNumberOfDaysInTheCurrentMonth`) and read clearly at a glance (`originalValue` is better than `val`). The `myVariable` identifiers used throughout this module work in the context of isolated examples, but would be very unhelpful in production code because they give no information about what data they contain.

Identifiers shouldn't get too specific about the data they contain, because their values can change depending on how scripts act on that data, or on decisions future maintainers make. For example, a variable originally given the identifier `miles` might need to be changed to a value in kilometers later in the project, requiring maintainers to change any references to that variable to avoid future confusion. To prevent this, use `distance` as your identifier instead.

JavaScript doesn't give any special privilege or meaning to identifiers that begin with underscore characters (`_`), but they're typically used to show that a variable, method, or property is "private," meaning that it's only intended for use within the context of the object that contains it, and shouldn't be accessed or modified outside that context. This is a convention carried over from other programming languages, and predates the addition of JavaScript's [private properties](/learn/javascript/classes/class-fields#private).

## Variable declaration

There are multiple ways to make JavaScript aware of an identifier, a process called "declaring" a variable. A variable is declared using the `let`, `const`, or `var` keywords.

```
let myVariable;
```

Use `let` or `var` to declare a variable that can be changed at any time. These keywords tell the JavaScript interpreter that a string of characters is an identifier that might contain a value.

When working in a modern codebase, use `let` instead of `var`. `var` still works in modern browsers, but it has some unintuitive behaviors that were defined in the earliest versions of JavaScript, and then couldn't be changed later to preserve backwards compatibility. `let` was added in ES6 to address some issues with the design of `var`.

A declared variable is _initialized_ by assigning a value to the variable. Use a single equals sign (`=`) to assign or reassign a value to a variable. You can do this as part of the same statement that declares it:

```
let myVariable = 5;

myVariable + myVariable
> 10
```

You can also declare a variable with `let` (or `var`) without initializing it right away. If you do, the variable's initial value is `undefined` until your code assigns it a value.

```
let myVariable;

myVariable;
> undefined

myVariable = 5;

myVariable + myVariable
> 10
```

A variable with an `undefined` value is different from an undefined variable whose identifier hasn't been declared yet. Referencing a variable you haven't declared causes an error.

```
myVariable
> Uncaught ReferenceError: myVariable is not defined

let myVariable;

myVariable
> undefined
```

The association of an identifier with a value is generally called a "binding." The syntax that follows the `let`, `var`, or `const` keywords is called a "binding list," and allows for multiple comma-separated variable declarations (ending with the expected semicolon). This makes the following code snippets functionally identical:

```
let firstVariable,
     secondVariable,
     thirdVariable;
```

```
let firstVariable;
let secondVariable;
let thirdVariable;
```

Reassigning a variable's value doesn't use `let` (or `var`), because JavaScript already knows the variable exists:

```
let myVariable = true;

myVariable
> true

myVariable = false;

myVariable
> false
```

You can reassign variables new values based on their existing values:

```
let myVariable = 10;

myVariable
> 10

myVariable = myVariable * myVariable;

myVariable
> 100
```

If you try to redeclare a variable using `let` in a production environment, you'll get a syntax error:

```
let myVariable = true;
let myVariable = false;
> Uncaught SyntaxError: redeclaration of let myVariable
```

Browsers' [developer tools](https://developer.chrome.com/blog/new-in-devtools-80/#redeclarations) are more permissive about `let` (and `class`) redeclaration, so you might not see the same error in your developer console.

To preserve legacy browser compatibility, `var` allows unnecessary redeclaration without error in any context:

```
var myVariable = true;
var myVariable = false;

myVariable\
> false
```

## `const`

Use the `const` keyword to declare a constant, a type of variable that must be immediately initialized, and then can't be changed. Identifiers for constants follow all the same rules as variables declared using `let` (and `var`):

```
const myConstant = true;

myConstant
> true
```

You can't declare a constant without immediately assigning it a value, because constants can't be reassigned after they're created, so any uninitialized constant would stay `undefined` forever. If you try to declare a constant without initializing it, you get a syntax error:

```
const myConstant;
Uncaught SyntaxError: missing = in const declaration
```

Trying to change the value of a variable declared with `const` the way you might change the value of a variable declared wit with `let` (or `var`) causes a type error:

```
const myConstant = true;

myConstant = false;
> Uncaught TypeError: invalid assignment to const 'myConstant'
```

However, when a constant is associated with an object, the properties of that object _can_ be altered.

```
const constantObject = { "firstvalue" : true };

constantObject
> Object { firstvalue: true }

constantObject.secondvalue = false;

constantObject
> Object { firstvalue: true, secondvalue: false }
```

A constant that contains an object is an immutable [reference to a mutable data value](/learn/javascript/appendix#by-reference-by-value). While the constant itself can't be changed, the properties of the referenced object can be altered, added to, or removed:

```
const constantObject = { "firstvalue" : true };

constantObject = false
> Uncaught TypeError: invalid assignment to const 'constantObject'
```

When you don't expect a variable to be reassigned, it's best practice to make it a constant. Using `const` tells your development team or future maintainers of a project not to change that value, to avoid breaking the assumptions your code makes about how it's used—for example, that a variable will eventually be evaluated against an expected data type.

## Variable scope

A variable's scope is the part of a script where that variable is available. Outside a variable's scope, it won't be defined—not as an identifier containing an `undefined` value, but as if it hadn't been declared.

Depending on the keyword you use to declare a variable and the context in which you define it, you can scope variables to block statements (_block scope_), individual functions (_function scope_), or the entire JavaScript application (_global scope_).

### Block scope

Any variable you declare using `let` or `const` is scoped to its closest containing [block statement](/learn/javascript/introduction#block-statements), meaning that the variable can only be accessed within that block. Trying to access a block scoped variable outside its containing block causes the same error as attempting to access a variable that doesn't exist:

```
{
    let scopedVariable = true;
    console.log( scopedVariable );
}
> true

scopedVariable
> ReferenceError: scopedVariable is not defined
```

As far as JavaScript is concerned, a block scoped variable _doesn't_ exist outside the block that contains it. For example, you can declare a constant inside a block, and then declare another constant outside that block that uses the same identifier:

```
{
  const scopedConstant = false;
}
const scopedConstant = true;

scopedConstant;
> true
```

Although a declared variable can't extend into its parent block, it _is_ available to all descendant blocks:

```
{
    let scopedVariable = true;
    {
    console.log( scopedVariable );
    }
}
> true
```

The value of a declared variable can be changed from within a descendant block:

```
{
    let scopedVariable = false;
    {
    scopedVariable = true;
    }
    console.log( scopedVariable );
}
> true
```

A new variable can be initialized with `let` or `const` inside a descendant block without errors, even if it uses the same identifier as a variable in a parent block:

```
{
    let scopedVariable = false;
    {
    let scopedVariable = true;
    }
    console.log( scopedVariable );
}
> false
```

### Function Scope

Variables declared using `var` are scoped to their closest containing function (or [static initialization block](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks) inside a [class](/learn/javascript/classes)).

```
function myFunction() {
    var scopedVariable = true;

    return scopedVariable;
}

scopedVariable;
> ReferenceError: scopedVariable is not defined
```

This is still the case after a function has been called. Even though the variable is initialized while the function executes, that variable is still unavailable outside the scope of the function:

```
function myFunction() {
    var scopedVariable = true;

    return scopedVariable;
}

scopedVariable;
> ReferenceError: scopedVariable is not defined

myFunction();
> true

scopedVariable;
> ReferenceError: scopedVariable is not defined
```

### Global scope

A global variable is available throughout an entire JavaScript application, inside of any and all blocks and functions, to any script on the page.

While this can seem like a desirable default, variables that any part of an application can access and modify can add unnecessary overhead, or even cause collisions with variables elsewhere in an application with the same identifier. This applies to any and all JavaScript involved in the rendering of a page, including things like third-party libraries and user analytics. Therefore, it's best practice to avoid _polluting the global scope_ whenever possible.

Any variable declared using `var` outside a parent function, or using `let` or `const` outside a parent block, is global:

```
var functionGlobal = true; // Global
let blockGlobal = true; // Global

{
    console.log( blockGlobal );
    console.log( functionGlobal );
}
> true
> true

(function() {
    console.log( blockGlobal );
    console.log( functionGlobal );
}());
> true
> true
```

Assigning a value to a variable without explicitly declaring it (that is, by never using `var`, `let`, or `const` to create it) elevates a variable to the global scope, even when initialized inside of a function or block. A variable created using this pattern is sometimes called an "implied global."

```
function myFunction() {
    globalVariable = "global";

    return globalVariable
}

myFunction()\
> "global"

globalVariable\
> "global"
```

### Variable Hoisting

Variables and function declarations are _hoisted_ to the top of their scope, meaning that the JavaScript interpreter processes any variable declared at any point in a script and effectively moves it to the first line of its enclosing scope before executing the script. This means that a variable declared using `var` can be referenced before the variable is declared without encountering an error:

```
hoistedVariable
> undefined

var hoistedVariable;
```

Because only the variable declaration is hosted, not the initialization, variables that haven't been explicitly declared with `var`, `let`, or `const` aren't hoisted:

```
unhoistedVariable;
> Uncaught ReferenceError: unhoistedVariable is not defined

unhoistedVariable = true;
```

[As mentioned previously](#declaration), a declared but uninitialized variable is assigned a value of `undefined`. That behavior applies to hoisted variable declarations as well, but only to those declared using `var`.

```
hoistedVariable
> undefined

var hoistedVariable = 2 + 2;

hoistedVariable\
> 4
```

This unintuitive behavior is largely a holdover from design decisions made in the earliest versions of JavaScript, and can't be changed without the risk of breaking existing sites.

`let` and `const` address this behavior by instead throwing an error when a variable is accessed before it's created:

```
{
    hoistedVariable;

    let hoistedVariable;
}
> Uncaught ReferenceError: can't access lexical declaration 'hoistedVariable' before initialization
```

This error is different from the "hoistedVariable is not defined" error you might expect when trying to access an undeclared variable. Because JavaScript has hoisted the variable, it's aware that the variable will be created within the given scope. However, instead of making that variable available before its declaration with a value of `undefined`, the interpreter throws an error. Variables declared with `let` or `const` (or `class`) are said to exist in a "temporal dead zone" ("TDZ") from the start of their enclosing block until the point in the code where the variable is declared.

The temporal dead zone makes the behavior of `let` more intuitive than `var` for authors. It's also critical to the design of `const`. Because constants can't be changed, a constant hoisted to the top of its scope and given an implicit value of `undefined` couldn't then be initialized with a meaningful value.

## Check your understanding

What kinds of characters can you start an identifier with?

A letter

An underscore

A digit

Which is the preferred method of declaring a variable whose value can be changed at any time?

let

const

var

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.