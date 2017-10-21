exports.up = (knex) => {
  return knex.schema
  	.createTable('books', (table) => {
		table.uuid('id').notNullable().primary()
		table.string('title', 255).notNullable().index()
		table.text('description')
		table.date('year_published')
		table.text('image')
		table.enu('language', ['en', 'id']).notNullable().index()
		table.timestamps()

	})
  	.createTable('authors', (table) => {
  		table.uuid('id').notNullable().primary()
  		table.string('name', 255).notNullable().index()
  	})
  	.createTable('authors_books', (table) => {
  		table.uuid('author_id').references('authors.id')
  		table.uuid('book_id').references('books.id')

  		table.index(['author_id', 'book_id'])
  	})
}

exports.down = (knex) => knex.schema
	.dropTableIfExists('authors_books')
	.dropTableIfExists('authors')
	.dropTableIfExists('books')
