const app = require('./app');
const PORT = process.env.PORT || 4000;
const path = require("path");
const fs = require("fs");
const mime = require("mime");

// Routes
const uploadRoute = require("./routes/upload");
const downloadRoute = require("./routes/download");

app.use("/upload", uploadRoute);
app.use("/download", downloadRoute);


const folderPath = path.join(__dirname, "./uploads");
const mime_type = mime.getType(folderPath);

app.get("/api/files/metadata", (req, res) => {
  // Read the files in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      res.status(500).json({ error: "Unable to read folder" });
      return;
    }

    // Extract metadata for each file
    const metadata = [];
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileStat = fs.statSync(filePath);
      const fileMetadata = {
        name: file,
        size: fileStat.size,
        type: mime_type, // You can use a library like 'mime' to get the file type
        lastModifiedDate: fileStat.birthtime.toISOString(),
      };
      metadata.push(fileMetadata);
    });

    res.json(metadata);
  });
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
