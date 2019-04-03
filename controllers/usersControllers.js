const { getUsers } = require('../models/usersModels');

exports.sendUsers = (req, res, next) => {
  getUsers(req.query).then((users) => {
    res.status(200).send({ users });
  });
};
