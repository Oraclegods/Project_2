// controllers/items.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
   //#swagger.tags=['items']
   try {
      const result = await mongodb.getDatabase().db('products').collection('items').find();
      const items = await result.toArray();
      res.status(200).json(items);
   } catch (error) {
      res.status(500).json({ message: 'Failed to fetch items.', error: error.message });
   }
};

const getSingle = async (req, res) => {
   //#swagger.tags=['items']
   try {
      const itemId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db('products').collection('items').find({ _id: itemId });
      const items = await result.toArray();
      res.status(200).json(items[0]);
   } catch (error) {
      res.status(500).json({ message: 'Failed to fetch the item.', error: error.message });
   }
};

const createItem = async (req, res) => {
   //#swagger.tags=['items']
   try {
      const item = {
         name: req.body.name,
         price: req.body.price,
         inStock: req.body.inStock
      };
      const response = await mongodb.getDatabase().db('products').collection('items').insertOne(item);
      if (response.acknowledged) {
         res.status(201).json({ message: 'Item created successfully.' });
      } else {
         res.status(500).json({ message: 'Item creation failed.', error: response.error });
      }
   } catch (error) {
      res.status(500).json({ message: 'Failed to create item.', error: error.message });
   }
};

const updateItem = async (req, res) => {
   //#swagger.tags=['items']
   try {
      const itemId = new ObjectId(req.params.id);
      const item = {
         name: req.body.name,
         price: req.body.price,
         inStock: req.body.inStock
      };
      const response = await mongodb.getDatabase().db('products').collection('items').replaceOne({ _id: itemId }, item);
      if (response.modifiedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'Item not found or no changes made.' });
      }
   } catch (error) {
      res.status(500).json({ message: 'Failed to update item.', error: error.message });
   }
};

const deleteItem = async (req, res) => {
   //#swagger.tags=['items']
   try {
      const itemId = new ObjectId(req.params.id);
      const response = await mongodb.getDatabase().db('products').collection('items').deleteOne({ _id: itemId });
      if (response.deletedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'Item not found.' });
      }
   } catch (error) {
      res.status(500).json({ message: 'Failed to delete item.', error: error.message });
   }
};

module.exports = {
   getAll,
   getSingle,
   createItem,
   updateItem,
   deleteItem
};
