Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [CSS](https://web.dev/learn/css)

# Nesting Stay organized with collections Save and categorize content based on your preferences.

Nesting CSS style rules can make your stylesheets more organized, easier to read, and more maintainable.

## Overview

Now that you've learned about [selectors](/learn/css/selectors), you're probably wondering about a way to better organize them in your stylesheets. Imagine you were applying styles to items inside of a "feature" section on your site. With nesting, you can group these styles inside of the `.feature` rule like this:

```
.feature {
  button {
    color: blue;
  }

  .link {
    color: red;
  }

  .text {
    font-size: 1.3em;
  }
}
```

This would be the same as writing each style separately:

```
.feature button {
  color: blue;
}

.feature .link {
   color: red;
}

.feature .text {
   font-size: 1.3em;
}
```

Nesting can go as many layers deep as needed.

```
.feature {
  .heading {
    color: blue;

    a {
      color: green;
    }
  }
}
```

**Note:** Though there is no limit to how many layers deep styles can be nested, nesting too deeply is considered bad practice and can make maintaining your CSS more difficult and complicated. Consider if it's possible to refactor your styles if you find yourself nesting more than two to three layers deep.

## Grouping and establishing relationships

Nesting lets you more succinctly group and establish relationships between style rules.

The nested rule will by default be related to the outer rule as a [descendant combinator](/learn/css/selectors#descendant_combinator). Use selectors on the nested rules to change the relationships.

```
/* targets headings that are siblings of the .feature element and come immediately after it */
.feature {
  + .heading {
    color: blue;
  }

/* targets all paragraphs that are direct children of the .feature element */
  > p {
    font-size: 1.3em;
  }
}
```

## Define explicit relationships with the `&` selector

You can also use the `&` selector to be more explicit when nesting style rules. Think of `&` as a symbol representing the parent selector.

```
.feature {
 & button {
    color: blue;
  }
}
```

This would be equivalent to writing the styles like this:

```
.feature button {
  color: blue;
}
```

## When `&` is required

Without `&`, nested selectors will be descendent selectors of the parent selector. To form [compound selectors](/learn/css/selectors#compound_selectors), `&` **is required**.

```
.feature {
  &:last-child {
    /* Selects the .feature element that is the :last-child, equivalent to .feature:last-child */
  }
   
  & :last-child {
    /* Selects the :last-child inside of a .feature element, equivalent to .feature :last-child */
  }

  &.highlight {
    /* Selects .feature elements that also have a .highlight class, equivalent to .feature.highlight */
  }

  & .highlight {
     /* Selects elements inside of the .feature element with the class .highlight, equivalent to .feature .highlight */
  }
}
```

You can also change the context and place the `&` selector at the end of the child selector, or on both sides of it.

```

/* Targets buttons with an adjacent sibling button */
button {
  & + & {
    /* … */
  }
}
```

```
img {
  .my-component & {
    /* styles for images inside of `.my-component` ... */
  }
}
```

In the last example, we are adding styles for images inside of an element with the `.my-component` class. This can be useful if you are working on a project where you can't add a `class` or an `id` to an element.

## Nesting and specificity

Like [`:is()`](/learn/css/pseudo-classes#is), the nesting selector takes the specificity of the selector with the highest specificity in the parent's selector list.

```
#main-header,
.intro {
  & a {
    color: green;
  }
}

.intro a {
  color: blue;
}
```

The first rule targets all of the links inside of the `#main-header` and `.intro` elements, giving them a green color.

The second rule attempts to override this to make links inside of the `.intro` element blue.

We can see why this doesn't work if we look at the specificity of each rule.

```
/* equivalent to :is(#main-header, .intro) a with a specificity of (1, 0, 1) */
#main-header,
.intro {
  & a {
    color: green;
  }
}

/* lower specificity of (0, 1, 1) */
.intro a {
  color: blue;
}
```

Since the first rule has an `id` in its selector list, and nested rules take the specificity of the selector with the highest specificity, it has a higher specificity than the second rule. The links are green even for `a` elements that are not inside an element with the `#main-header` selector.

## Invalid Nesting

Similar to `:is()`, the nesting selector cannot represent pseudo elements.

```
blockquote, blockquote::before, blockquote::after {
  color: navy;

  & {
    border: 1px solid navy;
  }
}
```

You would expect the `blockquote` and its pseudo-elements to both have `navy` colored text and borders, but that's not the case. Since the `&` selector can't represent pseudo-elements, the nested border styles will only apply to the blockquote.

When making compound selectors using `&` and type selectors, the type selector must go first without any whitespace between.

```
/* valid css nesting */
.feature {
  p& {
    font-weight: bold;
  }
}

/* invalid css nesting */
.feature {
  &p {
    font-weight: bold;
  }
}
```

This rule allows CSS nesting to work alongside pre-processing tools like Sass. In Sass, writing `&p` would append the parent selector to the nested type selector and the result would be `.featurep`.

## Nesting at-rules

CSS conditional group rules like `@container`, `@media`, `@supports`, and `@layer` can also be nested.

```
.feature {
  @media (min-width: 40em) {
    /* ... */
  }

  @container (inline-size > 900px) {
    /* ... */
  }
}

.feature {
  @supports (display: grid) {
    /* ... */
  }
}

.feature {
  @layer component {
    h2 {
      /* ... */
    }
  }
}
```

### Check your understanding

When using CSS Nesting, what does the `&` selector represent?

The nested child selector

Incorrect.

The parent selector

Correct!

the nearest sibling selector

Incorrect.

You can only nest two levels deep.

True

Incorrect.

False

Correct!

Which at-rules can be nested?

`@media`

Correct!

`@container`

Correct!

`@import`

Incorrect.

`@supports`

Correct!

`@layer`

Correct!

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-08-21 UTC.