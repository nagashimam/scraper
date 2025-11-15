*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Forms](https://web.dev/learn/forms)

# Address forms Stay organized with collections Save and categorize content based on your preferences.

Filling in an address can be time-consuming and frustrating. What is **Address line 2** for? You may not have a surname, so what should you enter in a **Surname** field? Avoid these confusions and help users fill out address forms.

## Build a user-friendly form

Many forms use one field for first name and one for surname. However, some people don't have a surname, or their names don't have two parts, so how should they fill in the surname field? Use a single `<input>` for the name field. Learn more about [handling different name formats](/learn/forms/internationalization#ensure_your_form_can_handle_different_name_formats).

**Caution:** Don't restrict the allowed characters for names to [Latin-only](https://en.wikipedia.org/wiki/Latin_alphabet). Allow [Unicode characters](/articles/payment-and-address-form-best-practices#unicode-matching) for the name `<input>` to ensure everybody can fill in their name. Use a single `<input>` for the street address, as not every address has a street number.

According to [research](https://baymard.com/blog/address-line-2), **Address line 2** can be confusing for users. Consider using a `<textarea>` for the whole address, or hide the **Address line 2** field behind a reveal `<button>`.

Be careful with form control descriptions. For example, users in the US say **ZIP**, in the UK **postcode**. Use `<label for="zip">ZIP or postal code (optional)</label>` to make sure users know what data to enter. Make the postal code field optional–not every address has a postal code.

**Note:** You can use services like [Place Autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform) or [Loqate](https://www.loqate.com/) to help users look up addresses. Consider [avoiding postcode address lookup](/articles/payment-and-address-form-best-practices#postal-code-address-lookup), and only provide address lookup as an extra option.

## Help users enter their address

The `autocomplete` attribute can help users re-enter their address:

*   `autocomplete="name"`
*   `autocomplete="street-address"`
*   `autocomplete="postal-code"`
*   `autocomplete="country"`

**Note:** There are two possible `autocomplete` values for the country: `country`, country or territory code, and `country-name`, country or territory name. Use `autocomplete="country"` for `<select>` where the `value` for the `<option>` is the country code. Want to use an `<input>` for the country name? Use `autocomplete="country-name"`.

You can define multiple values separated by a space for `autocomplete`. Say you have a form with a shipping address and another form for a billing address. To tell the browser which postal code is for the billing address, you can use `autocomplete="billing postal-code"`. For the shipping address, use `shipping` as the first value.

Change the label for the `Enter` key on on-screen keyboards with the `enterkeyhint` attribute. Use `enterkeyhint="done"` for the last form control, and `enterkeyhint="next"` for the other form controls.

## Resources

*   [Payment and address forms best practices](/articles/payment-and-address-form-best-practices)
*   [Form Usability: Getting Address Line 2 Right](https://baymard.com/blog/address-line-2)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.