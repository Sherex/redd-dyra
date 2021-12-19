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
    password_hash: string
    name: string
    // If null; added by system
    invited_by_user_id: number | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
  }

  interface Tables {
    user: Knex.CompositeTableType<
    // Base (Select, where, etc.)
    User,
    // Insert
    Pick<User, 'name' | 'email' | 'invited_by_user_id' | 'password_hash'>
    >
  }
}
