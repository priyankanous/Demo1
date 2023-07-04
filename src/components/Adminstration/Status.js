import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel,InputField, ButtonSection,ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Status() {
  const [statusType, setstatusType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [statusTypeFormData, setstatusTypeFormData] = useState({
    statusName: "",
    statusDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);

  const fetchstatusTypeData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/status"
    );
    setstatusType(data?.data);
  };

  useEffect(() => {
    fetchstatusTypeData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const setstatusTypeData = async () => {
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/${isEditId}`,
        statusTypeFormData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/status",
        statusTypeFormData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchstatusTypeData();
      setIsEditId(null);
    }
  };

  const openTheModalWithValues = async (e, id) => {
    console.log(id, "HERE");
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setstatusTypeFormData({
        statusName: data?.data?.statusName,
        statusDisplayName: data?.data?.statusDisplayName,
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const deleteSelectedLocation = async (id) => {
    const { data } = await axios.delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setstatusTypeFormData({ statusName: "", statusDisplayName: "" });
      setIsOpen(false);
      setIsEditId(null);
      fetchstatusTypeData();
    }
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setstatusTypeFormData({ statusName: "", statusDisplayName: "" });
      setIsOpen(false);
      setIsEditId(null);
      fetchstatusTypeData();
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Status"
        buttonText="setup Status"
        columns={["Name", "Display name", " "]}
        data={statusType}
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
              <ModalHeadingText>Setup Status</ModalHeadingText>
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
                      id="status-name"
                      variant="outlined"
                    spellcheck="false"
                    value={statusTypeFormData?.statusName}
                    onChange={(e) => {
                      setstatusTypeFormData({
                        ...statusTypeFormData,
                        statusName: e.target.value,
                      });
                    }}
                  />
                </div>

                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Display Name</InputTextLabel>
                  <InputField size="small"
                      type="text"
                      id="status-display-name"
                      variant="outlined"
                    spellcheck="false"
                    value={statusTypeFormData?.statusDisplayName}
                    onChange={(e) => {
                      setstatusTypeFormData({
                        ...statusTypeFormData,
                        statusDisplayName: e.target.value,
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
                      setstatusTypeData();
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
    </div>
  );
}

function Tr({
  data: { statusName, statusDisplayName, isActive, statusId },
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
        <TableCellSection >
          <span>{statusName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection >
          <span>{statusDisplayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection data-id={statusId} >
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right", right:"20px",position:"fixed" }} class="dropdown-content">
              <a
                onClick={(e) => {
                  openTheModalWithValues(e, statusId);
                }}
                style={{ padding: "5px" }}
              >
                                  <BorderColorOutlinedIcon style={{fontSize:"12px", paddingRight:"5px"}} />
 Edit
              </a>
              <a onClick={()=>{deleteSelectedLocation(statusId)}} style={{ padding: '5px' }}><AiIcons.AiOutlineDelete /> Delete</a>
              {/* <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(statusId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineCheckCircle /> Activate
              </a> */}
              {/* <a
                className={!isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(statusId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineCloseCircle /> Deactivate
              </a> */}
            </div>
          )}{" "}
        </span>
      </TableCellSection>
    </TableRowSection>
  );
}

export default Status;
