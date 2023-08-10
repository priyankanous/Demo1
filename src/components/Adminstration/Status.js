/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
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


function Status() {
  const [statusType, setstatusType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [statusTypeFormData, setstatusTypeFormData] = useState({
    statusName: "",
    statusDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

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
    setIsNameEmpty(false);
    setIsDisplayNameEmpty(false);
    setstatusTypeFormData({
      statusName: "",
      statusDisplayName: "",
    });
  };

  const setstatusTypeData = async () => {
    if (statusTypeFormData.statusName.trim() === '') {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (statusTypeFormData.statusDisplayName.trim() === '') {
      setIsDisplayNameEmpty(true);
    } else {
      setIsDisplayNameEmpty(false);
    }

    if (!isNameEmpty && !isDisplayNameEmpty && isEditId !== null) {
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
      handleModalClose();

    }
  };

  const openTheModalWithValues = async (e, id) => {
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


  //delete record
  const deleteRecord = async (id) => {
    axios
    .delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/${id}`,
      statusTypeFormData
    )
    .then((response) => {
      const actualDataObject = response.data.data;
      setstatusTypeFormData({ statusName: "", statusDisplayName: "" });
      setIsOpen(false);
      setIsEditId(null);
      fetchstatusTypeData();
    })
    .catch((error)=>{
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details); 
    })
  };

  //activate/deactivate record
  const activeDeactivateTableData = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/activate-or-deactivate/${id}`
      ); 
      if (response.data?.message === "Success" && response.data?.responseCode === 200) {
        setIsOpen(false);
        setstatusTypeFormData({ statusName: "", statusDisplayName: "" });
        setIsEditId(null);
        fetchstatusTypeData();
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
        field="Status"
        buttonText="setup Status"
        columns={["Name", "Display name", " "]}
        data={statusType}
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
              <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
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
                    setstatusTypeData();
                  }}
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
    </div>
  );
}

function Tr({
  data: { statusName, statusDisplayName, isActive, statusId },
  activeDeactivateTableData,
  openTheModalWithValues,
  deleteRecord,
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
        <span>{statusName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{statusDisplayName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection data-id={statusId} style={{position:"relative"}}>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div
            style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none"  }}
            class="dropdown-content"
            >
              <a
                className={!isActive && "disable-table-row"}
                onClick={(e) => {
                  openTheModalWithValues(e, statusId);
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
                  deleteRecord(statusId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineDelete /> Delete
              </a>
              <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(statusId);
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
                  activeDeactivateTableData(statusId);
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

export default Status;
