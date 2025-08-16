Writeups, about AI, from various sources, learning and documenting and relearning, in order to do curiousity based research and "going down the rabbit hole" in an organized fashion. Preventing reword as well as learn better.


# The AI Landscape

## AI Engineering by chip huyen
- what are embeddings ? numberical representation of data.
- purpose ? computer understands numbers, computers don't understand anything else
- how does it look ? 
  - "cat sits on mat" => [0.11, 0.02, 0.54]
- How are these generated ? Embedding algorithms. Input, original data to the algorithm, these algorithms produce the embeddings, thereby "capturing" the essence of original data.
- cosine similarity score. I have to embeddings, but are they equal ? or how "similar" they are ? How to find out ? one word, cosine similarity score
- One of the biggest challenges or a boon, is the inherent probabilistic and inconsistent nature. If we use it as a judge, no two score to a single result will be the same, no two answers to the same query will be the same
  - faithfullness score
- tempearture, means randomness. meaning, the probability of the next token, the higest one wins, but if we decrease temperature, then suddenly, all the consistent's probabilities are reevaluated and thereby, random increased to a prexisting model
- 