var express = require('express');
var bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

const recipesRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users')

var app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  

app.use('/', require('./routes'));
app.use(recipesRoutes)
app.use(userRoutes)

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Server is running on Port ${port} and connected to DB`);
  }
});