const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const swaggerRoutes = require('./routes/swagger');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./.swagger.json'); // Path to your generated file

// calling functions for OAuth
const passport = require('passport');
const session = require ('express-session');
const GitHubStrategy = require('passport-github2').Strategy; 
const cors = require('cors');


app
  .use(bodyParser.json())
  .use(session({
    secret: "secrete",
    resave: false ,
    saveUninitialized: true ,
  }))
// this is the basic express session({..}) initialization.
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
    "POST, GET, PUT, PATCH, OPTION, DELETE"
  );
  next();
})
.use(cors({ methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']}))
.use(cors({ origin: '*'}))
.use("/", require("./routes/index.js"));


// adding some passport set up details. 
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_SECRET,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //user.findorCreate({ githubID: profile.id }, function (err, user) {
     return done (null, profile);
  //});
}
))

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-doc', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });


//app.use(bodyParser.json());

//app.use((req, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  res.setHeader(
//    'Access-Control-Allow-Headers',
//    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//  );
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//  next();
//})

app.use('/', swaggerRoutes);
app.use('/users', require('./routes/users'));
app.use('/items', require('./routes/items'));

// # getting hello world
app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log('Web Server is listening at port ' + port);
    });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    }
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
