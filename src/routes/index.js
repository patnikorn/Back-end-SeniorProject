const express = require('express')
const test = require('./test')
const info = require('./info')
const annoucement = require('./annoucement')
const complaint = require('./complaint')
const filedata = require('./fileData')
const survey = require('./survey')
const router = express.Router()

router.use(test)
router.use(info)
router.use(annoucement)
router.use(complaint)
router.use(filedata)
router.use(survey)

module.exports = router
