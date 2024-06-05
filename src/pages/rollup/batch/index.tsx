import dayjs from "dayjs"
import { useEffect } from "react"
import { Link as RouterLink, useParams } from "react-router-dom"

import { InfoOutlined, NavigateNext, OpenInNew } from "@mui/icons-material"
import { Box, Breadcrumbs, Chip, Divider, Stack, Tooltip, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import Link from "@/components/Link"
import { EXPLORER_URL } from "@/constants"
import useCheckViewport from "@/hooks/useCheckViewport"
import { useBatchDetail } from "@/hooks/useRollupInfo"

import Header from "../components/Header"
import Spinning from "../components/Spinning"

const relativeTime = require("dayjs/plugin/relativeTime")
const utc = require("dayjs/plugin/utc")

dayjs.extend(relativeTime)
dayjs.extend(utc)

const StatusChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textTransform: "capitalize",
  "&.precommitted": {
    backgroundColor: theme.palette.tagWarning.light,
    color: theme.palette.tagWarning.main,
  },
  "&.committed": {
    backgroundColor: theme.palette.tagCommitted.light,
    color: theme.palette.tagCommitted.main,
  },
  "&.finalized": {
    backgroundColor: "#DFFCF8",
    color: "#0F8E7E",
  },
  "&.skipped": {
    backgroundColor: theme.palette.tagCommitted.light,
    color: theme.palette.tagCommitted.main,
  },
  "&.unknown": {
    backgroundColor: theme.palette.tagUnknown.light,
    color: theme.palette.tagUnknown.main,
  },
  "& > .MuiChip-label": {
    fontWeight: 500,
  },
}))

const LabelTypography = styled(Typography)(({ theme }) => ({
  paddingLeft: "5rem",
  width: "30rem",
  fontWeight: 500,
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
    justifyContent: "space-between",
    "& > *:last-child": {
      textAlign: "right",
      marginLeft: "0.4rem",
      marginRight: "1.6rem",
    },
  },
}))

const Batch = () => {
  const params = useParams()
  const { batch, isLoading } = useBatchDetail(params.batchIndex)
  const { isLandscape } = useCheckViewport()

  useEffect(() => {}, [])

  const renderTimestamp = timestamp => {
    if (!timestamp) return "-"
    const date = new Date(timestamp * 1000)
    return `${dayjs(date).fromNow().toString()} (${dayjs(date).utc().local().format("MMM-DD-YYYY hh:mm:ss A Z UTC")})`
  }

  const truncatedHash = (hash: string) => {
    if (isLandscape) {
      return hash
    } else {
      return `${hash.substring(0, 6)}…${hash.substring(62, 66)}`
    }
  }

  const renderLink = (hash: string | null) => {
    if (hash) {
      return (
        <Link external href={`${EXPLORER_URL.L1}/tx/${hash}`}>
          <Stack direction="row" alignItems="center" spacing="0.4rem" sx={{ whiteSpace: "nowrap" }}>
            {truncatedHash(hash)}
            <OpenInNew />
          </Stack>
        </Link>
      )
    }
    return "-"
  }

  const renderStatus = (status: string) => {
    return status === "skipped" ? "committed" : status
  }

  const renderStatusTooltip = () => {
    return (
      <>
        <p className="mb-1">Precommitted: Batch included in Scroll L2</p>
        <p className="mb-1">Committed: Batch transaction data submitted to Ethereum (L1)</p>
        <p className="mb-1">Finalized: Batch validity proof submitted to and verified on Ethereum</p>
      </>
    )
  }

  return (
    <Box>
      <Header />
      <Box
        className="wrapper mx-auto"
        sx={{
          marginBottom: "16rem",
          "& *": {
            fontFamily: "var(--developer-page-font-family) !important",
          },
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontWeight: 600 }} separator={<NavigateNext fontSize="large" />}>
          <RouterLink to="/rollupscan?page=1&per_page=10">Batches</RouterLink>
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
                  border: theme => `1px solid ${theme.palette.border.main}`,
                  borderRadius: "27px",
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
                  <LabelTypography>
                    Status{" "}
                    <Tooltip title={renderStatusTooltip()} leaveTouchDelay={15000}>
                      <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                    </Tooltip>
                  </LabelTypography>
                  <StatusChip label={renderStatus(batch.rollup_status)} className={batch.rollup_status}></StatusChip>
                </BoxItem>
                <Divider />
                <BoxItem>
                  <LabelTypography>Transactions</LabelTypography>
                  <Typography>{batch.total_tx_num}</Typography>
                </BoxItem>
                <Divider />
                <BoxItem>
                  <LabelTypography>Chunks</LabelTypography>
                  <Link component={RouterLink} to={`/rollupscan/batch/${batch.index}/chunks`}>
                    {batch.end_chunk_index - batch.start_chunk_index + 1}
                  </Link>
                </BoxItem>
                <Divider />
                <BoxItem>
                  <LabelTypography>Blocks</LabelTypography>
                  {/* TODO: Make link dynamic, probably by using a variable for the rollupscan root */}
                  <Link component={RouterLink} to={`/rollupscan/batch/${batch.index}/blocks`}>
                    {batch.end_block_number - batch.start_block_number + 1}
                  </Link>
                </BoxItem>
                <Divider />

                <BoxItem>
                  <LabelTypography>
                    Batch Created Timestamp{" "}
                    <Tooltip title="Timestamp when the batch was created">
                      <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                    </Tooltip>
                  </LabelTypography>
                  <Typography>{renderTimestamp(batch.created_at)}</Typography>
                </BoxItem>
                <Divider />

                <BoxItem>
                  <LabelTypography>Commit Tx Hash</LabelTypography>
                  <Typography>{renderLink(batch.commit_tx_hash)}</Typography>
                </BoxItem>
                <Divider />

                <BoxItem>
                  <LabelTypography>
                    Commit Timestamp{" "}
                    <Tooltip title="Timestamp of the transaction that commits the batch's data to L1">
                      <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                    </Tooltip>
                  </LabelTypography>
                  <Typography>{renderTimestamp(batch.committed_at)}</Typography>
                </BoxItem>
                <Divider />

                <BoxItem>
                  <LabelTypography>Finalized Tx Hash</LabelTypography>
                  <Typography>{renderLink(batch.finalize_tx_hash)}</Typography>
                </BoxItem>
                <Divider />

                <BoxItem>
                  <LabelTypography>
                    Finalized Timestamp{" "}
                    <Tooltip title="Timestamp of the transaction that posts the batch's proof to L1">
                      <InfoOutlined sx={{ fontSize: "2rem", verticalAlign: "text-bottom" }} />
                    </Tooltip>
                  </LabelTypography>
                  <Typography>{renderTimestamp(batch.finalized_at)}</Typography>
                </BoxItem>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default Batch
