exports.up = function(connection, Promise) {
  return connection.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable
      .string('created_by')
      .references('username')
      .inTable('users');
    // commentsTable
    //   .integer('article_id')
    //   .references('article_id')
    //   .inTable('articles');
    commentsTable
      .string('belongs_to')
      .references('title')
      .inTable('articles');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.timestamp('created_at');
    commentsTable.string('body', 1000);
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('comments');
};
