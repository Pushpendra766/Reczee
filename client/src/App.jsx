import UploadFileTable from "./components/UploadFileTable";
import SavedFileTable from "./components/SavedFileTable";
import DropZone from "./components/DropZone";
import { Paper } from "@mui/material";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  return (
    <Paper
      elevation={6}
      className="w-2/3 mx-auto my-20 p-6 flex flex-col gap-10"
    >
      <DropZone setFiles={setFiles} />
      <UploadFileTable
        files={files}
        setFiles={setFiles}
        setUploadedFiles={setUploadedFiles}
      />
      <SavedFileTable files={uploadedFiles} />
    </Paper>
  );
}

export default App;
