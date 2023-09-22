const app = require('./app');
const PORT = process.env.PORT || 4000;

// Routes
const uploadRoute = require("./routes/upload");
const downloadRoute = require("./routes/download");

app.use("/upload", uploadRoute);
app.use("/download", downloadRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
