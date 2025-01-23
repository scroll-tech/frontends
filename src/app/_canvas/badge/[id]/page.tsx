import { notFound } from "next/navigation"

import Badge from "./Badge"

const BadgePage = () => {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <Badge></Badge>
}

export default BadgePage
