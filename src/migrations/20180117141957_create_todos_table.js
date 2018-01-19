/**
 * Create todo table
 * 
 * @param  {object} knex
 * @return {Promise}
 */

// import users from '../models/user';

export function up(knex) {
  return knex.schema.createTable('todos', table => {
    table.increments('id').primary();
    table.timestamps(true, true);
    table.string('task').notNull();
    table.string('details').notNull();
    table.integer('user_id').references('users.id').onDelete('CASCADE');
  });
}

/**
 * Drop todos table
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('todos');
}