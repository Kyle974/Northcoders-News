exports.up = function(connection, Promise) {
  return connection.schema.createTable('users', (usersTable) => {
    usersTable
      .string('username')
      .primary()
      .unique()
      .notNullable();
    usersTable.string('avatar_url');
    usersTable.string('name');
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('users');
};
