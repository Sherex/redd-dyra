import { UserResolver } from './user.js'
import { SessionResolver } from './session.js'

export const resolvers = [
  UserResolver,
  SessionResolver
] as const
