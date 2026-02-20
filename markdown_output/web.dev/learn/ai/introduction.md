Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [AI](https://web.dev/learn/ai)

# Introduction to AI on the web Stay organized with collections Save and categorize content based on your preferences.

![](/static/learn/ai/introduction/images/ai-solution-blueprint.jpg)

Figure 1: The AI system blueprint maps the core components of an AI system.

When developing with AI, you can get lost in model choice, infrastructure, and code. You might forget about the big picture.

In this module, we introduce a blueprint that you can use to map any new AI feature or product:

*   Why are you building? What value does your AI use case bring to users?
*   How will your application work?
*   How can you ensure each part of your system is developed responsibly?

To understand how this blueprint works, imagine you work on an ecommerce site, _Example Shoppe_. Your competitors are busy bolting on generic chatbots, but they've seen little traction. You want to provide a better experience for your users, and decide to [enhance your search experience](/articles/ai-rag-search), without disrupting the core user flows.

With an AI-powered upgrade, shoppers could type natural language phrases, such as "red trail runners for winter," and get relevant results they might have missed with a keyword-based search.

**Note:** You can expect to see this blueprint throughout the Learn AI course, for different opportunities and solutions. Some of these examples recur across multiple modules.

## Opportunity

Every AI project should begin with a clear use case: a user task or problem that is worth solving with AI. AI introduces uncertainty and other risks into your application, so you should only use it if the problem cannot be addressed in a conventional, deterministic way.

### Use case

For _Example Shoppe_, search is a major function that connects users and the products they are looking for. Users often abandon searches when they fail with typos, synonyms, or vague queries. You know this from your own analytics, but also from [external research](https://cloud.google.com/blog/topics/retail/search-abandonment-impacts-retail-sales-brand-loyalty). With more flexible and intelligent search, the journeys of your users can be made more efficient and delightful.

Other examples of AI use cases include:

*   On a news site, you can reduce cognitive load by summarizing news in a structured way.
*   On a publishing platform, you can improve accessibility by automatically suggesting alt texts and captions.
*   As a cloud service provider, you can reduce support requests through smarter documentation search.

Discovering high-value opportunities is key to success with AI. As found in a [report by RAND Corporation](https://www.rand.org/pubs/research_reports/RRA2680-1.html), choosing the wrong opportunity is one of the main reasons why AI projects fail.

### Value

Value has two sides: benefits to users and benefits to the product or business. In most healthy and responsible products, these are aligned: when users succeed, the business grows too. For Example Shoppe, AI-enhanced search creates value by helping users find the right products faster, with less friction. This increases product discovery, conversion rates, and long-term customer satisfaction.

Sometimes, value can be intangible, such as user delight and trust. Especially at the beginning, it's best to find a way to quantify the value proposition. This gives you a solid basis to prioritize, communicate impact, and convince stakeholders. Even rough estimates can guide decisions and make success measurable.

**Tip:** In [Exploring AI use cases](/learn/ai/use-cases), you learn a structured approach to ideate, shape, and prioritize use cases for your product.

## Solution

After clarifying why you are adding AI to your product, think about _how_ you'll implement it. Take a look at the major building blocks of an AI solution.

### Data

Data is the fuel of AI. Ultimately, your AI system is bound by how well it can learn from your data. Poor, incomplete, or misaligned data lead to weak results and frustrated users, no matter how fancy the model or infrastructure. Conversely, high-quality data and a [well-designed data flywheel](/learn/ai/evaluation-driven-development) are value drivers that can also become a part of your product's differentiation.

Data comes in different shapes and modalities. For our AI-powered search example, useful data might include:

*   **Structured data**: product titles, colors, sizes, categories, and availability.
*   **Unstructured data**: product descriptions, user reviews, and FAQs.
*   **Synonym lists**: term relationships, such as "sneakers" equal "running shoes."
*   **User signals**: clicks, dwell times, add-to-cart actions, and purchases are all signals that help models learn what users actually find relevant.
*   **Visual data**: product images that can be embedded into a visual similarity index, allowing users to search by photo or discover visually similar items, even without matching text.

That may seem like a lot of data, but don't worry. Start small, with a few data sources that offer the strongest signal-to-noise ratio, then expand as your system matures.

In most cases, your raw data likely isn't ready to be ingested by a model. It needs to be cleaned, preprocessed, and organized into an AI-friendly format. For example, user signals can be transformed into action sequences, while unstructured product descriptions can be encoded as semantic embeddings.

**Tip:** Historically, it was important to collect relatively large quantities of data to train AI models. Today, many AI systems are built around pre-trained models. Your data quality is often more important than the quantity, and quality should be the focus of your data effort.

Data can be used at different stages in the AI lifecycle:

*   In training or fine-tuning, it's used to teach the model patterns and relationships.
*   In evaluation, you can use it to test quality, accuracy, and relevance.
*   In production, you can use it to track drift and collect feedback from real-world usage.

In short, data isn't just an input, but a living asset. Managing data well is one of the most valuable skills a web developer can build when working with AI.

### Intelligence

The intelligence layer is where AI distills and creates value. Often, there's a model at its core, but most systems are more complex. For Example Shoppe, the intelligence layer makes sense of user queries using a collection of methods:

*   **Named entity recognition** and **information extraction** to extract attributes such as `color=red` or `season=winter`.
*   A **sentence embedding** model to create semantic representations of user queries and available products.
*   **Semantic search** to retrieve relevant results.
*   A small, customized **re-ranking model** to accurately rank results for relevance.

Intelligence is arguably the most exciting part of your AI system, but it's also the most hyped component. New models drop every week, often surrounded by superlative marketing claims.

Here are two key factors to consider:

*   AI isn't limited to generative AI and large language models (LLMs). Many tasks are better served by [smaller, specialized models](/articles/right-sized-ai) that are faster and cheaper to deploy and maintain.
*   Real-life AI systems rarely rely on a single monolithic model. Instead, they use [_compound AI architectures_](/learn/ai/glossary), combinations of one or more models with additional components, such as databases, APIs, and guardrails. These work together to deliver robust, context-aware behavior.

Instead of chasing the latest hit on the leaderboards, select the intelligence that's a good fit for your problem, which lets you adapt as your product and business evolve. In future modules, you get a foundation in the most common AI techniques of the moment: [predictive AI](/learn/ai/predictive) and [generative AI](/learn/ai/generative). You'll also learn to evaluate and select the right technical approach for your system.

### User experience

The user interface is the channel that delivers AI value to your users. Deterministic software interfaces are certain and predictable: the same input always produces the same output. With AI, you introduce uncertainty. Two nearly identical queries might yield completely different results, and even the most powerful AI models are known for hallucinating and making other kinds of mistakes.

You must be extremely deliberate about this shift, especially if you add AI to an existing product. Open-ended chatbots are fun, but complex and risky in practice.

In the beginning, aim to minimize the uncertainty and risk exposed to users. For example, in Example Shoppe's case, the AI-powered search can be quietly integrated into the existing interface. Users continue typing natural-language queries, and they receive better-quality search results.

Even though the AI feature works in the background, it's a good practice to reinforce transparency. For example, you could add a notice and short explanation of how the system curates these results.

![Example Shoppe's AI-powered search for red running shoes.](/static/learn/ai/introduction/images/example-shoppe-1-runners.jpg)

Figure 2. Example Shoppe tells the user: "AI-enhanced search is on." They list AI-detected attributes from the search string, such as "trail," "winter," and "Red", then displays the most relevant products.

In [UX Patterns](/learn/ai/ux-patterns), you learn how to balance AI exposure, capabilities, and risk in the user experience of your product.

## Governance

AI systems must be built responsibly. You should build a system that protects user privacy, mitigates bias, provides transparency, and meets all relevant legal standards. Good governance isn't just for compliance—it's a design principle central to securing user trust and adoption.

In Example Shoppe's AI-powered search, governance starts with safeguards built into the product:

*   **Privacy**: Personalization data stays local unless users explicitly opt-in. It can be toggled on or off at any time.
*   **Fairness**: Search results are audited to ensure balanced exposure across sellers.
*   **Trust and transparency**: Example Shoppe offers an opportunity to learn why a result was given at the top of each search query.. This offers an opportunity to build trust with the users.
*   **Safety**: Restricted or unsafe queries (for example, prohibited items) are filtered or blocked through guardrails.
*   **Recourse**: Users can quickly dismiss AI suggestions, report bad AI results or interactions, and revert to a keyword-only search, if the AI enhancements aren't helpful.

To build AI responsibly, you must take ownership of your deployment process. Design thoughtful guardrails and feedback loops. You shape the safety and reliability of the experience, while setting the expectations for its use and limits. While you cannot control the output completely, you should be ready to address any concerns.

You learn more about the core aspects of AI governance in [Build responsibly with AI](/learn/ai/responsibility), equipping you with practical tools to build sustainable and trustworthy AI applications.

## Your takeaways

The AI system blueprint can help you gain clarity and alignment for any AI project you participate in. We walked through each element of the blueprint at a high level, and as you continue reading, you'll learn more about each step.

![](/static/learn/ai/introduction/images/exampleshoppe-productsearch-mini.jpg)

Figure 3: The AI system blueprint for _Example Shoppe_'s enhanced product search. [Open the full-size diagram](/static/learn/ai/introduction/images/exampleshoppe-productsearch.jpg).

You can expect to see this blueprint again for different examples, with certain layers explained in greater depth.

## Check your understanding

According to the AI system blueprint, which three core perspectives should be considered when mapping a new AI feature?

Models, Infrastructure, and Code.

That's incorrect.

Opportunity, Solution, and Governance.

Great job, that's correct!

Speed, Accuracy, and Cost.

That's incorrect.

Backend, Frontend, and Database.

That's incorrect.

When does an opportunity warrant using AI as the solution?

You should use AI for every problem to modernize the tech stack.

Nope, there are many problems that humans solve better.

You should only use AI if the problem cannot be addressed in a conventional, deterministic way.

Great job, that's correct!

You should focus on replacing all human tasks with automation.

That's incorrect. There are many things that humans are better able to do than AI.

You should prioritize the solution architecture before defining the user problem.

Not quite.

Which of the following best describes "quiet integration" in AI user experience?

Seamlessly enhance existing features, such as smarter search or filter chips.

Great job, that's correct!

Creating a chatbot.

While it's possible a chatbot could be quietly integrated, you have to do more.

Hide that features are built with AI, so no one knows.

That's incorrect.

Relying solely on voice commands to interact with the application.

That's incorrect.

What is a key design principle to build user trust?

Hide all failure modes to maintain the illusion of perfection.

Definitely no.

Ensure the model never makes a mistake.

Unfortunately, you can't do this. That's incorrect.

Design for transparency and calibrated trust, acknowledging uncertainty.

Great job, that's correct!

Prevent users from reporting bad results to avoid negative feedback.

That's incorrect. You should always support user feedback, even if it's negative.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-01-29 UTC.