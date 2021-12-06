---
title: Mirror-Generative Neural Machine Translation
author: Tsu-Jui Fu
date: 2021-11-25
tags:
 - Variational Inference
 - Latent Variable Model
categories:
 - MT
 - DL4MT
---


In general, neural machine translation (NMT) requires a large amount of parallel data (e.g., EN->CN). However, it is not easy to collect enough high-quality parallelly-paired sentences for training the translation model. On the other hand, we can capture enormous plain text from Wikipedia or news articles for each specific language. In this paper, MGNMT tries to make good use of non-parallel data and boost the performance of NMT.

<!-- more -->

[Paper](https://openreview.net/pdf?id=HkxQRTNYPH)

[Code](https://github.com/zhengzx-nlp/MGNMT)

## Background (Back Translation)
Back Translation (BT) is a technique to boost translation performance by incorporating pseudo-inverse pairs as parallel sentences. Assuming that we are translating English (EN) into Chinese (CN), our translation goal is TM<sub>EN-CN</sub>. BT considers another TM<sub>CN-EN</sub> that translates Chinese sentences back to English. With the back-translated English sentences, BT treats the additional EN-CH sentences to further train TM<sub>EN-CN</sub>. By alternative training TM<sub>EN-CN</sub> and TM<sub>CN-EN</sub>, we can improve TM<sub>EN-CN</sub> by pseudo-parallel pairs. Although BT increases translation performance, both TM<sub>EN-CN</sub> and TM<sub>CN-EN</sub> are updated independently, which limits the effectiveness of using non-parallel sentences.

<img src="https://i.imgur.com/rpj2IFj.png" width="30%" />

## MGNMT
### Overview
MGNMT is a unified NMT framework that considers both source-target and target-source translation models (TM) with their respective language models (LM). Both TM and LM share the semantic space, making it more efficient when learning from the non-parallel corpus. In addition, LM can further improve the text quality during the decoding step of TM. Inspired by generative NMT (GNMT), MGNMT introduces a latent semantic variable z and adopts symmetry of mirror-image properties to decompose the conditional joint probability p(x, y | z):

<img src="https://i.imgur.com/zXfL7CY.png" width="60%" />

- (x, y): source-target language pair;
- Θ: trainable model parameters for TM and LM;
- D_xy: parallel source-target corpus;
- D_x and D_y: non-parallel monolingual corpus.

### Parallel Training
Given a parallel corpus (x, y), MGNMT adopts stochastic gradient variational Bayes (SGVB) to obtain an approximate maximum likelihood estimate of log p(x, y):

<img src="https://i.imgur.com/RvtbmWh.png" width="60%" />

and the Evidence Lower Bound (ELBO) can be derived as:

<img src="https://i.imgur.com/kH82Wt1.png" width="60%" />

Through reparameterization, we can jointly train the entire MGNMT via gradient-based optimizations for parallel-corpus training.

<img src="https://i.imgur.com/XzRf5Uz.png" width="30%" />

### Non-parallel Training
To utilize non-parallel corpus, MGNMT designs an interactive training method by back translation (BT). Given a sentence x<sub>s</sub> in the source language and y<sub>t</sub> in the target language, MGNMT aims at maximizing the lower bounds of their marginal distribution likelihood:

<img src="https://i.imgur.com/Vy7RI5F.png" width="60%" />

As BT, for example, MGNMT samples x from p(x | y<sub>t</sub>) as the translation result of y<sub>t</sub>, and a pseudo-parallel pair (x, y<sub>t</sub>) is produced:

<img src="https://i.imgur.com/6XvCgKa.png" width="60%" />

With the pseudo-parallel corpus from two directions, they can combine to train MGNMT:

<img src="https://i.imgur.com/XJMC9YW.png" width="60%" />

Since the latent variable comes from the shared posterior q(z | x, y; Θ), it serves as a communication bridge that boosts the BT performance in MGNMT.

### Decoding
MGNMT considers pre-trained LM to help obtain smoother and higher-quality translation results during decoding. 

<img src="https://i.imgur.com/o0RpZF5.png" width="60%" />

Take the source-to-target translation as an example:
1. Sample an initialized latent variable z from the standard Gaussian prior distribution, and receives a translation result y from argmax<sub>y</sub> p(y | x, z);
2. Keep re-decoding with beam search to maximize ELBO:

<img src="https://i.imgur.com/DgsYMmF.png" width="60%" />

Each decoding score is determined by the x-to-y translation and the LM<sub>y</sub>, making the translated results more similar to the target language. Moreover, the reconstructed score is obtained from the y-to-x translation and LM<sub>x</sub>, further improving the translation effect upon the idea of BT.

## Exeperiments
### Dataset

|   Dataset    | WMT14<sub>EN-DE</sub> | NIST<sub>EN-ZH</sub> | WMT16<sub>EN-RO</sub> | IWSLT16<sub>EN-DE</sub> |
| :----------: | :-------------------: | :------------------: | :-------------------: | :---------------------: |
|   Paralel    |         4.50M         |        1.34M         |         0.62M         |       0.20M (TED)       |
| Non-parallel |         5.00M         |        1.00M         |         1.00M         |      0.20M (NEWS)       |

MGNMT considers WMT16<sub>EN-RO</sub> as low-resource translation and IWSLT16<sub>EN-DE</sub> of TED talk for cross-domain translation. Both WMT14<sub>EN-DE</sub> and NIST<sub>EN-ZH</sub> are for the general resource-rich evaluation. Specifically, all models are trained using parallel data from TED and non-parallel data from NEWS for cross-domain translation.

### Quantitative Results

<img src="https://i.imgur.com/bqJFmCn.png" width="60%" />

<b>Resource-low Translation.</b> Firstly, as for the resource-low scenario (WMT16<sub>EN-RO</sub> and IWSLT16<sub>EN-DE</sub>), MGNMT slightly surpasses the competitive baselines (<i>e.g.,</i> 33.9 BLEU on WMT16<sub>RO-EN</sub> and 33.6 BLEU on TED<sub>DE-EN</sub>). If incorporating non-parallel data, MGNMT gains a significant improvement (<i>e.g.,</i> +5.2% BLEU on TED<sub>EN-DE</sub> and +5.9% on NEWS<sub>DE-EN</sub>), which outperforms all other baselines that also use non-parallel corpus. 

<img src="https://i.imgur.com/JntnTEI.png" width="60%" />

<b>Resource-rich Translation.</b> Similar results can be found in resource-rich scenarios. MGNMT performs better than GNMT with only the parallel corpus (<i>e.g.,</i> 31.4 BLEU on WMT14<sub>DE-EN</sub> and 40.42 BLEU on NIST<sub>EN-ZH</sub>) and further boosts the translation quality with the aid of non-parallel data (<i>e.g.,</i> 30.3 BLEU on WMT14<sub>EN-DE</sub> and 49.05 BLEU on NIST<sub>ZH-EN</sub>).

### Ablation Study

<img src="https://i.imgur.com/tzEeu7u.png" width="30%" />

<b>Effectiveness of Language Model during Decoding.</b> Incorporating a pre-trained language model (LM) during decoding is an intuitive method to improve decoding quality. However, such simple interpolation (LM-FUSION) over NMT and external LM only brings out mild effects. In contrast, a natural integration adopted in MGNMT is essential to address the unrelated probabilistic modeling issue.

<img src="https://i.imgur.com/tzEeu7u.png" width="30%" />

<b>Impact of #Non-parallel Data.</b> The plot shows that with more non-parallel data involved, the translation performance keeps increasing, which demonstrates the benefit of MGNMT from data scales. Surprisingly, one monolingual side data, English, can also improve EN-GN translation under the MGNMT framework.

### Qualitative Examples

<img src="https://i.imgur.com/vPGJ7Wo.png" width="30%" /><img src="https://i.imgur.com/VQil8lK.png" width="30%" />

Without non-parallel in-domain data (NEWS), the baseline (RNMT) results in an obvious style mismatches phenomenon. Among all enhanced methods that attempt to alleviate this domain inconsistency issue, MGNMT leads to the best in-domain-related translation results.

## Conclusion
This paper presents a mirror generative NMT, MGNMT, that utilizes non-parallel corpus efficiently. MGNMT adopts a shared bilingual semantic space to jointly learn their goal and back-translated models. Moreover, MGNMT considers the learned language model during decoding, which directly improves the translation quality. One future research direction is to integrate MGNMT for fully unsupervised NMT.

## Reference
- Zaixiang Zheng, Hao Zhou, Shujian Huang, Lei Li, Xin-Yu Dai, and Jiajun Chen. Mirror-Generative Neural Machine Translation. ICLR 2020. 
