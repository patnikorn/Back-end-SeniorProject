const express = require("express");

const Joi = require("joi");
const Validate = require("express-joi-validator");
const responseCode = require("../../configs/responseCode");

const complaintModel = require("../../models/complaintModel");
const complaintDecorator = require("../../decorators/complaintDecorator");

const router = express.Router();

router.get("/", async (request, response, next) => {
  const data = await complaintModel.find();

  const decorator = await data.map((complaint) => complaintDecorator.Decorator(complaint));
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

// router.get("/:id", async (request, response, next) => {
//     const data = await infoModel.find({ _id:request.params.id });
  
//     const decorator = await data.map((info) => infoDecorator.Decorator(info));
//     response.json({
//       code: responseCode.SUCCESS,
//       message: "success",
//       data: decorator,
//     });
//   });

router.post("/", async (request, response, next) => {
  const complaint = await complaintModel(request.body).save();
  const decorator = await complaintDecorator.Decorator(complaint);
  response.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: decorator,
  });
});

// router.post("/update", async (request, response, next) => {
//   const informationModel = await infoModel.findOneAndUpdate(
//     { _id: request.body.id },
//     {
//       $set: {
//         "userFirstName": request.body.userFirstName,
//         "userLastName": request.body.userLastName,
//         "userIdNumber": request.body.userIdNumber,
//         "email": request.body.email,
//       },
//     }
//   );
//   const decorator = await infoDecorator.Decorator(informationModel);
//   response.json({
//     code: responseCode.SUCCESS,
//     message: "success",
//     data: decorator,
//   });
// });

module.exports = router;
