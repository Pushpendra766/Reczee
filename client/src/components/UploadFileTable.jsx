import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import axios from "axios";import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

toastConfig({ theme: "dark" });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UploadFileTable({ files, setFiles, setUploadedFiles }) {
  const handleUpload = (file) => {
    console.log(file);

    const formData = new FormData();
    formData.append("user_file", file);
    if (file.size < 2 * 1024 * 1024) {
      axios({
        method: "POST",
        url: "http://localhost:4000/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(() => {
          toast("✅  File uploaded successfully.");
          setUploadedFiles((oldFiles) => [...oldFiles, file]);
          setFiles((files) => files.filter((f) => f.name != file.name));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      toast("❌  File size should not exceed 2 mb.");
      console.log("File size should not exceed 2 mb.");
    }
  };

  return (
    <div>
      <Typography variant="p">Selected Files</Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>File Name</StyledTableCell>
              <StyledTableCell align="right">File Size</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <StyledTableRow key={file.name}>
                <StyledTableCell component="th" scope="row">
                  {file.name}
                </StyledTableCell>
                <StyledTableCell align="right">{file.size}</StyledTableCell>
                <StyledTableCell align="right">
                  {file.lastModifiedDate.toLocaleString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#3D3FBB",
                      color: "#fff",
                      textTransform: "none",
                    }}
                    onClick={() => handleUpload(file)}
                  >
                    Upload
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
