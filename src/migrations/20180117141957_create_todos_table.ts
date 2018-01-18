import Knex, { SchemaBuilder } from 'knex';

/**
 * Create todo table
 * 
 * @param  {object} knex
 * @return {Promise}
 */

// import users from '../models/user';

export function up(knex) {
  return knex.schema.createTable('todos', table => {
    table.increments();
    table.string('task').notNullable();
    table.string('details').notNullable();
    table.integer('user_id').references('users.id').onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('todos');
}