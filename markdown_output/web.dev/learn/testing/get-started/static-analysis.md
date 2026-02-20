Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [Testing](https://web.dev/learn/testing)

# Static analysis Stay organized with collections Save and categorize content based on your preferences.

Static analysis is a type of testing that provides automated checking of your code without actually running it or having to write an automated test. You've likely already seen this kind of testing if you use an IDE like VSCode—the type checking performed by TypeScript is a kind of static analysis, and it can show up as squiggly lines under errors or warnings.

## ESLint

ESLint is a tool that can provide feedback on possible problems in your codebase. These problems may be type_safe,_ but errors or nonstandard behavior in their own right. ESLint lets you apply a number of rules that are checked on your codebase, including many in its "recommended" set.

A good example of an ESLint rule is its [no-unsafe-finally](https://eslint.org/docs/latest/rules/no-unsafe-finally) rule. This prevents you from writing statements which modify your program's control flow inside a `finally` block. This is a great rule, because doing this is an unusual way to write JavaScript that can be hard to follow. However, it's also something that a healthy code review process should be able to detect.

  ```
  try {
    const result = await complexFetchFromNetwork();
    if (!result.ok) {
      throw new Error("failed to fetch");
    }
  } finally {
    // warning - this will 'overrule' the previous exception!
    return false;
  }
```

As such, ESLint isn't a replacement for a healthy review process (and a style guide that defines what your codebase should look like), because it's not going to capture every unorthodox approach that a developer might try to introduce into your codebase. Google's Eng Practices guide has [a short section](https://google.github.io/eng-practices/review/reviewer/looking-for.html#complexity) on "keeping it simple".

ESLint lets you break a rule and annotate code as "allowed". For example, you can allow the previous logic by annotating it as follows:

  ```
  finally {
    // eslint-disable-next-line no-unsafe-finally
    return false;
  }
```

If you find yourself constantly breaking a rule, consider turning it off. These tools encourage you to write code in a certain way, but your team might be used to writing code in a different way and already be aware of the risks of that approach.

Finally, enabling static analysis tools on a large codebase might create a lot of unhelpful noise (and busywork to refactor) over code that otherwise worked fine. So it's easier to enable early in a project's lifecycle.

### ESLint plugins for browser support

You can add a plugin to ESLint that flags the use of APIs that aren't widely supported, or not supported by your target browser list. The [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) package can warn you when an API might not be available to your users, so you don't have to constantly keep track for yourself.

## Type checking for static analysis

When learning JavaScript, new developers are typically introduced to the idea that it's a _weakly typed_ language. That is, it's possible to declare a variable as one type, then use the same location for something completely different. This is similar to Python and other scripting languages, but unlike compiled languages such as C/C++ and Rust.

This kind of language might be good for getting started—and it's arguably this simplicity that has made JavaScript so popular—but it's often a point of failure for some codebases, or at least something that allows confusing errors to happen. For example, by passing a `number` where a `string` or an object type was expected, that incorrectly typed value can propagate through various libraries before finally causing a confusing `TypeError`.

## TypeScript

TypeScript is the most mainstream solution to JavaScript's lack of typing information. This course uses it extensively. And while this isn't a course on TypeScript, it can be an important part of your toolbox because it provides static analysis.

For a quick example, this code, which expects to be given a callback accepting a `string` name and `number` age:

```
const callback = (name: string, age: string): void => {
  console.info(name, 'is now', age, 'years old!');
};
onBirthday(callback);
```

Generates the following error when run through TypeScript, or even when hovered over in an IDE:

```
bad.ts:4:12 - error TS2345: Argument of type '(name: string, age: string) => void' is not assignable to parameter of type '(name: string, age: number) => void'.
  Types of parameters 'age' and 'age' are incompatible.
    Type 'number' is not assignable to type 'string'.

4 onBirthday(callback);
             ~~~~~~~~

Found 1 error in bad.ts:4
```

![The code from the
previous example, displayed in an IDE with the error message displayed in a
pop-up.](/static/learn/testing/images/typescript-error.png)

VSCode indicating that you've passed an incorrect type.

Ultimately, the goal of using TypeScript is to prevent errors like this— age should be a `number`, not a `string`—creeping into your project. This kind of error can be difficult to detect using other types of test. Additionally, the type system can give feedback before a test is even written. This can make the process of writing code easier by giving you early feedback about type errors as you're developing software, rather than when the code eventually runs.

The most challenging part of using TypeScript is setting it up correctly. Every project needs a `tsconfig.json` file, which, while primarily used by the `tsc` command-line tool itself, is also read by IDEs like VSCode along with many other build tools and tooling, including Vitest. This file contains hundreds of options and flags, and you can find some good resources for setting it up here:

*   [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
*   [Centralized Recommendations for TypeScript bases](https://github.com/tsconfig/bases)
*   [Check your JS with TS](https://samthor.au/2021/check-js-with-ts/)

## General TypeScript tips

When setting up and using TypeScript through a `tsconfig.json` file, keep the following in mind:

*   Make sure your source files are actually included and checked. If a file mysteriously "has no errors", that's probably because it's not being checked.
*   Explicitly describing types and interfaces inside `.d.ts` files, rather than having them implicitly described as you write functions, can make your codebase easier to test. It's easier to write mocks and 'fake' versions of code when the interfaces involved are clear. .

## TypeScript implicit any

One of TypeScript's most powerful and rewarding configuration options is the `noImplicitAny` flag. However, it's also often the most difficult to enable, especially if you already have a large codebase. (The `noImplicitAny` flag is enabled by default if you're in `strict` mode, but not otherwise.)

This flag will make this function return an error:

```
export function fibonacci(n) {
  if (n <= 1) {
    return 0;
  } else if (n === 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

Even though, as a reader, it's fairly clear that `n` should be a number, TypeScript can't confidently confirm this. If you're using VSCode, hovering over the function will describe it as follows:

```
function fibonacci(n: any): any
```

Callers of this function will be able to pass through a value of type `any` (a type which allows any other type), not just a `number`. By enabling the `noImplicitAny` flag, you can safeguard this kind of code during development, without needing to write extensive business logic tests for your code passing the wrong data types in specific places.

The simple fix here is to mark both the `n` argument and `fibonacci`'s return type as `number`.

TypeScript can't prevent invalid data being entered by users, or from a network request. Tests that confirm correct behavior if a user submits malformed data—even though your TS types say it should look a certain way—can still be useful, but not so much for code which you expect to be entirely under your control.

The `noImplicitAny` flag doesn't prevent you from _explicitly_ writing `any` in your codebase. You can still write a function that accepts or returns the `any` type. It just ensures that you give every variable a type.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2024-01-31 UTC.