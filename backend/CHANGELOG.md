# Changelog

### [0.1.1](https://github.com/Sherex/redd-dyra/compare/backend-v0.1.0...backend-v0.1.1) (2022-05-25)


### Features

* add `me` query and clean up typings ([1d99720](https://github.com/Sherex/redd-dyra/commit/1d997207e9291b3ced15b7d258cc9c3ae35fdad5))
* add basic GraphQL boilerplate ([c74515f](https://github.com/Sherex/redd-dyra/commit/c74515fc7a63816ee6a4bd01eaf213df5611dde9))
* add createSession and signIn schema ([dbeb4ac](https://github.com/Sherex/redd-dyra/commit/dbeb4aca4e5b8ac63d391138ff935af0af705eba))
* add inDev, api.port and log.level to config ([6ce92e8](https://github.com/Sherex/redd-dyra/commit/6ce92e8bb0883a789ddc914e04bcb7a190f8a5d9))
* add mocked db calls and expand user schema ([b5f0e75](https://github.com/Sherex/redd-dyra/commit/b5f0e7537bcdcecd3264f49cd68a777a449c5e1d))
* add pino logger ([e70b8e3](https://github.com/Sherex/redd-dyra/commit/e70b8e317b4f6c8a58b8c06a63424db26d5958a7))
* add sessions query, session field on user and split user and session resolvers ([2ee79e4](https://github.com/Sherex/redd-dyra/commit/2ee79e4317cb9dfeb4b9dfb9c76411a8f2f08316))
* add types for tables in db and tooling ([9310b28](https://github.com/Sherex/redd-dyra/commit/9310b28717b8a47b556279df0d4c132600bb2d36))
* add user_session and join_token table creation queries ([ec0e9c9](https://github.com/Sherex/redd-dyra/commit/ec0e9c9189b510c9d89c3144b0e9e13a6be1d1e3))
* **api:** parse cookies in createContext ([ba88cf6](https://github.com/Sherex/redd-dyra/commit/ba88cf6fb7d394073702d9284c0f2eb7dac9783f))
* **db:** add and configure knex with initial migration ([380816c](https://github.com/Sherex/redd-dyra/commit/380816cb9034f1b133ae4a7fe888ea3469a96efe))
* **logger:** add pino logger to Knex ([f3b9551](https://github.com/Sherex/redd-dyra/commit/f3b9551bbb89f3668fb665add3853ec086af54b8))
* use knex in db instead of temp ([444a9da](https://github.com/Sherex/redd-dyra/commit/444a9da16738fee916a7489b4ecf22c52c27ff1c))


### Bug Fixes

* add Date replacer for *At columns ([1f1ffe0](https://github.com/Sherex/redd-dyra/commit/1f1ffe0b1debd64b04c92360d35459d089ef8925))
* change username to email ([cde5334](https://github.com/Sherex/redd-dyra/commit/cde53340b79248d53e02f7ddd853eeab98d84e74))
* **db:** fix columns and down migration ([32f3d0c](https://github.com/Sherex/redd-dyra/commit/32f3d0c4ce23b2921a55a1ecad8aaf4df7f253ea))
