const express = require("express");
var xlsxtojson = require("xlsx-to-json");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const Joi = require("joi");
const Validate = require("express-joi-validator");
const responseCode = require("../../configs/responseCode");

const fileDataModel = require("../../models/fileDataModel");
const fileDataDecorator = require("../../decorators/fileDataDecorator");
const router = express.Router();
const gpa = {
  A: 4,
  "B+": 3.5,
  B: 3,
  "C+": 2.5,
  C: 2,
  "D+": 1.5,
  D: 1,
  F: 0,
  "-": 0,
};

router.post("/upload", upload.single("files"), async (req, res) => {
  await xlsxtojson(
    {
      input: req.file.path, // input xls
      output: "../output.json", // output json
      lowerCaseHeaders: true,
    },
    async function (err, result) {
      if (err) {
        console.log("error");
      } else {
        for (var attributename in result) {
          if (result[attributename]["รหัสประจำตัว"]) {
            // console.log(result[attributename]["รหัสประจำตัว"]);
            //  console.log({'1145200':gpa[result[attributename]['1145200']],
            //               '1145201':gpa[result[attributename]['1145201']],
            //               '1145202':gpa[result[attributename]['1145202']],
            //               '1145203':gpa[result[attributename]['1145203']],
            //               '1145204':gpa[result[attributename]['1145204']],
            //               '1145205':gpa[result[attributename]['1145205']],
            //               '1145206':gpa[result[attributename]['1145206']],
            //               '1145207':gpa[result[attributename]['1145207']],
            //               '1145208':gpa[result[attributename]['1145208']],
            //               '1145209':gpa[result[attributename]['1145209']],
            //               '1145210':gpa[result[attributename]['1145210']],
            //               '1145211':gpa[result[attributename]['1145211']],
            //               '1145212':gpa[result[attributename]['1145212']],
            //               '1145213':gpa[result[attributename]['1145213']],
            //               '1145214':gpa[result[attributename]['1145214']],
            //               '1145215':gpa[result[attributename]['1145215']],
            //               '1145216':gpa[result[attributename]['1145216']],
            //               '1145217':gpa[result[attributename]['1145217']],
            //               '1145218':gpa[result[attributename]['1145218']],
            //               '1145219':gpa[result[attributename]['1145219']],
            //               '1145220':gpa[result[attributename]['1145220']],
            //               '1145221':gpa[result[attributename]['1145221']],
            //               '1145222':gpa[result[attributename]['1145222']],
            //               '1146212':gpa[result[attributename]['1146212']],})
            await fileDataModel({
              studentId: result[attributename]["รหัสประจำตัว"],
              subjectData: {
                1145204: gpa[result[attributename]["1145204"]],
                1145220: gpa[result[attributename]["1145220"]],
              },
            }).save();
          }
        }
      }
    }
  );
  res.json({ msg: "Upload Works" });
});

router.get("/findIdStudent/:id", async (req, res) => {
  console.log(req.params.id);
  let status = 0;
  const data = await fileDataModel.find({ studentId: req.params.id });
  console.log(data[0].subjectData["1145204"]);
  if (data[0].subjectData["1145204"] >= 3.5) {
    status = 2;
  }
  if (data[0].subjectData["1145220"] >= 3.5) {
    status = 1;
  }
  if (
    data[0].subjectData["1145204"] >= 3.5 &&
    data[0].subjectData["1145220"] >= 3.5
  ) {
    status = 3;
  }
  // const decorator = await data.map((findId) =>
  //   fileDataDecorator.Decorator(findId)
  // );
  res.json({
    code: responseCode.SUCCESS,
    message: "success",
    data: status,
  });
});
// router.post("/", async (request, response,next) => {
//   console.log(request.files)
//   await xlsxtojson(
//     {
//       input:  path.join(__dirname,".","test",'Import.xlsx'), // input xls
//       output: "output.json", // output json
//       lowerCaseHeaders: true,
//     },
//     function (err, result) {
//       if (err) {
//         console.log("error");
//       } else {
//         for (var attributename in result) {
//           if (result[attributename]["รหัสประจำตัว"]) {
//             console.log(result[attributename]);
//           }
//         }
//       }
//     }
//   );
// });

module.exports = router;
