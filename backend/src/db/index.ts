import bcrypt from 'bcrypt'
import { config } from '../config'
import { User } from '../schema/user'

export interface UserTableType extends User {
  passwordHash: string
}

// DB TEMP MOCK
let newUserId = 0
const userTable: UserTableType[] = []
// MOCK END


export interface CreateUserOptions extends Pick<User, 'email' | 'name'> {
  password: string
}

export async function createUser (user: CreateUserOptions) {
  const passwordHash = await bcrypt.hash(user.password, config.password.saltRounds)
  const newUser = {
    id: newUserId++,
    email: user.email,
    name: user.name,
    passwordHash
  }

  userTable.push(newUser)

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name
  }
}

interface GetUsersOptions {
  name?: string
}

export async function getUsers (options?: GetUsersOptions) {
  let users = userTable
  if (options?.name) {
    users = users.filter(user => new RegExp(`${options.name}`).test(user.name))
  }

  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name
  }))
}
