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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(flash())
app.use(session({
  secret: "secret goes here",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())
require('./passport-config')

app.use('/', indexRouter)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Node server running at: http://localhost:${PORT}/`);
});



// app.use(passportConfig)
// const isLoggedIn = require('./isLoggedIn');

// const { Pool, Client } = require('pg');
// //create pool of clients with connection string to connect to the 'manage' database
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// passport.use('local', new LocalStrategy({
//     passReqToCallback: true,
//     usernameField: 'email',
//     passwordField: 'password'
//   }, function (req, username, password, done) {
//       loginAttempt();
//       async function loginAttempt(){
//         const client = await pool.connect()
//         try {
//           await client.query('BEGIN')
//           let currentAccountData = await JSON
//             .stringify(await client
//               .query(`select account_id, "first_name", "last_name", "email", "gender", "password" 
//                     from "accounts" where "email" = $1`, [username], function (err, result){
//                       console.log(result.rows[0])
//                       if(result.rows[0] === null || result.rows[0] === undefined ){
//                         console.log("incorrect login credentials")
//                         return done(null, false)
//                       } else {
//                         bcrypt.compare(password, result.rows[0].password, function(err, check){
//                           if(err){
//                             console.log(" There was an error while checking the password")
//                           } else if (check) {
//                             return done(null, [{email: result.rows[0].email, first_name: result.rows[0].first_name, id: result.rows[0].account_id}])
//                           } else {
//                             console.log("false login credentials")
//                             return done(null, false)
//                           }
//                         })
//                       }
//                     }))
//       } catch (e){
//         return console.log(e)
//       }
//     }
//   }))

// passport.serializeUser(function(user, done) {
//     console.log("SERIALIZED: ", user)
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     console.log("DESERIALIZED: ", user)
//     done(null, user);
// });