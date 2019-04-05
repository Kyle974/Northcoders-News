const usersRouter = require('express').Router();
const { sendUser } = require('../controllers/usersControllers');

usersRouter.route('/:username').get(sendUser);

module.exports = usersRouter;
