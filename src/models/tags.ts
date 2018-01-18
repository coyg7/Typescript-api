import bookshelf from '../db';
import todo from '../models/todo';

const TABLE_NAME = 'tags';

/**
 * Tags model
 */

 class Tags extends bookshelf.Model {
   get tableName() {
     return TABLE_NAME;
   }

   get hasTimestamps() {
     return true;
   }

   todo() {
     this.belongsToMany(todo);
   }
 }

 export default Tags;