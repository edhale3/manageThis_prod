var express = require('express');
var router = express.Router();
const Account = require('../SQLQueries/Account')
const passport = require('passport');
const bcrypt = require('bcrypt')
const isLoggedIn = require('../isLoggedIn');

let user = require('../controllers/user')
let data = require('../controllers/data')

//routing
router.get('/api', user.home)
router.get("/api/signup", user.signup) 
router.post('/api/signup', user.postSignup)
router.get('/api/signin', user.signin)
router.post('/api/signin', passport.authenticate('local'), user.postSignin)
router.get('/api/logout', user.logout)
router.get("/api/account", isLoggedIn, user.account)
router.get('/api/newproject', isLoggedIn, (req,res)=> {
    console.log("You got here now")
})  
router.post('/api/newproject', isLoggedIn, data.postProject )
router.get("/api/projects", isLoggedIn, data.projects)
router.post("/api/createcomment", isLoggedIn, data.postComment)
router.get("/api/getcomments/:project_id", isLoggedIn, data.getComments)
router.patch("/api/updateproject/:project_id", isLoggedIn, data.updateProject)

module.exports = router;