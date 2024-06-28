/**
 * middleware file is not for making any route public or private. It is just there to run the middleware for specific routes.
 */
import NextAuth from "next-auth";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // this req.auth will give is login status of user. Two !! in front of it make it a boolean.
  const isLoggedIn = !!req.auth;
  console.log("Route: ", req.nextUrl.pathname);
  console.log("Is LoggedIn: ", isLoggedIn);
});

// everything inside this config object will not be used to make public or protected routes. It will simply be used to invoke the middle ware function.
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
