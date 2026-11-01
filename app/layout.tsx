import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { meta } from "@/data/proposal";
import { siteUrl } from "@/lib/site";
import { DEFAULT_THEME, THEME_STORAGE_KEY, themeColor } from "@/lib/theme";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  adjustFontFallback: true,
});

const url = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: meta.title,
  description: meta.description,
  applicationName: "BulgariTech DevRel proposal",
  authors: [{ name: "Kristiyan Velkov", url: "https://kristiyanvelkov.com/" }],
  creator: "BulgariTech EOOD",
  publisher: "BulgariTech EOOD",
  alternates: { canonical: "/" },
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "en_GB",
    siteName: "BulgariTech",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.shortTitle,
    description: meta.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: themeColor(DEFAULT_THEME),
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} h-full antialiased`}
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <Script id="theme-init" strategy="beforeInteractive">
        {`(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var theme=t==="dark"||t==="light"?t:${JSON.stringify(DEFAULT_THEME)};document.documentElement.setAttribute("data-theme",theme);}catch(e){document.documentElement.setAttribute("data-theme",${JSON.stringify(DEFAULT_THEME)});}})();`}
      </Script>
      <body className="min-h-full font-sans text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
