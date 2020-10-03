const SignUp = require('../SQLQueries/SignUpQuery')
const { validateUser } = require('../validators/signup');
const { validateSignIn } = require('../validators/signin')
const { isEmpty } = require('lodash');
const passport = require('passport')
const database = require('../services/db')

const rerender_signup = (errors, req, res, next) => {
    signup.SignUp.errors(errors)
}

exports.submit_signin= function(req, res){
    let errors = {}
    return validateSignIn(errors,req).then( result  => {
        console.log('result: ', result)
        if(!isEmpty(errors)){
            console.log("Sign In errors: ", errors)
            return "You're still a failure"
        } else {
            console.log("you got here this time")
            passport.authenticate('local', {
                successRedirect:"/home",
                failureRedirect:"/signin",
                failureFlash: true
            })(req,res);
        }
    })
}

exports.get_account= async function(req,res){
    console.log('this req:', req.params.email)
    const query = await database.query(`select * from accounts where email = '${req.params.email}'`)
    console.log("query:", query.rows[0])
    return res.send(query.rows[0]) 
} 

exports.submit_signup= async (req, res) => {
    let errors = {};
    return validateUser(errors, req).then(errors => {
        console.log("errors: ", errors)
        if(!isEmpty(errors)){
            console.log(errors)
            return "you're a failure"
        } else {
            const newUser = SignUp.signUpPost(req.body).then(result => res.send("Good Job"))
            return newUser
        }
    })
    // return SignUp.signUpPost(req.body).then(result =>  res.send("Good Job"))
}
