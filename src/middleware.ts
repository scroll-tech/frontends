import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-url", request.url)

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  return response
}
