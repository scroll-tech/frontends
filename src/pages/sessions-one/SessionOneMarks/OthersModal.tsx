import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  alpha,
} from "@mui/material"

import { ReactComponent as CloseSvg } from "@/assets/svgs/bridge/close.svg"

import { PROJECT_MAP } from "./projectList"

// TODO: common modal
const OthersModal = props => {
  const { data, children, onClose, ...restProps } = props

  return (
    <Dialog
      maxWidth={false}
      sx={[
        {
          "& .MuiBackdrop-root": {
            backgroundColor: theme => alpha(theme.palette.themeBackground.light, 0.8),
          },
          "& .MuiDialog-paper": {
            // backgroundColor: theme => theme.palette.themeBackground.dark,
            width: "58rem",
            maxWidth: "100%",
            padding: "2.4rem",
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
          textAlign: "center",
        }}
      >
        <span>Others</span>
        <IconButton
          sx={{ position: "absolute", right: "-0.8rem", top: ["-0.1rem", "-0.8rem"], "&:hover": { backgroundColor: "unset" } }}
          onClick={onClose}
        >
          <SvgIcon sx={{ fontSize: "1.8rem" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, minHeight: "50rem" }}>
        <List sx={{ pt: "2.4rem", pb: 0 }}>
          {data?.map(item => (
            <ListItem
              key={item.project}
              sx={{
                height: "5.6rem",
                p: 0,
                gap: ["0.8rem", "1.6rem"],
                "&:nth-of-type(n + 2)": {
                  mt: "2.4rem",
                },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 0 }}>
                <Avatar sx={{ width: "4.8rem", height: "4.8rem", borderRadius: "0.7rem" }} alt={item.project} src={PROJECT_MAP[item.project].logo} />
              </ListItemAvatar>
              <ListItemText primaryTypographyProps={{ fontSize: ["1.6rem", "2rem"], fontWeight: 600 }}>{PROJECT_MAP[item.project].name}</ListItemText>
              <Button
                href={PROJECT_MAP[item.project].website}
                sx={{
                  borderRadius: "0.8rem",
                  width: ["14rem", "18rem"],
                  height: "4.8rem",
                  fontSize: ["1.6rem", "1.8rem"],
                  px: ["1rem", "2.4rem"],
                  fontWeight: 600,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                target="_blank"
              >
                Go to {PROJECT_MAP[item.project].name}
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default OthersModal
