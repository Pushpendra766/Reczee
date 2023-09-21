const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024;

// Middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES,
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("An error occurred while processing the request.");
});

app.use(cors());

// Routes
app.post("/upload", handleFileUpload, (req, res) => {
  res.send("File upload");
});

app.get("/download", (req, res) => {
  res.download(`./uploads/${req.query.fileName}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
