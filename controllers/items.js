// controllers/items.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['users']
   const result = await mongodb.getDatabase().db('products').collection('items').find();
   result.toArray().then((items) => {
      res.status(200).json(items);
   });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['users']
   const itemId = new ObjectId(req.params.id);
   const result = await mongodb.getDatabase().db('products').collection('items').find({ _id: itemId });
   result.toArray().then((items) => {
      res.status(200).json(items[0]);
   });
};

const createItem = async (req, res) => {
    //#swagger.tags=['users']
   const item = {
      name: req.body.name,
      price: req.body.price,
      inStock: req.body.inStock
   };
   const response = await mongodb.getDatabase().db('products').collection('items').insertOne(item);
   if (response.acknowledged) {
      res.status(201).send();
   } else {
      res.status(500).json(response.error || 'An error occurred while creating item.');
   }
};

const updateItem = async (req, res) => {
    //#swagger.tags=['users']
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
      res.status(500).json(response.error || 'An error occurred while updating item.');
   }
};

const deleteItem = async (req, res) => {
    //#swagger.tags=['users']
   const itemId = new ObjectId(req.params.id);
   const response = await mongodb.getDatabase().db('products').collection('items').deleteOne({ _id: itemId });
   if (response.deletedCount > 0) {
      res.status(204).send();
   } else {
      res.status(404).json(response.error || 'An error occurred while deleting item.');
   }
};

module.exports = {
   getAll,
   getSingle,
   createItem,
   updateItem,
   deleteItem
};
