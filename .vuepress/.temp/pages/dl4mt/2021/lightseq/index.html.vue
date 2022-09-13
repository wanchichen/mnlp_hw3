<template><div><p>A high performance open-source library for NLP Transformer model training and inferencing.</p>
<!-- more -->
<h2 id="_1-what-is-lightseq" tabindex="-1"><a class="header-anchor" href="#_1-what-is-lightseq" aria-hidden="true">#</a> 1. What is LightSeq?</h2>
<p><img src="@source/dl4mt/2021/lightseq/lightseqlogo.png" alt="logo"></p>
<h3 id="_1-1-nlp-models" tabindex="-1"><a class="header-anchor" href="#_1-1-nlp-models" aria-hidden="true">#</a> 1.1 NLP models</h3>
<p>Transformers[1], BERT[2], or GPT[3] models are state-of-art models on natural language processing tasks. They are heavily used and breaking multiple records on sequence-to-sequence (Seq2Seq) tasks including machine translation, text summarization, and text generation, or even computer vision tasks by Vision Transformers (an image is just a sequence of pixels). However, those models are huge in size that needs large-scale training and inference. This makes it computationally expensive, so serving these models is a challenge for real industrial applications.</p>
<h3 id="_1-2-motivation" tabindex="-1"><a class="header-anchor" href="#_1-2-motivation" aria-hidden="true">#</a> 1.2 Motivation</h3>
<p>Due to the high complexity and large parameter size of transformer models, the latency for both training and inference is high. Here are the three comparisons between the current inference systems and LightSeq, and the reasons why they are not able to perform well for online tasks.</p>
<ol>
<li>Popular deep learning frameworks. Since those models have flexible model structures, both TensorFlow and PyTorch need additional memory allocation and extra overhead for training. Thus, they do not make full use of the hardware resource.</li>
<li>Inference optimization frameworks. Optimization frameworks like TensorFlow XLA, TVM, and TensorRT are not suitable for variable-length inputs, which require dynamic memory allocation that does not perform well for transformer models.</li>
<li>Similar acceleration frameworks. Faster-Transformer and TurboTransformers are similar to LightSeq. However, they do not have all components or features compared to LightSeq (Table 1).</li>
</ol>
<h3 id="_1-3-lightseq" tabindex="-1"><a class="header-anchor" href="#_1-3-lightseq" aria-hidden="true">#</a> 1.3 Lightseq</h3>
<p>LightSeq[4], is a high-performance open-source library for both training and inference that is directly built on top of CUDA official libraries (<a href="https://docs.nvidia.com/cuda/cublas/index.html" target="_blank" rel="noopener noreferrer">cuBLAS<ExternalLinkIcon/></a>, <a href="https://docs.nvidia.com/cuda/thrust/index.html" target="_blank" rel="noopener noreferrer">Thrust<ExternalLinkIcon/></a>, <a href="http://nvlabs.github.io/cub/" target="_blank" rel="noopener noreferrer">CUB<ExternalLinkIcon/></a>).
It supports models in the Transformer family including BERT, GPT, and full encoder-decoder.
It introduces new transformer encoders and decoders components after fusing and optimizing the existing models.</p>
<p>The applications of LightSeq include Machine Translation, Text Generation, Dialog, Language Modelling, Sentiment Analysis, and other related tasks with sequence data, which can be easily deployed to commercial products.</p>
<p>LightSeq improves the speed for both training and inference stages. Models like DeepSpeed[5] only accelerate the training, and tools like TensorRT,  FasterTransformer, or TurboTransformers only support optimizing the inference. Here are the comparison tables on different features between LightSeq and other models.</p>
<p><img src="@source/dl4mt/2021/lightseq/feature_table.png" alt="Features"></p>
<p>Table 1. The tables above are from the <a href="https://github.com/bytedance/lightseq" target="_blank" rel="noopener noreferrer">official Github repository<ExternalLinkIcon/></a>.</p>
<h2 id="_2-technique-details" tabindex="-1"><a class="header-anchor" href="#_2-technique-details" aria-hidden="true">#</a> 2. Technique Details</h2>
<p>There are three main methods that LightSeq uses to optimize the model, training speed, and inference speed. The image below shows the architecture of a sequence-to-sequence model using transformers.</p>
<p><img src="@source/dl4mt/2021/lightseq/Transformer.png" alt="Transformer"></p>
<h3 id="_2-1-operation-fusion" tabindex="-1"><a class="header-anchor" href="#_2-1-operation-fusion" aria-hidden="true">#</a> 2.1 Operation Fusion</h3>
<p>Transformers model implemented by popular deep learning frameworks like Pytorch or Tensorflow just combine multiple fine-grained kernel functions for one layer. In this way, it needs to launch more kernel functions and uses lots of memory I/O that costs extra time for training and inference.</p>
<p>LightSeq uses general matrix multiply (GEMM) and custom kernel functions, so here are only six custom kernel functions and six GEMM in a Transformer encoder layer for LightSeq models. The right image shows the model structure of the LightSeq transformer encoder layer.</p>
<p><em>Need to add more intuitive description here</em>
<img src="@source/dl4mt/2021/lightseq/fusion.png" alt="Fusion"></p>
<h3 id="_2-2-hierarchical-auto-regressive-search" tabindex="-1"><a class="header-anchor" href="#_2-2-hierarchical-auto-regressive-search" aria-hidden="true">#</a> 2.2 Hierarchical Auto-Regressive Search</h3>
<p>Searching usually happens in the last step of a transformer model. Redundant calculations often exist in output layers since we only need a few labels/tokens with the highest probability instead of all of them.</p>
<p>LightSeq optimizes this process by using a Hierarchical Auto Regressive Search method to erase redundant calculations and perform parallel computing illustrated as below (using beam search as an example).</p>
<p>the following steps happen for each beam.</p>
<ol>
<li>Randomly divide logits into k groups</li>
<li>Calculate the maximum of group <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>, denoted
as <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>m</mi><mi>i</mi></msub></mrow><annotation encoding="application/x-tex">m_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span></li>
<li>Calculate the minimum of <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>m</mi><mi>i</mi></msub></mrow><annotation encoding="application/x-tex">m_i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.5806em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3117em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>, denoted as <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>R</mi></mrow><annotation encoding="application/x-tex">R</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.00773em;">R</span></span></span></span>,
which can be regarded as a rough top-k value of logits.</li>
<li>Select logits larger than <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>R</mi></mrow><annotation encoding="application/x-tex">R</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.00773em;">R</span></span></span></span> and write them into GPU memory.</li>
</ol>
<p><img src="@source/dl4mt/2021/lightseq/softmax.png" alt="softmax"></p>
<h3 id="_2-3-dynamic-gpu-memory-reuse" tabindex="-1"><a class="header-anchor" href="#_2-3-dynamic-gpu-memory-reuse" aria-hidden="true">#</a> 2.3 Dynamic GPU Memory Reuse</h3>
<p>LightSeq pre-defines the maximum of dynamic shapes, such as the maximal sequence length, to avoid memory allocation time and save GPU memory occupancy. Also, GPU memory is shared for non-dependent intermediate results to reduce the memory usage.</p>
<p>By using LightSeq, users are able to 8 Transformer big models simultaneously on a NVIDIA Tesla T4 GPU.</p>
<h2 id="_3-using-lightseq" tabindex="-1"><a class="header-anchor" href="#_3-using-lightseq" aria-hidden="true">#</a> 3. Using LightSeq</h2>
<p>Running LightSeq requires one or more GPUs.</p>
<h3 id="_3-1-installation" tabindex="-1"><a class="header-anchor" href="#_3-1-installation" aria-hidden="true">#</a> 3.1 Installation</h3>
<p>LightSeq installation from PyPI only supports python 3.6 to 3.8 on Linux for now. Consider compiling from source if you have other environments.</p>
<p><code v-pre>pip install lightseq fairseq sacremoses transformers</code></p>
<h3 id="_3-2-training-examples-using-lightseq" tabindex="-1"><a class="header-anchor" href="#_3-2-training-examples-using-lightseq" aria-hidden="true">#</a> 3.2 Training examples using LightSeq</h3>
<p>Training a translation task on wmt14 en2de dataset by running the following command.</p>
<p><code v-pre>sh examples/training/fairseq/ls_fairseq_wmt14en2de.sh</code></p>
<p>If you want to run the training using FairSeq, run the following command.</p>
<p><code v-pre>sh examples/training/fairseq/fairseq_wmt14en2de.sh</code></p>
<h3 id="_3-3-inference-examples-using-lightseq" tabindex="-1"><a class="header-anchor" href="#_3-3-inference-examples-using-lightseq" aria-hidden="true">#</a> 3.3 Inference examples Using LightSeq</h3>
<p><code v-pre>pip install torch tensorflow transformers lightseq</code></p>
<p><code v-pre>cd examples/inference/python</code></p>
<p><code v-pre>python export/hf_bart_export.py</code></p>
<p><code v-pre>python test/ls_bart.py</code></p>
<p><a href="https://github.com/bytedance/lightseq/blob/master/docs/guide.md" target="_blank" rel="noopener noreferrer">Here<ExternalLinkIcon/></a> is a guide on using LightSeq for training and inference.</p>
<h2 id="_4-performance" tabindex="-1"><a class="header-anchor" href="#_4-performance" aria-hidden="true">#</a> 4. Performance</h2>
<h3 id="_4-1-training-performance" tabindex="-1"><a class="header-anchor" href="#_4-1-training-performance" aria-hidden="true">#</a> 4.1 Training Performance</h3>
<p>The plots below are the experiment results on WMT14 English to German translation tasks using Transformer-Big models. In all plots, FairSeq+LightSeq models are able to improve the performance to 3.5X maximum.</p>
<p><img src="@source/dl4mt/2021/lightseq/training_speed.png" alt="Training"></p>
<p>The image above is from the <a href="https://github.com/bytedance/lightseq" target="_blank" rel="noopener noreferrer">official Github repository<ExternalLinkIcon/></a>.</p>
<h3 id="_4-2-inference-performance" tabindex="-1"><a class="header-anchor" href="#_4-2-inference-performance" aria-hidden="true">#</a> 4.2 Inference Performance</h3>
<p>Here are the inference results using LightSeq, TensorFlow, PyTorch, and FasterTransformer on neural machine translation using Transformer-base models with beam search methods.</p>
<p><img src="@source/dl4mt/2021/lightseq/inference_speed.png" alt="Inference"></p>
<p>The image above is from the <a href="https://github.com/bytedance/lightseq" target="_blank" rel="noopener noreferrer">official Github repository<ExternalLinkIcon/></a>.</p>
<h3 id="_4-3-more-inference-performance-on-nvidia-p4-and-t4" tabindex="-1"><a class="header-anchor" href="#_4-3-more-inference-performance-on-nvidia-p4-and-t4" aria-hidden="true">#</a> 4.3 More Inference Performance on Nvidia P4 and T4</h3>
<p>The three images below are from the <a href="https://segmentfault.com/a/1190000038523998" target="_blank" rel="noopener noreferrer">Volctrans Blog on segmentfault.com<ExternalLinkIcon/></a>.</p>
<p>X-axes are the Batch size and sequence length pairs, and Y-axes are the acceleration rates.</p>
<p><img src="@source/dl4mt/2021/lightseq/beamsearch.png" alt="Beam Search T4"></p>
<p><img src="@source/dl4mt/2021/lightseq/beamsearchp4.png" alt="Beam Search P4"></p>
<p><img src="@source/dl4mt/2021/lightseq/samplingp4.png" alt="Sampling"></p>
<h3 id="_4-4-real-world-cloud-computing-delay-test-on-gpt" tabindex="-1"><a class="header-anchor" href="#_4-4-real-world-cloud-computing-delay-test-on-gpt" aria-hidden="true">#</a> 4.4 Real-world Cloud Computing Delay Test on GPT</h3>
<p>This plot shows the performance of deploying a GPT model to cloud computing. At 11:00, the delay performance decreased from 360 ms to 80 ms when LightSeq is turned on.</p>
<p><img src="@source/dl4mt/2021/lightseq/realworkload.png" alt="Real Work Load"></p>
<p>The image above is from the <a href="https://segmentfault.com/a/1190000038523998" target="_blank" rel="noopener noreferrer">Volctrans Blog on segmentfault.com<ExternalLinkIcon/></a>.</p>
<h2 id="_5-reference" tabindex="-1"><a class="header-anchor" href="#_5-reference" aria-hidden="true">#</a> 5. Reference</h2>
<p>[1] Vaswani, Ashish, et al. &quot;Attention is all you need.&quot; Advances in neural information processing systems. 2017.</p>
<p>[2] Devlin, Jacob, et al. &quot;Bert: Pre-training of deep bidirectional transformers for language understanding.&quot; <em>arXiv preprint arXiv:1810.04805</em> (2018).</p>
<p>[3] Brown, Tom B., et al. &quot;Language models are few-shot learners.&quot; arXiv preprint arXiv:2005.14165 (2020).</p>
<p>[4] Wang, Xiaohui, et al. &quot;LightSeq: A High Performance Inference Library for Transformers.&quot; arXiv preprint arXiv:2010.13887 (2020).</p>
<p>[5] Jeff Rasley, Samyam Rajbhandari, Olatunji Ruwase, and Yuxiong He. (2020) DeepSpeed: System Optimizations Enable Training Deep Learning Models with Over 100 Billion Parameters. <a href="https://dl.acm.org/doi/10.1145/3394486.3406703" target="_blank" rel="noopener noreferrer">In Proceedings of the 26th ACM SIGKDD International Conference on Knowledge Discovery &amp; Data Mining (KDD '20, Tutorial)<ExternalLinkIcon/></a>.</p>
</div></template>


