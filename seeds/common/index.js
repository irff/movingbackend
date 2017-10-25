const uuidV4 = require('uuid/v4')

exports.seed = (knex, Promise) => {
  const bcrypt = Promise.promisifyAll(require('bcrypt'))

  return knex('orders').del()
    .then(() => knex('book_records').del())
    .then(() => knex('libraries').del())
    .then(() => knex('books').del())
    .then(() => knex('users').del())
    .then(() => bcrypt.genSaltAsync(10))
    .then(salt => bcrypt.hashAsync(process.env.ADMIN_PASS, salt))
    .then(hash => knex('users').insert(
      {
        id: uuidV4(),
        name: 'Lorenzo Piccoli',
        email: 'lorenzopicoli@me.com',
        password: hash,
        role: 'admin'
      }
    )
  )
}
