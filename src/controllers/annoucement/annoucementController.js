const express = require("express");

const Joi = require("joi");
const Validate = require("express-joi-validator");
const responseCode = require("../../configs/responseCode");

const announcementModel = require("../../models/announcementModel");
const annoucementDecorators = require("../../decorators/annoucementDecorators");

const router = express.Router();

router.get("/", async (request, response, next) => {
  const data = await announcementModel.find();

  const decorator = await data.map((info) => annoucementDecorators.Decorator(announcement));
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.get("/getAll", async (request, response, next) => {
    const data = await announcementModel.find();
  
    const decorator = await data.map((annoucement) => annoucementDecorators.Decorator(annoucement));
    response.json({
      code: responseCode.SUCCESS,
      message: "success",
      data: decorator,
    });
  });

router.get("/:id", async (request, response, next) => {
    const data = await announcementModel.find({ _id:request.params.id });
  
    const decorator = await data.map((annoucement) => annoucementDecorators.Decorator(annoucement));
    response.json({
      code: responseCode.SUCCESS,
      message: "success",
      data: decorator,
    });
  });

router.post("/", async (request, response, next) => {
    console.log(request.body)
  const announcement = await announcementModel(request.body).save();
  //ตั้งตัวแปลใหม่ ไม่ให้ซ้ำกับ model
  const decorator = await annoucementDecorators.Decorator(announcement);
  //ตั้งตัวแปลใหม่ ไม่ให้ซ้ำกับ model
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.post("/update", async (request, response, next) => {
  const announcement = await announcementModel.findOneAndUpdate(
      //ห้ามชื่อซ้ำกับ modle
    { _id: request.body.id },
    {
      $set: {
        "title": request.body.title,
        "subTitle": request.body.subTitle,
      },
    }
  );
  const decorator = await annoucementDecorators.Decorator(announcement);
  //ห้ามชื่อซ้ำกับ modle
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

router.get("/delete/:id", async (request, response, next) => {
    const data = await announcementModel.deleteOne({ _id:request.params.id });
    response.json({
      code: responseCode.SUCCESS,
      message: "success",
    });
  });

module.exports = router;
