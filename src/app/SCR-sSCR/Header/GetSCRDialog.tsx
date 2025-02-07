"use client"

import { Fragment } from "react"

import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, SvgIcon, Typography, alpha } from "@mui/material"

import CloseSvg from "@/assets/svgs/bridge/close.svg"

import GetSCRItem from "./GetSCRItem"
import { GER_SCR_DATA } from "./data"

// TODO: common modal
const GetSCRDialog = props => {
  const { data, onClose, ...restProps } = props

  return (
    <Dialog
      maxWidth={false}
      sx={[
        {
          "& .MuiBackdrop-root": {
            backgroundColor: alpha("#101010", 0.8),
          },
          "& .MuiDialog-paper": {
            width: "54.4rem",
            maxWidth: "100%",
            padding: "4rem 3.2rem",
            borderRadius: "2rem",
          },
        },
        theme => ({
          [theme.breakpoints.down("sm")]: {
            "& .MuiDialog-paper": {
              margin: 0,
              borderRadius: 0,
              height: "calc(var(--vh, 1vh) * 100)",
              maxHeight: "unset",
              minWidth: "unset",
              width: "100%",
              padding: "1.6rem 2rem 2rem",
            },
          },
        }),
      ]}
      {...restProps}
      onClose={onClose}
    >
      <DialogTitle
        sx={{
          position: "relative",
          height: ["3.2rem", "3.6rem"],
          fontSize: ["2rem", "2.4rem"],
          lineHeight: "3.6rem",
          fontWeight: 600,
          p: 0,
          mb: ["0.8rem", "2.4rem"],
          textAlign: "center",
        }}
      >
        <span>Get SCR</span>
        <IconButton
          sx={{ position: "absolute", right: "-0.8rem", top: ["-0.1rem", "-1.6rem"], "&:hover": { backgroundColor: "unset" } }}
          onClick={onClose}
        >
          <SvgIcon sx={{ fontSize: "1.8rem" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: 0,
          minHeight: "50rem",
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(209, 205, 204, 0.6)",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          // Firefox
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(209, 205, 204, 0.6) transparent",
        }}
      >
        <Typography sx={{ fontSize: ["1.4rem", "1.6rem"], lineHeight: ["2rem", "2.4rem"], mb: "2.4rem" }}>
          Please verify the validity of these links and ensure you conduct your own research on SCR and the risks that may be involved. Under no
          circumstances will we be responsible for any losses you may incur.
        </Typography>
        {GER_SCR_DATA.map(({ title, data }, index) => (
          <Fragment key={title}>
            {!!index && <Divider sx={{ my: ["2.4rem", "3.2rem"], borderColor: "#E9E9E9" }}></Divider>}
            <Box key={title}>
              <Typography sx={{ fontSize: ["1.6rem", "1.8rem"], lineHeight: "2.4rem", fontWeight: 600 }}>{title}</Typography>
              <Box>
                {data.map(item => (
                  <GetSCRItem key={item.name} {...item}></GetSCRItem>
                ))}
              </Box>
            </Box>
          </Fragment>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default GetSCRDialog
