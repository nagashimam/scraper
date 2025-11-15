*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Classes Stay organized with collections Save and categorize content based on your preferences.

ES6 introduced the concept of "classes" in JavaScript, which differs from classes in other programming languages. Here, classes are special functions that serve as templates for creating objects that already contain data, properties associated with that data, and methods related to the manipulation of that data. These objects, properties, and methods are collectively called "members" of the class.

To define a class, use the `class` keyword. Following best practice and the convention established by JavaScript's built-in constructor functions, begin any identifier of a class with a capital letter:

```
class MyClass {}
```

Classes are intended to provide more accessible ways to work with advanced features of prototypes and constructor functions:

```
class MyClass {}

typeof MyClass;
> "function"
```

Because classes were partly added to make working with advanced JavaScript features easier and more appealing, they're sometimes referred to as ["syntactic sugar"](https://en.wikipedia.org/wiki/Syntactic_sugar). However, classes do more than just provide useful shorthand for working with [prototypal inheritance](/learn/javascript/appendix#prototypal-inheritance). Introducing class syntax created opportunities to address longstanding design issues in JavaScript without introducing backwards compatibility issues. As one example, all code inside the body of a class is always evaluated in [strict mode](/learn/javascript/appendix#strict-mode).

To create an instance of a class, use the `new` operator.

```
class MyClass {}

const myClassInstance = new MyClass();

myClassInstance;
> Object { }
```

Functions defined inside the body of a class are exposed as methods of each instance of that class.

```
class MyClass {
    classMethod() {
        console.log( "My class method." );
    }
}

const myClassInstance = new MyClass();

myClassInstance.classMethod();
> "My class method."
```

A method defined within a class becomes a method on the prototype of the resulting instance. Because of the nature of the [prototype chain](/learn/javascript/objects/property-descriptors), you can call these methods directly on the resulting object:

```
class MyClass {
  classMethod() {
    console.log( "My class method." );
  }
}

const myClassInstance = new MyClass( "A string." );

myClassInstance;
> Object { }
    <prototype>: Object { … }
        classMethod: function classMethod()
        constructor: class MyClass { constructor(myPassedValue) }
        <prototype>: Object { … }

myClassInstance.classMethod();
> "My class method."
```

Creating an instance of a class calls a special `constructor()` method that performs any necessary "setup" for the newly-created instance and initializes any properties associated with it. Any arguments passed to the class when the instance is created are available to the `constructor()` method:

```
class MyClass {
  constructor( myPassedValue ) {
    console.log( myPassedValue );
  }
}

const myClassInstance = new MyClass( "A string." );
> "A string."
```

Within the body of a class, the value of `this` refers to the instance itself, with any properties defined on `this` exposed as properties of each instance of that class:

```
class MyClass {
  constructor( myPassedValue ) {
    this.instanceProperty = myPassedValue;
  }
}

const myClassInstance = new MyClass( "A string." );

myClassInstance;
> Object { instanceProperty: "A string." }
```

These properties are also available to all methods within the body of the class:

```
class MyClass {
  constructor( myPassedValue ) {
    this.instanceProp = myPassedValue;
  }
  myMethod() {
    console.log( this.instanceProp );
  }
}

const myClassInstance = new MyClass( "A string." );

myClassInstance.myMethod();
> "A string."
```

If you don't define a `constructor()` for your class, the JavaScript engine assumes an empty "default" `constructor`. Each class can only have one special method named `constructor()`:

```
class MyClass {
  constructor() {}
  constructor() {}
}
> Uncaught SyntaxError: A class may only have one constructor
```

You can define a class using either a _class declaration_ or a _class expression_. The previous examples have all been class declarations, which require names to be invoked using `new`. Class expressions can be named or left unnamed to create an "anonymous" class.

```
let ClassExpression = class {
    constructor() {}
};

ClassExpression;
> class  {}
```

One thing you can use anonymous class expressions for is functions that construct classes "on the fly:"

```
function classMaker() {
  return class {
    constructor() {}
  };
}

let MyVariable = classMaker();

MyVariable;
> class  {}
```

Redeclaring a class using a class declaration causes a syntax error:

```

class MyClass {
    constructor( ) {
        console.log( "My class." );
    }
};

class MyClass {
    constructor() {
        console.log( "My new class." );
    }
};
> Uncaught SyntaxError: redeclaration of class MyClass
```

However, class expressions let you redefine a class:

```
let ClassExpression = class MyClass { };

ClassExpression = class MyOtherClass {
    constructor( myString ) {
        this.myProp = myString;
    }
};

new ClassExpression( "String." );
> MyOtherClass {myProp: 'String.'}
```

You can't invoke a named class expression by name the way you can a class declaration. However, a class expression's assigned name is available as a property of the created instance, mostly to make debugging easier:

```
let MyVariable = class MyClass {};

MyClass;
> Uncaught ReferenceError: MyClass is not defined

MyVariable;
> class MyClass {}

MyVariable.name;
> "MyClass"
```

When you initialize a variable using a class expression, the [hoisting rules](/learn/javascript/data-types/variable#hoisting) of that variable are followed as expected. Class declarations follow the [same "temporal dead zone" rules as `let` and `const`](/learn/javascript/data-types/variable#hoisting), and behave as if they haven't been hoisted to the top of their current scope, meaning that invoking a class before the class declaration causes an error:

```
{
    let myVar = new MyClass( "Property string." );

    class MyClass {
        myProp;

        constructor( myString ) {
            this.myProp = myString;
        }
    };
};
> Uncaught ReferenceError: Cannot access 'MyClass' before initialization
```

## Check your understanding

Which of the following correctly defines a class?

`class MyClass {}`

`myClass = class {}`

`new class()`

How many `constructor()` methods can a class have?

One

None

Unlimited

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.