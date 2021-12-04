import {
  ObjectType,
  Field,
  Resolver,
  ResolverInterface,
  Query,
  Mutation,
  ArgsType,
  Args,
  Arg
} from 'type-graphql'
import * as db from '../db'

@ObjectType({ description: 'Information about a user' })
export class User {
  // TODO: Use an opaque ID? (tablename + ID? or handlerID + ID (separate logic from data)?)
  @Field()
  id: number

  @Field()
  username: string

  @Field()
  name: string
}

@ArgsType()
class SignUpArgs {
  @Field()
  username: string
  @Field()
  name: string
  @Field()
  password: string
}
@Resolver()
export class UserResolver {
  @Query(returns => [User])
  users(
    @Arg('name', { nullable: true }) name?: string
  ): Promise<User[]> {
    return db.getUsers({ name })
  }

  @Mutation(returns => User)
  async signUp(@Args() userArgs: SignUpArgs) {
    return await db.createUser(userArgs)
  }
}
