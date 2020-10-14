const express = require('express')
const passport = require('passport');
const bcrypt = require('bcrypt')
// const database = require('../services/db')
const { Pool, Client } = require('pg');
//create pool of clients with connection string to connect to the 'manage' database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.projects = async (req,res) => {
    try {
        const client = await pool.connect()
        await client.query('BEGIN')
        res.send( JSON.stringify(await client.query(`select * from projects where account_id = '${req.user[0].id}'`)) )
    } catch (e){
        throw e
    }
}

exports.postProject = async (req,res) => {
    try {
      const client = await pool.connect()
      await client.query('BEGIN')
      await JSON.stringify(await client.query(`insert into projects ("title", "project_status", "description", "account_id") 
      values ($1,$2,$3,$4)`,
      [req.body.title, req.body.project_status, req.body.description, req.user[0].id],
      function(err, result){
        if(err){
          console.log(err)
          client.query('ROLLBACK')
        } else {
          client.query('COMMIT')
          console.log("Project created")
          res.send("Congratulations you have made a new project!")
          return
        }
      }))
    } catch (e){
      throw e
    }
}

exports.postComment = async (req,res)=> {
  try {
    const client = await pool.connect()
    await client.query('BEGIN')
    await JSON.stringify(await client.query(`insert into comments ("comment_title", "comment_body", "project_id") 
    values ($1,$2,$3)`,
    [req.body.comment_title, req.body.comment_body, req.body.project_id],
    function(err, result){
      if(err){
        console.log(err)
        client.query('ROLLBACK')
      } else {
        client.query('COMMIT')
        console.log("Comment created")
        res.send("Congratulations you have made a new comment!")
        return
      }
    }))
  } catch (e){
    throw e
  }
}

exports.getComments = async (req,res)=> {
    try {
      const client = await pool.connect()
      await client.query('BEGIN')
      res.send( JSON.stringify(await client.query(`select * from comments where project_id = '${req.params.project_id}'`)) )
    } catch (e){
      throw e
    }
}