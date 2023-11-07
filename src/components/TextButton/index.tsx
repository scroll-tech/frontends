import Link from "@/components/Link"

const TextButton = props => {
  const { sx, underline = "hover", children, ...restProps } = props
  return (
    <Link
      component="button"
      sx={{
        color: "primary.main",
        verticalAlign: "baseline",
        ...sx,
      }}
      underline={underline}
      {...restProps}
    >
      {children}
    </Link>
  )
}

export default TextButton
