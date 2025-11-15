*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# The testing environment Stay organized with collections Save and categorize content based on your preferences.

As introduced in [What testing is](/learn/testing/get-started/what-testing-is), tests in JavaScript are fundamentally just code that we confirm runs successfully, that is, without throwing an `Error`. However, one of the ways this definition is an oversimplification is that it doesn't consider _where_ we run the code, its _testing environment_.

The testing environment can broadly be thought of as two components: the runtime environment you use to run your test (such as Node, or the browser) as well as the APIs available to you.

## The runtime environment

Runtimes like Node, or similar tools like Deno or Bun, are aimed at supporting server-side or general-purpose JS code. Their environments don't include APIs you might expect in a browser, such as creating and working with the DOM and HTML elements, nor any concept of a visual component or render target (that is, not _just_ elements, but rendering those elements visually with CSS to a viewport).

As such, these general-purpose runtimes will fail if you try to, for example, render React elements so they can be tested, because there are no `document` or `window` objects available.

In the past, these runtimes also lacked common web-adjacent features like the built-in method `fetch`, or the `EventTarget` class, but more are being added over time. Some features missing in Node include classes such as `WebSocket`, which must be added with a polyfill library.

On the other hand, if you run your tests inside a browser, built-in APIs that you can expect from these runtimes might not be available without polyfilling or some extra work. A common gotcha is something like reading and writing files: it's just not possible to `import { fs } from 'node:'fs';` inside a browser and read a file this way as part of a test.

This "web" versus "backend" API problem is a bit out of scope of just testing, because it can be awkward to have a codebase with both server and client parts, but it ties into the idea of writing testable code, which we'll revisit throughout this course.

## Test algorithmic or business logic

Some of your code won't require either Node or browser imports to operate, and therefore, to test. This is something we'll touch on later in this course, but structuring your codebase such that its pure "[business logic](https://en.wikipedia.org/wiki/Business_logic)" is separate from rendering or Node-specific code can make it easier to test.

For a quick example, you might have a Node function that reads and writes a file from disk, modifying it in the process. By refactoring your function to accept functions that perform the read and write from disk, you've made it testable anywhere.

In this case, you can use any environment to test this code, in either a server-side runtime or the browser. In your test, you can provide helpers that store a virtual file in memory or return placeholder data. This kind of helper is fine to introduce in a test, because it's _not_ important to check, for example, that `fs.writeFileSync` works. Focus on your code and what makes it unique or risky.

## Emulate browser APIs

Many testing frameworks, such as Vitest, present you with an option [to emulate the browser's API environment](https://vitest.dev/guide/environment.html) without running a browser. Vitest internally uses a library called [JSDOM](https://www.npmjs.com/package/jsdom). This can be a good choice for simple component tests where the overhead of using a browser is high.

A common feature of any emulation library is that, although they can emulate a browser—for example, the DOM, elements, and cookies—they don't have a visual component. This means they'll provide an imperative way to work with HTML elements and other primitives, but you can't render the output to an image or a screen, or check an element's position in pixels on the page.

Again, this choice can be well-suited for _component testing_, where a component represents a React element, or a Web Component, or so on. These types of components typically create and interact with the DOM in a relatively small way, and an emulated browser can provide enough functionality to confirm the component works the way you intend. An upcoming section includes an example of a React component test with Vitest and JSDOM.

Emulating a browser is a well-established practice—JSDOM was released in 2014—but it will always differ from using a real browser. These differences can be obvious: for example, JSDOM doesn't include a layout engine, so there's no way to check the size of an element or test a complex gesture such as a swipe. The differences can also be _subtle_ and unknown, which is why it's best to keep your JSDOM-based tests concise, so you can 'timebox' the risk that any behavior deviates from the real thing.

## Control a real browser

To test your code as your users will experience it, using a real browser is the best choice. In practice, testing runtimes that support the browser will start and control instances of a real browser, even if they run 'start' inside Node.js.

Controlling a browser as part of a test means it will open just like it would for a user, allowing your test to control it by loading URLs, custom HTML and JS, or whatever is needed to perform your test. You can then write code to act as a user, such as by controlling the mouse, or typing input into input boxes.

When you're first writing these kinds of tests, the browser will be displayed as you run your code. This is useful for debugging, and for seeing how whatever's under test (such as a component or end-to-end experience) is performing. As you advance and automate these tests, you can run a browser in _headless_ mode, which hides the UI.

Modern tools like [WebdriverIO](https://webdriver.io/) or [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) can control all major browsers, and even run multiple instances at the same time. These browsers can run adjacent to the test runner (for example, on your own computer, or as part of a CI action), or be outsourced to external commercial services that will run them for you.

More established testing libraries (including Vitest and Jest) often have a browser mode, but because their origin is from Node.js, their browser modes are often "bolted on" and missing useful features. For example, Vitest can't mock module imports in the browser, which is a powerful primitive we use in the example on the next page.

## In practice

As your tests grow in complexity, it becomes more and more important to use a real browser.

*   For tests that use no or minimal features from the DOM, even features that are available in Node.js and similar runtimes, like `fetch` or `EventTarget`, the environment doesn't matter.
*   For small component tests, JSDOM can be suitable.
*   Larger tests—for example, _end-to-end tests_, which can simulate a user logging in and performing a core action—make sense to run completely in a real browser.

This section is heavy on theory and presents different viewpoints on where to run your tests. In practice, your codebase will often use many different approaches to different types of tests based on your needs and what the testing tools provide.

## Check your understanding

What features of the browser does the emulation layer jsdom \*not\* support?

The layout engine.

Because JSDOM isn't a visual tool, it can't be used to check an element's position on the page, its resolved CSS attributes, or any other parts of a website's layout.

WebSocket

JSDOM includes the WebSocket polyfill, so code that uses it will work.

`requestAnimationFrame`

With the \`pretendToBeVisual\` flag, jsdom will invoke the 'animation' callback at 60fps, even though nothing is actually drawn.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.