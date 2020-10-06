var express = require('express');
var router = express.Router();
const Account = require('../SQLQueries/Account')
const passport = require('passport');
const bcrypt = require('bcrypt')
const database = require('../services/db')
const validator = require('validator');
const { result } = require('lodash');
const isLoggedIn = require('../isLoggedIn');
const { Pool, Client } = require('pg');
//create pool of clients with connection string to connect to the 'manage' database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

//landing get route
router.get('/api', (req,res)=> {
    console.log("hasta manana brudda")
    res.send(req.isAuthenticated())
  })
  
router.get('/api/login', (req, res) => {
    console.log("You got here: ", req)
    if(req.isAuthenticated()){
      return res.send(req.isAuthenticated())
    } else {
      return res.send(req.isAuthenticated())
    }
  })

  //post route for signing in 
router.post('/api/signin', 
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
  
router.get("/api/account", isLoggedIn, async (req,res)=> {
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
  
router.get('/api/logout', (req, res) => {
    console.log("logout time")
    req.logout()
    res.redirect("/")
})
  
  // app.get("/signup", function(req,res){
  //   console.log("this one: ", req.isAuthenticated())
  // })
  
  //signup route for posting 
router.post('/api/signup', async (req, res ) => {
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
  
router.get('/api/newproject', isLoggedIn, async (req,res)=> {
    console.log("You got here now")
})
  
router.post('/api/newproject', isLoggedIn, async (req,res) => {
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
  
router.get("/api/projects", isLoggedIn, async (req, res) => {
    try {
      const client = await pool.connect()
      await client.query('BEGIN')
      res.send( JSON.stringify(await client.query(`select * from projects`)) )
    } catch (e){
      throw e
    }
})


module.exports = router;