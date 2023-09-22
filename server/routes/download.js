const express = require("express");

const downloadRoute = express.Router();

// Routes
downloadRoute.get("/", (req, res) => {
  res.download(`./uploads/${req.query.fileName}`);
});

module.exports = downloadRoute;
