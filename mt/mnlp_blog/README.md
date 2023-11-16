---
title: Multilingual Machine Translation with Large Language Models
author: Hwijeen Ahn, William Chen
date: 2023-11-16
category:
 - MT
tag:
 - Multilingual MT
star: true
---

Large Language Models (LLMs) like [ChatGPT](chat.openai.com) have rocked the world over the past year. They are able to perform almost any task you can think of, such as summarization, translation, and story-telling. But how do these LLMs work? And should you use them over existing tools? A [recent study](https://arxiv.org/pdf/2304.04675.pdf) by AI researchers investigated how LLMs can be used for translation, and evaluate them against the best dedicated translation systems available. Our blog post today will summarize their findings and show how their study can be extended to new languages.

<!-- more -->

Paper: <https://arxiv.org/abs/2304.04675>

Code: <https://github.com/NJUNLP/MMT-LLM>

## Introduction

## In-Context Learning

## LLMs vs Dedicated MT Models

### Evaluated Models

The study compared eight LLMs (XGLM-7.5B, OPT-175B, Falcon-7B, BLOOMZ-7.1B, LLAMA2-7B, LLAMA2-7B-chat, ChatGPT, and GPT-4) with three dedicated multilingual machine translation (MT)models (M2M-100-12B, NLLB-1.3B, and Google Translate). A comparison is shown in the following table:

|  Model  | Type | Parameters | Notes | 
| :----------:| :---: | :----: | :----: | 
|  XGLM | LLM | 7.5B | Multilingual | 
|  OPT | LLM | 175B | |
|  Falcon | LLM | 7B | |
|  BLOOMZ | LLM | 7.1B |  Multilingual | 
|  LLaMA2 | LLM | 7B | | 
|  LLaMA2-chat | LLM | 7B | Trained for chatting | 
|  ChatGPT | LLM | 175B | Trained for chatting | 
|  GPT-4 | LLM | Unknown | Commercial product, multimodal, trained for chatting | 
|  M2M-100 | MT | 12B | Trained on 100 languages | 
|  NLLB | MT | 1.3B | Trained on 200 languages |
| Google Translate | MT | Unknown | Commercial product|

We categorize each model by their type and also include their number of parameters, which represenmts the size of the model. Having more parameters allows the model to store more information. You can think of it like the size of the AI's brain: a bigger brain is smarter than a smaller one, but more expensive to maintain. You'll also notice that some LLMs are denoted as multilingual, meaning their creators chose to specifically give them more training data from languages other than English. That doesn't mean the other LLMs aren't trained on other languages, they just see much less of it and aren't optimized for handling more languages [1].

## Factors that Influence an LLM's Translation Performance

## How to use In-Context Learning on your own Data

## Conclusion

## References

[1] Briakou, Eleftheria, Colin Cherry, and George Foster. "Searching for Needles in a Haystack: On the Role of Incidental Bilingualism in PaLM's Translation Capability." arXiv preprint arXiv:2305.10266 (2023).