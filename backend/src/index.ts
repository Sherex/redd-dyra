import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { resolvers } from './schema/index.js'
import { createContext } from './schema/context.js'
import { logger } from './lib/logger.js'
import { config } from './config.js'
import { getCurrentPath } from './lib/utils.js'

logger.info(`Starting backend in a ${config.inDev ? 'development' : 'production'} environment`)

const schema = await buildSchema({
  resolvers: resolvers,
  emitSchemaFile: getCurrentPath(import.meta, 'schema.gql').resolvedPath
})

const server = new ApolloServer({
  schema,
  context: createContext,
  plugins: config.inDev ? [ApolloServerPluginLandingPageGraphQLPlayground] : undefined
})

const { url } = await server.listen(config.api.port)
logger.info(`Backend API is running on ${url}`)
if (config.inDev) logger.info(`GraphQL Playground is available at: ${url}`)
