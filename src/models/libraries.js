import Bookshelf from 'db/bookshelf'
import uuidV4 from 'uuid/v4'

// register required model
require('./users')
require('./orders')
require('./books')

export const BookRecord = Bookshelf.model('BookRecord', {
  tableName: 'book_records',
  idAttribute: 'id',
  hasTimestamps: true,

  initialize() {
    this.on('creating', this.generateUUID, this)
  },

  generateUUID() {
    this.set('id', uuidV4())
  },

  library() {
    return this.belongsTo('Library')
  },

  book() {
    return this.belongsTo('Book')
  },
})

export const Library = Bookshelf.model('Library', {
  tableName: 'libraries',
  idAttribute: 'id',
  hasTimestamps: true,

  initialize() {
    this.on('creating', this.generateUUID, this)
  },

  generateUUID() {
    this.set('id', uuidV4())
  },

  user() {
    return this.belongsTo('User')
  },

  bookRecords() {
    return this.hasMany('BookRecord')
  },

  orders() {
    return this.hasMany('Order')
  },
})

export default Library;
