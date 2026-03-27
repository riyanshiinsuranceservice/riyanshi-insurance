import type { I18nConfig } from "next-i18next/proxy"

import enCommon from "./src/app/i18n/locales/en/common.json"
import enHome from "./src/app/i18n/locales/en/home.json"
import enServicesPage from "./src/app/i18n/locales/en/services-page.json"
import guCommon from "./src/app/i18n/locales/gu/common.json"
import guHome from "./src/app/i18n/locales/gu/home.json"
import guServicesPage from "./src/app/i18n/locales/gu/services-page.json"

/**
 * Pre-bundled locale maps (static JSON imports).
 * Dynamic `import("./file.json")` often yields `{ default: { ... } }`, which i18next
 * treats as nested keys so `t("nav.home")` misses and prints the key. Static imports
 * provide the plain object shape i18next expects.
 */
const i18nConfig: I18nConfig = {
  supportedLngs: ["gu", "en"],
  fallbackLng: "gu",
  defaultNS: "common",
  ns: ["common", "home", "servicesPage"],
  resources: {
    en: { common: enCommon, home: enHome, servicesPage: enServicesPage },
    gu: { common: guCommon, home: guHome, servicesPage: guServicesPage },
  },
}

export default i18nConfig
