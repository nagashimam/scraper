Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [CSS](https://web.dev/learn/css)

# Custom properties Stay organized with collections Save and categorize content based on your preferences.

Say you've been building some initial styles for your site, and you've found yourself repeating some of the values in your CSS. You're using `dodgerblue` as your primary color, and you're adding that to button borders, link text, header backgrounds, and using a design tool to pick some variants of that blue for other pieces of the site. Then, you get a style guide, and the primary color is now `oklch(70% 0.15 270)`.

Custom properties, or CSS variables, allow you to organize and reuse values in your CSS, so that your styles are more flexible and easier to understand.

## Creating properties

The simplest way to create a property is by setting a value on a new property with a name you define.

```
.card {
  --base-size: 1em;
}
```

All property names must start with two dashes. This prevents you from trying to use an existing CSS property name for a custom value. The CSS specification will never add a property that starts with two dashes.

This property can then be accessed with the `var()` function. This example sets the font size within a `.card-title` to double the `--base-size` value.

```
.card .card-title {
  font-size: calc(2 * var(--base-size));
}
```

**Note:** It's a common pattern to initialize properties on the root element, using the \`:root\` selector. This makes the default values accessible anywhere on the page, but still overrideable.

## Using a custom property

As you've seen, you can use the value of a custom property with the `var()` function. You can use the `var()` function in values, but not in media queries. They are especially useful as arguments to other [CSS functions](/learn/css/functions).

### Fallbacks

What happens if you try to use a custom property that doesn't have a value set? The `var()` function takes a second value that will be used as a fallback value. The fallback value can even be another custom property with a nested `var()`.

```
#my-element {
  background: var(
    --alert-variant-background,
    var(--alert-primary-background)
  );
}
```

### Invalid values

If a custom property resolves to an invalid value, for example, a value of `1em` for the `background-color` property, other valid declarations on that element for that property won't be used. This is because the browser can't know if a value is invalid until after it discards other declarations when computing a value. Instead, the used value will be an inherited or initial value.

```
.content {
  background-color: blue;
}

.content.invalid {
  --length: 2rem;
  background-color: var(--length);
}
```

In the preceding example, the `.invalid` element will not have a blue background. Instead, because `background-color` does not inherit, the value will be `transparent`, which is its initial value.

### Overriding and inheritance

Most often, you'll want the default behavior of custom properties, which is that values inherit. When you set a new value for a property, that element and all of its children will have that value, until it is overridden by another value.

Custom properties are determined by the [cascade](/learn/css/the-cascade), so it can also be overridden by a more specific selector.

### More control with `@property`

A custom property that is created by setting a value can be any type, and inherits. For more control over a custom property, you can use the `@property` rule.

Our `--base-size` property created previously would be equivalent to this `@property` declaration.

```
@property --base-size {
  syntax: "*";
  inherits: true;
  initial-value: 18px;
}
```

The `syntax` value sets the [types of CSS values](https://developer.mozilla.org/docs/Web/CSS/@property/syntax) that are valid for the property. If you set a different type on that property, it will be invalid, and fallback to the initial value or an inherited value set higher in the cascade.

When you create a custom property using `@property`, you can disable inheritance with `inherit: false`. Overriding the value for a custom property with inheritance disabled changes it for the selected element, but not for its children. This is often useful when multiple selectors target the same element.

The `initial-value` sets the value of the property, unless it is changed later. Unless the syntax is `*`, meaning any CSS type, the `@property` must set an `initial-value`. This ensures that the property will always have a value of the specified syntax, and will never be undefined.

## Updating custom properties with JavaScript

The value of a custom property on an element can be updated using JavaScript, which you can use to update your site's styles dynamically.

```
const element = document.getElementById("my-button");
getComputedStyle(element).setPropertyValue("--color", orange);
```

This example updates the style tag on the `#my-button` element, and inspecting it in DevTools shows you:

```
<button id="my-button" style="--color: orange">Click me</button>
```

In the preceding example, you can see how you can set custom properties by accessing data stored in [custom HTML attributes](/learn/html/attributes#custom_attributes). Each button has a `data-color` attribute with a value of a specific color. The `--background` custom property set on the body element is reset to the value of `data-color` on whichever button that is clicked.

You can also use `getComputedStyle(element).getPropertyValue("--variable")` to get a property's value on a specific element. This can be useful if your logic needs to respond to a cascaded value.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-08-21 UTC.