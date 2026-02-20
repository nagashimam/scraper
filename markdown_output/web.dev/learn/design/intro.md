Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Responsive Design](https://web.dev/learn/design)

# Introduction Stay organized with collections Save and categorize content based on your preferences.

Right from the start, the World Wide Web was designed to be independent of your choice of hardware and operating system. As long as you can connect to the internet, the World Wide Web is accessible to you.

In the early days of the web, most people were using desktop computers. These days the web is available on desktops, laptops, tablets, foldable phones, fridges, and cars. People rightly expect that websites look good no matter what device they use. Responsive design makes this possible.

Responsive design isn't the first approach to designing websites. In the years before responsive design, web designers and developers tried many different techniques.

## Early design choices

Developers built websites that were either [fixed-width](#fixed-width_design) or [liquid layouts](#liquid_layouts).

### Fixed-width design

In the early 1990s, when the web was first becoming popular, most monitors had screen dimensions of 640 pixels wide by 480 pixels tall. These were convex cathode ray tubes, unlike the flat liquid crystal displays we have now.

![The Microsoft website with two simple columns of text plus a navbar.](/static/learn/design/intro/image/the-microsoft-website-tw-ce50cc6f6c5b2.png)

The Microsoft website in the late 90s designed for a width of 640 pixels. Screenshot from [archive.org](https://archive.org)

In the formative days of early web design, it was a safe bet to design web pages with a width of 640 pixels. But while other technologies like phones and cameras were miniaturizing, screens were getting bigger (and eventually, flatter). Before long, most screens had dimensions of 800 by 600 pixels. Web designs changed accordingly. Designers and developers started assuming that 800 pixels was a safe default.

![The Microsoft website used a three-column, mostly text-based design.](/static/learn/design/intro/image/the-microsoft-website-usi-f1a8277511b8f.png)

The Microsoft website in the early 2000s designed for a width of 800 pixels. Screenshot from [archive.org](https://archive.org)

Then the screens got bigger again. 1024 by 768 became the default. It felt like an arms race between web designers and hardware manufacturers.

​​

![The Microsoft website with a more complex design using images as well as text.](/static/learn/design/intro/image/the-microsoft-website-a-3434dfccbd5a4.png)

The Microsoft website in the mid 2000s designed for a width of 1024 pixels. Screenshot from [archive.org](https://archive.org)

Whether it was 640, 800, or 1024 pixels, choosing one specific width to design for was called fixed-width design.

If you specify a fixed width for your layout, then your layout only looks good at that specific width. If a visitor to your site has a wider screen than the width you have chosen, then there's wasted space on the screen. You can center the content of your pages to distribute that space more evenly (instead of having empty space on one side) but you still wouldn't be taking full advantage of the available space.

![A narrow layour with a lot of white space around it.](/static/learn/design/intro/image/a-narrow-layour-a-lot-w-c2dedf8182187.png)

The Yahoo website from the early 2000s as experienced in a browser that's wider than the site's 800 pixel wide design. Screenshot from [archive.org](https://archive.org)

Similarly, if a visitor arrives with a narrower screen than the width you've chosen, then your content won't fit horizontally. The browser generates a crawlbar—the horizontal equivalent of a scrollbar—and the user has to move the whole page left and right to see all the content.

![A website that appears cut-off to the right due to being too wide for the viewport.](/static/learn/design/intro/image/a-website-appears-cut-of-472624a1b5e38.png)

The Yahoo website from the early 2000s as experienced in a browser that's narrower than the site's 800 pixel wide design. Screenshot from [archive.org](https://archive.org)

### Liquid layouts

While the majority of designers used fixed-width layouts, some chose to make their layouts flexible. Instead of using fixed widths for your layouts you could make a flexible layout using percentages for your column widths. These designs work in more situations than a fixed-width layout that only looks right at one specific size.

These were called liquid layouts. But while a liquid layout can look good across a wide range of widths, it worsens at the extremes. On a wide screen the layout looks stretched. On a narrow screen the layout looks squashed. Both scenarios aren't ideal.

![A layout that is squashed into a narrow window.](/static/learn/design/intro/image/a-layout-is-squashed-a-957ff07c0576c.png)

Wikipedia's liquid layout from the mid 2000s as experienced in a narrow browser window. Screenshot from [archive.org](https://archive.org)

​​

![A layout stretched horizontally with very long line lengths.](/static/learn/design/intro/image/a-layout-stretched-horizo-7621b8dda3062.png)

Wikipedia's liquid layout from the mid 2000s as experienced in a wide browser window. Screenshot from [archive.org](https://archive.org)

You can mitigate these problems by using `min-width` and `max-width` for your layout. But then at any size below the minimum width or above the maximum width you've got the same issues you'd have with a fixed-width layout. On a wide screen there'd be unused space going to waste. On a narrow screen, the user would have to move the whole page left and right to see everything.

Open [the liquid layout example](https://codepen.io/web-dot-dev/pen/YzxEzpE) in a new browser window to see how changing the size of the window stretches the design.

The word _liquid_ is just one of the terms used to describe this kind of layout. These kinds of designs were also called fluid layouts or flexible layouts. The terminology was as fluid as the technique.

## Build for different screen sizes

In the 21st century, the web continued to get bigger and bigger. So did monitors. But new screens arrived that were smaller than any desktop device. With the arrival of mobile phones with fully-featured web browsers, designers faced a dilemma. How could they ensure their designs would look good on a desktop computer and a mobile phone? They needed a way of styling their content for screens as small as 240 pixels wide and as large as thousands of pixels wide.

### Separate sites

One option is to make a separate subdomain for mobile visitors. But then you have to maintain two separate codebases and designs. And in order to redirect visitors on mobile devices, you'd need to do [user-agent sniffing](https://en.wikipedia.org/wiki/Browser_sniffing), which can be unreliable and spoofed. Chrome has [reduced the user-agent string](https://developers.google.com/privacy-sandbox/protections/user-agent) to prevent such passive fingerprinting. Also, there's no clear line between mobile and not-mobile. Which site do you send tablet devices to?

### Adaptive layouts

Instead of having separate sites on different subdomains, you could have a single site with two or three fixed-width layouts.

When media queries first arrived in CSS, they opened the door to making layouts more flexible. But many developers were still most comfortable making fixed-width layouts. One technique involved switching between a handful of fixed-width layouts at specified widths. Some people call this an adaptive design.

Adaptive design allowed designers to provide layouts that looked good at a few different sizes, but the design never looked quite right when viewed between those sizes. The problem of excess space persisted although it wasn't as bad as in a fixed-width layout.

Using CSS media queries, you can give people the layout that's closest to their browser width. But given the variety of device sizes, chances are the layout looks less than perfect for most people.

Open [the adaptive layout example](https://codepen.io/web-dot-dev/pen/oNeoNYw) in a new browser window to see how changing the size of the window causes the design to jump between layouts.

### Responsive web design

If adaptive layouts are a mashup of media queries and fixed-width layouts, responsive web design is a mashup of media queries and liquid layouts.

Open [the responsive design example](https://codepen.io/web-dot-dev/pen/JjyOjbE) in a new browser window to see how changing the size of the window causes the design to fluidly change layout.

The term was coined by [Ethan Marcotte](https://ethanmarcotte.com/) in [an article in A List Apart](https://alistapart.com/article/responsive-web-design/) in 2010.

Ethan defined three criteria for responsive design:

1.  Fluid grids
2.  Fluid media
3.  Media queries

The layout and images of a responsive site would look good on any device. But there was one problem.

### A `meta` element for `viewport`

Browsers on mobile phones had to deal with websites that were designed with fixed-width layouts for wider screens. By default mobile browsers assumed that 980 pixels was the width that people were designing for (and they weren't wrong). So even if you used a liquid layout, the browser would apply a width of 980 pixels and then scale the rendered web page down to the actual width of the screen.

If you use responsive design, you need to tell the browser not to do that scaling. You can do that with a `meta` element in the `head` of the web page:

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

There are two values, separated by commas. The first one is `width=device-width`. This tells the browser to assume the width of the website is the same as the width of the device (instead of assuming the width of the website is 980 pixels). The second value is `initial-scale=1`. This tells the browser how much or how little scaling to do. With a responsive design, you don't want the browser to do any scaling at all.

![Images of two mobile phones containing text, one appearing zoomed out due to not having the meta tag in place.](/static/learn/design/intro/image/images-two-mobile-phones-6d335a19e1c9c.png)

The phone on the left shows how the layout looks before the meta tag is in place, when compared to the layout on the right.

With that `meta` element in place, your web pages are ready to be responsive.

## Modern responsive design

Now, we can make websites that are responsive in ways far beyond viewport sizes. Media features give developers access to user preferences and enable customized experiences. Container queries enable components to own their own responsive information. The `picture` element empowers designers to make art-direction decisions based on screen ratios.

### Check your understanding

Test your knowledge of responsive web design

In 2021, it's a safe bet to design web pages at a fixed width?

true

It's unsafe to bet on fixed width design in 2021.

false

🎉 Correct! The number of possible screen sizes is too great to assume visitors will come from one size.

Liquid layouts generally struggle at which kind of screen sizes?

Narrow screens

🎉 Correct! The extreme size of a narrow display can make liquid layouts appear squished.

Average screens

Try again. Liquid layouts do well on average sized screens.

Wide screens

🎉 The extreme size of a wide, or even ultrawide, display can make liquid layouts appear stretches out to uncomfortable reading lengths.

Short screens

Try again. Short screens generally don't struggle to support liquid layouts.

Tall screens

Try again. Tall screens generally don't struggle to support liquid layouts.

All screens

Try again. Liquid layouts are a great choice for many screen sizes.

The original three criteria for responsive design are?

Fluid typography

Try again! Fluid typography was not one of the initial criteria.

Fluid grids

🎉 Correct!

Adaptive grids

Try again! An adaptive grid changes based on set viewport sizes.

Fluid media

🎉 Correct!

Fixed width design

Try again! Fixed width designs refers to a design with a set, unresponsive width.

Media Queries

🎉 Correct!

Responsive design is an exciting, growing world of possibilities. In the rest of this course, you'll learn about these technologies and how to use them to create beautiful, responsive websites for everyone.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2021-11-03 UTC.