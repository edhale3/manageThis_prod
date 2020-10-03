var express = require('express');
var router = express.Router();
const Account = require('../SQLQueries/Account')
const passport = require('passport');
const bcrypt = require('bcrypt')
const database = require('../services/db')
const validator = require('validator');
const { result } = require('lodash');
// const initializePassport = require('./passport-config')

// initializePassport(passport, email => {
//     users.find(user => user.email === email)
// })

router.get('/', (req,res)=> {
    res.send("hello there")
})

router.post('/signin', (req, res) => {
    console.log("Sign in: ", req)
})

router.post('/signup', (req, res, next) => {
    console.log("Sign Up: ", req)

})

module.exports = router;