import { makeStyles } from "tss-react/mui"

import { Card, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as ExternaLinkIcon } from "@/assets/svgs/refactor/external-link.svg"
import Link from "@/components/Link"

const useStyles = makeStyles()(theme => ({
  card: {
    backgroundColor: "#FFF0DD",
    padding: "3rem",
    borderRadius: "2.5rem",
    [theme.breakpoints.down("sm")]: {},
  },
  button: {
    padding: 0,
    backgroundColor: "unset",
  },
  logo: {
    fontSize: "3.5rem",
    marginTop: "6.2rem",
  },
}))

const ExplorerCard = props => {
  const { title, content, icon, href, ...restProps } = props

  const { classes } = useStyles()

  return (
    <Card {...restProps} elevation={0} classes={{ root: classes.card }}>
      <Stack direction="column">
        <Stack direction="row" justifyContent="flex-end">
          <Link href={href} external sx={{ display: "inline-flex" }}>
            <SvgIcon component={ExternaLinkIcon} inheritViewBox></SvgIcon>
          </Link>
        </Stack>
        <SvgIcon classes={{ root: classes.logo }} component={icon} inheritViewBox></SvgIcon>

        <Typography sx={{ fontSize: "2.4rem", fontWeight: 600, lineHeight: "normal", mt: "2.6rem", mb: "0.6rem" }}>{title}</Typography>
        <Typography sx={{ fontSize: "2rem", lineHeight: "normal" }}>{content}</Typography>
      </Stack>
    </Card>
  )
}

export default ExplorerCard
