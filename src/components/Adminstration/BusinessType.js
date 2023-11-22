/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import {
  Modal
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

function BusinessType() {
  const [businessType, setBusinessType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [businessTypeFormData, setbusinessTypeFormData] = useState({
    businessTypeName: "",
    businessTypeDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");


  const fetchBusinessTypeData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type"
    );
    setBusinessType(data?.data);
  };

  useEffect(() => {
    fetchBusinessTypeData();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
    setIsNameEmpty(false);
    setIsDisplayNameEmpty(false);
    setbusinessTypeFormData({
      businessTypeName: "",
      businessTypeDisplayName: "",
    });
  };

  const setBusinessTypeData = async () => {
    if (businessTypeFormData.businessTypeName.trim() === "") {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (businessTypeFormData.businessTypeDisplayName.trim() === "") {
      setIsDisplayNameEmpty(true);
    } else {
      setIsDisplayNameEmpty(false);
    }
    if (!isNameEmpty && !isDisplayNameEmpty && isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type/${isEditId}`,
        businessTypeFormData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type",
        businessTypeFormData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      setbusinessTypeFormData({
        businessTypeName: "",
        businessTypeDisplayName: "",
      });
      fetchBusinessTypeData();
      handleModalClose();
    }
  };

  const openTheModalWithValues = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setbusinessTypeFormData({
        businessTypeName: data?.data?.businessTypeName,
        businessTypeDisplayName: data?.data?.businessTypeDisplayName,
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  //delete record
  const deleteRecord = async (id) => {
    axios
    .delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type/${id}`,
      businessTypeFormData
    )
    .then((response) => {
      const actualDataObject = response.data.data;
      setbusinessTypeFormData({
        businessTypeName: "",
        businessTypeDisplayName: "",
      });
      setIsOpen(false);
      setIsEditId(null);
      fetchBusinessTypeData();
    })
    .catch((error)=>{
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details); 
    })
  };

  //activate/deactive record
  const activeDeactivateTableData = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type/activate-or-deactivate/${id}`
      );
  
      if (response.data?.message === "Success" && response.data?.responseCode === 200) {
        setIsOpen(false);
        setbusinessTypeFormData({
          businessTypeName: "",
          businessTypeDisplayName: "",
        });
        setIsEditId(null);
        fetchBusinessTypeData();
      } else {
        setShowSnackbar(true);
        setSnackMessage("An error occurred while processing the request");
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details);
    }
  };
  

  return (
    <div>
      <MemoizedBaseComponent
        field="Business Type"
        buttonText="setup Business Type"
        columns={["Name", "Display Name", ""]}
        data={businessType}
        Tr={(obj) => {
          return (
            <Tr
              activeDeactivateTableData={activeDeactivateTableData}
              openTheModalWithValues={openTheModalWithValues}
              deleteRecord={deleteRecord}
              data={obj}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Business Type</ModalHeadingText>
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
                  id="business-type-name"
                  variant="outlined"
                  spellcheck="false"
                  value={businessTypeFormData?.businessTypeName}
                  onChange={(e) => {
                    setbusinessTypeFormData({
                      ...businessTypeFormData,
                      businessTypeName: e.target.value,
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
                  id="business-type-display-name"
                  variant="outlined"
                  spellcheck="false"
                  value={businessTypeFormData?.businessTypeDisplayName}
                  onChange={(e) => {
                    setbusinessTypeFormData({
                      ...businessTypeFormData,
                      businessTypeDisplayName: e.target.value,
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
                  onClick={() => {
                    setBusinessTypeData();
                  }}
                >
                  Save
                </ModalControlButton>
                <ModalCancelButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpen(false);
                    setIsEditId(null);
                    setbusinessTypeFormData({
                      businessTypeName: "",
                      businessTypeDisplayName: "",
                    });
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
    </div>
  );
}

function Tr({
  data: { businessTypeName, businessTypeDisplayName, isActive, businessTypeId },
  activeDeactivateTableData,
  openTheModalWithValues,
  deleteRecord,
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <TableRowSection ref={wrapperRef}>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{businessTypeName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{businessTypeDisplayName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection
        data-id={businessTypeId}
        style={{ position: "relative" }}
      >
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
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
                onClick={(e) => {
                  openTheModalWithValues(e, businessTypeId);
                }}
                style={{ padding: "5px" }}
              >
                <BorderColorOutlinedIcon
                  style={{ fontSize: "12px", paddingRight: "5px" }}
                />
                Edit
              </a>
              <a
                className={!isActive && "disable-table-row"}
                onClick={() => {
                  deleteRecord(businessTypeId);
                }}
                style={{ padding: "5px" }}
              >
                <DeleteOutlinedIcon
                  style={{ fontSize: "15px", paddingRight: "5px" }}
                />
                Delete
              </a>
              <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(businessTypeId);
                }}
                style={{ padding: "5px" }}
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
                  activeDeactivateTableData(businessTypeId);
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
          )}{" "}
        </span>
      </TableCellSection>
    </TableRowSection>
  );
}

export default BusinessType;
