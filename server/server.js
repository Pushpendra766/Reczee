const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");

app.use(cors());

//middleware

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("user_file");

function handleFileUpload(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).send("File size exceeded the limit (2MB).");
    } else if (err) {
      res.status(500).send("An error occurred while uploading the file.");
    } else {
      next();
    }
  });
}

//routes

app.post("/upload", handleFileUpload, (req, res) => {
  res.send("File upload");
});

app.get("/download", (req, res) => {
  res.download("./uploads/" + req.query.fileName);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
