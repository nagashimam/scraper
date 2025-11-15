*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [JavaScript](https://web.dev/learn/javascript)

# Booleans Stay organized with collections Save and categorize content based on your preferences.

The boolean primitive is a logical data type with only two values: `true` and `false`.

## Boolean object

All values in JavaScript are implicitly `true` or `false`. The `Boolean` object can be used to [coerce](/learn/javascript/introduction#weak-typing) a value to a `true` or `false` boolean, based on the implicit true or false state of that value:

```
Boolean( "A string literal" );
> true
```

Values that result in `false` include `0`, `null`, `undefined`, `NaN`, an empty string (`""`), an omitted value, and a `false` boolean. All other values result in `true`.

```
Boolean( NaN );
> false

Boolean( -0 );
> false

Boolean( 5 );
> true

Boolean( "false" ); // the value `"false"` is a string, and therefore implicitly true.
> true
```

Avoid using the `Boolean` object as a constructor. It creates an _object_ containing a boolean value, not the boolean primitive you might expect:

```
const falseBoolean = Boolean( 0 );
const falseObject = new Boolean( 0 );

console.log( falseBoolean  );
> false

console.log( falseObject  );
> Boolean { false }

falseObject.valueOf();
> false
```

Because all objects are inherently [truthy](/learn/javascript/comparison#truthy-falsy), the resulting boolean object always loosely evaluates to true, even if it contains a `false` value:

```
const falseBoolean = Boolean( 0 );
const falseObject = new Boolean( 0 );

console.log( falseBoolean == true );
> false

console.log( falseObject == true );
> false

console.log( !!falseObject );
> true
```

## Check your understanding

Which of the following returns `false`?

An empty string

`0`

`null`

`"none"`

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-03-31 UTC.