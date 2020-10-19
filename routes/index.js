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

doAsync = (handler) => {
    return (req, res, next) => {
       handler(req, res)
         .then(() => next())
         .catch(next)
    }
 }

router.get('/api', isLoggedIn)//
router.get("/api/signup", isLoggedIn) //
router.post('/api/signup', doAsync(user.postSignup(deps)))//
router.get('/api/signin', isLoggedIn)//
router.post('/api/signin', passport.authenticate('local'), user.postSignin)//
router.get('/api/logout', user.logout)//
router.get("/api/account", isLoggedIn , doAsync(user.account(deps)))//
router.get('/api/newproject', isLoggedIn)  
router.post('/api/newproject', isLoggedIn, doAsync(data.postProject(deps)))//
// router.get("/api/projects", isLoggedIn, data.projects(deps))//
router.post("/api/createcomment", isLoggedIn, doAsync(data.postComment(deps)))//
router.get("/api/getcomments/:project_id", isLoggedIn, doAsync(data.getComments(deps)))//
router.patch("/api/updateproject/:project_id", isLoggedIn, doAsync(data.updateProject(deps)))
router.delete('/api/deleteproject/:project_id', isLoggedIn, doAsync(data.deleteProject(deps)))
router.delete('/api/deletecomment/:comment_id', isLoggedIn, doAsync(data.deleteComment(deps)))

module.exports = router;