Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# What to test and your approach Stay organized with collections Save and categorize content based on your preferences.

What to test, as opposed to what testing _is_, is an important question for all teams. Testing is a means to an end, and choosing how to prioritize testing different parts of your codebase can be difficult.

The best way to prioritize is based on your codebase and your team's goals. It's important to remember, though, that while it takes little time and bandwidth to write lots of small tests (at the bottom of the testing pyramid, such as unit tests) that have a lot of code coverage, they don't necessarily reduce overall risk for your project.

![Unit test successful: the
drawer opens. Integration test unsuccessful: the drawer bumps into the handle
of another drawer and can't keep opening.](/static/learn/testing/images/drawers.jpg)

An example of where unit tests on their own are unhelpful.

You can choose what to test first by thinking about the primary use cases of your application, website or library. This could be by writing component tests over critical parts of your site, the core components that underpin your user's experience. For example, developers of a site that allows users to upload and manage timeseries data should imagine and test the different ways a user might perform those tasks.

Another approach to prioritization involves gaining the most information. If you have a "dangerous", legacy, or badly-written load-bearing part of your codebase that no one on your team enjoys working on, it can be useful to build tests around it to make its behavior more consistent before you either ignore it further, or refactor it to fix it. Think of this like scaffolding for a building that has already been condemned, but still houses your data center.

### Dimensionality

We've introduced the concept of a testing pyramid, or another testing shape, but these tend to only present a single dimension of testing: a line that goes from small scope, simple unit tests to complex, wide-ranging tests—unit tests versus integration tests versus end-to-end tests.

However, some of the long list of possible test types don't represent a level of complexity, but instead represent testing goals or techniques. For example, smoke tests are a different category of test which can themselves be unit, end-to-end, or other tests, but are intended to give testers overall confidence that the project being tested is in a valid state. Visual testing can also be useful applied to a small component, or on your site as a whole.

Your codebase will have unique requirements. It could be, for example, far more important in your codebase to align on a single _feature_, writing different types of tests to ensure that it works correctly. A new feature that needs testing is rarely a single component, function or _approach_, and its impact on your project might be distributed widely and at different scales.

Your testing priorities might also depend on your business needs. Highly technical systems might require complex unit testing to confirm that a unique algorithm performs correctly, whereas highly interactive tools are likely to focus on visual testing or end-to-end testing to confirm that complex touch inputs elicit the correct response.

### Your approach to testing

Try to focus on testing your codebase's use cases, regardless of their scale. Imagine how the user might use any part of your project—this might represent a single component, or a lower-level function, or a high-level end-to-end use case. (This can also reveal deficiencies in your abstractions at any scale, if you find that your test can't interact neatly with the code _under test_.)

It's important that each test case has a clearly defined goal. Large "catch-all" tests can be unwieldy, just like in your non-test code.

### An aside on test-driven development

Test-driven development (TDD) is a unique approach to testing—orthogonal to scale or types—in that it involves writing tests that are intended to fail, at least at first. This can apply to both manual and automated testing: you describe the goals you'd like to achieve, find out what's missing in your current solution or code, and use the failing test as guidance toward a solution.

Of course, it's not useful to test every possible scenario in a hypothetical application or component even before you start building it. TDD has its place, and it can be helpful as your codebase gets more complex.

TDD is also good practice when fixing bugs. If you can codify the reproduction case for a bug, this can be put into an automated test that will initially fail. When you've fixed the bug, the test passes, letting you determine whether the fix was successful without manual confirmation.

![A flowchart for test-
driven development.](/static/learn/testing/images/tdd_flowchart.png)

Approaching your code with a test-driven development in mind is one part of the philosophy of testing

.

### Opaque versus clear box

This refers to the way you test any part of your system. If it's opaque, you can't see inside, for example, when using a class's public interface, rather than inspecting its internals.

Unless you have a specific reason not to, it's better to start with opaque box testing so you can design tests based on how your components are used, and not get distracted by how their internals are functioning. If you only rely on a code path's "public" interface (not necessarily public to your users, but maybe to other parts of your code), you're free to refactor and improve that code knowing that your test will detect any changes.

One way to convert your "clear box" code to be more opaque is to introduce configurable elements like abstractions for the code's dependencies, or callbacks to observe state, rather than that state being tightly coupled to other systems. This makes your code more decoupled and lets you provide 'test' versions. Alternatively, you can mock out where your code interacts with other systems.

### Resources

*   [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
*   [To test or not to test, a technical perspective](/articles/ta-what-to-test)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.