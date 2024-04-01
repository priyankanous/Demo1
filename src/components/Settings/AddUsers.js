/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
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

function AddUsers() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    userId: "",
    userName: "",
    emailId: "",
    employeeId: "",
    active: null,
  });
  const [allUsers, setAllUsers] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    getAllUsersData();
  }, []);

  const getAllUsersData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/user`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setAllUsers(actualDataObject);
      });
  };

  const validateEmail = (email) => {
    // Regular expression for validating email address
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userData?.userName || !userData?.emailId || !userData?.employeeId) {
      setIsSaved(true);
    } else if (!validateEmail(userData.emailId)) {
      setEmailError("Enter a valid Email-Id");
    } else {
      setIsSaved(false);
      setEmailError("");
      try {
        const response = await axios.post(
          "http://192.168.16.55:8080/rollingrevenuereport/api/v1/user",
          userData
        );
        console.log("add user resp", response.data);
        setIsOpen(false);
        resetData();
      } catch {}
    }
  };

  const resetData = () => {
    setUserData(null);
    getAllUsersData();
    setIsOpen(false);
  };

  const handleModalClose = () => {
    resetData();
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Add Users"
        buttonText="setup users"
        columns={["Name", "Email-Id", "Employee-Id", ""]}
        data={allUsers}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              userData={allUsers}
              getAllUsersData={getAllUsersData}
              resetData={resetData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Users</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="reg-form" style={{ padding: "0px 35px" }}>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  spellcheck="false"
                  variant="outlined"
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      userName: e.target.value,
                    });
                  }}
                  style={{
                    border:
                      isSaved && !userData?.userName
                        ? "1px solid red"
                        : "1px solid lightgray",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Email-Id</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  spellcheck="false"
                  variant="outlined"
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      emailId: e.target.value,
                    });
                  }}
                  style={{
                    border:
                      isSaved && !userData?.emailId
                        ? "1px solid red"
                        : "1px solid lightgray",
                    borderRadius: "5px",
                  }}
                />
                {emailError && (
                  <div style={{ color: "red", fontSize:"13px", marginLeft:"5px" }}>
                    {emailError}
                  </div>
                )}
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Employee-Id</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  spellcheck="false"
                  variant="outlined"
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      employeeId: e.target.value,
                    });
                  }}
                  style={{
                    border:
                      isSaved && !userData?.employeeId
                        ? "1px solid red"
                        : "1px solid lightgray",
                    borderRadius: "5px",
                  }}
                />
              </div>

              <ButtonSection>
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
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
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
  getAllUsersData,
  data: { userId, userName, emailId, employeeId, active },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    userId: userId,
    userName: userName,
    emailId: emailId,
    employeeId: employeeId,
    active: active,
    password: "Nous@12345",
  });

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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/user/${userId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllUsersData();
        setIsOpen(false);
      });
  };

  const DeleteRecord = (userId) => {
    console.log("userIs", userId);
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/user/userEntity/${userId}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllUsersData();
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection>
          <span>{userName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>{emailId || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>{employeeId || "Unknown"}</span>
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
                  //   className={!isActive && "disable-table-row"}
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
                  //   className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord(userId);
                  }}
                >
                  <DeleteOutlinedIcon
                    style={{ fontSize: "15px", paddingRight: "5px" }}
                  />
                  Delete
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
            <ModalHeadingText>Edit User</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="reg-form" style={{ padding: "0px 35px" }}>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.userName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      userName: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Email-Id</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.emailId}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      emailId: e.target.value,
                    });
                  }}
                  style={{ fontFamily: "Roboto" }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Employee-Id</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.employeeId}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      employeeId: e.target.value,
                    });
                  }}
                  style={{ fontFamily: "Roboto" }}
                />
              </div>

              <ButtonSection>
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
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={OnSubmit}
                >
                  Save
                </ModalControlButton>
              </ButtonSection>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default AddUsers;
