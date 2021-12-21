import {
  ObjectType,
  Field,
  Resolver,
  FieldResolver,
  Root,
  Query,
  Mutation,
  ArgsType,
  Args,
  Ctx,
  Int
} from 'type-graphql'
import * as db from '../db/index.js'
import { Context } from './context.js'
import { Session } from './session.js'
import { logger } from '../lib/logger.js'

@ObjectType({ description: 'Information about a user' })
export class User {
  // TODO: Use an opaque ID? (tablename + ID? or handlerID + ID (separate logic from data)?)
  @Field()
  id: number

  @Field()
  email: string

  @Field()
  name: string
}

@ArgsType()
export class UsersArgs {
  @Field(type => [Int], { nullable: true })
  ids?: number[]

  @Field(type => [String], { nullable: true })
  emails?: string[]

  @Field({ nullable: true })
  name?: string
}

@ArgsType()
export class SignUpArgs {
  @Field()
  email: string

  @Field()
  name: string

  @Field()
  password: string
}

@ArgsType()
export class SignInArgs {
  @Field()
  email: string

  @Field()
  password: string
}

@Resolver(of => User)
export class UserResolver {
  @Query(returns => [User])
  async users (@Args() userArgs: UsersArgs): Promise<User[]> {
    return await db.getUsers(userArgs)
  }

  @FieldResolver(type => [Session])
  async sessions (@Root() user: User): Promise<Session[]> {
    return await db.getSessions({ userId: user.id })
  }

  @Query(returns => User, { nullable: true })
  async me (
    @Ctx() ctx: Context
  ): Promise<User | null> {
    logger.debug('#### me: ', ctx.getSessionCookie('session'))
    const users = await db.getUsers({ ids: [ctx.userId] })
    if (users.length > 1) throw new Error('Got multiple users with the same ID')
    return users[0] ?? null
  }

  @Mutation(returns => User)
  async signUp (@Args() signUpArgs: SignUpArgs): Promise<User> {
    return await db.createUser(signUpArgs)
  }

  @Mutation(returns => Session)
  async signIn (
    @Args() signInArgs: SignInArgs,
    @Ctx() ctx: Context // eslint-disable-line @typescript-eslint/indent
  ): Promise<Session> {
    const session = await db.createSession(signInArgs)
    ctx.setSessionCookie(session.token)
    return {
      id: session.id,
      userId: session.userId,
      createdAt: session.createdAt,
      expiresAfterSeconds: session.expiresAfterSeconds,
      deviceType: session.deviceType
    }
  }
}
