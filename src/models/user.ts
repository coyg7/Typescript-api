import bookshelf from '../config/db';
import todo from './todo';
import token from './tokens';
import * as Bookshelf from 'bookshelf';

const TABLE_NAME = 'users';

/**
 * Users model
 */

 class User extends bookshelf.Model <User>{
   get tableName() {
     return TABLE_NAME;
   }

   get hasTimestamps() {
     return true;
   }

  //  todo() {
  //    return this.hasMany(todo);
  //  }

  //  token() {
  //    return this.hasOne(token);
  //  }
 }

 export default User;