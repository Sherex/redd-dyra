import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import path from 'path'
import { ApolloServer } from "apollo-server"
import { UserResolver } from './schema/user'
import { createContext } from './schema/context'

(async () => {
const schema = await buildSchema({
  resolvers: [UserResolver],
  emitSchemaFile: path.resolve(__dirname, "schema.gql"),
});

const server = new ApolloServer({
  schema,
  context: createContext
});

const { url } = await server.listen(4000);
console.log(`Server is running, GraphQL Playground available at ${url}`)
})()
