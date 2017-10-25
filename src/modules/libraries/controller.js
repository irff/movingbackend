import User from 'models/users'
import Library from 'models/libraries'

export async function get(ctx, next) {
  try {
    const library = await Library.where('id', ctx.params.id).fetch({
      require: true,
      withRelated: ['bookRecords.books.authors'],
    })

    ctx.body = { library }
  } catch (err) {
    // Not found
    if (err.message === 'EmptyResponse') ctx.throw(404)

    // Invalid uuid
    if (err.code === '22P02') ctx.throw(400)

    ctx.throw(500)
  }

  if (next) await next()
}

export async function getUserLibrary(ctx, next) {
  try {
    const library = await Library.where('user_id', ctx.params.id).fetch({
      require: true,
      withRelated: ['bookRecords.books.authors'],
    })

    ctx.body = { library }
  } catch (err) {
    // Not found
    if (err.message === 'EmptyResponse') ctx.throw(404)

    // Invalid uuid
    if (err.code === '22P02') ctx.throw(400)

    ctx.throw(500)
  }

  if (next) await next()
}

export async function getAll(ctx) {
  try {
    const libraries = await Library.fetchAll()
    ctx.body = { libraries }
  } catch (err) {
    if (err.message === 'EmptyResponse') {
      ctx.body = { libraries: [] }
    }
    ctx.throw(500)
  }
}
