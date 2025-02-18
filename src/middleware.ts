import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/" && process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia") {
    const response = NextResponse.rewrite(new URL("/bridge", request.url))
    return response
  }

  // Redirects in next.config.mjs are case-insensitive.
  if (request.nextUrl.pathname === "/blog/zkEVM") {
    const response = NextResponse.redirect(new URL("/blog/zkevm", request.url))
    return response
  }

  // if (request.nextUrl.pathname === "/archive/20230308/terms-and-conditions") {
  //   const response = NextResponse.rewrite(new URL("/terms-and-conditions", request.url))
  //   return response
  // }

  const response = NextResponse.next()
  return response
}
