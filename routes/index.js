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
let data = require('../controllers/data')


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
router.post('/api/newproject', isLoggedIn, data.postProject )
router.get("/api/projects", isLoggedIn, data.projects)

module.exports = router;