import { Skeleton as MuiSkeleton } from "@mui/material"

const Skeleton = props => {
  const { white, dark, sx, size, ...restProps } = props

  return (
    <MuiSkeleton
      variant="rectangular"
      sx={{
        backgroundColor: white ? "rgba(0, 0, 0, 0.11)" : dark ? "rgba(256, 256, 256, 0.15)" : "rgba(255, 255, 255, 0.45)",
        display: "inline-block",
        verticalAlign: "middle",
        width: "100%",
        borderRadius: size === "small" ? "0.4rem" : "1rem",
        ...sx,
      }}
      {...restProps}
    ></MuiSkeleton>
  )
}

export default Skeleton
