export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"], // route protection, for example when not logged it. this will redirect ot login page
};
