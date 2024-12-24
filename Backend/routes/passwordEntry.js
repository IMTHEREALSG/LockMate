const express = require('express');
const authenticate = require('../middlewares/authentication');
const PassController = require('../controllers/PassController');
const PassRouter = express.Router();


PassRouter.post('/add',authenticate,PassController.addPassword);
PassRouter.get('/',authenticate,PassController.getPasswords);
PassRouter.get('/decrypt/:id',authenticate,PassController.decryptPassword);
PassRouter.get('/delete/:id',authenticate,PassController.deletePassword);

module.exports = PassRouter;