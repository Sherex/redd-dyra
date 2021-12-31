// TODO: Configuration with env vars
export const config = {
  inDev: process.env.NODE_ENV !== 'production',
  api: {
    port: 4000,
    path: '/graphql'
  },
  log: {
    level: 'debug'
  },
  password: {
    saltRounds: 10
  },
  dbConnection: { // Local dev settings using docker-compose file
    host: 'localhost',
    port: 5432,
    user: 'postgres', // TODO: Use redd-dyra
    password: 'redd_alle_dyrene!',
    database: 'redd_dyra'
  }
}
