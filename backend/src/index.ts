import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import {
  PluginDefinition,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'

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

const app = express()
const httpServer = http.createServer(app)

const plugins: PluginDefinition[] = [
  ApolloServerPluginDrainHttpServer({ httpServer })
]
if (config.inDev) plugins.push(ApolloServerPluginLandingPageGraphQLPlayground)

const server = new ApolloServer({
  schema,
  context: createContext,
  plugins
})

await server.start()
server.applyMiddleware({
  app,
  path: config.api.path
})

await new Promise<void>(resolve => httpServer.listen({ port: config.api.port }, resolve))

logger.info('Backend API is running')
// TODO: Should be more dynamic, dynamic hostname/domain and use join path
if (config.inDev) logger.info(`GraphQL Playground is available at: http://localhost:${config.api.port}${server.graphqlPath}`)
