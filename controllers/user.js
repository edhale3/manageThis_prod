const express = require('express')
const passport = require('passport');
const bcrypt = require('bcrypt');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
const PostingError = require('../errors/PostingError');

//function calls logout function that will end the session
exports.logout = (req, res) => {
  req.logout()
  res.redirect("/")
}

//if authentication was successful this function will set up the cookie settings
exports.postSignin = (req, res) => {
    if (req.body.remember) {req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
    } else {req.session.cookie.expires = false;}
    return res.send(req.user)
}

exports.account = (deps) => {
  const db = deps.db
  return async function (req, res){
    const records = await db('accounts')
      .where('accounts.account_id', req.user[0].id)
      .leftJoin('projects', 'accounts.account_id','projects.account_id')
      .select('first_name', 'last_name', 'email', 'title', 'project_status','project_id', 'description' )
    if(!records[0]){ 
      throw new ResourceNotFoundError('account', req.user[0].id)
    }
      return res.json(records) 
  }
}
//post signup data and create new account (checks if the account already exists)
exports.postSignup = (deps) => {
  const db = deps.db
  return async function (req, res){
      const records = await db('accounts')
      .select('account_id')
      .where('email',`${req.body.email}`)
      if(records[0]){
        throw new PostingError('accounts', req.body.email , `An account with the email '${req.body.email}' already exists.`)
      }
      let pwd = await bcrypt.hash(req.body.password, 8);
      const signup = await db('accounts')
      .insert({first_name:req.body.first_name, last_name:req.body.last_name,email:req.body.email,gender:req.body.gender,password:pwd
      })
      .catch(err => {
        throw new PostingError('accounts', req.body, err.message)
      })
      return res.send("Congrats it worked")
  }
}