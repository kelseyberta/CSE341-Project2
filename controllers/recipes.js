const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;



const getAllRecipes = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('recipes').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
  const getRecipe = async (req, res, next) => {
    const recipeName = new ObjectId(req.params.recipeName);
    const result = await mongodb
      .getDb()
      .db()
      .collection('recipes')
      .find({ recipeName: recipeName });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };
  
  const createRecipe = async (req, res) => {
    const recipe = {
        recipeName: req.body.recipeName,
        cuisineType: req.body.cuisineType,
        cookTime: req.body.cookTime,
        cookTemp: req.body.cookTemp,
        ingredients: req.body.ingredients,
        directions: req.body.directions      
    };
    const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
    }
  };
  
  const updateRecipe = async (req, res) => {
    const recipeName = new ObjectId(req.params.recipeName);
    const recipe = {
        recipeName: req.body.recipeName,
        cuisineType: req.body.cuisineType,
        cookTime: req.body.cookTime,
        cookTemp: req.body.cookTemp,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('recipes')
      .replaceOne({ recipeName }, recipe);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the recipe.');
    }
  };
  

//Delete Working
const deleteRecipe = async (req, res) => {
  const recipName = new ObjectId(req.params.recipeName);
  const response = await mongodb.getDb().db().collection('recipes').deleteOne({ recipeName }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the recipe.');
  }
};




  module.exports = { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe };