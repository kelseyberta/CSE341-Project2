const routes = require('express').Router();

const recipesController = require('../controllers/recipes')

routes.get('/', recipesController.getAllRecipes);
routes.get('/:recipeName', recipesController.getRecipe);
routes.post('/', recipesController.createRecipe);
routes.put('/:recipeName', recipesController.updateRecipe);
routes.delete('/:recipeName', recipesController.deleteRecipe);


module.exports = routes; 