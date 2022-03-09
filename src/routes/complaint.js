// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const complaintController = require('../controllers/complaint/complaintController')

router.use('/complaint', complaintController)


module.exports = router