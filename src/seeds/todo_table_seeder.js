/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('todos').insert([
          {
            task: 'shopping',
            details: 'buy fish and eggs'
          },
          {
            task: 'exercise',
            details: 'hit the gym'
          },
          {
            task: 'walk',
            details: 'go to the park'
          }
        ])
      ]);
    });
}