/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Button, Modal, Typography, styled } from "@mui/material";
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
} from "../../utils/constantsValue";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SnackBar from "../CommonComponent/SnackBar";

function WorkOrderStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [woStatusDisplayName, setWorkOrderStatusDisplayName] = useState(null);
  const [woStatusData, setWoStatusData] = useState({
    woStatusName: "",
    woStatusDisplayName: "",
    workOrderNumber: "",
    workOrderStatus: "",
    workOrderEndDate: "",
    account: {
      accountName: "",
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    getAllWorkOrderData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  const getAllWorkOrderData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/work-order`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  const handleModalopen = () => {
    setIsOpen(true);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    setSelectedFile(files[0]);
  };

  const handleFileUpload = async () => {
    // Check if a file is selected
    if (!selectedFile) {
      setShowSnackbar(true);
      setSnackMessage("Please select a file before uploading.");
      return;
    }

    // Filter Excel files only
    if (
      selectedFile.type === "application/vnd.ms-excel" ||
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // API call
      try {
        const response = await axios.post(
          "http://192.168.16.55:8080/rollingrevenuereport/api/v1/work-order/upload",
          formData
        );
        setIsOpen(false);
        getAllWorkOrderData();
        handleModalClose();
      } catch (error) {
        setShowSnackbar(true);
        setSnackMessage(error);
      }
    } else {
      setShowSnackbar(true);
      setSnackMessage("Please select a valid Excel file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    e.dataTransfer.dropEffect = "copy";
  };

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

  return (
    <>
      <div>
        <MemoizedBaseComponent
          field="Work Order"
          buttonText="UPLOAD WO"
          columns={["Account", "Order Number", "WO Status", "WO End Date", ""]}
          data={data}
          Tr={(obj) => {
            return (
              <Tr
                data={obj}
                getAllWorkOrderData={getAllWorkOrderData}
                setWoStatusData={setWoStatusData}
              />
            );
          }}
          setIsOpen={setIsOpen}
        />

        <div>
          <Modal open={isOpen} onClose={handleModalClose}>
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
                <ModalHeadingText>Upload WO</ModalHeadingText>
                <CloseIcon
                  onClick={() => {
                    handleModalClose();
                  }}
                  style={{ cursor: "pointer" }}
                />
              </ModalHeadingSection>
              <ModalDetailSection style={{ backgroundColor: "#F2FBFF" }}>
                <div style={{ marginTop: "16px" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>File:</span>
                </div>
                <Box style={{ backgroundColor: "#FFFFFF", margin: "20px" }}>
                  <DragAndDropContainer
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Typography variant="body1" style={{fontFamily:"Roboto"}}>
                      Drag and drop your files here or{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const fileInput = document.createElement("input");
                        fileInput.type = "file";
                        fileInput.accept =
                          "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // Accept only Excel files
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
                        fontFamily:"Roboto"
                      }}
                    >
                      Browse
                    </Button>
                  </DragAndDropContainer>
                </Box>
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
                  style={{ backgroundColor: "#1E4482", color: "#FFFFFF", fontFamily:"Roboto" }}
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
                    fontFamily:"Roboto" 
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>

        <SnackBar
          open={showSnackbar}
          message={snackMessage}
          onClose={() => setShowSnackbar(false)}
          autoHideDuration={10000}
        />
      </div>
    </>
  );
}

function Tr({
  getAllWorkOrderData,
  setWoStatusData,
  data: {
    woStatusId,
    woStatusName,
    woStatusDisplayName,
    isActive,
    workOrderId,
    workOrderNumber,
    workOrderEndDate,
    workOrderStatus,
    account,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    woStatusId: woStatusId,
    woStatusName: woStatusName,
    woStatusDisplayName: woStatusDisplayName,
    workOrderNumber: workOrderNumber,
    workOrderEndDate: workOrderEndDate,
    workOrderStatus: workOrderStatus,
    account: account,
    workOrderId: workOrderId,
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const OutsideClick = (ref) => {
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef);

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus/${woStatusId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllWorkOrderData();
      });
  };

  //activate/deactivate record
  const activeDeactivateTableData = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/work-order/activate-or-deactivate/${id}`
      );

      if (
        response.data?.message === "Success" &&
        response.data?.responseCode === 200
      ) {
        setIsOpen(false);
        setWoStatusData({
          woStatusName: "",
          woStatusDisplayName: "",
          workOrderNumber: "",
          workOrderStatus: "",
          workOrderEndDate: "",
          account: {
            accountName: "",
          },
        });
        getAllWorkOrderData();
      } else {
        setShowSnackbar(true);
        setSnackMessage("An error occurred while processing the request.");
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details);
    }
  };

  const handleModalopen = () => {
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{account.accountName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{workOrderNumber || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{workOrderStatus || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{workOrderEndDate || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection style={{ position: "relative" }}>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div
                style={{
                  float: "right",
                  right: "20px",
                  position: "absolute",
                  overflow: "hidden",
                  width: "100px",
                  boxShadow: "none",
                }}
                class="dropdown-content"
              >
                <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(workOrderId);
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <ToggleOnIcon
                      style={{ fontSize: "22px", paddingRight: "3px" }}
                    />

                    <p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
                  </div>
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(workOrderId);
                  }}
                  style={{ padding: "5px" }}
                >
                  <div style={{ display: "flex" }}>
                    <ToggleOffIcon
                      style={{ fontSize: "22px", paddingRight: "3px" }}
                    />
                    <p style={{ margin: "3px 0px 0px 0px" }}>Deactivate</p>
                  </div>
                </a>
              </div>
            )}
          </span>
        </TableCellSection>
      </TableRowSection>
      <SnackBar
        open={showSnackbar}
        message={snackMessage}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={10000}
      />
    </React.Fragment>
  );
}

export default WorkOrderStatus;
