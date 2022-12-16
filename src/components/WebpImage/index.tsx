function WebpImage(props) {
  return (
    <picture>
      <source srcSet={props.webpSrc} type="image/webp" />
      <img {...props} />
    </picture>
  );
}

export default WebpImage;
