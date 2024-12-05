import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useWalletClient } from "wagmi"

import { Box, InputBase, Stack, Typography } from "@mui/material"

import { claimENSNameURL } from "@/apis/canvas-profile"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useSnackbar from "@/hooks/useSnackbar"
import useValidateENSSubdomain from "@/hooks/useValidateENSSubdomain"
import PerksButton from "@/pages/canvas/components/PerksButton"
import useCanvasProfileStore, { ENSSubdomainDialogTypeEnum } from "@/stores/canvasProfileStore"
import { generateENSSubdomainTypedData } from "@/utils"

interface MutationVariables {
  walletAddress: `0x${string}` | undefined
  name: string
}

const EDIT_SUBDOMAIN_COPY = {
  [ENSSubdomainDialogTypeEnum.CREATE_SUBDOMAIN]: {
    title: "Create your subdomain name",
    description: "Your Canvas username will be replaced by your subdomain, which you can change for free anytime.",
    actionText: "Create for free",
  },
  [ENSSubdomainDialogTypeEnum.UPDATE_SUBDOMAIN]: {
    title: "Change your subdomain name",
    description: "You can change for free anytime.",
    actionText: "Change for free",
  },
}

const CreateENS = () => {
  const { data: client } = useWalletClient()

  const { walletCurrentAddress } = useRainbowContext()
  const { changeENSSubdomainDialogType, ENSSubdomainDialogType } = useCanvasProfileStore()

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
    onSuccess: async data => {
      await queryClient.invalidateQueries({
        queryKey: ["ensSubdomain", walletCurrentAddress],
      })
      if (ENSSubdomainDialogType === ENSSubdomainDialogTypeEnum.CREATE_SUBDOMAIN) {
        changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.SUCCESS)
      } else {
        alertWarning(`Your subdomain has been successfully updated to ${subdomainName}.scroll.eth`, "success")
        changeENSSubdomainDialogType(ENSSubdomainDialogTypeEnum.HIDDEN)
      }
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
          fontSize: ["2rem", "2.4rem"],
          lineHeight: ["3.2rem", "4.8rem"],
          fontWeight: 600,
          color: "primary.contrastText",
          mb: ["0.8rem"],
        }}
      >
        {EDIT_SUBDOMAIN_COPY[ENSSubdomainDialogType].title}
      </Typography>
      <Typography sx={{ fontSize: ["1.8rem"], lineHeight: ["2.8rem"], color: "primary.contrastText" }}>
        {EDIT_SUBDOMAIN_COPY[ENSSubdomainDialogType].description}
      </Typography>
      <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
        <Box sx={{ position: "relative", pb: ["4rem", "5.2rem"] }}>
          <InputBase
            value={subdomainName}
            inputRef={input => input?.focus()}
            readOnly={isPending}
            placeholder="name"
            inputProps={{
              maxLength: 15,
              minLength: 4,
            }}
            sx={{
              fontSize: ["2.4rem", "4.8rem"],
              lineHeight: ["4rem", "5.6rem"],
              fontWeight: 600,
              color: "primary.contrastText",
              ".MuiInputBase-input": {
                textAlign: "center",
              },
            }}
            onChange={handleChangeSubdomainName}
          ></InputBase>
          <Typography sx={{ fontSize: ["2.4rem", "4.8rem"], lineHeight: ["4rem", "5.6rem"], fontWeight: 600, color: "primary.contrastText" }}>
            .scroll.eth
          </Typography>
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
      <PerksButton sx={{ mt: "6.8rem" }} loading={isPending} disabled={validating || !!helpText || !subdomainName} onClick={handleClaimENSSubdomain}>
        {EDIT_SUBDOMAIN_COPY[ENSSubdomainDialogType].actionText}
      </PerksButton>
    </>
  )
}

export default CreateENS
