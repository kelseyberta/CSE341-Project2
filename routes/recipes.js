const routes = require('express').Router();

const recipesController = require('../controllers/recipes')
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate')

routes.get('/', recipesController.getAllRecipes);
routes.get('/:recipeName', recipesController.getRecipe);
routes.post('/', validation.saveRecipe, isAuthenticated, recipesController.createRecipe);
routes.put('/:recipeName', validation.saveRecipe, isAuthenticated, recipesController.updateRecipe);
routes.delete('/:recipeName', isAuthenticated, recipesController.deleteRecipe);


module.exports = routes; 