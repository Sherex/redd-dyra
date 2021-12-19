import type { Knex } from 'knex'

type TemplateColumns = 'id' | 'created_at' | 'updated_at' | 'deleted_at'
function tableTemplate (knex: Knex, table: Knex.TableBuilder, include?: TemplateColumns[]): void {
  if (include?.includes('id') ?? true) table.increments('id')
  if (include?.includes('created_at') ?? true) table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
  if (include?.includes('updated_at') ?? true) table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  if (include?.includes('deleted_at') ?? true) table.timestamp('deleted_at') // TODO: Use history from pgMemento instead?
}

export async function up (knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').createTable('user', table => {
    tableTemplate(knex, table)
    table.text('email').notNullable().unique()
    table.text('password_hash').notNullable()
    table.text('name').notNullable()
    table.text('invited_by_user_id').notNullable().references('id')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.withSchema('public').dropTable('user')
}
