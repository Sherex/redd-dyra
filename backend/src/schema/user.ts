import {
  ObjectType,
  Field,
  Resolver,
  ResolverInterface,
  Query,
  Mutation,
  ArgsType,
  Args,
  Arg,
  Ctx,
  Int  
} from 'type-graphql'
import * as db from '../db'
import { Context } from '../schema/context'

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

@Resolver()
export class UserResolver {
  @Query(returns => [User])
  async users(@Args() userArgs: UsersArgs): Promise<User[]> {
    return db.getUsers(userArgs)
  }

  @Query(returns => User)
  async me(
    @Ctx() ctx: Context
  ): Promise<User> {
    const users = await db.getUsers({ ids: [ctx.userId] })
    if (users.length < 1) throw new Error('User ID not found')
    if (users.length > 1) throw new Error('Got multiple users with the same ID')
    return users[0]
  }

  @Mutation(returns => User)
  async signUp(@Args() signUpArgs: SignUpArgs) {
    return await db.createUser(signUpArgs)
  }
}
