const express = require('express')
const passport = require('passport');
const bcrypt = require('bcrypt')
// const database = require('../services/db')
// const { Pool, Client } = require('pg');
// //create pool of clients with connection string to connect to the 'manage' database
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

function failure(code, message){
  return res.status(code).json({error: message})
}
//function calls logout function that will end the session
exports.logout = (req, res) => {
  req.logout()
  res.redirect("/")
}

//check if signed in before rendering sign in page
exports.signin = (req, res) => {
  res.send(req.isAuthenticated())
}

//if authentication was successful this function will set up the cookie settings
exports.postSignin = (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
    } else {
      req.session.cookie.expires = false;
    }
    return res.send(req.user)
}

exports.account = (deps) => {
  const db = deps.db
  return async function (req, res){
     try {
        const records = await db('accounts')
          .where('accounts.account_id',`${req.user[0].id}`)
          .leftJoin('projects', 'accounts.account_id','projects.account_id')
          .select('first_name', 'last_name', 'email', 'title', 'project_status','project_id', 'description' )
        if(!records){ return failure(404, 'User not found')}
        return res.json(records)
     } catch (err){
       console.log('An error occurred looking up the user ', err)
        return failure(505, 'Internal Error')
     }
  }
}

//get signup route (doesn't do anything right now)
exports.signup = (req,res) => {
    console.log("isAuthenticated: ", req.isAuthenticated())
}

//post signup data and create new account (checks if the account already exists)
exports.postSignup = (deps) => {
  const db = deps.db
  return async function (req, res){
    try {
      const records = await db('accounts').select('account_id').where('email',`${req.body.email}`)
      if(records[0]){
        return failure(404, 'This user exists. Navigate to sign in page')
      } else {
        let pwd = await bcrypt.hash(req.body.password, 8);
        const signup = await db('accounts').insert({first_name:req.body.first_name,
          last_name:req.body.last_name,email:req.body.email,gender:req.body.gender,password:pwd
        })
        return res.send("Congrats it worked")
      }
    } catch (err) {
      console.log("Your signup process failed", err)
      return failure('Your signup process failed')
    }
  }
}