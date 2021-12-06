---
title:  Automatic Machine Translation Evaluation - COMET Explained
author:  Xinyi Wang
date: 2021-12-1
tags:
 - MT evaluation
 - Pre-trained Langauge Model
categories:
 - MT
 - DL4MT
---


# Motivation

While the advance in deep learning has dramatically improved the machine translation quality, there is little development in the evaluation of machine translation models. The most widely-used metrics like BLEU [[Papineni et al., 2002]](#bleu) and METEOR [[Lavie and Denkowski, 2009]](#meteor) simply match the n-gram between the hypothesis text and reference text, which is too rigid without considering the variance in ground-truth translations and fail to differentiate the current highest performance machine translation models. They also cannot be accurately correlated with human judgment for a piece of text. 

# Background

Recently, model-based evaluation metrics have been proposed. Some matrics like METEOR-VECTOR [[Servan et al., 2016]](#METEOR-VECTOR), BLEU2VEC [[T¨attar and Fishel, 2017]](#BLEU2VEC), YISI-1 [[Lo, 2019]](#YISI-1), MOVERSCORE [[Zhao et al., 2019]](#MOVERSCORE), and BERTSCORE [[Zhang et al., 2020]](#BERTSCORE) are based on the pre-trained word embeddings like word2vec and BERT, to capture the semantic level similarity between hypotheses and references. Others like BLEURT [[Sellam et al., 2020]](#BLEURT) aim to directly optimize the correlation with human judgment by training a machine learning model to learn the appropriate metric.  There is also another kind of evaluation metrics called Quality Estimation that does not require reference text. COMET is built upon this category of metrics.

# Method

COMET predict human evaluation based on a cross-lingual pre-trained language model (e.g. multilingual BERT [[Devlin et al., 2019]](#bert), XLM [[Conneau and Lample, 2019]](#xlm) or XLM-RoBERTa [[Conneau et al., 2019]](#roberta)) to make use of both the reference and source sentences. Authors propose two different architectures for COMET: The **Estimator model** which directly regresses the human evaluation score (e.g. DA, MQM, and HTER), and the **Translation Ranking model** which is trained to rank the hypotheses according to human evaluation.

First, they produce a sentence embedding using the pre-trained language model. For **Estimator model**, they aggregate the embeddings of the source sentence, hypothesis sentence, and reference sentence together the regress using a feed-forward layer. For **Translation Ranking model**, they pair two hypotheses per source/reference, such that one reference ranks higher than the other in terms of human evaluation. Then they apply the triplet margin loss to both the source-hypothesis triplet and the reference-hypothesis triplet and add them together. The results show that the **Translation Ranking model** performs better than the **Estimator model** and many state-of-the-art baseline metrics in terms of consistency with human evaluation.


# Reference

<a name="bleu">Kishore Papineni, Salim Roukos, Todd Ward, and WeiJing Zhu. 2002. Bleu: a method for automatic evaluation of machine translation. In Proceedings of the 40th Annual Meeting of the Association for Computational Linguistics, pages 311–318, Philadelphia, Pennsylvania, USA. Association for Computational
Linguistics.</a>

<a name="meteor">Alon Lavie and Michael Denkowski. 2009. The meteor metric for automatic evaluation of machine translation. Machine Translation, 23:105–115.</a>

<a name="METEOR-VECTOR">Christophe Servan, Alexandre B´erard, Zied Elloumi, Herv´e Blanchon, and Laurent Besacier. 2016. Word2Vec vs DBnary: Augmenting METEOR using vector representations or lexical resources? In Proceedings of COLING 2016, the 26th International Conference on Computational Linguistics: Technical Papers, pages 1159–1168, Osaka, Japan. The COLING 2016 Organizing Committee. </a>

<a name="BLEU2VEC">Andre T¨attar and Mark Fishel. 2017. bleu2vec: the painfully familiar metric on continuous vector space steroids. In Proceedings of the Second Conference on Machine Translation, pages 619–622, Copenhagen, Denmark. Association for Computational Linguistics.</a>

<a name="YISI-1">Chi-kiu Lo. 2019. YiSi - a unified semantic MT quality evaluation and estimation metric for languages with different levels of available resources. In Proceedings of the Fourth Conference on Machine Translation (Volume 2: Shared Task Papers, Day 1), pages 507–513, Florence, Italy. Association for Computational Linguistics.</a>

<a name="MOVERSCORE">Wei Zhao, Maxime Peyrard, Fei Liu, Yang Gao, Christian M. Meyer, and Steffen Eger. 2019. MoverScore: Text generation evaluating with contextualized embeddings and earth mover distance. In Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing and the 9th International Joint Conference on Natural Language Processing (EMNLP-IJCNLP), pages 563–578</a>

<a name="BERTSCORE">Tianyi Zhang, Varsha Kishore, Felix Wu, Kilian Q. Weinberger, and Yoav Artzi. 2020. Bertscore: Evaluating text generation with bert. In International Conference on Learning Representations.</a>

<a name="BLEURT">Thibault Sellam, Dipanjan Das, and Ankur Parikh. 2020. BLEURT: Learning robust metrics for text generation. In Proceedings ofthe 58th Annual Meeting ofthe Association for Computational Linguistics, pages 7881–7892, Online. Association for Computational Linguistics.</a>