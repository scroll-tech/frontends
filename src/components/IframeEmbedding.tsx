function IframeEmbedding(props: { url: string }) {
  return (
    <div className="w-full">
      <iframe
        title="url"
        className="w-full  min-h-[800px]"
        id="Iframe"
        src={props.url}
      ></iframe>
    </div>
  );
}

export default IframeEmbedding;
