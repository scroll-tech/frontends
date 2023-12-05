# KZG in Practice: Polynomial Commitment Schemes and Their Usage in Scaling Ethereum

_Written by Andy Arditi ([@\_andyrdt](https://twitter.com/_andyrdt))._

_Thanks to Yi Sun and Kobi Gurkan for their feedback and review._

## Introduction

Zero knowledge proofs have garnered an air of mystery around them, due to their mathematical complexity. They are affectionately referred to as “moon math,” as they are seen by most as otherworldly magic.

We at Scroll want to demystify the inner workings of zero knowledge proofs. This doesn’t make them any less magical, and we feel it is important to help the community understand the technical aspects of our work.

In this post, we give an introduction to a critical ingredient to many zero knowledge proof systems: polynomial commitment schemes. We then briefly explain KZG, which is one of the most widely used polynomial commitment schemes in practice. We continue by discussing how KZG is being used in Scroll’s zk-rollups, as well as in Ethereum’s Proto-Danksharding. Finally, we show how zk-rollups and Proto-Danksharding can be efficiently and elegantly integrated with one another - an integration which is enabled by their respective usage of polynomial commitment schemes.

## Why are we talking about polynomials?

Polynomials are extremely powerful tools, and they have useful applications across many different domains. Polynomials can be used to represent large objects in an efficient way.

One standard object that we can represent as a polynomial is an $n$-dimensional vector of field elements $v \in \mathbb{F}_p^n$. We can craft a polynomial $\phi(x)$ to represent $v$ by ensuring that $\phi(x)$ passes through the points $(i, v_i)$ for $i = 1, 2, …, n$.

For example, we could take the $3$-dimensional vector $v = [2, 0, 6]$, and represent it as the polynomial $\phi(x) = 4x^2 - 14x + 12$. You can plug in values to verify that indeed $\phi(1) = 2$, $\phi(2) = 0$, and $\phi(3) = 6$. In this way, the polynomial $\phi(x)$ “_encodes_” the vector $v$.

<img src="/imgs/homepage/blog/kzg/interpolation.png" width="543"/>

In general, it’s possible to take $n$ arbitrary points and find a unique polynomial of degree $n-1$ which passes through all of them. This process is called “[polynomial interpolation](https://en.wikipedia.org/wiki/Polynomial_interpolation),” and there are established methods of achieving this task efficiently. (Check out this nifty [online tool](https://www.wolframalpha.com/input/?i=interpolating+polynomial+calculator) from Wolfram Alpha that can interpolate a polynomial given a vector of inputs!)

## What are polynomial commitment schemes? Why are they useful?

A polynomial commitment scheme is a [commitment scheme](https://en.wikipedia.org/wiki/Commitment_scheme) with some nice additional properties. In a general commitment scheme, the committer commits to a message $m$ by outputting some commitment $c$. The committer can then later reveal the message $m$, and a verifier can validate that indeed the commitment $c$ corresponds to $m$. A commitment scheme should be “binding” (once publishing $c$, the committer should not be able to find some other message $m’ \neq m$ which also corresponds to $c$) and “hiding” (publishing $c$ should not reveal any information about the underlying message $m$).

Now, with _polynomial_ commitment schemes, the committer commits to a _polynomial_ $\phi$, rather than some arbitrary message $m$. Polynomial commitment schemes satisfy the above-mentioned properties of normal commitment schemes, _and also achieve an additional property_: the committer should be able to “open” certain evaluations of the committed polynomial without revealing the entire thing. For example, the committer should be able to prove that $\phi(a)=b$ without revealing exactly what $\phi(x)$ is.

This is a really awesome property that is extremely useful for zero knowledge applications! We can use it to prove that we have some polynomial which satisfies certain properties (in this case, that it passes through a certain point $(a,b)$), all _without revealing what the polynomial is_!

Another reason why this property is useful is that the commitment $c$ is generally much smaller than the polynomial it represents. We’ll see a commitment scheme where a polynomial of arbitrarily large degree can be represented by its commitment as a single group element. This is especially desirable when thinking about posting data on-chain, where block space is a valuable asset, and any sort of compression can be immediately translated into cost savings.

## The KZG polynomial commitment scheme

Ok, now that we’ve motivated polynomial commitment schemes, let’s see how to actually construct one. The one we’ll be focusing on is the [Kate-Zaverucha-Goldberg](https://www.iacr.org/archive/asiacrypt2010/6477178/6477178.pdf) (KZG) polynomial commitment scheme. KZG is widely used for many tasks in the blockchain space - it is already being used by Scroll’s proof systems, and it will soon be integrated into Ethereum’s protocol with [Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) (EIP-4844). We’ll elaborate on each of these use cases later on.

This section will briefly outline the mathematical construction of the KZG polynomial commitment scheme. It is not meant to be comprehensive, but should give a clear picture of how things are working. For the mathematically inclined, we will provide some further references at the end of this section.

Anyway, let’s begin with the construction. The KZG polynomial commitment scheme consists of four steps.

Step 1 (Setup):

- The first step is a one-time trusted setup. Once this step is completed, the other steps can be repeated to commit to and reveal various different polynomials.
- Let $g$ be a generator of some pairing-friendly elliptic curve group $\mathbb{G}$
- Let $l$ be the maximum degree of the polynomials we want to commit to
- Pick some random field element $\tau \in \mathbb{F}_p$
- Compute $(g, g^{\tau}, g^{\tau^2}, …, g^{\tau^l})$, and release it publicly
  - Note that $\tau$ should _not_ be revealed - it is a secret parameter of the setup, and should be discarded after the setup ceremony such that nobody can figure out its value.[^1]

Step 2 (Commit to polynomial):

- Given a polynomial $\phi(x) = \sum_{i=0}^{l} \phi_i x^i$
- Compute and output commitment $c = g^{\phi(\tau)}$
  - Although the committer cannot compute $g^{\phi(\tau)}$ directly since he doesn’t know $\tau$, he can compute it using the output of the setup $(g, g^{\tau}, g^{\tau^2}, …, g^{\tau^l})$:
    - $\prod_{i=0}^{l} (g^{\tau^i})^{\phi_i}  = g^{\sum_{i=0}^{l}\phi_i \tau^i}= g^{\phi(\tau)}$

Step 3 (Prove an evaluation):

- Given an evaluation $\phi(a) = b$
- Compute and output proof $\pi = g^{q(\tau)}$
  - Where $q(x) := \frac{\phi(x) - b}{x - a}$
    - This is called the “_quotient polynomial._” Note that such a $q(x)$ exists if and only if $\phi(a)=b$. The existence of this quotient polynomial therefore serves as a proof of the evaluation.

Step 4 (Verify an evaluation proof):

- Given a commitment $c = g^{\phi(\tau)}$, an evaluation $\phi(a)=b$, and a proof $\pi = g^{q(\tau)}$
- Verify that $e(\frac{c}{g^b}, g) = e(\pi, \frac{g^{\tau}}{g^a})$, where $e$ is a non-trivial [bilinear mapping](https://en.wikipedia.org/wiki/Bilinear_map)
  - Some algebra (see linked notes below) shows that this is equivalent to checking that the property in Step 3 holds at $\tau$:
    - $q(\tau) = \frac{\phi(\tau) - b}{\tau - a}$
  - The bilinear mapping enables us to check this property without knowing the secret setup parameter $\tau$.
- Once this verification is complete, we can conclude that (with overwhelmingly high probability) the quotient polynomial is correct, and therefore that the evaluation is correct.

This was a very quick whirlwind of the math behind KZG, with some details left out. For more depth (and to see a cool extension where you can prove multiple evaluations with a single proof), check out these great resources:

- [Dankrad Feist’s notes on KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
- [Alin Tomescu’s notes on KZG](https://alinush.github.io/2020/05/06/kzg-polynomial-commitments.html)

## Use cases

**Scroll’s zk-rollups**

In the case of zk-rollups, we want to prove that some computation which occurred on L2 was valid. At a high level, the computation which occurs on L2 can be represented as a 2-dimensional matrix through a process called “witness generation.” The matrix can then be represented by a list of polynomials - each column can be encoded as its own 1-dimensional vector. The computation’s validity can then be expressed as a set of mathematical relations that must hold between these polynomials.[^2] For example, if the first three columns are represented by polynomials $a(x)$, $b(x)$, and $c(x)$ respectively, we may want the relation $a(x) \cdot b(x) - c(x) = 0$ to hold. Whether or not the polynomials (which represent a computation) satisfy these “correctness constraints” can be determined by evaluating the polynomials at some random points. If the “correctness constraints” are satisfied specifically at these random points, then a verifier can assert that, with very high probability, the computation is correct.[^3]

<img src="/imgs/homepage/blog/kzg/zkrollup.png" width="800"/>

One can naturally see how a polynomial commitment scheme like KZG can be directly plugged into this paradigm: the rollup will commit to a set of polynomials, which together represent the computation. A verifier can then ask for evaluations on some random points to check if the correctness constraints hold, therefore verifying if the computation represented by the polynomials is valid or not.[^4]

Scroll specifically uses KZG for its polynomial commitment scheme. There are a couple of other commitment schemes that would also function similarly, however they both currently have drawbacks in comparison to KZG:

1. The **Inner Product Argument** **(IPA)** scheme is appealing because it does not require a trusted setup, and can also be composed recursively in an efficient way. However, it requires a particular cycle of elliptic curves (known as the “[_Pasta curves_](https://electriccoin.co/blog/the-pasta-curves-for-halo-2-and-beyond/)”) in order to achieve its nice recursive properties. Efficient operations over these Pasta curves are currently not supported on Ethereum. This means that proof verification, which takes place at the Ethereum execution layer, would be extremely inefficient. If used without its recursive properties (say, using non-Pasta curves), IPA’s proof verification time grows linearly in the size of the circuit, which makes it infeasible for the huge circuits required for zk-rollups.
2. The **Fast Reed-Solomon IOP of Proximity** **(FRI)** scheme also does not require a trusted setup. It does not rely on elliptic curve cryptography, and accordingly has fast proof generation (expensive elliptic curve operations are not necessary for generating proofs) and is quantum-resistant. However, its proof size and verification time are both large compared to those of KZG.

**Ethereum’s Proto-Danksharding**

[Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) (EIP-4844) is a proposal which aims to make it cheaper for rollups to post data on Ethereum’s L1. It will do this by introducing a new transaction type called a “blob-carrying transaction.” This new transaction type will carry with it a larger data blob (on the order of 128 kB). However, the data blob will not be accessible from Ethereum’s execution layer (i.e. a smart contract cannot directly read a data blob). Rather, only a _commitment_ to the data blob will be accessible from the execution layer.

Now, how should we create the commitment to the data blob? We could generate a commitment by simply hashing the data blob. But this is a bit restrictive, as we can’t prove any properties of the data blob without revealing the whole thing.[^5]

We could alternatively treat the data blob as a polynomial (remember that it’s easy to represent mathematical objects such as data vectors as polynomials) and then use a polynomial commitment scheme to commit to the data. This allows us not only to achieve a commitment to the data, but also to be able to efficiently check certain properties of the data blob without needing to read the entire thing.

One very useful feature which is enabled by polynomial commitments to data blobs is that of [data availability sampling](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling) (DAS). With DAS, validators can verify the correctness and availability of a data blob _without needing to download the entire data blob_. We’ll not delve into the specifics of exactly how DAS works, but it is enabled by the special properties of polynomial commitment schemes that we’ve discussed above. While the actual implementation of DAS is not included in the initial Proto-Danksharding (EIP 4844) proposal, it will be implemented shortly afterwards, on the way to Ethereum achieving "full" Danksharding.

Ethereum plans specifically to use KZG as its polynomial commitment scheme. Researchers have explored other polynomial commitment schemes, and have [concluded](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#Couldn%E2%80%99t-we-use-some-other-commitment-scheme-without-a-trusted-setup) that KZG leads to the most elegant and efficient implementation for Ethereum’s Danksharding roadmap in the short to medium term.[^6]

**How Scroll’s zk-rollups and Ethereum’s Proto-Danksharding interact**

We’ve now discussed two seemingly independent uses of KZG: Scroll uses it to commit to computations executed on L2, and Ethereum uses it to commit to data blobs. Now we’ll see how these two uses of KZG can actually interact in a cool way!

After processing a batch of transactions on L2 and computing a new state root, Scroll will post essentially three things to the Ethereum L1:

- $T$ - the list of transactions that were executed on L2
- $s_i$ - the new state root at time-step $i$
- $\pi$ - a proof that the new state root $s_i$ is valid

We want to verify not only that the new state root $s_i$ is valid (i.e. that there exists _some_ list of transactions that, when properly executed, causes the previous state root $s_{i-1}$ to change to the new state root $s_i$), but also that the list of transactions $T$ _is actually the list of transactions_ which causes the state root to change from $s_{i-1}$ to $s_i$. In order to achieve this, we need to somehow enforce a connection between $T$ and $\pi$.

$T$ will be posted as a data blob, and so the verifier contract will have access to a KZG commitment to it. The proof $\pi$ will itself contain KZG commitments to various polynomials which represent the computation. One polynomial that is committed to within $\pi$ is the polynomial representing the list of transactions that were processed. Thus, we have two separate KZG commitments to the same data - let’s call them $C_T$ (from the data blob) and $C_{\pi}$ (from the proof), and let’s assume they represent the same underlying polynomial $\phi_T$ (this polynomial is a representation of the transaction list $T$). We can efficiently check if the two commitments represent the same polynomial with a “[proof of equivalence](https://ethresear.ch/t/easy-proof-of-equivalence-between-multiple-polynomial-commitment-schemes-to-the-same-data/8188)”:

1. Compute $z = \text{hash}(C_T | C_{\pi})$
2. Publish evaluation proofs that $\phi(z) = a$ under _both_ commitments $C_T$ and $C_{\pi}$

The idea here is to pick a random(ish) point, and check equality between the two polynomials. If the polynomials are equal at the randomly selected point (and the number of total points is sufficiently large), then the two polynomials are the same with very high probability.[^7]

This proof of equivalence actually works for any combination of polynomial commitment schemes[^8] - it doesn’t matter if one is a FRI commitment while the other is a KZG commitment, as long as both can be opened at a point.

## Wrapping up

Let’s do a bit of a recap.

We began by motivating polynomials. Polynomials are useful objects that can easily represent large mathematical objects. They become even more useful when we introduce polynomial commitment schemes. Polynomial commitment schemes are like normal cryptographic commitment schemes, with the additional property that point-evaluations can be proven without revealing the entire polynomial.

We then gave a mathematical description of one of the most popular polynomial commitment schemes: KZG. The scheme has four steps: (1) a one-time trusted setup; (2) a commitment $c = g^{\phi(\tau)}$; (3) a proof $\pi = g^{q(\tau)}$, where $q(x)$ is a quotient polynomial; and (4) a verification using a bilinear mapping, checking that the relation between $\phi(x)$ and $q(x)$ is correct.

The point-evaluation property of polynomial commitment schemes enables very cool applications.

We saw one such application in the case of zk-rollups: computation is represented as a polynomial, and its validity can be verified by checking that the polynomial satisfies certain constraints. Since polynomial commitment schemes allow for point-evaluation proofs, zk-rollups can simply use the concise commitment to represent the computation, rather than the lengthy polynomial itself.

Another application is Proto-Danksharding: data blobs are represented as polynomials, and their commitments are computed via KZG. The mathematical properties of KZG enable data availability sampling, which is critical to the scaling of Ethereum’s data layer.

We finished by examining how the commitments in Scroll’s zk-rollup proofs interact with data blob commitments on Ethereum.

[^1]: While it sounds like this is a hard task to achieve, there are established methods of conducting such trusted setup ceremonies with weak trust assumptions (1-out-of-N trust assumption) using [multi-party computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) (MPC). For more on how trusted setups work, check out [this post by Vitalik](https://vitalik.ca/general/2022/03/14/trustedsetup.html).
[^2]: This process of transforming a computation into a mathematical object, and expressing its validity as mathematical relations is known as “arithmetization.” There are various ways of doing this transformation, but Scroll uses [Plonkish arithmetization](https://zcash.github.io/halo2/concepts/arithmetization.html).
[^3]: This idea is formally known as the [Schwartz Zippel Lemma](https://en.wikipedia.org/wiki/Schwartz%E2%80%93Zippel_lemma), and it is widely used to efficiently validate properties of polynomials.
[^4]: Note that this interactive challenge where the verifier queries the polynomials at random points can be converted into a non-interactive protocol via the [Fiat-Shamir transform](https://www.zkdocs.com/docs/zkdocs/protocol-primitives/fiat-shamir/).
[^5]: We could alternatively prove some property of the data blob using a succinct proof (e.g. proving knowledge of the data which hashes to the correct hash, and then proving some property of that data), but this is too expensive to perform every time information about data blobs needs to be accessed/validated.
[^6]: In the long term, KZG may need to be swapped out for a polynomial commitment scheme which is quantum-resistant. Proto-Danksharding is being [implemented in a way](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#Why-use-the-hash-of-the-KZG-instead-of-the-KZG-directly) such that the commitment scheme can be swapped out in the future.
[^7]: This again follows from the [Schwartz Zippel Lemma](https://en.wikipedia.org/wiki/Schwartz%E2%80%93Zippel_lemma). Note that it’s important that the prover must not be able to know the value of the evaluation point $z$ before committing to data - this would enable the prover to easily construct a bogus polynomial which satisfies the equality check at $z$. By setting $z$ to the hash of both commitments, the prover cannot know $z$ until after both polynomials are committed.
[^8]: There is a complication, however, that arises when two polynomial commitment schemes operate over distinct groups. For example, Scroll currently uses the [BN254](https://neuromancer.sk/std/bn/bn254) curve while Ethereum plans to use [BLS12-381](https://electriccoin.co/blog/new-snark-curve/) curve for Proto-Danksharding. In this case, we aren’t able to directly compare group elements, as in the proof of equivalence outlined above. However, there’s a way around this, which can be read in [Dankrad Feist’s notes](https://notes.ethereum.org/@dankrad/kzg_commitments_in_proofs#ZKPs-over-non-aligned-fields).
