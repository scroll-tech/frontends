function IframeEmbedding(props: { url: string }) {
  return (
    <div className="FullScreen">
      <iframe title="url" className="FullScreen" src={props.url}></iframe>
    </div>
  )
}

export default IframeEmbedding
