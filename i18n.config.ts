import type { I18nConfig } from "next-i18next/proxy"

import enCommon from "./src/app/i18n/locales/en/common.json"
import enHome from "./src/app/i18n/locales/en/home.json"
import enServicesPage from "./src/app/i18n/locales/en/services-page.json"
import enAboutPage from "./src/app/i18n/locales/en/about-page.json"
import enContactPage from "./src/app/i18n/locales/en/contact-page.json"
import enLeadLanding from "./src/app/i18n/locales/en/lead-landing.json"
import guCommon from "./src/app/i18n/locales/gu/common.json"
import guHome from "./src/app/i18n/locales/gu/home.json"
import guServicesPage from "./src/app/i18n/locales/gu/services-page.json"
import guAboutPage from "./src/app/i18n/locales/gu/about-page.json"
import guContactPage from "./src/app/i18n/locales/gu/contact-page.json"
import guLeadLanding from "./src/app/i18n/locales/gu/lead-landing.json"

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
  ns: ["common", "home", "servicesPage", "aboutPage", "leadLanding", "contactPage"],
  resources: {
    en: {
      common: enCommon,
      home: enHome,
      servicesPage: enServicesPage,
      aboutPage: enAboutPage,
      leadLanding: enLeadLanding,
      contactPage: enContactPage,
    },
    gu: {
      common: guCommon,
      home: guHome,
      servicesPage: guServicesPage,
      aboutPage: guAboutPage,
      leadLanding: guLeadLanding,
      contactPage: guContactPage,
    },
  },
}

export default i18nConfig
