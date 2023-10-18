import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import {
  Checkbox,
  Table,
  TableCell,
  TableRow,
  Button,
  Typography,
  styled,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import { Modal, Box } from "@mui/material";
import {
  TableRowSection,
  TableCellSection,
  ModalHeadingSection,
  ModalHeadingText,
  ModalDetailSection,
  InputTextLabel,
  InputField,
  ButtonSection,
  ModalControlButton,
  MoadalStyle,
  revenueModalStyleObject,
} from "../../../utils/constantsValue";
import {
  TableHeadingSection,
  TableHeading,
  //   TableButtons,
} from "../../../utils/Value";
import CloseIcon from "@mui/icons-material/Close";

// overwrite material UI component styles
const TableButtons = styled(Button)({
  background: "#1E4482",
  marginRight: "29px",
  color: "#FFFFFF",
  fontSize: "12px",
  padding: "0px 10px",
  height: "34px",
  marginTop: "6px",
  "&:hover": {
    backgroundColor: "#1E4482",
  },
});

const DragAndDropContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  border: "1px solid #FFFFFF",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  height: "150px",
});

// declare functional component
function InvoiceDataUpload() {
  console.log("InvoiceDataUpload");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  //   setIsOpen(true);
  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };
  const columns = ["Month", "File", "Upload Date", ""];

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setSelectedFile(files[0]);
  };

  const handleFileUpload = ()=>{

  }

  const onMonthChange = ()=>{

  }

  // In the above section till here, all the functions and state are declared and defined
  // renders the html
  return (
    <div>
      <div className="table_container">
        <TableHeadingSection>
          <TableHeading>Invoice Data Upload </TableHeading>
          <TableButtons onClick={() => setIsOpen(true)}>
            Upload Invoice Data
          </TableButtons>
        </TableHeadingSection>
        <React.Fragment>
          <TableContainer
            style={{
              width: "98%",
              marginTop: "25px",
              overflowY: "scroll",
              height: "70vh",
            }}
          >
            <Table>
              <TableHead>
                <TableRow style={{ background: "rgba(225, 222, 222, 0.5)" }}>
                  {columns.map((header) => {
                    return (
                      <TableCell
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#000000",
                          padding: "13px 15px",
                        }}
                      >
                        {header}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <tbody>
                {/* {props.data && props.data.map((obj, id) => props.Tr({ ...obj }))} */}
              </tbody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </div>

      {/* HTML for popup */}
      <div>
        <Modal open={isOpen} onClose={() => handleModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              width: 500,
              borderRadius: "8px",
            }}
          >
            <ModalHeadingSection>
              <ModalHeadingText>Upload Invoice Data</ModalHeadingText>
              <CloseIcon
                onClick={() => {
                  handleModalClose();
                }}
                style={{ cursor: "pointer" }}
              />
            </ModalHeadingSection>
            <ModalDetailSection style={{ backgroundColor: "#F2FBFF", flexDirection: 'column'}}>
                {/* <div style={{display: "flex", flexDirection: columns}}> */}
              <div >
              <label
                  id="region"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span style={{ color: "red" }}>*</span>
                  Month : 
                </label>
                <select
                style={{width: "50%", marginLeft: "10px"}}
                onChange={()=>{onMonthChange()}}
                >
                    <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                </select>
              </div>
              <div>
                <div style={{ marginTop: "16px" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>File:</span>
                </div>
                <Box style={{ backgroundColor: "#FFFFFF", margin: "20px" }}>
                  <DragAndDropContainer
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Typography variant="body1">
                      Drag and drop your files here or{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const fileInput = document.createElement("input");
                        fileInput.type = "file";
                        // fileInput.accept =
                        //   "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // Accept only Excel files
                        fileInput.addEventListener(
                          "change",
                          handleFileInputChange
                        );
                        fileInput.click();
                      }}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#1E4482",
                        color: "#FFFFFF",
                      }}
                    >
                      Browse
                    </Button>
                  </DragAndDropContainer>
                </Box>
                
              </div>
              {/* </div> */}
            </ModalDetailSection>
            <Box
                style={{
                  textAlign: "center",
                  paddingBottom: "15px",
                  backgroundColor: "#F2FBFF",
                  borderRadius: "10px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleFileUpload}
                  style={{ backgroundColor: "#1E4482", color: "#FFFFFF" }}
                >
                  Upload
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleModalClose();
                  }}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#1E4482",
                    color: "#FFFFFF",
                  }}
                >
                  Cancel
                </Button>
              </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default InvoiceDataUpload;
