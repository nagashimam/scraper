Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Forms](https://web.dev/learn/forms)

# Help users avoid re-entering data in forms Stay organized with collections Save and categorize content based on your preferences.

After learning about the [form element](/learn/forms/form-element) and how to make a form [interactive](/learn/forms/form-fields), let's see how you can help users avoid re-entering data.

## Make the most of autofill

Filling out forms can be time-consuming. For example, re-entering your address repeatedly on every site where you want to buy something is not a great shopping experience.

Autofill can help you here. You enter your address once. From now on, your browser will offer you the option to fill in the same address for other forms automatically.

You moved to another city? Don't worry about getting the old address as an option forever. You can edit the address data your browser has saved for you to keep it up-to-date.

**Note:** Browsers also help with remembering data. You sign up for a site. For the password field, you get the option to generate and store a secure password. If you want to log in later at the same site, your browser offers you the option to fill in the stored password.

## How does autofill work in the browser?

An address field can look very different on different sites. How does a browser know that it is an address field?

Browsers use heuristics to identify an address field. What are the values of the `name`, `type`, and `id` attributes? Is there an [`autocomplete` attribute](/learn/forms/auto#autocomplete) present on the form control?

Based on this information, browsers can offer the option to autofill a field with previously entered data of the same type. Browsers can even offer to autofill an entire form.

## Help browsers with autofill

Let's see what you can do to help browsers offer the correct autofill options.

### Use sensible attribute values

As you learned, browsers can identify the data type by looking at the attributes of a form control.

```
<label for="email">Email</label>
<input type="email" name="email" id="email">
```

Do you have a field where users should enter their email address? Use `email` as a value for the `name`, `id`, and `type` attribute. Three hints for the browser that this is an email field.

### The autocomplete attribute

There are other examples where it can still be hard for browsers to identify the data type solely from the `name`, `id`, and `type` attributes. You can help here by using the `autocomplete` attribute.

Have you entered a name before in the browser you're using? The browser will probably offer you the option to fill it in again for this field in the demo.

You can learn more about using [autocomplete and autofill](/learn/forms/autofill) in a later module.

### Check your understanding

Test your knowledge of autofill

Based on which attributes is autofill offered?

The `name` attribute.

Correct, browsers offer autofill based on this attribute among others.

The `type` attribute

Correct, browsers offer autofill based on this attribute among others.

The `autocomplete` attribute

Correct, browsers offer autofill based on this attribute among others.

## Resources

*   [The autocomplete attribute](https://developer.mozilla.org/docs/Web/HTML/Attributes/autocomplete)
*   [Autofill: What web devs should know, but don't](https://cloudfour.com/thinks/autofill-what-web-devs-should-know-but-dont)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.