const routes = require('express').Router();

const usersController = require('../controllers/users')
const validation = require('../middleware/validate')

routes.get('/', usersController.getAllUsers)
routes.get('/:username', usersController.getUser);
routes.post('/', validation.saveUser, usersController.createUser);
routes.put('/:username', validation.saveUser, usersController.updateUser);
routes.delete('/:username', usersController.deleteUser);


module.exports = routes; 