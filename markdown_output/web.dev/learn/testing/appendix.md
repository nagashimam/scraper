*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# Appendix Stay organized with collections Save and categorize content based on your preferences.

Here are some additional concepts and information that may help on your test development journey.

## Vitest as a test runner

[Vitest](https://vitest.dev/) is a test runner and framework that's growing in popularity. This course uses it whenever specific examples are required, but many of the samples included are generic and apply to whatever framework you've chosen.

Most runners or test frameworks tend to have a lot in common, and this course will be useful regardless of your chosen stack. We've chosen to focus on Vitest for a number of reasons:

*   It's modern and involves very little work to set up or configure, as opposed to other test runners. While it's built on the [Vite](https://vitejs.dev/) build tool, Vitest still works with existing projects.
    
*   It also has great support for working with [EcmaScript Modules (ESM)](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/), including mocking whole imports. While it has [some caveats](https://vitest.dev/api/vi.html#vi-mock), it's more stable than other tooling.
    

Most importantly, it presents a largely compatible API to Jest, likely the most [popular](https://npm-stat.com/charts.html?package=jest&package=vitest&from=2017-11-15&to=2023-11-15) runner. But again, the way you structure and group your tests tends to be similar no matter which framework you're using. More advanced features, like complicated test doubles, tend to stray a bit further. This course uses Vitest to describe them, but always describes the generic solution as well.

## React as a component model

While this course does provide general code examples that test plain JavaScript, for example, mathematical functions, it rapidly moves into testing React components before later including Web Components generally and using Lit. This course also uses Next.js.

This is a practical choice. Despite criticisms, React is the most used framework of the participants in the [State of JS survey](https://2023.stateofjs.com/en-US/libraries/front-end-frameworks/).

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.