*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [AI](https://web.dev/learn/ai)

# Glossary and concepts Stay organized with collections Save and categorize content based on your preferences.

The primary source of truth for many machine learning (ML) terms is the [ML Glossary](https://developers.google.com/machine-learning/glossary). Rather than duplicating their work, we're only including commonly cited words and terms that aren't in the ML Glossary.

## AI system blueprint

When building new AI features or products, define your AI system blueprint, mapping the opportunity for AI to how you'll build a solution. You should define:

*   Why are you building? What AI use cases are available and what value do they bring to users?
*   How will your application work?
*   How can you ensure each part of your system is developed responsibly?

Read about the blueprint in the [introduction to AI on the web](/learn/ai/introduction).

## Compound AI architecture

_Compound AI architectures_, combinations of one or more models and other components such as databases, APIs, and guardrails that work together to deliver robust, context-aware behavior

## Context engineering

_Context engineering_ is the process of dynamically selecting the most relevant information (tokens) for a given request to maximize the probability of receiving a valuable outcome.

## Data drift

_Data drift_ occurs when the training data no longer is representative of reality. User behavior, data collection, and the data environment can change at any time, and this can lead to a reduction in model performance.

## Deterministic software

When given a particular input, deterministic software always follow the same series of steps to lead to an identical output. These are the most reliable types of software, as they are predictable and run efficiently.

Artificial intelligence is not deterministic. The pathways and results can vary widely, even with identical prompts.

## Evaluation-driven development (EDD)

The [_Evaluation-driven development (EDD)_](/learn/ai/evaluate-prompts) framework offers a repeatable, testable process for improving outputs in small and confident steps, catching regressions, and aligning model behavior with user and product expectations over time.

Think of it as [test-driven development (TDD)](https://martinfowler.com/bliki/TestDrivenDevelopment.html), adapted for the uncertainty of AI. Unlike deterministic unit tests, AI evaluations cannot be hard-coded because outputs, both well-formed and failing ones, can take many different forms that you can't anticipate.

## Generative AI

[_Generative AI_](/learn/ai/generative) represents a machine learning system that can create content. This means the model could write text, generate images, produce code, or even design full user interfaces.

## Governance

We cover three dimensions of AI governance:

*   _Privacy_: Handle data responsibly, explain what's collected, and minimize what leaves the browser.
*   _Fairness_: Check your models for discriminatory behavior (bias), and build loops that let users flag issues.
*   _Trust and transparency_: Design your system for transparency and calibrated trust, so users continue benefiting from it despite uncertainty and potential mistakes.

The last dimension, security, is an important dimension of AI governance. We intend to provide more about security in future modules.

In the meantime, we recommend you read [Google's Secure AI Framework (SAIF)](https://safety.google/cybersecurity-advancements/saif/) and the [Google Security Blog](https://security.googleblog.com/search/label/AI%20Security).

## Model

_Models_ are the most important backbone of an AI system. As its core, a model is a set of parameters and structure that support a system making predictions. How the model operates can differ based on training style (supervised or unsupervised) and model purpose (predictive or generative).

## Model card

[_Model cards_](https://modelcards.withgoogle.com/explore-a-model-card) are structured overviews of how a model was designed and evaluate. They serve as key artifacts supporting Google's [approach to responsible AI](http://g.co/AI/ProgressUpdate).

## Model weights

[_Model weights_](https://developers.google.com/machine-learning/glossary#weight) are numerical values that determine the importance of certain information. These value are continuously updated in model training, until an ideal weight is set. You can modify the weights of open models, such as [Gemma](https://ai.google.dev/gemma/docs/tune).

## Opportunities for AI

There are a number of categories to frame AI solutions:

*   **Insights**: Improve decision making.
*   **Convenience**: Remove friction.
*   **Automation**: Replace repetitive work.
*   **Augmentation**: Assist users with complex or creative tasks.
*   **Personalization**: Adapt the product to an individual's needs and preferences.

This is covered at-length in [Explore use cases](/learn/ai/use-cases).

## Platforms

[_Client-side AI_](/learn/ai/client-side) runs directly in the browser. This means data can stay private, on the user's device, and there's no network latency. However, to perform well, client-side AI needs highly specific, well-defined use cases.

_Server-side AI_ includes models hosted and running inference in the cloud. This is highly capable and scalable, but can be more expensive and requires a network connection.

## Predictive AI

[_Predictive (or analytical) AI_](/learn/ai/predictive) is a collection of algorithms that help you understand existing data and predict what's likely to happen next. Based on historical patterns, predictive AI models learn to forecast outcomes, surface insights, and drive smarter decisions.

## Prompt engineering

_Prompt engineering_ is the act of writing and re-writing prompts to produce outputs that align with your users' expectations. A well-written prompt:

*   States how the LLM should build its response.
*   Consists of multiple components that can be versioned, tested, and improved over time.
*   Can act as a shared artifact for collaboration across teams.

There are a number of techniques you can take in prompt engineering, which you read about in the [Prompt engineering module](/learn/ai/prompt-engineering).

## Prompt types

Think of a prompt type as the prompt audience. You can read more about this in the [Prompt engineering module](/learn/ai/prompt-engineering).

### System prompt

The _system prompt_ is provided by the application developers and defines the model's overall behavior. It can set the model's role ("You're a writing assistant"), expected tone, output format (such as a strict JSON schema), and any global constraints. This prompt remains stable across requests.

### User prompt

The _user prompt_ contains the immediate request that leads to an output. The user provides some form of input variables (such as a text selection or expected style), and requests a specific task. For example, "Generate three titles for this post," "Continue this paragraph," or "Make this more formal."

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-01-29 UTC.