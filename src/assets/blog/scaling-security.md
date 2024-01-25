# Scaling Security: Multi-Prover Implementation on Scroll

*Written by Haichen Shen*

*Acknowledgment: Special thanks to [Péter Garamvölgyi](https://twitter.com/thegaram33), [Mohammad Jahanara](https://twitter.com/MMJahanara), [Ye Zhang](https://twitter.com/yezhang1998), and [Deli Gong](https://twitter.com/deligong) for discussions and feedback on earlier drafts of this article.*


As more assets have moved from Ethereum to Layer 2, one crucial factor often gets sidelined: security. As Vitalik pointed out in his [talk](https://hackmd.io/@vbuterin/zk_slides_20221010) and [blog](https://vitalik.eth.limo/general/2023/03/31/zkmulticlient.html), it will take a long time for complex software like zkEVMs to be completely bug-free. The risk of bugs in a single prover that validates all L2 transactions could be catastrophic. Similar to Ethereum's multi-client philosophy, having prover diversity can significantly reduce such risk.

This article unveils the architecture bringing prover diversity to enhance Scroll's security. We explore the design space for a multi-proof system and articulate the rationale behind incorporating a TEE (Trusted Execution Environment) prover as a secondary prover to Scroll. Lastly, we are excited to share the news that Scroll is collaborating with [Automata](https://www.ata.network/), a modular attestation layer, to develop a TEE prover for the Scroll protocol jointly. A prototype SGX prover has already validated all Scroll Sepolia testnet blocks successfully.

## Why do multi-provers matter?

ZK rollups leverage zero-knowledge proofs to validate the correct execution of L2 transactions. However, ZK circuits, especially zkEVM circuits, are complex software comprising tens of thousands of lines of code. Such complexity inherently increases their susceptibility to bugs. Among these, [completeness](https://en.wikipedia.org/wiki/Zero-knowledge_proof#Completeness) bugs are relatively more straightforward to detect and resolve. However, [soundness](https://en.wikipedia.org/wiki/Zero-knowledge_proof#Soundness) bugs pose a more formidable challenge. These bugs are not only difficult to identify but also require substantial time and resources to ensure their rectification.

In the current landscape, ZK rollups predominantly operate with centralized sequencers and provers. Under the centralization scenario, the liveness and the security given the potential bugs still depend on the chain operator's honesty. Furthermore, the decentralization of provers poses an increased risk of soundness bugs becoming a critical threat. These bugs could allow provers to finalize invalid state transitions on Ethereum, undermining the integrity of the entire blockchain network.

Similar to the rationale of client diversity, having multiple types of provers independently validate state transitions significantly bolsters security. When these provers unanimously agree on the state transition after applying the same batch of transactions, the likelihood of invalid transactions infiltrating the system drastically reduces. Therefore, the user assets on the layer2s become more secure.

## What is the design space of a multi-proof system?

When designing the multi-proof system for Scroll, we aim to achieve three objectives:
- Enhance the layer2 security
- Doesn't increase finality time
- Only introduce marginal cost to L2 transactions

![multi-proof system design space](https://hackmd.io/_uploads/Sy4oveptp.png)

To understand the design space of Layer 2 proof systems, we use the critical metrics of finality and security to evaluate each proof system. We begin with single-proof systems. These systems only use a single mechanism to ensure the correctness of L2 blocks. There are two main categories: fraud proofs and ZK proofs. Fraud proofs, used by optimistic rollups, depend on verifiers to challenge transaction states. Their security stems from the economic incentives of verifiers, and fraud proofs suffer from a long finality delay due to the challenge period. On the other hand, ZK proofs, also known as validity proofs, leverage cryptographic protocols to proactively generate proofs and achieve a faster finality time and a more robust security guarantee.

Now, back to multi-proof systems. A recent [proposal](https://taiko.mirror.xyz/Z4I5ZhreGkyfdaL5I9P0Rj0DNX4zaWFmcws-0CVMJ2A) introduces a hierarchical contestable multi-proof system[^1]. However, it cannot achieve our objectives. First, its security is inferior to the ZK proof, as it only mandates a fraction of the state transition to be validated by ZK proofs, leaving the majority to less-secure proofs. Second, the finality time also becomes slower due to the introduction of contestation periods.

For Scroll to achieve all three objectives, the multi-proof system must validate all state transitions with multiple proofs, including at least one ZK proof. We call it an "always-on" multi-proof system. Finality time and cost efficiency requirements narrow our options for a secondary prover. In the next section, we will delve into these options.

## What are the options for a 2nd prover?

We have explored three options for a 2nd prover in the multi-proof system on Scroll.

- One intuitive option is a fraud proof, as it is well-established and adopted by the optimistic rollups. As explained above, a significant limitation of fraud proofs arises with its finality time, which extends up to seven days. Combining the fraud proofs with zk proofs extends the L2 finality time to the slowest proof time. This slow finality time violates our objective that a 2nd prover should not increase the finality time.
- Another option is a 2nd zkEVM prover. This means to have a completely separate implementation of the zkEVM prover for Scroll. However, developing an entirely new zkEVM prover is a resource-intensive endeavor in terms of cost and time. The substantial complexity and technical expertise required to implement a new zkEVM prover only makes this option a long-term solution.
- A third alternative is a Trusted Execution Environment (TEE) prover, [proposed](https://ethresear.ch/t/2fa-zk-rollups-using-sgx/14462) by Justin Drake. TEEs allow you to run software in a secure area of a processor where data and memory are inaccessible to other components in the system. The TEE prover operates within this protected environment, executing transactions and generating proofs. A vital advantage of the TEE prover lies in its efficiency. The overhead associated with proving processes is negligible, resulting in a faster and more cost-effective solution than a zkEVM prover. Thus, the TEE prover won't increase the finality time. A TEE prover bolsters the safety guarantees of the protocol at the cost of reduced liveness guarantees. In other words, a bug in one of the two provers will not result in the user funds being stolen but has the tradeoff of a validating bridge pausing if one of the two provers has a bug.

After weighing the pros and cons of all three options, we decided to add a TEE prover to Scroll. In addition to the benefits mentioned earlier, the rationale for adopting the TEE prover is as follows:
- We will be able to bring a TEE prover to production in 6 months or less, enhancing the security of Scroll Mainnet and delivering more user benefits.
- The additional cost of verifying TEE proofs on Ethereum is marginal, meaning that the increase in transaction cost on Scroll will be negligible.
- It's an essential step towards decentralizing zkEVM provers by introducing a second prover to safeguard the Scroll state transition.

To mitigate the concern of trusting TEE implementation and hardware manufacturers, we are researching a protocol to aggregate TEE proofs from multiple TEE provers with different hardware and client implementations. Similar to [Distributed Validator Technology](https://ethereum.org/en/staking/dvt/) (DVT) for Ethereum validation, we can combine the threshold signature scheme into the TEE proof generation so that a TEE proof requires the attestation of `t` out of `n` TEE provers, minimizing the trust of a single hardware manufacturer, depicted in the figure below.

![multi-prover](https://hackmd.io/_uploads/BkPPG8HDp.png)

## How will the TEE prover integrate into Scroll?

Integrating a TEE prover into Scroll involves ensuring secure and accurate state transition validation, as illustrated in the figure.

![multi-prover-timeline](https://hackmd.io/_uploads/Hy0OKhJwT.png)

- First, a TEE prover must register itself to a smart contract deployed on Ethereum by submitting a valid attestation report generated by the hardware. The attestation report also encloses a public key that the prover will use to sign the TEE proof later on and the hash of the software binary that the enclave is running to ensure the correctness of the Scroll attestation program. An on-chain verifier will validate the report.
- Whenever a new batch is committed to Ethereum, the registered TEE prover, operating in its secure enclave, executes the state transition verification program using the committed data. The output of the TEE prover includes the old and new state roots after applying the transactions and an attestation signature using the previously registered key.
- Both the ZK and TEE proofs are required to finalize the Scroll state transition. This dual-proof system ensures higher security and reliability, combining the strengths of both TEE and zkEVM methodologies to validate transactions.
- Periodically, the registration of a TEE prover expires. It requires the TEE prover to generate a new attestation report and register itself again to prevent private key leaks or side-channel attacks on the enclave.

TEE provers on the Scroll chain will be initially managed and operated by a committee and later decentralized. This committee will rotate the responsibility of running the TEE provers among its members. This rotation system is designed to distribute trust and reduce the risk of any single point of failure or bias in the validation process.

If a TEE proof and a zk proof disagree, the Scroll chain will enter a "dispute" state. This situation triggers a pause in batch finalization and withdrawal processes to maintain the integrity of the network. During this period, a Security Council (which will launch alongside multi-proofs) steps in to resolve the conflict. The Council recomputes the state root by executing the batch in question. The resultant state root that garners the majority vote from the Security Council will be accepted as the canonical state root of the Scroll chain. This mechanism ensures that disagreements between proofs are resolved securely and transparently, maintaining the stability and security of the Scroll network.

## Next steps

We're working closely with [Automata](https://www.ata.network/) to implement an SGX prover for Scroll. The prototype SGX prover has already been built and can verify all state transitions of the Scroll Sepolia testnet, where the [code](https://github.com/automata-network/sgx-prover) is fully open-sourced.

Moving forward, we'll integrate the dual-proof system of SGX + ZK and the "dispute" functionality into Scroll. As always, this code will be thoroughly audited to ensure it meets the highest security standards, and a TEE prover committee will be formed to provide the necessary support.


[^1]: In a hierarchical contestable multi-proof design, the system supports a hierarchy of proof types ranging from light, less secure, and inexpensive (e.g., optimistic) to strong, more secure, and relatively expensive (e.g. zk). The state transitions are mostly validated by light proofs. However, light proofs can be contested and refuted by stronger proofs within a contestable period.

