// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const surveyController = require('../controllers/survey/surveyController')

router.use('/survey', surveyController)


module.exports = router