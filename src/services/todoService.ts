import * as Boom from 'boom';
import knex from '../config/db';
import lang from '../utils/lang';
import TodoBody from '../domain/TodoBody';
import UpdateTodo from '../domain/UpdateTodo';

/**
 * Fetch all user
 *
 * @returns Promise
 */
export function fetchAlltodos(): Promise<{}> {
  return knex('todos')
    .select()
    .then((data: {}) => ({data}));
}

/**
 * Fetch user by id
 *
 * @param  {number} id
 */
export function fetchTodoById(id: number) {
  return knex('todos')
    .where('id', '=', id)
    .first()
    .then((todo: {}) => {
      if (!todo) {
        throw Boom.notFound(lang.todoNotFound);
      }
      return { data: todo };
    });
}

/**
 * Create todo
 *
 * @param  {RegisterBody} body
 * @returns Promise
 */
export function createTodo(body: TodoBody): Promise<{}> {
  return knex('todos')
    .insert({ task: body.task, details: body.details })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }));
}


/**
 * Update todo by id
 *
 * @param  {UpdateBody} body
 * @returns Promise
 */
export function updateTodo(body: UpdateTodo): Promise<{}> {
  return knex('todos')
    .where('id', body.id)
    .update({ 
      task: body.task,
      details: body.details
    })
    .returning('*')
    .then((data: number[]) => ({ data: data[0] }));
}


/**
 * Remove specific todo
 *
 * @param  {number} id
 * @returns Promise
 */
export function removeTodoById(id: number): Promise<{}> {
  return knex('todos')
    .where('id', id)
    .delete()
    .then((todo: {}) => ({
      message: 'Todo deleted successfully',
      data: {
        id: todo
      }
    }));
}