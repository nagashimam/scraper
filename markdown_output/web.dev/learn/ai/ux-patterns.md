Chrome is back at Google I/O May 19-20! [Register now](https://io.google/2026/?utm_source=web&utm_medium=embedded_marketing&utm_campaign=web-dev&utm_content=)

*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [AI](https://web.dev/learn/ai)

# Design AI user experiences Stay organized with collections Save and categorize content based on your preferences.

From a user's perspective, AI systems are inherently uncertain. They can produce inconsistent results and make regular mistakes. The user interface offers many opportunities to absorb, filter, and reduce frustrations caused by AI limitations. As a developer, you play a central role in shaping AI user experiences because you have deeper insight into how and where an AI system is likely to fail.

One key design consideration is how much control the users have over AI. Some [opportunities](/learn/ai/use-cases) are invisible to users, while others have explicit interaction. Greater exposure means more flexibility, but also more risk and complexity that have to be managed.

In this module, we learn best practices for designing user experience (UX) patterns for three types of exposure: background, constrained, and open-ended. For each type, we highlight how technical and architectural choices affect the AI system's user experience.

## Background AI

AI can be used to subtly augment an existing experience without introducing new features. This minimizes disruption and failure potential. In this case, responsibility for usefulness, reliability, and graceful degradation lies entirely with the product. Users don't need to learn how the AI works, or even know that AI is involved, to benefit from it.

Background AI is most appropriate when:

*   The task is low-risk.
*   User control wouldn't meaningfully improve outcomes.
*   The product can still provide its core value, even if the AI feature fails or is unavailable.

There are many examples of background AI all over the web, from spam filters to entertainment recommendations, or even complex examples, like [BILIBILI's bullet-stream comments](/case-studies/bilibili-web-ai-improvements). Some of these features, you may not even think of as "AI."

### Example: AI-powered review summaries and highlights

Remember Example Shoppe? We've shared two system blueprints so far, for different AI features, including a [customer support feature](/learn/ai/platforms#analyze_trade-offs) and [enhanced product search](/learn/ai/introduction#use_case). Now, we're introducing a third feature: review summaries. Take a look at the [AI system blueprint](/static/learn/ai/ux-patterns/images/exampleshoppe-reviews.jpg).

Product pages often contain hundreds of reviews. For users, it can be difficult to evaluate the characteristics that actually matter to them.

You can use AI to offer recurring themes within their searches to provide personalized review highlights and summaries. In our example interface, the user is looking for headphones, so themes of sound quality and battery life are highlighted. This reduces cognitive load and can lead to faster purchase decisions.

![Example Shoppe's review listings.](/static/learn/ai/ux-patterns/images/example-shoppe_reviewux.jpg)

Figure 1. The user has searched Example Shoppe for wireless headphones. The product page also highlights recent searches, AI-detected interests, and customer reviews. The review summary is personalized with these interests, as well as other interests that may be relevant. This summary sits on top of the verified customer reviews and looks distinct, as to not be confused with an individual review.

As summaries are unique for each person, you should prioritize privacy and speed when [choosing your platform](/learn/ai/platforms#choose_an_initial_platform). You may want to choose built-in AI and the Summarizer API, so computation happens directly on the user device.

### Best practices

Observe the following guidelines so your AI feature seamlessly blends into the existing user experience:

*   **Provide lightweight transparency**: When AI transforms or aggregates user-generated content, subtle cues set your users' expectations. You can use neutral labels like "Summary" or "Key insights," and add progressive disclosure, through tooltips or other UI elements.
*   **Allow opt-out**: People have different attitudes towards AI. Some may react to AI as intrusive, overwhelming, or annoying. Provide a clear path to disable these features.
*   **Be mindful of wording**: Language is an important part of any user experience, including AI-generated text. In our example, summaries should reflect trends, not claims. Add rules to your system prompt to reduce or remove overly confident language in the summary.
*   **Design a graceful fallback**: When possible, provide value without AI. If the summary is unavailable for technical reasons, such as an unavailable model, the system should still offer unsummarized reviews. Once the model is downloaded, your application can automatically expose the new summary.
*   **Minimize disruption during the setup**: The initial download of a client-side model can create friction. Demonstrate value of the feature first. You could add a limited, server-side fallback or move the download to the end of the user journey, so interruption is minimal. Proper timing and context building help align your product with the user's priorities.

## Constrained AI

While background AI runs automatically, constrained AI features are explicitly triggered by the user, often with a link or button. You determine the task, intent, constraints, and output format within a system prompt. Unlike with an open-ended prompt cursor, users have limited to no options outside of starting the task and receiving an output. The system retains predictability by tightly scoping what the AI is allowed to do.

Just as with background AI, constrained AI features pair well with client-side models that are customized for the specific task.

### Example: Title generation

Headline generation can be a particularly challenging task. BlogBuddy uses AI to help writers offer thoughtful, contextual headlines, with minimal effort. Review the [AI system blueprint](/learn/ai/generative#define_the_opportunity) for this feature.

The user can click **Show Titles** to produce multiple drafts for evaluation and refinement.

![BlogBuddy's editor, featuring a personal essay.](/static/learn/ai/ux-patterns/images/blogbuddy-showtitles.jpg)

Figure 2. BlogBuddy has a content editor with several AI-powered actions.

![BlogBuddy has 3 example titles to choose from.](/static/learn/ai/ux-patterns/images/blogbuddy-showtitles-suggestions.jpg)

Figure 3. Once selected, the Show Titles button provides relevant titles, based on the blog content.

We walked through how this could be implemented with the Prompt API in [Prompt engineering](/learn/ai/prompt-engineering). Build a system prompt that encodes the task, stylistic constraints, and the output structure. Only the blog post content is dynamically passed from the UI. With client-side implementation, the feature is optimized to iterate with no setup cost.

**Tip:** Consider a server-side implementation if you need more advanced AI capabilities. For example, if your users are generating titles for scientific or medical journals, they may need deeper domain expertise.

### Best practices

Your goal is to nudge users to use new features. To do so, demonstrate value and give them control over the outcome:

*   **Communicate clarity and confidence**: Clear action labels are always preferable to generic language, such as "Ask AI." Your user should be able to intuit what's happening, beyond _how_ it happens. If your feature latency is low, add labels that convey the result is already available. For example, **Show Titles** instead of **Generate Titles**.
*   **Keep the user in the loop**: Add light cognitive friction to keep users alert. By offering multiple choices, you can prevent users from feeling stuck with a result they may not like. Users should be able to explicitly accept or edit results before it's saved.
*   **If possible, prepare the result beforehand**: Especially for client-side tasks, consider precomputing the result, so it's available immediately.
*   **Support fast iteration**: Regeneration should be easy, reversible, and cheap. Users should have the option to undo their actions. Collect these feedback signals so you can fine-tune the feature for future runs.
*   **If needed, provide finer-grained controls**: Additional structured elements such as tone tags, length selectors, or preset styles can be used to refine results. In many cases, the need for additional control emerges over time, as user confidence and requirements evolve. Set up feedback loops that allow you to track these developments.

![BlogBuddy finer grain title generation.](/static/learn/ai/ux-patterns/images/showtitles.jpg)

Figure 4. You could add dropdowns to modify the tone, length, and style of headings, generated by BlogBuddy.

**Note:** Check out [Nykaa's fashion application](https://www.nykaafashion.com/image-search) to see constrained AI for image input. Take a picture of yourself and get personalized recommendations from their product catalog.

### How to choose between background and constrained AI

![](/static/learn/ai/ux-patterns/images/background-titles.jpg)

Figure 5. BlogBuddy could have AI-generated titles display when the user clicks into the title input field.

Some features can be implemented either as background or constrained AI, depending on how and when you surface them. This distinction is impacted by visibility, cognitive load, and timing, rather than available capabilities. For example, instead of requiring an explicit button click, titles could be proactively prepared in the background, while the user is writing. When the user focuses the title field, you can present suggestions.

This approach works best when:

*   Inputs required by the feature are available by default
*   The number of AI-powered features is small
*   The cost of precomputation is low
*   Suggestions can be integrated without distracting the user from their task

In contrast, constrained AI is preferable in products with multiple AI features or actions. Explicit triggers help avoid unnecessary computation, and give users a stronger sense of intent and agency.

## Open-ended AI

Open-ended AI gives users direct control over an AI system's behavior with free-form input. Instead of triggering a pre-determined action, users can provide context in natural language. Once submitted, the AI system interprets intent, adds missing context, and makes its best guess about what to do next.

Inputs are highly individual and often unpredictable, and your AI system needs to be able to handle this variability. This type offers the highest flexibility, but also the highest risk to user experience:

*   Ambiguous or incomplete user input
*   Unpredictable outputs
*   Higher likelihood of incorrect or misleading responses
*   Increased risk of overtrust
*   Attempts to compromise the system, for example, by making it generate inappropriate content

**Tip:** Many teams start with an open-ended user experience. If you're new to AI, we recommend you start with background or constrained AI features. You can gradually expand capabilities, as users request variability.

### Example: AI-powered customer support agent

For _Example Shoppe_, customer support spans a wide range of issues: order tracking, returns, product questions, delivery problems, and edge cases that don't fit clean workflows. Refresh your memory of the [AI system blueprint](/learn/ai/platform#analyze-trade-offs), from the Platform module.

After adding constrained AI features for the most common actions, your interface may be crowded. Instead, an open-ended AI support agent can provide flexibility.

*   Resolve common issues quickly.
*   Reduce wait times and support costs.
*   Provide immediate assistance across many topics, without complex support flows.

The support agent's value lies in handling variability at scale. Ultimately, you need to build a system that can handle these inputs responsibly. While you hope and expect users to use their best judgement and [calibrate trust](/learn/ai/responsibility), you may be liable for incorrect responses offered by the model.

Users interact open a chat with the agent, asking, "Where is my order?" or "I was charged twice—can you help?" The agent interprets intent, asks clarifying questions, retrieves relevant information, and proposes next steps or actions.

![](/static/learn/ai/ux-patterns/images/shoppe-pre-interaction.jpg)

Figure 6. An open-ended customer support agent accepts any user input. It can guide users through predefined prompt suggestions. [View this image full-size](/static/learn/ai/ux-patterns/images/shoppe-pre-interaction.jpg).

![](/static/learn/ai/ux-patterns/images/shoppe-interaction.jpg)

Figure 7. Even in open-ended UX, structured elements, such as clickable order IDs, can reduce mistakes. [View this image full-size](/static/learn/ai/ux-patterns/images/shoppe-interaction.jpg).

Most open-ended AI systems rely on server-side models. These can be combined with other components, like databases, external tools, and business logic, to form a compound AI system. You should to provide escalation paths to human support agents.

### Best practices

Focus on transparency, trust calibration, and control mechanisms:

*   **Guide users to express intent clearly**: Provide prompt suggestions ("I want to return an order") and suggested follow-ups to reduce ambiguity.
*   **Make system state and assumptions visible**: The agent should clearly communicate what it understands ("It looks like you're asking about order 12345.") and what information it's using.
*   **Ask before acting**: Before executing sensitive actions, such as returns, refunds, address changes, the agent should summarize the action and request user confirmation.
*   **Design for verification and correction**: Users should be able to correct misunderstandings, rephrase requests, or rewind the conversation, without starting over.
*   **Combine with constrained AI features**: Too much back-and-forth conversation may discourage users. Add structured elements as shortcuts. For example, an inferred order number can be presented as a clickable element that allows the user to search for, select, or replace it, rather than requiring them to rephrase the request in text.
*   **Surface uncertainty and limitations**: The agent should admit uncertainty, signal missing information, and gracefully escalate to a human when confidence is low.

This type of AI experience requires your users to evaluate responses critically, and understand when to escalate.

**Tip:** Check out [**Generative UI**](https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/), a vision for future user experiences where content, functionality, and visual design adapt to every new interaction of the user. For example, [A2UI](https://a2ui.org/) lets agents build interfaces in real-time, based on context and user interactions.

## Key takeaways

In this module, we reviewed different types of AI user experiences:

*   Background AI lets you add a additional value or delight to your existing user journey.
*   Constrained AI features can be used for specific, well-defined use cases that are best carried out with AI.
*   Open-ended AI is needed for domains with high variability. Only use open-ended if you are very confident in the technical performance of your system.

"As soon as it works, no one calls it AI anymore." —[John McCarthy](https://cacm.acm.org/blogcacm/john-mccarthy/)

The following table summarizes the recommended UX patterns for each type of AI:

<table><tbody><tr><td width="160"><strong>UX theme</strong></td><td><strong>UX pattern</strong></td><td><strong>Background</strong></td><td><strong>Constrained</strong></td><td><strong>Open-ended</strong></td></tr><tr><td rowspan="3"><strong>Transparency</strong></td><td>AI is clearly signaled</td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>Lightweight explanation of AI behavior</td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>System state &amp; assumptions visible</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td rowspan="2"><strong>Guidance</strong></td><td>Prompt suggestions</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>Structured input (tags, presets)</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td></tr><tr><td rowspan="5"><strong>Control</strong></td><td>Explicit AI trigger</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>Preview before applying output</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>Multiple alternatives</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td></tr><tr><td>Regenerate</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>Undo</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td rowspan="2"><strong>Trust calibration</strong></td><td>Conservative wording</td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>Confidence indicators</td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td rowspan="3"><strong>Management of risks and failures</strong></td><td>Intentional friction and review gates</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr><tr><td>Human handoff / escalation</td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span></td><td><span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span></td></tr><tr><td>Graceful fallback without AI</td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td><td><span class="material-icons" aria-label="Required" aria-hidden="true" translate="no">circle</span></td></tr></tbody><caption>Required patterns: <span class="material-icons" aria-hidden="true" translate="no">circle</span><br>Optional patterns: <span class="material-icons" aria-label="Optional" aria-hidden="true" translate="no">tonality</span><br>Not required: <span class="material-icons" aria-label="Not required" aria-hidden="true" translate="no">radio_button_unchecked</span>.</caption></table>

### Further readings

To keep learning about UX patterns, we recommend the following resources:

*   Read Google's [People + AI Guidebook](https://pair.withgoogle.com/guidebook/).
*   Microsoft's [HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/), particularly their [guidelines for human-AI interaction](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/).
*   [The Shape of AI](https://www.shapeof.ai/) by Emily Campbell.
*   Chapter 10 of [The Art of AI Product Development](https://www.google.com/books/edition/The_Art_of_AI_Product_Development/XHZmEQAAQBAJ).

## Check your understanding

What type of UX pattern is a video call background blur?

Background AI

Great job, that's correct! Often, background blur is implemented without requiring user interaction.

Constrained AI

Close, but not quite. While you could offer a toggle for background blur to make it a constrained feature, it doesn't need to be.

Open-ended AI

That's incorrect.

When should you use open-ended AI as a UX pattern?

User inputs are often unpredictable and personalized.

Great job, that's correct!

Users have a limited number of options to choose from in this feature.

That's incorrect. It's likely you need constrained AI.

You want your AI to run client-side.

That's incorrect. You likely need server-side AI to handle variability.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-01-29 UTC.