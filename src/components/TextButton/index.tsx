import Link from "@/components/Link"

const TextButton = props => {
  const { sx, children, ...restProps } = props
  return (
    <Link
      component="button"
      sx={{
        color: "primary.main",
        verticalAlign: "baseline",
        ...sx,
      }}
      underline="hover"
      {...restProps}
    >
      {children}
    </Link>
  )
}

export default TextButton
