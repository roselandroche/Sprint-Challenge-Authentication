const bcrypt = require('bcrypt')
// const express = require('express')
const authModel = require('./auth-model')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const restricted = require('./authenticate-middleware')

const router = require('express').Router();

router.get('/', restricted(), async (req, res, next) => {
  try {
    const users = await authModel.find()
    return res.json(users)
  }
  catch (err) {
    next(err)
  }
}) 

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const newUser = await authModel.add(req.body)
    res.status(201).json(newUser)
  }
  catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  // implement login
  try{
    const { username, password } = req.body
    const user = await authModel.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if(user && passwordValid) {
      const token = jwt.sign({
        subject: user.id,
        user: user.username,
      }, secrets.jwt, {
        expiresIn: '7d'
      })

      res.status(200).json({
        message: `Welcome ${user.username}`,
        token: token,
      })
    }
  }
  catch (err) {
    next(err)
  }
});

module.exports = router;
