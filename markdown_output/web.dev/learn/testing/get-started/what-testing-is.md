*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# What testing is Stay organized with collections Save and categorize content based on your preferences.

When writing software, you can confirm that it works correctly through testing. Testing can be broadly defined as the process of running software in specific ways to ensure that it behaves as it was intended to.

Successful testing can give you confidence that as you add new code, features or even upgrade your dependencies, the software you've already written will continue to work in the way you expect. Testing can also help safeguard your software against unlikely scenarios or unexpected inputs.

Some examples of behavior on the web that you might want to test include:

*   Ensuring that a website's feature operates correctly when a button is clicked.
*   Confirming that a complex function produces the correct results.
*   Completing an action that requires user login.
*   Checking that a form properly reports an error when malformed data is entered.
*   Making sure a complex web app continues to function when a user has extremely low bandwidth or goes offline.

## Automated versus manual testing

You can test your software in two general ways: automated testing and manual testing.

Manual testing involves humans running software directly, such as loading a website in their browser, and confirming that it behaves as expected. Manual tests are simple to create or define—for example, can your site load? Can you perform these actions?—but each run-through costs an enormous amount of a human's time. While humans are very creative, which can enable a type of testing known as _exploratory tests_, we can still be poor at noticing failures or inconsistencies, especially when doing the same task many times.

Automated testing is any process that allows tests to be codified and run repeatedly by a computer to confirm your software's intended behavior _without_ having a human perform any repeated steps, such as setup or checking results. Importantly, once automated testing is configured, it can be run frequently. This is still a very broad definition, and it's worth noting that automated tests take all sorts of shapes and forms. The majority of this course concerns itself with automated testing as a practice.

Manual testing does have its place, often as a precursor to writing automated tests, but also when automated testing becomes too unreliable, broad in scope, or unwieldy to write.

## The fundamentals through an example

For us, as web developers who write JavaScript or related languages, a concise automated test could be a script just like this that you run every day, perhaps through Node, or by loading it in a browser:

```
import { fibonacci } from "../src/math.js";

if (fibonacci(0) !== 0) {
  throw new Error("Invalid 0th fibonacci result");
}
const fib13 = fibonacci(13);
if (fib13 !== 233) {
  throw new Error("Invalid 13th fibonacci result, was=${fib13} wanted=233");
}
```

This is a simplified example that provides the following insights:

*   This is a _test_ because it runs some software (the [_Fibonacci_ function](https://en.wikipedia.org/wiki/Fibonacci_sequence)) and ensures its behavior works in the way it was intended to by checking its results against expected values. If the behavior isn't correct, it causes an error, which JavaScript expresses by throwing an `Error`.
    
*   Even though you may be running this script manually in your terminal or a browser, this is still an _automated_ test because it can be run repeatedly without you having to perform any individual steps. The next page, [where tests run](/learn/testing/get-started/where-tests-run), explains more.
    
*   Even though this test doesn't use any libraries—it's JavaScript that can run anywhere—it's still a test. There are many tools that can help you write tests, including ones that will be covered later in this course, but they all still work on the fundamental principle of causing an error if something goes wrong.
    

## Testing libraries in practice

Most libraries or built-in testing frameworks provide two major primitives that make tests easier to write: _assertions_ and a way to define independent tests. These will be covered in detail as part of the next section, [assertions and other primitives](/learn/testing/assertions/tools). However, at a high level, it's important to remember that nearly all tests you see or write will end up using these kinds of primitives.

Assertions are a way to combine checking a result and causing an error if something goes wrong. For example, you can make the previous test more concise by introducing `assert`:

```
import { fibonacci } from "../src/math.js";
import { assert } from "a-made-up-testing-library";

assert.equal(fibonacci(0), 0, "Invalid 0th fibonacci result");
assert.equal(fibonacci(13), 233, "Invalid 13th fibonacci result");
```

**Note:** There are various ways of writing `assert`. Some libraries support a Behavior-Driven Development (BDD) that encourages thinking of your assertions as _expectations_. More on this [later](/learn/testing/assertions/tools#fluent_and_bdd_assertions).

You can improve this test further by defining independent _tests_, optionally grouped into _suites_. The following suite independently tests the Fibonacci function and the [_Catalan_ function](https://en.wikipedia.org/wiki/Catalan_number):

```
import { fibonacci, catalan } from "../src/math.js";
import { assert, test, suite } from "a-made-up-testing-library";

suite("math tests", () => {
  test("fibonacci function", () => {
    assert.equal(fibonacci(0), 0, "Invalid 0th fibonacci result");
    assert.equal(fibonacci(13), 233, "Invalid 13th fibonacci result");
  });
  test("relationship between sequences", () => {
    const numberToCheck = 4;
    const fib = fibonacci(numberToCheck);
    const cat = catalan(numberToCheck);
    assert.isAbove(fib, cat);
  });
});
```

In this context of software testing, _test_ as a noun refers to a _test case_: a single, independent, addressable scenario, such as the "relationship between sequences" test case in the previous example.

Individually named tests are useful for the following tasks, among others:

*   Determining how a test succeeds or fails over time.
*   Highlighting a bug or scenario by name so you can more easily test that the scenario is resolved.
*   Running some tests independently from others, such as through a glob filter.

One way to think of test cases is using the "three A's" of unit testing: arrange, act, and assert. Each test case, at its core, will:

*   Arrange some values or state (this could just be hard-coded input data).
*   Perform an action, such as calling a method.
*   Assert the output values or updated state (using `assert`).

## The scale of tests

The code samples in the previous section describe a _unit test_, because they test minor parts of your software, often focusing on a single file, and in this case, just the output from a single function. Test complexity grows as you consider code from multiple files, components, or even different interconnected systems (sometimes outside your control, such as a network service or the behavior of an external dependency). Because of this, test types are often named based on their _scope_ or _scale_.

Along with _unit tests_, some examples of other test types include _component testing_, _visual testing_, and _integration testing_. None of these names have rigorous definitions, and they might have different meanings depending on your codebase, so remember to use them as a guide and come up with definitions that work for you. For example, what is a _component_ under test in your system? For React developers, this may literally map to a "React component", but it might have a different meaning to developers in other contexts.

The scale of an individual test can place it inside a concept often referred to as the "testing pyramid", which can be a good rule of thumb for what a test checks and how it runs.

![The testing pyramid,
with end-to-end (E2E) tests at the top, integration tests in the middle, and
unit tests at the bottom.](/static/learn/testing/images/testing-pyramid.jpg)

The testing pyramid.

This idea has been iterated on, and various other shapes have now [been popularized](/articles/ta-strategies), such as the testing diamond or the testing ice cone. Your test-writing priorities will probably be unique to your codebase. However, a common feature is that simpler tests, like _unit tests_, tend to be faster to run, easier to write (so you'll have more of them), and test a limited scope, whereas complex tests like _end-to-end tests_ are difficult to write but can test a wider scope. In fact, the top layer of many testing 'shapes' tends to be manual testing, because some user interaction is too complex to codify into an automated test.

These types will be expanded on in [types of automated testing](/learn/testing/get-started/test-types).

## Check your understanding

What primitives do most testing libraries and frameworks provide?

A runner service that uses a cloud provider.

Some browser-based runners offer a way to outsource your tests, but it's not a normal feature of testing libraries.

Assertions that cause exceptions if they're not satisfied.

Although you can throw an error to fail a test, `assert()` and its variations tend to be included because they make checks easier to write.

A way to categorize tests into the testing pyramid.

There's not really a standard way to do this. You could prefix the names of your tests, or place them in different files, but categorization isn't really built into most test frameworks.

The ability to define independent tests by function.

The `test()` method is included in almost all test runners. It's important because test code doesn't run at the top level of a file, which lets the test runner treat each test case as an independent unit.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.