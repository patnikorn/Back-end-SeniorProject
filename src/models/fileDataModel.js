const mongoose = require('mongoose')
const constants = require('../configs/constants')   

const fileDataSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            require: true
        },
        subjectData: {
            type: Object,
            require: true
        },
    }
)

const fileDataModel = mongoose.model('fileDataModel', fileDataSchema)

module.exports = fileDataModel