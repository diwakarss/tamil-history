import {
  Cormorant_Garamond,
  Playfair_Display,
  Noto_Sans_Tamil,
} from "next/font/google";

// ============================================================================
// Font Configurations - Ink on Paper Aesthetic
// ============================================================================

/**
 * Cormorant Garamond - Primary body text font
 *
 * Elegant serif for body text, providing the "ink on paper" aesthetic.
 * Light, readable, and historically appropriate for Tamil history content.
 */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

/**
 * Playfair Display - Display/heading font
 *
 * High-contrast serif for headings, dates, and display text.
 * Creates visual hierarchy and emphasis for key content.
 */
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Noto Sans Tamil - Tamil script support
 *
 * Essential for proper Tamil diacritics, ligatures, and character rendering.
 * Applied to Tamil language content throughout the application.
 */
export const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "600", "700"],
  variable: "--font-tamil",
  display: "swap",
});

// ============================================================================
// Font Class Application
// ============================================================================

/**
 * Combined CSS class string for applying all fonts to the document root
 *
 * Activates CSS custom properties:
 * - --font-body: Cormorant Garamond (body text)
 * - --font-display: Playfair Display (headings, dates)
 * - --font-tamil: Noto Sans Tamil (Tamil script)
 */
export const fontClasses = `${cormorantGaramond.variable} ${playfairDisplay.variable} ${notoSansTamil.variable}`;
