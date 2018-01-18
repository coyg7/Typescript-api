import Knex, { SchemaBuilder } from 'knex';

// import tags from '../models/tags';
// import todo from '../models/todo';


/**
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tags_todo', table => {
    table.integer('tag_id').references('tags.id').onDelete('CASCADE');
    table.integer('todo_id').references('todos.id').onDelete('CASCADE');
  });
}

/**
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tags_todo')
    .dropTable('tags')
    .dropTable('todo');
}