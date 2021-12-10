import { UserResolver } from './user'
import { SessionResolver } from './session'

export const resolvers = [
  UserResolver,
  SessionResolver
] as const
