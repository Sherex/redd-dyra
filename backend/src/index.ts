import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import path from 'path'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { resolvers } from './schema'
import { createContext } from './schema/context'

;(async () => {
  const schema = await buildSchema({
    resolvers: resolvers,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
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
})().catch(error => console.error(error))
