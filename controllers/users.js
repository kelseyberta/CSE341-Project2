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
        res.status(400).send('Error: username invalid.');
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
    try {
      if (!req.body.username) {
        res.status(400).send('Error: Username required');
        return;
      }
      const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      };
      console.log('User created:');
      console.log(user);
      const usersCollection = getCollection();
      const result = await usersCollection.insertOne(user);
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json({ id: result.insertedId });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const username = req.params.username;
      if (!username) {
        res.status(400).send('Error: username invalid.');
        return;
      }
  
      if (!req.body.username) {
        res.status(400).send('Error: Username required');
        return;
      }
  
      const user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      };
      const usersCollection = getCollection();
      const result = await usersCollection.replaceOne({ username:username }, user);
      console.log(result);
  
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  
  const deleteUser = async (req, res) => {
    try {
      const username = req.params.username;
      if (!username) {
        res.status(400).send('Error: username invalid.');
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
