import { ReactNode } from "react";

/**
 * Root layout component
 * 
 * This is a minimal root layout required by Next.js.
 * Most of the layout logic is handled in the locale-specific layout.
 * 
 * @property children - The content to render
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
