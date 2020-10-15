const express = require('express')
const passport = require('passport');
const bcrypt = require('bcrypt')
// const database = require('../services/db')
const { Pool, Client } = require('pg');
//create pool of clients with connection string to connect to the 'manage' database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

//function for getting all projects that are assigned to the signed in user
exports.projects = async (req,res) => {
  console.log("got here")
    try {
        const client = await pool.connect()
        await client.query('BEGIN')
        const data = await JSON.stringify(await client.query(`select * from projects where account_id = '${req.user[0].id}'`))
        data ? client.release(true) : null
        res.send(data)
    } catch (e){
        throw e
    }
}

//function for posting project as the signed in user
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
          client.release(true)
          res.send("Congratulations you have made a new project!")
          return
        }
      }))
    } catch (e){
      throw e
    }
}

//function for posting comment as the signed in user
exports.postComment = async (req,res)=> {
  try {
    const client = await pool.connect()
    await client.query('BEGIN')
    const data = await JSON.stringify(await client.query(`insert into comments ("comment_title", "comment_body", "project_id") 
    values ($1,$2,$3)`,
    [req.body.comment_title, req.body.comment_body, req.body.project_id],
    function(err, result){
      if(err){
        console.log(err)
        client.query('ROLLBACK')
        // res.send("FAILURE")
      } else {
        client.query('COMMIT')
        console.log("Comment created")
        // res.send("Congratulations you have made a new comment!")
        return "done"
      }
    }))
    data ? client.release(true) : console.log("nothing to see yet")
  } catch (e){
    console.log(e)
    throw e
  }
}

//function for getting all comments associated with the signed in user
exports.getComments = async (req,res)=> {
  console.log("got to this point")
    try {
      const client = await pool.connect()
      await client.query('BEGIN')
      const data = await JSON.stringify(await client.query(`select * from comments where project_id = '${req.params.project_id}'`)) 
      data ? client.release(true) : null
      res.send(data)
    } catch (e){
      throw e
    }
}

exports.updateProject = async (req, res) => {
  console.log("congratulations you got here to the update function with params: ", req.params)
  console.log("congratulations you got here to the update body: ", req.body)
  try {
    const client = await pool.connect()
    await client.query('BEGIN')
    const data = await JSON.stringify(
        await client.query(
          // `update projects set title = '${req.body.title}', 
          //   project_status = '${req.body.project_status}', 
          //   description = '${req.body.description}' 
          //   where project_id = '${req.body.project_id}'`,
            `update projects set title = ($1), 
            project_status = ($2), 
            description = ($3) 
            where project_id = ($4)`,
            [req.body.title, req.body.project_status, req.body.description, req.body.project_id],
            function(err, res){
              if(err){
                console.log(err)
                client.query('ROLLBACK')
                // res.send("FAILURE")
              } else {
                client.query('COMMIT')
                console.log("Project updated")
                // res.send("Congratulations you have made a new comment!")
                return "done"
              }
            }
        )
    )
    data ? client.release(true) : console.log("nothing to see yet")
    res.send(true)
  } catch (e){
    console.log(e)
    throw e
  }

}