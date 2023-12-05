# Scroll’s Security Measures

Security is one of the least visible yet most important features of any decentralized protocol.  With so much at stake — especially user funds — it is a priority that should never be compromised, overlooked, or taken for granted. At Scroll, security has always been our top priority guiding every decision we make and for more than a year, we have gone through rigorous and extensive tests and multiple rounds of external audits to ensure the security of Scroll Mainnet. 

We’d like to share some of Scroll’s security features, give insight into the work we’ve done to keep us on a secure path, and let you know about our new $1M bug bounty program. 

## Battle-Tested Cryptographic Libraries

Cryptographic libraries are foundational tools for ensuring data security, user privacy, and data integrity. Using a well-established open-source library Halo2 developed by Electric Coin Co. means Scroll relies on algorithms and protocols that have been thoroughly researched and vetted by experts and stood the test of time. Their widespread scrutiny means that vulnerabilities can be detected and fixed very quickly. 

## Open-Source From Day One

Scroll has been developing its zkEVM with the open-source community from day one. We believe that building in the open with community not only makes for better code, but builds trust and increases security through its transparent and collaborative nature. According to [Linus’s law](https://en.wikipedia.org/wiki/Linus%27s_law): "given enough eyeballs, all bugs are shallow." With many eyes on our codebase, vulnerabilities can be spotted and addressed rapidly. If issues arise, the community can modify or even fork the project. Our approach ensures continuous feedback, making it challenging for attackers to exploit the software, as opposed to proprietary systems that rely on security through obscurity.

## Comprehensive Code Review and Testing

In addition to our community and our internal blue and red security teams dedicated to uncovering potential vulnerabilities, we also have been continuously conducting internal code auditing. Our codebase was battle-tested through our Pre-Alpha Testnet, Alpha Testnet, and Sepolia Beta Testnet for months. We dedicated thousands of hours on both CPUs and GPUs to test the code through tens of thousands test cases and various types of contracts and transactions. Check out the [report](https://circuit-release.s3.us-west-2.amazonaws.com/testool/nightly.1695216104.47e2015.html).

## Independent Audits

To complement our internal efforts, we also collaborated with industry-leading auditors to get up close and personal with our code. For the most critical elements, we had multiple teams review the code independently to ensure a multi-layered review and fortify our security measures. 

Here’s a glance at who did what:

- zkEVM circuits were reviewed by Trail of Bits, Zellic, and KALOS
- Bridge and rollup contracts were audited by OpenZeppelin and Zellic
- Node implementation was analyzed by Trail of Bits

In full transparency about our procedures and findings, we proudly present you with our audit reports: 

- zkEVM circuits
    - Trail of Bits
        - [zkEVM wave 1](https://github.com/trailofbits/publications/blob/master/reviews/2023-04-scroll-zkEVM-wave1-securityreview.pdf)
        - [zkEVM wave 2](https://github.com/trailofbits/publications/blob/master/reviews/2023-08-scroll-zkEVM-wave2-securityreview.pdf)
        - [zkEVM wave 3](https://github.com/trailofbits/publications/blob/master/reviews/2023-09-scroll-zkEVM-wave3-securityreview.pdf)
    - Zellic x Kalos
        - [zkEVM part 1](https://github.com/Zellic/publications/blob/master/Scroll%20zkEVM%20-%20Part%201%20-%20Audit%20Report.pdf)
        - [zkEVM part 2](https://github.com/Zellic/publications/blob/master/Scroll%20zkEVM%20-%20Part%202%20-%20Audit%20Report.pdf)
- Node implementation (by Trail of Bits)
    - [zkTrie](https://github.com/trailofbits/publications/blob/master/reviews/2023-07-scroll-zktrie-securityreview.pdf)
    - [L2geth](https://github.com/trailofbits/publications/blob/master/reviews/2023-08-scrollL2geth-initial-securityreview.pdf)
    - [L2geth diff](https://github.com/trailofbits/publications/blob/master/reviews/2023-08-scrollL2geth-securityreview.pdf)
- Bridge and rollup contract
    - OpenZeppelin
        - [Phase 1](https://blog.openzeppelin.com/scroll-layer-1-audit-1)
        - [Phase 2](https://blog.openzeppelin.com/scroll-phase-2-audit)
        - [GasSwap, Multiple Verifier, Wrapped Ether and Diff](https://blog.openzeppelin.com/scroll-gasswap-multiple-verifier-wrapped-ether-and-diff-audit)
        - [ScrollOwner and Rate Limiter](https://blog.openzeppelin.com/scrollowner-and-rate-limiter-audit)
        - [USDC Gateway](https://blog.openzeppelin.com/scroll-usdc-gateway-audit)
        - [Contract diff](https://blog.openzeppelin.com/scroll-diff-audit-report)
    - Zellic
        - [Contract v1](https://github.com/Zellic/publications/blob/master/Scroll%20-%2005.26.23%20Zellic%20Audit%20Report.pdf)
        - [Contract v2](https://github.com/Zellic/publications/blob/master/Scroll%20-%2009.27.23%20Zellic%20Audit%20Report.pdf)

## Bug Bounty Program

As an extension of our code audit, we launched our [bug bounty program](https://immunefi.com/bounty/scroll/) on the Immunefi platform. We invite security enthusiasts and experts who are interested in Scroll to scrutinize our code in order to identify any vulnerabilities that might not have been discovered through testing and audits. Depending on the severity of the reported bugs, we offer substantial rewards:

- **Critical**: up to \$1,000,000.00
- **High**: \$10,000.00 - \$50,000.00
- **Medium**: \$5,000.00

The scope of the bug bounty program covers blockchain infrastructure and the smart contracts for bridging and rollup. For a detailed breakdown of bug categories, please refer to our [bug bounty page](https://immunefi.com/bounty/scroll/). 

As our code and system matures, we will expand the scope of the bug bounty program, raising rewards even higher. 

## Safeguarding Scroll Mainnet

It is important to note that Scroll Mainnet has not yet reached its final, completely trustless and decentralized state. In our current stage, we are still riding with [training wheels](https://ethereum-magicians.org/t/proposed-milestones-for-rollups-taking-off-training-wheels/11571) to enhance Scroll’s operational security. Specifically, we have deployed the following mechanisms:

- We introduced the `ScrollOwner` [contract](https://github.com/scroll-tech/scroll/blob/develop/contracts/src/misc/ScrollOwner.sol) that allows a fine-grained control of the Scroll contracts. Under normal situations, it is configured to mandate a 14-day delay for contract upgrades and 1/7/14-day delay for administrative contract methods based on the risks. During an emergency situation, the contract allows Scroll multisig to pull an immediate pause of the bridge and rollup to contain the loss. Scroll multisig currently also has the ability to bypass the delay for an instant upgrade in an emergency event. Once the system has matured and proven its stability we will establish a security council and transfer the bypass privilege to its multisig.
- A bridge monitor has been deployed to keep track of on-chain activities for both L1 and L2, ensuring that every deposit and withdrawal event is reciprocated accurately on its counterpart.
- We operate a follower node internally that validates the state transitions using the transaction data submitted to the Ethereum.

These measures act as safeguards to ensure robustness and security as we navigate Scroll Mainnet through this stage of its evolution. 

## Continuous Improvement

We are committed to continuously improving the security of Scroll Mainnet and protocols, eventually removing the training wheels. More concretely, we will be rolling out the following security features in our next steps:

- On our journey to making Scroll more decentralized, we will establish a security council to inspect contract upgrades and invite independent parties to run follower nodes and validate the Scroll chain.
- Scroll is pursuing client diversity. It will make the protocol more resilient to have different full node implementations that can verify state transitions independently. Scroll will collaborate with the community to implement various sequencers.
- Similar to client diversity, we are researching bringing [multi-provers](https://ethresear.ch/t/2fa-zk-rollups-using-sgx/14462) to Scroll. In addition to the zkEVM prover, we plan to add a second prover, the SGX prover, to attest to state transitions. Prover diversity can make validation more resilient to bugs and soundness gaps in any individual prover. We will share more details in a later blog post.

Be sure check out our updated [documentation site](https://docs.scroll.io/en/home/) and bug bounty program for more comprehensive security information. 

Follow us on X at [@Scroll_ZKP](https://twitter.com/scroll_zkp) for the latest Scroll updates.