const mongodb = require('../db/connect');
const recipe = require('mongodb').recipe;

const getAllUsers = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('users').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getUser = async (req, res, next) => {
    const username = new ObjectId(req.params.username);
    const result = await mongodb
      .getDb()
      .db()
      .collection('users')
      .find({ username: username });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };
  
  const createUser = async (req, res) => {
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password   
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  };
  
  const updateUser = async (req, res) => {
    const username = new ObjectId(req.params.username);
    const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('users')
      .replaceOne({ username }, user);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  };
  

//Delete Working
const deleteUser = async (req, res) => {
  const username = new ObjectId(req.params.username);
  const response = await mongodb.getDb().db().collection('users').deleteOne({ username }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the user.');
  }
};




  module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser};
