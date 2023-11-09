import Img from "react-cool-img"

import { Box } from "@mui/material"

const NFTImage = props => {
  const { sx, src } = props

  return (
    <Box sx={sx}>
      <Img src={src}></Img>
    </Box>
  )
}

export default NFTImage
