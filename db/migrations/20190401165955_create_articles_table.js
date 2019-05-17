exports.up = function(connection, Promise) {
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable
      .string('title')
      .unique()
      .notNullable();
    articlesTable.string('body', 5000).notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable
      .string('topic')
      .references('slug')
      .inTable('topics')
      .notNullable()
      .onDelete('CASCADE');
    articlesTable
      .string('author')
      .references('username')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    articlesTable.timestamp('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('articles');
};
