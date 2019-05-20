const { getUser } = require('../models/usersModels');

exports.sendUser = (req, res, next) => {
  getUser(req.params)
    .then(([user]) => {
      // if (user === undefined)
      //   return Promise.reject({ code: 404, msg: 'User Not Found' });
      // else
      res.status(200).send({ user });
    })
    .catch(next);
};
