/**
 * Create todo table
 * 
 * @param  {object} knex
 * @return {Promise}
 */

export function up(knex) {
  return knex.schema.createTable('todos', table => {
    table.increments();
    table.string('task').notNull();
    table.string('details').notNull();
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