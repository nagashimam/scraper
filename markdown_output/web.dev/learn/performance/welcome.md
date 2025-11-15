*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Performance](https://web.dev/learn/performance)

# Welcome to Learn Performance! Stay organized with collections Save and categorize content based on your preferences.

Web performance is a crucial aspect of web development that focuses on the speed at which pages load, as well as how responsive they are to user input. When you optimize your website for performance, you're giving users a better experience. Better user experiences go a long way toward helping you achieve the goals you had in mind for your website.

Web performance may seem like a niche topic, but it is, in fact, both broad and quite deep. Given its depth as a subject area, it's vital that a course on web performance is both approachable, yet informative. The initial release of this course focuses on web performance fundamentals that beginners should find informative.

Each module in this series aims to have—where practically possible—a set of demos that supplement the content of each module and demonstrate key performance concepts. Given that this course is an initial offering, additional modules are currently being planned for publication in the coming months.

Here's what the initial course offering for Learn Performance covers:

### [Why speed matters](/learn/performance/why-speed-matters)

Before you can get started with learning performance, you first have to understand its role in the user experience, and how it can result in better outcomes for users. This course starts off with a brief introduction into these topics, giving vital context as to why it's important to learn performance.

### [General HTML performance considerations](/learn/performance/general-html-performance)

Every website starts with a request for an HTML document, that request has a big role to play in how fast your website loads. This module covers important concepts such as HTML caching, parser blocking, render blocking, and more, so you can ensure the first request for your website's HTML is off on the right foot.

### [Understanding the critical path](/learn/performance/understanding-the-critical-path)

The critical rendering path is a concept in web performance that deals with how quickly the initial rendering of a page appears in the browser. This module goes into the theory behind the critical rendering path, covering concepts such as render-blocking and parser-blocking resources, and how they play a key role in how quickly a page appears in the browser.

### [Optimize resource loading](/learn/performance/optimize-resource-loading)

As a page loads, many resources are referenced within its HTML that provide a page with its appearance and layout through CSS, as well as its interactivity through JavaScript. In this module, a number of important concepts related to these resources and how they affect a page's load time are covered.

### [Assist the browser with resource hints](/learn/performance/resource-hints)

Resource hints are a collection of features available in HTML that can assist the browser in loading resources earlier and possibly even with higher resource priority. In this module, a few resource hints that can help your pages load even faster are covered.

### [Image performance](/learn/performance/image-performance)

Images represent a large portion of the data transferred on many web pages today. This module covers how to optimize images, as well as serve them efficiently so that you minimize wasted bytes, regardless of the user's device.

### [Video performance](/learn/performance/video-performance)

Video is a media type used often on web pages—but knowing how to serve them efficiently is one aspect of performance you shouldn't overlook. This module covers some key techniques for embedding videos in such a way that your website stays fast, as well adjacent performance considerations that can arise with their use.

### [Optimize web fonts](/learn/performance/optimize-web-fonts)

Web fonts are a commonly used resource on the web—and rightfully so—as they add to the design of a website in ways that other resources can't. Even so, web fonts still have a performance cost. In this module, a number of performance considerations and techniques around web fonts are explored.

### [Code-split JavaScript](/learn/performance/code-split-javascript)

Some resources are not crucial to a web page's initial load. JavaScript is one such resource that can be deferred until the time of need through a technique known as code splitting. By doing so, you can improve performance by lowering bandwidth and CPU contention—a critical consideration for improving both initial page load speed and input responsiveness during startup.

### [Lazy load images and `<iframe>` elements](/learn/performance/lazy-load-images-and-iframe-elements)

Images and `<iframe>` elements can consume significant bandwidth and CPU processing time. However, not all images and `<iframe>` elements need to be loaded during the initial page load, and can be deferred to a later time in which the user is likeliest to see them. This technique is known as _lazy loading_. In this module, lazy loading images and `<iframe>` elements is explained so you can get your pages to load faster and only consume bandwidth and processing time only when needed.

### [Prefetching, prerendering, and service worker precaching](/learn/performance/prefetching-prerendering-precaching)

While much of performance deals with what you can do to optimize and eliminate unnecessary resources, it may seem a bit paradoxical to suggest that some resources should be loaded before they're needed. However, there are some cases in which it _might_ be appropriate to load certain resources ahead of time. In this module, this aspect of performance is explored, as prefetching, prerendering, and service worker precaching are discussed.

### [An overview of web workers](/learn/performance/web-worker-overview)

Much of what the user sees in the browser occurs on a single thread known as the _main thread_. However, there are opportunities where you can start up new threads to do computationally expensive work so that the main thread can accommodate important user-facing tasks. The API that does this is known as the Web Worker API, and in this module, the basics of it are covered.

### [A concrete web worker use case](/learn/performance/web-worker-demo)

Now that you have a basic understanding of web workers and their capabilities and limitations, it's time to take a look at a concrete use case for a web worker. In this demo, a web worker is used to fetch a JPEG file, extract its metadata, and send it back to the main thread so the user can see it in the browser.

Ready to get started with learning web performance? Get things kicked off by first reading [Why speed matters](/learn/performance/why-speed-matters).

**Note:** The initial contents of this course were written chiefly by [Kevin Farrugia](https://imkev.dev/), with additional content by [Barry Pollard](https://twitter.com/tunetheweb). It was edited and produced by [Jeremy Wagner](https://jlwagner.net/), with additional review by [Rachel Andrew](https://rachelandrew.co.uk/) and Barry Pollard.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2023-11-27 UTC.