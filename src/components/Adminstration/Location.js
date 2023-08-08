/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
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
import SnackBar from "../CommonComponent/SnackBar";

function Location() {
  const [locationName, setLocationName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [locationFormData, setLocationFormData] = useState({
    locationName: "",
    locationDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);
    
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const fetchLocationName = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/location"
    );
    setLocationName(data?.data);
  };

  useEffect(() => {
    fetchLocationName();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setIsNameEmpty(false);
    setIsDisplayNameEmpty(false);
    setLocationFormData({
      locationName: "",
      locationDisplayName: "",
    });
  };

  const setlocationDetails = async () => {
    if (locationFormData.locationName.trim() === '') {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (locationFormData.locationDisplayName.trim() === '') {
      setIsDisplayNameEmpty(true);
    } else {
      setIsDisplayNameEmpty(false);
    }
    if (!isNameEmpty && !isDisplayNameEmpty && isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/${isEditId}`,
        locationFormData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/location",
        locationFormData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      fetchLocationName();
      handleModalClose();
    }
  };

  const openTheModalWithValues = async (e, id) => {
    console.log(id, "HERE");
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setLocationFormData({
        locationName: data?.data?.locationName,
        locationDisplayName: data?.data?.locationDisplayName,
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const deleteSelectedLocation = async (id) => {
    axios
    .delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/${id}`,
      locationFormData
    )
    .then((response) => {
      const actualDataObject = response.data.data;
      setLocationFormData({ locationName: "", locationDisplayName: "" });
      setIsOpen(false);
      setIsEditId(null);
      fetchLocationName();
    })
    .catch((error)=>{
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details); 
    })
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setLocationFormData({ locationName: "", locationDisplayName: "" });
      setIsOpen(false);
      setIsEditId(null);
      fetchLocationName();
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Location"
        buttonText="setup location"
        columns={["Name", "Display Name", ""]}
        data={locationName}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              activeDeactivateTableData={activeDeactivateTableData}
              openTheModalWithValues={openTheModalWithValues}
              deleteSelectedLocation={deleteSelectedLocation}
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
            <ModalHeadingText>Setup Location</ModalHeadingText>
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
                <InputField size="small"
                  type="text"
                  id="loc-name"
                  variant="outlined"
                  value={locationFormData?.locationName}
                  onChange={(e) => {
                    setLocationFormData({
                      ...locationFormData,
                      locationName: e.target.value,
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
                <InputField size="small"
                  type="text"
                  id="loc-disp-name"
                  variant="outlined"
                  value={locationFormData?.locationDisplayName}
                  onChange={(e) => {
                    setLocationFormData({
                      ...locationFormData,
                      locationDisplayName: e.target.value,
                    });
                  }}
                                    style={{
                    border: isDisplayNameEmpty ? '1px solid red' : '1px solid transparent',
                    borderRadius: '5px',
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
                    setlocationDetails();
                  }}


                >Save</ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  value="Cancel"
                  id="create-account"

                >Cancel</ModalControlButton>
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
  data: { locationName, locationDisplayName, locationId, isActive },
  activeDeactivateTableData,
  openTheModalWithValues,
  deleteSelectedLocation,
}) {
  const [isDropdown, setDropdown] = useState(false);

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
        <span>{locationName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{locationDisplayName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection data-id={locationId} style={{position:"relative"}}>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div  
            style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none"  }}
            class="dropdown-content">
              <a
              className={!isActive && "disable-table-row"}
                onClick={(e) => {
                  openTheModalWithValues(e, locationId);
                }}
                style={{ padding: "5px" }}
              >
                <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />
                Edit
              </a>
              <a
              className={!isActive && "disable-table-row"}
                onClick={() => {
                  console.log("onclick", locationId);
                  deleteSelectedLocation(locationId);
                }}
                style={{ padding: "5px" }}
              >
                <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                Delete
              </a>
              <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(locationId);
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
                  activeDeactivateTableData(locationId);
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
export default Location;
