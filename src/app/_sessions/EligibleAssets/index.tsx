import { Box, Stack, Typography } from "@mui/material"

import { SCROLL_NATIVE_ASSET_LIST } from "@/constants"

import Card from "../components/StepCard"
import NativeAssetCard from "./NativeAssetCard"
import TokenCard from "./TokenCard"
import TOKEN_LIST from "./tokenList"

const EligibleAssets = () => {
  return (
    <Card title="Step 1: Get eligible assets">
      <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2.4rem"], mt: ["1.6rem", 0] }}>
        Marks are awarded based on all eligible assets used within whitelisted protocols within our ecosystem. Marks will no longer be accrued by
        holding these assets. Multiply Marks and accrue extra project rewards.
      </Typography>
      <Stack
        direction={["column", "row"]}
        justifyContent={["space-between"]}
        sx={{
          gap: ["0.8rem", "1.6rem"],
          mt: ["1.6rem", "3.2rem"],
        }}
      >
        {SCROLL_NATIVE_ASSET_LIST.map(item => (
          <NativeAssetCard key={item.name} {...item}></NativeAssetCard>
        ))}
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: ["repeat(auto-fill, minmax(9rem, 1fr))", "repeat(auto-fill, minmax(12rem, 1fr))"],
          gap: ["0.8rem", "1.6rem"],
          mt: ["0.8rem", "1.6rem"],
        }}
      >
        {TOKEN_LIST.map(item => (
          <TokenCard key={item.name} {...item}></TokenCard>
        ))}
      </Box>
    </Card>
  )
}

export default EligibleAssets
