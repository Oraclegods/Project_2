// controllers/users.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
   //#swagger.tags=['users']
   try {
      const result = await mongodb.getDatabase().db('products').collection('users').find();
      const users = await result.toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
   } catch (error) {
      res.status(500).json({ message: 'Failed to fetch users.', error: error.message });
   }
};

const getSingle = async (req, res) => {
   //#swagger.tags=['users']
   try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().db('products').collection('users').find({ _id: userId });
      const users = await result.toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
   } catch (error) {
      res.status(500).json({ message: 'Failed to fetch user.', error: error.message });
   }
};

const createUser = async (req, res) => {
   //#swagger.tags=['users']
   try {
      const user = {
         name: req.body.name,
         price: req.body.price,
         inStock: req.body.inStock
      };
      const response = await mongodb.getDatabase().db('products').collection('users').insertOne(user);
      if (response.acknowledged) {
         res.status(201).json({ message: 'User created successfully.' });
      } else {
         res.status(500).json({ message: 'User creation failed.', error: response.error });
      }
   } catch (error) {
      res.status(500).json({ message: 'Failed to create user.', error: error.message });
   }
};

const updateUser = async (req, res) => {
   //#swagger.tags=['users']
   try {
      const userId = new ObjectId(req.params.id);
      const user = {
         name: req.body.name,
         price: req.body.price,
         inStock: req.body.inStock
      };
      const response = await mongodb.getDatabase().db('products').collection('users').replaceOne({ _id: userId }, user);
      if (response.modifiedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'User not found or no changes made.' });
      }
   } catch (error) {
      res.status(500).json({ message: 'Failed to update user.', error: error.message });
   }
};

const deleteUser = async (req, res) => {
   //#swagger.tags=['users']
   try {
      const userId = new ObjectId(req.params.id);
      const response = await mongodb.getDatabase().db('products').collection('users').deleteOne({ _id: userId });
      if (response.deletedCount > 0) {
         res.status(204).send();
      } else {
         res.status(404).json({ message: 'User not found.' });
      }
   } catch (error) {
      res.status(500).json({ message: 'Failed to delete user.', error: error.message });
   }
};

module.exports = {
   getAll,
   getSingle,
   createUser,
   updateUser,
   deleteUser
};
