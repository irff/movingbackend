import Order from 'models/orders'
import { BookRecord } from 'models/libraries'
import User from 'models/users'

export async function post(ctx, next) {
  try {
    const record = await BookRecord.where('id', ctx.request.body.record_id).fetch()

    if (record.get('status') !== 'available') {
      ctx.status = 400
      ctx.body = {
        success: false
      }
      return
    }

    const user = ctx.body.me

    delete ctx.request.body.record_id

    const order = await Order.forge({
      ...ctx.request.body,
      book_isbn: record.get('book_isbn'),
      library_id: record.get('library_id'),
      user_id: user.id,
    }).save()

    ctx.body = { order }

  } catch (err) {
    ctx.throw(500)
  }

  if (next) await next()
}

export async function put(ctx, next) {
  try {
    const order = await Order.where('id', ctx.params.id).fetch({ withRelated: ['user', 'owner'] })
    const user = ctx.body.me;

    if (order.related('user').id !== user.id || order.related('owner').id !== user.id) {
      ctx.status = 401
      ctx.body = { success: false }
      return
    }

    await order.save({ status: ctx.request.body.status }, { patch: true })

    ctx.body = { order }
  } catch (err) {
    ctx.throw(500)
  }

  if (next) await next()
}

export async function get(ctx, next) {
  try {
    const order = await Order.where('id', ctx.params.id).fetch()

    ctx.body = { order }
  } catch (err) {
    ctx.throw(500)
  }
}

export async function getUserOrder(ctx, next) {
  try {
    const user = await User.where('id', ctx.body.me.id).fetch({
      required: true,
      withRelated: ['borrows.book', 'borrows.library.user', 'lends.book', 'lends.library.user', 'borrows.user', 'lends.user'],
    })
    ctx.body = { lends: user.related('lends'), borrows: user.related('borrows') }
  } catch (err) {
    ctx.throw(500)
  }
}
