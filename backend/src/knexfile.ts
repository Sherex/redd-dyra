import type { Knex } from 'knex'
import { config } from './config'

const knexFileConfig: Knex.Config = {
  client: 'pg',
  connection: config.dbConnection,
  // wrapIdentifier: (value, origImpl) => origImpl(camelToSnake(value)), // TODO: Add camelToSnake function
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  },
  debug: true
}

export default knexFileConfig
