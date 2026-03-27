import { I18nProvider } from "next-i18next/client"

/**
 * Props for AppI18nProvider
 */
interface I18nProviderProps {
  language: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resources: any
  children: React.ReactNode
}

/**
 * AppI18nProvider
 *
 * Wraps the application with next-i18next client provider.
 * This enables translations on the client side using preloaded
 * resources from the server (SSR/SSG friendly).
 *
 * Why this exists:
 * - Keeps layout clean
 * - Central place to extend i18n logic later
 * - Makes provider composition scalable
 *
 * @example
 * <AppI18nProvider language="en" resources={resources}>
 *   <App />
 * </AppI18nProvider>
 */
const AppI18nProvider: React.FC<I18nProviderProps> = ({
  language,
  resources,
  children,
}) => {
  return (
    <I18nProvider language={language} resources={resources}>
      {children}
    </I18nProvider>
  )
}

export default AppI18nProvider
