const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes API',
    description: 'Get recipes and users'
  },
  host: 'localhost:8080',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

