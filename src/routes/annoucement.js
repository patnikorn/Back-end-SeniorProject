// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const annoucementController = require('../controllers/annoucement/annoucementController')

router.use('/annoucement', annoucementController)


module.exports = router
