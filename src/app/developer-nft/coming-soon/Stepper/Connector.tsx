import { useEffect, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { LinearProgress } from "@mui/material"
import { alpha } from "@mui/material/styles"

import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useNFTStore from "@/stores/nftStore"

const useStyles = makeStyles<any>()(theme => ({
  root: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  colorPrimary: {
    backgroundColor: alpha(theme.palette.background.default, 0.6),
  },
  bar: {
    backgroundColor: "#62E3D1",
  },
}))

const Connector = props => {
  const { phrase } = useNFTStore()
  const [progress, setProgress] = useState(0)

  const { classes } = useStyles({ progress })

  useEffect(() => {
    const calculateProgress = () => {
      const current = Date.now()
      if (!phrase) {
        setProgress(0)
      } else if (phrase === "in-progress") {
        const progress = ((current - DEVELOPER_NFT_PHRASES.Starts) / (DEVELOPER_NFT_PHRASES.Ends - DEVELOPER_NFT_PHRASES.Starts)) * 100
        setProgress(progress)
      } else {
        setProgress(100)
      }
    }
    calculateProgress()
    const timer = setInterval(calculateProgress, 1e5)
    return () => {
      clearInterval(timer)
    }
  }, [phrase])

  return (
    <LinearProgress
      variant="determinate"
      classes={{
        root: classes.root,
        colorPrimary: classes.colorPrimary,
        bar: classes.bar,
      }}
      value={0}
      sx={{
        ".MuiLinearProgress-bar": {
          transform: `translateX(-${100 - progress}%) !important`,
        },
      }}
    />
  )
}

export default Connector
