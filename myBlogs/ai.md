Writeups, about AI, from various sources, learning and documenting and relearning, in order to do curiousity based research and "going down the rabbit hole" in an organized fashion. Preventing reword as well as learn better.


# The AI Landscape

<details>
<summary> <strong>Engineering by chip huyen</strong> </summary>

- what are embeddings ? numberical representation of data.
- purpose ? computer understands numbers, computers don't understand anything else
- how does it look ? 
  - "cat sits on mat" => [0.11, 0.02, 0.54]
- How are these generated ? Embedding algorithms. Input, original data to the algorithm, these algorithms produce the embeddings, thereby "capturing" the essence of original data.
- cosine similarity score. I have to embeddings, but are they equal ? or how "similar" they are ? How to find out ? one word, cosine similarity score
- One of the biggest challenges or a boon, is the inherent probabilistic and inconsistent nature. If we use it as a judge, no two score to a single result will be the same, no two answers to the same query will be the same
  - faithfullness score
- tempearture, means randomness. meaning, the probability of the next token, the higest one wins, but if we decrease temperature, then suddenly, all the consistent's probabilities are reevaluated and thereby, random increased to a prexisting model
</details>

<details>
<summary> <strong>Ed Donner's udemy videos</strong> </summary>
</details>


<details>
  <summary><strong>Andrej Karpathy Youtube Videos</strong></summary>
  
- llms, lots and lots of docs and need diversity of docs, enter, fineweb dataset, 44tb of diskspace, 15 trillion tokens.
  - common crawl, since 2007, crawling webpages, until 2024, 2.7 billion pages crawled
  - data converted to [233,4334,534...] using a tokenizer like tiktokenizer
- neural network training, what's it training for ? to generate the probability of the next token. that's the name of the game. completing token sequences. this "thing" is also called as "inference". 
  - when we talk to chatgpt, we are kind of talking with the finished product, with specific weights adjusted for this very purpose only. and now, the gpt is predicting the next token
  - pretraining - remixes of the internet, a text token simulator. its not useful yet, why ? we need an assistant, with whome we can ask questions and it gives answers, because, this is not useful yet.
- to release a model:
  - python code "model" which describes the ops/sequence of steps in details to create the model
  - "parameters", 1.5 b parameters or etc. basically, a gigantic file of numbers and these nos. are the parameters
  - base model and instruct model, the instruct model is the assistant, whome i ask question and it give answer
  - want to get a "feel" of what base models are ? try hyperbolic website. because, mostly we are interacting with the instruct model
    - well you start with the answer itself and then, you wait and watch, you see, its generating the rest on its own. if you type a question to it, as we do to an instruct model, it will go on and continue building up on the question.
      - take a text from wikipedia and paste it, and see, it completes it exactly as its written there.
  - few show prompting : basically simulate the behaviour of what you want to expect and feed it to the context. with incontext learning the llm will start doing that, and you accomplish your goal of making the llm behave in a specific way
  - post training the pretrained data or base model by "showing" it ideal conversations of a good assistant. This is done by data labelers. A dataset of converstations and we train the data with it. the model will adjust and update its statistics and when we are doing inference it will response like an assistnat and not like a probabilitic internet data token generator

</details>