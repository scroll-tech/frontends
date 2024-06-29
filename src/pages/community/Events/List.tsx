import { useEffect, useMemo, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { Box, Button, SvgIcon } from "@mui/material"

import { communityEventListUrl } from "@/apis/community"
import { ReactComponent as ArrowSvg } from "@/assets/svgs/ecosystem/arrow.svg"
import LoadingButton from "@/components/LoadingButton"
import LoadingPage from "@/components/LoadingPage"
import SuccessionToView, { SuccessionItem } from "@/components/Motion/SuccessionToView"
import { COMMUNITY_REGION_LIST, COMMUNITY_TIME_LIST } from "@/constants/community"

import Error from "./Error"
import Card from "./EventCard"
import NoData from "./NoData"

const useStyles = makeStyles()(theme => ({
  flex: {
    marginTop: "3rem",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "3rem",
    [theme.breakpoints.down(1200)]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridGap: "2rem",
      marginTop: "2rem",
    },
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  large: {
    gridColumn: "span 3",
    [theme.breakpoints.down("md")]: {
      gridColumn: "span 1",
    },
  },
  flexItem: {
    flex: 1,
    alignSelf: "stretch",
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
      width: "18.5rem",
    },
  },
  buttonBox: {
    gridColumn: "span 3",
    textAlign: "center",
    marginTop: "3rem",
    [theme.breakpoints.down(1200)]: {
      gridColumn: "span 2",
    },
    [theme.breakpoints.down("md")]: {
      gridColumn: "span 1",
    },
  },
}))

const Join = props => {
  const {
    searchParams: { time, region, page },
    onAddPage,
  } = props
  const [loading, setLoading] = useState(false)
  const { classes } = useStyles()
  const [total, setTotal] = useState(false)
  const [eventList, setEventList] = useState<any>([])
  const [isError, setIsError] = useState(false)
  const [pageSize] = useState(6)

  const queryStr = useMemo(() => {
    const searchParams = new URLSearchParams({
      page_number: page,
      page_size: pageSize,
    } as any)
    if (region !== COMMUNITY_REGION_LIST[0]) {
      searchParams.set("region", region)
    }
    if (time !== COMMUNITY_TIME_LIST[0]) {
      searchParams.set("time", time)
    }

    const searchParamsStr = searchParams.toString()
    return searchParamsStr ? `?${searchParamsStr}` : ""
  }, [region, time, page])

  const fetchEventList = value => {
    setLoading(true)
    scrollRequest(`${communityEventListUrl}${value}`)
      .then(({ data, total }) => {
        setTotal(total)
        if (page !== 1) {
          setEventList(pre => pre.concat(data))
        } else {
          setEventList(data)
        }
        setIsError(false)
      })
      .catch(() => {
        setIsError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const hasMore = useMemo(() => {
    return total > eventList.length
  }, [total, eventList])

  useEffect(() => {
    fetchEventList(queryStr)
  }, [queryStr])

  const handleRequest = () => {
    fetchEventList(queryStr)
  }

  const renderList = () => {
    if (loading && !eventList.length) {
      return <LoadingPage height="26rem" sx={{ gridColumn: ["1 / 3", "1 / 3", "2 / 4"] }}></LoadingPage>
    } else if (isError && !eventList.length) {
      return (
        <Error
          sx={{ height: "26rem", gridColumn: ["1 / 3", "1 / 3", "2 / 4"] }}
          title="Oops! Something went wrong"
          action={
            <LoadingButton loading={loading} onClick={handleRequest}>
              Try again
            </LoadingButton>
          }
        ></Error>
      )
    } else if (!eventList.length) {
      return (
        <NoData
          sx={{ height: "26rem", gridColumn: ["1 / 3", "1 / 3", "2 / 4"] }}
          title="No matches found"
          description="Please choose your search keywords and search again"
        ></NoData>
      )
    }
    return (
      <Box>
        <SuccessionToView className={classes.flex}>
          {eventList.map((item, idx) => (
            <SuccessionItem key={idx} className={classes.flexItem} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Card {...item}></Card>
            </SuccessionItem>
          ))}
          {hasMore && (
            <SuccessionItem className={classes.buttonBox} sx={{ textAlign: "center" }}>
              <Button
                href={""}
                target="_blank"
                onClick={onAddPage}
                classes={{ root: classes.action }}
                startIcon={
                  <SvgIcon
                    sx={{ fontSize: ["1.2rem !important", "1.4rem !important"], transform: "rotate(135deg)" }}
                    component={ArrowSvg}
                    inheritViewBox
                  ></SvgIcon>
                }
              >
                View more
              </Button>
            </SuccessionItem>
          )}
        </SuccessionToView>
      </Box>
    )
  }

  return <>{renderList()}</>
}

export default Join
