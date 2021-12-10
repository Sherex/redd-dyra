import type { Request, Response } from 'express'

interface ExpressContext {
  req: Request
  res: Response
}

export interface Context {
  userId: number
  sessionId: number
  setSessionCookie: (token: string) => void
  getSessionCookie: (token: string) => string
}

export function createContext ({ req, res }: ExpressContext): Context {
  return {
    userId: 0,
    sessionId: 0,
    setSessionCookie: (token: string) => { res.cookie('session-cookie', token, { httpOnly: true }) },
    getSessionCookie: (): any => req.cookies?.session // BUG: Cookies are not saved in the browser
  }
}
