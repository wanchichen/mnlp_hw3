const e=JSON.parse('{"key":"v-291e7daf","path":"/nlp/bert-flow/","title":"What is the problem with BERT embeddings and how to fix them?","lang":"en-US","frontmatter":{"title":"What is the problem with BERT embeddings and how to fix them?","author":"Bohan Li","date":"2020-11-04T00:00:00.000Z","tag":["Pre-training","BERT","Embedding"],"category":["NLP"],"summary":"This blog presents an easy fix to the sentence embeddings learned by pre-trained language models.\\nIt is based on the paper: On the Sentence Embeddings from Pre-trained Language Models by Li et al EMNLP 2020.\\n","head":[["meta",{"property":"og:url","content":"https://lileicc.github.io/blog/nlp/bert-flow/"}],["meta",{"property":"og:site_name","content":"MLNLP Blog"}],["meta",{"property":"og:title","content":"What is the problem with BERT embeddings and how to fix them?"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://lileicc.github.io/blog/"}],["meta",{"property":"og:updated_time","content":"2022-09-13T03:45:15.000Z"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"What is the problem with BERT embeddings and how to fix them?"}],["meta",{"property":"article:author","content":"Bohan Li"}],["meta",{"property":"article:tag","content":"Pre-training"}],["meta",{"property":"article:tag","content":"BERT"}],["meta",{"property":"article:tag","content":"Embedding"}],["meta",{"property":"article:published_time","content":"2020-11-04T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-09-13T03:45:15.000Z"}]]},"excerpt":"<p>This blog presents an easy fix to the sentence embeddings learned by pre-trained language models.\\nIt is based on the paper: On the Sentence Embeddings from Pre-trained Language Models by Li et al EMNLP 2020.</p>\\n","headers":[{"level":2,"title":"Background","slug":"background","link":"#background","children":[]},{"level":2,"title":"Major Questions","slug":"major-questions","link":"#major-questions","children":[]},{"level":2,"title":"Our Findings","slug":"our-findings","link":"#our-findings","children":[{"level":3,"title":"The Anisotropic Embedding Space of BERT","slug":"the-anisotropic-embedding-space-of-bert","link":"#the-anisotropic-embedding-space-of-bert","children":[]},{"level":3,"title":"Word Frequency Biases the Embedding Space","slug":"word-frequency-biases-the-embedding-space","link":"#word-frequency-biases-the-embedding-space","children":[]},{"level":3,"title":"Low-Frequency Words Disperse Sparsely","slug":"low-frequency-words-disperse-sparsely","link":"#low-frequency-words-disperse-sparsely","children":[]}]},{"level":2,"title":"Proposed Method: BERT-flow","slug":"proposed-method-bert-flow","link":"#proposed-method-bert-flow","children":[]},{"level":2,"title":"Experiments","slug":"experiments","link":"#experiments","children":[{"level":3,"title":"Results w/o NLI Supervision","slug":"results-w-o-nli-supervision","link":"#results-w-o-nli-supervision","children":[]},{"level":3,"title":"Results w/ NLI Supervision","slug":"results-w-nli-supervision","link":"#results-w-nli-supervision","children":[]}]},{"level":2,"title":"Conclusion","slug":"conclusion","link":"#conclusion","children":[]},{"level":2,"title":"Reference","slug":"reference","link":"#reference","children":[]}],"git":{"createdTime":1663040715000,"updatedTime":1663040715000,"contributors":[{"name":"Lei Li","email":"lileicc@gmail.com","commits":1}]},"readingTime":{"minutes":3.55,"words":1066},"filePathRelative":"nlp/bert-flow/README.md","localizedDate":"November 4, 2020"}');export{e as data};