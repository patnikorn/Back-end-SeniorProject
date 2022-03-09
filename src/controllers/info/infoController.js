const express = require("express");

const Joi = require("joi");
const Validate = require("express-joi-validator");
const responseCode = require("../../configs/responseCode");

const infoModel = require("../../models/infoModel");
const infoDecorator = require("../../decorators/infoDecorator");

const router = express.Router();

router.get("/", async (request, response, next) => {
  const data = await infoModel.find();

  const decorator = await data.map((info) => infoDecorator.Decorator(info));
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.get("/:id", async (request, response, next) => {
    const data = await infoModel.find({ _id:request.params.id });
  
    const decorator = await data.map((info) => infoDecorator.Decorator(info));
    response.json({
      code: responseCode.SUCCESS,
      message: "success",
      data: decorator,
    });
  });

router.post("/", async (request, response, next) => {
  const informationModel = await infoModel(request.body).save();
  const decorator = await infoDecorator.Decorator(informationModel);
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.post("/update", async (request, response, next) => {
  const informationModel = await infoModel.findOneAndUpdate(
    { _id: request.body.id },
    {
      $set: {
        "userFirstName": request.body.userFirstName,
        "userLastName": request.body.userLastName,
        "userIdNumber": request.body.userIdNumber,
        "email": request.body.email,
      },
    }
  );
  const decorator = await infoDecorator.Decorator(informationModel);
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

module.exports = router;
