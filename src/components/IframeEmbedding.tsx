import { styled } from "@mui/system";

const Iframe = styled("iframe")(({ theme }) => ({}));

function IframeEmbedding(props: {
  url: string;
  DesktopHeight: string;
  MobileHeight: string;
}) {
  return (
    <div className="w-full">
      <Iframe
        title="url"
        className="w-full"
        id="Iframe"
        seamless
        frameBorder="0"
        src={props.url}
        sx={{
          height: {
            md: props.DesktopHeight,
            xs: props.MobileHeight,
          },
        }}
      ></Iframe>
    </div>
  );
}

export default IframeEmbedding;
