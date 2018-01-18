import bookshelf from '../config/db';
import user from './user';
import tags from './tags';

const TABLE_NAME = 'todos';

/**
 * Todo model
 */

 class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  } 

  get hasTimestamps() {
    return true;
  }

  // user() {
  //   return this.belongsTo(user);
  // }

  // tags() {
  //   return this.belongsToMany(tags);
  // }
 }

 export default Todo;