import Library, { BookRecord } from 'models/libraries'
import Book, { Author } from 'models/books'

export async function post(ctx, next) {
  try {
    let book = await Book.where('isbn', ctx.request.body.isbn).fetch()

    if (!book) {
      book = await Book.forge({ isbn: ctx.request.body.isbn }).save(ctx.request.body, { method: 'insert' })
    }

    const library = await Library.where('user_id', ctx.body.me.id).fetch()

    const record = await BookRecord.forge({
      book_isbn: ctx.request.body.isbn,
      library_id: library.id,
    }).save()

    ctx.body = { record }


  } catch (err) {
    ctx.throw(500)
  }

  if (next) await next()
}

export async function put(ctx, next) {
  try {
    const record = await BookRecord.where('id', ctx.params.id).fetch()
    await record.save({ status: ctx.request.body.status }, { patch: true })

    ctx.body = { record }
  } catch (err) {
    ctx.throw(500)
  }

  if (next) await next()
}

export async function del(ctx, next) {
  try {
    const record = await BookRecord.where('id', ctx.params.id).fetch()
    await record.destroy()

    ctx.status = 200
    ctx.body = { success: true }
  } catch (err) {
    ctx.throw(500)
  }
}
