// import express from 'express'
const express = require('express')

const router = express.Router()

// import UserController from '../controllers/users/UserController'
const infoController = require('../controllers/info/infoController')

router.use('/info', infoController)


module.exports = router
