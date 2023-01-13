# Release Note for 0109 Upgrade

On January 9, we rolled out an upgrade to our Pre-Alpha Testnet. The upgrade introduces new features and also improves the overall stability and performance of the testnet infrastructure. In particular, the upgrade significantly improves the L2 processing throughput via batching blocks.

Due to some changes that are incompatible with the previous version, we have reset the network state. We kindly ask all users to reset their wallets for both networks and follow the instructions at [https://scroll.io/prealpha](https://scroll.io/prealpha).

The new RPC endpoints in the updated Pre-Alpha testnet are the following

- Scroll L1: [https://prealpha-rpc.scroll.io/l1](https://prealpha-rpc.scroll.io/l1)
- Scroll L2: [https://prealpha-rpc.scroll.io/l2](https://prealpha-rpc.scroll.io/l2)

Upgrade changelog:

- Blocks are now aggregated in batches for proof generation and data availability. This significantly improves circuit space utilization and thus increases overall transaction throughput.
- The infrastructure service components have separate hosting with their own set of virtual machines for better scalability, fault isolation, and reliability.
- Security is improved through increased isolation of services and more robust gatekeeping measures for internal service communications.
- A complete overhaul of the frontend, including a new streamlined design, improved UI/UX for wallet connections, and better performance from introducing a CDN.
