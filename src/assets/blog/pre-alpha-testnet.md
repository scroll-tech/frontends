# Announcing the Scroll Pre-Alpha Testnet

After over a year of building our zkEVM-based zkRollup in close collaboration with the PSE (Privacy and Scaling Explorations) group at the Ethereum Foundation, we are releasing the pre-alpha version of Scroll for external testers! In the spirit of building in the open with the community, we have prioritized getting community feedback quickly with this initial release.

If you’d like to be an early tester, sign up at [signup.scroll.io](https://signup.scroll.io/) for access. We will invite as many testers as possible while we drive towards a permissionless, public release.

## **What’s in the pre-alpha testnet?**

This initial release will be run on a private PoA fork of Ethereum (the testnet L1) operated by Scroll. On top of this private chain, we will run a testnet Scroll L2 supporting the following features:

- Users will be able to play with a few key demo applications such as a Uniswap fork with familiar web interfaces such as Metamask.
- Users will be able to view the state of the Scroll testnet via block explorers.
- Scroll will run a node that supports unlimited read operations (e.g. getting the state of accounts) and user-initiated transactions involving interactions with the pre-deployed demo applications (e.g. transfers of ERC-20 tokens or swaps of tokens).
- Rollers will generate and aggregate validity proofs for part of the zkEVM circuits to ensure a stable release. In the next testnet phase, we will ramp up this set of zkEVM circuits.
- Bridging assets between these testnet L1 and L2s will be enabled through a smart contract bridge, though arbitrary message passing will not be supported in this release.

Scroll’s pre-alpha testnet will be the first chance for early users and developers to interact with our infrastructure and experience dapp workflows on Scroll. As we scale our node infrastructure, we will relax some of the performance-motivated restrictions and onboard more testers.

## **What’s next for Scroll?**

Soon after our pre-alpha testnet, we will be deploying a more open and permissionless alpha testnet. This will be deployed on a public Ethereum testnet and will be open to the public. In particular, our community can expect the following features:

- Allowing developers to deploy smart contracts
- Allowing anyone to run an archival Scroll node
- Generating and aggregating more pieces of the zkEVM proof to be verified on-chain

As we move step by step towards an eventual mainnet release, we will enable successively more pieces of our final architecture, including a decentralized Roller network and integrations with EVM-native developer tools. In the next few weeks, we will release a series of expository articles and posts explaining Scroll’s architecture and the technical vision that has informed Scroll’s development decisions. Stay tuned to learn more about these!

## Scroll’s Release Philosophy

Scroll’s plan for scaling Ethereum and serving billions of users and developers is a long-term roadmap that requires careful consideration and execution. We firmly believe in the future of the zkEVM as a key to scaling Ethereum, and as such, are committed to releasing it in a way that allows us to work through any challenges in a focused manner and incorporate feedback alongside our roadmap.

By giving users, developers and the broader community progressively more functionality to test instead of releasing all features at once, we aim to isolate any bugs and UX difficulties early and often, allowing us to build towards the most robust, scalable solution that will stand the test of time.

## Join us and learn more

To become an early tester or contributor, sign up to try out our pre-alpha testnet at [signup.scroll.io](https://signup.scroll.io/). In the meantime, if our vision of scaling Ethereum in an open and community-driven way resonates with you, we are looking for values-aligned individuals to help Scroll become the most developer- and user-friendly scaling solution for Ethereum.

- If you are a ZK researcher, ZKP, Go or Solidity developer, or a GPU engineer, we are working on many interesting technical challenges at the edge of what’s possible. Come build cutting-edge solutions to these problems with us in the open!
- If you love nurturing and growing ecosystems or communities, we are looking for developer advocates and community organizers to make sure we are building in a community-aligned and user-friendly way.

To learn more about these roles and about Scroll, check out our [website](https://scroll.io/), [Twitter](https://twitter.com/Scroll_ZKP), [Discord](https://discord.gg/scroll), or [jobs page](https://boards.greenhouse.io/scrollio). If you want to get straight to the code and build with us, you can find our repos at [github.com/scroll-tech](https://github.com/scroll-tech) and [github.com/privacy-scaling-explorations/zkevm-circuits](https://github.com/privacy-scaling-explorations/zkevm-circuits).
