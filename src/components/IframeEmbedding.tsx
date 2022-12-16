import { styled } from "@mui/system";
import { Box, CircularProgress } from "@mui/material";
import { useRef } from "react";
import { useIsIFrameLoaded } from "@/hooks/useIsIframeLoaded";

const Iframe = styled("iframe")(({ theme }) => ({}));

function IframeEmbedding(props: {
  url: string;
  DesktopHeight: string;
  MobileHeight: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isIFrameLoaded = useIsIFrameLoaded(iframeRef);

  return (
    <Box>
      {isIFrameLoaded ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress sx={{ color: "#EB7106" }} />
        </Box>
      ) : (
        <Iframe
          title="url"
          className="w-full"
          id="Iframe"
          seamless
          src={props.url}
          ref={iframeRef}
          sx={{
            height: {
              md: props.DesktopHeight,
              xs: props.MobileHeight,
            },
          }}
        ></Iframe>
      )}
    </Box>
  );
}

export default IframeEmbedding;
