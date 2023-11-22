/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Modal } from "@mui/material";
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
  ModalCancelButton,
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
  const [isOpen, setIsOpen] = useState(false);
  const [businessUnitData, setBusinessUnitData] = useState({
    businessUnitName: "",
    businessUnitDisplayName: "",
  });

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);

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

  //get table data
  const getAllBuData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  //save data
  const AddDataToBu = async (e) => {
    if (businessUnitData.businessUnitName.trim() === "") {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (businessUnitData.businessUnitDisplayName.trim() === "") {
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
                  style={{
                    fontFamily:"Roboto !important",
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
                  onChange={(e) => {
                    setBusinessUnitData({
                      ...businessUnitData,
                      businessUnitDisplayName: e.target.value,
                    });
                  }}
                  style={{
                    fontFamily:"Roboto",
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
                  onClick={AddDataToBu}
                >
                  Save
                </ModalControlButton>
                <ModalCancelButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalCancelButton>
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
  data: { businessUnitId, businessUnitName, businessUnitDisplayName, isActive },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    businessUnitId: businessUnitId,
    businessUnitName: businessUnitName,
    businessUnitDisplayName: businessUnitDisplayName,
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

  //delete record
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
        setShowSnackbar(true);
        setSnackMessage(error.response.data.details);
      });
  };

  //activate/deactivate record
  const activeDeactivateTableData = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/activate-or-deactivate/${id}`
      );
      if (
        response.data?.message === "Success" &&
        response.data?.responseCode === 200
      ) {
        setIsOpen(false);
        getAllBuData();
      } else {
        setShowSnackbar(true); 
        setSnackMessage("An error occurred while processing the request.");
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details);
    }
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span style={{fontFamily:"Roboto"}}>{businessUnitName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{businessUnitDisplayName || "Unknown"}</span>
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
                  style={{fontFamily:"Roboto"}}
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
                <ModalCancelButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalCancelButton>
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
