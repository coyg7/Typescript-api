import Todo from './todo';
import Token from './tokens';
import bookshelf from '../config/db';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'users';

/**
 * Users model
 */

class User extends bookshelf.Model<User>{
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  todo(): Bookshelf.Collection<Todo> {
    return this.hasMany(Todo);
  }

  token(): Bookshelf.Model<Token> {
    return this.hasOne(Token);
  }
}

export default User;