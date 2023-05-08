var express = require('express');
var bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');

const recipesRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users')

var app = express();

app.use(bodyParser.json())
.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))
// This is the basic express session({..}) initialization.
.use(passport.initialize()) 
// init passport on every route call.
.use(passport.session())    
// allow passport to use "express-session".
.use((req, res, next) => {
  res.setHeader("Access-Controll-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
})
.use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
.use(cors({ origin: '*'}))
.use("/", require("./routes/index.js"));
app.use(recipesRoutes);
app.use(userRoutes);

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret:  process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
  //});
}
));

passport.serializeUser((user, done) => {
done(null, user);
});
passport.deserializeUser((user, done) => {
done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}), 
  (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

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