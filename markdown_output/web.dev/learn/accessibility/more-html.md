*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Accessibility](https://web.dev/learn/accessibility)

# The Document Stay organized with collections Save and categorize content based on your preferences.

Along with structure, there are many supporting HTML elements to consider when building and designing for digital accessibility. Throughout the Learn Accessibility course, we cover a lot of elements.

This module focuses on very specific elements that don't quite fit into any of the other modules but are useful to understand.

**Note:** The [Learn HTML course](/learn/html) covers the basics of HTML and [semantic structure](/learn/html/semantic-html) in great detail. As such, this module builds off of that material and is focused specifically on digital accessibility. Also, be sure to review the [ARIA and HTML module](/learn/accessibility/aria-html) in this course.

## Page title

The HTML [`<title>`](https://developer.mozilla.org/docs/Web/HTML/Element/title) element defines the content of the page or screen a user is about to experience. It's found in the [`<head>`](https://developer.mozilla.org/docs/Web/HTML/Element/head) section of an HTML document and is equivalent to the `<h1>` or main topic of the page. The title content is displayed in the browser tab and helps users understand which page they are visiting, but it is not displayed on the website or app itself.

In a [single-page app](https://developer.mozilla.org/docs/Glossary/SPA) (SPA), the `<title>` is handled in a slightly different way, as users don't navigate between pages as they do on multi-page websites. For SPAs, the value of the [`document.title`](https://developer.mozilla.org/docs/Web/API/Document/title) property can be added manually or by a helper package, depending on the JavaScript framework. Announcing the [updated page titles](https://hidde.blog/accessible-page-titles-in-a-single-page-app/) to a screen reader user may take some additional work.

Descriptive page titles are good for both users and [search engine optimization (SEO)](https://developer.mozilla.org/docs/Web/HTML/Element/title#page_titles_and_seo)—but don't go overboard and add lots of keywords. Since the title is the first thing announced when an AT user visits a page, it must be accurate, unique, and descriptive, but also concise.

When writing page titles, it is also best practice to "front load" the interior page or important content first, then add any preceding pages or information after. This way, AT users don't have to sit through the information they have already heard.

Don't

<title>The Food Channel | Outrageous Pumpkins | Season 3 </title>

Do

<title>Season 3 | Outrageous Pumpkins | The Food Channel</title>

**Key Point:** Search engines typically display only the first 55–60 characters of a page title, so be sure to limit your total page title characters.

## Language

### Page language

The page language attribute ([`lang`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang)) sets the default language for the entire page. This attribute is added to the [`<html>`](https://developer.mozilla.org/docs/Web/HTML/Element/html) tag. A valid language attribute should be added to every page as it signals the AT to which language it should use.

It's recommended that you use two-character [ISO language codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) for greater AT coverage, as many of them do not support [extended language codes](https://webaim.org/techniques/language/).

When a language attribute is completely missing, the AT will default to the user's programmed language. For example, if an AT was set to Spanish, but a user visited an English website or app, the AT would try to read the English text with Spanish accents and cadence. This combination results in an unusable digital product and a frustrated user.

Don't

<html>...</html>

Do

<html lang="en">...</html>

The lang attribute can only have one language associated with it. This means the `<html>` attribute can only have one language, even if there are multiple languages on the page. Set `lang` to the primary language of the page.

Don't

<html lang="ar,en,fr,pt">...</html>

Multiple languages are not supported.

Do

<html lang="ar">...</html>

Set only the page's primary language. In this case, the language is Arabic.

### Section language

You can also use the language attribute ([lang](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang)) for language switches in the content itself. The same basic rules apply as the full-page language attribute, except you add it to the appropriate in-page element instead of on the `<html>` tag.

Remember that the language you add to the `<html>` element cascades down to all the contained elements, so always set the primary language of the page top-level `lang` attribute first.

For any in-page elements written in a different language, add that `lang` attribute to the appropriate wrapper element. This will override the top-level language setting until that element is closed.

Don't

<html lang="en">
  <body>...
    <div>
      <p>While traveling in Estonia this summer, I often asked,
        "Kas sa räägid inglise keelt?" when I met someone new.</p>
    </div>
  </body>
</html>

Do

<html lang="en">
  <body>...
    <div>
      <p>While traveling in Estonia this summer, I often asked,
        <span lang="et">"Kas sa räägid inglise keelt?"</span>
        when I met someone new.</p>
    </div>
  </body>
</html>

## iFrames

The iFrame element ([`<iframe>`](https://developer.mozilla.org/docs/Web/HTML/Element/iframe)) is used to host another HTML page or a third party's content within the page. It essentially puts another webpage within the parent page. iFrames are commonly used for advertisements, embedded videos, web analytics, and interactive content.

To make your `<iframe>` accessible, there are a couple of aspects to consider. First, each `<iframe>` with distinct content should include a title element inside the parent tag. This title supplies AT users with more information about the content inside the `<iframe>`.

Second, as a best practice, it is good to set the scrolling to "auto" or "yes" in the `<iframe>` tag settings. This allows people with low vision to be able to scroll into content within the `<iframe>` that they might not otherwise be able to see. Ideally, the `<iframe>` container would also be flexible in its height and width.

Don't

<iframe src="https://www.youtube.com/embed/3obixhGZ5ds"></iframe>

Do

<iframe title="Google Pixel - Lizzo in Real Tone"
  src="https://www.youtube.com/embed/3obixhGZ5ds"
  scrolling="auto">
</iframe>

## Check your understanding

Test your knowledge of document accessibility.

Your site is a multi-language online textbook, where multiple languages are shown on one page. What's the best way to tell assistive technology the language of the copy?

Don't worry about it, the AT can automatically read each language.

While some AT may have language detection skills, you can't guarantee the AT will guess correctly.

Include all languages in the `<html>` element. For example `<html lang="en,lt,pl,pt">`

The `lang` attribute can only have one language associated with it.

Set a primary `lang` for the `<html>`, and additional languages on any element which has content in a different language.

The AT will primarily rely on the `<html>` language attribute to read the document. If you have multi-language text, make sure to add a `lang` attribute to the corresponding element (such as a section or paragraph) with the correct two letter ISO code.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2022-10-31 UTC.