// Without a defined matcher, this line applies next-auth to the whole project
// export { default } from "next-auth/middleware";

// https://next-auth.js.org/configuration/nextjs#advanced-usage
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with user's token
  function middleware(req: NextRequestWithAuth) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth.token);
    if (
      req.nextUrl.pathname.startsWith("/extra") &&
      !req.nextauth.token?.roles.includes("admin")
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/client") &&
      !req.nextauth.token?.roles.includes("admin") &&
      !req.nextauth.token?.roles.includes("manager")
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      // the middleware will only fire if authorized returns TRUE
      authorized: ({ token }) => !!token, // checking if user is authorized with any role

      // example of middleware callback based on the role
      // authorized: ({ token }) => !!token?.roles?.includes("admin"),
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/extra", "/protectedroot/:path*"],
};
