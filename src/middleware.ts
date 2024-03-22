import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "~/lib/auth";
import { JWT_KEY } from "~/utils/constant";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(JWT_KEY)?.value;

  const verifiedToken =
    token &&
    (await verifyToken(token).catch((err) =>
      console.error(JSON.stringify(err)),
    ));

  if (req.nextUrl.pathname.endsWith("/"))
    return NextResponse.redirect(new URL("/login", req.url));

  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken)
    return NextResponse.next();

  if (req.nextUrl.pathname.includes("/interests") && !verifiedToken)
    return NextResponse.redirect(new URL("/login", req.url));

  if (!verifiedToken) return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/interests", "/login", "/", "/signup"],
};
