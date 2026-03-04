import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

/**
 * Root page component
 * 
 * Redirects the user to the default locale when they
 * access the root URL (/).
 * 
 * @description This is a server component that performs a redirect to the
 * default locale defined in the i18n routing configuration. This ensures
 * that users arriving at the root path are automatically sent to the correct
 * language version of the site.
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
