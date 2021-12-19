# Redd-dyra Backend
This contains a GraphQL API that talks with a PostgreSQL DB through some business logic.

## Development
### Commands
| Action | Command | Note |
|-|-|-|
| Install dependencies | `npm install` | |
| Start DB docker | `npm run db:start` | Requires Docker and Docker Compose |
| Run Knex.js commands | `npm run knex {command}` | Run `npm run knex -- --help` for info |
| Migrate to latest | `npm run knex migrate:latest` | Apply schema and all migrations to DB |
| Start dev server | `npm run dev` | |

### Knex.js
- Adding a new table
  1. Add table to Vuerd [[Github](https://github.com/vuerd/vuerd/) | [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode)]
  2. Export/create a TS type for the table in [knex-tables.d.ts](backend/src/db/knex-tables.d.ts)
  3. Create a migration for it with `npm run migrate:make {migration name}`