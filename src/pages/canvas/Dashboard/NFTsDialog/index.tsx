import { useQuery } from "@tanstack/react-query"
import "react-advanced-cropper/dist/style.css"
import Img from "react-cool-img"

import { Box } from "@mui/material"
import { Stack } from "@mui/system"

import { fetchUserNFTsURL } from "@/apis/canvas"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import Button from "@/pages/canvas/components/Button"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore from "@/stores/canvasProfileStore"

import Error from "./Error"
import NFT from "./NFT"
import NoData from "./NoData"

const NFTsDialog = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { NFTsDialogVisible, changeNFTsDialogVisible, changeNFT } = useCanvasProfileStore()
  const { isMobile } = useCheckViewport()

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["userNFTs", walletCurrentAddress],
    queryFn: async () => {
      const { result } = await scrollRequest(fetchUserNFTsURL, {
        method: "POST",
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "ankr_getNFTsByOwner",
          params: {
            walletAddress: "0xDfa0387f173904fbF36AD26B63279ac47624b55e",
            blockchain: "eth",
            // blockchain: "scroll",
            pageSize: 50,
            pageToken: "",
          },
        }),
      })
      const { assets } = result
      return assets
    },
    initialData: [],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: NFTsDialogVisible,
  })

  const handleReQuest = () => {
    refetch()
  }

  const handleApplyNFT = () => {}

  const handleClose = () => {
    changeNFTsDialogVisible(false)
  }

  const handlePickNFT = item => {
    changeNFT({
      contractType: item.contractType,
      contractAddress: item.contractAddress,
      tokenId: item.tokenId,
    })
    console.log(item.contractType, item.contractAddress, item.tokenId)
  }

  return (
    <Dialog title="Choose an NFT" open={!!NFTsDialogVisible} onClose={handleClose}>
      {isFetching && (
        <LoadingPage
          height="62.8rem"
          component={<Img src="/imgs/canvas/Scrolly_Coding_s.webp" alt="Coding Scrolly" width={isMobile ? "120" : "200"} />}
        ></LoadingPage>
      )}
      {!isFetching && !data.length && (
        <Stack justifyContent="center" sx={{ height: "62.8rem" }}>
          <NoData title="No NFTs"></NoData>
        </Stack>
      )}
      {error && (
        <Stack justifyContent="center" sx={{ height: "62.8rem" }}>
          <Error
            title="Oops! Something went wrong"
            action={
              <LoadingButton loading={isFetching} onClick={handleReQuest}>
                Try again
              </LoadingButton>
            }
          ></Error>
        </Stack>
      )}
      {!isFetching && !!data.length && (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 18rem)",
              gap: "1.6rem",
              mt: "2.4rem",
              mb: "3.6rem",
              height: "52rem",
              overflowY: "auto",
            }}
          >
            {data.map(item => (
              <NFT sx={{ cursor: "pointer" }} {...item} onClick={() => handlePickNFT(item)}></NFT>
            ))}
          </Box>
          <Button
            color="primary"
            variant="contained"
            sx={{ borderRadius: "0.8rem", width: "100%", fontSize: "2rem", padding: 0 }}
            onClick={handleApplyNFT}
          >
            Sign and Apply
          </Button>
        </>
      )}
    </Dialog>
  )
}

export default NFTsDialog
