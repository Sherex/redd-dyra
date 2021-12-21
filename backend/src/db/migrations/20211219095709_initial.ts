import type { Knex } from 'knex'

type TemplateColumns = 'id' | 'createdAt' | 'updatedAt'
function tableTemplate (knex: Knex, table: Knex.TableBuilder, include?: TemplateColumns[]): void {
  if (include?.includes('id') ?? true) table.increments('id')
  if (include?.includes('createdAt') ?? true) table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
  if (include?.includes('updatedAt') ?? true) table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
}

export async function up (knex: Knex): Promise<void> {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "pgmemento"')

  await knex.schema.withSchema('public').createTable('user', table => {
    tableTemplate(knex, table)
    table.timestamp('deletedAt')
    table.text('email').notNullable().unique()
    table.text('passwordHash').notNullable()
    table.text('name').notNullable()
    table.integer('invitedByUserId').references('id').inTable('user')
  })

  await knex.schema.withSchema('public').createTable('user_session', table => {
    tableTemplate(knex, table, ['id', 'createdAt'])
    table.integer('expiresAfterSeconds').notNullable()
    table.integer('userId').references('id').inTable('user')
    table.uuid('token').notNullable().unique().defaultTo(knex.raw('uuid_generate_v1mc()'))
    table.text('deviceType')
  })

  await knex.schema.withSchema('public').createTable('join_token', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v1mc()'))
    tableTemplate(knex, table, ['createdAt'])
    table.integer('created_by_user_id').notNullable().references('id').inTable('user')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTableIfExists('user_session')
  await knex.schema.withSchema('public').dropTableIfExists('join_token')
  await knex.schema.withSchema('public').dropTableIfExists('user')
  await knex.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  await knex.schema.raw('DROP EXTENSION IF EXISTS "pgmemento"')
}
