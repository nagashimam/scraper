Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Responsive Design](https://web.dev/learn/design)

# Screen configurations Stay organized with collections Save and categorize content based on your preferences.

Responsive web design was in many ways a reaction to mobile phones. Before smartphones appeared, very few people seriously considered how websites should look and feel on handheld devices. That changed with the meteoric rise of mobile phones featuring built-in web browsers.

Responsive web design encouraged a mindset that questioned assumptions. Whereas previously it was common to assume that a website would only be viewed on a desktop computer, now it's standard practice to design that same website for phones and tablets as well. In fact, [mobile usage has now eclipsed desktop usage](https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/) on the web.

This responsive mindset will serve you well for the future. It's entirely possible that your websites will be viewed on devices and screens that we can't even imagine today. And this mindset extends beyond screens. Even now people are using devices with no screens to access your content. Voice assistants can use your websites if you are using a strong foundation of semantic HTML.

There's experimentation in the world of screens too. There are devices on the market today with foldable screens. That introduces some challenges for your designs.

![A montage of foldable phones in different configurations.](/static/learn/design/screen-configurations/image/a-montage-foldable-phone-d04dc5a4ce205.jpg)

## Dual screens

Users of foldable devices can choose whether they want their web browser to occupy just one of the screens or span across both screens. If the browser spans both screens, then the website on display will be broken up by the hinge between the two screens. It doesn't look great.

![A website spanning across two screens. The horizontal flow of text is interrupted by the hinge between the screens.](/static/learn/design/screen-configurations/image/a-website-spanning-across-c2638de25a4e7.png)

## Viewport segments

There's an experimental media feature designed to detect if your website is being displayed on a dual-screen device. The proposed name of the media feature is `viewport-segments`. There are two varieties: `horizontal-viewport-segments` and `vertical-viewport-segments`.

**Caution:** The `viewport-segments` feature is an experimental proposal and the syntax may change. The syntax has already changed from its initial proposal of a `spanning` media feature.

If the `horizontal-viewport-segments` media feature reports a value of `2` and `vertical-viewport-segments` reports a value of `1` that means the hinge on the device runs from top to bottom, splitting your content into two side-by-side panels.

```
@media (horizontal-viewport-segments: 2) and (vertical-viewport-segments: 1) {
  // Styles for side-by-side screens.
}
```

If the `vertical-viewport-segments` media feature reports a value of `2` and `horizontal-viewport-segments` reports a value of `1` then the hinge runs from side to side, dividing your content into two panels, one on top of the other.

```
@media (vertical-viewport-segments: 2) and (horizontal-viewport-segments: 1) {
  // Styles for stacked screens.
}
```

![Diagram demonstrating viewport segments.](/static/learn/design/screen-configurations/image/diagram-demonstrating-vie-4cafa4be4bd46.svg)

Diagram from [Microsoft Edge Explainers](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Foldables/explainer.md).

If both `vertical-viewport-segments` and `horizontal-viewport-segments` report a value of `1` this means the website is being displayed on just one screen, even if the device has more than one screen. This is equivalent to not using any media query.

## Environment variables

The `viewport-segments` media feature by itself won't help you design around that annoying hinge. You need a way of knowing the size of the hinge. That's where [environment](https://developer.mozilla.org/docs/Web/CSS/env\(\)) variables can help.

Environment variables in CSS allow you to factor awkward device intrusions into your styles. For example, you can design around the "notch" on the iPhone X using the environment values `safe-area-inset-top`, `safe-area-inset-right`, `safe-area-inset-bottom` and `safe-area-inset-left`. These keywords are wrapped in an `env()` function.

```
body {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}
```

Environment variables work like custom properties. This means you can pass in a fallback option in case the environment variable doesn't exist.

```
body {
  padding-top: env(safe-area-inset-top, 1em);
  padding-right: env(safe-area-inset-right, 1em);
  padding-bottom: env(safe-area-inset-bottom, 1em);
  padding-left: env(safe-area-inset-left, 1em);
}
```

For those environment variables to work on the iPhone X, update the `meta` element that specifies `viewport` information:

```
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

Now your page layout will take up the entire viewport and safely pad the document with device-provided inset values.

For foldable screens, six new environment variables are being proposed: `viewport-segment-width`, `viewport-segment-height`, `viewport-segment-top`, `viewport-segment-left`, `viewport-segment-bottom`, `viewport-segment-right`.

**Caution:** Remember, this is just at the proposal stage right now. The specific syntax for the environment variables may well change.

![Diagram showing environment variables for dual screens.](/static/learn/design/screen-configurations/image/diagram-showing-environme-46354fd20f6e2.svg)

Diagram from [Microsoft Edge Explainers](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Foldables/explainer.md).

**Note:** It might seem a little strange to see names proposed with `left`, `right`, `top`, and `bottom`. If you're using logical properties you would expect terms like `inline-start`, `inline-end`, `block-start`, and `block-end`. In this instance though, the names refer to the hardware's physical properties, regardless of the writing mode used by the website being displayed.

Here's an example of a layout with two columns, one wider than the other.

```
@media (min-width: 45em) {
  main {
    display: flex;
    flex-direction: row;
  }
  main article {
    flex: 2;
  }
  main aside {
    flex: 1;
  }
}
```

![The layout is split across two screens with the hinge interrupting the wider column.](/static/learn/design/screen-configurations/image/the-layout-is-split-acros-639076d03147f.png)

For dual screens with a vertical hinge, set the first column to be the width of the first screen and the second column to be the width of the second screen.

```
@media (horizontal-viewport-segments: 2) and (vertical-viewport-segments: 1) {
  main article {
    flex: 1 1 env(viewport-segment-width 0 0);
  }
  main aside {
    flex: 1;
  }
}
```

![The layout is split evenly across two screens with no visible interruption.](/static/learn/design/screen-configurations/image/the-layout-is-split-evenl-0a01cabadce28.png)

Treat dual screens as an opportunity. Perhaps one screen could be used to display scrollable text content while the other displays a fixed element like an image or a map.

![Diagram illustrating a location service split over two screens, with the map on one screen and directions on the other.](/static/learn/design/screen-configurations/image/diagram-illustrating-loc-34a56309c0184.svg)

Diagram from [Microsoft Edge Explainers](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Foldables/explainer.md).

## The future

Will foldable displays become the next big thing? Who knows. No one could've predicted how popular mobile devices would become so it's worth having an open mind about future form factors.

Above all, it's worth ensuring that your websites can respond to whatever the future may bring. That's what responsive design gives you: not just a set of practical techniques, but a mindset that will serve you well as you build the web of tomorrow.

### Check your understanding

Test your knowledge of screen configurations

Which media query targets a foldable device in a split landscape mode?

`@media (horizontal-viewport-segments: 2) and (vertical-viewport-segments: 1)`

Screen configured with 2 columns and 1 row, split landscape.

`@media (vertical-viewport-segments: 2) and (horizontal-viewport-segments: 1)`

2 rows and 1 column, split portrait.

`@media (vertical-viewport-segments: 2) and (horizontal-viewport-segments: 2)`

2 rows and 2 columns, split 4 ways.

`@media (vertical-viewport-segments: 1) and (horizontal-viewport-segments: 1)`

Single cell, no splits.

What are environment variables? Eg `env(safe-area-inset-top)`

Variables about the weather the user is in.

Wrong environment, these CSS variables aren't about the physical world environment the user is in.

Custom build time variables.

While build time, compiled way, variables are useful, they are not the same as the environment variables specced.

Variables containing browser specific attributes for use in adjusting a site to that browser and device.

It's a way for the browser and an author to collaborate on unique viewport contexts or browser impacting attributes.

Variables which have gone green and are safer for the environment.

CSS and it's variables can't impact world polution less.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-12-23 UTC.