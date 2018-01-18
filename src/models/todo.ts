import User from './user';
import Tags from './tags';
import bookshelf from '../config/db';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'todos';

/**
 * Todo model
 */
class Todo extends bookshelf.Model<Todo> {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  user(): Bookshelf.Model<User> {
    return this.belongsTo(User);
  }

  tags(): Bookshelf.Collection<Tags> {
    return this.belongsToMany(Tags);
  }
}

export default Todo;