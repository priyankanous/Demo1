/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalFormButton, ModalHeading, ModalIcon } from "../../utils/Value";
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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SnackBar from "../CommonComponent/SnackBar";

function WorkOrderStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [woStatusName, setWorkOrderStatusName] = useState(null);
  const [woStatusDisplayName, setWorkOrderStatusDisplayName] = useState(null);
  const [woStatusData, setWoStatusData] = useState({
    woStatusName: "",
    woStatusDisplayName: "",
    workOrderNumber:"",
    workOrderStatus:"",
    workOrderEndDate:"",
    account:{
      accountName:"",
    }
  });

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);

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

  // const getAllWorkOrderData = () => {
  //   axios
  //     .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus`)
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       setData(actualDataObject);
  //     });
  // };

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

  // const AddDataToWorkOrderStatus = async (e) => {
  //   if (woStatusData.woStatusName.trim() === "") {
  //     setIsNameEmpty(true);
  //   } else {
  //     setIsNameEmpty(false);
  //   }

  //   if (woStatusData.woStatusDisplayName.trim() === "") {
  //     setIsDisplayNameEmpty(true);
  //   } else {
  //     setIsDisplayNameEmpty(false);
  //   }
  //   if (!isNameEmpty && !isDisplayNameEmpty) {
  //     try {
  //       const response = await axios.post(
  //         "http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus",
  //         woStatusData
  //       );
  //       setIsOpen(false);
  //       getAllWorkOrderData();
  //     } catch {}
  //   }
  // };

  // const [openCheck, setOpenCheck] = useState(false);

  // const handleCheckingOpen = () => {
  //   setOpenCheck(true);
  // };

  // const handleCheckClose = () => {
  //   setOpenCheck(false);
  // };

//checking

const handleFileInputChange = (e) => {
  const files = e.target.files;
  console.log('Selected files:', files);
  setSelectedFile(files[0]);
};

  const handleFileUpload = async () => {
    console.log('Upload button clicked');

    // Check if a file is selected
    if (!selectedFile) {
      console.log('Please select a file before uploading.');
      setShowSnackbar(true); 
      setSnackMessage("Please select a file before uploading."); 
      return;
    }

    // Filter Excel files only
    if (
      selectedFile.type === 'application/vnd.ms-excel' ||
      selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make the API call
      try {
      const response = await axios.post(
        'http://192.168.16.55:8080/rollingrevenuereport/api/v1/work-order/upload',
        formData
        );
        console.log('API response:', response.data);
        setIsOpen(false);
        getAllWorkOrderData();
      } catch (error) {
        console.error('Error while uploading the file:', error);
        setShowSnackbar(true); // Show the Snackbar with error message
        setSnackMessage(error); // Set the error message for the Snackbar


      }
    } else {
      console.log('Please select a valid Excel file.');
      setShowSnackbar(true); // Show the Snackbar with error message
      setSnackMessage("Please select a valid Excel file"); // Set the error message for the Snackbar

    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    const file = e.dataTransfer.files[0]; // Get the first file from the dropped files
    setSelectedFile(file);
  };

  // const handleInputChange = (e) => {
  //   e.stopPropagation(); // Prevent the click event from propagating to the parent container
  //   const file = e.target.files[0]; // Get the selected file from the input
  //   handleFileUpload(file);
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    e.dataTransfer.dropEffect = 'copy';
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
          field="Work Order status"
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
              // boxShadow: 24,
              width: 500,
              borderRadius: "8px",
              // padding:"6px 12px"
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
                  const fileInput = document.createElement('input');
                  fileInput.type = 'file';
                  fileInput.accept =
                    'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; // Accept only Excel files
                  fileInput.addEventListener('change', handleFileInputChange);
                  fileInput.click();
                }}
                style={{marginLeft:"10px", backgroundColor:"#1E4482",color:"#FFFFFF"}}
              >
                    Browse
                  </Button>
                </DragAndDropContainer>

              </Box>
              
            </ModalDetailSection>
            <Box style={{textAlign:"center", paddingBottom:"15px", backgroundColor:"#F2FBFF",borderRadius:"10px"}} >
              <Button
                variant="contained"
                onClick={handleFileUpload}

                style={{backgroundColor:"#1E4482", color:"#FFFFFF"}}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleModalClose();
                }}
                style={{marginLeft: "10px" , backgroundColor:"#1E4482", color:"#FFFFFF"}}
              >
                Cancel
              </Button>
            </Box>
 
          </Box>
          {/* <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            // boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: '8px',
          }}
        >
          <div style={{height:"20px", background:"red"}}>
          <Typography variant="h5" gutterBottom>
            Upload
          </Typography>
          </div>

          <DragAndDropContainer
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
            onClick={(e) => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/*'; // Limit to image files, change if needed
              fileInput.addEventListener('change', handleFileUpload);
              fileInput.click();
            }}
          >
            Drag and drop your file here or click to browse
          </DragAndDropContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleFileUpload}>
              Upload
            </Button>
            <Button variant="contained" color="error" onClick={handleCheckClose} sx={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Box>
        </Box> */}
        </Modal>
      </div>

      <SnackBar
				open={showSnackbar}
				message={snackMessage}
				onClose={() => setShowSnackbar(false)}
        autoHideDuration={10000}
			/>
        {/* <Modal  onClose={handleModalClose}>
          <Box sx={MoadalStyle}>
            <ModalHeadingSection>
              <ModalHeadingText>Setup Work Order Status</ModalHeadingText>
              <CloseIcon
                onClick={() => {
                  setIsOpen(false);
                }}
                style={{ cursor: "pointer" }}
              />
            </ModalHeadingSection>

            <ModalDetailSection>
              <form id="reg-form">
                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>
                    <span style={{ color: "red" }}>*</span>
                    <span>Name</span>
                  </InputTextLabel>
                  <InputField
                    size="small"
                    type="text"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
                    onChange={(e) => {
                      setWoStatusData({
                        ...woStatusData,
                        woStatusName: e.target.value,
                      });
                    }}
                    style={{
                      border: isNameEmpty
                        ? "1px solid red"
                        : "1px solid transparent",
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>
                    <span style={{ color: "red" }}>*</span>
                    <span>Display Name</span>
                  </InputTextLabel>
                  <InputField
                    size="small"
                    type="text"
                    id="email"
                    variant="outlined"
                    spellcheck="false"
                    onChange={(e) => {
                      setWoStatusData({
                        ...woStatusData,
                        woStatusDisplayName: e.target.value,
                      });
                    }}
                    style={{
                      border: isDisplayNameEmpty
                        ? "1px solid red"
                        : "1px solid transparent",
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <ButtonSection>
                  <ModalControlButton
                    type="button"
                    value="Save"
                    id="create-account"
                    variant="contained"
                    onClick={AddDataToWorkOrderStatus}
                  >
                    Save
                  </ModalControlButton>
                  <ModalControlButton
                    type="button"
                    variant="contained"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    value="Cancel"
                    id="create-account"
                  >
                    Cancel
                  </ModalControlButton>
                </ButtonSection>
              </form>
            </ModalDetailSection>
          </Box>
        </Modal> */}
      </div>
    </>
  );
}

function Tr({
  getAllWorkOrderData,
  setWoStatusData,
  data: { woStatusId, woStatusName, woStatusDisplayName, isActive, active,workOrderId, workOrderNumber,workOrderEndDate,workOrderStatus,account },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    woStatusId: woStatusId,
    woStatusName: woStatusName,
    woStatusDisplayName: woStatusDisplayName,
    workOrderNumber: workOrderNumber,
    workOrderEndDate:workOrderEndDate,
    workOrderStatus:workOrderStatus,
    account:account,
    workOrderId:workOrderId,
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  console.log("active", isActive);
  console.log("workOrderNumber", workOrderNumber);



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
  // const activeDeactivateTableData = async (id) => {
  //   const { data } = await axios.put(
  //     `http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus/activate-or-deactivate/${id}`
  //   );
  //   if (data?.message === "Success" && data?.responseCode === 200) {
  //     setWoStatusData({ woStatusName: "", woStatusDisplayName: "" });
  //     setIsOpen(false);
  //     getAllWorkOrderData();
  //   }
  // };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/work-order/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setWoStatusData({ 
        woStatusName: "",
        woStatusDisplayName: "",
        workOrderNumber:"",
        workOrderStatus:"",
        workOrderEndDate:"",
        account:{
          accountName:"",
        }
       });
      setIsOpen(false);
      getAllWorkOrderData();
    }
  };

  // API calls to delete Record

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus/${woStatusId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllWorkOrderData();
        setIsOpen(false);
      })
      .catch((error) => {
        setShowSnackbar(true);
        setSnackMessage(error.response.data.details);
      });
  };

  const handleModalopen = () => {
    setIsOpen(true);
  };


 

  const handleFileUpload = (files) => {
    // Handle file upload logic here
    console.log(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    const files = e.dataTransfer.files;
    handleFileUpload(files);
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

  const handleInputChange = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent container
    const files = e.target.files;
    handleFileUpload(files);
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
                {/* <a
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    handleModalopen();
                  }}
                >
                  <BorderColorOutlinedIcon
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  Edit
                </a> */}
                {/* <a
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <DeleteOutlinedIcon
                    style={{ fontSize: "15px", paddingRight: "5px" }}
                  />
                  Delete
                </a> */}
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
      <Modal
        open={isOpen}
        // onClose={handleModalClose}
      >
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Edit Work Order Status</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="reg-form">
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="id"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData.woStatusName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      woStatusName: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Display Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="id"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData.woStatusDisplayName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      woStatusDisplayName: e.target.value,
                    });
                  }}
                />
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={OnSubmit}
                >
                  Save
                </ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalControlButton>
              </ButtonSection>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>

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
