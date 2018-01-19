/**
 * Create tags-todos table
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tags_todos', table => {
    table
      .integer('tag_id')
      .references('tags.id')
      .onDelete('CASCADE');
    table
      .integer('todo_id')
      .references('todos.id')
      .onDelete('CASCADE');
  });
}

/**
 * Delete tags-todos table
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema
    .dropTable('tags_todos');

}