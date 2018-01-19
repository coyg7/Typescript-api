/**
 * Create table for storing refresh tokens
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tokens', table => {
    table.increments('id').primary();
    table.timestamps(true, true);
    table.string('token').notNull();
    table
      .integer('user_id')
      .unique()
      .notNull();
    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');
  });
}

/**
 * Drop table for storing refresh tokens
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tokens');
}