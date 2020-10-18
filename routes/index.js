var express = require('express');
var router = express.Router();
const Account = require('../SQLQueries/Account')
const passport = require('passport');
const bcrypt = require('bcrypt')
const isLoggedIn = require('../isLoggedIn');
const db = require('knex')({
    client:'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 0, max:15 }
})

// {
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PW,
//     database: process.env.DB
// }

const deps = { db }

let user = require('../controllers/user')
let data = require('../controllers/data')

router.get('/api', user.signin)//
router.get("/api/signup", user.signup) //
router.post('/api/signup', user.postSignup(deps))//
router.get('/api/signin', user.signin)//
router.post('/api/signin', passport.authenticate('local'), user.postSignin)//
router.get('/api/logout', user.logout)//
router.get("/api/account", isLoggedIn , user.account(deps))//
router.get('/api/newproject', isLoggedIn, (req,res)=> {
    console.log("You got here now")
})  
router.post('/api/newproject', isLoggedIn, data.postProject(deps))//
router.get("/api/projects", isLoggedIn, data.projects(deps))//
router.post("/api/createcomment", isLoggedIn, data.postComment(deps))//
router.get("/api/getcomments/:project_id", isLoggedIn, data.getComments(deps))//
router.patch("/api/updateproject/:project_id", isLoggedIn, data.updateProject(deps))
router.delete('/api/deleteproject/:project_id', isLoggedIn, data.deleteProject(deps))
router.delete('/api/deletecomment/:comment_id', isLoggedIn, data.deleteComment(deps))

module.exports = router;