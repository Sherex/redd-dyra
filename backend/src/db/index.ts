import bcrypt from 'bcrypt'
import { config } from '../config'
import { delay } from '../lib/utils'
import { User, UsersArgs, SignUpArgs, SignInArgs, UserSession } from '../schema/user'

export interface UserTableType extends User {
  passwordHash: string
}

export interface SessionTableType extends Omit<UserSession, 'user'> {
  userId: number
  token: string
}

// DB TEMP MOCK
let newUserId = 0
let newUserSessionId = 0
const userTable: UserTableType[] = []
const sessionTable: SessionTableType[] = []
// MOCK END

export async function createUser (user: SignUpArgs): Promise<User> {
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

export async function getUsers (filter?: UsersArgs): Promise<User[]> {
  if (Object.keys(filter ?? {}).length > 1) throw new Error('Only one filter allowed')

  let users = userTable
  if (typeof filter?.ids !== 'undefined') {
    users = filter.ids.flatMap(id =>
      users.filter(user => user.id === id)
    )
  } else if (typeof filter?.emails !== 'undefined') {
    users = filter.emails.flatMap(email =>
      users.filter(user => user.email === email)
    )
  } else if (typeof filter?.name !== 'undefined') {
    const filterName = filter.name // TS doesn't know that the arrow function below is only used here.
    users = users.filter(user => new RegExp(`${filterName}`, 'i').test(user.name))
  }

  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name
  }))
}

interface CreateSessionOptions {
  deviceType?: string
}

export async function createSession (user: SignInArgs, options?: CreateSessionOptions): Promise<SessionTableType> {
  const currentUser = userTable.find(dbUser => dbUser.email === user.email)

  if (typeof currentUser === 'undefined') throw new Error('Incorrect email or password')
  if (!(await bcrypt.compare(user.password, currentUser.passwordHash))) throw new Error('Incorrect email or password')

  const token = Math.random().toString(36).substr(2, 5)

  const newSession: SessionTableType = {
    id: newUserSessionId++,
    userId: currentUser.id,
    createdAt: Date.now(),
    expiresAt: Date.now() + 300,
    deviceType: options?.deviceType,
    token
  }
  sessionTable.push(newSession)

  await delay(Math.random() * 300)

  return newSession
}
