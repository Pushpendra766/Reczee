const express = require("express");
const { handleFileUpload } = require("../middlewares/uploadMiddleware");

const uploadRoute = express.Router();

// Routes
uploadRoute.post("/", handleFileUpload, (req, res) => {
  res.send("File upload");
});

module.exports = uploadRoute;
