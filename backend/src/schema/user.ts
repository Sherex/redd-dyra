import { ObjectType, Field, Resolver, Query } from 'type-graphql'

@ObjectType({ description: 'Information about a user' })
class User {
  @Field()
  id: number

  @Field()
  username: string

  @Field()
  name: string
}

@Resolver(User)
export class UserResolver {
  @Query()
  id(): number {
    return 0
  }
  @Query()
  username(): string {
    return 'test'
  }
  @Query()
  name(): string {
    return 'Test Testy'
  }
}
