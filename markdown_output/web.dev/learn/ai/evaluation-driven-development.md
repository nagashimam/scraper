Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [AI](https://web.dev/learn/ai)

# Evaluation-driven development Stay organized with collections Save and categorize content based on your preferences.

As you craft prompts for real applications, a key trade-off emerges: balancing brevity with effectiveness. When all factors are equal, a concise prompt is faster, cheaper, and easier to maintain than a longer prompt. This is especially relevant in web environments where latency and token limits matter. However, if your prompt is too minimal, the model may lack the context, instructions, or examples to produce high-quality results.

_Evaluation-driven development_ (EDD) lets you systematically monitor and optimize this trade-off. It offers a repeatable, testable process for improving outputs in small and confident steps, catching regressions, and aligning model behavior with user and product expectations over time.

Think of it as [test-driven development (TDD)](https://martinfowler.com/bliki/TestDrivenDevelopment.html), adapted for the uncertainty of AI. Unlike deterministic unit tests, AI evaluations cannot be hard-coded because outputs, both well-formed and failing ones, can take unanticipated forms.

![](/static/learn/ai/evaluation-driven-development/images/edd-diagram.jpg)

**Figure 1**: In EDD, you define the problem, initialize a baseline, evaluate, and optimize. Continue to evaluate and optimize until your process is complete.

EDD also supports your discovery efforts. Just like writing tests helps clarify the behavior of a feature, defining evaluation criteria and reviewing model outputs forces you to confront lack of clarity and gradually add more detail and structure to open-ended or unfamiliar tasks.

**Tip:** You might be used to deterministic and objective tests, but great AI experiences also require soft skills. Empathy for users, sensitivity to tone and clarity, and a willingness to treat the model as a creative collaborator are essential to craft better prompts and features that resonate with users.

## Define the problem

You can frame your problem like an API contract, including the input type, the output format, and any additional constraints. For example:

*   Input type: blog post draft
*   Output format: JSON array with 3 post titles
*   Constraints: less than 128 characters, using a friendly tone

Then, collect example inputs. To ensure data diversity, you include both ideal examples and real, messy inputs. Think about variations and edge cases, such as posts with emoji, nested structure, and a lot of code snippets.

## Initialize a baseline

Write your first prompt. You can start with [zero-shot](/learn/ai/prompt-engineering#zero-shot_prompting) and include:

*   Clear instruction
*   Output format
*   Placeholder for input variable

You increase complexity and work with other components and advanced prompting techniques in when you evaluate and optimize. First, we need to set up an evaluation system to steer the optimization effort into the right direction.

## Create your evaluation system

In TDD, you start writing tests once you know the requirements. With generative AI, there are no definitive outputs to test against, so you need to put more effort into crafting your evaluation loop.

You likely need multiple measurement tools to evaluate effectively.

### Define your evaluation metrics

Evaluation metrics can be deterministic. For example, you might check whether the model returns valid JSON or outputs the correct number of items.

However, much of your time should be dedicated to identifying and refining subjective or qualitative metrics, such as clarity, usefulness, tone, or creativity. You might start with broad goals but quickly encounter more nuanced issues.

For example, say your title generator overuses certain phrases or patterns, leading to repetitive, robotic results. In that case, you'd define new metrics to encourage variation and discourage overused structures or keywords. Over time, your core metrics will stabilize and you can track improvements.

**Caution:** Avoid over-relying on public generative AI benchmarks such as [MMLU-Pro](https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro) and [SEED-Bench](https://huggingface.co/spaces/AILab-CVC/SEED-Bench_Leaderboard). These can serve as initial signals for model selection, but likely, they aren't representative of your user base.

This process can benefit from experts who understand what _good_ looks like in your application's domain and can spot subtle failure modes. For example, if you're developing a writing assistant, pair up with a content producer or editor to ensure your evaluation is aligned with their worldview.

### Choose your judges

Different evaluation criteria call for different evaluators:

*   **Code-based checks** work well for deterministic or rule-based outputs. For example, you might scan titles for words you want to avoid, check character counts, or validate JSON structure. These are fast, repeatable, and perfect for fixed-output UI elements, such as buttons or form fields.
*   **Human feedback** is essential for assessing more subjective qualities, including tone, clarity, or usefulness. Especially early on, reviewing model outputs yourself (or with domain experts) allows for rapid iteration. However, this approach doesn't scale well. Once you launch your application, you can also collect in-app signals, such as a star rating, but these tend to be noisy and lack the nuance needed for precise optimization.
*   **[LLM-as-judge](/articles/test-llm-capabilities)** offers a scalable way to evaluate subjective criteria by using another AI model to score or critique outputs. It's faster than human review, but not without pitfalls: in a naive implementation, it can perpetuate and even reinforce the biases and knowledge gaps of the model.

Prioritize quality over quantity. In classic machine learning and predictive AI, it's a common practice to crowdsource data annotation. For generative AI, crowdsourced annotators often lack domain context. High-quality, context-rich evaluation matters more than scale.

## Evaluate and optimize

The faster you can test and refine your prompts, the sooner you'll arrive at something that aligns with user expectations. You need to get into a habit of continuous optimization. Try an improvement, evaluate, and try something else.

Once in production, continue observing and evaluating the behavior of your users and your AI system. Then, analyze and transform this data into optimization steps.

### Automate your evaluation pipeline

To reduce friction in your optimization efforts, you need operational infrastructure that automates evaluation, tracks changes, and connects development to production. This is commonly referred to as LLMOps. While there are platforms that can help with automation, you should design your ideal workflow before committing to a third-party solution.

Here are some key components to consider include:

*   **Versioning**: Store prompts, evaluation metrics, and test inputs in version control. Treat them as code to ensure reproducibility and clear change history.
*   **Automated batch evaluations**: Use workflows (such as GitHub Actions) to run evaluations on each prompt update and generate comparison reports.
*   **CI/CD for prompts**: Gate deployments with automated checks, such as deterministic tests, LLM-as-judge scores, or guardrails, and block merges when quality regresses.
*   **Production logging and observability**: Capture inputs, outputs, errors, latency, and token usage. Monitor for drift, unexpected patterns, or spikes in failures.
*   **Feedback ingestion**: Collect user signals (thumbs, rewrites, abandonment) and turn recurring issues into new test cases.
*   **Experiment tracking**: Track prompt versions, model configurations, and evaluation results.

### Iterate with small, targeted changes

Prompt refinement typically begins with improving your prompt's language. This could mean making instructions more specific, clarifying intent, or removing ambiguities.

Be careful not to overfit. A common mistake is to add overly narrow rules to patch model issues. For example, if your title generator keeps producing titles that start with _The Definitive Guide_, it may be tempting to explicitly forbid this phrase. Instead, abstract the issue and adjust the higher-level instruction. This could mean you emphasize originality, variety, or a specific editorial style, so the model learns the underlying preference rather than a single exception.

**Tip:** You can use LLMs to help you write and improve your prompts. For examples of automated prompt optimization, check out [Vertex AI's Optimize prompts](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-optimizer).

Another pathway is experimenting with more [prompting techniques](/learn/ai/prompt-engineering) and combining these efforts. When you choose a technique, ask yourself: is this task best solved through analogy (few-shot), step-by-step reasoning (chain-of-thought), or iterative refinement (self-reflection)?

When your system goes to production, your EDD flywheel shouldn't slow down. If anything, it should accelerate. If your system processes and logs user input, these should become your most valuable source of insight. Add recurring patterns to your evaluation suite, and continuously identify and implement the next best optimization steps.

**Tip:** It's possible you've designed a system where user input is inaccessible. In this case, seek other forms of feedback to continue your evaluation.

## Your takeaways

Evaluation-driven prompt development gives you a structured way to navigate the uncertainty of AI. By defining your problem clearly, building a tailored evaluation system, and iterating through small, targeted improvements, you create a feedback loop that steadily improves model outputs.

### Resources

Here are some recommended readings if you want to implement LLM-as-judge:

*   [Compare LLM capability with summarization](/articles/test-llm-capabilities).
*   Read Hamel Husain's guide to [using LLM-as-a-Judge](https://hamel.dev/blog/posts/llm-judge/).
*   Read the paper: [A Survey on LLM-as-a-Judge](https://arxiv.org/abs/2411.15594).

If you're interested in further improving your prompts, read more about [context-aware development](https://developers.googleblog.com/architecting-efficient-context-aware-multi-agent-framework-for-production/). This is best done by a machine learning engineer.

## Check your understanding

What is the primary goal of evaluation-driven development?

To replace all human testing with automated unit tests.

That's incorrect.

To systematically monitor and optimize the trade-off between prompt brevity and effectiveness using a repeatable process.

Great job, that's correct!

To increase the latency of the application to ensure higher accuracy.

That's incorrect.

To ensure the model passes standard public benchmarks like MMLU.

That's incorrect.

Why use larger models to evaluate a client-side system?

Larger models are best for assessing tone and creativity.

That's incorrect.

They act as a human-in-the-loop to manually score every result.

That's incorrect.

They are great at validating deterministic outputs, like validating JSON structure or character counts.

Great job, that's correct!

What is a potential pitfall of using LLM-as-a-judge for evaluation?

It is too slow compared to human review.

That's incorrect.

It requires no setup or prompting.

That's incorrect.

It can perpetuate and reinforce the biases and knowledge gaps of the model.

Great job, that's correct!

It cannot process text outputs.

That's incorrect.

Which component is part of a recommended automated evaluation pipeline?

Manual copy-pasting of prompts into a spreadsheet.

That's incorrect.

Versioning prompts, metrics, and test inputs as code.

Great job, that's correct!

Deleting logs to save space.

That's incorrect.

Ignoring user feedback to maintain consistency.

That's incorrect.

When choosing judges for your evaluation system, what is the main limitation of using human feedback?

Humans cannot assess subjective qualities like tone or clarity.

That's incorrect.

It is effectively the same as using "Code-based checks."

That's incorrect.

It provides the highest volume of data but with the lowest quality.

That's incorrect.

It does not scale well compared to automated methods.

Great job, that's correct!

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-01-29 UTC.