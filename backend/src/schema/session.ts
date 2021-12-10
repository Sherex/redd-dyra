import {
  ObjectType,
  Field,
  Resolver,
  FieldResolver,
  Root,
  Query,
  Ctx
} from 'type-graphql'
import * as db from '../db'
import { Context } from '../schema/context'
import { User } from './user'

@ObjectType({ description: 'Information about a user\'s session' })
export class Session {
  @Field()
  id: number

  @Field(type => User, { name: 'user' })
  userId: number

  @Field({ nullable: true })
  deviceType?: string

  @Field()
  createdAt: number

  @Field()
  expiresAt: number
}

@Resolver(of => Session)
export class SessionResolver {
  @Query(returns => Session, { nullable: true, description: 'The current session' })
  async session (@Ctx() ctx: Context): Promise<Session | null> {
    const sessions = await db.getSessions({
      id: ctx.sessionId
    })
    return sessions[0] ?? null
  }

  @FieldResolver(type => User)
  async user (@Root() session: Session): Promise<User | null> {
    const users = await db.getUsers({ ids: [session.userId] })
    return users[0] ?? null
  }
}