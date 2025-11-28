*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Responsive Design](https://web.dev/learn/design)

# Internationalization Stay organized with collections Save and categorize content based on your preferences.

The World Wide Web is available to everyone in the world—it's right there in the name! That means that your website is potentially available to anyone who has access to the internet, regardless of where they are, what device they're using, or what languages they speak.

The goal of responsive design is to make your content available to everyone. Applying that same philosophy to human languages is the driving force behind internationalization—preparing your content and designs for an international audience.

## Logical properties

English is written from left to right and top to bottom, but not all languages are written this way. Some languages like Arabic and Hebrew read from right to left, and some Japanese typefaces read vertically instead of horizontally. To accommodate these writing modes, logical properties were introduced in CSS.

If you write CSS, you may have used directional keywords like "left", "right", "top", and "bottom." Those keywords refer to the physical layout of the user's device.

[Logical properties](/learn/css/logical-properties), on the other hand, refer to the edges of a box as they relate to the flow of content. If the writing mode changes, CSS written with logical properties will update accordingly. That's not the case with directional properties.

Whereas the directional property `margin-left` always refers to the margin on the left side of a content box, the logical property `margin-inline-start` refers to the margin on the left side of a content box in a left-to-right language, and the margin on the right side of a content box in a right-to-left language.

In order for your designs to adapt to different writing modes, avoid directional properties. Use logical properties instead.

Don't

.byline {
  text-align: right;
}

Do

.byline {
  text-align: end;
}

When CSS has a specific directional value like `left` or `right`, there's a corresponding logical property. Where once we had `margin-left` now we also have `margin-inline-start`.

In a language like English where text flows from left to right, `inline-start` corresponds to "left" and `inline-end` corresponds to "right".

Likewise, in a language like English where the text is written from top to bottom, `block-start` corresponds to "top" and `block-end` corresponds to "bottom."

![Latin, Hebrew and Japanese are shown rendering placeholder text within a device frame. Arrows and colors follow the text to help associate the 2 directions of block and inline.](/static/learn/design/internationalization/image/latin-hebrew-japanese-a-538b56c52363b.webp)

If you use logical properties in your CSS, you can use the same stylesheet for translations of your pages. Even if your pages are translated into languages written from right to left or bottom to top, your design will adjust accordingly. You don't need to make separate designs for each language. By using logical properties, your design will respond to every writing mode. That means your design can reach more people without you having to spend time making separate designs for every language.

Modern CSS layout techniques like [grid](/learn/css/grid) and [flexbox](/learn/css/flexbox) use logical properties by default. If you think in terms of `inline-start` and `block-start` instead of `left` and `top` then you'll find these modern techniques easier to understand.

Take a common pattern like [an icon next to some text](/learn/css/logical-properties#solving_the_icon_issue) or a label next to a form field. Instead of thinking "the label should have a margin on the right," think "the label should have a margin on the end of its inline axis."

Don't

label {
  margin-right: 0.5em;
}

Do

label {
  margin-inline-end: 0.5em;
}

If that page is translated into a right-to-left language, the styles won't need to be updated. You can mimic the effect of seeing your pages in a right-to-left language by using the `dir` attribute on your `html` element. A value of `ltr` means "left to right." A value of "rtl" means "right to left."

If you'd like to experiment with all the permutations of document directions (the block axis) and writing modes (the inline axis), here's [an interactive demonstration](https://codepen.io/argyleink/pen/vYNwbgM).

## Identify page language

It's a good idea to identify the language of your page by using the `lang` attribute on the `html` element.

```
<html lang=&quo>t
```

That example is for a page in English. You can be even more specific. Here's how you declare that a page is using US English:

```
<html lang="e>n
```

Declaring the language of your document is useful for search engines. It's also useful for assistive technologies like screen readers and voice assistants. By providing language metadata you're helping these kinds of speech synthesizers pronounce your content correctly.

The `lang` attribute can go on any HTML element, not just `html`. If you switch languages in your web page, indicate that change. In this case, one word is in German:

```
<p>I felt some <span lang=&quo>t;de"sch<adenf>r<eu>d
```

## Identify a linked document's language

There's another attribute called `hreflang` which you can use on links. The `hreflang` takes the same language code notation as the `lang` attribute and describes the linked document's language. If there's a translation of your entire page available in German, link to it like this:

```
<a href="/path/to/german/version" hre>flang="de<&q>u
```

If you use text in German to describe the link to the German version, use both `hreflang` and `lang`. Here, the text "Deutsche Version" is marked up as being in the German language, and the destination link is also marked up as being in German:

```
<a href="/path/to/german/version" hreflang=&quo>t;de" lang=<&q>u
```

You can also use the `hreflang` attribute on the `link` element. This goes in the `head` of your document:

```
<link href="/path/to/german/version" rel="alternate>&
```

But unlike the `lang` attribute, which can go on any element, `hreflang` can only be applied to `a` and `link` elements.

## Consider internationalization in your design

When you're designing websites that will be translated into other languages and writing modes, think about these factors:

*   Some languages, like German, have long words in common usage. Your interface needs to adapt to these words so avoid designing narrow columns. You can also [use CSS to introduce hyphens](https://developer.mozilla.org/docs/Web/CSS/hyphens).
*   Make sure your `line-height` values can accommodate characters like accents and other diacritics. Lines of text that look fine in English might overlap in a different language.
*   If you're using a web font, make sure it has a range of characters broad enough to cover the languages you'll be translating into.
*   Don't create images that have text in them. If you do, you'll have to create separate images for each language. Instead, separate the text and the image, and use CSS to overlay the text on the image.

## Think internationally

Attributes like `lang` and `hreflang` make your HTML more meaningful for internationalization. Likewise, logical properties make your CSS more adaptable.

If you're used to thinking in terms of `top`, `bottom`, `left`, and `right`, it might be hard to start thinking of `block start`, `block end`, `inline start` and `inline end` instead. But it's worth it. Logical properties are key to creating truly responsive layouts.

### Check your understanding

Test your knowledge of internationalization.

In English, the physical `right` side of a box, is logically which side?

`block-start`

Try again! In English this is `top`

`block-end`

Try again! In English this is `bottom`

`inline-start`

Try again! In English this is `left`

`inline-end`

🎉

Which attribute should you add to your HTML to make it more meaningful for internationalization?

`english`

Try again!

`lang`

🎉 This signals to the browsers which language the document is in, which assists in setting the writing mode, document direction and translations.

`language`

Try again!

`i18n`

Try again!

Next, you'll learn how to approach page-level layouts, also known as [macro layouts](/learn/design/macro-layouts).

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.