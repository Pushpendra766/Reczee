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
import axios from "axios";
import FileDownload from "js-file-download";
import { useEffect } from "react";

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

export default function SavedFileTable({ files, setUploadedFiles }) {
  const apiEndpoint = "http://localhost:4000/download";

  function handleDownload(file) {
    axios({
      method: "get",
      url: apiEndpoint,
      responseType: "blob",
      params: {
        fileName: file.name,
      },
    }).then((response) => {
      FileDownload(response.data, file.name);
    });
  }

  useEffect(() => {
    axios.get("http://localhost:4000/api/files/metadata").then((response) => {
      console.log(response.data);
      setUploadedFiles(response.data);
    });
  }, []);

  return (
    <div>
      <Typography variant="p">Uploaded Files</Typography>
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
                    onClick={() => handleDownload(file)}
                  >
                    Download
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
