const mongoose = require('mongoose')
const constants = require('../configs/constants')   

const announcementSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        subTitle: {
            type: String,
            require: true
        },
    }
)

const announcementModel = mongoose.model('announcement', announcementSchema)

module.exports = announcementModel