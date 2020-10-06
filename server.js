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

// const reload = require('reload')

// app.set('views', path.join(__dirname, 'views'));
// const indexRouter = require('./routes/index'
// app.set('view engine', 'jade');


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
const isLoggedIn = require('./isLoggedIn');




const { Pool, Client } = require('pg');
//create pool of clients with connection string to connect to the 'manage' database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

passport.use('local', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
  }, function (req, username, password, done) {
      loginAttempt();
      async function loginAttempt(){
        const client = await pool.connect()
        try {
          await client.query('BEGIN')
          let currentAccountData = await JSON
            .stringify(await client
              .query(`select account_id, "first_name", "last_name", "email", "gender", "password" 
                    from "accounts" where "email" = $1`, [username], function (err, result){
                      console.log(result.rows[0])
                      if(result.rows[0] === null || result.rows[0] === undefined ){
                        console.log("incorrect login credentials")
                        return done(null, false)
                      } else {
                        bcrypt.compare(password, result.rows[0].password, function(err, check){
                          if(err){
                            console.log(" There was an error while checking the password")
                          } else if (check) {
                            return done(null, [{email: result.rows[0].email, first_name: result.rows[0].first_name, id: result.rows[0].account_id}])
                          } else {
                            console.log("false login credentials")
                            return done(null, false)
                          }
                        })
                      }
                    }))
      } catch (e){
        return console.log(e)
      }
    }
  }))

passport.serializeUser(function(user, done) {
    console.log("SERIALIZED: ", user)
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log("DESERIALIZED: ", user)
    done(null, user);
});

// app.use('/', indexRouter)

//landing get route
app.get('/', (req,res)=> {
  console.log("hasta manana brudda")
  res.send(req.isAuthenticated())
})

app.get('/login', (req, res) => {
  console.log("You got here: ", req)
  if(req.isAuthenticated()){
    return res.send(req.isAuthenticated())
  } else {
    return res.send(req.isAuthenticated())
  }
})

//post route for signing in 
app.post('/signin', 
  passport.authenticate('local'),
  function(req, res) {
    if (req.body.remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
    } else {
      req.session.cookie.expires = false;
    }
    res.send(req.user)
  }
)

app.get("/account", isLoggedIn, async (req,res)=> {
  try {
    const client = await pool.connect()
    await client.query('BEGIN')
    await JSON.stringify(await client.query(`select first_name, last_name, gender, email from "accounts" where "account_id"=$1`,
    [req.user[0].id],
    function(err, result){
      console.log(result)
      if(result.rows[0]){
        res.send(result.rows[0])
      } else {
        res.send("Redirect")
      }
    }))
  } catch (e) {
    throw(e)
  }
})

app.get('/logout', (req, res) => {
  console.log("logout time")
  req.logout()
  res.redirect("/")
})

app.get("/signup", function(req,res){
  console.log("this one: ", req.isAuthenticated())
})

//signup route for posting 
app.post('/signup', async (req, res ) => {
  console.log("This is the request I got", req.body)
  try {
    //pull a client from the pool
    const client = await pool.connect()
    await client.query('BEGIN')
    let pwd = await bcrypt.hash(req.body.password, 8);
    await JSON.stringify(await client.query(`select account_id from "accounts" where "email" = $1`,
      [req.body.email], 
      function(err, result) {
        if(result.rows[0]){
          console.log("This email is already registered")
          res.send(err)
        } else {
          client
          .query(`insert into accounts ("first_name", "last_name", email, gender, password) 
                  values ($1,$2,$3,$4,$5)`,
                  [req.body.first_name, req.body.last_name, req.body.email, req.body.gender, pwd], 
                  function(err, result){
                    if(err){
                      console.log(err)
                      client.query('ROLLBACK')
                    } else {
                      client.query('COMMIT')
                      console.log("User created")
                      res.send("Congratulations you have made an account!")
                      return
                    }
          })
        }
      }))
      client.release()
  } catch (e) {
    throw(e)
  }
})

app.get('/newproject', isLoggedIn, async (req,res)=> {
  console.log("You got here now")
})

app.post('/newproject', isLoggedIn, async (req,res) => {
  try {
    const client = await pool.connect()
    await client.query('BEGIN')
    await JSON.stringify(await client.query(`insert into projects ("title", "project_status", "description", "account_id") 
    values ($1,$2,$3,$4)`,
    [req.body.title, req.body.project_status, req.body.description, req.user[0].id],
    function(err, result){
      if(err){
        console.log(err)
        client.query('ROLLBACK')
      } else {
        client.query('COMMIT')
        console.log("Project created")
        res.send("Congratulations you have made a new project!")
        return
      }
    }))
  } catch (e){
    throw e
  }
})

app.get("/projects", isLoggedIn, async (req, res) => {
  try {
    const client = await pool.connect()
    await client.query('BEGIN')
    res.send( JSON.stringify(await client.query(`select * from projects`)) )
  } catch (e){
    throw e
  }
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  console.log(__dirname)
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Node server running at: http://localhost:${PORT}/`);
});
// reload(app)