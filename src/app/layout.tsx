import type { Metadata } from "next"
import { Inter, Manrope, Noto_Sans_Gujarati } from "next/font/google"

import { SITE_CONFIG, getSiteBaseUrl } from "@/site-config"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const notoSansGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "700"],
  variable: "--font-noto-gujarati",
  display: "swap",
})

/**
 * What: global fallbacks and `metadataBase` for relative URL resolution in child metadata.
 * Why: per-locale pages override title/description via `generateSeoMetaData`; root still supplies defaults for non-localized shells.
 */
export const metadata: Metadata = {
  metadataBase: new URL(getSiteBaseUrl()),
  title: {
    default: SITE_CONFIG.seo.defaultTitle,
    template: SITE_CONFIG.seo.titleTemplate,
  },
  description: SITE_CONFIG.seo.defaultDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${notoSansGujarati.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  )
}
