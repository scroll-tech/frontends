import { Divider } from "@mui/material"

import LineToView from "@/components/Motion/LineToView"

const Line = props => {
  return (
    <LineToView>
      <Divider orientation="vertical" textAlign="center" {...props} />
    </LineToView>
  )
}

export default Line
