import type { Request, Response } from 'express'

interface ExpressContext {
  req: Request
  res: Response
}

export function createContext ({ req, res }: ExpressContext) {
  return {
    userId: 0,
    setSessionCookie: (token: string) => { res.cookie('session-cookie', token, { httpOnly: true }) },
    getSessionCookie: (): any => req.cookies.session // BUG: Cookies are not saved in the browser
  }
}

export type Context = ReturnType<typeof createContext>