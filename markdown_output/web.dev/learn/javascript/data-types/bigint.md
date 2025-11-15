*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# BigInt Stay organized with collections Save and categorize content based on your preferences.

BigInt primitives are a [relatively new addition](https://caniuse.com/bigint) to JavaScript, allowing mathematical operations on numbers outside the range allowed by `Number`. To create a BigInt, append `n` to the end of a number literal, or pass an integer or numeric string value to the `BigInt()` function.

```
const myNumber = 9999999999999999;
const myBigInt = 9999999999999999n;

typeof myNumber;
> "number"

typeof myBigInt;
> "bigint"

myNumber;
> 10000000000000000

myBigInt;
> 9999999999999999n
```

In this example, `9999999999999999` is outside the range of digits that can be safely represented by `Number`, causing a rounding error.

BigInt values don't inherit the methods and properties by the `Number` object provides, and they can't be used with the methods JavaScript's built-in `Math` object provides. Most importantly, you can't mix BigInt and Number primitives in standard arithmetic operations:

```
9999999999999999n + 5
> Uncaught TypeError: can't convert BigInt to number
```

To do arithmetic with BigInts, you must define both operands as BigInt values:

```
console.log( 9999999999999999 + 10 );  // Off by one
> 10000000000000010

console.log( 9999999999999999n + 10n );
> 10000000000000009n
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.