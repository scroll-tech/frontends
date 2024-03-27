import { Skeleton, Stack, SvgIcon, Typography } from "@mui/material"

import { ReactComponent as BackSvg } from "@/assets/svgs/canvas/back.svg"

const BackToCanvas = props => {
  const { username, sx, loading, ...restProps } = props
  return (
    <Stack direction="row" gap="0.8rem" sx={{ cursor: "pointer", "& *": { cursor: "pointer !important" }, ...sx }} {...restProps}>
      <SvgIcon component={BackSvg} inheritViewBox></SvgIcon>
      <Typography sx={{ fontSize: "1.8rem", fontWeight: 600 }}>
        Back to{" "}
        <>
          {loading ? (
            <Skeleton
              variant="rectangular"
              sx={{
                display: "inline-block",
                backgroundColor: "rgba(256, 256, 256, 0.15)",
                width: "2em",
                height: "100%",
                verticalAlign: "middle",
                borderRadius: "0.4rem",
              }}
            ></Skeleton>
          ) : (
            <>{username}</>
          )}
        </>
        ’s Canvas
      </Typography>
    </Stack>
  )
}
export default BackToCanvas
