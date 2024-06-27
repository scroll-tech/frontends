import { isAddress } from "ethers"
import _ from "lodash"
import React, { useEffect, useMemo, useState } from "react"

import { Link, Typography, styled } from "@mui/material"
import { Box, CircularProgress, DialogContent, InputBase, ListItemIcon, MenuItem } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import ListItemText from "@mui/material/ListItemText"

import { EXPLORER_URL } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useAddToken, { TOKEN_LEVEL } from "@/hooks/useAddToken"
import { tokenList } from "@/pages/sessions-one/SessionZeroMarks/tokenList"
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
  border: `1px solid ${theme.palette.text.primary}`,
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
const EarnMarksLabel = styled(Typography)(() => ({
  display: "inline",
  color: "#0F8E7E",
  textAlign: "center",
  fontFamily: "var(--developer-page-font-family)",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "16px",
  letterSpacing: "0.12px",
  marginLeft: "4px",
  padding: "4px 8px",
  borderRadius: "12px",
  background: "#DFFCF8",
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
      <Avatar sx={{ width: "4.2rem", height: "4.2rem" }} src={token.logoURI}></Avatar>
    </ListItemIconStyled>
    <ListItemTextStyled
      primary={
        <>
          <ListSymbolStyled>{token.symbol}</ListSymbolStyled>
          <ListNameStyled>{token.name}</ListNameStyled>
          {token.earnMarks && <EarnMarksLabel>Earn marks</EarnMarksLabel>}
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
    return filteredTokens
      ?.filter((token: any) => !token.tokenLevel)
      .map((token: any) => {
        return {
          ...token,
          earnMarks: tokenList.some(t => t.symbol === token.symbol || t.additionalToken === token.symbol),
        }
      })
  }, [filteredTokens])

  const listedbyUser = useMemo(() => {
    return filteredTokens?.filter((token: any) => token.tokenLevel === TOKEN_LEVEL.local)
  }, [filteredTokens])

  return (
    <DialogStyled fullWidth onClose={handleClose} open={open}>
      <DialogTitle sx={{ marginBottom: ["0.8rem", "2.8rem"], padding: ["1.6rem 2rem", "1.6rem 2.4rem"] }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ fontSize: "2.4rem", fontWeight: 600 }}>Select a token</Box>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              setNewToken("")
              handleClose()
            }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{ cursor: "pointer" }}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.5307 1.56775C17.8853 1.20911 17.8853 0.627628 17.5307 0.268984C17.1761 -0.0896612 16.6012 -0.0896612 16.2466 0.268984L8.89835 7.70119L1.55012 0.268984C1.19553 -0.0896611 0.62062 -0.0896611 0.266027 0.268984C-0.0885651 0.627628 -0.0885651 1.20911 0.266027 1.56775L7.61425 8.99996L0.265944 16.4323C-0.0886481 16.7909 -0.0886481 17.3724 0.265944 17.731C0.620536 18.0897 1.19544 18.0897 1.55004 17.731L17.5307 1.56775ZM11.8709 10.7078C11.5164 10.3491 10.9414 10.3491 10.5869 10.7078C10.2323 11.0664 10.2323 11.6479 10.5869 12.0065L16.2467 17.731C16.6012 18.0897 17.1762 18.0897 17.5307 17.731C17.8853 17.3724 17.8853 16.7909 17.5307 16.4322L11.8709 10.7078Z"
              fill="#101010"
            />
          </svg>
        </Box>
      </DialogTitle>
      <DialogContentStyled>
        <Box sx={{ display: "flex", alignItems: "center", padding: ["0 2rem", "0 2.4rem"] }}>
          <InputBaseStyled
            startAdornment={
              <svg style={{ margin: "0 1rem 0 1.4rem" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 6.66199C0 2.98506 2.97711 0 6.65591 0C10.3338 0 13.3179 2.98413 13.3179 6.66199C13.3179 8.24418 12.7664 9.70161 11.8426 10.8447L15.7948 14.8024C16.0687 15.0766 16.0684 15.5209 15.7941 15.7948C15.5199 16.0687 15.0756 16.0684 14.8017 15.7941L10.3802 11.3665C10.1064 11.0924 10.1066 10.6483 10.3805 10.3744C11.3299 9.42503 11.9144 8.11169 11.9144 6.66199C11.9144 3.75926 9.55863 1.40351 6.65591 1.40351C3.75412 1.40351 1.40351 3.75833 1.40351 6.66199C1.40351 9.56471 3.75926 11.9205 6.66199 11.9205C7.0142 11.9205 7.36472 11.8831 7.70244 11.8177C8.08295 11.7441 8.45111 11.9928 8.52476 12.3733C8.5984 12.7538 8.34964 13.122 7.96914 13.1956C7.55271 13.2762 7.11259 13.324 6.66199 13.324C2.98413 13.324 0 10.3398 0 6.66199Z"
                  fill="#473835"
                />
              </svg>
            }
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
