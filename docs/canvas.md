# Scroll Canvas - Anthropomorphic "assistants" Integration Guide for Developers

## Introduction

This guide provides developers with the necessary steps to integrate the Canvas minting functionality on the Scroll network into third-party platforms. By following this guide, you will enable your users to mint badges directly from your platform.

## Prerequisites

Ensure that your platform is compatible with and connected to the Scroll network. Developers should have a basic understanding of blockchain interactions and contract operations within the Scroll ecosystem.

## Integration Steps

### Step 1: Network Connection

Before initiating any minting operations, verify that the platform is connected to the Scroll network.

### Step 2: Compliance with Minting Requirements

Check for compliance with predefined minting rules set by your platform. These rules are defined by partners and should be verified before proceeding.

### Step 3: Mint Prompt

A scrolly can be placed in the corner of the page to remind the user to mint a badge.
![Canvas on Bridge](https://github.com/user-attachments/assets/3b8445f5-8890-453f-b92c-4834dad5846c)
[Reference code](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/bridge/components/MintBadge/index.tsx)

After clicking the button, there are two ways to show the badge introduction:

- Redirect to badge introduction page 【officially used】
  ![CleanShot 2024-09-11 at 13 58 01@2x](https://github.com/user-attachments/assets/62a21eb5-3bbf-49a5-8599-8d1c2fc71805)
  [Reference code](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/canvas/badgeContract/index.tsx)
- Show a mint pop-up displaying the default badge information
  ![BadgeDetailDialog](https://github.com/user-attachments/assets/8a664aa2-9d17-4f38-a170-11bb0f413e20)
  [Reference code](https://github.com/scroll-tech/frontends/blob/add-canvas-doc/src/pages/canvas/Dashboard/BadgeDetailDialog/index.tsx)

##### Main actions:

1. Retrieve the badge description information from the badgeTokenURI and display it to the user.
2. Check if the user already has this badge
3. Check user eligibility for minting
4. Handle ineligibility based on badge type
5. Disable the mint button for ineligible users
6. Enable the mint button for eligible users

### Step 4: Additional Conditions

Badges and Canvas are not inherently linked, meaning a user can mint a badge without minting a Canvas. However, if you want to require the user to mint the Canvas first before minting the badge (so that the minted badge can be automatically attached to the Scroll Canvas), you can add an extra check for this.

- On a badge introduction page  
  ![BadgeDetailPage without Canvas](https://github.com/user-attachments/assets/6c6e1dfe-cac1-4e82-8e8d-02c3e88ae148)

- On a badge introduction modal  
  ![BadgeDetailDialog without Canvas](https://github.com/user-attachments/assets/56d92a81-81c8-42fc-98e1-4f6df729bc67)

[Reference Code](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/canvas/badgeContract/index.tsx#L121)

### Step 5: Execute Mint Operation

Scroll supports 3 different types of badges, each with its corresponding minting method except for gifted badge which would be minted by the issuer. You can refer to [the function](https://github.com/scroll-tech/frontends/blob/mainnet/src/services/canvasService.ts#L330) for details.

### Step 6: Post-Mint Process

After minting successfully, redirect to the user’s badge detail page and display the badge details.

![BadgeDetailPage](https://github.com/user-attachments/assets/4a0d53ae-7a24-4c1c-abdf-d6c7716a2a4c)
[Reference code](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/canvas/badge/index.tsx)

## Conclusion

[canvasService](https://github.com/scroll-tech/frontends/blob/mainnet/src/services/canvasService.ts) includes many useful methods for interacting with Canvas-related contracts, like: `getBadgeMetadata`, `checkIfHasBadgeByAddress`, `mintBadge`.

[badgeContract](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/canvas/badgeContract/index.tsx) and [badge](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/canvas/badge/index.tsx) are the two important parts currently used in the Scroll frontend's mint badge process.

Additionally, if you want a more lightweight way to integrate the mint badge process into your website, [BadgeDetailDialog](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/canvas/Dashboard/BadgeDetailDialog/index.tsx) is a solution worth trying.

This guide should assist you in integrating the Canvas mint functionality within your platform. If you need additional support or have some questions, please contact our developer support team.
