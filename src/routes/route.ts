import { ROUTE_DEFINITIONS, ROUTE_HASH } from "@/routes/constants/api-routes"
import { buildRoutes } from "@/routes/utils/api-routes"

const _locale = buildRoutes(ROUTE_DEFINITIONS)

/**
 * What: all resolved paths + shared hash fragments for this app.
 * Why: import `ROUTE` (and `localizedHref` from utils) instead of hardcoding `href`s.
 * What for: header, footer, pages, and future Stitch implementations.
 */
export const ROUTE = {
  ..._locale,
  hash: ROUTE_HASH,
} as const
