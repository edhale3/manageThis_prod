let validator = require('validator');
let bcrypt = require("bcrypt")
let database = require('../services/db')
const Account = require('../SQLQueries/Account');
const passport = require('passport');
const { reject } = require('lodash');

exports.validateSignIn = async function(errors, req) {
    return new Promise((resolve, reject) => {
        console.log("this is the req:", req.body)
        return database
            .query(`select * from accounts where email = '${req.body.email}'`)
            .then(user => {
                console.log("this user:", user.rows)
                bcrypt.compare(req.body.password, user.rows[0].password, 
                    function(error, res){
                    if(res == true){
                        console.log("yay")
                        resolve(res)
                    } else {
                        throw new Error(error)
                    }
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}