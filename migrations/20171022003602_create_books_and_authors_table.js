exports.up = (knex) => {
  return knex.schema
  	.createTable('books', (table) => {
  		table.string('isbn', 16).notNullable().primary()
		table.string('title', 255).notNullable().index()
		table.text('description')
		table.date('year_published')
		table.text('image')
		table.string('language').index()
		table.timestamps()

	})
  	.createTable('authors', (table) => {
  		table.uuid('id').notNullable().primary()
  		table.string('name', 255).notNullable().index()
  	})
  	.createTable('authors_books', (table) => {
  		table.uuid('author_id').notNullable().references('authors.id')
  		table.string('book_isbn').notNullable().references('books.isbn')

  		table.index(['author_id', 'book_isbn'])
  	})
}

exports.down = (knex) => knex.schema
	.dropTableIfExists('authors_books')
	.dropTableIfExists('authors')
	.dropTableIfExists('books')
