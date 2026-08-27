import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // the old pages (blog, portal, ecosystem, ...) are archived under src/app/_* and no longer routed;
  // the redesigned landing page is served at "/" on every environment

  // if (request.nextUrl.pathname === "/archive/20230308/terms-and-conditions") {
  //   const response = NextResponse.rewrite(new URL("/terms-and-conditions", request.url))
  //   return response
  // }

  const response = NextResponse.next()
  return response
}
