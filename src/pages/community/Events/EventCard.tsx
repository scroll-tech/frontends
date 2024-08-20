import dayjs from "dayjs"
import { makeStyles } from "tss-react/mui"

import { Card, Stack, SvgIcon, Typography } from "@mui/material"

import { communityOrigin } from "@/apis/community"
import { ReactComponent as RegionIcon } from "@/assets/svgs/community/region.svg"
import { ReactComponent as TimeIcon } from "@/assets/svgs/community/time.svg"
import Link from "@/components/Link"

const useStyles = makeStyles()(theme => ({
  card: {
    height: "100%",
    cursor: "pointer",
    borderRadius: "0",
    background: "transparent",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.01)",
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
  cover: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "1.6rem",
    marginBottom: "1.6rem",
  },
}))

const EventCard = props => {
  const { image, city, country, url, date, ...restProps } = props

  const { classes } = useStyles()

  return (
    <Link href={url} external>
      <Card {...restProps} elevation={0} classes={{ root: classes.card }}>
        <img alt="Event cover" src={communityOrigin + image} className={classes.cover} />
        <Stack direction="row" gap="1rem">
          <Typography
            sx={{
              fontSize: ["1.4rem", "1.6rem"],
              fontWeight: 600,
              lineHeight: ["2"],
              cursor: "inherit",
              borderRadius: "1.5rem",
              background: "#FFEEDA",
              padding: "0rem 1.2rem",
            }}
          >
            <SvgIcon sx={{ fontSize: ["1.6rem"], marginRight: ["0.6rem"] }} component={TimeIcon} inheritViewBox></SvgIcon>
            {dayjs(date).format("MMMM D, YYYY")}
          </Typography>
          <Typography
            sx={{
              fontSize: ["1.4rem", "1.6rem"],
              fontWeight: 600,
              lineHeight: ["2"],
              cursor: "inherit",
              borderRadius: "1.5rem",
              background: "#FFEEDA",
              padding: "0rem 1.2rem",
            }}
          >
            <SvgIcon sx={{ fontSize: ["1.6rem"], marginRight: ["0.6rem"] }} component={RegionIcon} inheritViewBox></SvgIcon>
            {city}, {country}
          </Typography>
        </Stack>
      </Card>
    </Link>
  )
}

export default EventCard
