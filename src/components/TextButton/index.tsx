import Link from "@/components/Link"

const TextButton = props => {
  const { sx, children, ...restProps } = props
  return (
    <Link
      component="button"
      sx={{
        color: "primary.main",
        verticalAlign: "baseline",
        fontSize: "1.4rem",
        fontWeight: 600,
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
