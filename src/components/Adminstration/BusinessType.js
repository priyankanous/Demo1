import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function BusinessType() {
  const [businessType, setBusinessType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [businessTypeFormData, setbusinessTypeFormData] = useState({
    businessTypeName: "",
    businessTypeDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);

  console.log("Bussiness", businessTypeFormData);

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
  };

  const setBusinessTypeData = async () => {
    if (isEditId !== null) {
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
    }
  };

  const openTheModalWithValues = async (e, id) => {
    console.log(id, "HERE");
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

  const deleteSelectedLocation = async (id) => {
    const { data } = await axios.delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setbusinessTypeFormData({
        businessTypeName: "",
        businessTypeDisplayName: "",
      });
      setIsOpen(false);
      setIsEditId(null);
      fetchBusinessTypeData();
    }
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setbusinessTypeFormData({
        businessTypeName: "",
        businessTypeDisplayName: "",
      });
      setIsOpen(false);
      setIsEditId(null);
      fetchBusinessTypeData();
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
              deleteSelectedLocation={deleteSelectedLocation}
              data={obj}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
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
                <InputTextLabel>Name</InputTextLabel>
                <InputField size="small"
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

                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Display Name</InputTextLabel>
                <InputField size="small"
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
                >Save</ModalControlButton>
                <ModalControlButton
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
                >Cancel</ModalControlButton>
              </ButtonSection>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>
    </div>
  );
}

function Tr({
  data: { businessTypeName, businessTypeDisplayName, isActive, businessTypeId },
  activeDeactivateTableData,
  openTheModalWithValues,
  deleteSelectedLocation,
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
      <TableCellSection data-id={businessTypeId}>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right", right: "20px", position: "fixed" }} class="dropdown-content">
              <a
                className={!isActive && "disable-table-row"}
                onClick={(e) => {
                  openTheModalWithValues(e, businessTypeId);
                }}
                style={{ padding: "5px" }}
              >
                <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />
                Edit
              </a>
              <a
                className={!isActive && "disable-table-row"}
                onClick={() => { deleteSelectedLocation(businessTypeId) }} style={{ padding: '5px' }}>
                <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                Delete</a>
              <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(businessTypeId);
                }}
                style={{ padding: "5px" }}
              >
                <div style={{ display: "flex" }}>

                  <ToggleOnIcon style={{ fontSize: "22px", paddingRight: "3px" }} />

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
                  <ToggleOffIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
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
