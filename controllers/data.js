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
        res.send( JSON.stringify(await client.query(`select * from projects`)) )
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