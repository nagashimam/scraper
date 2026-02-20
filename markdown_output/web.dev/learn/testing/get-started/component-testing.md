Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# Component testing in practice Stay organized with collections Save and categorize content based on your preferences.

Component testing is a good place to start demonstrating practical testing code. Component tests are more substantial than simple unit tests, less complex than end-to-end testing, and demonstrate interacting with the DOM. More philosophically, the use of React has made it easier for web developers to think of websites or web apps as being made up of components.

So testing individual components, regardless of how complex they are, is a good way to start thinking about testing a new or existing application.

This page walks through testing a small component with complex external dependencies. It's easy to test a component that doesn't interact with any other code, such as by clicking a button and confirming that a number increases. In reality, very little code is like that, and testing code that doesn't have interactions can be of limited value.

**Note:** This isn't intended as a full tutorial. A later module, Automated testing in practice, will walk through testing a real site with sample code you can use as a tutorial. However, this page still covers several examples of practical component testing.

## The component under test

We use Vitest and its JSDOM environment to test a React component. This lets us run tests quickly using Node on the command line while emulating a browser.

![A list of names with a
Choose button next to each name.](/static/learn/testing/images/user-list.png)

A small React component that shows a list of users from the network.

This React component named `UserList` fetches a list of users from the network and lets you select one of them. The list of users is obtained using `fetch` inside a `useEffect`, and the selection handler is passed in by `Context`. This is its code:

```
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext.tsx';
import { UserRow } from './UserRow.tsx';

export function UserList({ count = 4 }: { count?: number }) {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users?_limit=' + count)
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, [count]);

  const c = useContext(UserContext);
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <button onClick={() => c.userChosen(u.id)}>Choose</button>{' '}
            <UserRow u={u} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

This example doesn't demonstrate React best practices (for example, it uses `fetch` inside `useEffect`), but your codebase is likely to contain many cases like it. More to the point, these cases can appear stubborn to test at first glance. A future section of this course will discuss writing testable code in detail.

Here are the things we're testing in this example::

*   Check that some correct DOM gets created in response to data from the network.
*   Confirm that clicking a user triggers a callback.

Every component is different. What makes testing this one interesting?

*   It uses the global `fetch` to request real-life data from the network, which might be flaky or slow under test.
*   It imports another class, `UserRow`, which we might not want to implicitly test.
*   It uses a `Context` which isn't specifically part of the code under test, and is normally provided by a parent component.

## Write a quick test to start

We can quickly test something very basic about this component. To be clear, this example isn't very useful. But it's helpful to set up the boilerplate in a peer file called `UserList.test.tsx` (remember, test runners like Vitest, by default, run files that end with `.test.js` or similar, including `.tsx`):

```
import { vi, test, assert, afterAll } from 'vitest';
import { render } from '@testing-library/react';
import { UserList } from './UserList.tsx';
import React, { ContextType } from 'react';

test('render', async () => {
  const c = render(<UserList />);

  const headingNode = await c.findAllByText(/Users);
  assert.isNotNull(headingNode);
});
```

This test asserts that when the component renders, it contains the text "Users". It works _even though_ the component has a side effect of sending a `fetch` to the network. The `fetch` is still in progress at the end of the test, with no set endpoint. We can't confirm that any user information is being shown when the test ends, at least not without waiting for a timeout.

**Note:** While this example test demonstrates the correct boilerplate for writing tests, tests that only check if a component renders properly can be harmful. Future readers might assume the component has been fully tested.

## Mock `fetch()`

Mocking is the act of replacing a real function or class with something under your control for a test. This is common practice in nearly all types of tests, except for the simplest unit tests. This is covered more in [Assertions and other primitives](/learn/testing/assertions/tools).

You can mock `fetch()` for your test so that it completes quickly and returns data you expect, and not "real-world" or unknown data. `fetch` is a _global_, which means we don't have to `import` or `require` it into our code.

In vitest, you can mock out a global by calling `vi.stubGlobal` with a special object returned by `vi.fn()`—this builds a mock that we can modify later. These methods are examined in more detail in a later section of this course, but you can see them in practice in the following code:

```
test('render', async () => {
  const fetchMock = vi.fn();
  fetchMock.mockReturnValue(
    Promise.resolve({
      json: () => Promise.resolve([{ name: 'Sam', id: 'sam' }]),
    }),
  );
  vi.stubGlobal('fetch', fetchMock);

  const c = render(<UserList />);

  const headingNode = await c.queryByText(/Users);
  assert.isNotNull(headingNode);

  await waitFor(async () => {
    const samNode = await c.queryByText(/Sam);
    assert.isNotNull(samNode);
  });
});

afterAll(() => {
  vi.unstubAllGlobals();
});
```

This code adds a mock, describes a fake version of the network fetch `Response`, and then waits for it to appear. If the text doesn't appear— you can check this by changing the query in `queryByText` to a new name— the test will fail.

**Note:** Mocking fetch this way definitely _works_. But, it breaks down if your test has more than a couple of network requests (trying to mock everything is hard) or if you access other properties on the Response object (such as `Response.ok`). We suggest using a library like [vitest-fetch-mock](https://www.npmjs.com/package/vitest-fetch-mock) or [Mock Service Worker](https://mswjs.io/) to generalize this approach.

This example used Vitest's built-in mocking helpers, but other testing frameworks have similar approaches to mocking. Vitest is unique in that you must call `vi.unstubAllGlobals()` after all tests, or set [an equivalent global option](https://vitest.dev/config/#unstubglobals). Without "undoing" our work, the `fetch` mock can affect other tests, and every request will be responded to with our odd pile of JSON.

## Mock imports

You might have noticed that our `UserList` component itself imports a component called `UserRow`. While we haven't included its code, you can see that it renders the user's name: the previous test checks for "Sam", and that isn't rendered inside `UserList` directly, so it must come from `UserRow`.

![A flowchart of how
users' names move through our component.](/static/learn/testing/images/component-flow.png)

`UserListTest` doesn't have visibility of `UserRow`.

However, `UserRow` might itself be a complex component—it might fetch further user data, or have side effects that aren't relevant to our test. Removing that variability makes your tests more helpful, especially as the components you want to test get more complex and more intertwined with their dependencies.

Fortunately, you can use Vitest to mock out certain imports, even if your test doesn't use them directly, so that any code that uses them is provided with a simple or known version:

```
vi.mock('./UserRow.tsx', () => {
  return {
    UserRow(arg) {
      return <>{arg.u.name}</>;
    },
  }
});

test('render', async () => {
  // ...
});
```

Like mocking the `fetch` global, this is a powerful tool, but it can become unsustainable if your code has lots of dependencies. Again, the best fix is to write testable code.

## Click and provide context

React, and other libraries [such as Lit](https://lit.dev/docs/data/context/), have a concept called `Context`. The sample code includes `UserContext`, which invokes method if a user is chosen. This is often seen as an alternative to "prop drilling," where the callback is passed to `UserList` directly.

Our test harness hasn't provided `UserContext`. By adding a click action to the React test without it, this may, at worst, crash the test. At best, if a default instance was provided elsewhere, it may cause some behavior out of our control (similar to an unknown `UserRow` above).

**Key Term:** A _test harness_ is a substitute environment that acts as an imitation of production infrastructure, so that you can still test your code effectively.

  ```
  const c = render(<UserList />);
  const chooseButton = await c.getByText(/Choose);
  chooseButton.click();
```

Instead, when rendering the component, you can provide your own `Context`. This example uses an instance of `vi.fn()`, a [Vitest Mock Function](/learn/testing/appendix#vitest), that can be used to check that a call was made and what arguments it used.

In our case, this interacts with the mocked `fetch` in the earlier example, and the test can confirm that the ID passed through was `sam`:

  ```
  const userChosenFn = vi.fn();
  const ucForTest: ContextType<typeof UserContext> = { userChosen: userChosenFn as any };
  const c = render(
    <UserContext.Provider value={ucForTest}>
      <UserList />
    </UserContext.Provider>,
  );

  const chooseButton = await c.getByText(/Choose);
  chooseButton.click();
  assert.deepStrictEqual(userChosenFn.mock.calls, [['sam']]);
```

This is a simple but powerful pattern that can let you remove irrelevant dependencies from the core component you're trying to test.

## In summary

This example demonstrated how to build a component test to test and safeguard a difficult-to-test React component. This test focused on ensuring that the component correctly interacts with its dependencies: the `fetch` global, an imported subcomponent, and a `Context`.

## Check your understanding

What approaches were used to test the React component?

Mocking complex dependencies with simple ones for test

Dependency injection using Context

Stubbing globals

Checking that a number incremented

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.