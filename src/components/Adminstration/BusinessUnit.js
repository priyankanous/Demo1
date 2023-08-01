/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { modalStyleObject } from "../../utils/constantsValue";
// import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import {
  Modal,
} from "@mui/material";
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


function BuisnessUnit() {
  const [data, setData] = useState(null);
  // const [orgNameData, setOrgNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [businessUnitData, setBusinessUnitData] = useState({
    businessUnitName: "",
    businessUnitDisplayName: "",
    // organization: { id: "", orgName: "", orgDisplayName: "" },
  });

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);
  
  const [showSnackbar, setShowSnackbar] = useState(true);
	const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    getAllBuData();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setIsNameEmpty(false);
    setIsDisplayNameEmpty(false);
    setBusinessUnitData({
      businessUnitName: "",
      businessUnitDisplayName: "",
    });
  };


  const getAllBuData = () => {
    // getOrgNameData();
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  // const getOrgNameData = () => {
  //   axios
  //     .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/organization`)
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       setOrgNameData(actualDataObject);
  //     });
  // };
  const AddDataToBu = async (e) => {
    if (businessUnitData.businessUnitName.trim() === '') {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (businessUnitData.businessUnitDisplayName.trim() === '') {
      setIsDisplayNameEmpty(true);
    } else {
      setIsDisplayNameEmpty(false);
    }
    if (!isNameEmpty && !isDisplayNameEmpty) {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit",
        businessUnitData
      );
      // setIsOpen(false);
      getAllBuData();
      setIsNameEmpty(false);
      handleModalClose();
    } catch {}
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="BU"
        buttonText="setup bu"
        columns={["Name", "Display Name", ""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              getAllBuData={getAllBuData}
              // orgNameData={orgNameData}
              setBusinessUnitData={setBusinessUnitData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Business Unit</ModalHeadingText>
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
                  onChange={(e) => {
                    setBusinessUnitData({
                      ...businessUnitData,
                      businessUnitName: e.target.value,
                    });
                  }}
                  style={{ border: isNameEmpty ? '1px solid red' : '1px solid transparent',
                  borderRadius: '5px',}}
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
                  onChange={(e) => {
                    setBusinessUnitData({
                      ...businessUnitData,
                      businessUnitDisplayName: e.target.value,
                    });
                  }}
                  style={{
                    border: isDisplayNameEmpty ? '1px solid red' : '1px solid transparent',
                    borderRadius: '5px',
                  }}
                />
              </div>
              {/* <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Parent Org</InputTextLabel>
                  <FormControl fullWidth>
                    <Select
                      label="Candidate Type"
                      size="small"
                      style={{ background: "white" }}
                      onChange={(e) => {
                        const selectedId =
                          e.target.selectedOptions[0].getAttribute(
                            "data-orgId"
                          );
                        const selectedOrgDispName =
                          e.target.selectedOptions[0].getAttribute(
                            "data-orgDispName"
                          );

                        setBusinessUnitData({
                          ...businessUnitData,
                          organization: {
                            ...businessUnitData.organization,
                            id: selectedId,
                            orgName: e.target.value,
                            orgDisplayName: selectedOrgDispName,
                          },
                        });
                      }}
                    >
                      {orgNameData.map((orgDataName, index) => {
                        const orgName = orgDataName.orgName;
                        const orgId = orgDataName.id;
                        const orgDisplayName = orgDataName.orgDisplayName;
                        if (orgDataName.isActive) {
                          return (
                            <MenuItem
                              data-orgId={orgId}
                              data-orgDispName={orgDisplayName}
                              key={index}
                              value={orgName}
                            >
                              {orgName}
                            </MenuItem>
                          );
                        }
                      })}
                    </Select>
                  </FormControl>
                </div> */}
              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={AddDataToBu}
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

    </div>
  );
}

function Tr({
  getAllBuData,
  setBusinessUnitData,
  // orgNameData,
  data: {
    businessUnitId,
    businessUnitName,
    businessUnitDisplayName,
    isActive,
    // organization,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    businessUnitId: businessUnitId,
    businessUnitName: businessUnitName,
    businessUnitDisplayName: businessUnitDisplayName,
    // organization: {
    //   id: organization.id,
    //   orgName: organization.orgName,
    //   orgDisplayName: organization.orgDisplayName,
    // },
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/${businessUnitId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllBuData();
      });
  };
  // API calls to delete Record

  // const DeleteRecord = () => {
  //   axios
  //     .delete(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/${businessUnitId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllBuData();
  //       setIsOpen(false);
  //     });
  // };

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/${businessUnitId}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        // setShowSnackbar(true); 
        // setSnackMessage("Deleted");
        getAllBuData();
        setIsOpen(false);
      })
      .catch((error) => {
        // Handle error if delete operation fails
        setShowSnackbar(true); // Show the Snackbar with error message
        setSnackMessage(error.response.data.details); // Set the error message for the Snackbar
        // setSnackMessage("Error deleting the record"); 

      });
    };


  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setBusinessUnitData({
        businessUnitName: "",
        businessUnitDisplayName: "",
        // organization: { id: "", orgName: "", orgDisplayName: "" },
      });
      setIsOpen(false);
      getAllBuData();
    }
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{businessUnitName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{businessUnitDisplayName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection style={{position:"relative"}}>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div
                style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none"  }}
                class="dropdown-content"
              >
                <a
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <BorderColorOutlinedIcon
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  Edit
                </a>
                <a
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
                </a>
                <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(businessUnitId);
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
                    activeDeactivateTableData(businessUnitId);
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
      <Modal open={isOpen}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Edit Setup SBU</ModalHeadingText>
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
                  value={responseData.businessUnitName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      businessUnitName: e.target.value,
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
                  value={responseData.businessUnitDisplayName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      businessUnitDisplayName: e.target.value,
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

export default BuisnessUnit;
