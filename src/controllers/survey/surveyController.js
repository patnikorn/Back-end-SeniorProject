const express = require("express");

const Joi = require("joi");
const Validate = require("express-joi-validator");
const responseCode = require("../../configs/responseCode");

const surveyModel = require("../../models/surveyModel");
const surveyDecorator = require("../../decorators/surveyDecorator");

const router = express.Router();

router.get("/", async (request, response, next) => {
  const data = await surveyModel.find();

  const decorator = await data.map((info) => surveyDecorator.Decorator(survey));
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.get("/getAll", async (request, response, next) => {
    const data = await surveyModel.find();
  
    const decorator = await data.map((survey) => surveyDecorator.Decorator(survey));
    response.json({
      code: responseCode.SUCCESS,
      message: "success",
      data: decorator,
    });
  });

router.get("/:id", async (request, response, next) => {
    const data = await surveyModel.find({ _id:request.params.id });
  
    const decorator = await data.map((survey) => surveyDecorator.Decorator(survey));
    response.json({
      code: responseCode.SUCCESS,
      message: "success",
      data: decorator,
    });
  });

router.post("/", async (request, response, next) => {
    console.log(request.body)
  const survey = await surveyModel(request.body).save();
  //ตั้งตัวแปลใหม่ ไม่ให้ซ้ำกับ model
  const decorator = await surveyDecorator.Decorator(survey);
  //ตั้งตัวแปลใหม่ ไม่ให้ซ้ำกับ model
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.post("/update", async (request, response, next) => {
  const survey = await surveyModel.findOneAndUpdate(
      //ห้ามชื่อซ้ำกับ modle
    { _id: request.body.id },
    {
      $set: {
        "title": request.body.title,
        "subTitle": request.body.subTitle,
        "question": request.body.question,
        "numberStudentDS": request.body.numberStudentDS,
        "numberStudentSI": request.body.numberStudentSI,
      },
    }
  );
  const decorator = await surveyDecorator.Decorator(survey);
  //ห้ามชื่อซ้ำกับ modle
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.get("/delete/:id", async (request, response, next) => {
    const data = await surveyModel.deleteOne({ _id:request.params.id });
    response.json({
      code: responseCode.SUCCESS,
      message: "success",
    });
  });

module.exports = router;
