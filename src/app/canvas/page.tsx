import { headers } from "next/headers"

import Canvas from "./Canvas"

export async function generateMetadata(): Promise<Metadata> {
  const { origin } = new URL(headers().get("x-url")!)

  // TODO:
  const canvasUsername = "Yvaine"
  const walletCurrentAddress = "0xe4657139e50E909731de703E1728128197a90447"
  const title = `Scroll -  ${canvasUsername}'s Canvas`
  const description = "Collect onchain badges and build your story on Scroll"
  const imgUrl = `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/canvas/${walletCurrentAddress}.png`

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imgUrl],
    },
    twitter: {
      title,
      description,
      images: [imgUrl],
    },
  }
}

const CanvasPage = () => {
  return <Canvas></Canvas>
}

export default CanvasPage
