import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // V3 is a separate, local-first demo and does not use the legacy Supabase session.
  // All user data in this beta stays in the viewer's browser.
  if (request.nextUrl.pathname === "/vitalab3" || request.nextUrl.pathname.startsWith("/vitalab3/")) {
    const { NextResponse } = await import("next/server")
    return NextResponse.next()
  }
  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
