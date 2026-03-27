/**
 * What: typed route tree builder and path joining.
 * Why: one canonical way to resolve full paths from nested segment definitions.
 * What for: consumed by `route.ts` and typings in `constants/api-routes.ts` — never import `ROUTE` or `localized-href` here (avoids cycles).
 */
export type RouteNode = {
  readonly path: string
  readonly nestedPath?: Record<string, RouteNode>
}

type JoinPaths<A extends string, B extends string> = A extends "" ? B : `${A}${B}`

type Routes<T, ParentPath extends string = ""> = {
  [K in keyof T]: T[K] extends { path: infer P extends string }
    ? T[K] extends { nestedPath: infer N extends Record<string, RouteNode> }
      ? {
          /** full resolved path */
          path: JoinPaths<ParentPath, P>
          /** local segment */
          segment: P
        } & Routes<N, JoinPaths<ParentPath, P>>
      : {
          path: JoinPaths<ParentPath, P>
          segment: P
        }
    : never
}

export function joinPaths(...paths: string[]) {
  return paths.join("/").replace(/\/+/g, "/").replace(/\/$/, "")
}

export function buildRoutes<T extends Record<string, RouteNode>>(
  routes: T,
  parentPath = ""
): Routes<T> {
  const result: Record<string, unknown> = {}

  for (const key in routes) {
    const node = routes[key]
    const fullPath = joinPaths(parentPath, node.path)

    if (node.nestedPath) {
      result[key] = {
        path: fullPath,
        segment: node.path,
        ...buildRoutes(node.nestedPath, fullPath),
      }
    } else {
      result[key] = {
        path: fullPath,
        segment: node.path,
      }
    }
  }

  return result as Routes<T>
}
