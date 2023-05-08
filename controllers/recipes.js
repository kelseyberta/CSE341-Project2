const mongodb = require('../db/connect');

const getCollection = () => {
  return mongodb.getDb().db('recipes').collection('recipes');
};



const getAllRecipes = async (req, res, next) => {
  try {
    const recipesCollection = getCollection();
    const result = await recipesCollection.find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
  
  const getRecipe = async (req, res, next) => {
    try {
      const recipeName = req.params.recipeName;
      if (!recipeName) {
        res.status(400).send('Error -  invalid')
        return;
      }
      const recipesCollection = getCollection();
      const result = await recipesCollection.find({ recipeName: recipeName }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json(err);
    }
  };
  
  const createRecipe = async (req, res) => {
    const recipe = {
        recipeName: req.body.recipeName,
        cuisineType: req.body.cuisineType,
        cookTime: req.body.cookTime,
        cookTemp: req.body.cookTemp,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        servings: req.body.servings      
    };
    const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the recipe.');
    }
  };
  
  const updateRecipe = async (req, res) => {
    try {
      const recipeName = req.params.recipeName;
      if (!recipeName) {
        res.status(400).send('Error: recipeName invalid.');
        return;
      }
      if (!req.body.recipeName) {
        res.status(400).send('Error: recipeName required');
        return;
      } 
      const recipe = {
        recipeName: req.body.recipeName,
        cuisineType: req.body.cuisineType,
        cookTime: req.body.cookTime,
        cookTemp: req.body.cookTemp,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        servings: req.body.servings      
    };
      const recipesCollection = getCollection();
      const result = await recipesCollection.replaceOne({ recipeName:recipeName }, recipe);
      console.log(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

  const deleteRecipe = async (req, res) => {
    try {
      const recipeName = req.params.recipeName;
      if (!recipeName) {
        res.status(400).send('Error: recipeName invalid.');
        return;
      }
      const recipesCollection = getCollection();
      const result = await recipesCollection.deleteOne({ recipeName: recipeName });
      console.log(`${recipeName} was successfully deleted`);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  };



  module.exports = { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe };