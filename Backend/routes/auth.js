const express = require('express');
const AuthController = require('../controllers/AuthController');
const UserRouter = express.Router();

UserRouter.post('/signup',AuthController.signup);
UserRouter.post('/signin',AuthController.signin);


module.exports = UserRouter;
