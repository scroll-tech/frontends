# Scroll’s Vision and Values

The promise of Ethereum is to build a decentralized computing platform widely accessible to all. Though it has come a long way towards achieving this vision, untenably high gas fees and frequent congestion on the current network present a significant challenge for true accessibility. Of course, the Ethereum community is aware of these issues and has adopted a [rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) to increase throughput. This roadmap focuses Ethereum on being the most decentralized settlement layer and moves execution to rollups on Layer 2.

We have long believed that rollups are the only viable way today to scale blockchains without sacrificing decentralization and security. However, until recently, technical obstacles meant that they were impractical to scale, driving users to alternative Layer 1s and sidechains, where [scalability comes at a cost](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d). Early last year, as researchers working in this field, we realized [recent breakthroughs](https://hackmd.io/Yp-u8GRIQa6avyVQr3zhzA?view#Why-possible-now) in ZK proof systems and hardware acceleration meant it was finally practical to build a general purpose EVM-equivalent ZK-rollup. Using the magic of ZKPs, this removes the tradeoff between security and scalability, offering the best solution for blockchain users and developers -- minimal trust assumptions, fast finality, and seamless migration from the base layer.

While coming to these ideas, we were inspired by the community-centric, open and collaborative values of the Ethereum community. In addition to technical considerations, we believe this cultural and social bonding creates a robust foundation for a global settlement layer and is hardly matched by any other crypto community.

With this in mind, we set out to build Scroll -- an EVM-equivalent ZK-rollup in early 2021 as part of the vibrant Ethereum ecosystem. Scroll uses [zkEVM](https://scroll.io/blog/zkEVM) as its core component to prove the native EVM execution trace and leverages a decentralized proving network to solve the efficiency problem on the prover side. As we move closer to a public release one year in, this post lays out our vision and the values that inspired this effort.

## **Our vision and values**

We believe that decentralized computing platforms will play such a crucial role that they should not belong to any one team or company but instead uphold and promote principles representing the broader community. Like Ethereum, we expect Scroll to be shaped by the community over time, but we begin with the following core values:

### Empowering humanity - starting with blockchain developers and users

Scroll aims to scale blockchains so that it can be accessible for billions of users. This requires making them both scalable and cheap enough to be accessible for all as well as being secure and easy-to-use for the ordinary user.

The current state of the Ethereum fee market means that high-stake applications such as DeFi and NFT trading are crowding out non-financial use cases as well as making Ethereum inaccessible to ordinary users with smaller amounts of capital. By using ZK-powered magic, Scroll will increase transaction throughput and reduce fees dramatically. It will unlock the potential for these new applications and users. We are excited to see new application layer innovations which will result in due course.

While achieving this, we believe Ethereum scaling solutions must meet developers and users where they are. That means giving them the benefits of scaling while minimizing any obstructions to their current workflows and interfaces. By starting with an EVM-equivalent solution, we allow existing applications and developer tooling to migrate from Ethereum to Scroll without deep modifications or rewrites.

Of course, we won’t stop there; after this first step, we plan to add experimental new features extending EVM’s capabilities to allow developers to create richer user experiences on Scroll. By acting as a live proving ground for these VM-level changes, Scroll will provide users access to bleeding-edge applications and at the same time assessing demand for experimental features to later be upstreamed to the base layer EVM itself.

### Build in the open with the community

Scroll is built to be community-centric and fully open source from day one. We believe such important technology should be open to everyone to understand and audit. We use public specs and repos, and we are collaborating with community members from the Ethereum Foundation Privacy and Scaling Explorations team to build the zkEVM in the open.

When building a platform which can _define_ ownership of financial assets, the ability to openly audit and verify the code is essential. Otherwise, what if the platform is faking proofs or not actually following the protocol? By being open source, we enable a fundamental level of community trust in Scroll. Even in the development phase, anyone can check on our progress simply by viewing our Github repos. This forces us to be transparent and responsible to our community.

From a developer’s perspective, building in the open leads to more secure and better designed systems. By virtue of being accessible, Scroll’s code constantly receives both internal and external peer review. Moreover, by implementing designs and improvements from community contributors, such open systems are able to aggregate the best ideas from a growing community of values-aligned developers.

We believe the open source DNA at the very heart of Scroll will make it the most secure and robust ZK-rollup, and we will continue collaborating with the community and contributing our solutions back to Ethereum. Our ultimate goal is to advance the end goal of Ethereum scaling -- "zk-SNARK everything".

### Fight for decentralization and censorship resistance

While building towards greater blockchain scalability, we believe it is essential to preserve the core properties of decentralization and censorship resistance that makes Ethereum so powerful. As an end goal, Scroll aims to achieve the same levels of decentralization and censorship resistance as base layer Ethereum itself, although we will approach these step by step.

From the beginning, we view the safety of user assets as paramount and will preserve the same security guarantees as Layer 1. By using Ethereum for both consensus and data availability, we inherit the same level of decentralization. Even in the case of a catastrophic failure, we are building forced exit into the protocol so that users are able to withdraw their funds.

Censorship resistance is more challenging to achieve for rollups, and we are approaching it step by step. First, we have designed a decentralized proving protocol which allows rollup proofs to be outsourced to a community of Rollers. We hope to foster a robust Roller ecosystem competing to improve prover performance with hardware acceleration, and more importantly, enable users to run prover themselves and force their transactions to a rollup batch in case of the censorship. As a second step, we aim to achieve full decentralization by decentralizing the sequencer. By then, anyone will be able to run a sequencer so that transactions cannot be censored. This final step is an area of active research, and we hope to build it in conjunction with the community.

## Join us and learn more

If our vision of scaling Ethereum in an open and community-driven way resonates with you, we are looking for values-aligned individuals to help Scroll become the most developer- and user-friendly scaling solution for Ethereum.

- If you are a ZK researcher, ZKP, Go or Solidity developer, or a GPU engineer, we are working on many interesting technical challenges at the edge of what’s possible. Come build cutting-edge solutions to these problems with us in the open!
- If you love nurturing and growing ecosystems or communities, we are looking for developer advocates and community organizers to make sure we are building in a community-aligned and user-friendly way.

To learn more about these roles and about Scroll, check out our [website](https://scroll.io/), [Twitter](https://twitter.com/Scroll_ZKP), [Discord](https://discord.gg/scroll), or [jobs page](https://boards.greenhouse.io/scrollio). If you want to get straight to the code and build with us, you can find our repos at [github.com/scroll-tech](https://github.com/scroll-tech) and [github.com/privacy-scaling-explorations/zkevm-circuits](https://github.com/privacy-scaling-explorations/zkevm-circuits).
