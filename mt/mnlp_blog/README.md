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

### Evaluated Models

This study compared eight LLMs (XGLM-7.5B, OPT-175B, Falcon-7B, BLOOMZ-7.1B, LLAMA2-7B, LLAMA2-7B-chat, ChatGPT, and GPT-4) with three dedicated multilingual translation models (M2M-100-12B, NLLB-1.3B, and Google Translate).

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
|  NLLB | MT | 1,3B | Trained on 200 languages |
| Google Translate | MT | Unknown | Commercial product|

## LLMs vs Dedicated MT Models

## Factors that Influence an LLM's Translation Performance

## How to use In-Context Learning on your own Data

## Conclusion
