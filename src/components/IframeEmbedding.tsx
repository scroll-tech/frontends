import { useEffect, useRef, useState } from "react"

import { Box, CircularProgress } from "@mui/material"
import { styled } from "@mui/system"

const Iframe = styled("iframe")(({ theme }) => ({}))

function IframeEmbedding(props: { url: string; DesktopHeight: string; MobileHeight: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isIFrameLoaded, setIsIFrameLoaded] = useState<boolean>(false)
  useEffect(() => {
    const iframeCurrent = iframeRef.current
    iframeCurrent?.addEventListener("load", () => {
      setIsIFrameLoaded(true)
    })
    return () => {
      iframeCurrent?.removeEventListener("load", () => setIsIFrameLoaded(true))
    }
  }, [iframeRef])

  return (
    <Box>
      {!isIFrameLoaded ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress sx={{ color: "#EB7106" }} />
        </Box>
      ) : null}
      <Iframe
        title="url"
        className="w-full"
        seamless
        src={props.url}
        ref={iframeRef}
        sx={{
          display: isIFrameLoaded ? "block" : "none",
          height: {
            md: props.DesktopHeight,
            xs: props.MobileHeight,
          },
        }}
      ></Iframe>
    </Box>
  )
}

export default IframeEmbedding
