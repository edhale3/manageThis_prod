const express = require('express');
const passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000;
let path = require('path');
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')
let createError = require('http-errors');

const indexRouter = require('./routes/index');



//parser for JSON data
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser');
const ResourceNotFoundError = require('./errors/ResourceNotFoundError');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
//initialize passport and use passport session
app.use(passport.initialize());
app.use(passport.session())
require('./passport-config')

//router
app.use('/', indexRouter)

//if in prod...
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


const StatusCodeMapping = {
  'invalid': 400,
  'not_found': 404,
  // etc.
  'internal': 500,
}
function mapErrorToStatusCode(error) {
  console.log(error)
  const code = (error && error.code) ? error.code : 'internal'
  return StatusCodeMapping[code] || 500
}

//custom error mappgin 
app.use(function errorHandler (error, req, res, next) {
  if (res.headersSent) {
    return next(error)
  }
  res
    .status(mapErrorToStatusCode(error))
    .json({ error: error.message })
})


app.listen(PORT, () => {
  console.log(`Node server running at: http://localhost:${PORT}/`);
});