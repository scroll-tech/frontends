import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import "react-advanced-cropper/dist/style.css"
import Img from "react-cool-img"
import { useInView } from "react-intersection-observer"

import { Box, CircularProgress, Typography } from "@mui/material"
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
import NFTCard from "./NFTCard"
import NoData from "./NoData"

const NFTsDialog = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { NFTsDialogVisible, changeNFTsDialogVisible } = useCanvasProfileStore()
  const { ref, inView } = useInView()
  const { isMobile } = useCheckViewport()

  const [selectedNFT, setSelectedNFT] = useState<{ contractType: string; contractAddress: string; tokenId: string }>({
    contractType: "",
    contractAddress: "",
    tokenId: "",
  })

  const queryClient = useQueryClient()
  const { data, isLoading, isFetching, isFetchingNextPage, error, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["userNFTs", walletCurrentAddress],
    queryFn: async ({ pageParam = "" }): Promise<{ assets: any[]; nextPageToken: string }> => {
      const { result } = await scrollRequest(fetchUserNFTsURL, {
        method: "POST",
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "ankr_getNFTsByOwner",
          params: {
            walletAddress: "0x25dbB9439BE70C2A4E047e5dB42177946957a1aD",
            // blockchain: "eth",
            blockchain: "scroll",
            pageSize: 8,
            pageToken: pageParam,
          },
        }),
      })
      const { assets, nextPageToken } = result
      return { assets, nextPageToken }
    },
    // initialData: { pages: [{ assets: [], nextPageToken: "" }], pageParams: [undefined] },
    initialPageParam: "",
    getNextPageParam: page => page?.nextPageToken || undefined,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: NFTsDialogVisible,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const handleReQuest = () => {
    refetch()
  }

  const handleApplyNFT = () => {}

  const handleClose = () => {
    queryClient.removeQueries({ queryKey: ["userNFTs", walletCurrentAddress], exact: true })
    changeNFTsDialogVisible(false)
  }

  const handlePickNFT = item => {
    if (isSelectedNFT(item)) {
      setSelectedNFT({
        contractType: "",
        contractAddress: "",
        tokenId: "",
      })
      return
    }
    setSelectedNFT({
      contractType: item.contractType,
      contractAddress: item.contractAddress,
      tokenId: item.tokenId,
    })
    console.log(item.contractType, item.contractAddress, item.tokenId)
  }

  const isSelectedNFT = item => {
    const { contractType, contractAddress, tokenId } = selectedNFT
    if (contractType === item.contractType && contractAddress === item.contractAddress && tokenId === item.tokenId) {
      return true
    }
    return false
  }

  return (
    <Dialog title="Choose an NFT" open={!!NFTsDialogVisible} onClose={handleClose}>
      {isLoading && (
        <LoadingPage
          height="62.8rem"
          component={<Img src="/imgs/canvas/Scrolly_Coding_s.webp" alt="Coding Scrolly" width={isMobile ? "120" : "200"} />}
        ></LoadingPage>
      )}
      {!isFetching && !data?.pages.length && (
        <Stack justifyContent="center" sx={{ height: "62.8rem" }}>
          <NoData title="No NFTs"></NoData>
        </Stack>
      )}
      {error && !data?.pages.length && (
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
      {!!data?.pages.length && (
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
            {data.pages.map(page => (
              <>
                {(page as any)?.assets.map(item => (
                  <NFTCard
                    sx={{
                      cursor: "pointer",
                      filter: isSelectedNFT(item) || !selectedNFT.contractAddress ? "opacity(1)" : "opacity(0.5)",
                    }}
                    active={isSelectedNFT(item)}
                    {...item}
                    onClick={() => handlePickNFT(item)}
                  ></NFTCard>
                ))}
              </>
            ))}
            {(hasNextPage || isFetchingNextPage) && (
              <Stack
                ref={ref}
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap="1.2rem"
                sx={{ width: "100%", aspectRatio: "1 / 1" }}
              >
                <CircularProgress size={24} sx={{ color: "primary.contrastText" }} />
                <Typography sx={{ fontSize: "1.8rem", fontWeight: 600, color: "primary.contrastText" }}>Loading...</Typography>
              </Stack>
            )}
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
