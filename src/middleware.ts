import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
  matcher: ["/:path*"],
};


export function middleware(request: NextRequest) {
  const baseAuth = request.headers.get("authorization");

  const url = request.nextUrl;

  if (baseAuth) {
    const authValue = baseAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === "admin" && pwd === "yyds") {
      return NextResponse.next();
    }
  }
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
