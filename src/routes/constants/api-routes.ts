import type { RouteNode } from "@/routes/utils/api-routes"

/**
 * What: static segment definitions for every first-class URL in the app.
 * Why: edit paths in one place; `buildRoutes` in `index.ts` turns this into `ROUTE.*.path`.
 * What for: single source of truth for locale roots and (later) nested app paths.
 */
export const ROUTE_DEFINITIONS = {
  en: {
    path: "/en",
    nestedPath: {
      about: {
        path: "/about",
      },
      services: {
        path: "/services",
      },
      lead: {
        path: "/lead",
      },
      contact: {
        path: "/contact",
      },
    },
  },
  gu: {
    path: "/gu",
    nestedPath: {
      about: {
        path: "/about",
      },
      services: {
        path: "/services",
      },
      lead: {
        path: "/lead",
      },
      contact: {
        path: "/contact",
      },
    },
  },
} as const satisfies Record<string, RouteNode>

/**
 * What: in-page hash targets used with a locale home path.
 * Why: hashes are not part of `buildRoutes` segments; keep them beside route defs.
 * What for: anchors like `/${lng}#services` without scattering string literals.
 */
export const ROUTE_HASH = {
  about: "#about",
  services: "#services",
  contact: "#contact",
} as const
