import createKnex from 'knex'
import bcrypt from 'bcrypt'
import knexConfig from '../knexfile.js'
import { config } from '../config.js'
import { delay } from '../lib/utils.js'
import { User, UsersArgs, SignUpArgs, SignInArgs } from '../schema/user.js'
import { Session } from '../schema/session.js'
import { logger } from '../lib/logger.js'

// TODO: Try-catch all db queries and send less detailed error to GraphQL

const knex = createKnex(knexConfig)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function createUser (user: SignUpArgs) {
  const passwordHash = await bcrypt.hash(user.password, config.password.saltRounds)
  const newUser = {
    email: user.email,
    name: user.name,
    passwordHash
  }

  // TODO: Check for errors and length
  const insertUserResult = await knex('user')
    .insert(newUser)
    .returning(['id', 'email', 'name'])

  return {
    id: insertUserResult[0].id,
    email: insertUserResult[0].email,
    name: insertUserResult[0].name
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getUsers (filter?: UsersArgs) {
  let getUserQuery = knex('user')
    .select(['id', 'email', 'name', 'invitedByUserId', 'passwordHash', 'createdAt', 'updatedAt', 'deletedAt'])

  if (filter?.ids !== undefined) getUserQuery = getUserQuery.whereIn('id', filter.ids)
  if (filter?.emails !== undefined) getUserQuery = getUserQuery.whereIn('email', filter.emails)
  //                       TODO: Double check that this is sanitized VVV
  if (filter?.name !== undefined) getUserQuery = getUserQuery.where('name', 'like', `%${filter.name}%`)

  const getUserResult = await getUserQuery

  return getUserResult
}

interface CreateSessionOptions {
  deviceType?: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function createSession (user: SignInArgs, options?: CreateSessionOptions) {
  // TODO: Create getUser (singular) function
  const returnedUsers = await getUsers({ emails: [user.email] })

  if (returnedUsers.length === 0) throw new Error('Incorrect email or password')
  const currentUser = returnedUsers[0]

  if (!(await bcrypt.compare(user.password, currentUser.passwordHash))) throw new Error('Incorrect email or password')

  const newSession = {
    userId: currentUser.id,
    expiresAfterSeconds: 300,
    deviceType: options?.deviceType
  }

  const createSessionResult = await knex('userSession')
    .insert(newSession)
    .returning('*')

  await delay(Math.random() * 300)

  const createdSession = {
    ...createSessionResult[0],
    deviceType: createSessionResult[0].deviceType ?? undefined // TODO: Do this properly by correcting the type-graphql types
  }

  return createdSession
}

// TODO: Use types from db-tables.d.ts
type GetSessionFilter = Partial<Pick<Session, 'id' | 'userId'>>

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getSessions (filter: GetSessionFilter) {
  if (Object.keys(filter).length < 1) throw new Error('Please specify at least one filter')

  let getUserQuery = knex('userSession')
    .select('*')

  if (typeof filter.id === 'number') getUserQuery = getUserQuery.where('id', '=', filter.id)
  if (typeof filter.userId === 'number') getUserQuery = getUserQuery.where('userId', '=', filter.userId)

  const getSessionsResult = await getUserQuery

  return getSessionsResult.map(session => ({
    ...session,
    deviceType: session.deviceType ?? undefined // TODO: Do this properly by correcting the type-graphql types
  }))
}
