# Data Availability Post 4844

*Acknowledgments: Special thanks to [Protolambda](https://x.com/protolambda), [Ye Zhang](https://twitter.com/yezhang1998), [Jens Ernstberger](https://twitter.com/0xSerious), [Péter Garamvölgyi](https://twitter.com/thegaram33), and [Hanzaleh Akbari](https://scholar.google.com/citations?user=O2IVJ6sAAAAJ&hl=en) for fruitful discussions and feedback on earlier drafts of this post.*

## Introduction

For the past few years, solving the blockchain [scalability trilemma](https://github.com/ethereum/wiki/wiki/Sharding-FAQs/c54cf1b520b0bd07468bee6950cda9a2c4ab4982#this-sounds-like-theres-some-kind-of-scalability-trilemma-at-play-what-is-this-trilemma-and-can-we-break-through-it) has been the top priority for the Ethereum community. The goal is to achieve higher scalability without sacrificing decentralization or security. After much-needed exploration, the Ethereum community has unanimously adopted [a rollup-centric approach](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) to tackle scalability, prioritizing the needs of rollups in Ethereum’s roadmap. 

The one and only feature requested by most rollups is an improvement of Ethereum’s usability as a data availability layer. [EIP4844](https://www.eip4844.com), otherwise known as Proto-Danksharding, is Ethereum’s quick answer to this need, while a [more advanced version](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq#What-is-Danksharding) of the same EIP is in the making. EIP4844 introduces a new transaction format called *[blob-carrying transactions](https://eips.ethereum.org/EIPS/eip-4844)*, which will allow users to include a blob of data in the transaction; this data is guaranteed to be available for a few weeks. Soon the Ethereum network is going to go through a hardfork dubbed as [Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)-[Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md) that includes EIP4844, among other things.

Data availability has long been a topic of discussion, at least with regard to the pace of things going in and out of fashion in the blockchain sphere. However, we believe there is much to be demystified. In this post, we discuss what a data availability layer is and why rollups need to use one. Moreover, we discuss EIP4844 and how it is going to improve Ethereum’s ability to serve as a data availability layer. Finally, we look into opening a blob commitment in a circuit and present a simple proof of concept.

## Is Integrity of Execution All You Need?

A decentralized and permissionless blockchain offers many attractive guarantees to its users, including censorship resistance, immutability, liveness, and most prominently, integrity of execution. Simply put, the state transitions are valid, and smart contract executions are always done correctly. This is only possible thanks to every node checking the validity of blocks and the decentralized nature of the network. Rollups attempt to provide the same guarantees but cheaper!

The main idea of rollups is to move execution off of L1 to a cheaper environment, while employing a mechanism to prove [succinctly (ZK)](https://ethereum.org/en/developers/docs/scaling/zk-rollups/) or [optimistically (OP)](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/) to an L1 rollup contract that these executions are done correctly and the state transitions are valid. It is important to note that the so-called rollup contract typically sees only a commitment to the full state of the rollup chain, such as the Merkle Root of its state tree. A state transition updates this commitment.

The following is a reminder of how the two major classes of these mechanisms work:

- **OP:** Optimistic mechanisms are based on fraud proofs. The idea is that if a rollup operator submits an invalid state transition to the L1 rollup contract, people are incentivized to prove this violation to the contract and get rewarded. Therefore, **if we assume that someone can monitor the rollup chain at any time (albeit with some delay), the integrity of the execution is guaranteed.**
As long as there is no invalid state transition, L1 never has to execute any of the rollup transactions; that’s where the users get their cost savings. In contrast, should a rollup operator attest to an invalid state transition, it is imperative for someone to construct and present a fraud-proof within a designated time frame; otherwise, the invalid state transition will irrevocably be finalized.
Note that the rollup chain full-state has to be available (or recoverable) to the watchers, otherwise they can’t even recognize an invalid state transition.
- **ZK:** Succinct proofs of validity are stronger, in the sense that they do not rely on an incentivized actor to watch the chain. The inner working of these proofs are more complicated and utilize [cryptographic](https://scroll.io/blog/proofGeneration) [magic](https://scroll.io/blog/kzg), but what they achieve is simple, mathematically proving that the new state of the rollup chain is the result of correct execution. That means even if the full-state of the rollup chain is never available, the **integrity of execution is always guaranteed**.

**This article will focus on rollups with succinct proofs.** 

**Unfortunately, integrity of execution is not all you need**. To provide properties like censorship resistance or liveness, **a rollup still needs to guarantee that its full-state is recoverable**. If a rollup cannot guarantee that its full-state is recoverable, then a user can’t make a proof of balance in the rollup chain. In turn, they will not be able to withdraw their funds to L1 without the cooperation of the rollup operator; clearly, this is an unacceptable deviation from the guarantees of L1.

## What is Data Availability again?

**Data availability (DA) is a guarantee that refers to data being published openly and promptly within the network.** In other words, data being available in this context means it is not withheld by the supposed publisher. Note that data availability is not about permanent storage; data is going to be available just for long enough that anyone who is interested gets a chance to fetch it. The **data availability layer** is an infrastructure for publishing data that guarantees the data will be available. 

If you find the term data availability confusing or misleading, you are not alone. In retrospect, an alternative term like **data publishing** might have been a better choice. 

See: https://twitter.com/dankrad/status/1699598362851287459

### Origin of the Data Availability Problem

The problem of ensuring data availability was first introduced in the context of scaling solutions for Layer 1. A natural and simple strategy for scaling is to increase the capacity of each block. Many scalability solutions do this in one way or another. The main issue with any scalability solution that increases block size is that everyone in the network has to download and validate all the blocks. Consequently, if we increase the block size too much, weaker nodes fall behind and are effectively eliminated. Hence, we get a less decentralized network little by little. If we could somehow distribute the task of validating blocks among nodes so that everybody has to download and validate only a small portion of each block, then we could have larger blocks. One challenge of this family of solutions is to ensure that the whole block was indeed published.   

### Data Availability for Rollups

In the previous section, we discussed why the recoverability of the full-state of the rollup chain is necessary to maintain the guarantees of L1. We can **guarantee that the full-state is recoverable by making either of the following available (1) transaction data or (2) state diff data.** 

**The rollup inherits all security assumptions of its data availability layer.** That is why many rollups use the same L1 they are operating on as the data availability layer: to avoid additional security assumptions. One way to use Ethereum as the data availability layer is to simply embed the data in a transaction and make sure it gets included in an L1 block. As long as Ethereum blocks are available, the embedded data in the transaction will be available too. Ethereum blocks are expected to be available, as the block producers are incentivized to promptly broadcast their blocks to obtain attestations from other validators; otherwise their block will be ignored.

Currently, before the inclusion of EIP4844, the cheapest way to embed data in a transaction is to include the data as `calldata`. `calldata` is a read-only memory space where the arguments you send with the smart contract function calls are stored. This memory space is only accessible during the execution of the function and is more gas-efficient than storage. While the content of the `calldata` is not accessible in the EVM environment after the function call, anyone who has access to the history of Ethereum transactions can still recover it.

However, `calldata` **is still more expensive than necessary as it provides other features on top of data availability**; basically calldata can be read from the smart contract. EIP4844 introduces `blob-carrying transactions` that are designed to serve as data availability utility. Only a commitment to the blob data is available in the EVM, and it is not possible to directly read this data in the smart contract. Hence, it is expected that the cost of publishing data in blobs would be significantly cheaper. However, blob data-gas is going to be priced separately with an EIP1559-like mechanism. More on this later. 

It is important to note that reducing the cost of data availability directly translates to a lower cost of operation for rollups, and that means lower transaction fees for rollup users. Today, roughly 80% of  gas fees paid by a typical rollup operator is for embedding the rollup chains data on L1 as `calldata`, and only 20% for proof verification.

## Data Availability in Scroll’s Protocol

### A ZKRollup Contract: Commit and Finalize

Scroll's rollup process has many stages, but for the purposes of this article, we will solely focus on **commit** and **finalize**, two stages that deal with data availability and proof verification. 

- **commit:** Every few minutes the sequencer submits a new batch of transactions as `calldata` to the `commitBatch` function of the [rollup contract](https://github.com/scroll-tech/scroll/blob/33089b829f72ce4ae56ba105248a1bbab9eb0d8e/contracts/src/L1/rollup/ScrollChain.sol#L164C25-L164C25). The function [computes](https://github.com/scroll-tech/scroll/blob/33089b829f72ce4ae56ba105248a1bbab9eb0d8e/contracts/src/L1/rollup/ScrollChain.sol#L251C40-L251C40) and [stores](https://github.com/scroll-tech/scroll/blob/33089b829f72ce4ae56ba105248a1bbab9eb0d8e/contracts/src/L1/rollup/ScrollChain.sol#L253C9-L253C25) the `Keccak` hash of the batch, which will serve as a commitment and input to the snark verifier when we verify the proof. Note that the L2 transactions data is embedded in this L1 transaction. While the data is not stored in the Ethereum state, it effectively serves as a data availability solution for Scroll’s chain. Anyone can just collect these transactions (from archive nodes) and look at their payload.
- **finalize:** After committing to a batch, the provers start creating a succinct state transition proof for the execution of the batch. `finalizeBatchWithProof` takes the proof as input and verifies a statement that looks like the following:
    > Given `prevStateRoot`, executing the transaction batch committed to in `commitment(txBatch)` results in the updated state root `postStateRoot`.
    
    Note that the finalize step only takes a commitment to all executed transactions as an input, as opposed to all transactions in plain.


### PI Circuit: Decompressing Public Inputs

As we mentioned previously, the statement proven only includes a commitment to transactions executed. This is meant to save the on-chain verifier contract from having to process a big [public input polynomial](https://scroll.io/blog/proofGeneration#phase-1-filling-in-the-trace-table), effectively compressing the public input. The prover, however, has to open this commitment in-circuit, i.e. it has to know the actual transactions in the batch. On Scroll's zkEVM, the [PI circuit](https://github.com/scroll-tech/zkevm-circuits/blob/develop/zkevm-circuits/src/pi_circuit.rs) is the sub-circuit that opens this commitment and decompresses the public input for the rest of the zkEVM. 

The PI circuit is provided with the commitment to the transaction batch as public input, and the prover has to provide the raw transaction batch data as witness. **The constraints of the PI circuit check that the provided witness indeed corresponds to the commitment in the public input.** Skipping this consistency check allows a malicious prover to commit to a batch of transactions and execute another batch of transactions, effectively making recovery of the full-state of the rollup chain impossible.

## Extending Ethereum’s Usability as Data Availability Layer

So far we talked about data availability importance and how Ethereum is used today as a DA layer. Now let us put our protocol designer hats on and take a quick look at different ideas for increasing Ethereum’s capacity as a DA layer.

- **reduce `calldata` gas cost:** this is a very intuitive idea that can automatically increase Ethereum’s capacity to publish more data for data availability purposes. In fact, this was done in past in [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028). However, there is a limit to this approach. Lower gas cost for `calldata` means larger blocks, implying higher delays for block propagation. Pushing block propagation delay too high can [destabilize the consensus mechanism of L1](https://eprint.iacr.org/2016/454.pdf). 
- **reduce `calldata` gas cost with a cap on total `calldata` in a block:** [EIP4488](https://eips.ethereum.org/EIPS/eip-4488) proposed exactly that. While this sounds like a good deal, Ethereum’s core developers decided that this proposal is too complex and carries too much risk of implementation, so it was eventually ditched. Notably though, this EIP was accompanied by a sister proposal [EIP4444](https://eips.ethereum.org/EIPS/eip-4444). The goal of EIP4444 was to reduce the data storage requirement for node operators and it suggests that execution clients prune historical block data after a year. EIP4444 was meant to complete EIP4488 by mitigating the additional storage load introduced by EIP4488.
- **proof of data unavailability:** Suppose we have a way to distribute the task of validating big blocks in the network so that everybody has to download and validate only a small portion of each block. What if a node tries to download a portion of the big block and it is not accessible to them? Can they make a data unavailability proof and slash the block producer? The answer is unfortunately no. Not publishing data is not a uniquely attributable fault. Quoting [Al-Bassam et al.](https://arxiv.org/abs/1809.09044):
    
    > *in any scheme where a node has the ability to "raise the alarm" about some piece of data not being available, if the publisher then publishes the remaining data, all nodes who were not paying attention to that specific piece of data at that exact time cannot determine whether it was the publisher that was maliciously withholding data or whether it was the fisherman that was maliciously making a false alarm.*
    > 
- **data availability sampling:** While we can’t make proofs of data unavailability, each node can **test the availability of the data**. The main challenge here is to design a test that is efficient and accurate, meaning that it requires a relatively small number of samples and provides a high level of confidence. 
[One idea](https://vitalik.ca/general/2021/04/07/sharding.html#so-how-do-you-check-that-1-mb-of-data-is-available-without-actually-trying-to-download-it-that-sounds-impossible) is to encode the data in an **erasure code**. An erasure code is a scheme that adds redundancy to the raw data in a way that keeps the raw data recoverable, even if a constant portion of the encoded data is erased. There are many constructions for erasure codes, with *Reed-Solomon* being one of the most popular.
Suppose we encode the block data with the Reed-Solomon code, then if more than a **constant factor** $\alpha$, e.g. $\frac{3}{4}$, of the encoded data is available then the whole raw data is recoverable. We denote $\alpha$ as the recoverability ratio. Now each node has to decide whether $\alpha$ fraction of encoded data is indeed available or not. To do so each node can sample $m$ location of the encoded data at random and try to fetch them all. If only one of those parts is not available, then the node will consider the whole data unavailable. In the case that less than $\alpha$ fraction of data is available each node will detect unavailability with a probability at least $1 - \alpha^m$, this probability quickly approaches one as we increase $m$. Note that $m$ is a relatively small number comparing to the block size (technically it is a constant that does not have to grow with the block size).
To make things more clear, let's consider a concrete case in which we set the recoverability ratio $\alpha = \frac{3}{4}$, the number of samples $m=100$, and we have $N = 10^6$ nodes in the network. Now let's focus on the case that a block is not recoverable, meaning that less than $\alpha$ fraction of the encoded data is available. In this case, a simple union-bound implies that the probability that every node in the network detects the unavailability is more than $1 - N\times \alpha^m \approx 0.9999996$. 
While this idea is brilliant, it is complex to implement, and it involves quite a few other components. If it was not clear, a lot of details are hiding under the rug. For instance, we have to ensure that the encoded data is a valid Reed-Solomon code word, one approach to guarantee this is using a polynomial commitment scheme such as [KZG commitment](https://scroll.io/blog/kzg). Moreover, the underlying decentralized p2p network has to be robust enough to support data dissemination and sampling even in Byzantine setting, and designing such p2p networks is an active area of research. 
This is the backbone of Danksharding, the up-and-coming data sharding solution that is going to be implemented after EIP4844 and expand the capacity of Ethereum as a data availability layer even further.

## Proto-Danksharing: blob-carrying data

One way to think about EIP4844 is as a clever combination of EIP4444 and EIP4488. It also implements many components that are required for the original Danksharding with data availability sampling proposal; so while it is easier to implement, it paves the way for what is coming next.

The EIP introduces a new transaction type called **blob-carrying transaction.** Each blob-carrying transaction can “carry” a list of blobs. A blob is a package of data formatted as $2^{12} = 4096$ elements from the scalar field of BLS12-381, roughly 125 kilobytes. The reason for this specific format is to simplify creating KZG commitments to the content of the blob. 

The content of the blob is not available in the execution environment, unlike `calldata`. In fact, the blob-carrying transaction only carries the commitment to the blobs, and only those commitments are available in the execution environment. The actual data is shared, fetched, and validated by the consensus clients. 

The blobs are only stored for a short time, 4096 epochs, which is a bit more than 18 days. During this time, consensus nodes are expected to serve this data to their peers in the network. After that consensus clients can prune the old blobs. This pruning mechanism is designed to alleviate the burden of storing blob data on top of other things. Remember that data availability is not about permanent data storage; 18 days is long enough so that anyone who is interested gets a chance to fetch the data.

A blob-carrying transaction looks like a regular EIP1559 transaction with two additional fields, `max_fee_per_blob_gas` and `blob_versioned_hashes`. We will explain the function of these two new fields in the following sections.

### Blobs Fee Market

The fee market for blobs is separated from the normal fee market, meaning that after EIP4844, we are going to have a normal (execution) gas price and a blob gas price. There is an EIP1559-like mechanism in place for blobs gas price that targets 3 blobs and allows a maximum of 6 blobs per block. The field `max_fee_per_blob_gas` denotes the blob gas price the user is willing to pay; it must be greater or equal to the current blob gas price to be valid.

One nice implication of this design choice is the cost of data availability for Layer 2s is not affected by the burst of demand for transacting on Layer 1. Moreover, this two-dimensional fee market design is a step towards a more ambitious vision of improving the efficiency of the fee market by adopting a [multidimensional EIP1559](https://ethresear.ch/t/multidimensional-eip-1559/11651).  

### Capacity of Blobs

The target capacity of the blobs per block is not that high. **It is only 380 KB, which translates to roughly 100 TPS combined across all rollups.** With the current parameters, storing blob data introduces an additional nearly 50GB storage requirement for node operators. For a typical node, 50GB is nothing to worry about, so why not include more blobs per block? The reason is every consensus node still has to download and validate all the blobs. In fact, after the inclusion of EIP4844, consensus clients will not consider a block as valid, [until all its blobs have been downloaded and verified](https://github.com/ethereum/consensus-specs/blob/86fb82b221474cc89387fa6436806507b3849d88/specs/deneb/fork-choice.md#is_data_available). We still don’t have the clever data availability sampling mechanism in place. Hence, the additional load introduced by blobs has to be carefully capped to avoid the risk of destabilizing the consensus mechanism by pushing block propagation delay too high [note: basically, the attestation deadline for consensus clients is 4 seconds, so every block has to be well propagated before 4 seconds].  That is why the target for blobs is set relatively low. 

The truth is we do not yet have a strong understanding of the relation between the blob target capacity and the block propagation delay. The Ethereum network topology is very complex and almost impossible to simulate on test nets [note: a recent study looks into [propagation delay of big blocks on mainnet](https://docs.google.com/presentation/d/1glx__evliifIRyS3GnbzADd0rVPV4CFPh92INEsRdX8/edit#slide=id.g27bd3dadddc_0_195), however, blocks and blobs are very distinct in terms of propagation. Blocks are single-sourced, while blobs are multi-sourced and they can benefit from a parallelization in their propagation.]. As a result, the parameters are set very cautiously and it is possible that they could get bumped up at a later time.

### KZG commitments and Versioned Hash

The commitment to each blob is in the format of a **versioned hash**. It is 32 bytes value where the first byte is the version, currently set to $0x01$, followed by the last 31 bytes of SHA256 hash of the KZG commitment of the blob, i.e. `version_byte + SHA256(KZG(blob))[1:]`. The rationale is to keep the possibility of changing the commitment scheme from KZG to something else without breaking the format, just in case KZG commitments are deemed to be not as safe as desired in the future, for instance if quantum computers become practical.

The field `blob_versioned_hashes` denotes a list of commitments to the blobs included in the transaction. Notice that a blob-carrying transaction can carry more than one blob.

### Point Evaluation Precompile

The EIP4844 introduces a new precompile that is designed to allow users to open the commitment to the blobs, and effectively access the blob data from smart contracts. This is very handy when verifying optimistic or succinct proofs that involve the blob data. 

The `point_evaluation_precompile(versioned_hash, kzg_commitment, proof, z, y)` receives a versioned hash, the KZG commitment to the blob, and a KZG opening proof for point $z$ and value $y$ as input. It verifies that `kzg_commitment` corresponds to the `versioned_hash` provided and that the opening `proof` is valid. That is the for Lagrange interpolation polynomial of the blob `p(X)` we have `p(z) = y`.

This precompile nicely fits the needs of rollups with succinct proof of validity. There is no need to fully open the commitment to blob in EVM, it just suffices to check whether the data provided in the circuit as witness is consistent with the blob. More on this later. 

## Data Availability in Scroll’s Protocol Post EIP4844

### Commit

Post EIP4844, a rollup commit transaction will be a blob-carrying transaction `tx`. The rollup transaction batch will be encoded in a blob. Then the rollup contract does not have to calculate the commitment to the transaction batch data anymore; we just copy `tx.blob_versioned_hashes` to the storage for use during the finalization stage.  

### Blob Consistency Check in PI Circuit

Earlier we discussed that the function of the PI circuit is to check that the provided transaction batch indeed corresponds to the commitment to the transaction batch provided in the commit phase. We still have to do this when we put the transaction batch in a blob, but the way it is done is a bit different.

### The Challenge of Non-native Field

Ethereum only has precompiles for one pairing-friendly elliptic curve, BN254. Our zkEVM uses this curve for arithmetization, which means that we defined the values and constraints of the circuits over the scalar field of the curve BN254. The EIP4844, however, uses another curve, BLS12-381, for KZG commitments. This makes things a little bit complicated. 

This choice is perhaps motivated by security and efficiency. Consensus clients already use BLS12-381 curve for [making attestations](https://eth2book.info/capella/part2/building_blocks/signatures/), so it is already implemented and audited by all client teams. Besides, BN254 only provides [100 bits of security](https://github.com/zcash/zcash/issues/714), while BLS12-381 provides roughly [120 bits of security](https://hackmd.io/@benjaminion/bls12-381#Security-level).


*If the two curves were identical*, we could have added an advice column in the zkEVM circuit dedicated to storing the blob data padded with zeros. The KZG commitment to all circuit columns is part of the final snark proof *(note: for simplicity, assume we don’t do any aggregations at batch level)*, and we could have just compared the KZG commitment to the blob column to the versioned hash obtained from the blob-carrying transaction.

Unfortunately, this is not the case, and we can’t just directly cross-check commitment to an advice column with the blob versioned hash. Luckily there is [another approach](https://notes.ethereum.org/@dankrad/kzg_commitments_in_proofs) that works. Let `p(X)` be the Lagrange polynomial of blob over the BLS12-381 scalar field. We can evaluate this polynomial on a random point `z`, both in contract and in-circuit, and check that these evaluations are equal. Then the famous Schwartz-Zippel lemma implies that if the equality holds with high probability then the two polynomials are identical. The challenging part here is to evaluate `p(X)` in-circuit, as this evaluation has to be done over BLS12-381, not BN254. Non-native field operations are considered relatively expensive. Using the [barycentric formula](https://github.com/ethereum/consensus-specs/blob/86fb82b221474cc89387fa6436806507b3849d88/specs/deneb/polynomial-commitments.md#evaluate_polynomial_in_evaluation_form) we can do this by $2 \times 4096$ non-native multiplications and divisions. The additional cost imposed on the prover is relatively small. 

### Proof of Concept

We have implemented a [PoC for in-circuit blob consistency check](https://github.com/mmjahanara/blob-consistency-check). The circuit takes the commitment to the transactions batch `batch_commit` , the challenge point `z`, and the evaluation `y` as public inputs. The prover has to provide the `blob` as witness. We apply the Fiat-Shamir trick to obtain the pseudo-random challenge point `z` so the circuit enforces `z = hash(batch_commit+blob)`. Moreover, the circuit constraints `p(z)=y`, where `p(X)` is the Lagrange interpolation polynomial of `blob`.

This gadget uses 28,083,027 advice cells and 3,393,116 lookup advice cells. On an M1 MacBook Pro (10 CPU cores, 16 GB RAM), proof generation takes 138.97 seconds on average.

## Conclusions

Data availability is a major piece of the blockchain scalability puzzle. EIP4844 is a big step towards improving Ethereum's utility as a data availability layer. However, with its current setting of parameters, it will not provide a large enough capacity to meet all the needs of  rollups. Hopefully Danksharding, with its brilliant data availability sampling, will significantly improve the situation. Until then, rollups need to rely on a combination of calldata and blob storage, and develop better compression schemes; or accept additional security assumptions and adopt data availability layers other than Ethereum.
