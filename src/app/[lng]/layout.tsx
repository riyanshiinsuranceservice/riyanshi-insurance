import type { ReactNode } from "react"
import {
  initServerI18next,
  getT,
  getResources,
  generateI18nStaticParams,
} from "next-i18next/server"
import i18nConfig from "../../../i18n.config"
import AppI18nProvider from "@/components/providers/i18n-provider"
import ContextProviders from "@/components/providers"
import { SiteFloatingWhatsApp } from "@/components/layout/site-floating-whatsapp"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

// Initialize i18n on the server (runs once per request lifecycle)
initServerI18next(i18nConfig)

// Generate static routes for each language (e.g. /en, /fr)
export async function generateStaticParams() {
  return generateI18nStaticParams()
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params

  const { i18n } = await getT(["common", "home", "servicesPage"], { lng })
  const resources = getResources(i18n)

  return (
    <AppI18nProvider language={lng} resources={resources}>
      <ContextProviders>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <SiteHeader />
          {children}
          <SiteFooter lng={lng} />
          <SiteFloatingWhatsApp />
        </div>
      </ContextProviders>
    </AppI18nProvider>
  )
}
