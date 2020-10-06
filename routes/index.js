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

let user = require('../controllers/user')

//landing get route
// router.get('/api', (req,res)=> {
//     console.log("hasta manana brudda")
//     res.send(req.isAuthenticated())
// })

router.get('/api', user.home)
router.get("/api/signup", user.signup) 
router.post('/api/signup', user.postSignup)
router.get('/api/signin', user.signin)
router.post('/api/signin', passport.authenticate('local'), user.postSignin)
router.get('/api/logout', user.logout)
router.get("/api/account", isLoggedIn, user.account)


  
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