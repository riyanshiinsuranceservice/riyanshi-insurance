import type { I18nConfig } from 'next-i18next/proxy'

const resources = {
  en: {
    common: () => import('./src/app/i18n/locales/en/common.json'),
  },
  gu: {
    common: () => import('./src/app/i18n/locales/gu/common.json'),
  },
}


const i18nConfig: I18nConfig = {
  supportedLngs: ['gu', 'en'],
  fallbackLng: 'gu',
  defaultNS: 'common',
  ns: ['common'],

  resourceLoader: (language: string, namespace: string) => {
    return (resources as any)?.[language]?.[namespace]?.()
  },
}

export default i18nConfig