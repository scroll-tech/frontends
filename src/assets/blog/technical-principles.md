# Scroll’s Technical Principles

To scale Ethereum with our zkEVM-based zkRollup, we have designed Scroll based on a set of technical principles which uphold Scroll’s [core values](https://mirror.xyz/scroll.eth/EYn7ODhQAnNWABwWcu5xZLts_wEXTZAEWyTgExGS1DA). This post lays out these principles and how they relate to our broader design for Scroll.

## **Our technical principles**

**1\. Ensuring user security**

In the context of blockchain scaling solutions, the most important form of security concerns the integrity of user funds and data. Although a scaling solution may offer users additional capabilities, we believe ensuring users maintain access to their funds comes first. For Scroll, this means users should not need to rely on the honesty of Layer 2 nodes for security and can instead take advantage of full Layer 1 security even when transacting on Layer 2. By building on Ethereum according to this principle, we are rooting the security of Scroll in the most secure and decentralized consensus of the Ethereum base layer.

**2\. Maintaining EVM-compatibility**

In addition to giving users additional capabilities, an effective Ethereum scaling solution should give users and developers a seamless migration path from existing dapps and developer tooling. We believe maintaining EVM-compatibility is the best way to achieve this. An EVM-equivalent environment behaves exactly the same as the Ethereum Virtual Machine specification in the [Ethereum yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf). This means that users and developers can migrate without additional code changes, expensive audits, or disruptive changes to their development workflow.

EVM-compatibility provides substantially stronger guarantees than simple compatibility with the EVM through solutions such as transpilation. Settling for mere compatibility can force users and developers to modify or even completely reimplement large portions of Ethereum’s supporting infrastructure. In addition, maintaining security becomes much more difficult without EVM-compatibility. As a result, to be maximally developer and user friendly, Scroll is EVM-equivalent, not simply EVM-compatible.

**3\. Efficiency**

In order for users to enjoy a great experience on a Layer 2, we believe that:

- Transaction fees should be low, orders of magnitude cheaper than on the base layer.
- Users should experience instant pre-confirmation on the Layer 2 and reasonably fast finality on the base layer (Ethereum in our case).

Though these conditions are easy to satisfy with a centralized operator, in order to preserve security they must continue to hold in a decentralized environment. In the Layer 2 context, we believe Scroll should be as efficient as possible while maintaining user security and decentralization in both Layer 2 and the base layer.

**4\. Decentralization across all layers of the community**

Decentralization is a core property of blockchains that is often overlooked or improperly traded for efficiency. We believe it is one of the most valuable aspects of blockchains and ensures that protocols and communities are vibrant and resilient against censorship or coordinated attacks. We consider decentralization across many aspects of Scroll, including node operators, provers, and the community of developers and users. By building in the open with the community and charting a credible path to decentralizing both proving and sequencing, Scroll is committed to ensuring decentralization across all dimensions.

## **How our principles lead to Scroll’s design**

The major design choices for Scroll are naturally motivated by these technical principles.

**1\. Security and EVM-compatibility lead us to a zkEVM-based zkRollup solution**

In building Scroll, security is our first priority. In our zkRollup-based design, the integrity of Layer 2 transactions executed on Scroll is guaranteed by succinct zero knowledge proofs verified in a smart contract on the Ethereum base layer. This makes Scroll transactions as secure as transactions on the Ethereum base layer itself. As a result, users do not have to place trust in any third party to keep their funds safe -- security comes from the security of the Ethereum base layer and the mathematical guarantees of zero knowledge cryptography. We believe this is the minimal possible set of trust assumptions, which provides the best security for our users.

After deciding on a zkRollup approach, we had to grapple with making it accessible to users and developers. We quickly realized that achieving EVM-compatibility through a [zkEVM](https://scroll.io/blog/zkEVM) was the holy grail. Although breaking equivalence would substantially simplify this task, once we realized building a zkEVM was possible using recent breakthroughs in zero knowledge cryptography, we decided it was the best choice. By taking on this technically involved and difficult task, Scroll aims to offer the best user and developer experience. Our zkEVM proves the correct execution of native EVM bytecode using succinct ZK proofs, providing guarantees on the state transition function of the EVM itself and allowing Scroll to support Ethereum native developer tooling such as the JSON-RPC interface and transaction format.

**2\. Decentralization leads us to a decentralized prover network**

In designing our zkEVM, we quickly realized putting the EVM into a ZK proof would result in a large proving overhead due to incompatibility between native fields. To reduce time to finality on Layer 1 resulting from this proving time, we decided to build our Roller network, a permissionless and decentralized network of provers who generate proofs for Scroll Layer 2 blocks.

There are two major technical benefits of our decentralized prover network:

- We have designed our proving infrastructure to be highly parallelizable. This means that Scroll is able to massively scale proving compute simply by adding more proving nodes.
- The community will be incentivized to build substantially better hardware solutions and run provers themselves instead of relying only on the Scroll team in a centralized way. To bootstrap in the initial phase of the network, we are building GPU prover solutions internally which we will open source for public usage. As this matures, we are exploring ASIC and FPGA solutions with several hardware companies. In the long run, we look forward to vibrant competition in this domain and firmly believe that latency and cost for proof generation will decrease exponentially.

Finally and most importantly, beginning with this first step of decentralizing the prover is a credible commitment to our principles of community engagement and decentralization. As Scroll approaches mainnet, we plan to also decentralize the sequencer alongside our prover network, providing greater censorship resistance and robustness for the protocol.

**3\. Efficiency leads us to focus on open research-driven innovation**

To make Scroll’s zkEVM practical under the strong constraints imposed by security and decentralization, we leveraged innovative research-driven solutions from the entire community. Our [zkEVM design](https://scroll.io/blog/zkEVM) integrates recent breakthroughs in proof systems, proof aggregation, and ZK hardware acceleration, just to name a few. Our open development approach has allowed us to work with the PSE (Privacy and Scaling Explorations) group at the Ethereum Foundation and other collaborators to find the best ideas, and we believe this open source research approach will produce the best and most efficient solution.

As we approach the first production version of our zkEVM, we continue to focus on optimization and integrating the newest and best techniques. In this vein, we are currently exploring:

- How data blobs post-danksharding can improve Scroll efficiency.
- How to co-optimize Scroll’s zkEVM with new hardware-friendly ZK algorithms
- How to expose new ZK primitives to Layer 2 application developers

## Tying it all together

The technical principles outlined in this article have led Scroll to a protocol design which aligns with the existing Ethereum community and provides a scaling path for the future billions of users who are not yet on-chain. In the next few weeks, we will release more posts with concrete details about Scroll’s architecture and the corresponding user and developer experience. Stay tuned to learn more about those and sign up to try out our pre-alpha testnet at [scroll.io](http://scroll.io/)!

If our vision of scaling Ethereum in an open and community-driven way resonates with you, we are looking for values-aligned individuals to help Scroll become the most developer- and user-friendly scaling solution for Ethereum.

- If you are a ZK researcher, ZKP, Go or Solidity developer, or a GPU engineer, we are working on many interesting technical challenges at the edge of what’s possible. Come build cutting-edge solutions to these problems with us in the open!
- If you love nurturing and growing ecosystems or communities, we are looking for developer advocates and community organizers to make sure we are building in a community-aligned and user-friendly way.

To learn more about these roles and about Scroll, check out our [website](https://scroll.io/), [Twitter](https://twitter.com/Scroll_ZKP), [Discord](https://discord.gg/scroll), or [jobs page](https://boards.greenhouse.io/scrollio). If you want to get straight to the code and build with us, you can find our repos at [github.com/scroll-tech](http://github.com/scroll-tech) and [github.com/privacy-scaling-explorations/zkevm-circuits](http://github.com/privacy-scaling-explorations/zkevm-circuits).
