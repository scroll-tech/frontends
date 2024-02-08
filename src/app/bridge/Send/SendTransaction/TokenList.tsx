import { isAddress } from "ethers"
import _ from "lodash"
import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"

import { Link, SvgIcon, Typography, styled } from "@mui/material"
import { Box, CircularProgress, DialogContent, InputBase, ListItemIcon, MenuItem } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import ListItemText from "@mui/material/ListItemText"

import CloseSvg from "@/assets/svgs/bridge/token-list-close.svg"
import SearchSvg from "@/assets/svgs/bridge/token-list-search.svg"
import { EXPLORER_URL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useAddToken, { TOKEN_LEVEL } from "@/hooks/useAddToken"
import useBridgeStore from "@/stores/bridgeStore"
import { generateExploreLink, truncateHash } from "@/utils"

const DialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    maxWidth: "47rem !important",
    borderRadius: "2rem",
    maxHeight: "100vh",
    position: "absolute",
    top: "10rem",
    [theme.breakpoints.down("sm")]: {
      top: "2rem",
      width: "calc(100% - 4rem)",
      height: "calc(100% - 4rem)",
    },
  },
}))

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  width: "100%",
  borderRadius: "1rem",
  border: `1px solid ${(theme as any).vars.palette.text.primary}`,
  fontFamily: "var(--developer-page-font-family)",
  height: "4.8rem",
  [theme.breakpoints.down("sm")]: {
    height: "4.8rem",
    fontSize: "1.5rem",
    marginRight: "0",
  },
}))

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  minHeight: "30rem",
  padding: "0 0 1.6rem",
}))

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  padding: "1rem 2.4rem",
  gap: "1rem",
  "&:hover": {
    background: "rgba(255, 248, 243, 0.50)",
  },
  "& *:hover": {
    cursor: "pointer !important",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1rem 2rem",
  },
}))

const ListTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: "1.7rem",
  fontWeight: 600,
  lineHeight: "3.5rem",
  letterSpacing: "0.17px",
  marginTop: "3rem",
  padding: "0 2.4rem",
  [theme.breakpoints.down("sm")]: {
    padding: "0 2rem",
  },
}))

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "unset !important",
}))

const ListSymbolStyled = styled(Typography)(({ theme }) => ({
  display: "inline",
  color: "#473835",
  fontFamily: "var(--developer-page-font-family)",
  fontSize: "1.7rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "2.5rem",
  letterSpacing: "0.17px",
  marginRight: "0.5rem",
}))
const ListNameStyled = styled(Typography)(({ theme }) => ({
  display: "inline",
  color: "#756A67",
  fontFamily: "var(--developer-page-font-family)",
  fontSize: "1.5rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.2rem",
  letterSpacing: "0.15px",
}))
const ListAddressStyled = styled(Link)(({ theme }) => ({
  color: "#756A67",
  fontFamily: "var(--developer-page-font-family)",
  fontSize: "1.5rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.2rem",
  letterSpacing: "0.15px",
  textDecorationLine: "underline",
  textDecorationColor: "unset",
}))

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  fontSize: "2.4rem",
  fontWeight: 600,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
  "& *": {
    cursor: "pointer",
  },
}))

const ErrorBoxStyled = styled(Box)(({ theme }) => ({
  color: "#FF684B",
  fontSize: "1.3rem",
  fontWeight: 500,
  margin: "1rem 2.4rem 0",
  background: "#FFE1DB",
  borderRadius: "1rem",
  textAlign: "center",
  lineHeight: "1.8rem",
  padding: "0.7rem 0",
  [theme.breakpoints.down("sm")]: {
    margin: "1rem 2rem 0",
  },
}))

const TokenListWrapper = styled(Box)(({ theme }) => ({
  maxHeight: "50rem",
  overflow: "auto",
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(209, 205, 204, 0.30)",
    borderRadius: "8px",
  },
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  // Firefox
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(209, 205, 204, 0.30) transparent",
}))

export interface TokenListProps {
  open: boolean
  selectedValue: any
  onClose: (value: string) => void
  tokens: any
  onChange: (e: any) => void
}

const MenuItemComponent = ({ token, isSelected, selectToken, txType }) => (
  <MenuItemStyled value={token} key={token.symbol} onClick={() => selectToken(token.symbol)}>
    <ListItemIconStyled>
      <Image width={42} height={42} style={{ borderRadius: "50%" }} src={token.logoURI} alt="Token Logo"></Image>
    </ListItemIconStyled>
    <ListItemTextStyled
      primary={
        <>
          <ListSymbolStyled>{token.symbol}</ListSymbolStyled>
          <ListNameStyled>{token.name}</ListNameStyled>
        </>
      }
      secondary={
        <>
          {token.address && (
            <ListAddressStyled
              href={generateExploreLink(EXPLORER_URL[txType === "Deposit" ? "L1" : "L2"], token.address, "token")}
              target="_blank"
              sx={{ display: "inline" }}
            >
              {truncateHash(token.address)}
            </ListAddressStyled>
          )}
        </>
      }
    >
      {token.symbol}
    </ListItemTextStyled>
    {isSelected && (
      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="15" viewBox="0 0 19 15" fill="none">
        <path d="M6.16553 10.6727L16.5324 0L18.2118 1.72885L6.16591 14.13L0 7.78295L1.67928 6.05413L6.16553 10.6727Z" fill="#473835" />
      </svg>
    )}
  </MenuItemStyled>
)

const TokenList = ({ tokens, selectToken, selectedValue, txType }) => (
  <>
    {tokens?.map(token => (
      <MenuItemComponent key={token.symbol} token={token} txType={txType} isSelected={_.isEqual(token, selectedValue)} selectToken={selectToken} />
    ))}
  </>
)

const OptimizedComponent = ({ listedbyUser, listedbyScroll, selectToken, selectedValue, txType }) => (
  <TokenListWrapper>
    {listedbyUser?.length > 0 && (
      <>
        <ListTitleStyled>Custom</ListTitleStyled>
        <TokenList tokens={listedbyUser} txType={txType} selectToken={selectToken} selectedValue={selectedValue} />
      </>
    )}
    {listedbyScroll?.length > 0 && (
      <>
        <ListTitleStyled>Listed by Scroll</ListTitleStyled>
        <TokenList tokens={listedbyScroll} txType={txType} selectToken={selectToken} selectedValue={selectedValue} />
      </>
    )}
  </TokenListWrapper>
)

function List(props: TokenListProps) {
  const { onClose, selectedValue, open, tokens, onChange } = props
  const [newToken, setNewToken] = useState("")
  const { addToken, loading } = useAddToken()
  const { txType } = useBridgeStore()
  const { chainId: currentChainId } = useRainbowContext()

  const handleClose = () => {
    onClose(selectedValue)
  }

  const selectToken = (token: string) => {
    onChange(token)
    handleClose()
  }

  const filteredTokens = useMemo(() => {
    const normalizedSearch = newToken.toLowerCase()
    return tokens.filter(token => {
      if (token.symbol && token.symbol.toLowerCase().includes(normalizedSearch)) return true
      if (token.name && token.name.toLowerCase().includes(normalizedSearch)) return true
      if (token.address && token.address.toLowerCase().includes(normalizedSearch)) return true
      return false
    })
  }, [tokens, newToken])

  useEffect(() => {
    if (isAddress(newToken) && currentChainId && !filteredTokens.find((token: any) => token.address === newToken)) {
      addToken(newToken, txType === "Deposit")
    }
  }, [newToken, filteredTokens])

  const listedbyScroll = useMemo(() => {
    return filteredTokens?.filter((token: any) => !token.tokenLevel)
  }, [filteredTokens])

  const listedbyUser = useMemo(() => {
    return filteredTokens?.filter((token: any) => token.tokenLevel === TOKEN_LEVEL.local)
  }, [filteredTokens])

  return (
    <DialogStyled fullWidth onClose={handleClose} open={open}>
      <DialogTitle sx={{ marginBottom: ["0.8rem", "2.8rem"], padding: ["1.6rem 2rem", "1.6rem 2.4rem"] }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ fontSize: "2.4rem", fontWeight: 600 }}>Select a token</Box>
          <SvgIcon
            sx={{ pointer: "cursor", fontSize: "1.8rem" }}
            onClick={() => {
              setNewToken("")
              handleClose()
            }}
            component={CloseSvg}
            inheritViewBox
          ></SvgIcon>
        </Box>
      </DialogTitle>
      <DialogContentStyled>
        <Box sx={{ display: "flex", alignItems: "center", padding: ["0 2rem", "0 2.4rem"] }}>
          <InputBaseStyled
            startAdornment={<SvgIcon sx={{ m: "0 1rem 0 1.4rem", fontSize: "1.5rem" }} component={SearchSvg} inheritViewBox></SvgIcon>}
            value={newToken}
            onChange={v => setNewToken(v.target.value)}
            placeholder="Search by token name, symbol or address"
          ></InputBaseStyled>
        </Box>
        {filteredTokens.length === 0 && !loading ? (
          <ErrorBoxStyled>
            No results found. <br />
            Please enter a valid token name or address.
          </ErrorBoxStyled>
        ) : null}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "4rem auto" }}>
            <CircularProgress sx={{ color: "#0F8E7E" }} size={24} thickness={4}></CircularProgress>
          </Box>
        ) : (
          <OptimizedComponent
            txType={txType}
            listedbyUser={listedbyUser}
            listedbyScroll={listedbyScroll}
            selectToken={selectToken}
            selectedValue={selectedValue}
          />
        )}
      </DialogContentStyled>
    </DialogStyled>
  )
}

export default List
