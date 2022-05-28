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
           await fileDataModel({'studentId':result[attributename]["รหัสประจำตัว"],'subjectData':result[attributename]}).save();
          }
        }
      }
    }
  );
  res.json({ msg: "Upload Works" });
});

router.get("/findIdStudent/:id",async (req, res) => {
  console.log(req.params.id);
  const data = await fileDataModel.find({ studentId:req.params.id });
  
    const decorator = await data.map((findId) => fileDataDecorator.Decorator(findId));
    res.json({
      code: responseCode.SUCCESS,
      message: "success",
      data: decorator,
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
