Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Forms](https://web.dev/learn/forms)

# Use forms to get data from users Stay organized with collections Save and categorize content based on your preferences.

Learn the basics of using a form on the web with this introduction to the form element.

Imagine you want to ask people on your website about their favorite animal. As a first step, you need a way to collect the data.

In HTML, you can build this using the form element (`<form>`), an `<input>` with a `<label>`, and a submit `<button>`.

```
<form>
  <label for="animal">What is your favorite animal?</label>
  <input type="text" id="animal" name="animal">
  <button>Save</button>
</form>
```

**Note:** You may wonder where the styles for this example are coming from. They are coming from a general stylesheet [included in all demos](/learn/forms/welcome#demos). You can learn more about style in the [Styling module](/learn/forms/styling).

## What is a form element?

The form element consists of the start tag `<form>`, optional attributes defined in the start tag, and an end tag `</form>`.

Between the start and end tag, you can include form elements like `<input>` and `<textarea>` for different types of user input. You'll learn more about [form elements](/learn/forms/form-fields) in the next module.

**Note:** Use [HTTPS to protect all websites and forms](/explore/secure#secure-connections-with-https), not only if you handle sensitive data. This way, all data is encrypted.

## Where is the data processed?

When a form is submitted (for example, when the user clicks the **Submit** button), the browser makes a request. A script can respond to that request and process the data.

**Note:** A script (running on the server or the client) is needed to process the form. It may [validate](/learn/forms/validation) the data, save it into a database, or do other operations based on the form data.

By default, the request is made to the page where the form is shown.

Say you want a script running at `https://web.dev` to process the form data. How would you do that? [Try it out on CodePen](https://codepen.io/web-dot-dev/pen/fbf90faccc7a22e208c2a507f33be598?editors=1100)!

Toggle answer

You can select the location of the script by using the `action` attribute.

      <form action="https://example.com/animals"></form>

The preceding example makes a request to `https://example.com/animals`. A script on the `example.com` backend can handle requests to `/animals` and process data from the form.

## How is the data transferred?

By default, form data is sent as a `GET` request, with the submitted data appended to the URL. If a user submits 'frog' in the previous example, the browser makes a request to the following URL:

```
https://example.com/animals?animal=frog
```

In this case, you can access the data on the frontend or the backend by getting the data from the URL.

If you want, you can instruct the form to use a `POST` request by changing the method attribute.

```
<form method="post">
...
</form>
```

Using `POST`, the data is included in the [body of the request](https://developer.mozilla.org/docs/Web/HTTP/Methods/POST#example).

The data won't be visible in the URL and can only be accessed from a frontend or backend script.

### What method should you use?

There are use cases for both methods.

For forms that process sensitive data use the `POST` method. The data is encrypted (if you use HTTPS) and only accessible by the backend script that processes the request. The data is not visible in the URL. A common example is a sign-in form.

If the data is shareable, you can use the `GET` method. Then, the data is added to your browser history, as it's included in the URL. Search forms often use this. This lets you bookmark a search result page.

Now that you've learned about the form element itself, it's time to learn about [form fields](/learn/forms/form-fields) to make your forms interactive.

### Check your understanding

Test your knowledge of the form element

What does the start tag of the form element look like?

`</form>`

Almost, this is the end tag of the `<form>` element.

`<form-container>`

Try again!

`<form>`

🎉 That was right!

`<form-element>`

Try again!

What attribute can you use to define where the `<form>` is processed?

`where`

Try again!

`action`

Yes, the `action` attribute defines where the `<form>` is processed.

`href`

Try again!

`url`

Try again!

What is the default request method?

`GET`

🎉 That was right!

`POST`

Try again!

## Resources

[The `<form>` element](https://developer.mozilla.org/docs/Web/HTML/Element/form).

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.