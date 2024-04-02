# An overview of Scroll’s architecture

Scroll is an EVM-equivalent zkRollup to scale Ethereum. Technically speaking, Scroll is built upon two major pieces. The core piece is the [zkEVM](https://scroll.io/blog/zkEVM), which is used to prove the correctness of EVM execution in Layer 2. We have been building it in the open with the Privacy and Scaling Explorations group at the Ethereum Foundation for over a year. But to turn the zkEVM into a full zkRollup on the Ethereum, we also need to build a complete L2 architecture around it.

In this post, we give an overview of Scroll’s overall architecture. More specifically, we will cover the initial version of Scroll which is composed of a centralized sequencing node and decentralized proving network. We are committed to decentralizing the set of sequencing nodes in the future and will share our design for this in future articles.

## Scroll’s architecture

The current architecture consists of three infrastructure components (see Figure 1):

- **Scroll Node:** Constructs L2 blocks from user transactions, commits them to the Ethereum base layer, and passes messages between L1 and L2.
- **Roller Network:** Generates the zkEVM validity proofs to prove that transactions are executed correctly.
- **Rollup and Bridge Contracts:** Provides data availability for Scroll transactions, verifies zkEVM validity proofs, and allows users to move assets between Ethereum and Scroll.

In what follows, we detail the role of each of these components.

![Figure 1. Scroll architecture](https://i.imgur.com/oLlyhIx.png)

### Scroll Node

The **Scroll node** is the main way for applications and users to interact with Scroll. It consists of three modules, the **Sequencer**, **Coordinator**, and **Relayer**.

The **Sequencer** provides a JSON-RPC interface and accepts L2 transactions. Every few seconds, it retrieves a batch of transactions from the L2 mempool and executes them to generate a new L2 block and a new state root. Our sequencer implementation is based on the Go-Ethereum (Geth), one of the most popular Ethereum node implementation. By forking Geth, we can achieve the best compatibility and inherit security that has stood the test of time.

Once a new block is generated, the **Coordinator** is notified and receives the execution trace of this block from the Sequencer. It then dispatches the execution trace to a randomly-selected **Roller** from the roller pool for proof generation.

The **Relayer** watches the bridge and rollup contracts deployed on both Ethereum and Scroll. It has two main responsibilities. First, it monitors the rollup contract to keep track of the status of L2 blocks including their data availability and validity proof. Second, it watches the deposit and withdraw events from the bridge contracts deployed on both Ethereum and Scroll and relays the messages from one side to the other.

### Roller Network

The **Rollers** serve as provers in the network that are responsible for generating validity proofs for the zkRollup. Rollers are expected to utilize accelerators such as GPUs, FPGAs, and ASICs to reduce the proving time and proving cost. Figure 2 shows how a Roller generates the validity proof for each block. The process consists of the following steps:

- A Roller first converts the execution trace received from the **Coordinator** to circuit witnesses.
- It generates proofs for each of the **zkEVM** circuits.
- Finally, it uses **proof aggregation** to combine proofs from multiple zkEVM circuits into a single block proof.

![Figure 2. Roller workflow](https://i.imgur.com/Sajm1E2.png)

### Rollup and Bridge Contracts

Scroll connects to the base layer of Ethereum through the **Rollup** and **Bridge** smart contracts. Together, these ensure data availability for L2 transactions and allow users to pass assets and messages between L1 and L2.

The **Rollup contract** receives L2 state roots and blocks from the Sequencer. It stores state roots in the Ethereum state and L2 block data as Ethereum calldata. This provides **data availability** for Scroll blocks and leverages the security of Ethereum to ensure that indexers including the Scroll Relayer can reconstruct L2 blocks. Once a block proof establishing the validity of an L2 block has been verified by the Rollup contract, the corresponding block is considered finalized on Scroll.

The **Bridge contracts** deployed on the Ethereum and Scroll allow users to pass arbitrary messages between L1 and L2. On top of this message passing protocol, we have also built a trustless bridging protocol to allow users to bridge ERC-20 assets in both directions. To send a message or funds from Ethereum to Scroll, users call a `sendMessage` transaction on the Bridge contract. The Relayer will index this transaction on L1 and send it to the Sequencer for inclusion in an L2 block. Sending messages from Scroll back to Ethereum uses a similar process on the L2 Bridge contract.

## How does Scroll’s zkRollup work?

Putting these three architectural pieces together, we can now explain the workflow of Scroll’s zkRollup, summarized in Figure 3 below.

![Figure 3. Scroll workflow](https://i.imgur.com/QC6IWil.png)

L2 blocks in Scroll are generated, committed to base layer Ethereum, and finalized in the following sequence of steps:

1.  The Sequencer generates a sequence of blocks. For the _i_-th block, the Sequencer generates an execution trace _**T**_ and sends it to the Coordinator. Meanwhile, it also submits the transaction data _**D**_ as calldata to the Rollup contract on Ethereum for data availability and the resulting state roots and commitments to the transaction data to the Rollup contract as state.
2.  The Coordinator randomly selects a Roller to generate a validity proof for each block trace. To speed up the proof generation process, proofs for different blocks can be generated in parallel on different Rollers.
3.  After generating the block proof _**P**_ for the _i_-th block, the Roller sends it back to the Coordinator. Every _k_ blocks, the Coordinator dispatches an aggregation task to another Roller to aggregate _k_ block proofs into a single aggregate proof _**A**_.
4.  Finally, the Coordinator submits the aggregate proof _**A**_ to the Rollup contract to finalize L2 blocks _i+1_ to _i+k_ by verifying the aggregate proof against the state roots and transaction data commitments previously submitted to the rollup contract.

Figure 3 illustrates that Scroll blocks will be finalized on L1 in a multi-step process. Each L2 block will progress through the following three stages until it is finalized.

- `Precommitted` indicates a block has been proposed by a Sequencer and sent to Rollers. Although Precommitted blocks are not yet a canonical part of the Scroll L2 chain because they have not been posted on the Ethereum base layer, users who trust the Sequencer can choose to take action on them in anticipation.
- `Committed` indicates the transaction data of this block has been posted on the rollup contract on Ethereum. This ensures that the block data is available, but does not prove that it has been executed in a valid way.
- `Finalized` indicates the correct execution of transactions in this block has been proven by verifying a validity proof on-chain on Ethereum. Finalized blocks are considered canonical parts of the Scroll L2 chain.

Putting all of these together, Scroll is able to execute native EVM bytecode on L2 while inheriting strong security guarantees from base layer Ethereum. In the next post in this series, we will explain the workflow for developers to deploy dapps on Scroll and how users can interact with them.

## Learn more

We have designed Scroll’s architecture to align with our [vision and values](https://mirror.xyz/scroll.eth/EYn7ODhQAnNWABwWcu5xZLts_wEXTZAEWyTgExGS1DA) and our [technical principles](https://mirror.xyz/scroll.eth/N7cAie4ul0PdSxNdv2FTqgMV2JEkhOJocsxfeqe4SFE). In upcoming articles, we explain how Scroll will use this architecture to provide a more scalable user and developer experience on Ethereum. Stay tuned to learn more, and sign up to try out our pre-alpha testnet at [scroll.io](http://scroll.io/)!

If our vision of scaling Ethereum in an open and community-driven way resonates with you, we are looking for values-aligned individuals to help Scroll become the most developer- and user-friendly scaling solution for Ethereum.

- If you are a ZK researcher, ZKP, Go or Solidity developer, or a GPU engineer, we are working on many interesting technical challenges at the edge of what’s possible. Come build cutting-edge solutions to these problems with us in the open!
- If you love nurturing and growing ecosystems or communities, we are looking for developer advocates and community organizers to make sure we are building in a community-aligned and user-friendly way.

To learn more about these roles and about Scroll, check out our [website](https://scroll.io/), [Twitter](https://twitter.com/Scroll_ZKP), [Discord](https://discord.gg/scroll), or [jobs page](https://boards.greenhouse.io/scrollio). If you want to get straight to the code and build with us, you can find our repos at [github.com/scroll-tech](http://github.com/scroll-tech) and [github.com/privacy-scaling-explorations/zkevm-circuits](http://github.com/privacy-scaling-explorations/zkevm-circuits).
