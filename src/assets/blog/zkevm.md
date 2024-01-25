# zkEVM

_We thank Vitalik Buterin, Barry Whitehat, Chih-Cheng Liang, Kobi Gurkan and Georgios Konstantopoulos for their reviews and insightful comments._

## TL;DR

We believe zk-Rollup to be the holy grail — a best-in-class Layer 2 scaling solution that is very cheap and secure. However, existing zk-Rollups are application-specific, which makes it hard to build general composable DApps inside a zk-Rollup and migrate existing applications. We introduce zkEVM, which can generate zk proofs for general EVM verification. This allows us to build a fully EVM-compatible zk-Rollup, which any existing Ethereum application can easily migrate to.

In this article, we identify the design challenges of zkEVM and why it’s possible now. We also give a more specific intuition and describe the high-level ideas of how to build it from scratch.

## Background

[zk-Rollup](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/zk-rollups/) is recognized as the best scaling solution for Ethereum. It is as secure as Ethereum Layer 1 and has the shortest finalizing time comparing to all other Layer 2 solutions (Detailed comparisons [here](https://vitalik.ca/general/2021/01/05/rollup.html)).

>

<!-- > In general, my own view is that in the short term, optimistic rollups are likely to win out for general-purpose EVM computation and ZK rollups are likely to win out for simple payments, exchange and other application-specific use cases, but in the medium to long term ZK rollups will win out in all use cases as ZK-SNARK technology improves.  --- Vitalik Buterin -->

> In the medium to long term, ZK rollups will win out in all use cases as ZK-SNARK technology improves. --- Vitalik Buterin

<!-- <center><I>In the medium to long term ZK rollups will win out in all use cases as ZK-SNARK technology improves --- Vitalik Buterin </I></center>
 -->

The basic idea of zk-Rollup is to aggregate a huge number of transactions into one Rollup block and generate a succinct proof for the block off-chain. Then the smart contract on Layer 1 only needs to verify the proof and apply the updated state directly without re-executing those transactions. This can help save gas fee for an order of magnitude since proof verification is much cheaper than re-executing computations. Another saving comes from data compression (i.e., only keep minimum on-chain data for verification)

Although zk-Rollup is secure and efficient, its applications are still limited to payments and swaps. It’s hard to build general-purpose DApps due to the following two reasons.

- First, if you want to develop DApps in a zk-Rollup, you need to write all your smart contract logic using a special language (i.e. [R1CS](https://tlu.tarilabs.com/cryptography/r1cs-bulletproofs/mainreport.html#rank-1-constraint-systems)). Not only is the syntax of required language complicated, but doing so also demands extremely strong expertise in zero knowledge proof.
- Second, current zk-Rollup doesn’t support composability[^1]. It means different zk-Rollup applications can’t interact with each other within Layer 2. Such quality significantly undermines the composability of DeFi applications.

In a nutshell, zk-Rollup is developer-unfriendly and has limited functionality for now.
That’s the biggest problem we want to tackle. We want to provide the best developer experience and support composability within Layer 2 by supporting native EVM verification directly, so that existing Ethereum applications can simply migrate over onto the zk-Rollup as is.

<!-- This brings us huge advantage to be compatible all with exsiting Ethereum infrastructures without any modification! -->

## Build general DApps in zk-Rollup

There are two ways to build general DApps in zk-Rollup.

- One is building application-specific circuit ("ASIC") for different DApps. <!-- The idea is that you need different circuits for different DApps. -->
- The other is building a universal "EVM" circuit for smart contract execution.
  <!-- The idea is that: any smart contract will eventually run in EVM, so we only need to build a circuit to verify each step in virtual machine. Then we can use this CPU circuit to verify any program execution.
   -->
  > ["circuit"](https://tlu.tarilabs.com/cryptography/r1cs-bulletproofs/mainreport.html#arithmetic-circuits) refer to the program representation used in zero knowledge proof. For example, if you want to prove hash(x) = y, you need to re-write the hash function using the circuit form. The circuit form only supports very limited expressions (i.e., R1CS only support addition and multiplication). So, it’s very hard to write program using the circuit language --- you have to build all your program logic (including if else, loop and so on) using add and mul.

The first approach requires developer to design specialized "ASIC" circuits for different DApps. It is the most traditional way to use zero knowledge proof. Each DApp will have a smaller overhead through customized circuit design. However, it brings the problem of composability since the circuit is "static" and terrible developer experience since it needs strong expertise in circuit design[^2].

<!-- The second approach can provide a much better developer experience since developer can still develop in high-level native language and doesn’t need to know low-level circuit design.  -->

The second approach doesn’t require any special design or expertise for developer. The high-level idea of such machine-based proof is that any program will eventually run on CPU, so we only need to build a universal CPU circuit to verify the low-level CPU step. Then we can use this CPU circuit to verify any program execution. In our scenario, program is smart contract and CPU is EVM. However, this approach is not commonly adopted in the past years due to its large overhead. For example, even if you only want to prove the result of `add` is correct in one step, you still need to afford the overhead of an entire EVM circuit. If you have thousands of steps in your execution trace, it will be 1000x EVM circuit overhead on the prover side.[^3]

Recently, there has been a lot of research going on to optimize zk proofs following those two approaches, including (i) proposing new zk-friendly primitives i.e. [Poseidon hash](https://www.poseidon-hash.info/) can achieve 100x efficiency than SHA256 in circuit, (ii) ongoing work on improving efficiency of general-purpose verifiable VMs, as in [TinyRAM](https://eprint.iacr.org/2013/507), and (iii) a growing number of general-purpose optimization tricks like Plookup, and even more generally faster cryptographic libraries.

<!-- There has been a lot of research going on to optimize those approaches. For the first approach, many zk-friendly primitives are proposed with similar functionalities. For example, [Poseidon hash](https://www.poseidon-hash.info/) can achieve 100x efficiency than SHA256 in circuit. For the second approach, it has been tested successfully in [TinyRAM](https://eprint.iacr.org/2013/507) years ago. In TinyRAM, you can verify the execution of a subset of C directly through a CPU circuit.  -->

In our [previous article](https://scroll-official.medium.com/scroll-a-layer-2-ecosystem-based-on-zk-rollup-186ff0d764c), We propose to design "ASIC" circuit for each DApp and let them communicate through cryptographic commitments. However, based on the feedback from the community, we changed our priority and will focus on building a general EVM circuit (so called "zkEVM") first following the second approach. zkEVM will allow exactly the same developer experience as developing on Layer 1. Instead of leaving design complexity to the developer, we will take over it and solve the efficiency problem through customized EVM circuit design.

## Design challenges of zkEVM

zkEVM is hard to build. Even though the intuition is clear for years, no one has built a native EVM circuit successfully. Different from TinyRAM, it’s even more challenging to design and implement zkEVM due to the following reasons:

- **First, EVM has limited support of elliptic curves.** For now, EVM only supports BN254 pairing. It’s hard to do proof recursion since [cyclic elliptic curve](https://github.com/daira/halographs/blob/master/halographs.pdf) is not directly supported. It’s also hard to use other specialized protocols under this setting. The verification algorithm has to be EVM friendly.
- **Second, EVM word size is 256bit.** EVM operates over 256-bit integers (much like most regular VMs operate over 32-64 bit integers), whereas zk proofs most "naturally" work over prime fields. Doing "mismatched field arithmetic" inside a circuit requires range proofs, which will add ~100 constraints per EVM step. This will blow up EVM circuit size by two orders of magnitudes.
- **Third, EVM has many special opcodes.** EVM is different from traditional VM, it has many special [opcodes](https://www.ethervm.io/) like `CALL` and it also has error types related to the execution context and gas. This will bring new challenges to circuit design.
- **Fourth, EVM is a stack-based virtual machine.** The [SyncVM](https://zksync.io/dev/contracts/#sync-vm) (zksync) and [Cario](https://eprint.iacr.org/2021/1063) (starkware) architecture defines its own IR/AIR in the register-based model. They built a specialized compiler to compile smart contract code into a new zk-friendly IR. Their approach is language compatible instead of native EVM-compatible. It’s harder to prove for stack-based model and support native tool chain directly.
- **Fifth, Ethereum storage layout carries a huge overhead.** The Ethereum storage layout highly relies on [Keccak](https://keccak.team/files/Keccak-reference-3.0.pdf) and a huge [MPT](https://eth.wiki/en/fundamentals/patricia-tree)[^4], both of them are not zk-friendly and have a huge proving overhead. For example, Keccak hash is 1000x larger than Poseidon hash in circuit. However, if you replace Keccak with another hash, it will cause some compatibility problems for the existing Ethereum infrastructure.
- **Sixth, machine-based proof has a gigantic overhead.** Even if you can handle all the aforementioned problems properly, you still need to find an efficient way to compose them together to get a complete EVM circuit. As I mentioned in previous section, even simple opcodes like `add` might result in the overhead of the entire EVM circuit.

## Why possible now?

Thanks for the great progress made by researchers in this area, more and more efficiency problems are solved in the last two years, the proving cost for zkEVM is eventually feasible! The biggest technology improvement comes from the following aspects:

- **The usage of polynomial commitment.** In the past few years, most succinct zero knowledge proof protocols stick to R1CS with PCP query encoded in an application-specific trusted setup. The circuit size usually blows up and you can’t do many customized optimizations since the degree of each constraint needs to be 2 ([bilinear pairing](https://vitalik.ca/general/2017/01/14/exploring_ecp.html) only allows one multiplication in the exponent). With [polynomial commitment schemes](https://www.youtube.com/watch?v=BfV7HBHXfC0), you can lift your constraints to any degree with a universal setup or even transparent setup. This allows great flexibility in the choice of backend.
- **The appearance of lookup table arguments and customized gadgets.** Another strong optimization comes from the usage of lookup tables. The optimization is firstly proposed in [Arya](https://eprint.iacr.org/2018/380) and then gets optimized in [Plookup](https://eprint.iacr.org/2020/315). This can save A LOT for zk-unfriendly primitives (i.e., bitwise operations like AND, XOR, etc.) . [Customized gadgets](https://kobi.one/2021/05/20/plonk-custom-gates.html) allow you to do high degree constraints with efficiency. [TurboPlonk](https://docs.zkproof.org/pages/standards/accepted-workshop3/proposal-turbo_plonk.pdf) and [UltraPlonk](https://zcash.github.io/halo2/concepts/arithmetization.html) defines elegant program syntax to make it easier to use lookup tables and define customized gadgets. This can be extremely helpful for reducing the overhead of EVM circuit.
- **Recursive proof is more and more feasible.** Recursive proof has a huge overhead in the past since it relies on special pairing-friendly cyclic elliptic curves (i.e. [MNT curve-based construction](https://eprint.iacr.org/2014/595)). This introduces a large computation overhead. However, more techniques are making this possible without sacrificing the efficiency. For example, [Halo](https://eprint.iacr.org/2019/1021) can avoid the need of pairing-friendly curve and amortize the cost of recursion using special inner product argument. Aztec shows that you can do proof aggregation for existing protocols directly (lookup tables can reduce the overhead of [non-native field operation](https://hackmd.io/@arielg/B13JoihA8) thus can make the verification circuit smaller). It can highly improve the scalability of supported circuit size.
- **Hardware acceleration is making proving more efficient.** To the best of our knowledge, we have made the fastest GPU and ASIC/FPGA accelerator for the prover. [Our paper](https://people.iiis.tsinghua.edu.cn/~gaomy/pubs/pipezk.isca21.pdf) describing ASIC prover has already been accepted by the largest computer conference (ISCA) this year. The GPU prover is around 5x-10x faster than [Filecoin’s implementation](https://github.com/filecoin-project/bellperson). This can greatly improve the prover’s computation efficiency.

## Ok, so how does it work and how to build it?

Besides the strong intuition and technology improvement, we still need to have a more clear idea of what we need to prove and figure out a more specific architecture. We will introduce more technical details and comparisons in the follow up articles. Here, we describe the overall workflow and some key ideas.

### Workflow for Developers and Users

For developers, they can implement smart contracts using any EVM-compatible language and deploy the compiled bytecode on Scroll. Then, users can send transactions to interact with those deployed smart contracts. The experience for both users and developers will be the exactly the same as Layer 1. However, the gas fee is significantly reduced and transactions are pre-confirmed instantly on Scroll (withdraw only takes a few minutes to finalize).

### Workflow for zkEVM

Even if the workflow outside remains the same, the underlying processing procedure for Layer 1 and Layer 2 are entirely different:

- Layer 1 relies on the re-execution of smart contracts.
- Layer 2 relies on the validity proof of zkEVM circuit.

Let’s give a more detailed explanation of how things are going differently for transactions on Layer 1 and Layer 2.

<!-- In Layer 1, the bytecode of deployed smart contracts are stored in the EVM storage. If a user wants to interact with some smart contract, he can send a transaction to the address of the smart contract. Then, full node will load the bytecode of the smart contract from the storage and execute it on EVM (transaction will be used as input data). Each full node needs to execute in the same way and thus can lead to the same result. The security and consensus are guaranteed by the re-execution of smart contracts --- Each full node will eventually reach the same updated state. -->

In Layer 1, the bytecodes of the deployed smart contracts are stored in the Ethereum storage. Transactions will be broadcasted in a P2P network. For each transaction, each full node needs to load the corresponding bytecode and execute it on EVM to reach the same state (transaction will be used as input data).

In Layer 2, the bytecode is also stored in the storage and users will behave in the same way. Transactions will be sent off-chain to a centralized zkEVM node. Then, instead of just executing the bytecode, zkEVM will generate a succinct proof to prove the states are updated correctly after applying the transactions. Finally, Layer 1 contract will verify the proof and update the states without re-executing the transactions.

Let’s take a deeper look at the execution process and see what zkEVM needs to prove at the end of the day. In native execution, EVM will load the bytecode and execute the opcodes in the bytecode one by one from beginning. Each opcode can be thought as doing the following three sub-steps : (i) Read elements from stack, memory or storage (ii) Perform some computation on those elements (iii) Write back results to stack, memory or storage.[^5] For example, `add` opcode needs to read two elements from stack, add them up and write the result back to stack.

So, it’s clear that the proof of zkEVM needs to contain the following aspects corresponding to the execution process

- The bytecode is correctly loaded from persistent storage
  (You are running the correct opcode loaded from a given address)
- The opcodes in the bytecode are executed one by one consistently
  (The bytecode is executed in order without missing or skipping any opcode)
- Each opcode is executed correctly
  (Three sub-steps in each opcode are carried out correctly, R/W + computation)

### zkEVM Design highlight

When designing the architecture for zkEVM, we need to handle/address the aforementioned three aspects one by one.

1. We need to design a circuit for some cryptographic accumulator.

   This part acts like a "verifiable storage", we need some technique to prove we are reading correctly. A cryptographic accumulator can be used to achieve this efficiently.[^6]
   Let’s take Merkle Tree as an example. The deployed bytecode will be stored as a leaf in the Merkle Tree. Then, verifier can verify the bytecode is loaded correctly from a given address using a succinct proof (i.e., verify Merkle Path in circuit). For Ethereum storage, we need the circuit to be compatible with Merkle Patricia Trie and Keccak hash function.

2. We need to design a circuit to link the bytecode with the real execution trace.

   One problem to move bytecode into a static circuit is conditional opcodes like `jump` (corresponding to loop, if else statement in smart contracts). It can jump anywhere. The destination is not determined before one has run the bytecode with specific input. That’s the reason why we need to verify the real execution trace. The execution trace can be thought as "unrolled bytecode", it will include the sequence of opcodes in the real execution order (i.e., if you jump to another position, the trace will contain the destined opcode and position).

   Prover will provide the execution trace directly as witness to the circuit. We need to prove that the provided execution trace is indeed the one "unrolled" from the bytecode with specific input. The idea is forcing the value of program counter to be consistent. To deal with the undetermined destination, the [idea](https://hackmd.io/5vKFGDcITKuNPHSRT8H9jA) is letting prover provide everything. Then you can check the consistency efficiently using a lookup argument (i.e., prove the opcodes with proper global counter is included in the "bus").

3. We need to design circuits for each opcode (Prove read, write and computations in each opcode are correct).

   This is the most important part --- Prove each opcode in the execution trace is correct and consistent. It will bring a huge overhead if you put all the things together directly. The important optimization idea here is that

   - We can separate R/W and computation into two proofs. One will fetch the elements needed for all the opcodes into a "bus". The other will prove the computation performed on the elements from the "bus" is carried out correctly. This can greatly reduce the overhead of each part (i.e., you don’t need to consider the entire EVM storage in the computation proof). In a [more detailed specification](https://github.com/appliedzkp/zkevm-specs), the first one is called "state proof" and the second one is called "EVM proof". Another observation is that "bus mapping" can be efficiently handled by the lookup argument.
   - We can design higher degree customized constraint for each opcode (i.e., EVM word can be solved efficiently by chopping off it into several chunks). We can choose whether to "open" a constraint through a selector polynomial according to our need. This can avoid the overhead of the entire EVM circuit in each step.

This architecture is firstly specified by Ethereum Foundation. It’s still at an early stage and under active development. We are collaborating with them closely on this to find the best way to implement the EVM circuit. So far, the most important traits are defined and some opcodes have already been implemented [here](https://github.com/appliedzkp/zkevm-circuits) (using UltraPlonk syntax in the Halo2 repo). More details will be introduced in the follow up articles. We refer interested readers to read this [document](https://hackmd.io/Hy_nqH4yTOmjjS9nbOArgw?view). The development process will be transparent. This will be a community-effort and fully open-sourced design. Hope more people can join and contribute to this.

### What else it can bring?

zkEVM is much more than just Layer 2 scaling. It can be thought as a direct way to scale Ethereum Layer 1 via Layer-1 validity proof. That means you can scale existing Layer 1 without any special Layer 2.

For example, you can use zkEVM as a full node. The proof can be used for proving transitions between existing states directly --- No need to port anything to Layer 2, you can prove for all Layer 1 transactions directly! More broadly, you can use zkEVM to generate a succinct proof for the whole Ethereum like Mina. The only thing you need to add is proof recursion (i.e. embed the verification circuit of a block to the zkEVM)[^7].

## Conclusion

zkEVM can provide the same experience for developers and users. It’s order of magnitudes cheaper without sacrificing security. There has been proposed architecture to build it in a modular way. It leverages recent breakthrough in zero knowledge proof to reduce the overhead (including customized constraint, lookup argument, proof recursion and hardware acceleration). We look forward to seeing more people joining the zkEVM community effort and brainstorming with us!

## A little about us

_Scroll Tech is a newly built tech-driven company. We aim to build an EVM-compatible zk-Rollup with a strong proving network ([See an overview here](/blog/architecture)). The whole team is now focusing on the development. We are actively hiring more passionate developers, reach out to us at [hire@scroll.io](mailto:hire@scroll.io). If you have any question about the technical content, reach out to me at [ye@scroll.io](mailto:ye@scroll.io). [DM](https://twitter.com/yezhang1998) is also open._

[^1]: Starkware claims to achieve composability a few days ago ([reference here](https://medium.com/starkware/starknet-alpha-2-4aa116f0ecfc))
[^2]: Circuit is fixed and static. For example, you can’t use variable upper bound loop when implementing a program as a circuit. The upper bound has to be fixed to its maximum value. It can’t deal with dynamic logic.
[^3]: To make it more clear, We elaborate about the cost of EVM circuit here. As we described earlier, circuit is fixed and static. So, EVM circuit needs to contain all possible logic (10000x larger than pure `add`). That means even if you only want to prove for `add`, you still need to afford the overhead of all possible logics in the EVM circuit. It will 10000x amplify the cost. In the execution trace, you have a sequence of opcodes to prove and each opcode will have such a large overhead.
[^4]: EVM itself is not tightly bound to the Merkle Patricia tree. MPT is just how Ethereum states are stored for now. A different one can easily be plugged in (i.e., the current proposal to replace MPT with [Verkle trees](https://vitalik.ca/general/2021/06/18/verkle.html)).
[^5]: This is a highly simplified abstraction. Technically, the list of "EVM state" is longer including PC, gas remaining, call stack (all of the above plus address and staticness per call in the stack), a set of logs, and transaction-scoped variables (warm storage slots, refunds, self-destructs). Composability can be supported directly with additional identifier for different call context.
[^6]: We use accumulator for storage since the storage is huge. For memory and stack, one can use editable Plookup ("RAM" can be implemented efficiently in this way).
[^7]: It’s non-trivial to add a complete recursive proof to the zkEVM circuit. The best way to do recursion is still using cyclic elliptic curves (i.e., Pasta curve). Need some ["wrapping"](https://hackmd.io/u_2Ygx8XS5Ss1aObgOFjkA) process to make it verifiable on Ethereum Layer 1.

<!-- [2]: static means the logic has to be fixed before compilation (i.e. you can’t do variable-upper bound loop in traditional "ASIC" circuit)
[link text](https:// "title") -->
