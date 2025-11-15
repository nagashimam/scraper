*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Keyed collections Stay organized with collections Save and categorize content based on your preferences.

You can use Object literals to store key-value pairs, and Arrays to store iterable collections of values. ES6 also introduces specialized data structures to suit more granular use cases: Map for key-value pairs, and Set for individual values.

## Map

A Map is an iterable data structure that stores information as key-value pairs, similar to an Object literal. Unlike Object literals, a Map allows both values and keys to have any data type, and the order elements are added to a Map is preserved when iterating over it.

To create a Map, use the `Map()` constructor:

```
const myMap = new Map();

myMap;
> Map(0)
```

You can pre-populate a Map with data using a syntax that resembles an array (or any [iterator object](/learn/javascript/control-flow#iterators)) containing array-like objects made up of two elements. The first element in each of these two-element data structures becomes the key, while the second becomes the value associated with that key. The simplest form of this is, effectively, an array in which each element is itself an array made up of two elements, the key and the value of the element to be added to the Map:

```
const myMap = new Map([
    [ "myKey", "A string value" ],
    [ "mySecondKey", 500 ],
    [ "myThirdKey", true ]
]);

myMap;
> Map(3) {'myKey' => 'A string value', 'mySecondKey' => 500, 'myThirdKey' => true}
```

Again, a Map object differs from an object literal in that both the values _and the keys_ can take any data type and value:

```
const notAFunction = () => console.log( "function" );
const myMap = new Map([
  [ null, 0 ],
  [ false, "This is false" ],
  [ undefined, "No defined value" ],
  [ NaN, "Not a number" ]
]);

myMap;
> Map(4) {null => 0, false => 'This is false', undefined => 'No defined value', NaN => 'Not a number'}
```

To get, set, or delete Map elements, use the methods inherited from the `Map` constructor:

```
const myMap = new Map();

myMap;
> Map(0)

myMap.set( "myKey", "My value." );

myMap.has( "myKey" );
> true

myMap.get( "myKey" );
"My value."

myMap.delete( "myKey" );

myMap;
> Map(0)
```

Keys in a Map are unique, meaning that setting an identical key overwrites the previously stored key-value pair:

```
const myMap = new Map([ [ "myKey", "A string value" ] ]);

myMap.set( "myKey", 500 );

myMap;
> Map(1) {'myKey' => 500}
```

As with objects, you can assign a Map to a variable declared with `const` and then modify that Map. However, as with other use cases of `const`, you can't alter or delete the variable itself:

```
const myMap = new Map();
myMap.set( "myKey", "A string value" );

myMap;
> Map(1) {'myKey' => 500}
```

### WeakMap

A WeakMap is a map that holds "weak" [references](/learn/javascript/appendix#by-reference-by-value), which must be references to Objects or [Symbols](/learn/javascript/data-types/symbol) that haven't been added to the global Symbol registry.

To create a WeakMap, use the `WeakMap()` constructor:

```
const myWeakMap = new WeakMap();

myWeakMap;
> WeakMap(0)
```

The WeakMap syntax is similar to Map, but WeakMaps aren't [iterable](/learn/javascript/control-flow#iterators), and trying to use any value other than an object or symbol as a key causes a syntax error. When no [references](/learn/javascript/appendix#by-reference-by-value) to a key exist outside the WeakMap, that object or symbol, and the associated value in the WeakMap, are both eligible for [garbage collection](/learn/javascript/appendix#memory-allocation).

This allows for use cases such as storing metadata associated with an object in a WeakMap, using the reference to the object as the key. If no other references exist to this Object, and the Object is removed from memory, the associated metadata is also removed.

## Set

A Set is an iterable collection of unique values somewhat similar to an array, though a Set can only contain _unique_ values. As with a Map, iterating over a Set preserves the order elements were added to it.

To create a Set, use the `Set()` constructor:

```
const mySet = new Set();

mySet;
> Set []
```

You can also create a Set from an Array literal:

```
const mySet = new Set([ 1, 2, 3 ]);

mySet;
> Set(3) [ 1, 2, 3 ]
```

Because a Set doesn't allow duplicate elements, when a Set is created from an array containing multiple instances of the same value, it only retains the first instance of that value:

```
const mySet = new Set([ 1, 2, 3, 2 ]);

mySet;
> Set(3) [ 1, 2, 3 ]
```

To add or remove elements from a Set, use the methods inherited from the `Set` constructor. These methods act on an element based on the value of the element itself, instead of referencing an index:

```
const mySet = new Set();

mySet.add( "My value." );

mySet;
> Set [ "My value." ]

mySet.has( "My value." );
> true

mySet.delete( "My value." );

mySet;
> Set []
```

Though Sets aren't indexed collections, and they're not intended to be used as such, the elements in a Set are [iterated over](/learn/javascript/control-flow#iterators) in order of insertion. Attempts to add a duplicate element value to a Set are skipped, preserving the original insertion order:

```
const mySet = new Set([ 1, 2, 3 ]);

mySet;
> Set(3) [ 1, 2, 3 ]

mySet.add( 2 );
> Set(3) [ 1, 2, 3 ]
```

To create an Array from a Set, use either the `Array.from()` method or spread syntax:

```
const mySet = new Set([ 1, 2, 3 ]);
const myArray = Array.from( mySet );

myArray;
> Array(3) [ 1, 2, 3 ]

[ ...mySet ];
> Array(3) [ 1, 2, 3 ]
```

### WeakSet

WeakSet is a set that contains only [garbage-collectable values](/learn/javascript/appendix#memory-allocation), such as references to Objects, or [Symbols](/learn/javascript/data-types/symbol) that haven't been added to the global Symbol registry.

To create a WeakSet, use the `WeakSet()` constructor:

```
const myWeakSet = new WeakSet();

myWeakSet;
> WeakSet []
```

The WeakSet syntax is similar to Set, though a WeakSet isn't [iterable](/learn/javascript/control-flow#iterators), and trying to add any value other than an object or symbol causes a syntax error. As with WeakMap, when no other [references](/learn/javascript/appendix#by-reference-by-value) to a value referenced by a WeakSet exist, that value becomes eligible for [garbage collection](/learn/javascript/appendix#memory-allocation).

This allows for use cases such as aggregating a single, iterable collection of related objects. If no other references exist to an Object referenced by the WeakSet, the associated element is also removed from the WeakSet.

## Check your understanding

Given the following:

        const myMap = new Map(\[ \[ "myKey", "My string" \] \]);
        myMap.set( "myKey", 100 );
      

What does `myMap` return?

`100`

`"My string"`

`undefined`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.