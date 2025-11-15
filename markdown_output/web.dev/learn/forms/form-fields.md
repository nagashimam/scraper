*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Forms](https://web.dev/learn/forms)

# Help users enter data in forms Stay organized with collections Save and categorize content based on your preferences.

To make a form interactive, you need to add form elements. There are controls to enter and select data, elements that describe controls, elements that group fields, and buttons to submit a form.

## What are form elements?

You see two `<input>` elements, `<input type="text">` and `<input type="file">`. Why do they look different?

Based on the element name and the [type](/learn/forms/form-fields#type) attribute, browsers show different user interfaces, use different [validation](/learn/forms/validation) rules, and provide many other features. Using the appropriate form control helps you build better forms.

**Note:** The default form control [styles differs across browsers](/learn/forms/styling), operating systems, and platforms.

## Labels for form elements

Say you want to add an input where the user can enter their favorite color. For this, you need to add an [`<input>` element](/learn/forms/form-fields#input) to your form. But, how does the user know that they should fill in their favorite color?

To describe form controls, use a `<label>` for each form control.

```
<label for="color">What is your favorite color?</label>
<input type="text" id="color" name="color">
```

The `for` attribute on the label element matches the `id` attribute on the input.

**Note:** Describe every form control with a `<label>` rather than using some other HTML element. This makes the form control accessible to screen readers, and provides a bigger target, since you can tap or click the label to set focus on the control. [Click the label](https://codepen.io/web-dot-dev/pen/3ce69644635734a084f45350993f4170) in our demo to try this out.

## Capture user input

As the name suggests, the `<input>` element is used to gather input from users.

```
<label for="color">What is your favorite color</label>
<input type="text" id="color" name="color">
```

As mentioned before, the `id` attribute connects the `<input>` to the `<label>`. What about the name and type attribute in this example?

### The name attribute

Use the `name` attribute to identify the data the user enters with the control. If you submit the form, this name is included in the request. Say that you named a form control `mountain` and the user entered `Gutenberg`, the request includes this information as `mountain=Gutenberg`.

[Try to change](https://codepen.io/web-dot-dev/pen/a9ec1be360c53c5284da27a92fbd7248) the name of the form control to `hill`. If you do this correctly, and submit the form, `hill` is visible in the URL.

### The input type

There are different [types of form controls](https://developer.mozilla.org/docs/Web/HTML/Element/input#input_types), all with useful built-in features that work across different browsers and platforms. Based on the `type` attribute, the browser renders different user interfaces, shows different on-screen keyboards, uses different validation rules, and more. Take a look at how to change the type.

By using `type="checkbox"` the browser now renders a checkbox instead of a text field. The checkbox also comes with additional attributes. You can set the `checked` attribute, to show it as checked.

**Note:** The default value for `type` is `text`. This means if you want a text `<input>`, you don't need to include the `type` attribute.

There are various other [types](/learn/forms/fields) you can choose. We have a detailed look in a later module.

## Allow multiple lines of text

Say, you need a field where a user can write a comment. For this, wouldn't it be great if they can enter multiple lines of text? This is the purpose of the `<textarea>` element.

```
<label for="comment">Comment</label>
<textarea id="comment" name="comment"></textarea>
```

## Pick from a list of options

How do you give users a list of options to select from? You can use a `<select>` element to achieve this.

**Note:** If you want to enable text input with additional predefined options, you can also use an `<input>` element together with a [`<datalist>` element](https://developer.mozilla.org/docs/Web/HTML/Element/datalist). Try a [`<datalist>` example](https://simpl.info/datalist/).

```
<label for="color">Color</label>
<select id="color" name="color">
  <option value="orange">Orange</option>
  <option value="pink">Pink</option>
</select>
```

First, you add a `<select>` element. As with all other form controls, you connect it to a `<label>` with the `id` attribute and give it a unique name using the `name` attribute.

In between the start and end tag of the `<select>` element, you can add multiple `<option>` elements, each representing one selection.

Each option has a unique `value` attribute, so you can tell them apart when processing the form data. The text inside the option element is the human-readable value.

If you submit the form using this `<select>` without changing the selection, the request will include `color=orange`. But how does the browser know which option should be used?

The browser uses the first option in the list, unless:

*   One `<option>` element has the `selected` attribute.
*   The user chooses another option.

## Pre-select an option

With the `selected` attribute you can pre-select one option. This becomes the default, regardless of the order in which `<option>` elements are defined.

## Group form controls

Sometimes you need to group form controls. You can use the `<fieldset>` element to do that.

```
<fieldset>
    <legend>What is your favorite web technology</legend>

    <label for="html">HTML</label>
    <input type="radio" name="webfeature" value="html" id="html">

    <label for="css">CSS</label>
    <input type="radio" name="webfeature" value="css" id="css">
</fieldset>
```

Did you notice the `<legend>` element inside the `<fieldset>` element? What do you think it is used for?

If your answer is "to describe the group of form controls", you're right!

Every `<fieldset>` element requires a `<legend>` element, just as every form control needs an associated `<label>` element. The `<legend>` also has to be the very first element in the `<fieldset>`. After the `<legend>` element, you can define the form controls which should be part of the group.

## Submit a form

After learning how to add form controls, and group them, you may wonder how a user can submit a form?

The first option is to use a `<button>` element.

```
<button>Submit</button>
```

After a user clicks the **Submit** button, the browser makes a request to the URL specified in the `<form>` element's [action attribute](/learn/forms/form-element#where_is_the_data_processed) with all data from the form controls.

**Warning:** Every `<button>` element inside a form works as a **Submit** button by default. Sometimes you don't want this: for example, when using a `<button>` to toggle visibility for a password field. To disable the default **Submit** behavior, you can add `type="button"` to the `<button>`. This tells the browser that the `<button>` shouldn't submit the form.

You can also use an `<input>` element with `type="submit"` instead of a `<button>` element. The input looks and behaves just like a `<button>`. Instead of using a `<label>` element to describe the `<input>`, use the `value` attribute instead.

```
<input type="submit" value="Submit">
```

In addition, a form can also be submitted by using the `Enter` key when a form field has focus.

### Check your understanding

Test your knowledge of form elements

How do you connect a `<label>` to a form control?

`for='color'` on the `<label>`, and `name='color'` on the `<input>`.

Try again!

`for='color'` on the `<label>`, and `id='color'` on the `<input>`.

Correct!

`id='color'` on the `<label>`, and `for='color'` on the `<input>`.

Try again!

`name='color'` on the `<label>`, and `for='color` on the `<input>`.

Try again!

What do you use for a multi-line form control?

`<input>` element with `type='multi-line'`.

Try again!

The `<text>` element.

Try again!

The `<textarea>` element.

🎉

`<input>` element with `type='long'`.

Try again!

How can you submit a form?

Clicking a `<button>` element.

Correct, this is one option.

Using the `Enter` key.

Correct, this is one option.

Clicking an `<input>` element with `type='submit'`.

Correct, this is one option.

## Resources

*   [The label element](https://developer.mozilla.org/docs/Web/HTML/Element/label)
*   [The input element](https://developer.mozilla.org/docs/Web/HTML/Element/input)
*   [The textarea element](https://developer.mozilla.org/docs/Web/HTML/Element/textarea)
*   [The select element](https://developer.mozilla.org/docs/Web/HTML/Element/select)
*   [The fieldset element](https://developer.mozilla.org/docs/Web/HTML/Element/fieldset)
*   [The button element](https://developer.mozilla.org/docs/Web/HTML/Element/button)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.