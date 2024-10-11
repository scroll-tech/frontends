import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import "react-advanced-cropper/dist/style.css"
import Img from "react-cool-img"
import { useInView } from "react-intersection-observer"
import { useWalletClient } from "wagmi"

import { Box, Skeleton, Typography } from "@mui/material"
import { Stack } from "@mui/system"

import { fetchUserNFTsURL, setCanvasAvatarURL } from "@/apis/canvas"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
import Dialog from "@/pages/canvas/components/Dialog"
import useCanvasProfileStore from "@/stores/canvasProfileStore"
import { generateTypedData } from "@/utils"

import Error from "./Error"
import NFTCard from "./NFTCard"
import NoData from "./NoData"

interface NFTMutationVariables {
  walletAddress: `0x${string}` | undefined
  contractAddress: string
  contractType: string
  tokenId: string
}

const NFTsDialog = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { data: client } = useWalletClient()

  const { NFTsDialogVisible, changeNFTsDialogVisible } = useCanvasProfileStore()
  const { ref, inView } = useInView()
  const { isMobile } = useCheckViewport()

  const alertWarning = useSnackbar()

  const [page, setPage] = useState(1)
  const [dots, setDots] = useState("")

  const pageSize = useRef(8)

  const [selectedNFT, setSelectedNFT] = useState<{ contractType: string; contractAddress: string; tokenId: string }>({
    contractType: "",
    contractAddress: "",
    tokenId: "",
  })

  const queryClient = useQueryClient()
  const { data, isLoading, isFetching, isFetchingNextPage, error, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["userNFTs", walletCurrentAddress],
    queryFn: async ({ pageParam = 1 }): Promise<{ assets: any[]; nextPage: number }> => {
      const { total, assets } = await scrollRequest(fetchUserNFTsURL("0x25dbB9439BE70C2A4E047e5dB42177946957a1aD", pageParam, pageSize.current))
      let nextPage = 0
      if (total > pageSize.current * page) {
        setPage(page + 1)
        nextPage = page + 1
      }
      return { assets, nextPage }
    },
    // initialData: { pages: [{ assets: [], nextPageToken: "" }], pageParams: [undefined] },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage?.nextPage || undefined,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: NFTsDialogVisible,
  })

  const { mutateAsync: setNFTAvatarMutation, isPending } = useMutation({
    mutationFn: async ({ walletAddress, contractAddress, contractType, tokenId }: NFTMutationVariables) => {
      const signature = await client?.signTypedData(generateTypedData(walletAddress, "", contractAddress, tokenId) as any)
      const formData = new FormData()
      formData.append("nftContract", contractAddress)
      formData.append("nftContractType", contractType)
      formData.append("signature", signature || "")
      formData.append("tokenID", tokenId)
      return await scrollRequest(setCanvasAvatarURL(walletAddress), {
        method: "POST",
        body: formData,
      })
    },
    onSuccess: data => {
      handleCloseNFTsDialog()
      queryClient.invalidateQueries({
        queryKey: ["canvasAvatar"],
      })
    },
    onError: error => {
      alertWarning("Something went wrong, please try again later.")
    },
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => (prevDots.length < 3 ? prevDots + "." : ""))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleReQuest = () => {
    refetch()
  }

  const handleApplyNFT = () => {
    const { contractType, contractAddress, tokenId } = selectedNFT
    setNFTAvatarMutation({
      walletAddress: walletCurrentAddress,
      contractType,
      contractAddress,
      tokenId,
    })
  }

  const handleCloseNFTsDialog = () => {
    changeNFTsDialogVisible(false)
    setPage(1)
    setSelectedNFT({
      contractType: "",
      contractAddress: "",
      tokenId: "",
    })
    queryClient.removeQueries({ queryKey: ["userNFTs", walletCurrentAddress], exact: true })
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
  }

  const isSelectedNFT = item => {
    const { contractType, contractAddress, tokenId } = selectedNFT
    if (contractType === item.contractType && contractAddress === item.contractAddress && tokenId === item.tokenId) {
      return true
    }
    return false
  }

  return (
    <Dialog title="Choose an NFT" open={!!NFTsDialogVisible} onClose={handleCloseNFTsDialog}>
      {isLoading && (
        <LoadingPage
          height="62.8rem"
          component={<Img src="/imgs/canvas/Scrolly_Coding_s.webp" alt="Coding Scrolly" width={isMobile ? "120" : "200"} />}
        ></LoadingPage>
      )}
      {!isFetching && data?.pages.every(page => !page.assets.length) && (
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
      {data?.pages.some(page => page.assets.length) && (
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
              <Stack ref={ref} direction="column" alignItems="center" gap="1.6rem" sx={{ width: "100%" }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: "100%", height: "auto", aspectRatio: "1 / 1", backgroundColor: "#383838", borderRadius: "0.8rem" }}
                ></Skeleton>
                <Typography sx={{ fontSize: "1.8rem", fontWeight: 600, color: "primary.contrastText" }}>loading{dots}</Typography>
              </Stack>
            )}
          </Box>
          <LoadingButton
            loading={isPending}
            disabled={!selectedNFT.contractAddress}
            sx={{ borderRadius: "1rem", width: "100%", height: "5.6rem", fontSize: "2rem" }}
            onClick={handleApplyNFT}
          >
            Sign and Apply
          </LoadingButton>
        </>
      )}
    </Dialog>
  )
}

export default NFTsDialog
