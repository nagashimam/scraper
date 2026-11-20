**Modern Web Guidance is now stable!** Upgrade your coding agents with expert-vetted web development best practices. [Read the announcement](https://developer.chrome.com/blog/modern-web-guidance-v1).

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [HTML](https://web.dev/learn/html)

# Dialog Stay organized with collections Save and categorize content based on your preferences.

A modal dialog is a special type of pop-up box that interrupts the user on a web page. While there are some valid [use cases for popping up a dialog](https://www.nngroup.com/articles/modal-nonmodal-dialog/), you should take great consideration before adding one. Modal dialogs force users to focus on specific content and temporarily ignore the rest of the page.

Dialogs can be:

*   **Modal**: Users can only interact with content within the dialog. Modal dialogs are displayed on top of the page content. The page is set to [inert](/learn/html/focus) and, by default, obscured by a semi-transparent backdrop.
*   **Non-modal**: Users can interact with content outside of the dialog.

The semantic HTML [`<dialog>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) element to create a dialog comes with semantics, keyboard interactions, and all the properties and methods of the [`HTMLDialogElement`](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement) interface.

## Modal dialogs

Take a look at an example of a modal `<dialog>`. Click **Open modal dialog**. Once opened, there are three ways to close the dialog: the escape key, submitting a form with a button that has the [`formmethod="dialog"`](https://developer.mozilla.org/docs/Web/HTML/Element/button#attr-formmethod) set (or if the form itself has `method="dialog"` set), and the [`HTMLDialogElement.close()`](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close) method.

The `HTMLDialogElement` has three main methods, along with all the methods inherited from [`HTMLElement`](/learn/html/apis).

```
dialog.show() /* opens the dialog */
dialog.showModal() /* opens the dialog as a modal */
dialog.close() /* closes the dialog */
```

Because this `<dialog>` was opened with the [`HTMLDialogElement.showModal()`](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/showModal) method, it's a modal dialog. Opening a modal dialog deactivates and obscures everything other than the dialog itself. When you hover over the UI outside of the dialog, all the elements behave as if [`pointer-events: none;`](https://developer.mozilla.org/docs/Web/CSS/pointer-events) was set. Even the button that opens the dialog won't react to interactions.

When the dialog is opened, focus moves into the dialog. Focus is set on the first element in the sequential keyboard navigation order within that dialog. If you hit the `tab` key repeatedly, only the content within the dialog can get focus while the modal is open. Everything outside of the modal remains inert.

When a dialog is closed, modal or not, focus is returned to the element that opened the dialog. Avoid programmatically opening a dialog without a user action. If you must, make sure that you return the focus to where it was prior to the dialog opening, especially if the user dismisses the dialog without interacting with it.

There is a global [`inert`](/learn/html/focus#the_inert_attribute) attribute that can be used to disable an element and all of its descendants, other than any active dialog. When a modal dialog is opened using `showModal()`, the inertness or deactivation occurs by default. The attribute isn't explicitly set.

The backdrop that obscures everything other than the dialog can be styled using the [`::backdrop`](https://developer.mozilla.org/docs/Web/CSS/::backdrop) pseudo-element. The backdrop is only displayed when a `<dialog>` is displayed with the `.showModal()` method. This pseudo-element matches all the backdrops, including the one displayed when the [FullScreen API](https://developer.mozilla.org/docs/Web/API/Fullscreen_API) is used, such as when viewing a video in full-screen mode which doesn't have the same aspect ratio as the screen or monitor.

## Non-modal dialogs

The `HTMLDialogElement.show()` similarly opens a dialog, but without adding a backdrop or causing anything to become inert. The escape key only closes modal dialogs, not non-modal dialogs. Because of this, it's even more important to include a method of closing the non-modal dialog. If the close option is outside of the dialog, the focus will return to the element that opened the dialog. This is an unideal user experience.

While a button to close the dialog is not officially required by the specification, consider it required. A visible button that can receive focus improves accessibility and user experience.

## Closing a dialog

You don't need the `HTMLDialogElement.close()` method to close a dialog. You don't need JavaScript at all. To close the `<dialog>` without JavaScript, include a form with a dialog method by either setting `method="dialog"` on the `<form>` or `formmethod="dialog"` on the button.

When a user submits with the `dialog` method, the state of user-entered data is maintained. While there is a submit event, the form goes through constraint validation (unless `novalidate` is set). The user data is is not cleared or submitted. You can create a close button without JavaScript:

```
<dialog open>
  <form method="dialog">
    <button type="submit" autofocus>close</button>
  </form>
</dialog>
```

You may have noticed the [`autofocus`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autofocus) attribute set on the close `<button>` in this example. Elements with `autofocus` attribute set within a `<dialog>` only receive focus on page load if the page was already loaded with the dialog visible. If the page wasn't loaded, these elements receive focus when the dialog is opened.

When a dialog is opened, the first focusable element within the dialog receives focus, unless a different element has the `autofocus` attribute set. Setting the `autofocus` attribute on the close button ensuresit receives focus when the dialog is opened. But including [`autofocus` within a `<dialog>`](/learn/html/focus#giving_focus_to_interactive_elements) should only be done with much consideration. All the elements in the sequence coming before the autofocused element are skipped. We discuss this attribute further in the [focus module](/learn/html/focus).

The [`HTMLDialogElement`](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement) interface includes a [`returnValue`](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/returnValue) property. Submitting a form with a `method="dialog"` sets the `returnValue` to the `name`, if any, of the submit button used to submit the form. If we wrote `<button type="submit" name="toasty">close</button>`, the `returnValue` would be `toasty`.

When a dialog is opened, the boolean [`open`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog#attr-open) attribute is present, meaning the dialog is active and can be interacted with. When a dialog is opened by adding the `open` attribute rather than with `.show()` or `.showModal()`, the dialog is modal-less. The [`HTMLDialogElement.open`](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/open) property returns `true` or `false`, depending on whether the dialog is available for interaction—not whether it is modal or not.

While JavaScript is the preferred method of opening a dialog, including the `open` attribute on page load, and then removing it with `.close()`, can help ensure the dialog is available even when JavaScript is not.

## Additional details

### Don't use `tabindex`

The element that is activated to open the dialog and the close button contained in it (and possibly other content) can receive focus and are interactive. The `<dialog>` element is not interactive and doesn't receive focus. Don't add the `tabindex` property to the dialog itself.

### ARIA roles

The implicit role is [`dialog`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles/dialog_role). If the dialog is a confirmation window that communicates a message that requires a user response or confirmation, set [`role="alertdialog"`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles/alertdialog_role). Include an accessible name for the dialog. If visible text can provide the accessible name, add `aria-labelledby="idOfLabelingText"`.

### CSS defaults

Browsers provide default styling for `dialog`. Firefox, Chrome, and Edge set `color: CanvasText;` and `background-color: Canvas;`. Safari sets `color: black; background-color: white;` in their user-agent stylesheets. The `color` is inherited from `dialog`, instead of `body` or `:root`, which may be unexpected. The `background-color` property is not inherited.

### Check your understanding

Test your knowledge of the dialog element.

How do you style the area behind the dialog?

With the `::background` pseudo-element.

Try again.

With the `::backdrop` pseudo-element.

Correct!

With the `background` property.

Try again.

[

Previous

arrow\_back Details and summary](/learn/html/details)

[

Next

Conclusion and next steps arrow\_forward](/learn/html/conclusion)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2023-02-21 UTC.