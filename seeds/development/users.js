const uuidV4 = require('uuid/v4')

exports.seed = (knex, Promise) => {
  const bcrypt = Promise.promisifyAll(require('bcrypt'))

  return bcrypt.genSaltAsync(10)
    .then(salt => bcrypt.hashAsync('123', salt))
    .then(hash => knex('users').insert(
      [
        {
          id: uuidV4(),
          name: 'Lucas',
          email: 'lucas@me.com',
          password: hash,
          username: 'lucas',
          role: 'user'
        }, {
          id: uuidV4(),
          name: 'Marcelo',
          email: 'marcelo@me.com',
          username: 'marcelo',
          password: hash,
          role: 'user'
        }, {
          id: uuidV4(),
          name: 'Andreia',
          email: 'andreia@me.com',
          username: 'andreia',
          role: 'user',
          password: hash
        }
      ]
    )
  )
}
