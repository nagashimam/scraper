*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# null and undefined Stay organized with collections Save and categorize content based on your preferences.

JavaScript has multiple ways of indicating the absence of a value. This page describes the two most common ways: the `null` and `undefined` data types.

## `null`

The `null` keyword represents an intentionally defined absence of value. `null` is a primitive, although the `typeof` operator returns that `null` is an object. This is an [error](https://2ality.com/2013/10/typeof-null.html) that has carried over from the first version of JavaScript and been left intentionally unaddressed to avoid breaking expected behavior across the web.

```
typeof null
> object
```

You might define a [variable](/learn/javascript/data-types/variable) as `null` with the expectation that it reflects either a value assigned to it at some point in a script or an explicitly absent value. You can also assign the `null` value to an existing reference to clear a previous value.

## `undefined`

`undefined` is a primitive value assigned to [variables](/learn/javascript/data-types/variable) that have just been declared, or to the resulting value of an operation that doesn't return a meaningful value. For example, this can happen when you declare a function in a browser's developer console:

```
function myFunction() {}
> undefined
```

A function explicitly returns `undefined` when its [`return` statement](/learn/javascript/functions/return) returns no value.

```
(function() {
    return;
}());
> undefined
```

## Comparison of `null` and `undefined`

Although `undefined` and `null` have some functional overlap, they have different purposes. In the strictest sense, `null` represents a value intentionally defined as "blank," and `undefined` represents a lack of any assigned value.

`null` and `undefined` are [loosely equal, but not strictly equal](/learn/javascript/comparison#type-coercion-equality). The loose equality operator coerces operands of different types to boolean values, making `null` and `undefined` both `false`. The strict equality operator considers operands of different data types to be unequal.

```
null == undefined
> true

null === undefined
> false
```

Unlike the reserved keyword `null`, `undefined` is a property of the [global object](/learn/javascript/data-types/variable#global-scope). This was a design decision made early in JavaScript's development, and it let legacy browsers overwrite `undefined` completely. In modern browsers, it's still possible to use `undefined` as an identifier in non-global scopes, overriding its value within the scope of that declaration. **Never** use `undefined` as an identifier. It can cause unexpected behaviors and is likely to confuse future maintainers of your codebase.

## Check your understanding

What does `typeof null` return?

`object`

`undefined`

`primitive`

`string`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.