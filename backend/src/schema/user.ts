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
import * as db from '../db'
import { Context } from '../schema/context'

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

@ObjectType({ description: 'Information about a user\'s session' })
export class UserSession {
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

@Resolver()
export class UserResolver {
  @Query(returns => [User])
  async users (@Args() userArgs: UsersArgs): Promise<User[]> {
    return await db.getUsers(userArgs)
  }

  @Query(returns => User)
  async me (
    @Ctx() ctx: Context
  ): Promise<User> {
    console.log('#### me: ', ctx.getSessionCookie('session'))
    const users = await db.getUsers({ ids: [ctx.userId] })
    if (users.length < 1) throw new Error('User ID not found')
    if (users.length > 1) throw new Error('Got multiple users with the same ID')
    return users[0]
  }

  @Mutation(returns => User)
  async signUp (@Args() signUpArgs: SignUpArgs): Promise<User> {
    return await db.createUser(signUpArgs)
  }

  @Mutation(returns => UserSession)
  async signIn (
    @Args() signInArgs: SignInArgs,
    // eslint-disable-next-line @typescript-eslint/indent
    @Ctx() ctx: Context
  ): Promise<UserSession> {
    const session = await db.createSession(signInArgs)
    ctx.setSessionCookie(session.token)
    return {
      id: session.id,
      userId: session.userId,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
      deviceType: session.deviceType
    }
  }
}

@Resolver(of => UserSession)
export class UserSessionResolver {
  @FieldResolver(type => User)
  async user (@Root() userSession: UserSession): Promise<User | null> {
    const users = await db.getUsers({ ids: [userSession.userId] })
    return users[0] ?? null
  }
}