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

### Step 3: User Mint Status

Check if user has already minted the badge. [Related doc](https://github.com/scroll-tech/canvas-contracts/blob/master/docs/canvas-interaction-guide.md#how-to-check-if-a-user-has-minted-their-profile-yet)

### Step 4: Mint Prompt

- If the user has not yet minted the badge, display a scrolly animation. - Design example
  ![Canvas on Bridge](https://github.com/user-attachments/assets/3b8445f5-8890-453f-b92c-4834dad5846c) - After the user clicks on the mint badge, show a mint pop-up displaying the default badge information.
  [Example code](https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/bridge/components/MintBadge/index.tsx) (The `Canvas` component is the scrolly animation component, and the `BadgeDetailDialog` is the pop-up component.)

- If the badge has already been minted, terminate the process.

### Step 5: Additional Conditions

Check if the user has minted canvas. Based on the minting status:

- If already minted, allow minting of the badge.
  - Design example
    ![BadgeDetailDialog](https://github.com/user-attachments/assets/8a664aa2-9d17-4f38-a170-11bb0f413e20)
- If not minted, disallow and redirect the user to the Scroll canvas mint page.
  - Design example
    ![BadgeDetailDialog without Canvas](https://github.com/user-attachments/assets/56d92a81-81c8-42fc-98e1-4f6df729bc67)

### Step 6: Execute Mint Operation

- Implement a button that, when clicked, triggers the mint interface. This action calls the mint contract. Scroll supports 3 different types of badges, each with its corresponding minting method. You can refer to [the document](https://github.com/scroll-tech/canvas-contracts/blob/master/docs/badge-examples.md) for details.

### Step 7: Post-Mint Process

After successfully minting, redirect to the user’s badge detail page and display the badge information.

- Design example
  ![BadgeDetailPage](https://github.com/user-attachments/assets/4a0d53ae-7a24-4c1c-abdf-d6c7716a2a4c)

## Conclusion

This guide should assist you in successfully integrating the Canvas mint functionality within your platform. If you need additional support or have any questions, please contact our developer support team.

## Reference

All the methods used in the frontend

https://github.com/scroll-tech/frontends/blob/mainnet/src/services/canvasService.ts

Mint badge pop-up
https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/canvas/Dashboard/BadgeDetailDialog/index.tsx

For third parties, the possible statuses include

```
BadgeDetailDialogType {
 	HIDDEN = "",
 	MINT = "mint",
 	UPGRADE = "upgrade",
 	VIEW = "view",
 	NO_CANVAS = "noCanvas",
 }
```

Note that when a badge has not been minted, it is necessary to set default information and a preview image.

Scrolly animation
https://github.com/scroll-tech/frontends/blob/mainnet/src/pages/bridge/components/MintBadge/index.tsx
