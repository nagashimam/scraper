*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Accessibility](https://web.dev/learn/accessibility)

# Forms Stay organized with collections Save and categorize content based on your preferences.

A form is an element that allows a user to provide data into a field or a group of fields. Forms can be as simple as a single field or as complicated as a multi-step form element with multiple fields per page, input validation, and sometimes a CAPTCHA.

Forms are considered one of the most difficult elements to get right from an accessibility perspective, as they require knowledge of all the elements we have already covered, as well as additional rules specific just to forms. With some understanding and time, you can make an accessible form to suit you and your users.

Forms is the last component-specific module in this course. This module will focus on the form-specific guidelines, but all other guidelines you learned about in the earlier modules, such as [content structure](/learn/accessibility/structure), [keyboard focus](/learn/accessibility/focus), and [color contrast](/learn/accessibility/color-contrast), also apply to form elements.

**Note:** Review our [Learn Forms](/learn/forms) course to learn how to create better forms. There is a [form accessibility](/learn/forms/accessibility) module in that course with additional accessibility-specific form content.

## Fields

The backbone of forms is fields. Fields are small interactive patterns, such as an input or radio button element, that allow users to enter content or make a choice. There is a [wide variety of form fields](/learn/forms/fields) to choose from.

The default recommendation is to use established HTML patterns instead of building something custom with ARIA, as certain features and functions—such as field states, properties, and values—are inherently built into the HTML elements. Custom fields require you manually add the ARIA.

**Note:** If the situation requires you to build custom form fields, be sure to review the [ARIA and HTML](/learn/accessibility/aria-html), [Keyboard focus](/learn/accessibility/focus), and [JavaScript](/learn/accessibility/javascript) modules to understand how to make these custom form fields as accessible as possible.

Not recommended — Custom HTML with ARIA

```
<div role="form" id="sundae-order-form">
  <!-- form content -->
</div>
```

Recommended — Standard HTML

```
<form id="sundae-order-form">
  <!-- form content -->
</form>
```

In addition to choosing the most accessible form field patterns, where applicable, you should also add [HTML autocomplete attributes](https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete) to your fields. Adding autocomplete attributes allows a more fine-grained [definition or identification of purpose](https://www.w3.org/TR/WCAG21/#input-purposes) to user agents and assistive technologies (AT).

Autocomplete attributes allow users to personalize visual presentations, such as showing a birthday cake icon in a field with the birthday autocomplete attribute (`bday`) assigned to it. More generally, autocomplete attributes make filling out forms easier and quicker. This is especially helpful for people with cognitive and reading disorders and those using ATs, such as screen readers.

```
<form id="sundae-order-form">
  <p>Name: <input type="name" autocomplete="name"></p>
  <p>Telephone: <input type="tel" autocomplete="tel"></p>
  <p>Email address: <input type="email" autocomplete="email"></p>
</form>
```

Lastly, form fields should not produce contextual changes when they receive focus or user input unless the user has been warned about the behavior before using the component. For example, a form should not be automatically submitted when a field receives focus or once a user adds content to the field.

## Labels

Labels inform a user about the purpose of a field, if the field is required, and can also provide information about the field requirements, such as input format. Labels must be visible at all times and accurately describe the form field to users.

One of the foundational tenets of accessible forms is establishing a clear and accurate connection between a field and its label. This is true both visually and programmatically. Without this context, a user might not understand how to fill out the fields in the form.

```
<form id="sundae-order-form">
  <p><label>Name (required): <input type="name" autocomplete="name" required></label></p>
  <p><label>Telephone (required): <input type="tel" autocomplete="tel" required></label></p>
  <p><label>Email address: <input type="email" autocomplete="email"></label></p>
</form>
```

Additionally, related form fields, such as a mailing address, need to be programmatically and visually grouped. One method is to use the fieldset and legend pattern to group elements that are similar.

## Descriptions

Field descriptions are similar to labels in purpose in that they are used to give more context to the field and requirements. Field descriptions are not required for accessibility if the labels or form instructions are descriptive enough.

However, there are situations in which adding additional information is useful to avoid form errors, such as relaying information about the minimum length of input for a password field or telling a user which calendar format to use (such as MM-DD-YYYY).

There are many different methods you can use to add field descriptions to your forms. One of the best methods is to add an [aria-describedby](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-describedby) attribute to the form element, in addition to a `<label>` element. The screen reader will read both the description and the label.

If you add the [aria-labelledby](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby) attribute to your element, the attribute value overrides the text within your `<label>`. As always, be sure to test the final code with all of the ATs you plan to support.

## Errors

When creating accessible forms, there's a lot you can do to prevent users from making form errors. Earlier in this module, we covered clearly marking-up fields, creating identifying labels, and adding detailed descriptions whenever possible. But no matter how clear you think your form is, eventually, a user will make a mistake.

When a user encounters a form error, the first step is to [make the error known](https://www.w3.org/WAI/tutorials/forms/notifications). The field where the error occurred must be clearly identified, and the error itself must be described to the user in text.

There are different methods for [displaying error messages](https://webaim.org/techniques/formvalidation/#error), such as:

*   A modal, inline near where the error occurred
*   A collection of errors grouped in one larger message at the top of the page

Be sure to pay attention to the [keyboard focus](/learn/accessibility/focus) and [ARIA live region options](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) when announcing errors.

Whenever possible, offer the user a detailed suggestion on how to fix the error. There are two attributes available to notify users of errors.

*   You can use the HTML [required](https://developer.mozilla.org/docs/Web/HTML/Attributes/required) attribute. The browser will supply a generic error message based on the filed validation parameters.
*   Or you can use the [aria-required](https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Attributes/aria-required) attribute to share a customized error message to ATs. Only ATs will receive the message unless you add additional code to make the message visible to all users.

Once a user thinks all of the errors have been resolved, allow them to resubmit the form and provide feedback about the results of their submission. An error message tells a user they have more updates to make, while a success message confirms that they have resolved all errors and successfully submitted the form.

## Additional success criteria

WCAG 2.2 introduced the following success criteria that focus on more accessible form experiences:

*   [Target Size (Minimum)](https://www.w3.org/TR/WCAG22/#target-size-minimum)
*   [Consistent Help](https://www.w3.org/TR/WCAG22/#consistent-help)
*   [Accessible Authentication](https://www.w3.org/TR/WCAG22/#accessible-authentication)
*   [Redundant Entry](https://www.w3.org/TR/WCAG22/#redundant-entry).

## Check your understanding

Test your knowledge of accessible forms.

Which of the following is the most accessible form input?

`Email address: <input type="email" required>`

There is no label which associates 'Email address' with the input.

`<label>Email address: <input type="email" required></label>`

This is missing the autocomplete attribute, which offers a definition or identification of purpose to user agents and assistive technologies (AT).

`<label>Email address: <input type="email" required autocomplete="email"></label>`

This is an accessible field label, however it is not the most accessible on this list.

`<label>Email address (required): <input type="email" required aria-describedby="email-validation"> <span id="email-validation" class="validation-message">Please provide a valid email address using the format name@place.com</span></label>`

The aria-describedby attribute adds additional context to an error the user may receive if the field is improperly filled in. While this attribute is not required, it may be useful for AT users.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2023-01-10 UTC.