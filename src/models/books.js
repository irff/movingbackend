import Bookshelf from 'db/bookshelf'
import uuidV4 from 'uuid/v4'

export const Author = Bookshelf.model('Author', {
  tableName: 'authors',
  idAttribute: 'id',

  initialize() {
    this.on('creating', this.generateUUID, this)
  },

  generateUUID() {
    this.set('id', uuidV4())
  },

  books() {
    return this.hasMany('Book')
  },

})

export const Book = Bookshelf.model('Book', {
  tableName: 'books',
  idAttribute: 'id',
  hasTimestamps: true,

  initialize() {
    this.on('creating', this.generateUUID, this)
  },

  generateUUID() {
    this.set('id', uuidV4())
  },

  authors() {
    return this.belongsToMany('Author')
  },

  bookRecords() {
    return this.hasMany('BookRecords')
  },
})
