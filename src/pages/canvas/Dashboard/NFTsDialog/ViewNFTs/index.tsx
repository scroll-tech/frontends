import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import Img from "react-cool-img"
import { useInView } from "react-intersection-observer"
import { useWalletClient } from "wagmi"

import { Box, Skeleton, Stack, Typography } from "@mui/material"

import { fetchUserNFTsURL, setCanvasAvatarURL } from "@/apis/canvas-profile"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSnackbar from "@/hooks/useSnackbar"
import PerksButton from "@/pages/canvas/components/PerksButton"
import useCanvasProfileStore, { NFTsDialogTypeEnum } from "@/stores/canvasProfileStore"
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

interface NFTAvatar {
  contractType: string
  contractAddress: string
  tokenId: string
  imageUrl: string
}

const ViewNFTs = () => {
  const { walletCurrentAddress } = useRainbowContext()
  const { data: client } = useWalletClient()

  const { NFTsDialogType, changeNFTsDialogType } = useCanvasProfileStore()
  const { ref, inView } = useInView()
  const { isMobile } = useCheckViewport()

  const alertWarning = useSnackbar()

  const [page, setPage] = useState(1)
  const [dots, setDots] = useState("")

  const pageSize = useRef(8)

  const [selectedNFT, setSelectedNFT] = useState<NFTAvatar | Partial<NFTAvatar>>({})

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
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage?.nextPage || undefined,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: NFTsDialogType === NFTsDialogTypeEnum.SET_UP,
    gcTime: 2e3,
  })

  const { mutateAsync: setNFTAvatarMutation, isPending } = useMutation({
    mutationFn: async ({ walletAddress, contractAddress, contractType, tokenId }: NFTMutationVariables) => {
      const timestamp = Date.now().toString()
      const signature = await client?.signTypedData(generateTypedData(walletAddress, undefined, contractAddress, tokenId, timestamp) as any)
      const formData = new FormData()
      formData.append("nftContract", contractAddress)
      formData.append("nftContractType", contractType)
      formData.append("signature", signature || "")
      formData.append("tokenID", tokenId)
      formData.append("timestamp", timestamp)

      return await scrollRequest(setCanvasAvatarURL(walletAddress), {
        method: "POST",
        body: formData,
      })
    },
    onSuccess: data => {
      handleCloseNFTsDialog()
      queryClient.setQueryData(["canvasAvatar", walletCurrentAddress], {
        tokenID: selectedNFT.tokenId,
        contract: selectedNFT.contractAddress,
        contractType: selectedNFT.contractType,
      })
      queryClient.setQueryData(["NFTAvatarImageURL", walletCurrentAddress], { image: selectedNFT.imageUrl })
      // queryClient.invalidateQueries({
      //   queryKey: ["canvasAvatar", walletCurrentAddress],
      // })
    },
    onError: error => {
      if (error.name !== "UserRejectedRequestError") {
        alertWarning("Something went wrong, please try again later.")
      }
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
    const { contractType, contractAddress, tokenId } = selectedNFT as NFTAvatar
    setNFTAvatarMutation({
      walletAddress: walletCurrentAddress,
      contractType,
      contractAddress,
      tokenId,
    })
  }

  const handleCloseNFTsDialog = () => {
    changeNFTsDialogType(NFTsDialogTypeEnum.HIDDEN)
    setPage(1)
    setSelectedNFT({})
    queryClient.removeQueries({ queryKey: ["userNFTs", walletCurrentAddress], exact: true })
  }

  const handlePickNFT = item => {
    if (isSelectedNFT(item)) {
      setSelectedNFT({})
      return
    }
    setSelectedNFT({
      contractType: item.contractType,
      contractAddress: item.contractAddress,
      tokenId: item.tokenId,
      imageUrl: item.imageUrl,
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
    <>
      <Typography
        sx={{ fontSize: ["2rem", "3.2rem"], lineHeight: ["3.2rem", "4.8rem"], fontWeight: 600, textAlign: "center", color: "primary.contrastText" }}
      >
        Choose an NFT
      </Typography>
      {isLoading && (
        <LoadingPage
          sx={{ flex: 1 }}
          component={<Img src="/imgs/canvas/Scrolly_Coding_s.webp" alt="Coding Scrolly" width={isMobile ? "120" : "200"} />}
        ></LoadingPage>
      )}
      {!isFetching && data?.pages.every(page => !page.assets.length) && (
        <Stack justifyContent="center" sx={{ flex: 1 }}>
          <NoData title="No NFTs"></NoData>
        </Stack>
      )}
      {error && !data?.pages.length && (
        <Stack justifyContent="center" sx={{ flex: 1 }}>
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
              gridTemplateColumns: ["1fr", "repeat(3, 18rem)"],
              gap: "1.6rem",
              mt: "2.4rem",
              mb: ["2.4rem", "3.6rem"],
              width: ["calc(100% + 4rem)", "calc(100% + 6.4rem)"],
              px: ["2rem", "3.2rem"],
              flex: 1,
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
                      pointerEvents: isPending ? "none" : "all",
                    }}
                    active={isSelectedNFT(item)}
                    {...item}
                    onClick={() => handlePickNFT(item)}
                  ></NFTCard>
                ))}
              </>
            ))}
            {(hasNextPage || isFetchingNextPage) && (
              <Stack ref={ref} alignItems="center" gap="1.6rem" sx={{ flexDirection: ["row", "column"], width: "100%" }}>
                <Skeleton
                  variant="rounded"
                  sx={{ width: ["8rem", "100%"], height: "auto", aspectRatio: "1 / 1", backgroundColor: "#383838", borderRadius: "0.8rem" }}
                ></Skeleton>
                <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], fontWeight: 600, color: "primary.contrastText" }}>loading{dots}</Typography>
              </Stack>
            )}
          </Box>
          <PerksButton loading={isPending} disabled={!selectedNFT.contractAddress} onClick={handleApplyNFT}>
            Sign and Apply
          </PerksButton>
        </>
      )}
    </>
  )
}

export default ViewNFTs
