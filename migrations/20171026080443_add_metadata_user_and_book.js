
exports.up = function(knex, Promise) {
  return knex.schema
  	.alterTable('users', table => {
  		table.text('description')
  	})
  	.alterTable('books', table => {
  		table.string('publisher')
  		table.integer('page_count')
  	})
};

exports.down = function(knex, Promise) {
  return knex.schema
  	.alterTable('users', table => {
  		table.dropColumns([ 'description' ])
  	})
  	.alterTable('books', table => {
  		table.dropColumns([ 'publisher', 'page_count' ])
  	})
};
