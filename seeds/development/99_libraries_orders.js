const uuidV4 = require('uuid/v4')

exports.seed = (knex, Promise) => {
  
  return knex('users').select('id').where('role', 'admin').then(row => {
    const { id: adminId } = row[0];
    const bookIsbn = '0000000000000';
    const authorId = uuidV4();
    const libraryId = uuidV4();
    const recordId = uuidV4();

    return knex('books').insert([
        {
          isbn: bookIsbn,
          title: 'Adventure of Lorem & Ipsum',
          authors: 'Sid Ahmed',
          category: 'Fiction',
          language: 'en',
        }
      ])
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
            id: recordId,
            book_isbn: bookIsbn,
            library_id: libraryId,
          }
        ])
      )
  });
}
