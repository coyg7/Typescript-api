import Knex, { SchemaBuilder } from 'knex';


/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tokens', table => {
    table.increments('id').primary();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable();
    table.integer('user_id').unique().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tokens');
}