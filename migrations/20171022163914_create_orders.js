exports.up = (knex) => {
  return knex.schema
  	.createTable('orders', (table) => {
		table.uuid('id').notNullable().primary()
		table.uuid('user_id').notNullable().references('users.id').index()
		table.uuid('library_id').notNullable().references('libraries.id').index()
		table.string('book_isbn').notNullable().references('books.isbn')
		
		table.float('lat')
		table.float('lng')
		table.text('address')
		
		table.enu('status', [
			'pending',
			'confirmed',
			'delivered',
			'received',
			'returned',
			'completed',

			'rejected',
			'frozen',
		]).notNullable().defaultTo('pending')

		table.enu('delivery_method', [
			'go-send',
			'jne',
			'tiki',
			'jnt',
			'meet',
			'other',
		]).notNullable()

		table.timestamps()
	})
}

exports.down = (knex) => knex.schema
	.dropTableIfExists('orders')
