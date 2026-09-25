*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Numbers Stay organized with collections Save and categorize content based on your preferences.

A number value is made up of any series of numeric characters, for example:

```
5
```

The number data type also includes a few special global properties that represent numeric concepts, such as `Infinity` and `NaN`—a value meaning "not a number," a potential result of attempting to perform mathematical calculations on non-number values.

## The number object

When a value is passed to the `Number()` function, that value is converted to the number equivalent. For example, a numeric string results in an equivalent number primitive:

```
Number( "10" );
> 10
```

Passing a `false` or `null` value to `Number()` returns `0`, and `true` returns `1`.

```
Number( null );
> 0

Number( false );
> 0

Number( true );
> 1`
```

If a value can't be converted, as in the case of `undefined` or a string containing non-numeric characters, the `Number` function returns `NaN`:

```
Number( undefined );
> NaN

Number( "The number 3." );
> NaN
```

As detailed in [prototypal inheritance](/learn/javascript/appendix#prototyal-inheritance), you'll likely have little to no reason to use the `Number` object as a constructor, because it creates a `Number` _object_ instead of a number literal.

```
let numObject = new Number( 15 );

numObject;
> Number { 15 }
```

This object behaves as its assigned value for mathematical operations, but it fails strict equality comparisons against number literals because the data types don't match, without providing any practical benefit over a literal value.

```
let tenObject = new Number( 10 );

tenObject + 5;
> 15

tenObject === 10;
> false
```

## Floats and integers

JavaScript only has one number type: 64-bit [IEEE 754-1985 double precision floating-point numbers](https://en.wikipedia.org/wiki/IEEE_754-1985) between `-2^1024` and `2^1024`. Before JavaScript stores any number in memory, it first converts that number to a binary floating-point number, also called a _float_.

This 64-bit storage (one positive or negative "sign" bit, 11 bits for an exponent, and 52 bits for a fraction) can cause precision errors with any number of digits that don't fit within an allowable range. This limitation is inherent to JavaScript's number data type.

```
0.1 + 0.7
> 0.7999999999999999
```

A number value can instead be stored as an _integer_, a floating-point number without a fraction between `-(2^53 − 1)` and `2^53 − 1`. Because floats and integers are stored in the same fundamental way, there's no practical difference in how these numbers operate. However, we recommend using whole numbers whenever possible to avoid precision errors.

## Number operators

When you use standard mathematical operators with number primitives, the mathematical [order of operations](https://en.wikipedia.org/wiki/Order_of_operations) applies: any expressions wrapped in parentheses are evaluated first, followed by exponents, multiplication, division, addition, and subtraction.

| Operator | Name | Description | Usage | Result |
| --- | --- | --- | --- | --- |
| `+` | Addition |  | `2+2` | `4` |
| `-` | Subtraction |  | `4-2` | `2` |
| `*` | Multiplication |  | `2*5` | `10` |
| `/` | Division |  | `10/5` | `2` |
| `++` | Increment | Adds one to a number | `2++` | `3` |
| `--` | Decrement | Subtracts one from a number | `3--` | `2` |
| `**` | Exponent | Returns the result of raising the first  
operand to the power of the second operand. | `2**4` | `16` |
| `%` | Remainder | Returns the remainder left over when the  
first operand is divided by the second operand. | `12%5` | `2` |

You can also use mathematical assignment operators to perform a mathematical operation on the value of a variable and immediately assign that newly-calculated value to the variable.

| Operator | Name | Usage |
| --- | --- | --- |
| `+=` | Addition assignment | `myValue += 2` |
| `-=` | Subtraction assignment | `myValue -= 2` |
| `*=` | Multiplication assignment | `myValue *= 2` |
| `/=` | Division assignment | `myValue /= 2` |
| `**=` | Exponent assignment | `myValue **= 2` |
| `%=` | Remainder assignment | `myValue %= 2` |

## Symbolic values

The number primitive also applies to a few special cases: the "not a number" value (`NaN`) and a value representing infinity that can be either positive (`Infinity`) or negative (`-Infinity`).

You might encounter `Infinity` rarely as the result of dividing by zero, a case in which most programming languages throw an error instead:

```
10 / 0
> Infinity
```

Remember that JavaScript is case-sensitive. `Infinity` is a number data type representing the concept of infinity, but `infinity` has no special meaning:

```
Infinity
> Infinity

infinity
> Uncaught ReferenceError: infinity is not defined
```

`NaN` (meaning "[Not a Number](https://en.wikipedia.org/wiki/IEEE_754-1985#NaN)") shows up more frequently, in cases when the result of an arithmetic operation can't be expressed as a number. For example, because JavaScript tries to infer data type from value and context, a string literal containing only a number can be used in a mathematical operation:

```
"2" * 2;
> 4
```

However, if that string can't be parsed as a number value, the mathematical operation results in a non-number:

```
"two" * 2;
> NaN
```

`NaN` is returned in any case where an invalid value is represented as a number in a mathematical operation. Examples include the following:

*   Failed number conversions (for example, `parseInt( undefined )` )
*   Arithmetic operations where the result isn't a real number (for example, `0 / 0`, `Math.sqrt( -10 )`)
*   An arithmetic operation with an indeterminate result (`0 * Infinity`)
*   An arithmetic operation that includes either an explicit `NaN` (`NaN + 2`) or a `NaN` result (`2 * "string" / 2`)

## Check your understanding

What is the result of passing `false` to `Number()`?

0

False

NaN

1

What is the result of the following mathematical operation?

`"Six" * 3`

NaN

2

18

True

0

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.