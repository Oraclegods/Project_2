// routes/items.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/items'); // This is correct

const { validateItems, validateIdParam } = require('../middleware/validation');
const { handleValidationErrors } = require('../middleware/errorHandler');

// Correct usage: use itemController.<function>
router.get('/', itemController.getAll);
router.get('/:id', validateIdParam, handleValidationErrors, itemController.getSingle);
router.post('/', validateItems, handleValidationErrors, itemController.createItem);
router.put('/:id', validateIdParam, validateItems, handleValidationErrors, itemController.updateItem);
router.delete('/:id', validateIdParam, handleValidationErrors, itemController.deleteItem);


router.post('/', (req, res) => {
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
  res.send('Item added');
});


module.exports = router;
