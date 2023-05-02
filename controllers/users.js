const mongodb = require('../db/connect');

const getCollection = () => {
  return mongodb.getDb().db('recipes').collection('users');
};


const getAllUsers = async (req, res, next) => {
  try {
    const usersCollection = getCollection();
    const result = await usersCollection.find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

  const getUser = async (req, res) => {
    try {
      const username = req.params.username;
      if (!username) {
        res.status(400).send('Error - username is invalid. Please try again.');
        return;
      }
      const usersCollection = getCollection();
      const result = await usersCollection.find({ username: username }).toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const createUser = async (req, res) => {
    const user = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password     
    };
    const response = await mongodb.getDb().db().collection('recipes').insertOne(user);
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
  
  const deleteUser = async (req, res) => {
    try {
      const username = req.params.username;
      if (!username) {
        res.status(400).send('Error - username is invalid. Please try again.');
        return;
      }
      const usersCollection = getCollection();
      const result = await usersCollection.deleteOne({ username: username });
      console.log(`${username} was successfully deleted`);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  };






  module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser};
