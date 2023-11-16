import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as o,b as e,d as a,a as d,e as t,f as i,r as s}from"./app.93ebeeaf.js";const c={},h=t("Large Language Models (LLMs) like "),g=e("a",{href:"chat.openai.com"},"ChatGPT",-1),u=t(" have rocked the world over the past year. They are able to perform almost any task you can think of, such as summarization, translation, and story-telling. But how do these LLMs work? And should you use them over existing tools? A "),x={href:"https://arxiv.org/pdf/2304.04675.pdf",target:"_blank",rel:"noopener noreferrer"},m=t("recent study"),y=t(" by AI researchers investigated how LLMs can be used for translation, and evaluate them against the best dedicated translation systems available. Our blog post today will summarize their findings and show how their study can be extended to new languages."),L=t("Paper: "),f={href:"https://arxiv.org/abs/2304.04675",target:"_blank",rel:"noopener noreferrer"},p=t("https://arxiv.org/abs/2304.04675"),M=t("Code: "),_={href:"https://github.com/NJUNLP/MMT-LLM",target:"_blank",rel:"noopener noreferrer"},b=t("https://github.com/NJUNLP/MMT-LLM"),B=i('<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><h2 id="in-context-learning" tabindex="-1"><a class="header-anchor" href="#in-context-learning" aria-hidden="true">#</a> In-Context Learning</h2><h2 id="llms-vs-dedicated-mt-models" tabindex="-1"><a class="header-anchor" href="#llms-vs-dedicated-mt-models" aria-hidden="true">#</a> LLMs vs Dedicated MT Models</h2><h3 id="evaluated-models" tabindex="-1"><a class="header-anchor" href="#evaluated-models" aria-hidden="true">#</a> Evaluated Models</h3><p>The study compared eight LLMs (XGLM-7.5B, OPT-175B, Falcon-7B, BLOOMZ-7.1B, LLAMA2-7B, LLAMA2-7B-chat, ChatGPT, and GPT-4) with three dedicated multilingual machine translation (MT)models (M2M-100-12B, NLLB-1.3B, and Google Translate). A comparison is shown in the following table:</p><table><thead><tr><th style="text-align:center;">Model</th><th style="text-align:center;">Type</th><th style="text-align:center;">Parameters</th><th style="text-align:center;">Notes</th></tr></thead><tbody><tr><td style="text-align:center;">XGLM</td><td style="text-align:center;">LLM</td><td style="text-align:center;">7.5B</td><td style="text-align:center;">Multilingual</td></tr><tr><td style="text-align:center;">OPT</td><td style="text-align:center;">LLM</td><td style="text-align:center;">175B</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">Falcon</td><td style="text-align:center;">LLM</td><td style="text-align:center;">7B</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">BLOOMZ</td><td style="text-align:center;">LLM</td><td style="text-align:center;">7.1B</td><td style="text-align:center;">Multilingual</td></tr><tr><td style="text-align:center;">LLaMA2</td><td style="text-align:center;">LLM</td><td style="text-align:center;">7B</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">LLaMA2-chat</td><td style="text-align:center;">LLM</td><td style="text-align:center;">7B</td><td style="text-align:center;">Trained for chatting</td></tr><tr><td style="text-align:center;">ChatGPT</td><td style="text-align:center;">LLM</td><td style="text-align:center;">175B</td><td style="text-align:center;">Trained for chatting</td></tr><tr><td style="text-align:center;">GPT-4</td><td style="text-align:center;">LLM</td><td style="text-align:center;">Unknown</td><td style="text-align:center;">Commercial product, multimodal, trained for chatting</td></tr><tr><td style="text-align:center;">M2M-100</td><td style="text-align:center;">MT</td><td style="text-align:center;">12B</td><td style="text-align:center;">Trained on 100 languages</td></tr><tr><td style="text-align:center;">NLLB</td><td style="text-align:center;">MT</td><td style="text-align:center;">1.3B</td><td style="text-align:center;">Trained on 200 languages</td></tr><tr><td style="text-align:center;">Google Translate</td><td style="text-align:center;">MT</td><td style="text-align:center;">Unknown</td><td style="text-align:center;">Commercial product</td></tr></tbody></table><p>We categorize each model by their type and also include their number of parameters, which represenmts the size of the model. Having more parameters allows the model to store more information. You can think of it like the size of the AI&#39;s brain: a bigger brain is smarter than a smaller one, but more expensive to maintain. You&#39;ll also notice that some LLMs are denoted as multilingual, meaning their creators chose to specifically give them more training data from languages other than English. That doesn&#39;t mean the other LLMs aren&#39;t trained on other languages, they just see much less of it and aren&#39;t optimized for handling more languages [1].</p><h2 id="factors-that-influence-an-llm-s-translation-performance" tabindex="-1"><a class="header-anchor" href="#factors-that-influence-an-llm-s-translation-performance" aria-hidden="true">#</a> Factors that Influence an LLM&#39;s Translation Performance</h2><h2 id="how-to-use-in-context-learning-on-your-own-data" tabindex="-1"><a class="header-anchor" href="#how-to-use-in-context-learning-on-your-own-data" aria-hidden="true">#</a> How to use In-Context Learning on your own Data</h2><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><h2 id="references" tabindex="-1"><a class="header-anchor" href="#references" aria-hidden="true">#</a> References</h2><p>[1] Briakou, Eleftheria, Colin Cherry, and George Foster. &quot;Searching for Needles in a Haystack: On the Role of Incidental Bilingualism in PaLM&#39;s Translation Capability.&quot; arXiv preprint arXiv:2305.10266 (2023).</p>',12);function T(v,w){const n=s("ExternalLinkIcon");return l(),o("div",null,[e("p",null,[h,g,u,e("a",x,[m,a(n)]),y]),d(" more "),e("p",null,[L,e("a",f,[p,a(n)])]),e("p",null,[M,e("a",_,[b,a(n)])]),B])}const N=r(c,[["render",T],["__file","index.html.vue"]]);export{N as default};