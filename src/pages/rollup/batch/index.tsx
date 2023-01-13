import dayjs from "dayjs"
import { useEffect } from "react"
import { Link as RouterLink, useParams } from "react-router-dom"

import { InfoOutlined, NavigateNext, OpenInNew } from "@mui/icons-material"
import { Box, Breadcrumbs, Divider, Link, Tooltip, Typography } from "@mui/material"
import { styled, useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import { l1ExplorerUrl } from "@/constants/index"
import { useBatchDetail } from "@/hooks/useRollupInfo"

import Header from "../components/Header"
import Spinning from "../components/Spinning"

const relativeTime = require("dayjs/plugin/relativeTime")
const utc = require("dayjs/plugin/utc")

dayjs.extend(relativeTime)
dayjs.extend(utc)

const LabelTypography = styled(Typography)(({ theme }) => ({
  paddingLeft: "5rem",
  width: "30rem",
  [theme.breakpoints.down("md")]: {
    paddingLeft: "1.6rem",
    width: "25rem",
  },
}))

const BoxItem = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "10rem",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    height: "7.4rem",
    "& > :nth-of-type(2)": {
      textAlign: "right",
      display: "block",
      width: "100%",
      marginRight: "1.6rem",
    },
  },
}))

const Blocks = () => {
  const params = useParams()
  const { batch, isLoading } = useBatchDetail(params.batchIndex)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

  useEffect(() => {}, [])

  const renderTimestamp = timestamp => {
    if (!timestamp) return "-"
    const date = new Date(timestamp * 1000)
    return `${dayjs(date).fromNow().toString()} (${dayjs(date).utc().local().format("MMM-DD-YYYY hh:mm:ss A Z UTC")})`
  }

  const truncatedHash = (hash: string) => {
    if (isDesktop) {
      return hash
    } else {
      return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`
    }
  }

  const renderLink = (hash: string | null) => {
    if (hash) {
      return (
        <Link href={`${l1ExplorerUrl}/tx/${hash}`} underline="none">
          <Box display="flex" alignItems="center">
            <Typography sx={{ color: "#00A6F2", fontWeight: 600 }}>{truncatedHash(hash)}</Typography>
            <OpenInNew
              sx={{
                marginLeft: "0.4rem",
                color: "#00A6F2",
                verticalAlign: "text-top",
              }}
            />
          </Box>
        </Link>
      )
    }
    return "-"
  }

  return (
    <Box className="wrapper mx-auto" sx={{ marginBottom: "16rem" }}>
      <Header />
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: 600 }} separator={<NavigateNext fontSize="large" />}>
        <RouterLink to="/prealpha/rollupscan">All results</RouterLink>
        <Typography sx={{ fontWeight: 600 }} color="text.primary">
          Batch {params.batchIndex}
        </Typography>
      </Breadcrumbs>
      {isLoading ? (
        <Spinning></Spinning>
      ) : (
        <>
          {batch && (
            <Box
              sx={{
                width: "100%",
                border: "1px solid #C9CBCE",
                borderRadius: "10px",
                marginTop: "2.2rem",
              }}
              aria-label="batch"
            >
              <BoxItem>
                <LabelTypography>Batch Index</LabelTypography>
                <Typography>{batch.index}</Typography>
              </BoxItem>
              <Divider />
              <BoxItem>
                <LabelTypography>Transactions</LabelTypography>
                <Typography>{batch.total_tx_num}</Typography>
              </BoxItem>
              <Divider />
              <BoxItem>
                <LabelTypography>Blocks</LabelTypography>
                {/* TODO: Make link dynamic, probably by using a variable for the rollupscan root */}
                <RouterLink to={`/prealpha/rollupscan/batch/${batch.index}/blocks`}>
                  <Typography sx={{ fontWeight: 600, color: "#00A6F2" }}>{batch.end_block_number - batch.start_block_number + 1}</Typography>
                </RouterLink>
              </BoxItem>
              <Divider />

              <BoxItem>
                <LabelTypography>
                  Batch Created Timestamp{" "}
                  <Tooltip title="Timestamp when the batch was created">
                    <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                  </Tooltip>{" "}
                </LabelTypography>
                <Typography>{renderTimestamp(batch.created_at)}</Typography>
              </BoxItem>
              <Divider />

              <BoxItem>
                <>
                  <LabelTypography>Commit Tx Hash</LabelTypography>
                  {renderLink(batch.commit_tx_hash)}
                </>
              </BoxItem>
              <Divider />

              <BoxItem>
                <LabelTypography>
                  Commit Timestamp{" "}
                  <Tooltip title="Timestamp of the transaction that commits the batch's data to L1">
                    <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                  </Tooltip>{" "}
                </LabelTypography>
                <Typography>{renderTimestamp(batch.committed_at)}</Typography>
              </BoxItem>
              <Divider />

              <BoxItem>
                <>
                  <LabelTypography>Finalized Tx Hash</LabelTypography>
                  {renderLink(batch.finalize_tx_hash)}
                </>
              </BoxItem>
              <Divider />

              <BoxItem>
                <LabelTypography>
                  Finalized Timestamp{" "}
                  <Tooltip title="Timestamp of the transaction that posts the batch's proof to L1">
                    <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                  </Tooltip>{" "}
                </LabelTypography>
                <Typography>{renderTimestamp(batch.finalized_at)}</Typography>
              </BoxItem>
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default Blocks
