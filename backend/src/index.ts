import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { fileURLToPath } from 'url'
import { dirname, resolve as pathResolve } from 'path'
import { resolvers } from './schema/index.js'
import { createContext } from './schema/context.js'

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
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground
  ]
})

const { url } = await server.listen(4000)
console.log(`Server is running, GraphQL Playground available at ${url}`)
