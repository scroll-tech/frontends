import { makeStyles } from "tss-react/mui"

import { Box, Button, Card, Stack, SvgIcon, Typography } from "@mui/material"

import ScrollGenericIcon from "@/assets/images/community/scroll_generic.png"
import { ReactComponent as CombinationMarkIcon } from "@/assets/svgs/community/combination_mark.svg"
import { ReactComponent as ArrowSvg } from "@/assets/svgs/ecosystem/arrow.svg"
import Link from "@/components/Link"

const useStyles = makeStyles()(theme => ({
  card: {
    backgroundColor: theme.palette.themeBackground.normal,
    height: "100%",
    padding: "4.1rem",
    borderRadius: "2.5rem",
    cursor: "pointer",
    gridColumn: "span 3",
    "&:hover": {
      backgroundColor: theme.palette.themeBackground.highlight,
    },
    [theme.breakpoints.down("md")]: {
      padding: "2rem",
    },
  },
  action: {
    borderRadius: "0.8rem",
    padding: "0.8rem 2.4rem",
    fontSize: "1.8rem",
    height: "4rem",
    width: "21.6rem",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
      width: "20rem",
      marginBottom: "3.3rem",
    },
  },
  genericIcon: {
    maxHeight: "22rem",
    width: "auto",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "100%",
    },
  },
}))

const ContributeCard = props => {
  const { title, content, icon, href, ...restProps } = props

  const { classes } = useStyles()

  return (
    <Link href={href} external>
      <Card {...restProps} elevation={0} classes={{ root: classes.card }}>
        <Stack direction={["column", "row"]} justifyContent="space-between" position="relative">
          <Box>
            <SvgIcon
              sx={{
                height: ["2.7rem", "2.7rem"],
                width: ["15.7rem", "15.7rem"],
                mb: ["3.2rem"],
              }}
              component={CombinationMarkIcon}
              inheritViewBox
            ></SvgIcon>
            <Typography
              sx={{
                fontSize: ["1.6rem", "2.4rem"],
                fontWeight: 600,
                lineHeight: [1.6, "normal"],
                mb: ["0.8rem"],
                cursor: "inherit",
              }}
            >
              Learn, build and innovate
            </Typography>
            <Typography
              sx={{
                fontSize: ["1.6rem", "2rem"],
                lineHeight: [1.5, "normal"],
                cursor: "inherit",
                marginBottom: ["3.2rem"],
                maxWidth: ["100%", "58rem"],
              }}
            >
              Complete our level up challenges and join a study group of dedicated developers
            </Typography>
            <Button
              href={"https://levelupweb3.xyz/"}
              target="_blank"
              classes={{ root: classes.action }}
              endIcon={<SvgIcon sx={{ fontSize: ["1.2rem !important", "1.3rem !important"] }} component={ArrowSvg} inheritViewBox></SvgIcon>}
            >
              Visit Level Up Site
            </Button>
          </Box>
          <Box sx={{ justifySelf: "flex-end", alignSelf: "end" }}>
            <img src={ScrollGenericIcon} className={classes.genericIcon} alt="Scroll Generic Icon" />
          </Box>
        </Stack>
      </Card>
    </Link>
  )
}

export default ContributeCard
