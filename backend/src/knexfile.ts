import type { Knex } from 'knex'
import camelToSnake from 'decamelize'
import snakeToCamelObj from 'camelcase-keys'
import { config } from './config.js'

const knexFileConfig: Knex.Config = {
  client: 'pg',
  connection: config.dbConnection,
  wrapIdentifier: (value, origImpl) => origImpl(camelToSnake(value)),
  postProcessResponse: result => snakeToCamelObj(result, { deep: true }),
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  },
  debug: true
}

export default knexFileConfig
