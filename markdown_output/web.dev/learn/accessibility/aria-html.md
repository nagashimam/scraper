Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Accessibility](https://web.dev/learn/accessibility)

# ARIA and HTML Stay organized with collections Save and categorize content based on your preferences.

Most developers are familiar with the standard markup language of the modern web, [HyperText Markup Language (HTML)](/learn/html). However, you may be less familiar with [Accessible Rich Internet Applications (ARIA)](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) (formally called WAI-ARIA): what it is, how it is used, and when—and when _not_—to use it.

HTML and ARIA play important roles in making digital products accessible, especially when it comes to assistive technology (AT) such as screen readers. Both are used to convert content into an alternate format, such as Braille or Text-to-Speech (TTS).

Review a short history of ARIA, why it is important, and when and how best to use it.

## Introduction to ARIA

ARIA was first developed in 2008 by the [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/) group—a subset of the overarching World Wide Web Consortium (W3C), which governs and regulates the internet.

ARIA is not a true programming language but a set of attributes you can add to HTML elements to increase their accessibility. These attributes communicate role, state, and property to assistive technologies using accessibility APIs found in modern browsers. This communication happens through the accessibility tree.

> "[WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/), the Accessible Rich Internet Applications Suite, defines a way to make web content and web applications more accessible to people with disabilities. It especially helps with dynamic content and advanced user interface controls developed with HTML, JavaScript, and related technologies."
> 
> [The WAI group](https://www.w3.org/WAI/)

### The accessibility tree

ARIA modifies incorrect or incomplete code to create a better experience for those using AT by changing, exposing, and augmenting parts of the accessibility tree.

The accessibility tree is created by the browser and based on the standard Document Object Model (DOM) tree. Like the DOM tree, the accessibility tree contains objects representing all the markup elements, attributes, and text nodes. The accessibility tree is also used by platform-specific accessibility APIs to provide a representation that assistive technologies can understand.

![The ARIA augmented accessibility tree.](/static/learn/accessibility/aria-html/image/the-aria-augmented-access-70b111217be0f.jpg)

ARIA on its own doesn't change an element's functionality or visual appearance. That means only AT users will notice differences between a digital product with ARIA and one without it. That also means that developers alone are responsible for making the appropriate code and styling changes to make an element as accessible as possible.

The three main features of ARIA are roles, properties, and states/values.

_Roles_ define what an element is or does on the page or app.

```
<div role="button">Self-destruct</div>
```

_Properties_ express characteristics or relationships to an object.

```
<div role="button" aria-describedby="more-info">Self-destruct</div>

<div id="more-info">This page will self-destruct in 10 seconds.</div>
```

_States_ and _values_ define the current conditions or data values associated with the element.

```
<div role="button" aria-describedby="more-info" aria-pressed="false">
  Self-destruct
</div>

<div id="more-info">
  This page will self-destruct in 10 seconds.
</div>
```

While all three elements of ARIA can be used in one line of code, it's not required. Instead, layer ARIA roles, properties, and states or values until you've accomplished your final accessibility goal. Correctly incorporating ARIA into your codebase ensures that AT users will have all the information they need to use your website, app, or other digital product successfully and equitably.

Recently, Chrome DevTools has created a way to [see the full accessibility tree](https://developer.chrome.com/blog/full-accessibility-tree) making it easier for developers to understand how their code impacts accessibility.

## When to use ARIA

In 2014, the W3C officially published the HTML5 recommendation. With it came some big changes, including the addition of landmark elements such as `<main>`, `<header>`, `<footer>`, `<aside>`, `<nav>`, and attributes like `hidden` and `required`. With these new HTML5 elements and attributes, coupled with increased browser support, certain parts of ARIA are now less critical.

When the browser supports an HTML tag with an implicit role with an ARIA equivalent, there is usually no need to add ARIA to the element. However, ARIA still includes many roles, states, and properties that aren't available in any version of HTML. Those attributes remain useful for now.

This brings us to the ultimate question: When should you use ARIA? Thankfully the WAI group has developed the [five rules of ARIA](https://www.w3.org/TR/using-aria/) to help you decide how to make elements accessible.

### Rule 1: Don't use ARIA

Yes, you read that right. Adding ARIA to an element does not inherently make it more accessible. The [WebAIM Million annual accessibility report](https://webaim.org/projects/million/) found that home pages with ARIA present averaged 70% more detected errors than those without ARIA, primarily due to the improper implementation of the ARIA attributes.

There are exceptions to this rule. ARIA is required when an HTML element doesn't have accessibility support. This could be because the design doesn't allow for a specific HTML element or the wanted feature or behavior isn't available in HTML. However, these situations should be scarce.

Don't: Assign a role.

<a role="button">Submit</a>

Do: Use the semantic element.

<button>Submit</button>

When in doubt, use [semantic HTML elements](/learn/html/semantic-html).

### Rule 2: Don't add (unnecessary) ARIA to HTML

In most circumstances, HTML elements work well as-is and don't need additional ARIA added to them. In fact, developers using ARIA often have to add additional code to make the elements functional in the case of interactive elements.

Don't: Assign a misleading role.

<h2 role="tab">Heading tab</h2>

Do: Assign roles correctly.

<div role="tab"><h2>Heading tab</h2></div>

Do less work and have better-performing code when you use HTML elements as intended.

### Rule 3: Always support keyboard navigation

All interactive (not disabled) ARIA controls must be keyboard accessible. You can add tabindex= "0" to any element that needs a focus that doesn't normally receive keyboard focus. Avoid [using tab indexes with positive integers](https://www.scottohara.me/blog/2019/05/25/tabindex.html) whenever possible to prevent potential keyboard focus order issues.

Don't: Add a tabindex.

<span role="button" tabindex="1">Submit</span>

Do: Set the tabindex to \`0\`.

<span role="button" tabindex="0">Submit</span>

_Of course, if you can, use a real `<button>` element in this case._

**Caution:** Remember, people with and without visual impairments use keyboard navigation. Don't add unnecessary tab stops to headings and paragraphs, as these can add additional challenges for some users who navigate by keyboard alone.

### Rule 4: Don't hide focusable elements

Don't add `role= "presentation"` or `aria-hidden= "true"` to elements that need to have focus—including elements with a `tabindex= "0"`. When you add these roles and states to elements, it sends a message to the AT that these elements are not important and to skip over them. This can lead to confusion or disrupt users attempting to interact with an element.

Don't: Hide focusable elements

<div aria-hidden="true">
  <button>Submit</button>
</div>

Do: Expose focusable elements

<div>
  <button>Submit</button>
</div>

### Rule 5: Use accessible names for interactive elements

The purpose of an interactive element needs to be conveyed to a user before they know how to interact with it. Ensure that all elements have an [accessible name](https://www.w3.org/TR/accname-1.1/) for people using AT devices.

Accessible names can be the content surrounded by an element (in the case of an `<a>`), alternative text, or a label.

For each of the following code samples, the accessible name is "Red leather boots."

```
<!-- A plain link with text between the link tags. -->
<a href="shoes.html">Red leather boots</a>

<!-- A linked image, where the image has alt text. -->
<a href="shoes.html"><img src="shoes.png" alt="Red leather boots"></a>

<!-- A checkbox input with a label. -->
<input type="checkbox" id="shoes">
<label for="shoes">Red leather boots</label>
```

There are many ways to check an element's accessible name, including inspecting the accessibility tree using [Chrome DevTools](https://developer.chrome.com/blog/full-accessibility-tree) or testing it with a screen reader.

**Tip:** Read more about screen reader testing in the [Assistive Technology module](/learn/accessibility/test-assistive-technology).

## ARIA in HTML

While using HTML elements on their own is best practice, ARIA elements can be added in certain situations. For example, you may pair ARIA with HTML in patterns that need a higher level of AT support because of environmental constraints or as a fall-back method for HTML elements that aren't fully supported by all browsers.

Of course, there are recommendations for implementing [ARIA in HTML](https://www.w3.org/TR/html-aria/). Most importantly: don't override default HTML roles, reduce redundancy, and be aware of unintended side effects.

Take a look at some examples.

Don't: Assign the wrong role.

<a role="heading">Read more</a>

Do: Use the correct role and an extra link description.

<a aria-label="Read more about some awesome article title">Read More</a>

* * *

Don't: Add a redundant role.

<ul role="list">...</ul>

Do: Reduce redundancy.

<ul>...</ul>

* * *

Don't: Miss potential side effects.

<details>
  <summary role="button">more information</summary>
  ...
</details>

Do: Address side effects.

<details>
  <summary>more information</summary>
  ...
</details>

**Note:** One place in particular where ARIA can be useful is in forms. Check out the [Learn Forms accessibility module](/learn/forms/accessibility).

## Complexities of ARIA

ARIA is complex, and you should always use caution when using it. While the code examples in this lesson are fairly straightforward, creating accessible custom patterns can quickly get complicated.

There are many things to pay attention to, including but not limited to: keyboard interactions, touch interfaces, AT/browser support, translation needs, environmental constraints, legacy code, and user preferences. A little bit of coding knowledge can be detrimental—or just plain annoying—if used incorrectly.

Those warnings aside, digital accessibility is not an all-or-nothing situation—it's a spectrum that allows for some gray areas like this. Multiple coding solutions can be seen as "correct," depending on the situation. What is important is that you keep learning, testing, and trying to make our digital world more open to all.

## Check your understanding

Test your knowledge of ARIA and HTML

Which of the following is the best practice for building an accessible button?

`<div id="saveChanges" aria-role="button" aria-pressed="false" tabindex="0">Go to shop</div>`

Not quite. ARIA shouldn't be used when a semantic HTML element is available.

`<a id="saveChanges" aria-label="Some awesome article title">Go to shop</a>`

Not quite. While you could style this link like a button with CSS, it's not the best practice.

`<button id="saveChanges" type="button">Go to shop</button>`

Great job! Use the correct semantic HTML as well as the type to create a button.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2022-09-30 UTC.