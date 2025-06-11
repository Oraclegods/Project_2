// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { validateUser, validateIdParam } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');


router.get('/', usersController.getAll);
router.get('/:id', validateIdParam, handleValidationErrors, usersController.getSingle);
router.post('/', validateUser, handleValidationErrors, usersController.createUser);
router.put('/:id', [...validateIdParam, ...validateUser], handleValidationErrors, usersController.updateUser);
router.delete('/:id', validateIdParam, handleValidationErrors, usersController.deleteUser);



router.get('/', (req, res) => {
  //#swagger.tags = ['Users']
  //#swagger.description = 'Get all users'
  res.send('All users');
});


module.exports = router;
