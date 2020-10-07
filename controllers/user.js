const express = require('express')
const passport = require('passport');
const bcrypt = require('bcrypt')
// const database = require('../services/db')
const { Pool, Client } = require('pg');
//create pool of clients with connection string to connect to the 'manage' database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.home = (req,res) => {
    res.send(req.isAuthenticated())
}

exports.signin = (req, res) => {
    res.send(req.isAuthenticated())
}

exports.postSignin = (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
    } else {
      req.session.cookie.expires = false;
    }
    res.send(req.user)
}

exports.account = async (req,res) => {
    console.log("got here")
    try {
      const client = await pool.connect()
      await client.query('BEGIN')
      await JSON.stringify(await client.query(`select first_name, last_name, email, title, project_status, description from "accounts" left join "projects" on accounts.account_id = projects.account_id where accounts.account_id = $1`,
      [req.user[0].id],
      function(err, result){
        if(result.rows[0]){
          res.send(result.rows)
        } else {
          res.send("Redirect")
        }
      }))
    } catch (e) {
      throw(e)
    }
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect("/")
}

exports.signup = (req,res) => {
    console.log("isAuthenticated: ", req.isAuthenticated())
}

exports.postSignup = async (req, res ) => {
    try {
      //pull a client from the pool
      const client = await pool.connect()
      await client.query('BEGIN')
      let pwd = await bcrypt.hash(req.body.password, 8);
      await JSON.stringify(await client.query(`select account_id from "accounts" where "email" = $1`,
        [req.body.email], 
        function(err, result) {
          if(result.rows[0]){
            console.log("This email is already registered")
            res.send(err)
          } else {
            client
            .query(`insert into accounts ("first_name", "last_name", email, gender, password) 
                    values ($1,$2,$3,$4,$5)`,
                    [req.body.first_name, req.body.last_name, req.body.email, req.body.gender, pwd], 
                    function(err, result){
                      if(err){
                        console.log(err)
                        client.query('ROLLBACK')
                      } else {
                        client.query('COMMIT')
                        console.log("User created")
                        res.send("Congratulations you have made an account!")
                        return
                      }
            })
          }
        }))
        client.release()
    } catch (e) {
      throw(e)
    }
}
