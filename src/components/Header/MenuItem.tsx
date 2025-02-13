import clsx from "clsx"
import Link from "next/link"

import ExternalLinkSvg from "@/assets/svgs/common/external-link.svg"

const MenuItem = props => {
  const { children, href, isActive, dark } = props
  const isExternal = href?.startsWith("http")

  return (
    <Link
      className={clsx(
        "flex items-center gap-[1rem] text-[1.6rem] font-normal p-[0.8rem] leading-[2.4rem] min-w-[13.6rem] hover:text-[var(--mui-palette-primary-main)] group",
        isActive && "text-[var(--mui-palette-primary-main)]",
        dark && "text-[var(--mui-palette-primary-constrastText)]",
      )}
      href={href}
      style={{ WebkitTextStroke: "none" }}
      target={isExternal ? "_blank" : "_self"}
    >
      {children}

      {isExternal && (
        <span className="invisible relative -translate-x-2 transition-transform group-hover:visible group-hover:translate-x-0">
          <ExternalLinkSvg className="w-[1rem] h-auto"></ExternalLinkSvg>
        </span>
      )}
    </Link>
  )
}

export default MenuItem
