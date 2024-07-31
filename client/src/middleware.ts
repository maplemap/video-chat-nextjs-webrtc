import { auth } from "../auth";
import { Route, apiAuthPrefix, authRoutes } from "../routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isAuth = !!req.auth;
  const isApiAuthURL = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthURL) {
    return null;
  }
  if (isAuthRoute) {
    if (isAuth) {
      return Response.redirect(new URL(Route.MAIN, nextUrl));
    }
    return null;
  }

  if (!isAuth) {
    let callbackURL = nextUrl.pathname;
    if (nextUrl.search) {
      callbackURL += nextUrl.search;
    }

    const encodedCallbackURL = encodeURIComponent(callbackURL);

    return Response.redirect(
      new URL(`${Route.SIGN_IN}?callbackUrl=${encodedCallbackURL}`, nextUrl),
    );
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
