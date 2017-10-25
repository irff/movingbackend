import Bookshelf from 'db/bookshelf'
import uuidV4 from 'uuid/v4'

// register required model
require('./libraries')

export const Book = Bookshelf.model('Book', {
  tableName: 'books',
  idAttribute: 'isbn',
  hasTimestamps: true,

  bookRecords() {
    return this.hasMany('BookRecord')
  },
})

export default Book;
