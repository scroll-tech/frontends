# The Anatomy of Proof Generation

_Written by Andy Arditi ([@\_andyrdt](https://twitter.com/_andyrdt)) and Ye Zhang ([@yezhang1998](https://twitter.com/yezhang1998))._

_Thanks to Yi Sun, Han Jian, and Ying Tong Lai for their feedback and review._

## Introduction

Zero-knowledge proofs (ZKPs) have recently been generating a lot of excitement in the crypto community.
As ZKPs have become increasingly feasible over the past few years, they have unlocked new technological possibilities, and are now seen as a predominant solution to problems in privacy and scaling.

Despite their promising potential, most of today’s ZKP systems face a major limitation: proof generation is slow and expensive.

This limitation is commonly posed as a criticism of ZKP technology, and rightly so (for now, at least). Generating a proof attesting to the correct execution of some program requires _many_ orders of magnitude more computation than the program’s original execution. Complex programs therefore become very expensive (sometimes _prohibitively expensive_) to generate proofs for. This high cost limits the universe of applications for which ZKP technology can be feasibly applied.

In this article, we’ll aim to understand _why_ proof generation is so expensive. In order to do so, we’ll need to break down _how_ proof generation works on a technical level, and see exactly which types of computations are involved. Once understanding the inner workings of proof generation, we can explore various ideas of how to accelerate it.

## Working example: Square-Fibonacci

In order to demonstrate the process of proof generation, we will use a working example throughout the article.

We define the Square-Fibonacci sequence[^1], a variation of the Fibonacci sequence:

- Let $f_0 = 1, f_1 = 1$
- For $$i \geq 2$$, define $f_{i} := (f_{i-2})^2 + (f_{i-1})^2 \mod q$
  - Where $q$ is a large prime integer. We use this modulus to bound the size of each element, so that it can be represented by some predetermined number of bits.

Let $n$ be some very large integer. For convenience, we’ll assume $n$ is a power of 2. Let $k$ be the $n^{th}$ Square-Fibonacci number.

**Our goal**: generate an efficiently-verifiable proof $\pi$ showing that indeed $k$ is the $n^{th}$ Square-Fibonacci number (i.e. $f_n = k$).

A verifier could naively check this statement themselves by computing $f_2$, and then $f_3$, and then $f_4$, and so on until reaching $f_n$, and then checking whether or not $f_n = k$. However, this requires many steps of computation (remember that $n$ is very large).

Ideally we’d like the proof $\pi$ to be "efficiently-verifiable" - the verifier should be able to verify the proof much more quickly and efficiently than recomputing $f_n$ explicitly.

## Overview of Plonk-based proof generation

In this post, we will focus specifically on explaining Plonk-based proof systems. While other proof systems exist, studying this particular class of systems will give one general insight into the proof generation process.

Since the [Plonk](https://eprint.iacr.org/2019/953.pdf) proof system was originally proposed in 2019, many extensions and variations have been developed. The family of Plonk-based proof systems has gained tremendous adoption, and is being used widely.

At Scroll, we are using "[Halo 2](https://electriccoin.co/blog/ecc-releases-code-for-halo-2/)," which is a Plonk-based proof system built and maintained by our wonderful friends at [Zcash](https://z.cash/). We [modify Halo 2](https://github.com/privacy-scaling-explorations/halo2) to use KZG as its polynomial commitment scheme (rather than its default scheme, [IPA](https://dankradfeist.de/ethereum/2021/07/27/inner-product-arguments.html)) in order to achieve more efficient on-chain proof verification.

### The phases of proof generation

At a high level, proof generation consists of three phases:

- **Phase 1**: write out the "witness"
  - The "witness" (also sometimes known as the "trace") refers to some data that shows _why_ a statement is true.
    - For example, in the Square-Fibonacci case, we would write out the step-by-step computation in a table, one step per row.
    - The first row would contain $[f_0, f_1, f_2]$, where $f_2 = (f_0)^2 + (f_1)^2$. The second row would contain $[f_1, f_2, f_3]$, where $f_3 = (f_1)^2 + (f_2)^2$, and so on, until reaching the last row containing $[f_{n-2}, f_{n-1}, f_{n}]$.
- **Phase 2**: commit to the witness
  - Committing to the witness involves outputting some succinct representation of the witness, and in this sense _compressing_ the witness.
  - Using a polynomial commitment scheme for this step allows us to prove certain properties about the original witness referencing just the succinct commitment.
- **Phase 3**: prove that the witness is correct
  - The witness generated in phase 1 must obey certain properties to be valid.
    - For example, in the Square-Fibonacci case, the mathematical relation $f_{i} = (f_{i-2})^2 + (f_{i-1})^2$ must hold within each row.
  - A short proof that the original witness satisfies these properties can be generated. Verification of the proof does not require access to the original witness table - verification can be performed referencing only the succinct commitment generated in phase 2.

We will dive into each of these three phases more deeply, and explore the computations required for each.
However, before doing so, we first need to briefly review some concepts about polynomials.

## Polynomial preliminaries

### Forms of representation

A polynomial $P(x) = \sum_{i=0}^{n-1} p_i x^i$ of degree $(n-1)$ can be represented in two ways:

1. **Coefficient form**
   - $P(x)$ can be represented as a tuple of its $n$ coefficients: $[p_0, p_1, \ldots, p_{n-1}]$
2. **Evaluation form**
   - $P(x)$ can be represented as a tuple of $n$ distinct evaluations: $[P(x_0), P(x_1), \ldots, P(x_{n-1})]$
     - The set of values $\{ x_0, x_1, \ldots, x_{n-1} \}$ over which the polynomial is evaluated is known as the "evaluation domain"

Converting from coefficient form to evaluation form is known as the "Fourier transform," and converting in the reverse direction is known as the "inverse Fourier transform."

Each of these two transforms can naively be achieved in $O(n^2)$ computation using simple methods. From coefficient form, we can simply evaluate the polynomial at each $x_i$ in evaluation domain. From evaluation form, we can use [Lagrange interpolation](https://en.wikipedia.org/wiki/Lagrange_polynomial#Definition) to obtain the unique degree $(n-1)$ polynomial passing through each of the $n$ points.

We will be working with polynomials of very high degree, and so we’d ideally like these transforms to be more efficient. This is where the _fast_ Fourier transform comes in.

### Fast Fourier transform (FFT)

The efficiency of the transforms can be improved by imposing some additional structure. Proof systems generally only consider polynomials over a [finite field](https://en.wikipedia.org/wiki/Finite_field), and so we will restrict each coefficient $p_i$ and each evaluation point $x_i$ to be elements of a finite field $\mathbb{F}_q$. Additionally, we will restrict the evaluation domain (the $x_i$’s) to be a multiplicative subgroup of $\mathbb{F}_q$. In other words, the evaluation domain can be written as $\{ \omega^0, \omega^1, \ldots, \omega^{n-1} \}$ for some element $\omega \in \mathbb{F}_q$ with order $n$ (i.e. $\omega^n = 1 \mod q$). The elements in this set are called "$n^{th}$ roots of unity," since exponentiating any of them to the power of $n$ will result in 1, the "unity" element.

This additional structure imposed over the evaluation domain enables some nice mathematical symmetries that can be leveraged to make the transforms more efficient. The **fast Fourier transform (FFT)** algorithm takes advantage of these symmetries to achieve a Fourier transform in $O(n \log n)$. The **inverse fast Fourier transform (iFFT)** algorithm similarly achieves an inverse Fourier transform in $O(n \log n)$.

For a more in depth account of the fast Fourier transform, check out this [blog post](https://vitalik.ca/general/2019/05/12/fft.html) by Vitalik.

With these preliminaries out of the way, we can proceed with our description of phase 1.

## Phase 1: Filling in the trace table

### The trace table

The **trace table** is a 2-dimensional matrix where the "witness," or "trace," is written down. The trace table also includes other values, in addition to the witness, that are useful in demonstrating that the witness is correct. Each cell in the trace table is an element of a large finite field $\mathbb{F}_q$.

Here’s what a trace table might look like for our working example:
<img src="/imgs/homepage/blog/proofGeneration/tracetable_1.png" width="550"/>

The first three columns labeled $A, B, C$ represent the "witness data" (also known as the "private input"). Each row lists three sequential Square-Fibonacci numbers. The $i^{th}$ row $(f_i, f_{i+1}, f_{i+2})$ can be seen as a witness for (or "attesting to") the $(i+2)^{th}$ Square-Fibonacci number, as it explicitly shows the previous two values used to compute it.

The $S$ column is known as a "selector" column. It indicates that a certain mathematical relation, or "custom gate," should hold over the elements of that row. In this case, a "1" in the $S$ column indicates that the first three elements of the row $(a, b, c)$ must satisfy $c = a^2 + b^2 \mod q$. A "0" in the $S$ column indicates that this custom gate condition does _not_ need to be satisfied. Note that in the last row, the witness data is blank, and so the selector is turned off. We insert this blank row for convenience, so that the height of the table becomes $n$, an even power of 2.

The $P$ column is known as a "public input" column. This column contains inputs to the circuit that are publicly known. In this case, the first two values in the Square-Fibonacci sequence $f_0, f_1$ are publicly known, and $k$ is the value in the statement to be proved.

### Witness generation

The process of actually filling in the trace table is called "witness generation."

This process requires iterating over each cell in the table and filling in its appropriate value. In general, a cell’s value is either copied in from an external source, or computed based on surrounding entries. The latter requires arithmetic over elements in $\mathbb{F}_q$, since each cell of the trace table is an element of this large finite field.

Arithmetic over large finite field elements is more expensive to compute than arithmetic over native types, such as `int` or `long`. The field elements generally require ~256 bits to represent, which is much larger than the [word size](<https://en.wikipedia.org/wiki/Word_(computer_architecture)>) of modern CPUs. Having to split each element’s representation across words, in addition to needing to compute all values modulo $q$, adds a computational overhead to each arithmetic operation.

In our working example, filling in the witness table involves computing $f_{i+2} = (f_{i})^2 + (f_{i+1})^2 \mod q$ at each row $i$, requiring multiplications and additions over $\mathbb{F}_q$.

For this particular example, the total computation required by witness generation is essentially the same as the total computation required to perform the original computation (computing the $n^{th}$ Square-Fibonacci number). Each row of the witness corresponds one-to-one with a step of the original computation.

However, for more complex examples[^2], the computation required for witness generation is usually much larger than the original computation. Each individual step of a complex computation may need to be represented by _many_ witness rows (>1000 in some cases). This more complex representation, or "arithmetization," usually leads to a significant blow up in the size of the trace table.

Overall, if a trace table is very large and there are a lot of entries to compute, the time and computation required for witness generation can be significant.

### Additional processing

Once the witness data (or "private input") has been filled in and committed to, there is some additional processing of the trace table that takes place.

Auxiliary columns (also called "virtual columns") are extra columns generated to facilitate proving the trace’s validity. There are certain types of constraints which necessitate these auxiliary columns.

One such constraint is the "wiring constraint." This constraint enforces that some set of cells in the trace table take on the same value. In the Square-Fibonacci trace table, we need such a constraint to enforce that each row proceeds sequentially from the previous one: for two consecutive rows $[a_i, b_i, c_i]$ and $[a_{i+1}, b_{i+1}, c_{i+1}]$, we enforce that $a_{i+1} = b_i$ and $b_{i+1} = c_i$.

At a high level[^3], an intermediate "accumulator polynomial" is computed from the witness data, and stored in evaluation form as an extra auxiliary column $Z$. Proving that the wiring constraint holds then reduces to proving that certain constraints hold over $Z$ and its relation to the other witness columns.

Another type of constraint which requires auxiliary columns is lookup tables. First introduced in 2020 by [plookup](https://eprint.iacr.org/2020/315.pdf), lookup tables allow for efficient set-membership checks. The computation required by auxiliary column generations for lookups can involve sorting in addition to arithmetic operations.

Note that auxiliary columns are computed only after the witness data has been fully generated and committed to. Auxiliary column values don’t just depend on the witness data, but also on some additional randomness. This randomness is computed using the [Fiat-Shamir heuristic](https://en.wikipedia.org/wiki/Fiat%E2%80%93Shamir_heuristic), and the transcript on which it depends includes the commitments to the witness data.

### Phase 1 cost summary

- Enter witness data into trace table
  - Iterate over and fill in all witness cells in trace table
  - Computing witness values requires large finite field arithmetic
- Generate auxiliary columns for wiring and lookup constraints
  - Requires additional large finite field arithmetic (as well as sorting, in the case of lookups)

## Phase 2: Committing to the trace table

### Interpreting the trace table columns as polynomials

Consider column $A$ from our trace table. This column, along with all the others, is simply a length-$n$ vector of finite field elements. We can think of this vector as the evaluation form of a unique polynomial $A(x)$ with degree $(n-1)$: the $i^{th}$ element of $A$ corresponds to the evaluation $A(\omega^i)$. Here, $\omega \in \mathbb{F}_q$ is as defined in the "Polynomial preliminaries" section - it has order $n$.

Here’s what our trace table (including the auxiliary column $Z$) looks like, interpreted as column polynomials in evaluation form:
<img src="/imgs/homepage/blog/proofGeneration/tracetable_2.png" width="700"/>

### Commit to column polynomials

Now that we see how to interpret the columns as polynomials, we can commit to each of them using a polynomial commitment scheme.

This allows us to "compress" each column into a short representation. Doing this for all the columns yields a succinct representation of the entire trace table.

Using a polynomial commitment scheme also allows us to generate proofs of evaluation - the prover can convince a verifier that the committed polynomial passes through a particular point, without revealing the entire polynomial.

### Computing KZG commitments

This subsection will give a brief overview of the mathematical computation required to compute KZG commitments for each column. For a more thorough treatment of the math, see Dankrad Feist’s posts on [KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) and [PCS multiproofs](https://dankradfeist.de/ethereum/2021/06/18/pcs-multiproofs.html) (in the latter article, see the sections titled "Evaluation form" and "Lagrange polynomials").

First a bit of notation: let $[r]_1$ denote $r \cdot g$, where $g$ is a generator for the elliptic curve group $\mathbb{G}_1$.

Let $\tau \in \mathbb{F}_p$ denote the secret value used in the KZG trusted setup ceremony. We can write the output of the KZG setup as $([\tau^0]_1, [\tau^1]_1, [\tau^2]_1\ldots, [\tau^l]_1)$. Note that $l$ is an upper bound on the degree of the polynomials which can be committed to from this setup.

Suppose $A(x)$ is the column polynomial that we want to commit to. The KZG commitment to be computed for this polynomial is $[A(\tau)]_1$.

If we had $A(x)$ in coefficient form, denoting its $i^{th}$ coefficient as $A^{(i)}$, we could compute the commitment value as follows:

$$
[A(\tau)]_1 = \sum_{i=0}^{n-1} A^{(i)}\cdot [\tau^i]_1
$$

However, this would require converting $A(x)$ from evaluation form to its coefficient form.

It turns out that there is a way of efficiently computing $[A(\tau)]_1$ directly from $A(x)$’s evaluation form. We can achieve this by utilizing [Lagrange basis polynomials](https://en.wikipedia.org/wiki/Lagrange_polynomial):

- For a polynomial $A(x)$ evaluated over the evaluation domain $\{ x_0, x_1, \ldots, x_{n-1} \}$
  - Define $n$ "Lagrange basis polynomials":
    - For $0 \leq i < n$
      - $\ell_{i}(x):= \prod_{j \neq i} \frac{x-x_j}{x_i - x_j}$
  - We can then write $A(x) = \sum_{i=0}^{n-1} A(x_i) \cdot \ell_i(x)$
    - In particular, $A(\tau) = \sum_{i=0}^{n-1} A(x_i) \cdot \ell_i(\tau)$
    - Therefore, we can write
      - $[A(\tau)]_1 = [\sum_{i=0}^{n-1} A(x_i) \cdot \ell_i(\tau)]_1 = \sum_{i=0}^{n-1} A(x_i) \cdot [\ell_i(\tau)]_1$

In our case, the evaluation domain is $\{ x_0, x_1, \ldots, x_{n-1} \} = \{ \omega^0, \omega^1, \ldots, \omega^{n-1} \}$, and so each basis polynomial can be precomputed as $\ell_i(x) = \prod_{j \neq i} \frac{x - \omega^j}{\omega^i - \omega^j}$. Further, since the same secret $\tau$ is used every time, each $[\ell_i(\tau)]_1$ can be precomputed:

$$
[\ell_i(\tau)]_1 = \left[ \sum_{j=0}^{n-1} \ell_i^{(j)}\cdot \tau^j \right]_1= \sum_{j=0}^{n-1} \ell_i^{(j)} \cdot [\tau^j]_1
$$

With each $[\ell_i(\tau)]_1$ precomputed, committing to column $A$ requires only the following computation at the time of proof generation:

$$
[A(\tau)]_1 = \sum_{i=0}^{n-1} A(\omega^i) \cdot [\ell_i(\tau)]_1
$$

Note that each $A(\omega^i)$ is an element of $\mathbb{F}_q$ (it’s just the $i^{th}$ element of column $A$ in the trace table). Each $[\ell_i(\tau)]_1$ is an element of the elliptic curve group $\mathbb{G}_1$. Therefore, this computation can be seen as the dot product between a vector of scalars and a vector of group elements.

### Multi-scalar multiplication (MSM)

In general, the problem of computing the dot product between a vector of scalars and a vector of group elements is known as "**multi-scalar multiplication**," or "**MSM**" for short.

Despite sounding simple, MSMs are not trivial to compute, as they involve arithmetic over group elements. This group arithmetic is generally even more expensive than the large finite field arithmetic we encountered in phase 1. In our case, we are working with an elliptic curve group, in which a single addition of two elements requires many finite field arithmetic operations.

For a more complete presentation of MSM and some ideas of its implementation, see this [great post](https://www.entropy1729.com/multiscalar-multiplication/) by Entropy1729.

### Phase 2 cost summary

- Commit to each column (real and auxiliary) of the trace table
  - For each column with length $n$, its KZG commitment can be computed via a size $n$ MSM

## Phase 3: Proving the trace table’s correctness

At this point, we have filled out the entire trace table, and have committed to each of its columns (including the auxiliary columns).

All that’s left to do now is show that the original trace table is valid.

What does it mean for the original trace table to be valid? It means that particular constraints are satisfied. In our working example, we have the following constraints:

- The Square-Fibonacci constraint:
  - Each selected row $i$ must satisfy $c_i = a_i^2 + b_i^2 \mod q$
- Wiring constraints:
  - For consecutive rows with values $[a_i, b_i, c_i]$ and $[a_{i+1}, b_{i+1}, c_{i+1}]$, we require $a_{i+1} = b_i$ and $b_{i+1} = c_i$
- Public input constraints:
  - The first row must start with the first two Square-Fibonacci numbers, which are written in the first two rows of the public input column: $a_0 = p_0, b_0 = p_1$
  - The cell corresponding to the $n^{th}$ Square-Fibonacci number must match the claimed result value, which is written in the third row of the public input column: $c_{n-2} = p_2$

By viewing each column as a polynomial in evaluation form (i.e. seeing $a_i$ as $A(\omega^i)$), each of the above constraints can be represented by one or more relations between the column polynomials.

For example, the Square-Fibonacci constraint can be expressed as the following relation between the column polynomials $A, B, C, S$:

$$
S(x) \cdot (A(x)^2 + B(x)^2 - C(x)) = 0, \text{ for all } x \in \{\omega^0, \omega^1, \ldots, \omega^{n-1} \}
$$

For shorthand, we’ll label the left-hand side $\phi_0(x) := S(x) \cdot (A(x)^2 + B(x)^2 - C(x))$.

All our constraints can be expressed in the following form:

$$
\phi_i(x) = 0, \text{ for all } x \in \{ \omega^0, \omega^1, \ldots, \omega^{n-1}\}
$$

### Combining constraints

In general, when we have $m$ constraint polynomials $\phi_0(x), \phi_1(x), \ldots, \phi_{m-1}(x)$ that all must evaluate to 0 over the evaluation domain, we can batch them all together to get a single constraint polynomial $\phi(x)$ that must evaluate to 0 over the evaluation domain. We do this by sampling a random field element $\gamma \in \mathbb{F}_q$, and then taking a random linear combination of the individual constraints:

$$
\phi(x) := \gamma^0 \cdot \phi_0(x) + \gamma^1 \cdot \phi_1(x) + \ldots + \gamma^{m-1} \cdot \phi_{m-1}(x)
$$

If all of the individual constraint polynomials evaluate to 0 over the evaluation domain, then so does the meta-constraint polynomial $\phi(x)$. If any one of the individual constraint polynomials _does not_ evaluate to 0 at some point in the evaluation domain, then it is almost certain that $\phi(x)$ will not evaluate to 0 at that point either.[^4] Thus, it is sufficient to show that $\phi(x)$ evaluates to 0 over the entire evaluation domain.

$$
\text{constraints satisfied at every row} \iff \hspace{-2mm}{_p} \hspace{2mm}  \phi(\omega^i)=0 \text{ for all } 0 \leq i < n
$$

How can we prove the statement on the right-hand side? Well we could reveal and prove the evaluations of each column polynomial at every one of the $n$ domain points. This would allow us to compute $\phi(x)$ at each point of interest. But this would lead to a large proof size - we would need to provide $n$ evaluation proofs per column polynomial.

It turns out that we can prove such a constraint using _just one_ evaluation proof per column polynomial.

### The quotient polynomial

We need to show that the meta-constraint $\phi(x)$ holds for each row of the trace table. This statement _is not_ easy to prove directly. But it turns out that we can derive[^5] an equivalent[^6] statement which _is_ easy to prove:

$$
\begin{aligned}
\text{constraints satisfied at every row} &\iff \hspace{-2mm}{_p} \hspace{2mm}
 \phi(\omega^i) = 0 \text{ for all } 0 \leq i < n\\
& \iff (x- \omega^i) | \phi(x) \text{ for all } 0 \leq i < n\\
& \iff \prod_{i=0}^{n-1} (x - \omega^i) | \phi(x)\\ & \iff (x^n -1) | \phi(x)\\
& \iff \exists Q(x) \text{ s.t. } \phi(x) = Q(x) \cdot (x^n - 1) \end{aligned}
$$

So, if we want to prove that all constraints hold across every row, then it is equivalent to prove that there exists a polynomial $Q(x)$ which satisfies the above property. This polynomial is generally referred to as the "quotient polynomial."

### Computing and committing to the quotient polynomial

The quotient polynomial can be computed as

$$
Q(x) := \frac{\phi(x)}{x^n - 1} = \frac{\gamma^0 \phi_0(x) + \gamma^1 \phi_1(x) + \ldots + \gamma^{m-1}\phi_{m-1}(x)}{x^n -1}
$$

While the quotient polynomial is straightforward to express theoretically, computing it in practice actually tends to be one of the most convoluted and computationally expensive steps.

Let’s consider the degree of $Q(x)$. Its degree is equal to the constraint polynomial with the highest degree, minus $n$. In our case, the Square-Fibonacci constraint $\phi_0(x) = S(x) \cdot (A(x)^2 + B(x)^2 - C(x))$ has the highest degree of $3n-3$, and so the corresponding quotient polynomial $Q(x)$ will have degree $2n-3$. In order to fully define such a polynomial, we need at least $2n-2$ evaluation points.

So, let’s make it a nice round number and use $2n$ evaluation points. Our previous evaluation domain will not work - the order of $\omega$ is $n$, and so the set of $\{ \omega^i | i \in \mathbb{N} \}$ only has size $n$. We therefore need to pick some other element $\beta \in \mathbb{F}_q$ with order $2n$. We can then evaluate $Q(x)$ over the evaluation domain of $\{ \beta^0,  \beta^1, \ldots, \beta^{2n-1}\}$ to obtain the $2n$ evaluations that we need.

Here are the steps required to most efficiently do this:

- For each column polynomial, convert from evaluation form to coefficient form
  - Each transform can be achieved in $O(n \log n)$ using an iFFT
- For each column polynomial in coefficient form, generate $2n$ evaluations
  - Each transform can be achieved in $O(2n \log 2n) = O(n \log n)$ using an FFT
- With $2n$ evaluations of each column polynomial, we can now compute the $2n$ evaluations of $Q(x)$
  - This simply requires field arithmetic according to the quotient polynomial’s formula

With the $Q(x)$ in its evaluation form, we could now compute its commitment in the same way we committed to our column polynomials:

$$
[Q(\tau)]_1 = \sum_{i=0}^{2n-1} Q(\beta^i) \cdot [\ell_i’(\tau)]_1
$$

Note, however, that since $Q(x)$ is of a larger degree than the column polynomials, we would need to use a distinct Lagrange basis, larger than the one previously used. While precomputing this larger Lagrange basis and using it to compute the commitment is possible, it requires a larger KZG trusted setup - the size of the trusted setup must exceed the quotient polynomial’s degree.

In practice, we use a trick so that we only have to commit to polynomials with degree $< n$. We first transform $Q(x)$ to coefficient form using a size $2n$ iFFT. Then, we split $Q(x)$ into two smaller polynomials $Q_{lo}(x), Q_{hi}(x)$ such that $Q(x) = Q_{lo}(x) + x^n \cdot Q_{hi}(x)$. Each smaller polynomial has degree $<n$, and therefore each can be committed to using a size $n$ MSM.

Thus, once the quotient polynomial is computed in coefficient form, splitting and committing to it requires a size $2n$ iFFT, and 2 size $n$ MSMs.

Note that the number of sub-polynomials depends on the degree of the quotient polynomial - if the quotient polynomial were to have degree $3n$, we’d need to split it into 3 sub-polynomials.

### Proving the quotient polynomial’s existence

As of this point, the prover has committed all column polynomials from the trace table, and has also committed to the quotient polynomial. The prover now needs to demonstrate that the quotient polynomial really does exist and that it was computed correctly. Remember that if this holds, then all constraints hold at each row, and therefore the trace table is valid.

This can be achieved by the following routine:

1.  Sample a random point $\alpha \in \mathbb{F}_q$
2.  Generate and output KZG evaluation proofs[^7] for all column polynomials and the quotient polynomial at the point $\alpha$
    - To generate a KZG proof of an evaluation $A(\alpha) = z$, we compute and output $\left[ \frac{A(\tau) - z}{(\tau - \alpha)}\right]_1$
    - Similarly to the KZG commitments, this value is computed as an MSM
      - Each column polynomial requires a size $n$ MSM
      - The quotient polynomial requires 2 size $n$ MSMs

### Verifying the quotient polynomial

The verifier receives the proof and must check that it is correct. The complete proof consists of:

- Commitments to each column (including auxiliary columns) and to the quotient polynomial
- Evaluation proofs for each column and the quotient polynomial at $\alpha$

The verifier can check the proof as follows:

1. Verify that each evaluation proof is correct
2. Verify that the quotient polynomial formula holds at the evaluation point $\alpha$:

$$
Q(\alpha) = \frac{\phi(\alpha)}{\alpha^n - 1} = \frac{\gamma^0 \phi_0(\alpha)+\gamma^1\phi_1(\alpha) + \ldots + \gamma^{m-1}\phi_{m-1}(\alpha)  }{\alpha^n -1}
$$

If the property in step 2 holds at $\alpha$, then (with near certainty) it holds everywhere, since $\alpha$ is sampled at random.[^8]

Each evaluation proof verification requires computing an [elliptic curve pairing](https://vitalik.ca/general/2017/01/14/exploring_ecp.html). Verifying the quotient polynomial formula requires some finite field arithmetic (to compute the right-hand side of the equation). In sum, the computation required for verification is lightweight in comparison to the computation required for proof generation, and is generally able to be performed efficiently on-chain.

### Phase 3 cost summary

- Compute the quotient polynomial in evaluation form
  - Convert each column polynomial to coefficient form via size $n$ iFFT
  - Convert each column polynomial to expanded evaluation form via size $2n$ FFT
  - Evaluate the quotient polynomial at each of the $2n$ points, using the evaluation form of each column polynomial
- Commit to the quotient polynomial
  - Convert to coefficient form via size $2n$ iFFT, in order to split
  - Commit to each split polynomial, requiring a total of 2 size $n$ MSMs
- Generate evaluation proofs for each polynomial evaluated at random $\alpha$
  - Each column polynomial requires a size $n$ MSM
  - The (split) quotient polynomial requires 2 size $n$ MSMs

Note that the size of the FFTs/iFFTs and the number of MSMs depend on the degree of the quotient polynomial, which in turn depends on the highest degree polynomial constraint. In our case, the highest degree constraint had degree $\approx 3n$, which led to a quotient polynomial of degree $\approx 2n$.

## Conclusion

### Recap

Let’s do a quick recap of the costs associated with proof generation:

- Phase 1: Filling in the trace table
  - Filling in witness data requires arithmetic operations over a large finite field
  - Trace tables are generally very large, due to a blow up factor when converting complex computation to a table/circuit format
  - Auxiliary columns require additional arithmetic operations and sorting
- Phase 2: Committing to the trace table
  - Committing to each column requires a size $n$ MSM
- Phase 3: Proving the trace table’s correctness
  - Computing the quotient polynomial’s evaluation form requires
    - A size $n$ iFFT for each column
    - A size $2n$ FFT for each column
    - Arithmetic operations over a large finite field
  - Committing to the quotient polynomial requires
    - A size $2n$ iFFT to convert to evaluation form
    - 2 size $n$ MSMs, one per split polynomial
  - Generating the KZG evaluation proofs requires
    - A size $n$ MSM for each column
    - 2 size $n$ MSMs for the (split) quotient polynomial

From this summary, it is clear that phase 2 and phase 3 are dominated by the heavy computational algorithms of MSM, FFT, and iFFT. It is also clear that all computational steps grow as $n$ increases, including the witness generation computations from phase 1.

### Paths toward acceleration

With this new light shed on the computational bottlenecks of proof generation, we can begin to reason about how the overall process can be accelerated. There are many approaches to acceleration being actively pursued across the community. Listed below are four primary paths toward acceleration:

**1. Hardware acceleration for heavy computations**

We’ve seen that heavy computations such as MSM, FFT, and iFFT make up a large chunk of the total computation required for proof generation. These algorithms tend to run quite slowly on CPUs, and can be accelerated greatly by running on GPUs, FPGAs, or ASICs. Investigating how best to run these algorithms on specialized hardware is a very active area of research.

**2. Reduce the number of rows in the trace table**

We’ve also seen that virtually all computations involved in proof generation scale with $n$, the number of rows in the trace table (also referred to as the "number of gates," when the trace table is interpreted as a circuit). Figuring out how to represent certain complex computations while using the fewest number of rows is an area of research with great efficiency implications.

**3. Parallelize and pipeline**

Many proof systems, including the one we studied here, have natural opportunities for parallelization. For example, within the column commitment step of phase 2, each column’s commitment can be computed in parallel. Going a step further, each witness column’s commitment MSM can be computed concurrently with its generation. Parallelizing and pipelining computations can significantly speed up the overall process.

**4. Alternative proof systems**

This article covered the computational requirements of a single particular proof system. This proof system is just one of many - there exists a very large design space of theoretical proof systems, with each proof system having its own set of computational requirements and tradeoffs. Research is actively ongoing to further explore this design space, and to design theoretical constructions that reduce or eliminate computational bottlenecks.

[^1]: The Square-Fibonacci example is inspired by this [wonderful tutorial](https://starkware.co/stark-101/) from StarkWare.
[^2]: For example, if our trace table elements were modulo $p$, rather than the same modulo $q$ as in the Square-Fibonacci problem, then each computation step would involve [non-native field arithmetic](https://hackmd.io/@arielg/B13JoihA8) (i.e. computing $\mathbb{F}_q$ arithmetic in $\mathbb{F}_p$, with $q \neq p$). The representation of each computation would fan out to multiple rows and constraints.
[^3]: To understand wire constraints in Plonk more deeply, I recommend the following resources: Vitalik’s [post](https://vitalik.ca/general/2019/09/22/plonk.html) on Plonk (see "Copy constraints" section), Aztec’s [notes](https://hackmd.io/@aztec-network/plonk-arithmetiization-air) on arithmetization, and Ariel Gabizon’s [notes](https://hackmd.io/@arielg/ByFgSDA7D) on multiset checks.
[^4]: This follows from the [Schwartz-Zippel Lemma](https://en.wikipedia.org/wiki/Schwartz%E2%80%93Zippel_lemma).
[^5]: The second line follows from the [polynomial remainder theorem](https://en.wikipedia.org/wiki/Polynomial_remainder_theorem). The fourth line follows from the fact that $\prod_{i=0}^{n-1} (x-\omega^i) = (x^n -1)$.
[^6]: Technically the statements are not logically equivalent. They are probabilistically equivalent (which we denote as "$\iff \hspace{-2mm}{_p}$"), since the first step relies on the Schwartz-Zippel Lemma.
[^7]: See Dankrad Feist’s [post](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) or Alin Tomescu’s [notes](https://alinush.github.io/2020/05/06/kzg-polynomial-commitments.html#evaluation-proofs) for a refresher on how to generate a KZG evaluation proof.
[^8]: This again follows from the Schwartz-Zippel Lemma.
