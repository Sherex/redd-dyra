import bcrypt from 'bcrypt'
import { config } from '../config'
import { User, UsersArgs, SignUpArgs } from '../schema/user'

export interface UserTableType extends User {
  passwordHash: string
}

// DB TEMP MOCK
let newUserId = 0
const userTable: UserTableType[] = []
// MOCK END

export async function createUser (user: SignUpArgs) {
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

export async function getUsers (filter?: UsersArgs) {
  if (filter && Object.keys(filter).length > 1) throw new Error('Only one filter allowed')

  let users = userTable
  if (filter?.ids) {
    users = filter.ids.flatMap(id =>
      users.filter(user => user.id === id)
    )
  } else if (filter?.emails) {
    users = filter.emails.flatMap(email =>
      users.filter(user => user.email === email)
    )
  } else if (filter?.name) {
    users = users.filter(user => new RegExp(`${filter.name}`, 'i').test(user.name))
  }

  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name
  }))
}
