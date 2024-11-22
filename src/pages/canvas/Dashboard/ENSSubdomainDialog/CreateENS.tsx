import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useWalletClient } from "wagmi"

import { Box, InputBase, Stack, Typography } from "@mui/material"

import { claimENSNameURL } from "@/apis/canvas-profile"
import ScrollLoadingButton from "@/components/LoadingButton"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import useValidateENSSubdomain from "@/hooks/useValidateENSSubdomain"
import useCanvasProfileStore, { EnsSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"
import { generateENSSubdomainTypedData } from "@/utils"

interface MutationVariables {
  walletAddress: `0x${string}` | undefined
  name: string
}

const CreateENS = () => {
  const { data: client } = useWalletClient()

  const { walletCurrentAddress } = useRainbowContext()
  const { changeEnsSubdomainDialogType } = useCanvasProfileStore()

  const queryClient = useQueryClient()

  const alertWarning = useSnackbar()

  const ensSubdomain = queryClient.getQueryData(["ensSubdomain", walletCurrentAddress])

  const [defaultSubdomainName] = ((ensSubdomain as string) ?? "").split(".")

  const [subdomainName, setSubdomainName] = useState<string>(defaultSubdomainName || "")

  const { helpText, validating, renderValidation } = useValidateENSSubdomain(subdomainName)

  const { mutateAsync: claimENSSubdomain, isPending } = useMutation({
    mutationFn: async ({ walletAddress, name }: MutationVariables) => {
      const timestamp = Date.now().toString()

      const signature = await client?.signTypedData(generateENSSubdomainTypedData(walletAddress, name, timestamp) as any)

      return scrollRequest(claimENSNameURL(walletAddress), {
        method: "POST",
        body: JSON.stringify({
          signature,
          name,
          timestamp,
        }),
      })
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ["ensSubdomain"],
      })
      changeEnsSubdomainDialogType(EnsSubdomainDialogTypeEnum.SUCCESS)
    },
    onError: error => {
      if (error.name !== "UserRejectedRequestError") {
        alertWarning("Something went wrong, please try again later.")
      }
    },
  })

  const handleChangeSubdomainName = e => {
    setSubdomainName(e.target.value.trim())
  }

  const handleClaimENSSubdomain = () => {
    claimENSSubdomain({ walletAddress: walletCurrentAddress, name: subdomainName as string })
  }

  return (
    <>
      <Typography
        sx={{
          fontSize: ["3.2rem"],
          lineHeight: ["4.8rem"],
          fontWeight: 600,
          color: "primary.contrastText",
          mb: ["0.8rem"],
        }}
      >
        Create your subdomain name
      </Typography>
      <Typography sx={{ fontSize: ["1.8rem"], lineHeight: ["2.8rem"], color: "primary.contrastText" }}>
        Your Canvas username will be replaced by your subdomain, which you can change for free anytime.
      </Typography>
      <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
        <Box sx={{ position: "relative", pb: "5.2rem" }}>
          <InputBase
            value={subdomainName}
            placeholder="name"
            inputProps={{
              maxLength: 15,
              minLength: 4,
            }}
            sx={{
              fontSize: "4.8rem",
              lineHeight: "5.6rem",
              fontWeight: 600,
              color: "primary.contrastText",
              ".MuiInputBase-input": {
                // textAlign: "right",
                // minWidth: "4em",
              },
            }}
            endAdornment=".scroll.eth"
            onChange={handleChangeSubdomainName}
          ></InputBase>
          <Stack
            direction="row"
            gap="0.5rem"
            alignItems="center"
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {renderValidation()}
          </Stack>
        </Box>
      </Stack>
      <ScrollLoadingButton
        sx={{ borderRadius: "1rem", width: "100%", height: "5.6rem", fontSize: "2rem", mt: "2.8rem" }}
        loading={isPending}
        disabled={validating || !!helpText || !subdomainName}
        onClick={handleClaimENSSubdomain}
      >
        Confirm
      </ScrollLoadingButton>
    </>
  )
}

export default CreateENS
