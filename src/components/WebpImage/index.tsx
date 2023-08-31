function WebpImage(props) {
  const { src, webpsrc, ...restProps } = props
  return (
    <picture {...restProps}>
      <source srcSet={webpsrc} type="image/webp" />
      <img alt="img" src={src} />
    </picture>
  )
}

export default WebpImage
