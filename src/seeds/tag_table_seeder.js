/**
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('tags')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('tags').insert([
          {
            tag: "party"
          },
          {
            tag: "work"
          },
          {
            tag: "music"
          },
          {
            tag: "exercise"
          },
          {
            tag: "fun"
          },
          {
            tag: "play"
          }          
        ])
      ]);
    });
}