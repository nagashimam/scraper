Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Property descriptors Stay organized with collections Save and categorize content based on your preferences.

The majority of your interaction with object properties will likely be surface-level, including creating object literals and setting and accessing property values using keys. However, you can internally configure any property of an object for fine-grained control over how those properties are accessed, altered, and defined. Every object property has a set of invisible attributes containing metadata associated with that property, called "property descriptors."

There are two types of descriptors associated with any property: _data descriptors_ and _accessor descriptors_. A data descriptor includes key and value pairs that contain a property's value, regardless of whether that value is writable, configurable, or enumerable. Accessor descriptors contain functions that execute when a property is set, changed, or accessed.

| Property | Descriptor type | Default value from  
`Object.defineProperty()` | Description |
| --- | --- | --- | --- |
| `[[Value]]` | Data | `undefined` | Contains a property's value. |
| `[[Writable]]` | Data | `false` | Determines whether you can change the property's value. |
| `[[Get]]` | Accessor | `undefined` | The property's _getter_ function, which executes when the property is accessed. |
| `[[Set]]` | Accessor | `undefined` | The property's _setter_ function, which executes when the property is set or changed. |
| `[[Configurable]]` | Both | `false` | If this is `false`, the property can't be deleted and its attributes can't be changed. If this is `false` and `[[Writable]]` is `true`, the property's value can still be changed. |
| `[[Enumerable]]` | Both | `false` | If this is `true`, you can iterate over the property using `for...in` loops or the `Object.keys()` static method. |

Each of these properties uses the same shorthand as `[[Prototype]]`, indicating that these properties aren't meant to be accessed directly. Instead, use the `Object.defineProperty()` static method to define or modify the properties of an object. `Object.defineProperty()` accepts three arguments: the object to act on, the property key to be created or modified, and an object containing the descriptor(s) associated with the property being created or modified.

By default, properties created using `Object.defineProperty()` aren't writable, enumerable, or configurable. However, any property you create either as part of the object literal or using dot or bracket notation is writable, enumerable, and configurable.

```
const myObj = {};

Object.defineProperty(myObj, 'myProperty', {
  value: true,
  writable: false
});

myObj.myProperty;
> true

myObj.myProperty = false;

myObj.myProperty;
> true
```

For example, when `[[Writable]]` has a `false` value, trying to set a new value for the associated property fails silently outside strict mode, and throws an error in [strict mode](/learn/javascript/appendix#strict-mode):

```
{
    const myObj = {};

    Object.defineProperty(myObj, 'myProperty', {
    value: true,
    writable: false
    });

    myObj.myProperty = false;
    myObj.myProperty;
}
> true

(function () {
    "use strict";
    const myObj = {};

    Object.defineProperty(myObj, 'myProperty', {
    value: true,
    writable: false
    });

    myObj.myProperty = false;
    myObj.myProperty;
}());\
> Uncaught TypeError: "myProperty" is read-only
```

Making effective use of descriptors is a fairly advanced concept, but understanding the internal structure of an object is essential to understanding the syntaxes involved in working with objects in more common ways. For example, these concepts come into play when using the `Object.create()` static method, which gives you fine-grained control over any prototypes attached to the new object.

`Object.create()` creates a new object using an existing object as its prototype. This lets the new object inherit properties and methods from another user-defined object the same way that objects inherit properties from JavaScript's built-in `Object` prototype. When you invoke `Object.create()` with an object as an argument, it creates an empty object with the passed object as its prototype.

```
const myCustomPrototype = {
  'myInheritedProp': 10
};

const newObject = Object.create( myCustomPrototype );

newObject;
> Object {  }
<prototype>: Object { myInheritedProp: 10 }
  myInheritedProp: 10
  <prototype>: Object { … }
```

`Object.create` can take a second argument specifying own properties for the newly-created object using a syntax similar to `Object.defineProperty()`— that is, an object mapping keys to a set of descriptor attributes:

```
const myCustomPrototype = {
  'myInheritedProp': 10
};

const myObj = Object.create( myCustomPrototype, {
        myProperty: {
            value: "The new property value.",
            writable: true,
            configurable: true
        }
  });

myObj;
> Object { … }
    myProperty: "The new property value."
    <prototype>: Object { myInheritedProp: 10 }
```

In this example, the new object (`myObj`) uses an object literal (`myCustomPrototype`) as its prototype, which itself contains the inherited `Object.prototype`, resulting in a series of inherited prototypes called the _prototype chain_. Each object has a prototype, whether assigned or inherited, which has an assigned or inherited prototype of its own. This chain ends at a `null` prototype, which has no prototype of its own.

```
const myPrototype = {
  'protoProp': 10
};

const newObject = Object.setPrototypeOf( { 'objProp' : true }, myPrototype );

newObject;
> Object { objProp: true }
    objProp: true
    <prototype>: Object { protoProp: 10 }
        protoProp: 10
        <prototype>: Object { … }
```

The properties contained in a value's prototype are available at the "top level" of an object, without the need to access the prototype property directly:

```
const objectLiteral = {
    "value" : true
};

objectLiteral;
> Object { value: true }
    value: true
    <prototype>: Object { … }

objectLiteral.toString();
"[object Object]"
```

This pattern holds true for the entire prototype chain associated with an object: when trying to access a property, the interpreter looks for that property at each "level" of the prototype chain, from top to bottom, until it finds the property or the chain ends:

```
const myCustomPrototype = {
  'protoProp': "Prototype property value."
};

const myObj = Object.create( myCustomPrototype, {
    myProperty: {
        value: "Top-level property value.",
        writable: true,
        configurable: true
    }
});

myObj.protoProp;
> "Prototype property value."
```

## Check your understanding

Which descriptors are accessors?

`[[Get]]`

`[[Set]]`

`[[Writable]]`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.