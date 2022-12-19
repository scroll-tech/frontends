function WebpImage(props) {
  return (
    <picture>
      <source srcSet={props.webpsrc} type="image/webp" />
      <img {...props} />
    </picture>
  );
}

export default WebpImage;
