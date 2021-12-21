import type { Knex } from 'knex'
import camelToSnake from 'decamelize'
import snakeToCamelObj from 'camelcase-keys'
import { config } from './config.js'
import { logger } from './lib/logger.js'

const knexLogger = logger.child({
  logger: 'knexLogger'
})

const knexFileConfig: Knex.Config = {
  client: 'pg',
  connection: config.dbConnection,
  wrapIdentifier: (value, origImpl) => origImpl(camelToSnake(value)),
  postProcessResponse: result => snakeToCamelObj(result, { deep: true }),
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  },
  log: {
    warn: msg => knexLogger.warn(msg),
    error: msg => knexLogger.error(msg),
    deprecate: msg => knexLogger.warn(msg),
    debug: msg => knexLogger.debug(msg)
  },
  debug: true
}

export default knexFileConfig
