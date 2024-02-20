import createMiddleware from "next-intl/middleware";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { useAppSelector } from "./redux";
// export async function middleware(request: NextRequest) {
//   const { isAuthenticated } = useAppSelector((state) => state.auth);
//   if (!isAuthenticated) {
//     if (request.url.includes("student") || request.url.includes("tutor")) {
//       return NextResponse.redirect("/auth");
//     }
//   }
// }
export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es", "cz", "de"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(es|en|cz|de)/:path*"],
};
