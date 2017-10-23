import Bookshelf from 'db/bookshelf'
import uuidV4 from 'uuid/v4'

export const Order = Bookshelf.model('Order', {
  tableName: 'libraries',
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

  user() {
    return this.belongsTo('User')
  },

  owner() {
    return this.belongsTo('User').through('Library')
  },
})