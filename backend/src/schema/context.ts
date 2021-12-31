import cookie from 'cookie'
import type { Request, Response } from 'express'

interface ExpressContext {
  req: Request
  res: Response
}
interface Cookies {
  session?: string
}

export interface Context {
  userId: number
  sessionId: number
  setCookie: (name: keyof Cookies, value: string) => void
  cookies: Cookies
}

export async function createContext ({ req, res }: ExpressContext): Promise<Context> {
  const cookies = cookie.parse(req.headers.cookie ?? '') as Cookies
  return {
    userId: 0,
    sessionId: 0,
    setCookie: (name, value) => { res.cookie(name, value, { httpOnly: true }) }, // TODO: Double-check cookie security
    cookies
  }
}
