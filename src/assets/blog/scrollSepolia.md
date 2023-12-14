# Announcing the Scroll Beta Testnet on Sepolia

We are thrilled to enter the Beta phase of our journey with our Scroll Sepolia testnet, launching today for developers and users. Over 100 projects have integrated with Scroll to date, with many more on the way. These projects have successfully finalized more than 2.6 million batches to Layer 1 (L1) with more than 47 million transactions, 9 million wallet addresses, and 4 million contracts deployed.

Our heartfelt gratitude goes out to our community of hackers, partners, research peers, and enthusiastic stress testers for supporting us in this journey and providing valuable feedback. Since the Scroll Alpha Testnet on Goerli, our team has been diligently improving the performance of our zkEVM and the robustness of the infrastructure. Scroll Sepolia represents the culmination of numerous optimizations to deliver an exceptional developer experience. Below, we cover some of the key new features and improvements.

Our improvements for this release fall into three succinct categories:

1. zkEVM upgrades
2. Bridge upgrades
3. Infrastructure upgrades

---

## Scroll’s EVM Advancements: Compatibility, Efficiency, and Security

**Improved EVM Compatibility with Precompile Upgrades**

We have enhanced the zkEVM circuit to push the boundaries of rollup compatibility with Ethereum. By implementing `PUSH0`, we now support all EVM opcodes. In addition to this, the zkEVM now accommodates six crucial precompiles: `ecRecover`, `identity`, `modexp`, `ecAdd`, `ecMul`, and `ecPairing`. To our knowledge, we are the only ZK rollup that supports and verifies `ecPairing` and the only rollup to support `PUSH0`. This opens doors for deploying ZK dApps and ZK-based Layer 3 solutions. We are committed to integrating the remaining three precompiles in upcoming updates.

**Efficient On-Chain Verification Through Proof Compression and Aggregation**

Our approach incorporates several layers of proof compression and aggregation, significantly minimizing the on-chain verification costs and the final proof size. The process involves a two-tier compression strategy employed by the prover. Initially, sub-circuit proofs are consolidated into a universal proof, followed by condensing this universal proof into a compact chunk proof. The verification process is streamlined on-chain by aggregating multiple chunk proofs into a single batch proof.

![scroll-prover](https://i.imgur.com/YPsEY1K.png)

**Enhanced Circuit Integrity**

We have conducted rigorous internal and external audits of the zkEVM circuit in collaboration with reputable blockchain security auditors like Trail of Bits, OpenZeppelin, Zellic, Kalos, and ABDK. We consider the integrity and soundness of our circuits to be a top priority going into this release and beyond.

## **Progressing Toward a Trustless and Gas-Efficient Bridge**

**Achieving 50% Improved Gas Efficiency**

Our rollup infrastructure has undergone enhancements — where previously we proved a group of L2 blocks in a “chunk,” now we submit a proof for a “batch” of chunks. This adjustment in our architecture reduces the rollup frequency and the contract's storage footprint, leading to a significant reduction in gas costs of up to 50%.

**Empowering Trustless Bridging**

Our updated bridging protocol introduces trustless message relay capabilities between L1 and L2, eliminating reliance on a trusted relayer. This new protocol design empowers the bridge contract to autonomously calculate transaction hashes for L1 messages and seamlessly integrate them into the on-chain proof verification process.

## **Infrastructure Upgrades: Decentralization, Proof Overflow Optimization and Scalability**

**Introducing `L1MessageTx` for Trustless Messaging Relay**

As part of our commitment to facilitating secure messaging relay from L1 to L2, we introduced the EIP-2718 transaction type, `L1MessageTx`, moving away from a trusted centralized relayer. For each message entering the L1 queue of the bridge, our sequencer will create a new `L1MessageTx` on Scroll. This transaction shares the same hash computed in the bridge contract, ensuring data integrity throughout the proving process for deposit transactions and enforced transactions.

**Streamlined Circuit Capacity Checker to Prevent Proof Overflow**

We've integrated a circuit capacity checker into the Scroll sequencer to ensure seamless alignment between the generated blocks and the zkEVM circuit's proof capabilities. This addition to our stack optimizes the utilization of the zkEVM circuit, harnessing its full efficiency and potential for every generated proof. With this innovation, we address the challenge of proof overflow, enabling us to target a 100% proving rate by eliminating skipped batches that couldn't be proven.

**Enhanced Coordinator Functionality**

Each party operating provers on the Scroll network has unique capacities for proof loads. Now, with our upgraded ZK aggregation proof system, they also have unique capabilities for proof types. Our coordinator has been greatly enhanced to allocate our proving needs across the entire prover network intelligently.

The coordinator additionally now supports both zkEVM Provers and Aggregator Provers. The entire system's speed, reliability, and overall capacity relies on properly balancing these critical resources. The upgrades to our coordinator represent a significant advancement for the network.

## **Reflecting on the Past and Embracing the Future**

As always, the improvements we have made over the past year have resulted from a constant collaborative effort with the Ethereum Foundation’s PSE team and our broader community of researchers and open source contributors. With this release, we inch closer to the vision of a bytecode-compatible zkEVM accessible to all that mirrors Ethereum’s experience.

Scroll’s testnet on Sepolia will run alongside our future Mainnet as the primary testing platform for users and developers. Scroll Goerli will be sunset upon our Mainnet launch. To explore Sepolia, check out the [Scroll Sepolia User Guide](https://docs.scroll.io/en/user-guide/).

Stay tuned for more exciting updates!

---

## FAQ

1. What is Scroll Sepolia?
   1. Scroll Sepolia testnet is our beta testnet on Sepolia. It will run alongside Scroll Mainnet indefinitely and serve as a testing ground for all future upgrades.
2. Why Scroll Sepolia testnet?
   1. We focus on security and have implemented significant changes. We want to test these changes in a live environment before going to mainnet and provide applications with a testing environment that mirrors mainnet.
   2. The Goerli network has been deprecated, and moving from using Goerli as an L1 will also allow our testnet to be a long-lived home for testing alongside mainnet.
3. What changes does Scroll Sepolia have compared to the Scroll Alpha testnet on Goerli?
   - **EVM Compatibility Improvement:** By implementing `PUSH0`, we now support all the EVM opcodes.
   - **Precompiled Contract Support:** The zkEVM circuit has been upgraded to support six essential precompiles: `ecRecover`, `identity`, `modexp`, `ecAdd`, `ecMul`, and `ecPairing`. Our team is dedicated to including the remaining three precompiles in our forthcoming updates.
   - **Optimized Memory Access:** By transitioning from byte-addressable memory to word-addressable memory, we've slashed memory access costs within the circuit.
   - **Proof Compression and Aggregation:** We successfully shrunk the final proof size by introducing multiple layers for proof compression and aggregation. This enhancement significantly trims the on-chain verification cost.
   - **Better Circuit Soundness:** We continuously performed internal and external auditing of the circuit and significantly improved the soundness of the zkEVM circuit.
   - **Improved Gas Efficiency:** We reduced the storage usage of the rollup contract and leveraged multi-layer proof aggregation in the zkEVM prover to optimize rollup usage—these improvements results in the gas cost reduction of up to 50%.
   - **Trustless Bridging Protocol:** Our upgraded bridging protocol now allows for a trustless message relay between L1 and L2, eliminating the need for a trusted relayer. The new design ensures the bridge contract calculates transaction hashes of L1 messages and incorporates them into the on-chain proof verification.
   - **`L1MessageTx` Transaction:** In our efforts to support a trustless messaging relay from L1 to L2, we've introduced a new EIP-2718 transaction type named `L1MessageTx`. With every message added to the L1 queue, our sequencer spawns an `L1MessageTx` transaction. This transaction has the same transaction hash as computed within the bridge contract.
   - **Circuit Capacity Checker Integration**: The Scroll sequencer now integrates a circuit capacity checker, ensuring the blocks generated are aligned with the zkEVM circuit's proof capabilities.
   - **Upgraded Coordinator**: Our coordinator has undergone a significant overhaul and now supports zkEVM provers and aggregator provers for zkEVM proof generation and proof aggregation tasks.
4. What changes will Scroll Sepolia have compared to Scroll Mainnet?
   1. All changes are under-the-hood only. The Scroll Sepolia testnet experience will be similar to Scroll Mainnet for users and developers. Any future network upgrades will be released on Scroll Sepolia before mainnet.
5. Why should someone deploy on Scroll Sepolia testnet?
   1. It’s our long-lived testnet.
   2. It has the closest experience to Scroll Mainnet.
6. How do I deploy on Scroll Sepolia?
   1. Like always, the same as Ethereum (aka “boring DevEx”)! Use https://scroll.io/portal to configure your wallet and clone https://github.com/scroll-tech/scroll-guides/tree/main/contract-deploy-demo to deploy your contract. Check out our Developer Quickstart for guidance on using your developer tooling of choice: https://docs.scroll.io/en/developers/developer-quickstart/
7. How do I get funds on Scroll Sepolia?
   1. Make sure you have added the Scroll Sepolia RPC: https://scroll.io/portal.
   2. Use [https://docs.scroll.io/en/user-guide/faucet/](https://docs.scroll.io/en/user-guide/faucet/) to find public Sepolia faucets.
   3. Bridge Sepolia ETH to Scroll Sepolia using our official bridge: https://scroll.io/bridge
8. I am having issues; where can I get help?
   1. User issues: Please get in touch with us on Discord in the #general-support channel, and we’ll do our best to assist you!
   2. Developer issues: Please describe your problem in the #testnet-devs channel on Discord, and our DevRel team will help!
