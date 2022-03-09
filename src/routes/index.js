const express = require('express')
const test = require('./test')
const info = require('./info')
const annoucement = require('./annoucement')
const complaint = require('./complaint')
const router = express.Router()

router.use(test)
router.use(info)
router.use(annoucement)
router.use(complaint)

module.exports = router
