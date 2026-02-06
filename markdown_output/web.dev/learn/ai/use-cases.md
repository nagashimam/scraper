*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [AI](https://web.dev/learn/ai)

# Explore use cases Stay organized with collections Save and categorize content based on your preferences.

You're in a great position to find high-value opportunities for AI. You can evaluate both the technical feasibility of an idea and its user experience impact, two perspectives that must unite for AI features to succeed. You shouldn't build AI features because they're novel or impressive, but because they genuinely make life easier, faster, or more enjoyable for users.

This module describes a structured, iterative method for ideating, specifying, and prototyping AI use cases in your product.

## Understand the value of AI

The following AI opportunity tree defines the big categories of value that AI can provide:

![Opportunities are mapped to use cases.](/static/learn/ai/use-cases/images/use-cases.jpg)

Figure 1. For each category of AI value, there are multiple use cases. For example, in the convenience category, you could build AI-powered smart filters or autocomplete.

We've listed categories of value to frame your solutions. As you move through the list, the complexity, risk, and potential for user impact tends to increase:

*   **Insights**: Improve decision making.
*   **Convenience**: Remove friction.
*   **Automation**: Replace repetitive work.
*   **Augmentation**: Assist users with complex or creative tasks.
*   **Personalization**: Adapt the product to an individual's needs and preferences.

First, try to solve lower-impact use cases. For example, gather better product insights with an internal AI system, so you can improve your product from the inside. Then, audit your existing UX debt and use AI to reduce friction and cognitive load for your users. As you gain confidence and experience, you can move towards more complex use cases and increase AI exposure.

That said, you may discover high-impact opportunities, such as light touches of personalization, that are surprisingly accessible, low-risk, and meaningful.

## Identify opportunities in your product

To determine the right idea, you should have a good sense of who your users are. Work with your UX team or [brush up on personas](http://figma.com/community/file/1119057572478437366/user-persona-template-google-ux-themed) to define who those users are. Take a [user-first (or people-first) approach](https://pair.withgoogle.com/guidebook/chapters/user-needs-and-defining-success), and map the AI opportunities you find to concrete use cases for your product.

**Note:** This is covered in more depth in [UX patterns](/learn/ai/ux-partterns).

These can be:

*   Motivated by explicit user needs or pain points.
*   Suggested by your team members or yourself. In this case, quick validation with users is essential to avoid the "AI for the sake of AI" trap.
*   Inspired by competitors, but do so with caution. The audience and context of your competitors can be different from yours. Validate early to test whether successful competitor initiatives carry over to your product.

For example, the following table has ideas for a flight booking website:

.web\_table-cell-info\_modal .modal-button .material-icons { margin: 0 0 0 4px; vertical-align: middle; color: #1a73e8; font-size: 1rem; } .web\_table-cell-info\_modal .modal-button:hover .material-icons { color:#c58af9; cursor:pointer; } #table-1 .table-heading { background-color: #e8eaed; }

<table id="table-1" class="fixed web_table-cell-info_modal vertical-rules alternating-odd-rows"><tbody><tr class="table-heading"><td><b>User journey</b></td><td><b>Deeper insights</b></td><td><b>Convenience</b></td><td><b>Automation</b></td><td><b>Augmentation</b></td><td><b>Personalization</b></td></tr><tr><td><b>Discover</b></td><td>Trend insights <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_trendinsights" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_trendinsights" class="devsite-dialog devsite-usecase_trendinsights-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-trend-insights" data-text="Why use AI for trend insights?" tabindex="-1">Why use AI for trend insights?</h3><p>Analyze market data to show popular and emerging search trends.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>Smart filters <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_smartfilters" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_smartfilters" class="devsite-dialog devsite-usecase_smartfilters-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-smart-filters" data-text="Why use AI for smart filters?" tabindex="-1">Why use AI for smart filters?</h3><p>Apply intelligent and contextual filters to narrow down search results efficiently.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>&nbsp;</td><td>&nbsp;</td><td>Personalized inspiration <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_personalized" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_personalized" class="devsite-dialog devsite-usecase_personalized-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-personalized-inspiration" data-text="Why use AI for personalized inspiration?" tabindex="-1">Why use AI for personalized inspiration?</h3><p>Provide tailored suggestions based on past behavior and preferences.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td></tr><tr><td><b>Explore</b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>Visual summaries <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_visualsummaries" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_visualsummaries" class="devsite-dialog devsite-usecase_visualsummaries-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-visual-summaries" data-text="Why use AI for visual summaries?" tabindex="-1">Why use AI for visual summaries?</h3><p>Generate concise, graphical overviews of complex data or options.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>Adaptive suggestions <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_adaptive-recs" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_adaptive-recs" class="devsite-dialog devsite-usecase_adaptive-recs-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-adaptive-suggestions" data-text="Why use AI for adaptive suggestions?" tabindex="-1">Why use AI for adaptive suggestions?</h3><p>As the user interacts with the options, dynamically adjust recommendations.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td></tr><tr><td><b>Decide</b></td><td>Predictive pricing <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_predictivepricing" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_predictivepricing" class="devsite-dialog devsite-usecase_predictivepricing-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-predictive-pricing" data-text="Why use AI for predictive pricing?" tabindex="-1">Why use AI for predictive pricing?</h3><p>Forecast the future price of a product or service to help with booking decisions.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>&nbsp;</td><td>&nbsp;</td><td>Reliability scoring <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_adaptive-recs" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_adaptive-recs" class="devsite-dialog devsite-usecase_adaptive-recs-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-reliability-scoring" data-text="Why use AI for reliability scoring?" tabindex="-1">Why use AI for reliability scoring?</h3><p>Assign a score to options based on historical performance and reviews.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>&nbsp;</td></tr><tr><td><b>Book</b></td><td>&nbsp;</td><td>Auto-complete forms <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_autocomplete" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_autocomplete" class="devsite-dialog devsite-usecase_autocomplete-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-auto-complete" data-text="Why use AI for auto-complete?" tabindex="-1">Why use AI for auto-complete?</h3><p>Automatically fill in user data to speed up checkout.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>Detect fraud <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_fraud-detection" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_fraud-detection" class="devsite-dialog devsite-usecase_fraud-detection-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-to-detect-fraud" data-text="Why use AI to detect fraud?" tabindex="-1">Why use AI to detect fraud?</h3><p>Identify and flag suspicious transactions or user behavior during the booking process.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td><b>Post-booking</b></td><td>&nbsp;</td><td>Smart notifications <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_notify" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_notify" class="devsite-dialog devsite-usecase_notify-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-smart-notifications" data-text="Why use AI for smart notifications?" tabindex="-1">Why use AI for smart notifications?</h3><p>Send context-aware, timely alerts about itinerary changes or related services.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>Proactive rebooking <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_rebook" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_rebook" class="devsite-dialog devsite-usecase_rebook-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-proactive-rebooking" data-text="Why use AI for proactive rebooking?" tabindex="-1">Why use AI for proactive rebooking?</h3><p>Automatically search and offer alternative options if a current booking is disrupted.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td><td>&nbsp;</td><td>Personalized upsell <a class="devsite-dialog-button modal-button" data-modal-dialog-id="usecase_upsell" aria-label="Why?"><span class="material-icons" aria-hidden="true" translate="no">info</span></a><div id="usecase_upsell" class="devsite-dialog devsite-usecase_upsell-dialog"><div class="devsite-dialog-contents"><h3 class="hide-from-toc" id="why-use-ai-for-personalized-upselling" data-text="Why use AI for personalized upselling?" tabindex="-1">Why use AI for personalized upselling?</h3><p>Offer relevant, higher-value add-ons or upgrades based on the user's current booking.</p></div><div class="devsite-dialog-buttons"><button class="devsite-dialog-close">Close dialog</button></div></div></td></tr></tbody></table>

At each step of the user journey, you can identify different opportunities to add value with AI.

## Shape your solution

By now, you've mapped several AI ideas along your user journey. The next step is to give them a shape and gain enough confidence so you can decide which ones to develop first. This is a team effort and is usually driven by the product manager. As a developer, your primary responsibility is to estimate the cost, effort, and risks of the planned AI solution.

### Specify your ideas

First, capture each idea in a quick, holistic spec. You can use the [AI system blueprint](/learn/ai/introduction) from our introduction. Typically, developers focus on the solution part, while the opportunity is specified by the product manager. This exercise gives everyone a shared basis for alignment and discussion before moving forward.

### Assess effort and cost

Next, evaluate how hard your idea is to implement. For example, adding smart filters might only require prompt-based parsing with an LLM API, which is fast to prototype and run and easier to adjust. By contrast, a personalized booking assistant would need custom data pipelines, booking APIs, and careful human-in-the-loop mechanisms, which is a much heavier lift.

Look at effort and cost across multiple dimensions:

*   **Data readiness**: Do you already have the data you need? How much cleaning, preprocessing, or labeling needs to be done to make it AI-ready?
*   **Model maturity**: Does a suitable pre-trained model already exist, or do you need to train one from scratch?
*   **Latency**: How fast should the model respond for the feature to feel seamless and helpful?
*   **Integration complexity**: How many systems need to connect? Is there backend, APIs, UI, or third-party tools? The more touchpoints, the higher the cost and risk.
*   **Operating cost**: How expensive is each model call or inference? Estimate monthly usage and budget for scaling. A feature that's "cheap" at the prototype stage can become costly once thousands of users are live.

Also, consider the hidden costs for the user. AI can introduce uncertainty and regular mistakes into your product, which most people don't like. If you implement client-side AI, these features run on the user's device, consuming bandwidth, storage, and energy. The feature must be valuable enough that users are comfortable with the cost.

By assessing effort early, you can focus on high-value, low-friction wins and defer the more complex ideas until your data, infrastructure, and experience mature.

### Estimate failure modes

Sometimes, the model makes mistakes and features fail to perform as expected. You need to communicate with your users what's happening and where the failure occurred, so they know if they are able to change their input to get the results they seek.

For example, say you run a travel agency. Your company wants to offer personalized inspiration for travelers. Your users have asked for a tool to do this on their own, and your product team pushes to implement it. However, you know that personalization requires many signals from users about their interests, and you haven't set up a database that collects such signals. This leads to unsuccessful personalization that offers irrelevant inspiration, which leads to users abandoning the feature. Your understanding of personalized data availability should have informed your team's value estimation.

Here are additional critical AI failure modes to consider:

*   **Hallucination**: The model generates outputs which appear plausible, but aren't real (such as making up a flight that doesn't exist).
*   **Bias**: The model exhibits or amplifies unfair generalizations based on the training data, leading to discriminatory or inequitable outcomes. For example, the model may assume users want first class flights and others want economy based on their perceived gender or race.
*   **Cold-start problem**: The system cannot provide value for new users or items due to a lack of initial data, as indicated in the personalized travel tool example.
*   **Performance degradation**: The model's accuracy degrades over time as the real-world data evolves and moves away from the original distribution, also known as model drift.

## Prototype

Your inputs on cost, effort, and failure modes will have low fidelity initially. To gain confidence, the best validation for a specific AI feature is to prototype it. Prototyping lets you quickly test core technical assumptions (data readiness, latency, accuracy) before committing to a full build. Especially with a new, not fully explored technology like AI, you learn faster by building than by researching and analyzing.

With AI-driven code generation tools, such as [Vertex AI](https://cloud.google.com/use-cases/ai-code-generation) and Replit, you can radically speed up and de-risk your prototyping process.

Adopt this mindset: ship something small, observe how it behaves, and refine it continuously.

**Caution:** When adding new AI features to an existing product, prototypes can help you validate feature value. It's critical you consider how the feature will integrate with your codebase and test to ensure user safety. Never copy-paste an untested, vibe-coded prototype into your production application.

Apply the following best practices:

*   **Build end-to-end early**. Test the whole flow as defined in your AI system blueprint (data, intelligence, user experience), not just model accuracy. This build should reflect every part of your user's experience with AI, but it doesn't have to represent every application feature.
*   **Start with shortcuts**. Use APIs and pre-trained models to validate value fast.
*   **Log everything**. Track inputs, outputs, and user edits to see common failure modes and evaluate potential showstoppers.
*   **Test with real data**. Early tests should capture natural, messy user behavior.
*   **Add feedback and control mechanisms**. Make it easier for users to flag errors or adjust outputs, and let users confirm or correct results.

In most cases, prototyping happens alongside your assessment and [specification work](#shape_your_solution).

## Your takeaways

You learned how to turn abstract AI potential into concrete, high-value product ideas. As a developer, your advantage lies in connecting technical feasibility with user experience. You explored how AI can create value across different categories, mapped these opportunities to your product's user journey, and learned how to specify, evaluate, and prioritize them using structured frameworks.

Remember that AI succeeds through relentless iteration. Ship early, listen to your users and observe them, and refine fast. Every prototype is a step toward understanding how AI can increase the value and delight of your product.

## Resources

*   [Getting AI Discovery Right](https://towardsdatascience.com/getting-ai-discovery-right/), a guide to ideating, validating, and prioritizing your AI use cases.

## Check your understanding

Which category of AI opportunity involves assisting users with complex or creative tasks?

Automation.

That's incorrect.

Augmentation.

Great job, that's correct!

Convenience.

That's incorrect.

Deeper insights.

That's incorrect.

When assessing the effort and cost of an AI idea, what does "Integration complexity" refer to?

How expensive each model call is.

That's incorrect.

How fast the model responds to the user.

That's incorrect.

How many systems need to connect (backend, APIs, UI, third-party tools).

Great job, that's correct!

Whether a pre-trained model already exists.

That's incorrect.

What is the cold-start problem in the context of AI failure modes?

The model generates outputs that are plausible but factually incorrect.

That's incorrect.

The system cannot provide value for new users or items due to a lack of initial data.

Great job, that's correct!

The model exhibits unfair generalizations based on training data.

That's incorrect.

The model's accuracy degrades over time as real-world data evolves.

That's incorrect.

What is the recommended mindset for prototyping AI features?

Research and analyze for months before writing code.

That's incorrect.

Ship something small, observe behavior, and refine continuously.

Great job, that's correct!

Build the entire feature set end-to-end before testing.

That's incorrect.

Copy-paste untested prototypes directly into production.

That's incorrect.

Why is it important to keep a log when prototyping?

To track inputs, outputs, and user edits to see common failure modes.

Great job, that's correct!

To ensure you have enough data to train a large language model from scratch.

That's incorrect.

To increase the storage costs of the project.

That's incorrect.

To monitor the performance of the developer team.

That's incorrect.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-01-29 UTC.