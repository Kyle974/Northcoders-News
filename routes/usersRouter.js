const usersRouter = require('express').Router();
const { sendUsers, addUser } = require('../controllers/usersControllers');

usersRouter
  .route('/')
  .get(sendUsers)
  .post(addUser);

module.exports = usersRouter;
