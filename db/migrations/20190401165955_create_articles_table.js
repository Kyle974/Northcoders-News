exports.up = function(connection, Promise) {
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.string('body');
    articlesTable.integer('votes').defaultTo(0);
    articlesTable
      .string('slug')
      .references('slug')
      .inTable('topics');
    articlesTable
      .string('author')
      .references('username')
      .inTable('users');
    articlesTable.timestamp('created_at');
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('articles');
};
