import { initServerI18next, getT, getResources, generateI18nStaticParams } from 'next-i18next/server'
import i18nConfig from '../../../i18n.config'
import AppI18nProvider from '@/components/providers/i18n-provider'
import ContextProviders from '@/components/providers'

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
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  // Get current language from dynamic route
  const { lng } = await params

  // Initialize i18n instance and extract resources for client
  const { i18n } = await getT()
  const resources = getResources(i18n)

  return (
    <AppI18nProvider language={lng} resources={resources}>
      <ContextProviders>
        {children}
      </ContextProviders>
    </AppI18nProvider>
  )
}