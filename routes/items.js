// routes/items.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items'); // This is correct

const { validateItems, validateIdParam } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');
const { isAuthenticated } = require("../middleware/authenticate")

// Correct usage: use itemController.<function>

  //#swagger.tags = ['Items']
router.get('/', itemController.getAll);
  //#swagger.tags = ['Items']
router.get('/:id', validateIdParam, handleValidationErrors, itemController.getSingle);
  //#swagger.tags = ['Items']
router.post('/', isAuthenticated, validateItems, handleValidationErrors, itemController.createItem);
  //#swagger.tags = ['Items']
router.put('/:id', isAuthenticated, validateIdParam, validateItems, handleValidationErrors, itemController.updateItem);
  //#swagger.tags = ['Items']
router.delete('/:id', isAuthenticated, validateIdParam, handleValidationErrors, itemController.deleteItem);


//router.post('/', (req, res) => {
  //#swagger.tags = ['Items']
  //#swagger.description = 'Add new item'
  /* 
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Item info',
    required: true,
    schema: {
      name: 'Sample Item',
      price: 10.5
    }
  }
  */
//  res.send('Item added');
//});


module.exports = router;
