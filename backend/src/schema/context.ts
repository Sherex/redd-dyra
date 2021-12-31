import cookie from 'cookie'
import type { Request, Response } from 'express'

import { getSessionFromToken } from '../db/index.js'
import { logger } from '../lib/logger.js'

interface ExpressContext {
  req: Request
  res: Response
}
interface Cookies {
  session?: string
}

export interface Context {
  userId: number | null
  sessionId: number | null
  cookies: Cookies
  setCookie: (name: keyof Cookies, value: string) => void
}

export async function createContext ({ req, res }: ExpressContext): Promise<Context> {
  const context: Context = {
    userId: null,
    sessionId: null,
    cookies: cookie.parse(req.headers.cookie ?? ''),
    setCookie: (name, value) => { res.cookie(name, value, { httpOnly: true }) } // TODO: Double-check cookie security
  }

  if (typeof context.cookies.session === 'string') {
    logger.debug('request has session token')
    const session = await getSessionFromToken(context.cookies.session)
    if (session !== null) {
      logger.debug('found existing session from session token')
      context.userId = session.userId
      context.sessionId = session.id
    }
  }

  return context
}
