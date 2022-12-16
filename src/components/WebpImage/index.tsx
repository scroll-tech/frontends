function WebpImage(props) {
  return (
    <picture>
      <source srcSet={props.webpSrc} type="image/webp" />
      <img className={props.className} src={props.src} />
    </picture>
  );
}

export default WebpImage;
