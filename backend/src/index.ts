import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { fileURLToPath } from 'url'
import { dirname, resolve as pathResolve } from 'path'
import { resolvers } from './schema/index.js'
import { createContext } from './schema/context.js'
import { logger } from './lib/logger.js'
import { config } from './config.js'

logger.info(`Starting backend in a ${config.inDev ? 'development' : 'production'} environment`)

// Get the directory of this file (index.ts)
const __filename = fileURLToPath(import.meta.url) // eslint-disable-line @typescript-eslint/naming-convention
const __dirname = dirname(__filename) // eslint-disable-line @typescript-eslint/naming-convention

const schema = await buildSchema({
  resolvers: resolvers,
  emitSchemaFile: pathResolve(__dirname, 'schema.gql')
})

const server = new ApolloServer({
  schema,
  context: createContext,
  plugins: config.inDev ? [ApolloServerPluginLandingPageGraphQLPlayground] : undefined
})

const { url } = await server.listen(config.api.port)
logger.info(`Backend API is running on ${url}`)
if (config.inDev) logger.info(`GraphQL Playground is available at: ${url}`)
