import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { modalStyleObject, ModalControlButton2 } from "../../utils/constantsValue";
import {
  Table,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Box, Typography, IconButton } from "@mui/material";
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
import {
  ModalHeading,
  ModalIcon,
  NotificationArrowIcons,
} from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
import * as AiIcons from "react-icons/ai";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "../../../src/index.css"

function RoleUserPermission() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedusers, setSelectedusers] = useState([]);
  const [activeClass, setActiveClass] = useState(true);
  const [setUser, setActiveUser] = useState("");
  const [allRoles, setAllRoles] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRole(selectedValue);
  };

  useEffect(() => {
    getAllRolesData();
    getAllUsersData();
  }, []);

  const getAllRolesData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/roles`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setAllRoles(actualDataObject);
      });
  };

  const getAllUsersData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/user`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setAvailableUsers(actualDataObject);
      });
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const resetData = () => {};

  const cutAndPasteToUsers = (type) => {
    if (type === "availablePerson") {
      // Move selected user from available to selected list
      const selectedUser = availableUsers.find((user) => user.selected);
      if (selectedUser) {
        setAvailableUsers((prev) =>
          prev.filter((user) => user !== selectedUser)
        );
        setSelectedUsers((prev) => [...prev, selectedUser]);
      }
    } else if (type === "selectedUsers") {
      // Move selected user from selected to available list
      const selectedUser = selectedUsers.find((user) => user.selected);
      if (selectedUser) {
        setSelectedUsers((prev) =>
          prev.filter((user) => user !== selectedUser)
        );
        setAvailableUsers((prev) => [...prev, selectedUser]);
      }
    }
  };

  const highlightBackground = (e, user, listType) => {
    e.preventDefault();
    if (listType === "availableUsers") {
      setAvailableUsers((prev) =>
        prev.map((u) => ({
          ...u,
          selected: u === user,
        }))
      );
      setSelectedUsers((prev) =>
        prev.map((u) => ({
          ...u,
          selected: false,
        }))
      );
    } else if (listType === "selectedUsers") {
      setSelectedUsers((prev) =>
        prev.map((u) => ({
          ...u,
          selected: u === user,
        }))
      );
      setAvailableUsers((prev) =>
        prev.map((u) => ({
          ...u,
          selected: false,
        }))
      );
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Role User Permission"
        columns={["Roles", "Users"]}
        data={allRoles}
        buttonText="Add New"
        Tr={(obj) => {
          return <Tr data={obj} />;
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle} style={{ width: "550px" }}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Role User Permission</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="reg-form">
              <div
                style={{
                  padding: "10px 0px",
                  marginLeft: "-106px",
                  marginBottom: "25px",
                }}
              >
                <InputTextLabel>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: "73px", marginTop: "7px" }}>
                      <span style={{ color: "red" }}>*</span>
                      <span>Role :</span>
                    </div>

                    <FormControl>
                      <Select
                        size="small"
                        style={{
                          background: "white",
                          width: "160px",
                          marginLeft: "8px",
                          marginBottom: "7px",
                        }}
                        onChange={handleChange}
                        value={selectedRole}
                      >
                        {allRoles?.length > 0 &&
                          allRoles?.map((role, index) => {
                            return (
                              <MenuItem value={role?.roleName} key={index}>
                                {role?.roleName}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </div>
                </InputTextLabel>
              </div>
              <div
                style={{
                  width: "480px",
                  height: "300px",
                  position: "relative",
                  backgroundColor: "#d3d3d3",
                  borderRadius: "8px",
                }}
              >
                <InputTextLabel>
                  <div style={{ marginLeft: "15px", marginTop: "10px" }}>
                    <span style={{ color: "red" }}>*</span>
                    <span>Users</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "",
                      margin: "4px 0px",
                      padding: "30px",
                    }}
                  >
                    <div
                      style={{
                        background: "white",
                        width: "70%",
                        maxHeight: "200px",
                        overflow: "auto",
                        className:"scrollable-list",
                        borderRadius:"5px"
                      }}
                    >
                      <p
                        style={{
                          background: "",
                          margin: "2px 0px",
                          textAlign: "center",
                        }}
                      >
                        Available Users
                      </p>
                      <div style={{ overflowY: "auto", height: "250px" }}>
                        <ul>
                          {availableUsers.map((user, index) => {
                            return (
                              <li
                                key={index}
                                style={{
                                  background: user.selected ? "lightgray" : "",
                                }}
                                onClick={(e) => {
                                  highlightBackground(
                                    e,
                                    user,
                                    "availableUsers"
                                  );
                                }}
                              >
                                {user.userName}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <NotificationArrowIcons
                      style={{
                        width: "10%",
                        height: "100px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        color: "black",
                        marginTop: "35px",
                      }}
                    >
                      <i
                        onClick={() => {
                          cutAndPasteToUsers("availablePerson");
                        }}
                        disabled={!availableUsers.some((user) => user.selected)}
                      >
                        <AiOutlineCaretRight />
                      </i>
                      <i
                        disabled={!selectedUsers.some((user) => user.selected)}
                        onClick={() => {
                          cutAndPasteToUsers("selectedUsers");
                        }}
                      >
                        <AiOutlineCaretLeft />
                      </i>
                    </NotificationArrowIcons>
                    <div
                      style={{
                        background: "white",
                        width: "70%",
                        height: "200px",
                        boder: "1px solid white",
                        borderRadius: "5px",
                        overflow: "auto",
                        scrollbarColor:"navy"
                      }}
                    >
                      <p
                        style={{
                          background: "",
                          margin: "2px 0px",
                          textAlign: "center",
                          borderRadius: "10px",
                        }}
                      >
                        Selected Users
                      </p>
                      <div style={{ overflowY: "auto", height: "250px" }}>
                        <ul>
                          {selectedUsers.map((user, index) => (
                            <li
                              key={index}
                              onClick={(e) =>
                                highlightBackground(e, user, "selectedUsers")
                              }
                              style={{
                                background: user.selected ? "lightgray" : "",
                              }}
                            >
                              {user.userName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </InputTextLabel>
              </div>
              <div style={{ paddingLeft: "10px", marginRight: "139px", marginLeft:"80px"}}>
                <ButtonSection>
                  <ModalControlButton2
                    // sx={{ marginLeft: "130px" }}
                    type="button"
                    value="Save"
                    id="create-account"
                    variant="contained"
                    // onClick={() => {
                    //   setSbuHeadData();
                    // }}
                  >
                    Cancel
                  </ModalControlButton2>
                  <ModalControlButton
                    type="button"
                    variant="contained"
                    onClick={() => {
                      resetData();
                    }}
                    value="Cancel"
                    id="create-account"
                  >
                    Save
                  </ModalControlButton>
                </ButtonSection>
              </div>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>
    </div>
  );
}
function Tr({
  getAllRegionData,
  setRegionData,
  data: { regionId, regionName, regionDisplayName, isActive },
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

  // API calls to delete Record

  // const DeleteRecord = () => {
  //   axios
  //     .delete(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${regionId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllRegionData();
  //       setIsOpen(false);
  //     });
  // };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection>
          <span>{"" || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>{"" || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection style={{ position: "relative" }}>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
            // onClick={(e) => {
            //   closeDropDown();
            // }}
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
                  // className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  // onClick={() => {
                  //   const found = rolesData?.find((e) => e?.roleId === roleId);
                  //   if (found) {
                  //     updateRolesData(found);
                  //     setIsSaveDisabled(true);
                  //     updateIsOpen(true);
                  //   }
                  // }}
                >
                  <BorderColorOutlinedIcon
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  Edit / View
                </a>
                <a
                  // className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  // onClick={() => {
                  //   deleteRecord(roleId);
                  // }}
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
    </React.Fragment>
  );
}
export default RoleUserPermission;
