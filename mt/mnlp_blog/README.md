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

Large-scale machine learning models are trained on an extremely vast amount of data. But when it comes down to actual usage, we typically only need these models to perform certain tasks in certain domains. Thus, it is common to take a model pre-trained on a large general dataset and fine-tune it on a smaller task/domain specific dataset. However, this process is still expensive, as the amount of data necessary to achieve good performance on specific tasks after fine-tuning is still rather large, and the fine-tuning process itself requires access to GPU compute. Can we instead teach a model to perform a task without fine-tuning?

Recent research has shown that we can do achieve this with, in-context learning (ICL): the concept of showing an LLM a few examples of a task, before asking it to complete the task for a new data. In the context of translation, for example, this can be done by giving the LLM a few example translations, such as:

```
I love potatoes -> J'aime les pommes de terre
Where did you buy that purse? -> Où as-tu acheté ce sac à main?
You can feed deer at Nara Park -> Vous pouvez nourrir les cerfs au parc de Nara
```

Before asking it giving it this task:
```
Let’s see if its value is mentioned in any other responses. ->
```
As you can probably guess, the examples you give the LLM can significantly affect its ability to perform ICL. The examples need to be represent the different possible ways to properly perform the task. As such, you may need to perform significant amounts of engineering to properly teach the LLM more difficult tasks, such as translation with rare languages or uncommon language pairs. ICL is possible in LLMs due to the nature of their pre-training task: predicting the next word. The examples provided by the user for ICL becomes the context the LLM uses to reatedly predict the next word, evenutally forming an output translation. This makes ICL a property mostly unique to LLMs, as it requires a specific pre-training type, along with a sufficiently large model/dataset.

## Experimental setup
One of the main contributions of the paper is that the authors performed extensive analysis of diverse models and diverse languages. We first present the list of models and language they considered in the paper. 

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

### Evaluated Languages
<img width="528" alt="Multilingual Translation Performance" src="https://github.com/wanchichen/mnlp_hw3/assets/29157715/75a65a50-4cb6-4073-8f1a-ff18ba0ba0db">

The above diagram shows the language families used in the evaluation. The paper considers 102 languages in 8 different language families. The number of languages in each bucket varies from 2 (Atlantic-Congo) to 13 (Other). The comprehensive list of languages can be found in Table 8 in the Appendix of the paper. Except for the experiment in Table 2, the paper considers English-centric translation meaning that either source or target language is English.


## LLMs vs Dedicated MT Models

The main research question of the paper is to investigate whether LLMs are good enough translators. The authors have evaluated the various models extensively on diverse languages and presented the characteristics of the LLMs as a translator in various aspects. Here are the main findings:
1. **The multilingual translation capabilities of LLMs are continually improving**. The extensive evaluation of models revealed that more recent models like LLaMA2-7B perform better than the previously released LLMs. In particular, it was GPT-4 which is the most up-to-date model that achieved the highest average score in most directions in terms of BLEU and COMET. This suggests that it is possible to enhance the translation quality of these LLMs without using explicit parallel data.
2. **LLM’s capability is unbalanced across languages**. Although the model shows surprisingly good translation quality, it should be noted that their capabilities shine when the model is asked to translate sentences into English rather than translating from English. Additionally, the performance in other languages seems to be correlated with linguistic similarities with English. For example, the model showed much more impressive results in German than in Sino-Tibetan languages.
3. **LLMs still lag behind the strong supervised baseline, especially in low-resource languages**. Although it is surprising that the LLMs perform reasonably well without supervised training, it is not competitive with the tailored MT systems yet. Concretely, NLLB, which is a model that was specifically trained for translation outperformed GPT-4 in more than 40% of the translation directions. When compared to the commercial system which has dedicated pre/post-processing steps on top of the neural models, the LLMs underperformed in most language directions as depicted in Figure 1.


## Factors that Influence an LLM's Translation Performance

1. **LLMs can acquire translation ability in a resource-efficient way.** Thanks to ICL, LLMs can learn to translate completely unseen languages, which allows them to translate new languages without additional training. The below plots compares the performance of the XGLM LLM on different languages with the size of the training data for each language. The higher the red bar, the better the model is at translating. The higher the blue bar, the more training data the model had for that language. The model does not need much data to generate good translations for many languages!

<img width="889" alt="image" src="https://github.com/wanchichen/mnlp_hw3/assets/39677488/88b527bc-b112-417d-9152-ff7f4b18e343">

2. **Good performance requires a carefully-designed template.** For LLMs to achieve good performance, ICL most be done properly. Using a wrong ICL template can reduce performance by 16% absoulute! What consitutes a good or bad ICL template though? Unfortunately, that can only be known by testing out each template. For example, the authors found that the common template of `[SRC]: <X> \n [TGT]: <Y>` performed extremely poorly.

3. **Even an unreasonable template can instruct LLM to generate decent translation.** Suprisingly, the authors of the paper found that giving the LLM the wrong instructions can still lead to reasonable performance. For example, they tried telling the LLM that `<X> can be summarized as <Y>` instead of `<X> can be translated as <Y>`. Even then, the LLM achieves near identical performance, and even improves on certain language pairs.

4. **Cross-lingual exemplars help for certain translation directions.** When you have few examples for a specific translation direction, you can also boost performance by using examples from other languages during ICL. The authors found that showing the model Russian to English translations helped boost performance on the low resource Chinese to English. However, this doesn't always work. Performance can actually be degraded if your target translation pair is sufficiently resourced, like German to English translation.

5. **Semantically-related exemplars does not brings more benefits than randomly-picked exemplars.** Typically, the performance gains from ICL are directly related to the quality and the relevance of the given examples. The authors tried using semantically similar sentences as the examples for ICL, but found that it actually performed _worse_ than using randomly-picked examples. The authors hypothesize that while these examples may still be useful in helping the model learn the task of translation, the lack of diversity leads to poor translation knowledge.

7. Exemplars teach LLM the core feature of translation task
8. The exemplar in the tail of the prompt has more impact  on  the  LLM’s  behaviour

## How to use In-Context Learning on your own Data

## Conclusion

## References

[1] Briakou, Eleftheria, Colin Cherry, and George Foster. "Searching for Needles in a Haystack: On the Role of Incidental Bilingualism in PaLM's Translation Capability." arXiv preprint arXiv:2305.10266 (2023).
