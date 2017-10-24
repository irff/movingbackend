const uuidV4 = require('uuid/v4')

exports.seed = (knex, Promise) => {
  
  return knex('users').select('id').where('role', 'admin').then(row => {
    const { id: adminId } = row[0];
    const bookId = uuidV4();
    const authorId = uuidV4();
    const libraryId = uuidV4();

    return knex('books').insert([
        {
          id: bookId,
          title: 'Adventure of Lorem & Ipsum',
          language: 'en',
        }
      ])
      .then(() =>
        knex('authors').insert([
          {
            id: authorId,
            name: 'Sid Ahmed'
          }
        ])
      )
      .then(() =>
        knex('authors_books').insert([
          {
            book_id: bookId,
            author_id: authorId,
          }
        ])
      )
      .then(() =>
        knex('libraries').insert([
          {
            id: libraryId,
            user_id: adminId,
            lat: 6.0123,
            lng: -11.8765,
          }
        ])
      )
      .then(() =>
        knex('book_records').insert([
          {
            book_id: bookId,
            library_id: libraryId,
          }
        ])
      )
  });
}
