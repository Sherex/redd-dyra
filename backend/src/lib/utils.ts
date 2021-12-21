import { fileURLToPath } from 'url'
import { dirname, resolve as pathResolve } from 'path'

export const delay = async (ms: number): Promise<void> => await new Promise(resolve => setTimeout(resolve, ms))

interface GetCurrentPathReturn {
  __filename: string
  __dirname: string
  resolvedPath?: string
}

export function getCurrentPath (importMeta: ImportMeta): Omit<GetCurrentPathReturn, 'resolvedPath'>
export function getCurrentPath (importMeta: ImportMeta, resolveTo: string): Required<GetCurrentPathReturn>
export function getCurrentPath (importMeta: ImportMeta, resolveTo?: string): GetCurrentPathReturn {
  const __filename = fileURLToPath(importMeta.url) // eslint-disable-line @typescript-eslint/naming-convention
  const __dirname = dirname(__filename) // eslint-disable-line @typescript-eslint/naming-convention

  const resolvedPath = typeof resolveTo === 'string' ? pathResolve(__dirname, resolveTo) : undefined

  return {
    __filename,
    __dirname,
    resolvedPath
  }
}
