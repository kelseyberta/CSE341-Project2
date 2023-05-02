const routes = require('express').Router();

const recipesController = require('../controllers/recipes')
const validation = require('../middleware/validate')


routes.get('/', recipesController.getAllRecipes);
routes.get('/:recipeName', recipesController.getRecipe);
routes.post('/', validation.saveRecipe, recipesController.createRecipe);
routes.put('/:recipeName', validation.saveRecipe, recipesController.updateRecipe);
routes.delete('/:recipeName', recipesController.deleteRecipe);


module.exports = routes; 