exports.up = (knex) => {
  return knex.schema
  	.createTable('books', (table) => {
  		table.string('isbn', 16).notNullable().primary()
		table.string('title', 255).notNullable().index()
		table.text('description')
		table.date('year_published')
		table.text('image')
		table.text('authors')
		table.string('category').index()
		table.string('language').index()
		table.timestamps()

	})
}

exports.down = (knex) => knex.schema
	.dropTableIfExists('books')
