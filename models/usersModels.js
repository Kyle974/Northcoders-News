const connection = require('../db/connection');

exports.getUser = (params) => {
  const { user } = params;
  return connection
    .select('*')
    .from('users')
    .modify((userParam) => {
      if (user) {
        userParam.where('username', '=', user);
      }
    });
};
