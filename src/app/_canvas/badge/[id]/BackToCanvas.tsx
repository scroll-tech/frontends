import Link from "next/link"

import { Stack, SvgIcon, Typography } from "@mui/material"

import BackSvg from "@/assets/svgs/canvas/back.svg"
import Skeleton from "@/components/Skeleton"

const BackToCanvas = props => {
  const { username, sx, loading, href, ...restProps } = props
  return (
    <Link href={href}>
      <Stack direction="row" gap="0.8rem" sx={{ cursor: "pointer", "& *": { cursor: "pointer !important" }, ...sx }} {...restProps}>
        <SvgIcon component={BackSvg} inheritViewBox></SvgIcon>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: 600 }}>
          Back to{" "}
          <>
            {loading ? (
              <Skeleton
                dark
                sx={{
                  width: "2em",

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
    </Link>
  )
}
export default BackToCanvas
