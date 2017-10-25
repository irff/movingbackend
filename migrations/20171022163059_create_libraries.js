exports.up = (knex) => {
  return knex.schema
  	.createTable('libraries', (table) => {
		table.uuid('id').notNullable().primary()
		table.uuid('user_id').notNullable().unique().references('users.id')
		table.float('lat')
		table.float('lng')
		table.text('address')

		table.timestamps()
	})
  	.createTable('book_records', (table) => {
  		table.uuid('library_id').notNullable().references('libraries.id')
  		table.string('book_isbn').notNullable().references('books.isbn')
  		table.enu('status', ['available', 'unavailable']).notNullable().defaultTo('available')
  		
  		table.timestamps()
  		table.index(['library_id', 'book_isbn'])
  	})
}

exports.down = (knex) => knex.schema
	.dropTableIfExists('book_records')
	.dropTableIfExists('libraries')
