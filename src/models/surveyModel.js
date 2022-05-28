const mongoose = require('mongoose')
const constants = require('../configs/constants')   

const surveySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        subTitle: {
            type: String,
            require: true
        },
        numberStudentDS: {
            type: Number,
            require: true
        },
        numberStudentSI: {
            type: Number,
            require : true
        },
        question: {
            type: String,
            require: true
        }
    }
)

const surveyModel = mongoose.model('survey', surveySchema)

module.exports = surveyModel