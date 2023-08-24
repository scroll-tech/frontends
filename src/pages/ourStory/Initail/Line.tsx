import { Divider } from "@mui/material"

import LineToView from "@/components/Motion/LineToView"

const Line = props => {
  return (
    <LineToView>
      <Divider orientation="vertical" sx={{ borderColor: theme => theme.palette.text.primary }} textAlign="center" {...props} />
    </LineToView>
  )
}

export default Line
