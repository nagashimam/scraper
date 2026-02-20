Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# Tools of the trade Stay organized with collections Save and categorize content based on your preferences.

Automated tests are fundamentally just code that will throw or cause an error if something is wrong. Most libraries or testing frameworks provide a variety of primitives that make tests easier to write.

As mentioned in the previous section, these primitives almost always include a way to define independent tests (referred to as _test cases_) and to provide assertions. Assertions are a way to combine checking a result and throwing an error if something is wrong, and can be considered the basic primitive of all testing primitives.

This page covers a general approach to these primitives. Your chosen framework likely has something like this, but this isn't an exact reference.

**Note:** This page just covers `test()`, `suite()`, `assert()`, `expect()` and methods that behave similarly. If you're comfortable with the basics, you can move on to the next page.

For example:

```
import { fibonacci, catalan } from '../src/math.js';
import { assert, test, suite } from 'a-made-up-testing-library';

suite('math tests', () => {
  test('fibonacci function', () => {
    // check expected fibonacci numbers against our known actual values
    // with an explanation if the values don't match
    assert.equal(fibonacci(0), 0, 'Invalid 0th fibonacci result');
    assert.equal(fibonacci(13), 233, 'Invalid 13th fibonacci result');
  });
  test('relationship between sequences', () => {
    // catalan numbers are greater than fibonacci numbers (but not equal)
    assert.isAbove(catalan(4), fibonacci(4));
  });
  test('bugfix: check bug #4141', () => {
    assert.isFinite(fibonacci(0)); // fibonacci(0) was returning NaN
  })
});
```

This example creates a group of tests (sometimes called a _suite_) called "math tests", and defines three independent test cases that each run some assertions. These test cases can usually be individually addressed or run, for example, by a filter flag in your test runner.

**Note:** In this example, one of the tests was specially written to ensure that a prior bug was addressed—that `fibonacci(0)` was returning `NaN` instead of a number. It can be useful to write test cases like this _before_ fixing the bug they address.

## Assertion helpers as primitives

Most testing frameworks, including Vitest, include a collection of assertion helpers on an `assert` object that allow you to quickly check return values or other states against some _expectation_. That expectation is often "known good" values. In the previous example, we know the 13th Fibonacci number should be 233, so we can confirm that directly using `assert.equal`.

You might also have expectations that a value takes a certain form, or is greater than another value, or have some other property. **This course won't cover the full range of possible assertion helpers**, but testing frameworks always provide at least the following basic checks:

*   A ['truthy'](https://developer.mozilla.org/docs/Glossary/Truthy) check, often described as an 'ok' check, checks that a condition is true, matching how you might write an `if` that checks if something is successful or correct. This tends to be provided as `assert(...)` or `assert.ok(...)`, and takes a single value plus an optional comment.
    
*   An equality check, such as in the math test example, in which you expect the return value or state of an object to equal a known good value. These are for primitive equality (such as for numbers and strings) or _referential equality_ (are these the same object). Under the hood, these are just a 'truthy' check with a `==` or `===` comparison.
    
    *   JavaScript distinguishes between loose (`==`) and strict (`===`) equality. Most test libraries provide you with the methods `assert.equal` and `assert.strictEqual`, respectively.
*   Deep equality checks, which extend equality checks to include checking the contents of objects, arrays, and other more complex data types, as well as the internal logic to traverse objects to compare them. These are important because JavaScript has no built-in way to compare the contents of two objects or arrays. For example, `[1,2,3] == [1,2,3]` is always false. Test frameworks often include `deepEqual` or `deepStrictEqual` helpers.
    

Assertion helpers that compare two values (rather than a 'truthy' check only) typically take two or three arguments:

*   The actual value, as generated from the code under test or describing the state to validate.
*   The expected value, typically hard-coded (for example, a literal number or string).
*   An optional comment describing what's expected or what might have failed, which will be included if this line fails.

A useful mnemonic to remember the ordering of these arguments is that in English, Actual comes before Expected in alphabetical order.

It's also fairly common practice to combine assertions to construct a variety of checks, because it's rare that one can correctly confirm the state of your system by itself. For example:

  ```
  test('JWT parse', () => {
    const json = decodeJwt('eyJieSI6InNhbXRob3Ii…');

    assert.ok(json.payload.admin, 'user should be admin');
    assert.deepEqual(json.payload.groups, ['role:Admin', 'role:Submitter']);
    assert.equal(json.header.alg, 'RS265')
    assert.isAbove(json.payload.exp, +new Date(), 'expiry must be in future')
  });
```

Vitest uses the [Chai assertion library](https://www.chaijs.com/api/assert/) internally to provide its assert helpers, and it can be useful to look through its reference to see what assertions and helpers might suit your code.

## Fluent and BDD assertions

Some developers prefer an assertion style that can be called behavior-driven development (BDD), or [Fluent](https://en.wikipedia.org/wiki/Fluent_interface)\-style assertions. These are also called "expect" helpers, because the entry point to checking expectations is a method named `expect()`.

Expect helpers behave in the same way as assertions written as simple method calls like `assert.ok` or `assert.strictDeepEquals`, but some developers find them easier to read. A BDD assertion may read like the following:

```
// A failure here would generate "Expect result to be an array that does include 42"
const result = await possibleMeaningsOfLife();
expect(result).to.be.an('array').that.does.include(42);

// or a simpler form
expect(result).toBe('array').toContainEqual(42);

// the same in assert might be
assert.typeOf(result, 'array', 'Expected the result to be an array');
assert.include(result, 42, 'Expected the result to include 42');
```

These style of assertions work because of a technique called method chaining, where the object returned by `expect` can be continually chained together with further method calls. Some parts of the call, including `to.be` and `that.does` in the previous example, have no function and are only included to make the call easier to read and potentially to generate an automated comment if the test failed. (Notably, `expect` normally doesn't support an optional comment, because the chaining should describe the failure clearly.)

Many test frameworks support both Fluent/BDD and regular assertions. Vitest, [for example](https://vitest.dev/api/expect.html), exports both of Chai's approaches and has its own slightly more concise approach to BDD. Jest, on the other hand, only includes an [expect method](https://jestjs.io/docs/expect) by default.

## Group tests across files

When writing tests, we already tend to provide implicit groupings—rather than all tests being in one file, it's common to write tests across multiple files. In fact, test runners only usually know that a file is for test because of a predefined filter or regular expression—vitest, for example, includes all files in your project that end with an extension like ".test.jsx" or ".spec.ts" (".test" and ".spec" plus a number of valid extensions).

Component tests tend to be located in a peer file to the component under test, as in the following directory structure:

![A list of files in a
directory, including UserList.tsx and UserList.test.tsx.](/static/learn/testing/images/directory.png)

A component file and related test file.

Similarly, unit tests tend to be placed adjacent to the code under test. End-to-end tests may each be in their own file, and integration tests may even be placed in their own unique folders. These structures can be helpful when complex test cases grow to require their own non-test support files, such as support libraries needed just for a test.

## Group tests within files

As used in prior examples, it's common practice to place tests inside a call to `suite()` that groups tests that you set up with `test()`. Suites aren't usually tests themselves, but they help to provide structure by grouping related tests or goals by calling the passed method. For `test()`, the passed method describes the actions of the test itself.

As with assertions, there's a fairly standard equivalence in Fluent/BDD to grouping tests. Some typical examples are compared in the following code:

```
// traditional/TDD
suite('math tests', () => {
  test('handle zero values', () => {
    assert.equal(fibonacci(0), 0);
  });
});

// Fluent/BDD
describe('math tests', () => {
  it('should handle zero values', () => {
    expect(fibonacci(0)).toBe(0);
  });
})
```

In most frameworks, `suite` and `describe` behave similarly, as do `test` and `it`, as opposed to the greater differences between using `expect` and `assert` to write assertions.

Other tools have subtly different approaches to arranging suites and tests. For example, Node.js's built-in test runner supports nesting calls to `test()` to implicitly create a test hierarchy. However, Vitest only allows this kind of nesting using `suite()` and won't run a `test()` defined inside another `test()`.

Just like with assertions, remember that the exact combination of grouping methods your tech stack provides _isn't that important_. This course will cover them in the abstract, but you'll need to figure out how they apply to your choice of tools.

## Lifecycle methods

One reason to group your tests, even implicitly at the top level within a file, is to provide setup and teardown methods that run for every test, or once for a group of tests. Most frameworks provide four methods:

|  | For every \`test()\` or \`it()\` | Once for the suite |
| --- | --- | --- |
| Before test runs | \`beforeEach()\` | \`beforeAll()\` |
| After test runs | \`afterEach()\` | \`afterAll()\` |

For example, you might want to prepopulate a virtual user database before each test, and clear it afterwards:

```
suite('user test', () => {
  beforeEach(() => {
    insertFakeUser('bob@example.com', 'hunter2');
  });
  afterEach(() => {
    clearAllUsers();
  });

  test('bob can login', async () => { … });
  test('alice can message bob', async () => { … });
});
```

This can be useful to simplify your tests. You can share common setup and teardown code, rather than duplicating it in every test. Additionally, if the setup and teardown code itself throws an error, that can indicate structural problems that don't involve the tests themselves failing.

## General advice

Here are a few tips to remember when thinking about these primitives.

### Primitives are a guide

Remember that the tools and primitives here, and in the next few pages, won't exactly match Vitest, or Jest, or Mocha, or Web Test Runner, or any other specific framework. While we've used Vitest as a general guide, be sure to map them to your choice of framework.

### Mix and match assertions as needed

Tests are fundamentally code that can throw errors. Every runner will provide a primitive, likely `test()`, to describe distinct test cases.

But if that runner also provides `assert()`, `expect()` and assertion helpers, remember that this part is more about convenience and you can skip it if you need to. You can run any code that might throw an error, including _other assertion libraries_, or a good-old-fashioned `if` statement.

### IDE setup can be a lifesaver

Ensuring that your IDE, like VSCode, has access to autocompletion and documentation on your chosen test tooling can make you more productive. For example, there are over 100 methods on `assert` in the [Chai assertion library](https://www.chaijs.com/api/assert/), and having documentation for the right one appear inline can be convenient.

This can be especially important for some test frameworks that populate the global namespace with their testing methods. This is a subtle difference, but it's often possible to use testing libraries _without importing them_ if they're automatically added to the global namespace:

```
// some.test.js
test('using test as a global', () => { … });
```

We recommend importing the helpers _even if_ they're supported automatically, because that gives your IDE a clear way to look up these methods. (You may have experienced this problem when building React, as some codebases have a magical `React` global, but some don't, and require it to be imported in all files using React.)

```
// some.test.js
import { test } from 'vitest';
test('using test as an import', () => { … });
```

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.