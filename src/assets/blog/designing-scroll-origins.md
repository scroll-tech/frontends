# Designing Scroll Origins

In October, we launched Scroll Origins, a program to commemorate the launch of Scroll Mainnet and celebrate alongside early developers building on Scroll ([previous blog](https://scroll.io/blog/scroll-origins-nft)). We’ve now enabled minting for eligible addresses ([https://scroll.io/developer-nft/mint](https://scroll.io/developer-nft/mint)) and would love to take some time to elaborate on how we approached the design of this NFT.

# Quintic, Quartic and Cubic

A visual embodiment of Scroll’s commitment to zero knowledge principles, each NFT is a non-transferable token, an SVG file with all the data stored on-chain (No, it’s not a JPEG!).

A unique polynomial function is created based on the contract deployment date, wallet address, and a few other project-specific factors to construct an NFT that's personal to each developer. There are three different NFT patterns with polynomial graphics based on the contract deployment stage. The earliest batch of deployed projects receives a Quintic pattern, followed by Quartic and then Cubic.

For graphs to be beautifully displayed within the NFT frame, passing through the coordinates of origin with all turning points prominently displayed, we applied a few more math wizardries. Here’s the [Python script](https://file.notion.so/f/f/cc12e519-e01d-4277-9573-3fe8e5bdf9ce/497c4a7e-2e47-43fb-9e8e-6292fcba1680/generate_polynomials.py?id=7920a78e-915f-4f55-b12d-4249de214d45&table=block&spaceId=cc12e519-e01d-4277-9573-3fe8e5bdf9ce&expirationTimestamp=1702771200000&signature=FqEYCOXcL0_qsC0Tlv3oyEV3Ako3i_wcQ6N6bxrtQC8&downloadName=generate_polynomials.py) for generating polynomials for each NFT graph.

<p align="center" style="margin: 20px auto;">
  <img src="/imgs/homepage/blog/scrollOriginsNFT/quintic.svg" alt="quintic" style="width: 30%;"/>
  <img src="/imgs/homepage/blog/scrollOriginsNFT/quartic.svg" alt="quartic" style="width: 30%;"/>
  <img src="/imgs/homepage/blog/scrollOriginsNFT/cubic.svg" alt="cubic" style="width: 30%;"/>
</p>

# One more thing

On top of that, we added some extra rarity feature unlocks - epic and rare rainbow patterns for the more active protocols with more user activities. Head over to [https://scroll.io/developer-nft/mint](https://scroll.io/developer-nft/mint) to mint your piece of Scroll’s history and share your NFT with the community to discover which one boasts the most rarity features.

<p align="center">
  <img src="/imgs/homepage/blog/scrollOriginsNFT/rainbow-background.svg" alt="rainbow-background.svg" style="width: 45%;"/>
  <img src="/imgs/homepage/blog/scrollOriginsNFT/rainbow-stroke.svg" alt="rainbow-stroke.svg" style="width: 45%;"/>
</p>

# More on Scroll

We are dedicated to building more fun activities for our community to enjoy, and your feedback is essential to make this happen. Keep an eye out for upcoming programs for both developers and users on Scroll, and thank you for supporting us early on this journey!
