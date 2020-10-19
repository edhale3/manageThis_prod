const express = require('express')
const passport = require('passport');
const bcrypt = require('bcrypt')
const PostingError = require('../errors/PostingError');
const ReferenceError = require('../errors/ResourceNotFoundError');
const ResourceNotFoundError = require('../errors/ResourceNotFoundError');
//function for posting a project
exports.postProject = (deps) => {
  const db = deps.db
  return async (req, res) => {
    const post = await db('projects')
    .insert({title: req.body.title,project_status: req.body.project_status,
      description: req.body.description,account_id: req.user[0].id 
    })
    .catch( err => { throw new PostingError('projects', req.body, err.message)})
    return res.send({message: "Congratulations your project was created"})
  }
}
//function for posting comment as the signed in user
exports.postComment = (deps) => {
  const db = deps.db
  return async (req, res)=> {
    const data = await db('comments')
    .insert({comment_title:req.body.comment_title, comment_body:req.body.comment_body, project_id:req.body.project_id
    })
    .catch( err => { throw new PostingError('comments', req.body, err.message)})
    return res.send({message:"Comment created"})
  }
}
//function for getting all comments associated with the signed in user
exports.getComments = (deps) => {
  const db = deps.db
  return async (req, res) => {
    const data = await db('comments').select()
    .where({project_id: req.params.project_id})
    .catch( err => { throw new ResourceNotFoundError('comments', req.params.project_id)})
    return res.send(data)
  }
}
//function for updating project details
exports.updateProject = (deps) => {
  const db = deps.db
  return async (req, res) => {
    const update = await db('projects')
    .update({title:req.body.title, project_status:req.body.project_status, description: req.body.description})
    .where({project_id: req.body.project_id})
    .catch( err => { throw new PostingError('comments', req.body, err.message)})
    return res.send({message:"The project was updated"})
  }
}
//function for deleting entire project
exports.deleteProject = (deps) => {
  const db = deps.db
  return async (req, res) => {
    const deleteProject = await db('projects').del()
    .where({project_id:req.params.project_id})
    .catch( err => {throw new Error(err)})
    return res.send("Success")
  }
}
//function for deleting comment
exports.deleteComment = (deps) => {
  const db = deps.db
  return async (req, res) => {
    const deleteComment = await db('comments').del()
    .where({comment_id: req.params.comment_id})
    .catch( err => {throw new Error(err)})
    return res.send("Success")
  }
}