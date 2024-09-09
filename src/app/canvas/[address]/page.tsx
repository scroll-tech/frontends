import { headers } from "next/headers"

import CanvasDashboard from "../Dashboard"

export async function generateMetadata({ params }): Promise<Metadata> {
  const { origin } = new URL(headers().get("x-url")!)

  // TODO:
  const canvasUsername = "Yvaine"
  const title = `Scroll -  ${canvasUsername}'s Canvas`
  const description = "Collect onchain badges and build your story on Scroll"
  const imgUrl = `${process.env.NEXT_PUBLIC_CANVAS_BACKEND_URI}/canvas/${params.address}.png`

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [imgUrl],
    },
    twitter: {
      title,
      description,
      images: [imgUrl],
    },
  }
}

const OthersCanvasPage = () => {
  return <CanvasDashboard></CanvasDashboard>
}

export default OthersCanvasPage
