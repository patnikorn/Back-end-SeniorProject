const mongoose = require('mongoose')
const constants = require('../configs/constants')   

const infoSchema = new mongoose.Schema(
    {
        userLineId: {
            type: String,
            require: true
        },
        userFirstName: {
            type: String,
            require: true
        },
        userLastName: {
            type: String,
            require: true
        },
        userIdNumber: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
    }
)

const infoModel = mongoose.model('information', infoSchema)

module.exports = infoModel