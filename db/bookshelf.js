import { knex } from './knex'
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('registry')
bookshelf.plugin('visibility')
bookshelf.plugin('pagination')

export default bookshelf
