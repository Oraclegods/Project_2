// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { validateUser, validateIdParam } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');

const { isAuthenticated }  = require("../middleware/authenticate")

//#swagger.tags = ['Users']
router.get('/', usersController.getAll);
//#swagger.tags = ['Users']
router.get('/:id', validateIdParam, handleValidationErrors, usersController.getSingle);
//#swagger.tags = ['Users']
router.post('/', isAuthenticated, validateUser, handleValidationErrors, usersController.createUser);
//#swagger.tags = ['Users']
router.put('/:id', isAuthenticated, [...validateIdParam, ...validateUser], handleValidationErrors, usersController.updateUser);
//#swagger.tags = ['Users']
router.delete('/:id', isAuthenticated, validateIdParam, handleValidationErrors, usersController.deleteUser);



//router.get('/', (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.description = 'Get all users'
//  res.send('All users');
//});


module.exports = router;
