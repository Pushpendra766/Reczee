import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";

function DropZone({ setFiles }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    console.log(acceptedFiles[0]);
    setFiles(acceptedFiles);
  }, [acceptedFiles, setFiles]);

  return (
    <section className="container bg-gradient-to-r from-[#7AD7F0] to-[#F5FCFF]  w-2/3 mx-auto border-2 border-[#000] rounded-md border-dashed">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-100 p-4 py-10 text-center"
      >
        <input {...getInputProps()} />
        <p>Drop Your Files Here</p>
        <p>or Click to Upload</p>
      </div>
    </section>
  );
}

export default DropZone;
