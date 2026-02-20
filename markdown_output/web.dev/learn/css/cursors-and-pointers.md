Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [CSS](https://web.dev/learn/css)

# Cursors and pointers Stay organized with collections Save and categorize content based on your preferences.

On non-touchscreen devices, the cursor is an essential way for your users to know what they are interacting with. You can also provide useful hints on how an element can be interacted with, or how a movement with a trackpad or mouse will impact your site.

## Cursors

Browsers automatically handle some common use cases for cursors.

If you are reading this on a device with a cursor, explore the page. It's possible you haven't noticed how cursors change before, but note the hints that it provides. When your pointer goes over text, the cursor changes to a selection I-beam that suggests that you can select the text. If you hover over a link, the cursor changes to a hand pointing with the index finger, suggesting that you can take an action. Everywhere else will have a default cursor, which is often an arrow.

As you make more interactive sites, you will want to customize the cursor so users can more readily understand the interactions.

Browsers support a range of keywords for the [cursor property](https://developer.mozilla.org/docs/Web/CSS/cursor) that provide hints for dragging, resizing, selection, and more.

If none of the supported cursors communicate an element's interactions, you can also provide an SVG or PNG image to be used as a cursor.

## Carets

An insertion caret is used to show your position in editable text. This is different from your cursor, as it doesn't follow your mouse. You can change the color with `caret-color`.

## Responding to a user's pointer inputs

Users with a mouse or trackpad are able to interact with a more precise point on the screen than users with a touchscreen. If you design only for the precision of a mouse, users with touchscreens or fine motor control issues may not be able to interact with your page as they need.

Common issues include buttons that are too small or interactive elements that are too close to each other. These make it difficult for users to interact with the correct element.

Ensuring your buttons and other interactive targets are large enough is an important step in ensuring your site is accessible. You can also customize your styles based on the precision of the user's input devices with `pointer` and `any-pointer` media queries.

The `pointer` media feature refers to the user's primary input device, while `any-pointer` refers to all input devices. You can match devices like mice with `fine` and devices like touchscreens with `coarse`. The `none` value indicates the user is not using an input device with a pointer.

## Pointer and touch events

### Disabling specific touchscreen gestures

When you're using a touchscreen, the browser handles some common gestures. For example, touching the screen with two fingers and spreading them apart usually zooms in on the site. While you don't have to implement those behaviors on your site, you may want to disable or override that behavior in certain cases.

To opt out of the browser handling some actions, list the actions you do want the element to handle. `pan-x` and `pan-y` enable single-finger panning gestures. These can be enabled along with `pinch-zoom` which enables multi-finger zooming and panning.

The `manipulation` keyword is equivalent to `pan-x pan-y pinch-zoom`. `manipulation` excludes other touch behaviors that require multiple touches in a short time, like double tap to zoom.

After you disable browser handling of an action by excluding it from `touch-action`, you can set up pointer events for that action.

**Note:** You should be careful when disabling touch actions that you are not causing accessibility issues. For example, removing the ability for a user to zoom in on the whole page may make your design more stable, but it also may make it more difficult for people with visual impairments to access the content.

### Disabling all events and actions

In some cases, you may want to specify that an element is not interactive. By setting `pointer-events: none` on a button, for example, you won't be able to click the button, or even trigger a hover state.

## Check your understanding

What property controls pointer events for gestures on a touchscreen?

`pointer-events`

Incorrect.

`manipulation`

Incorrect.

`interactivity`

Incorrect.

`touch-action`

Correct!

If a user has a touchscreen with a mouse as a secondary input connected to the same device, which media queries will match?

`@media (pointer: coarse)`

Correct!

`@media (pointer: fine)`

Incorrect.

`@media (any-pointer: coarse)`

Correct!

`@media (any-pointer: fine)`

Correct!

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-08-21 UTC.