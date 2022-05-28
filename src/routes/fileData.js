// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const fileData = require('../controllers/fileData/fileDataController')

router.use('/filedata', fileData)


module.exports = router
