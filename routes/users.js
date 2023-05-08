const routes = require('express').Router();

const usersController = require('../controllers/users')
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate')

routes.get('/', usersController.getAllUsers)
routes.get('/:username', usersController.getUser);
routes.post('/', validation.saveUser, isAuthenticated, usersController.createUser);
routes.put('/:username', validation.saveUser, isAuthenticated, usersController.updateUser);
routes.delete('/:username', isAuthenticated, usersController.deleteUser);


module.exports = routes; 