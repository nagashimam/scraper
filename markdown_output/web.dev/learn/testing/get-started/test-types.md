Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# Types of automated testing Stay organized with collections Save and categorize content based on your preferences.

The names given to different types of tests tend to have common themes across codebases, but they don't have particularly rigorous definitions. This course gives some guidelines on what each type of test means, but other resources might provide different definitions.

In the previous pages, there have been examples of both _unit tests_ and _component tests_ (in our example, referring to a React component). We can place both of these low on our testing pyramid (or other shape!), because they have low complexity and are quick to run, but might not have as much utility as a more complex _integration test_.

![Some examples of testing
strategy shapes: a pyramid, a cut diamond, an ice cream cone, a hexagon, and
a trophy.](/static/learn/testing/images/test-shapes.jpg)

Testing strategy comes in all shapes.

## Common types of tests

### Unit tests

Unit tests are the smallest in scope. They tend to be used to test small parts of code, or purely stateless code, in almost a mathematical way: if I provide your code with inputs X, Y, and Z, its output should be A, B and C.

Code with unit tests won't normally have external dependencies, such as fetching from a network or implicitly using any other functions or libraries. It's a tree node of your code that you can "cut out" and test on its own.

While unit tests tend to be quick to write and run, it's always possible that testing small units of code won't give useful information. Often, a code unit's lack of interaction with other code means you're better off testing at a higher level to reduce risk.

### Component tests

For web developers, the name "component" is overloaded, often meaning a user-visible component, such as a React component or a Web component. Its more general definition is a testable chunk of work, for example, a class with external dependencies. To be tested effectively, this component must have its dependencies mocked out or skipped.

Because modern web development practices are grounded in the concept of a component, component tests are a practical way to think about testing: for example, you might decide that each component needs a test. Component tests are also straightforward to follow up on in contexts where a single developer or small team claims clear ownership over a component. However, it can be difficult to mock out complex dependencies.

### Integration tests

These tend to test a small grouping of components, modules, subsystems, or other meaningful portions of your code together to ensure they work correctly. This is a very vague definition. For web developers, imagine that the code you're testing is not the real, production build of your site (or even close), but still connects various related components of your system.

This may even include "real" dependencies, such as an external database in test mode, rather than a pure mock. For example, rather than saying that `query()` will always return the same two entries, your integration test can confirm that a test database has _something_ in it. The data itself is less important, but you're now testing that a database can be connected to and queried successfully.

It's possible to write relatively simple integration tests with wide-ranging implications that can be checked using assertions, because a single action connected to various components can cause a series of measurable effects. Because of this, integration tests can effectively demonstrate that your complex system will run as intended. However, they can be hard to write and maintain, and they can introduce needless complexity. For example, writing a `FakeUserService` for an integration test adds the requirement that both it and the `RealUserService` have to implement a `UserService`.

### Smoke tests

These are tests that should complete very quickly and determine whether your codebase is in a sensible state. In practice, this largely means performing simple tests on code that has wide-ranging effects on your experience.

For example, in a large signed-in web app, this could be ensuring that the login and authentication system works, because without it the app is unusable and further testing is irrelevant.

Smoke tests can be a good candidate to run under your package.json's `test` script in a large codebase. Manual testing can also act as a kind of smoke test.

### Regression tests

Regression testing is a type of smoke testing that ensures that existing features continue working, or that old bugs aren't reintroduced, after a new release or other feature development.

This ties in with the concept of test-driven development (TDD). Test cases written to explicitly trigger a bug, and later used to ensure the bug is fixed, count as regression test cases, because their existence should prevent that same bug from returning.

Regression testing can, however, be a problem without a great solution. It's a term often cited by business needs: as features are developed, it's important that old ones don't break. A well-tested codebase should be able to maintain this, but real codebases don't always live up to that ideal. This will be covered more in future sections.

### Visual tests

Visual testing involves taking screenshots or videos of a website's state in order to check a known good state (such as a previous screenshot) against the current test run. By its nature, it requires that a real browser is run so that it can render HTML, CSS, and other parts of the website.

Rather than visually testing _end-to-end tests_ that run your whole codebase, it can be useful to build HTML "harnesses" that render only certain components, especially in different screen sizes to trigger responsive UIs. This is more complex than purely using JSDOM or similar frameworks.

Visual tests failing can be a good signal of other kinds of breakage. However, complex UIs can fail visual tests for reasons unrelated to the features you're trying to test, such as other new features changing the appearance of the UI, or even a new OS version rendering emoji differently from earlier versions.

Tests that need updating every time the code they test changes tend to be too prescriptive because they don't provide useful feedback—their failure is almost _expected_. And, visual tests tend to fall into this trap. We'll cover this more in our discussion of the philosophy of testing.

### End-to-end tests

End-to-end tests are often at the top of the testing pyramid. They describe a whole-experience interaction with your web app or website, perhaps centered around a specific feature, and they typically run inside a browser controlled by an agent like WebdriverIO, Selenium, or Puppeteer, which can run your codebase more or less as it would be deployed in production (although they're often served on localhost).

Depending on your site, this might involve logging in as a test user, performing major actions, and confirming that your site or system is in the correct state. We'll cover more examples of this type of testing in further sections, because they can be very powerful, but sometimes tricky to maintain.

Some tactics for simplifying them can include reducing their scope, or mocking out specific components where relevant. For example, if users need to sign in to your site, but signing in isn't the feature you're testing, you might want to set a flag for test environments that allows the test controller to act as a user without signing in or creating the associated cookies.

Although end-to-end tests can be very powerful ways to test across huge cross-sections of your codebase at once, such large-scale tests risk being flaky or unreliable due to their dependency on external systems. They can also often leave a lot of test data in your database if, for example, every test creates or modifies an entry. Accumulating leftover data like this can make it hard to determine how a test failed.

### API testing

API tests can refer to confirming the behavior of APIs your software provides, or accessing real-world (possibly live) APIs to confirm their behavior. Either way, this tends to test the _abstractions_ between systems—how they'll eventually communicate with one another—without actually integrating them together as in an _integration test_.

These tests can provide a basic precursor to integration testing without the overhead of running the systems you're testing the connections between. However, tests of real-world systems can be flaky.

### Other types

There are various other approaches to testing that might be useful, depending on your source. Interesting examples include the following:

*   Manual testing.
*   Acceptance testing, a kind of manual testing popularized by Agile, confirms that the product "meets the user's needs".
*   Chaos testing refers to entering random data to see what happens, to make sure a site won't crash if bad data is entered.
*   Failure testing intentionally simulates failures in complex systems, such as network failures, to make sure the code under test responds in a controlled way.
*   Build testing confirms that a codebase's build artifacts can be generated, by checking that they exist or what their contents are. This test type can be useful for checking the output of a complex CMS.

## Code coverage

It's possible to measure what percentage of your code is tested by automated tests, and report this as a statistic over time. We don't recommend aiming for 100% code coverage, because that can lead to unnecessary overhead as well as simplistic or poorly designed tests that don't cover the major use cases in depth.

Coverage itself can also be a useful tool when writing or working on your tests, especially integration tests. By displaying a percentage or a line-by-line breakdown of what code is tested by a single test, you can gain insight into what's missing or what can be tested next.

## Resources

*   [Four common types of code coverage](/articles/ta-code-coverage)

## Check your understanding

Which of the following are known types of tests?

Visual tests

Chaos testing

Fire testing

Maybe if you're building software for a fire department.

Differentiation tests

Stress testing

We haven't mentioned this here, but stress or load testing is a type of testing production systems to ensure they can accept a large amount of traffic. It's more associated with big system design than with testing more typical codebases.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.