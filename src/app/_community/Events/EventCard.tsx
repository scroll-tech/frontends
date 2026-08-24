import dayjs from "dayjs"
import { makeStyles } from "tss-react/mui"

import { Card, Stack, Typography } from "@mui/material"

import { communityOrigin } from "@/apis/community"
import RegionIcon from "@/assets/svgs/community/region.svg"
import TimeIcon from "@/assets/svgs/community/time.svg"
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

const DateTag = props => {
  const { startDate, endDate } = props
  return (
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
      <TimeIcon className="w-[1.6rem] h-auto mr-[0.6rem]"></TimeIcon>
      {!endDate && dayjs(startDate).format("MMMM D, YYYY")}
      {endDate && `${dayjs(startDate).format("MMM D")} - ${dayjs(endDate).format("MMM D, YYYY")}`}
    </Typography>
  )
}

const EventCard = props => {
  const { image, city, country, url, ...restProps } = props

  const { classes } = useStyles()

  return (
    <Link href={url} external>
      <Card {...restProps} elevation={0} classes={{ root: classes.card }}>
        <img alt="Event cover" src={communityOrigin + image} className={classes.cover} />
        <Stack direction="row" gap="1rem">
          <DateTag {...props} />
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
            <RegionIcon className="w-[1.6rem] mr-[0.6rem]"></RegionIcon>
            {city}, {country}
          </Typography>
        </Stack>
      </Card>
    </Link>
  )
}

export default EventCard
