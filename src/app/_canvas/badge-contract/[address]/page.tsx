import { notFound } from "next/navigation"

import BadgeContract from "./BadgeContract"

const BadgeContracPage = () => {
  if (process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    notFound()
  }
  return <BadgeContract></BadgeContract>
}

export default BadgeContracPage
