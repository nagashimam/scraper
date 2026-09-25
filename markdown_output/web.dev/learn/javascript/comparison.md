*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Comparison operators Stay organized with collections Save and categorize content based on your preferences.

Comparison operators compare the values of two operands and evaluate whether the statement they form is `true` or `false`. The following example uses the _strict equality_ operator (`===`) to compare two operands: the expression `2 + 2` and the value `4`. Because the result of the expression and the number value `4` are the same, this expression evaluates to `true`:

```
2 + 2 === 4
> true
```

## Type coercion and equality

Two of the most frequently-used comparison operators are `==` for loose equality and `===` for strict equality. `==` performs a loose comparison between two values by coercing the operands to matching data types, if possible. For example, `2 == "2"` returns `true`, even though the comparison is being made between a number value and a string value.

```
2 == 2
> true

2 == "2"
> true
```

The same is true of `!=`, which returns `true` only if the operands being compared _aren't_ loosely equal.

```
2 != 3
> true

2 != "2"
> false
```

Strict comparisons using `===` or `!==` don't perform type coercion. For a strict comparison to evaluate to `true`, the values being compared must have the same data type. Because of this, `2 == "2"` returns `true`, but `2 === "2"` returns `false`:

```
2 === 3
> false

2 === "2"
> false
```

To remove any ambiguity that might result from auto-coercion, use `===` whenever possible.

| Operator | Description | Usage | Result |
| --- | --- | --- | --- |
| \=== | Strictly equal | 2 === 2 | true |
| !== | Not strictly-equal | 2 !== "2" | true |
| \== | Equal (or "loosely equal") | 2 == "2" | true |
| != | Not equal | 2 != "3" | true |
| \> | Greater than | 3 > 2 | true |
| \>= | Greater than or equal to | 2 >= 2 | true |
| < | Less than | 2 < 3 | true |
| <= | Less than or equal to | 2 <= 3 | true |

## Truthy and falsy

All values in JavaScript are implicitly `true` or `false`, and can be coerced to the corresponding boolean value—for example, by using the "loosely equal" comparator. A limited set of values coerce to `false`:

*   `0`
*   `null`
*   `undefined`
*   `NaN`
*   An empty string (`""`)

All other values coerce to `true`, including any string containing one or more characters and all nonzero numbers. These are commonly called "truthy" and "falsy" values.

```
"My string" == true
> true

100 == true
> true

0 == true
> false
```

## Logical operators

Use the logical AND (`&&`), OR (`||`), and NOT (`!`) operators to control the flow of a script based on the evaluation of two or more conditional statements:

```

2 === 3 || 5 === 5;
> true

2 === 2 && 2 === "2"
> false

2 === 2 && !"My string."
> false

```

A logical NOT (`!`) expression negates the truthy or falsy value of an operand, evaluating to `true` if the operand evaluates to `false`, and `false` if the operand evaluates to `true`:

```

true
> true

!true
> false

!false
> true

```

Using the logical NOT operator (`!`) in front of another data type, like a number or a string, coerces that value to a boolean and reverses the truthy or falsy value of the result.

```
"string"
> "string"

!"string"
> false

0
> 0

!0
> true
```

It's common practice to use two NOT operators to quickly coerce data to its matching boolean value:

```
!!"string"
> true

!!0
> false
```

The logical AND and OR operators don't perform any coercion by themselves. They return the value of one of the two operands being evaluated, with the chosen operand determined by that evaluation.

Logical AND (`&&`) returns the first of its two operands only if that operand evaluates to `false`, and the second operand otherwise. In comparisons that evaluate to boolean values, it returns `true` only if the operands on both sides of the logical AND evaluate to `true`. If either side evaluates to `false`, it returns `false`.

```
true && false
> false

false && true
> false

false && false
> false

true && true
> true
```

When `&&` is used with two non-boolean operands, the first operand is returned unchanged if it can be coerced to `false`. If the first operand can be coerced to `true`, the second operand is returned unchanged:

```
false && "My string"
> false

null && "My string"
> null

"My string" && false
> false

"My string" && "My second string"
> "My second string"

2 === 2 && "My string"
> "My string"
```

Logical OR (`||`) returns the first of its two operands only if that operand evaluates to `true`, and the second operand otherwise. In comparisons that evaluate to boolean values, this means it returns `true` if either operand evaluates to `true`, and if neither side evaluates to `true`, it returns `false`:

```
true || false
> true

false || true
> true

true || true
> true

false || false
> false
```

When using `||` with two non-boolean operands, it returns the first operand unchanged if it could be coerced to `true`. If the first operand can be coerced to `false`, the second operand is returned unchanged:

```
false || "My string"
> "My string"

null || "My string"
> "My string"

"My string" || false
> "My string"

"My string" || "My second string"
> "My string"

2 === 2 || "My string"
> true
```

### Nullish coalescing operator

[Introduced in ES2020](https://caniuse.com/mdn-javascript_operators_nullish_coalescing), the "nullish coalescing operator" (`??`) returns the first operand only if that operand has any value other than `null` or `undefined`. Otherwise, it returns the second operand.

```
null ?? "My string"
> "My string"

undefined ?? "My string"
> "My string"

true ?? "My string";
> true
```

`??` is similar to a logical OR, but stricter in how the first operand is evaluated. `||` returns the second operand for any expression that can be coerced to `false`, including `undefined` and `null`. `??` returns the second operand only when the first operand is strictly equal to `null` or `undefined`, even if it could be coerced to `false`:

```
0 ?? "My string";
> 0

false ?? "My string";
> false

undefined ?? "My string";
> "My string"
```

## Logical assignment operators

Use assignment operators to assign the value of a second operator to a first operator. The most common example of this is a single equals sign (`=`), used to assign a [value to a declared variable](/learn/javascript/data-types/variable#declaration).

Use logical assignment operators to conditionally assign a value to a variable based on the truthy or falsy value of that variable.

The logical AND assignment (`&&=`) operator evaluates the second operand and assigns to the first operand if the only if the first operand would evaluate to `true`—effectively, "if the first operand is true, assign it the value of the second operand instead:"

```
let myVariable = false;
myVariable &&= 2 + 2;
> false

myVariable = true;
myVariable &&= 2 + 2;
> 4
```

The truthy or falsy value of the first operand determines whether an assignment is performed. However, trying to evaluate the first operand using a comparison operator results in a `true` or `false` boolean, which can't be assigned a value:

```
let myVariable = 5;
myVariable > 2 &&= "My string"
> SyntaxError: Invalid left-hand side in assignment
```

The logical OR assignment (`||=`) operator evaluates the second operand and assign to the first operand if the first operand evaluates to `false`— effectively "if the first operand is false, assign it the value of the second operand instead:"

```
let myVariable = false;
myVariable ||= 2 + 2;
> 4

myVariable = true;
myVariable ||= 2 + 2;
> true
```

## Check your understanding

Which operator indicates "strictly equal"?

`===`

`==`

`=`

`!=`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.