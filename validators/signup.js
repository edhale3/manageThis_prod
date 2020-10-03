let validator = require('validator')
let database = require('../services/db')
const { func } = require('prop-types')
const Account = require('../SQLQueries/Account')

const validateCreateUserFields = function(errors, req){
    console.log(req.body)
    let errors = {}
    if(!validator.isEmail(req.body.email)){
        errors.email = "Please use a valid email address."
        console.log("Please use a valid email address")
    }
    if(!validator.isAscii(req.body.password)){
        errors.password = "Invalid characters in password, please try another one."
        console.log("Invalid characters in password")
    }
    if(!validator.isLength(req.body.password, {min: 8, max: 50})){
        errors.password = "Please enter a valid length of password"
        console.log("Please enter a valid length of password")
    }
}

exports.validateUser = function (errors, req){
    return new Promise(function (res, rej){
        validateCreateUserFields(errors, req);
        console.log("What's this?", req.body.email)
        return Account.validateAccount(req.body.email)
        .then(result => {
            console.log("this result", result)
            if (result !== false ){
                errors.email = "Email is already in use"
            }
            res(errors)
        })
        .catch(err => { err })
    })
}