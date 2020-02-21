
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
        {username: 'Don', password: '123'},
        {username: 'Sara', password: '123'}
      ])
    }