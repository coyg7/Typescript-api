import config from './config';
import * as client from 'knex';
import * as bookshelfJs from 'bookshelf';

/**
 * Database connection.
 */
export const knex = client(config.database);

const bookshelf = bookshelfJs(knex);

bookshelf.plugin([
  'virtuals',
  'pagination',
  'visibility',
  'bookshelf-camelcase'
]);

export default bookshelf;


/**
 * Database connection.
 */

