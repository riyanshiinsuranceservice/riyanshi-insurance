"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function getMatches() {
  return window.matchMedia(QUERY).matches
}

/**
 * What: stable mobile viewport detection for layout components (e.g. sidebar sheet vs rail).
 * Why: `useSyncExternalStore` matches SSR (`false`) then updates from `matchMedia` without hydration mismatches.
 */
export function useIsMobile() {
  const subscribe = React.useCallback((onStoreChange: () => void) => {
    const mql = window.matchMedia(QUERY)
    mql.addEventListener("change", onStoreChange)
    return () => mql.removeEventListener("change", onStoreChange)
  }, [])

  const getSnapshot = React.useCallback(() => getMatches(), [])

  const getServerSnapshot = React.useCallback(() => false, [])

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
