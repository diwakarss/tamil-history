import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Middleware for internationalized routing
 * 
 * Handles redirects and locale detection based on the routing configuration.
 * It will redirect requests to the root path (/) to the default locale (/en).
 */
export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ta|en)/:path*"],
};
