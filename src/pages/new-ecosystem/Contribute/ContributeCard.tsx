import { makeStyles } from "tss-react/mui"

import { Box, Card, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ExternaLinkIcon } from "@/assets/svgs/common/external-link.svg"
import Link from "@/components/Link"

const useStyles = makeStyles()(theme => ({
  card: {
    backgroundColor: theme.palette.themeBackground.normal,
    height: "100%",
    padding: "2.4rem",
    borderRadius: "2.5rem",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.themeBackground.highlight,
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "6.2rem",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
    },
  },
}))

const ContributeCard = props => {
  const { title, content, icon, href, ...restProps } = props

  const { classes } = useStyles()

  return (
    <Link href={href} external>
      <Card {...restProps} elevation={0} classes={{ root: classes.card }}>
        <Stack direction="column">
          <Box className={classes.header}>
            <SvgIcon
              sx={{ fontSize: ["1.6rem", "2rem"], alignSelf: ["flex-start", "flex-end"] }}
              component={ExternaLinkIcon}
              inheritViewBox
            ></SvgIcon>
            <SvgIcon sx={{ fontSize: ["3rem", "3.2rem"] }} component={icon} inheritViewBox></SvgIcon>
          </Box>

          <Typography
            sx={{
              fontSize: ["2rem", "2.4rem"],
              fontWeight: 600,
              lineHeight: [1.6, "normal"],
              mt: ["0.4rem", "1.6rem"],
              mb: ["0.4rem", "0.8rem"],
              cursor: "inherit",
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: ["1.6rem", "2rem"], lineHeight: [1.5, "normal"], cursor: "inherit" }}>{content}</Typography>
        </Stack>
      </Card>
    </Link>
  )
}

export default ContributeCard
