import { Box, Divider, Stack, Typography } from "@mui/material"

import useNFTBridgeStore from "@/stores/nftBridgeStore"

import Gallery from "../../components/Gallery"
import SelectedItem from "../../components/Gallery/SelectedItem"
import NetworkSelect from "../../components/NetworkSelect"
import Fee from "./Fee"
import Send from "./Send"

const Transfer = props => {
  const { toNetwork, selectedList } = useNFTBridgeStore()

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", borderRadius: "6px", flex: 1, p: "5rem 3rem 3rem", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" spacing={1}>
        <Typography variant="h6" color="secondary" sx={{ fontWeight: 400, whiteSpace: "nowrap" }}>
          Transfer to
        </Typography>
        <NetworkSelect value={toNetwork.chainId} options={[toNetwork]} disabled></NetworkSelect>
      </Stack>
      <Divider sx={{ my: "2.5rem", mx: "2rem", width: "calc(100% - 4rem)" }}></Divider>
      <Typography variant="h6" color="secondary" sx={{ fontWeight: 400, lineHeight: 1 }}>
        Selected NFTs
      </Typography>
      <Gallery
        sx={{ mt: "2.5rem", flex: 1 }}
        column={2}
        emptyTip={`Please select NFTs from left panel.Then you can transfer them to ${toNetwork.name}.`}
      >
        {selectedList.map(item => (
          <SelectedItem key={item.id} {...item}></SelectedItem>
        ))}
      </Gallery>
      <Divider sx={{ my: "2.5rem", mx: "2rem", width: "calc(100% - 4rem)" }}></Divider>
      <Fee></Fee>
      <Send></Send>
    </Box>
  )
}

export default Transfer
