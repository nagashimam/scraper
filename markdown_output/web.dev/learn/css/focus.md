Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [CSS](https://web.dev/learn/css)

# Focus Stay organized with collections Save and categorize content based on your preferences.

##### [The CSS Podcast - 018: Focus](https://thecsspodcast.libsyn.com/018-focus)

On your webpage, you click a link that skips the user to the main content of the website. These are often referred to as skip links, or anchor links. When that link is activated by a keyboard, using the _tab_ and _enter_ keys, the main content container has a focus ring around it. Why is that?

This is because the `<main>` has a `tabindex="-1"` attribute value, which means it can be programmatically focused. When the `<main>` is targeted—because the `#main-content` in the browser URL bar matches the `id`—it receives programmatic focus. It's tempting to remove the focus styles in these situations, but handling focus appropriately and with care helps to create a good, accessible, user experience. It can also be a great place to add some interest to interactions.

## Why is focus important?

As a web developer, it's your job to make a website accessible and inclusive to all. Creating accessible focus states with CSS is a part of this responsibility.

Focus styles assist people who use a device such as a keyboard or a [switch control](https://www.24a11y.com/2018/i-used-a-switch-control-for-a-day/) to navigate and interact with a website. If an element receives focus and there is no visual indication, a user may lose track of what is in focus. This can create navigation issues and result in unwanted behaviour if, say, the wrong link is followed.

**Note:** Learn more about the importance of focus for accessibility in [Learn Accessibility: Focus](/learn/accessibility/focus), and more information on how to manage focus in HTML in [Learn HTML: Focus](/learn/html/focus).

## How elements get focus

Certain elements are automatically focusable; these are elements that accept interaction and input, such as `<a>`, `<button>`, `<input>` and `<select>`. In short, all form elements, buttons and links. You can typically navigate a website's focusable elements using the _tab_ key to move forward on the page, and _shift_ + _tab_ to move backward.

There is also a HTML attribute called `tabindex` which allows you to change the tabbing index—which is the order in which elements are focused—every time someone presses their tab key, or focus is shifted with a hash change in the URL or by a JavaScript event. If `tabindex` on a HTML element is set to `0`, it can receive focus via the tab key and it will honour the global tab index, which is defined by the document source order.

If you set `tabindex` to `-1`, it can only receive focus programmatically, which means only when a JavaScript event happens or a hash change (matching the element's `id` in the URL) occurs. If you set `tabindex` to be anything higher than `0`, it will be removed from the global tab index, defined by document source order. Tabbing order will now be defined by the value of `tabindex`, so an element with `tabindex="1"` will receive focus before an element with `tabindex="2"`, for example.

**Warning:** Honoring document source order is really important, and focus order should only be changed if you **absolutely have to change it**. This applies both when setting `tabindex` **and** changing visual order with CSS layout, such as flexbox and grid. Anything that creates unpredictable focus on the web can create an inaccessible experience for the user.

## Styling focus

The default browser behavior when an element receives focus is to present a focus ring. This focus ring varies between both browser and operating systems.

This behavior can be changed with CSS, using the `:focus`, `:focus-within` and `:focus-visible` pseudo-classes that you learned about in the [pseudo-classes lesson](/learn/css/pseudo-classes). It is important to set a focus style which has **contrast** with the default style of an element. For example, a common approach is to utilize the `outline` property.

```
a:focus {
  outline: 2px solid slateblue;
}
```

The `outline` property could appear too close to the text of a link, but the `outline-offset` property can help with that, as it adds extra visual `padding` without affecting the geometric size that the element fills. A positive number value for `outline-offset` will push the outline outwards, a negative value will pull the outline inwards.

Currently in some browsers, if you have a `border-radius` set on your element and use `outline`, it won't match—the outline will have sharp corners. Due to this, it is tempting to use a `box-shadow` with a small blur radius because `box-shadow` clips to the shape, honouring `border-radius`, but **this style will not show in Windows High Contrast Mode**. This is because Windows High Contrast Mode doesn't apply shadows, and mostly ignores background images to favor the user's preferred settings.

## In summary

Creating a focus state that has contrast with an element's default state is incredibly important. The default browser styles do this already for you, but if you want to change this behaviour, remember the following:

*   Avoid using `outline: none` on an element that can receive keyboard focus.
*   Avoid replacing `outline` styles with `box-shadow`. as they don't show up in Windows High Contrast Mode.
*   Only set a positive value for `tabindex` on an HTML element if you absolutely have to.
*   Make sure the focus state is very clear vs the default state.

### Check your understanding

Test your knowledge of focus

Which of the following are automatically focusable elements?

`<a>`

🎉

`<p>`

Try again!

`<button>`

🎉

`<input>`

🎉

`<output>`

Try again!

`<select>`

🎉

Which of the following input devices can set focus?

Gamepad

Gamepads often send keyboard events when their buttons are pressed.

Keyboard

Definitely causes focus when used to navigate the web.

Mouse

A mouse requires vision and no longer puts focus on elements when used. All browsers used to put focus on things like buttons when clicked, but that has changed.

Assistive technology (for example a screen reader or switch)

Definitely causes focus when used to navigate the web.

A potato

Sorry, while a potato can be used as a pointer on touch screens, it does not cause focus after interacting with on screen inputs.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-04-30 UTC.