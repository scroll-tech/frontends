import ScrollLoadingButton from "@/components/LoadingButton"

const PerksButton = props => {
  const { sx, children, ...restProps } = props
  return (
    <ScrollLoadingButton
      sx={{ borderRadius: ["0.8rem", "1rem"], width: "100%", height: ["4rem", "5.6rem"], fontSize: ["1.6rem", "2rem"], ...sx }}
      {...restProps}
    >
      {children}
    </ScrollLoadingButton>
  )
}

export default PerksButton
