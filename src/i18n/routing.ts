import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * i18n routing configuration
 * 
 * Defines the supported locales and the default locale for the application.
 * This configuration is shared between the middleware, the i18n request handler,
 * and the navigation components.
 */
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ta"],

  // Used when no locale matches
  defaultLocale: "en",
});

// Lightweight wrappers around Next.js navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
