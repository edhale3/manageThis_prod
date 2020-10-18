const express = require('express')
const passport = require('passport');
const bcrypt = require('bcrypt')

function failure(code, message, res){
  return res.status(code).json({error: message})
}

exports.projects = (deps) => {
  const db = deps.db
  return async (req, res) => {
    try {
      const records = await db('projects').where({account_id:req.user[0].id})
      return res.json(records)
    } catch (err) {
      console.log('An error occurred looking up the projects: ', err)
      return failure(500, 'Internal Error', res)
    }
  }
}

exports.postProject = (deps) => {
  const db = deps.db
  return async (req, res) => {
    try {
      const post = await db('projects').insert({title: req.body.title,project_status: req.body.project_status,
        description: req.body.description,account_id: req.user[0].id 
      })
      return res.send({message: "Congratulations your project was created"})
    } catch (err) {
      console.log("Your project was not posted")
      return failure(500, "Your project was not posted", res)
    }
  }
}

//function for posting comment as the signed in user
exports.postComment = (deps) => {
  const db = deps.db
  return async (req, res)=> {
    try {
      const data = await db('comments').insert({comment_title:req.body.comment_title, 
        comment_body:req.body.comment_body, project_id:req.body.project_id
      })
      return res.send("Comment created")
    } catch (err){
      console.log("this is the err: ", err)
      return failure(500, 'Your comment could not be posted', res)
    }
  }
}

//function for getting all comments associated with the signed in user
exports.getComments = (deps) => {
  const db = deps.db
  return async (req, res) => {
    try {
      const data = await db('comments').select().where({project_id: req.params.project_id})
      res.send(data)
    } catch (err){
      console.log("This is the error for the get comments: ", err)
      return failure(500, "Your comments could not be retrieved", res)
    }
  }
}

exports.updateProject = (deps) => {
  const db = deps.db
  return async (req, res) => {
    try {
      const update = await db('projects')
      .update({title:req.body.title, 
              project_status:req.body.project_status,
              description: req.body.description
      })
      .where({project_id: req.body.project_id})
      return res.send("The project was updated")
    } catch (err){
      console.log("This is the updateProject error: ", err)
      return failure(500, "You project could not be updated", res)
    }
  }
}

exports.deleteProject = (deps) => {
  const db = deps.db
  return async (req, res) => {
    try{
      const deleteProject = await db('projects').del().where({project_id:req.params.project_id})
      console.log(deleteProject)
      return res.send("Success")
    } catch (err){
      console.log("This is the delete project error: ", err)
      return failure(500, "Your project was not deleted", res)
    }
  }
}

exports.deleteComment = (deps) => {
    const db = deps.db
    return async (req, res) => {
      try {
        const deleteComment = await db('comments').del().where({comment_id: req.params.comment_id})
        return res.send("Success")
      } catch (err) {
        console.log("Your comment was not deleted")
        return fauilure(500, "Your comment was not deleted", res)
      }
    }
}