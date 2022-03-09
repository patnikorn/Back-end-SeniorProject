const mongoose = require('mongoose')
const constants = require('../configs/constants')   

const complaintSchema = new mongoose.Schema(
    {
        userLineId: {
            type: String,
            require: true
        },
        complaintFirstName: {
            type: String,
            require: true
        },
        complaintLastName: {
            type: String,
            require: true
        },
        complaintStudentId: {
            type: String,
            require: true
        },
        complaintText: {
            type: String,
            require: true
        },
    }
)

const complaintModel = mongoose.model('complaint', complaintSchema)

module.exports = complaintModel