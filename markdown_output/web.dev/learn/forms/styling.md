Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Forms](https://web.dev/learn/forms)

# Styling forms Stay organized with collections Save and categorize content based on your preferences.

## Help users use your form with their preferred browser

To ensure that your form is accessible to as many people as possible, use the elements built for the job: `<input>`, `<textarea>`, `<select>`, and `<button>`. This is the baseline for a usable form.

The default browser styles don't look great! Let's change that.

**Note:** Progressive enhancement is a strategy that provides a baseline of essential content and features for as many users as possible. It ensures the best possible experience for users on modern browsers. You start with content, use [semantic HTML](https://developer.mozilla.org/docs/Glossary/Semantics#semantics_in_html), add future-proof CSS, and add robust JavaScript as a last step.

## Ensure form controls are readable for everyone

The default font size for form controls in most browsers is too small. To ensure your form controls are readable, change the font size with CSS:

Increase the `font-size` and `line-height` to improve readability.

```
.form-element {
  font-size: 1.3rem;
  line-height: 1.2;
}
```

**Note:** For `font-size` use relative units such as `em` (relative to the base size of the element's parent) or `rem` (relative to the base size of the document) to ensure that size responds to user preference. Users can change the base `font-size` and all elements with a relative `font-size` will adjust automatically. For `line-height` use a [unitless value](https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/) such as `1.5`, to keep the line height relative to the font size. Learn more about [pixels vs. relative units in CSS](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/).

## Help users navigate through your form

As a next step, change the layout of your form, and increase the spacing of form elements, to help users understand which elements belong together.

The `margin` CSS property increases space between elements, and the `padding` property increases space around the element's content.

For the general layout, use [Flexbox](/learn/css/flexbox) or [Grid](/learn/css/grid). Learn more about [CSS layout methods](/learn/css/layout).

## Ensure form controls look like form controls

Make it easy for people to fill out your form by using well-understood styles for your form controls. For example, style `<input>` elements with a solid border.

**Note:** The default `<input>` border color is too light in many browsers. The lack of contrast can make the element hard to see, especially on mobile. [Open this demo](https://codepen.io/web-dot-dev/pen/9d0576454b3b2d0fc001addab70d25bc) in Chrome on Android to see the default styles.

```
input,
textarea {
  border: 1px solid;
}
```

## Help users submit your form

Consider using a `background` for your `<button>` to match your site style, and override or remove the default `border` styles.

**Note:** In modern browsers, you can style a `<button>` like any other element, so you should always use a semantic `<button>`, or `<input type="submit">`. Using the element built for the job provides many built-in usability and accessibility benefits that you won't get when using a generic element such as a `<div>`. You'll learn about the built-in features in other modules. Learn more about [reverting the default style of a `<button>`](https://archive.hankchizljaw.com/wrote/introducing-the-button-element/#heading-oh-these-are-hard-to-style-though).

## Help users understand the current state

Browsers apply a default style for `:focus`. You can override the styles for `:focus` to match the color to your brand.

```
button:focus {
    outline: 4px solid green;
}
```

**Note:** Only remove the `outline` on `:focus` if you also add other appropriate focus styles, to ensure that default and focus styles are distinguishable. Learn more about [designing focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/).

### Check your understanding

Test your knowledge of styling forms

Why should you use relative units for `font-size`?

To ensure the size responds to user preference.

🎉

To ensure the size responds to the previous element.

Try again!

To ensure the size responds to dark mode.

Try again!

To ensure the size responds to media queries.

Try again!

How can you increase spacing between form controls?

Using the `padding` CSS property.

Try again!

Using the `spacer` CSS property.

Try again!

Using the `margin` CSS property.

🎉

Using the `boundary` CSS property.

Try again!

## Resources

*   [Learn CSS](/learn/css)
*   [CSS layout methods](/learn/css/layout)
*   [Designing focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/)
*   [Reverting the default style of a `<button>`](https://archive.hankchizljaw.com/wrote/introducing-the-button-element/#heading-oh-these-are-hard-to-style-though).

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.