*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [AI](https://web.dev/learn/ai)

# AI governance: Build responsibly Stay organized with collections Save and categorize content based on your preferences.

Your design decisions directly shape the responsibility and safety of your AI system. For example, you decide how to select data sources, configure model behavior, or present AI outputs to users. These choices have real-world consequences for your users and your company.

In this module, we cover three critical dimensions of AI governance:

*   **Privacy**: Handle data responsibly, explain what's collected, and minimize what leaves the browser.
*   **Fairness**: Check your models for discriminatory behavior (bias), and build loops that let users flag issues.
*   **Trust and transparency**: Design your system for transparency and calibrated trust, so users continue benefiting from it despite uncertainty and potential mistakes.

For each topic, we explain how it manifests in different AI products. Then, we break it down across the three layers of your AI solution: [data](/learn/ai/introduction#data), [intelligence](/learn/ai/introduction#intelligence), and [user experience](/learn/ai/introduction#user-experience). You'll learn what to watch for, how to address issues, and how to maintain effective, lightweight governance.

**Note:** Security is another important dimension of AI governance, and we intend to provide more about this topic in future modules. In the meantime, we recommend you read [Google's Secure AI Framework (SAIF)](https://safety.google/cybersecurity-advancements/saif/) and the [Google Security Blog](https://security.googleblog.com/search/label/AI%20Security) for more on this topic.

## Privacy

You learned that real usage and interaction data is the [core of any AI system](/learn/ai/introduction). Data powers learning, evaluation, and continuous improvement. Good privacy practices allow you to keep that data safe, but also to give users control over their information.

**Tip:** Take our [Learn Privacy](/learn/privacy) course for pragmatic privacy techniques that can be applied to your AI system.

Privacy expectations vary widely depending on your product and audience. In consumer products, expectations tend to involve protecting individuals' personally identifiable information (PII), such as names, messages, and browsing behavior. In enterprise settings, the focus shifts toward data sovereignty, confidentiality, and intellectual property protection.

Sectors that affect people's livelihoods or well-being, such as healthcare, finance, and education, demand stricter privacy safeguards than lower-risk areas, such as entertainment.

Let's see how privacy can be managed across the different components of your AI system.

### Data

To continuously improve your AI system, you can collect data about user interactions, including inputs, outputs, feedback, and errors. This information can be reused for evaluation, model fine-tuning, or few-shot examples in prompts. It can also inform your UX design.

Here are some guidelines for responsible data collection:

*   **Collect only what's needed for learning**. An AI-powered product search might not need a user's full profile to improve results. In most cases, it's sufficient to provide the query, click patterns, and anonymized session data.
*   **Strip sensitive information**. Remove all PII (Personally Identifiable Information) before sending data to external models. You can do this with anonymization, pseudonymization, or aggregation.
*   **Limit retention**. Delete logs and cached data once they've served their purpose. Short retention cycles reduce risk without blocking insight.

Document what information you collect, how long you keep it, and why it's needed. If you can't clearly explain your data flows to a non-technical user, the flows are probably too complex to control or justify.

### Intelligence

When users interact with your AI system, they may unknowingly or carelessly enter private or sensitive information. This risk is especially high in open-ended chat or writing interfaces, where you can't restrict what users type.

While you may be able to prevent certain words from being sent, this information may be contextually sensitive. If your model runs on a server, managed by an external provider, they may reuse user input as training data. Eventually, the model might reveal fragments of private text, credentials, or other confidential details to other users.

Here's how you can safeguard against privacy breaches during inference:

*   Vet third-party APIs carefully. You should know exactly what happens to the data you send. Are inputs logged, retained, or reused for training? Avoid opaque services and prefer providers with transparent policies and controls.
    
    **Note:** Some providers offer [model cards](https://modelcards.withgoogle.com/explore-a-model-card) that explain the approach used for evaluating responsibility.
    
*   If you train or fine-tune models yourself, abstract away from sensitive details in your training data. Beware of shortcut learning. For example, in a credit score application, ZIP codes can lead the model to make assumptions about race or socioeconomic status. This can result in unfair predictions and reinforce existing inequalities.
    
*   In sensitive domains, prefer client-side inference. This can be with [built-in AI](https://developer.chrome.com/docs/ai/built-in-ai), a model in the browser, or a custom client-side model. You'll learn more about this choice in the next module, [choosing a platform](/learn/ai/platform).
    

**Tip:** For use cases that require model personalization while keeping data private, explore [federated learning](https://en.wikipedia.org/wiki/Federated_learning). In this setup, models train directly on users' devices, only sending anonymized data back to the server. This approach is more advanced, but offers strong privacy protections.

### User experience

Your application interface offers a chance to show users what's happening, earn their trust, and give them control over their data:

*   **Be transparent**. Short labels in your interface, such as "Processed locally" or "Sent securely for analysis," can help you build trust. Consider adding progressive disclosure for more details, such as tooltips that explain when analysis happens on-device versus a server.
*   **Ask in context**. Request consent when it's relevant. "Would you like to share previous searches to improve recommendations?" is far more meaningful than a blanket opt-in.
*   **Offer simple controls**. Add clearly visible toggles for personalization, cloud-based features, or data sharing.
*   **Give visibility**. Include a small privacy dashboard, so users can manage their data without leaving the app.
*   **Explain why you collect data**. Users may be more open to sharing data if they understand how it will be used. The same applies to your retention and management policies.

Privacy in web AI isn't a single compliance step, but an ongoing design mindset:

*   **Data**: Collect less and protect more.
*   **Intelligence:** Mitigate memorization of potentially sensitive data by external models.
*   **UX:** Make privacy transparent and controllable for users.

## Fairness

AI systems can carry bias that leads to unfair discrimination. This is especially true in domains like hiring, law, and finance, where bias can skew critical decisions that directly affect real people.

For example, a hiring model trained on historical recruitment data could associate certain demographic features with lower candidate quality, unintentionally penalizing applicants from underrepresented groups, rather than evaluating job-relevant skills and experience.

### Data

Your training data is a set of individually isolated pieces of information that can reflect biases from the real world, and even introduce new ones. Here are practical steps to make data-related bias transparent and manageable:

*   **Document your data sources and coverage**. Publish a short statement to help users understand where the model may fall short. For example, "This model was trained primarily on English-language content, with limited representation of technical text."
*   **Run diagnostic checks**. Use A/B tests to reveal systematic differences. For example, compare how your system handles "She is a great leader," "He is a great leader," and "They are a great leader." Small discrepancies in sentiment or tone can signal deeper bias.
*   **Label your datasets**. Add lightweight metadata such as domain, region, and formality level to make future audits, filtering, and rebalancing straightforward.

If you are training or fine-tuning custom models, balance your datasets. Broader representation reduces skew more effectively than correcting bias after the model is built.

### Intelligence

In the intelligence layer, bias is turned into learned behavior. You can add safeguards, re-ranking logic, or hybrid rules to steer outputs toward fairness and inclusivity:

*   **Regularly test for bias**. Use bias detection filters to flag problematic phrasing, such as catching gendered terms or exclusionary tone. Monitor for drift over time.
*   **For predictive models, be careful with sensitive data**. Attributes, such as zip code, education, or income can indirectly encode sensitive traits, such as race or class.
*   **Generate and compare multiple outputs**. Rank the results based on neutrality, diversity, and tone, before determining which output to share with the user.
*   **Add rules to enforce fairness constraints**. For example, blocking outputs that reinforce stereotypes or fail to represent diverse examples.

### User experience

In your user interface, be transparent about the model's reasoning and encourage feedback:

*   **Provide rationales for AI outputs**. For example, "Recommended for professional tone based on your previous inputs\*." This helps users see that the system follows defined logic, not hidden judgment.
*   **Give users meaningful control**. Allow them to adjust model behavior through settings or prompts - for example, choosing tone, complexity, or visual style preferences.
*   **Make it easier to report bias or inaccuracy**. The easier it is to flag a problem, the more real-world data you'll get to improve your AI system.
*   **Close the feedback loop**. Don't let user reports disappear. Feed this data back into your retraining or rule logic, and share progress visibly: "We've updated our moderation to reduce cultural bias in recommendations."

Bias is born in data, amplified through models, and surfaced in the user experience. You can tackle it at all three levels of your AI system:

*   **Data:** make data sources transparent and balanced.
*   **Intelligence:** detect, test, and mitigate bias in outputs.
*   **UX:** empower users to identify and correct bias through control and feedback.

## Trust and transparency

Trust determines whether people use, adopt, and advocate for your product.

Most users expect predictable applications. For example, button clicks always perform the action indicated, and lead to the same place. AI breaks this expectation, because its behavior is highly variable and often unpredictable. In addition, AI systems have an inherent potential for failure: [language models hallucinate facts](https://cloud.google.com/discover/what-are-ai-hallucinations), [predictive models mislabel data](https://research.google/blog/can-you-trust-your-models-uncertainty/), and [agents go rogue](https://cloud.google.com/transform/ai-agent-security-how-to-protect-digital-sidekicks-and-your-business/).

Your users are the last line of defense against these errors.

![](/static/learn/ai/responsibility/images/trust-calibration.png)

At the beginning, users likely under-trust or over-trust your system. Under-trust means they won't use the system, and over-trust means they completely accept outputs, without checking for errors. Your task is to pull users into the golden middle of _calibrated trust_, where they rely on AI for efficiency while still taking responsibility for the final results.

### Data

In the data layer, trust is built by clearly explaining the coverage and provenance of your data:

*   Be explicit about data origin and lineage.
*   Document data freshness and staleness.
*   Describe what types of content the model has seen and where the model may struggle, such as non-English language data.

As your AI system accumulates interactions and feedback over time, consider maintaining versioned snapshots of the data, so you can explain how outputs evolved.

### Intelligence

In the intelligence layer, you can manage trust through explainability, confidence indicators, and modular design:

*   **Provide contextual, just-in-time explanations**. According to the [paradox of the active user](https://lawsofux.com/paradox-of-the-active-user/), you're better off embedding micro-explanations in-context, directly in interactions, so users understand what the AI system is doing as they use it.
*   **Communicate limitations and failure modes upfront**. Tell users where the AI might stumble. For example, "Avoid humor or domain jargon to get better results." Short, contextual cues provide transparency without breaking the flow.
*   **Confidence indicators and fallback logic** keep AI reliable under uncertainty. You can estimate confidence from proxies, such as probability scores or past success rates. Define safe fallbacks for outputs that are clearly incorrect.
*   **Modular architectures** make AI more transparent. For example, if a writing assistant handles grammar, style, and tone in separate steps, indicate what changed at each stage: "Tone: less formal; complexity: simplified".

### User experience

The user experience provides you with a vast playing field to build and calibrate trust. Here are some techniques and patterns to try out:

*   **Adapt educational content**. Don't assume your users are AI-savvy. Provide lightweight guidance for power users and detailed explanations for beginners.
*   **Apply progressive disclosure**. Start with small cues. Include copy that states you used AI, such as, "This was generated automatically," and let users click for more insight.
*   **Close feedback loops with visible outcomes**. When users rate, correct, or override an AI suggestion, share how their input shapes future behavior: "You preferred concise responses. Adjusted tone accordingly." Visibility turns feedback into trust.
*   **Handle errors gracefully**. When your system makes a mistake or gives a low-confidence result, acknowledge it and delegate a review to the user. For example, "This suggestion may not match your intent. Review before publishing." Provide a clear path forward by allowing the user to retry, edit, or revert to a safe fallback.

In short, to address the uncertainty and inherent error potential of AI, guide users from doubt or over-reliance to proper trust calibration:

*   **Data**: Be transparent about data provenance.
*   **Intelligence**: Make reasoning modular and explainable.
*   **UX**: Design for progressive clarity and feedback.

## Your takeaways

In this module, we explored three core pillars of responsible AI, namely privacy, fairness, and trust. This may feel overwhelming, especially when you're just starting out or trying to make the leap from prototype to production.

Focus your efforts on the most critical areas and define your own approach to AI governance. **Iteration is key**. Each release and round of user feedback will sharpen your understanding of where your system needs more guardrails, transparency, or flexibility.

### Resources

Here are some more advanced resources on the topics featured in this module:

*   [AI Assistant Privacy and Security Comparison](https://cybernews.com/ai-tools/ai-assistants-privacy-and-security-comparisons/) provides a deep dive into AI privacy policies.
*   A paper on [LLM memorization](https://arxiv.org/abs/2012.07805), a critical privacy failure mode where a model retains and can be prompted to reproduce specific, sensitive, information from its training data.
*   Review the resources directly associated with the model you choose. For example, [Google Cloud provides security resources](https://cloud.google.com/security/resources).
*   The [Responsible AI Toolkit](https://ai.google.dev/responsible/) offers developer resources on all of the topics we covered in this module.

### Resources

Here are some more advanced resources on the topics featured in this module:

*   [AI Assistant Privacy and Security Comparison](https://cybernews.com/ai-tools/ai-assistants-privacy-and-security-comparisons/) provides a deep dive into AI privacy policies.
*   A paper on [LLM memorization](https://arxiv.org/abs/2012.07805), a critical privacy failure mode where a model retains and can be prompted to reproduce specific, sensitive, information from its training data.
*   Review the resources directly associated with the model you choose. For example, [Google Cloud provides security resources](https://cloud.google.com/security/resources).
*   The [Responsible AI Toolkit](https://ai.google.dev/responsible/) offers developer resources on all of the topics we covered in this module.

## Check your understanding

What is a recommended privacy practice regarding data collection for AI?

Collect as much data as possible, just in case you need it later.

That's incorrect.

Collect only what's needed for learning and remove all PII.

Great job, that's correct!

Keep all logs indefinitely to track long-term trends.

That's incorrect. Logs should never be indefinitely stored.

What is calibrated trust?

When users always trust AI is correct.

Try again.

When users refuse to use the AI, because they don't trust it.

Try again.

The middle ground where users rely on AI for efficiency but still verify the results.

Great job, that's correct!

A legal contract between the user and the developer.

Try again.

To ensure fairness in the "Intelligence" layer, what action can developers take?

Assume the training data is unbiased.

Try again.

Remove all demographic data from the database.

Try again.

Generate multiple outputs and rank them based on neutrality and diversity.

Great job, that's correct!

Rely solely on the model's default behavior.

Try again.

What is a UX technique to build trust and transparency?

Start with small cues and offer links to additional information, such as a tooltip.

Great job, that's correct!

Hide all complexity and logic from the user

Not quite. While you should avoid overwhelming the user, some will want to know more.

Make the AI feature mandatory for all users.

That's incorrect.

Change model behavior, but don't notify the user. Notifications are confusing.

That's incorrect. You may need to notify the user if the change affects their experience.

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-01-29 UTC.