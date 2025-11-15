*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Class fields and methods Stay organized with collections Save and categorize content based on your preferences.

## Fields

Class fields are declared directly within the body of a class, not explicitly added as a property of the `this` value. However, the result is the same: a property defined on instances of that class.

```
class MyClass {
    myField;
}

const myClassInstance = new MyClass();

myClassInstance;
> MyClass { myField: undefined }
```

You can initialize a field with a value. This is often a default value that logic within the class can overwrite:

```
class MyClass {
    myResult = false;
    set setValue( myValue ) {
        this.myResult = myValue;
    }
}
const myClassInstance = new MyClass();

myClassInstance;
> Object { myResult: false }

myClassInstance.setValue = true;

myClassInstance;\
> Object { myResult: true }
```

Class fields are functionally identical to properties attached to the class using `this`. This means they can be accessed and modified from outside the class like any other property.

```
class MyClass {
    myField = true;
}

const myClassInstance = new MyClass();

myClassInstance.myField;
> true

myClassInstance.myField = false;

myClassInstance.myField;
> false;
```

Fields provide a basis for some of the more advanced features of classes.

## Private fields and methods

_Private_ fields and methods are inaccessible outside a class. A private property is associated with an instance of a class, meaning that each instance contains its own set of private fields and methods, as defined on the class.

To make a property private, add a `#` to the beginning of the identifier when you declare it:

```
class MyClass {
    #myPrivateField = true;
    #myPrivateMethod() {}
}
const myClassInstance = new MyClass();

myClassInstance;
> MyClass { #myPrivateField: true }
    #myPrivateField: true
    <prototype>: Object { … }
        constructor: class MyClass {}
        <prototype>: Object { … }
```

A private field must be declared in the body of the containing class. You can alter its value later as a property of `this`, but you can't create the field using `this`.

Private fields can't be accessed from elsewhere in a script. This prevents data properties from being altered outside of the getter and setter methods provided to interact with the values they contain, and it prevents direct access to methods intended only for use within the class itself.

```
class MyClass {
    #myResult = false;
    set setValue( myValue ) {
        this.#myResult = myValue;
    }
}
const myClassInstance = new MyClass();

myClassInstance;
> MyClass { #myResult: false }

myClassInstance.#myResult = true;
> Uncaught SyntaxError: reference to undeclared private field or method #myResult

myClassInstance.setValue = true;

myClassInstance;\
> MyClass { #myResult: true }
```

However, keep in mind that browsers' developer consoles are generally [very permissive](https://developer.chrome.com/blog/new-in-devtools-111), though inconsistent, about allowing access to private fields for debugging purposes:

```
class MyClass {
    #myPrivateField = true;
    #myPrivateMethod() {
        console.log( "This is inside a private method." );
    }
}
const myClassInstance = new MyClass();

myClassInstance;
> MyClass {#myPrivateField: true}

myClassInstance.#myPrivateField;
> true

myClassInstance.#myPrivateMethod();
> "This is inside a private method."
```

```
class MyClass {
    #myPrivateField = true;
    #myPrivateMethod() {
        console.log( "This is inside a private method." );
    }
}
const myClassInstance = new MyClass();

myClassInstance;
> MyClass {#myPrivateField: true}

myClassInstance.#myPrivateField;
> Uncaught SyntaxError: reference to undeclared private field or method #myPrivateField

myClassInstance.#myPrivateMethod();
> Uncaught SyntaxError: reference to undeclared private field or method #myPrivateMethod
```

Private fields are tightly scoped to the body of the class that contains them, meaning that even child classes can't access private fields associated with a parent class:

```
class MyClass {
    #myPrivateField = true;
}
class ChildClass extends MyClass {
    childMethod() {
        console.log( this.#myPrivateField );
    }
}
> Uncaught SyntaxError: reference to undeclared private field or method #myPrivateField
```

## Static fields and methods

Static fields and methods are members of a class itself, not members of the _instances_ of that class. Because of this, static fields provide a central point for data that won't be unique to each instance of a class, but that those instances might need to reference—for example, shared configuration information. Static methods are often utility functions for working with instances of a class, such as comparing or sorting instances against a field they contain.

To define static fields and methods in the body of a class, use the `static` keyword:

```
class MyClass {
    static myStaticField;
    static myStaticMethod() {}
}
const myClassInstance = new MyClass();
```

You can also use dot notation to create a static method:

```
class MyClass {
    constructor() {}
}
MyClass.myStaticMethod = function() {}
```

You can't access static properties from an instance of their class, but they're available on the class constructor:

```
class MyClass {
    static myStaticField = true;
    static myStaticMethod() {
        console.log( "A static method." );
    }
}
const myClassInstance = new MyClass();

myClassInstance.myStaticField;
> undefined

myClassInstance.myStaticMethod();
> Uncaught TypeError: myClassInstance.myStaticMethod is not a function

MyClass.myStaticField;
> true

MyClass.myStaticMethod();
> "A static method."
```

They're not technically required, but using static methods is best practice for creating utilities to work with instances of a class. Examples of this might include a static method dedicated to sorting instances of a class, or a static factory method that contains any necessary setup for creating an instance of a class and then returns the class instance:

```
class User {
    constructor( name, email ) {
        this.name = name;
        this.email = email;
    }
    static fromObject( myObject ) {
        return new User( myObject.name, myObject.email ?? "Omitted" );
    }
}
const userObject = {
    "name" : "My Name",
    "email" : "my@email.address"
};
const secondUserObject = {
    "name" : "My Name"
};

const firstUser = User.fromObject( userObject );
const secondUser = User.fromObject( secondUserObject );

firstUser;
> Object { name: "My Name", email: "my@email.address" }

secondUser;
> Object { name: "My Name", email: "Omitted" }
```

## Check your understanding

Which of the following types of fields can be accessed only from inside the class?

Private fields

Class fields

`Static fields`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.