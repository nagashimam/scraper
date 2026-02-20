Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [AI](https://web.dev/learn/ai)

# Prompt engineering Stay organized with collections Save and categorize content based on your preferences.

In the [Generative AI module](/learn/ai/generative), you learned that the input space of generative AI models is practically unlimited. To produce outputs that align with your users' expectations, you need to construct prompts. A _prompt_ is a structured contract between your application and the model.

A well-written prompt:

*   States how the LLM should build its response.
*   Consists of multiple components that can be versioned, tested, and improved over time.
*   Can act as a shared artifact for collaboration across teams.

**Note:** If you're proficient in basic prompting techniques, consider skipping ahead to [Evaluation-Driven Development](/learn/ai/evaluation-driven-development).

In this module, you learn how to write effective prompts. We explain how a prompt is structured and how its components are distributed between the system and the end-user. You'll also learn basic prompting techniques and the scenarios in which to apply each of them.

Throughout this module, we'll use a shared example: BlogBuddy, an AI-powered writing assistant, inspired by [CyberAgent's use of the Prompt API](https://developer.chrome.com/blog/prompt-api-blog-cyberagent).

Return to the generative AI module for the [BlogBuddy system blueprint](/learn/ai/generative#system-blueprint-blogbuddy).

## Prompt components

Each prompt component has a specific role in steering model behavior.

*   **Context**: Establishes the model's role and domain, so it understands how to behave.
*   **Instruction**: Assigns a specific task to the model.
*   **Input variables**: Situation-specific context, supplied by your application in real-time.
*   **Output format**: Defines the expected output structure. For example, you may want JSON outputs.
*   **Examples**: Demonstrate how the task should be executed for one or more other inputs.
*   **Constraints**: Set clear limits to keep the output consistent, safe, and on-brand.

Your prompt may include some or all of these components. The following example illustrates these components for BlogBuddy's writing assistant feature.

```
### Context

You are a writing assistant for blog authors.
Your job is to generate helpful, concise, and engaging content.

### Instruction

Generate 3 alternative titles for the user's blog post with a given style.

### Input variables

Here is the content of the blog post:
${blogPostContent}

Here is the desired style:
${titleStyle}

### Output format

Return valid JSON ONLY, in the following exact structure:
{
  "titles": ["Title option 1", "Title option 2", "Title option 3"]
}

### Examples

Example input:
{
  "blogPostContent": "I finally visited the small neighborhood café I've been eyeing for months...",
  "titleStyle": "friendly"
}

Example output:
{
  "titles": [
    "A First Visit to the Neighborhood Café",
    "Trying the Café I've Wanted to Visit for Months",
    "My Experience at a Long-Awaited Local Spot"
  ]
}
### Constraints

- Each title must be under 128 characters.
- Titles must be original, not copied verbatim from the draft.
- Keep the tone natural and human. Avoid emojis unless explicitly requested.
- Avoid sensationalism or clickbait.
- If the draft includes multiple topics, choose the most prominent topic.
```

For your first prompts, start with the essentials: instruction and the output format. Then, iteratively add more components as you analyze the results and determine what finer controls are needed for success.

**Tip:** When developing your prompts, make sure every bit of information has a clear purpose and avoid over-inflating your prompt. Too many examples or excessive detail can confuse the model, increase latency, and raise costs if you are using server-side models. You'll learn more about efficient iteration in [Evaluation-Driven Prompt Development](/learn/ai/evaluation-driven-development).

## System versus user prompts

Some of the prompt components are hard-coded, while others can be supplied by the end user:

*   The _system prompt_ is provided by the application developers and defines the model's overall behavior. It can set the model's role, expected tone, output format (such as a strict JSON schema), and any global constraints. The system prompt is also where you encode [safety and responsibility requirements](/learn/ai/responsibility). It remains consistent across requests and provides a stable foundation for the model's behavior.
    
    **Tip:** For inspiration, check out this [collection of system prompts](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) from popular models and applications.
    
*   The _user prompt_ contains the immediate request that leads to an output. The user requests a specific task, which can include specific variables. For example, "Show three titles for this post," "Continue this paragraph," or "Make this copy sound more formal."
    

Most generative AI APIs let you structure a prompt as an array of messages, each with a role (system or user) and content. This makes it easier to separate stable, global instructions from dynamic, per-request input.

How do you decide what components belong in the system prompt and what should be left to the user to specify? The answer depends on how much flexibility [your user experience](/learn/ai/introduction#use_case) has and how capable your model is.

### Constrained use cases

For highly specific use cases, most of the prompt can be predefined in the system prompt. For example in BlogBuddy, users can click **Show Titles** to list generated title suggestions for their draft.

![](/static/learn/ai/prompt-engineering/images/blogbuddy.png)

The task is fixed, the output format is known, and the user doesn't need to provide extra context to get the expected result. In this case, you place all stable rules, tone guidelines, output schemas, and examples in the system prompt.

To build this with the [Prompt API](https://developer.chrome.com/docs/ai/prompt-api), we'd use `initialPrompts` to define system-level behavior for the entire session:

```
// Defines stable behavior for the entire session
const session = await LanguageModel.create({
  initialPrompts: [
    {
      role: "system",
      content: `You are a blog-writing assistant.
      Your task is to generate high-quality titles for blog posts.
      Always respond in concise, friendly language.
      Return exactly 3 alternative titles.
      Produce valid JSON with a "titles" array of strings.`
    }
  ]
});
```

When the user clicks **Show Titles**, the prompt is invoked for the current content:

```
// The only variable input is the blog content
const result = await session.prompt(blogContent);
```

**Note:** In the [UX Patterns](/learn/ai/ux-patterns#best_practices_2) module, we cover why you'd use the language **Show Titles** instead of **Generate Titles**.

Over time, users might ask for more flexibility and control. In this case, you can move certain components into the user prompt, with interface controls. For example, a drop-down menu of style or tone specifications.

However, too many structured actions can clutter the user experience. When this happens, you may want to move to a more open-ended design that allows users to specify most of their prompts themselves. You learn more about optimizing this design in the [UX patterns module](/learn/ai/ux-patterns).

### Flexible tasks rely on detailed user prompts

An open-ended, interactive experience that helps users write blog posts from scratch, offers more flexibility to your users. They may ask for ideas, outlines, rewrites, tone shifts, or brainstorms, or specify how exactly a task should be executed. With this type of application, you likely need a more powerful, server-side model.

![](/static/learn/ai/prompt-engineering/images/writing-assistant-example.png)

With flexible tasks, the user needs to specify more information, as the possible range of options is so much broader. The system prompt still governs overall behavior.

**Note:** In practice, chatbots often fail, especially if they're implemented too early. [Watch a presentation](https://www.youtube.com/watch?v=Tq-pEVM8u7c) to learn about a more organic path for generative AI integration.

The best practices are:

*   Put stable rules, structure, and examples in the system prompt. Put dynamic content and task-specific requests in the user prompt.
*   The more open-ended your UX, the more flexibility the user prompt needs to accommodate unpredictable inputs.
*   The more work the user prompt must do, the more capable the model needs to be, since it has to handle greater variation with less built-in structure.

You can use these rules to gradually optimize the trade-off between control and user flexibility in your product context. Closely observe user preferences and behaviors. More flexibility doesn't always convert into actual value. Your users also need to have the time, skills, and cognitive bandwidth to craft more extensive prompts.

## Common prompting techniques

Developers typically try several prompting techniques to find what works best for their use case and model.

### Zero-shot prompting

You describe the task for the model and hope for the best. For example:

```
"What is the capital of France?"
```

Zero-shot prompting is an efficient baseline for many AI tasks. For requests that aren't complex, such as querying encyclopedic knowledge, you're probably best off staying with this technique. However, in most real-world applications, you need to expand your prompt with additional conditioning and logic.

### Few-shot prompting

With few-shot prompting, you provide examples to demonstrate the right behavior, style, structure, and other important variables. Here's an example prompt for sentiment classification:

```
You classify user messages into one of the following categories:
- "positive"
- "negative"
- "neutral"
Here are examples to guide your classifications:
Input: "I love this product! It works perfectly."
Output: { "label": "positive" }

Input: "This is terrible. I want a refund."
Output: { "label": "negative" }
```

Few-shot prompting is useful for this kind of pseudo-predictive task. It can also be applied to tasks that follow a recognizable structure, like title generation in Figure 1.

When the output space is very wide, such as open-ended or longform content, few-shot prompting is likely not the best technique. It's difficult or even impossible to provide examples that meaningfully cover the space.

### Chain-of-thought prompting

You encourage the model to reason step-by-step before producing an answer. The steps can be described explicitly, or can be left to the model to define. For example:

```
"Think step-by-step to identify the main idea of this paragraph. Then produce a
short heading under 60 characters."
```

Chain-of-thought works great for tasks that require multi-step reasoning and execution, such as outlining a blog post or supporting complex decisions. It's the main technique behind so-called reasoning models.

This can be expensive. Generating step-by-step reasoning traces increases compute, cost, and latency. Only use it when your use case requires complex reasoning and planning.

### Self-reflection prompting

Following the initial generation, you request that the model critiques and revises its own output. For example:

```
"Review your previous output.
Identify unclear phrasing and rewrite it more concisely."
```

Self-reflection is especially useful for tasks that benefit from iterative refinement, such as editing or rewriting tools. It's quick to implement and can produce substantial quality gains. A self-reflection loop is beneficial, once your prompt is performing well. First, refine the output for more clarity or added user delight.

## Your takeaways

In this module, you learned how prompts are built from structured components. In practice, prompt engineering is highly experimental. Clarity and reliability emerge only after multiple rounds of refinement.

In the next module, we look at [Evaluation-driven prompt development](/learn/ai/evaluation-driven-development). This practice helps you systematically improve prompts and converge on what works best for your product and your users.

### Resources

Each of these techniques comes with its own variants and best practices. There's a wide range of detailed external resources, for example:

*   Google Cloud's [prompt engineer guide](https://cloud.google.com/discover/what-is-prompt-engineering)
*   DAIR's [Prompt Engineering Guide](https://promptingguide.ai)
*   [Prompting made simple](https://medium.com/@janna.lipenkova_52659/prompting-made-simple-6c0112c31536) by Janna Lipenkova
*   Read chapter 6 in [_The Art of AI Product Development_](https://www.google.com/books/edition/The_Art_of_AI_Product_Development/XHZmEQAAQBAJ).

Check your chosen model's documentation, as there may be specific advice for you to get the best possible results.

## Check your understanding

What types of rules can you specify in a system prompt?

Specific input variables (such as user inputs), expected output structure, model role, and character count limit.

Great job, that's correct!

Only the user input goes here.

Not quite, try again.

To establish the model's role and domain, so it understands how to behave.

Not quite, try again.

What type of model and model size you're using.

Nope, try again.

What technique should you use when you want the model to reason step-by-step before producing the answer?

Zero-shot prompting

That's incorrect.

Few-shot prompting

That's incorrect.

Chain-of-thought prompting

Great job, that's correct!

Self-reflection prompting

That's incorrect.

When is few-shot prompting most useful?

When asking the model to perform a task without any context.

That's incorrect.

When the task follows a recognizable structure, such as itle generation) or requires specific formatting.

Great job, that's correct!

When the output space is very large, such as open-ended creative writing.

That's incorrect.

When you want the model to critique its own work.

That's incorrect.

What is the self-reflection prompting technique?

Asking the model to critique and revise its own output to improve clarity or quality.

Great job, that's correct!

Running the prompt multiple times and averaging the results.

That's incorrect.

Asking the user to rewrite the prompt if the result is bad.

That's incorrect.

Allowing the model to change the system prompt dynamically.

That's incorrect.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-01-29 UTC.