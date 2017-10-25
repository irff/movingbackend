import Bookshelf from 'db/bookshelf'
import uuidV4 from 'uuid/v4'
import Promise from 'bluebird'
import jwt from 'jsonwebtoken'
import { sign } from './helpers/'
import S3 from 'lib/aws'
import config from 'config'
import rp from 'request-promise'

// register required model
import Library from './libraries';
require('./orders')


const bcrypt = Promise.promisifyAll(require('bcrypt'))
const { aws: { Bucket } } = config

const User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  hidden: ['password', 'facebook_token'],
  idAttribute: 'id',

  initialize() {
    this.on('saving', this.hashPassword, this)
    this.on('creating', this.generateUUID, this)
    this.on('creating', this.setAvi, this)
    this.on('created', this.createLibrary, this)
    this.on('destroying', this.cleanAvi, this)
  },

  async createLibrary() {
    const user_id = this.get('id')
    await Library.forge({ user_id }).save()
  },

  generateToken() {
    return jwt.sign({
      id: this.get('id'),
      role: this.get('role')
    }, config.jwt.token, { expiresIn: '2 days' })
  },

  validatePassword(password) {
    const user = this

    return bcrypt.compareAsync(password, user.get('password'))
      .then(match => {
        if (!match) {
          return null
        }

        return user
      })
  },

  async hashPassword() {
    const user = this

    if (user.isNew() || user.hasChanged('password')) {
      const salt = await bcrypt.genSaltAsync(10)
      const hash = await bcrypt.hashAsync(user.get('password'), salt)

      user.set('password', hash)
    }
  },

  async saveFBAvatar(fbUrl) {
    // Download from facebook
    const data = await rp({url: fbUrl, encoding: null})
    // Upload to S3
    await rp.put({
      url: await this.generateSignedURL(),
      body: data
    })
  },

  generateUUID() {
    this.set('id', uuidV4())
  },

  generateSignedURL() {
    const id = this.get('id')
    return sign(`${id}/avatar.jpg`)
  },

  setAvi() {
    const id = this.get('id')
    return this.set('avatar', `https://${Bucket}.s3.amazonaws.com/${id}/avatar.jpg`)
  },

  cleanAvi() {
    const user = this
    const re = /[^\/]*$/ // eslint-disable-line
    const avatarString = user.get('avatar')
    const [Key] = re.exec(avatarString)
    const options = { Bucket, Key }
    return S3.deleteObjectAsync(options)
  },

  library() {
    return this.hasOne('Library')
  },

  lends() {
    return this.hasMany('Order').through('Library')
  },

  borrows() {
    return this.hasMany('Order')
  },

})

export default Bookshelf.model('User', User);
