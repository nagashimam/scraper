*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Responsive Design](https://web.dev/learn/design)

# Macro layouts Stay organized with collections Save and categorize content based on your preferences.

Macro layouts describe the larger, page-wide organization of your interface.

![A wireframe of a two column layout, next to the same layout as one column for a narrow view.](/static/learn/design/macro-layouts/image/a-wireframe-a-column-la-a517dae97f715.jpeg)

Before applying any layout, you should make sure that the flow of your content makes sense. This single column default ordering is what smaller screens will get.

```
<body>
  <header>…</header>
  <main>
    <article>…</article>
    <aside>…</aside>
  </main>
  <footer>…</footer>
</body>
```

When you arrange these individual page-level components, you're designing a macro layout: a high-level view of your page. Using media queries, you can supply rules in CSS describing how this view should adjust to different screen sizes.

## Grid

[CSS grid](/learn/css/grid) is an excellent tool for applying a layout to your page. In the example above, say you want a two-column layout once there's enough screen width available. To apply this two-column layout once the browser is wide enough, use a media query to define the grid styles above a specified breakpoint.

```
@media (min-width: 45em) {
  main {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```

**Note:** While it would make more sense to specify `min-inline-size` instead of `min-width`, logical properties don't work in media queries yet.

## Flexbox

For this specific layout, you could also use [flexbox](/learn/css/flexbox). The styles would look like this:

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

However, the flexbox version requires more CSS. Each column has a separate rule to describe how much space it should take up. In the grid example, that same information is encapsulated in one rule for the containing element.

## Do you need a media query?

You might not always need to use a media query. Media queries work fine when you're applying changes to a few elements, but if the layout needs to be updated a lot, your media queries could get out of hand with lots of breakpoints.

Say you've got a page full of card components. The cards are never wider than `15em`, and you want to put as many cards on one line as will fit. You could write media queries with breakpoints of `30em`, `45em`, `60em`, and so on, but that's quite tedious and difficult to maintain.

Instead, you can apply rules so that the cards themselves automatically take up the right amount of space.

```
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  grid-gap: 1em;
}
```

You can achieve a similar layout with flexbox. In this case, if there are not enough cards to fill the final row, the remaining cards will stretch to fill the available space rather than lining up in columns. If you want to line up rows and columns, then use grid.

```
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
}
.cards .card {
  flex-basis: 15em;
  flex-grow: 1;
}
```

By applying some smart rules in flexbox or grid, it's possible to design dynamic macro layouts with minimal CSS and without any media queries. That's less work for you—you're making the browser do the calculations instead. To see some examples of modern CSS layouts that are fluid without requiring media queries, see [1linelayouts.com](https://1linelayouts.glitch.me/).

### Check your understanding

Test your knowledge of macro layouts.

Which sentence best describes macro layouts?

Layouts that contain other layouts.

Try again! Most layouts contain other layouts.

When a design uses flexbox or grid.

Try again! Neither flexbox or grid have anything specific to macro layouts.

Low level layouts which cover small amounts of the screen.

Try again!

High level layouts which cover large amounts of the screen.

🎉 Macro layouts are foundational layouts for a page, spanning large amounts of visual area, and often are adjusted with page size media queries.

Macro layouts always use media queries to adapt to different screen sizes?

True

Try again! A macro layout is not defined by its usage of media queries.

False

🎉 Macro layouts may adapt to fit content, fill available space, and more, without a media query.

Now that you've got some ideas for page-level macro layouts, turn your attention to the components within the page. This is the realm of [micro layouts](/learn/design/micro-layouts).

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.