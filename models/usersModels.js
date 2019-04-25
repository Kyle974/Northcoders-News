const connection = require('../db/connection');

exports.getUser = (params) => {
  const { username } = params;
  return connection
    .select('*')
    .from('users')
    .modify((userParam) => {
      if (username) {
        userParam.where('username', '=', username);
      }
    })
    .then(console.log(username));
};
