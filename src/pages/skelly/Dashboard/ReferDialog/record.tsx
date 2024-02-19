import { useEffect, useState } from "react"

import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

const RecordBox = styled(Box)(({ theme }) => ({
  borderRadius: "0.8rem",
  background: "#3B3B3B",
  padding: "0.8rem 2.4rem",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "40rem",
  width: "100%",
  margin: "0 auto 8.5rem",
  gap: "4rem",
}))

const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const Description = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: "1.6rem",
  fontWeight: 500,
  lineHeight: "2.4rem",
  marginRight: "1.6rem",
}))

const Value = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  fontSize: "4.8rem",
  fontWeight: 600,
  lineHeight: "6.4rem",
}))

const Record = () => {
  return (
    <RecordBox>
      <Item>
        <Description variant="body1" color="#FFFFFF">
          Friends <br />
          Referred
        </Description>
        <Value variant="body1" color="#FFFFFF">
          10
        </Value>
      </Item>
      <Item>
        <Description variant="body1" color="#FFFFFF">
          ETH
          <br />
          Earned
        </Description>
        <Value variant="body1" color="#FFFFFF">
          0.005
        </Value>
      </Item>
    </RecordBox>
  )
}

export default Record
