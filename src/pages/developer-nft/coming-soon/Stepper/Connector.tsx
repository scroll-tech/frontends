import { useEffect, useState } from "react"
import { makeStyles } from "tss-react/mui"

import { LinearProgress } from "@mui/material"
import { alpha } from "@mui/material/styles"

import { DEVELOPER_NFT_PHRASES } from "@/constants"
import useNFTStore from "@/stores/nftStore"

const useStyles = makeStyles<any>()(theme => ({
  root: {
    width: "30.6rem",
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
  const [progress, setProgress] = useState([0, 0])

  const { classes } = useStyles({ progress })

  useEffect(() => {
    const calculateProgress = () => {
      const current = Date.now()
      if (phrase === "warm-up") {
        const progress1 = ((current - DEVELOPER_NFT_PHRASES.Annoucement) / (DEVELOPER_NFT_PHRASES.Start - DEVELOPER_NFT_PHRASES.Annoucement)) * 100
        setProgress([progress1, 0])
      } else if (phrase === "in-progress") {
        const progress2 = ((current - DEVELOPER_NFT_PHRASES.Start) / (DEVELOPER_NFT_PHRASES.End - DEVELOPER_NFT_PHRASES.Start)) * 100
        setProgress([100, progress2])
      } else {
        setProgress([100, 100])
      }
    }
    const timer = setInterval(calculateProgress, 1e3)
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
        "&:nth-of-type(1) .MuiLinearProgress-bar": {
          transform: `translateX(-${100 - progress[0]}%) !important`,
        },
        "&:nth-of-type(2) .MuiLinearProgress-bar": {
          transform: `translateX(-${100 - progress[1]}%) !important`,
        },
      }}
    />
  )
}

export default Connector
