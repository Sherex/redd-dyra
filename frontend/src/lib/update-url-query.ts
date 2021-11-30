import router from '../router'

interface UpdateUrlQueryOptions {
  /** Path to navigate to. Defaults to current path. */
  path?: string
  /** Either `push` the new URL to the history or `replace` the current entry. Defaults to `replace` */
  action?: 'push' | 'replace'
}

export async function updateUrlQuery (newQuery: string | undefined, options?: UpdateUrlQueryOptions) {
  return await router[options?.action ?? 'replace']({
    path: options?.path ?? router.currentRoute.value.path,
    query: {
      ...router.currentRoute.value.query,
      query: newQuery
    }
  })
}
