
exports.up = function(knex, Promise) {
  return knex.schema
  	.alterTable('orders', table => {
  		table.enu('return_method', [
  			'go-send',
  			'jne',
  			'tiki',
  			'jnt',
  			'meet',
  			'other',
  		]).notNullable().defaultTo('other')
      table.date('return_by').notNullable().defaultTo("2017-01-01")
  	})
};

exports.down = function(knex, Promise) {
  return knex.schema
  	.alterTable('orders', table => {
  		table.dropColumns(['return_method', 'return_by'])
  	})
};
