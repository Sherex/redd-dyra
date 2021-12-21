import type { Knex } from 'knex'

// https://knexjs.org/#typescript-support

declare module 'knex/types/tables' {
  type SnakeToCamel<S extends string> =
    S extends `${infer T}_${infer U}`
      ? `${T}${Capitalize<SnakeToCamel<U>>}`
      : S

  type ObjectSnakeToCamel<Type> = {
    [Property in keyof Type as Property extends string ? SnakeToCamel<Property> : Property]: Type[Property]
  }
  interface User {
    id: number
    email: string
    passwordHash: string
    name: string
    // If null; added by system
    invitedByUserId: number | null
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }

  interface Tables {
    user: Knex.CompositeTableType<
    // Base (Select, where, etc.)
    User,
    // Insert
    Pick<User, 'name' | 'email' | 'invitedByUserId' | 'passwordHash'>
    >
  }
}
