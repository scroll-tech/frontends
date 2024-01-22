"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

const NavLink = ({ slug, children }: { slug: string; children: React.ReactNode }) => {
  // Navigating to `/blog/hello-world` will return 'hello-world'
  // for the selected layout segment
  const segment = useSelectedLayoutSegment()
  const isActive = slug === segment

  return (
    <Link
      href={`/blog/${slug}`}
      // Change style depending on whether the link is active
      style={{ fontWeight: isActive ? "bold" : "normal" }}
    >
      {children}
    </Link>
  )
}

export default NavLink
