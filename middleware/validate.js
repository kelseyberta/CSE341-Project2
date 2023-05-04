const validator = require('../helpers/validate');

const saveRecipe = (req, res, next) => {
  const validationRule = {
    recipeName: 'required|string',
    cuisineType: 'string',
    cookTime: 'string',
    cookTemp: 'string',
    ingredients: 'array',
    directions: 'array'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
    const validationRule = {
      username: 'required|string',
      firstName: 'string',
      lastName: 'string',
      password: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveRecipe, saveUser
};