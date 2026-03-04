import "../globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { fontClasses } from "@/fonts";
import { routing } from "@/i18n/routing";

interface MetadataProps {
  params: Promise<{ locale: string }>;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FDFBF7",
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "header" });

  return {
    title: t("title"),
    description: t("subtitle"),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      type: "website",
      locale: locale === "ta" ? "ta_IN" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;

  // Enable static rendering for better performance
  setRequestLocale(locale);

  // Fetch locale-specific translation messages for the next-intl client provider
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={fontClasses}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
