import { Link } from "@mui/material"

const TextButton = props => {
  const { sx, children, ...restProps } = props
  return (
    <Link
      component="button"
      sx={{
        color: "primary.main",
        verticalAlign: "baseline",
        fontWeight: 600,
        ...sx,
      }}
      underline="none"
      className="hover:underline"
      {...restProps}
    >
      {children}
    </Link>
  )
}

export default TextButton
