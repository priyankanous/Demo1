/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
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
  MoadalStyle,
} from "../../utils/constantsValue";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SnackBar from "../CommonComponent/SnackBar";

function SbuHead() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sbuNameData, setSbuNameData] = useState([]);
  const [sbuHeadName, setSbuHeadName] = useState(null);
  const [sbuHeadDisplayName, setSbuHeadDisplayName] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [activeUntil, setActiveUntil] = useState(null);
  const [sbuName, setSbuName] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditId, setIsEditId] = useState(null);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const fetchSbuDetails = async () => {
    const data = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu"
    );
    setSbuNameData(data?.data?.data);
  };

  //get SBU data
  const fetchSbuHeadData = async () => {
    fetchSbuDetails();
    const data = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead"
    );
    setData(data?.data?.data);
  };

  useEffect(() => {
    fetchSbuHeadData();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setSbuHeadName("");
    setSbuName("");
    setSbuHeadDisplayName("");
    setActiveForm("");
  };

  //save data
  const setSbuHeadData = async () => {
    let activeFromDt = "",
      activeUntilDt = "";
    if (activeForm) {
      activeFromDt = `${
        parseInt(new Date(activeForm).getDate()) < 10
          ? "0" + parseInt(new Date(activeForm).getDate())
          : parseInt(new Date(activeForm).getDate())
      }/${month[new Date(activeForm).getMonth()]}/${new Date(
        activeForm
      ).getFullYear()}`;
    }

    if (activeUntil) {
      activeUntilDt = `${
        parseInt(new Date(activeUntil).getDate()) < 10
          ? "0" + parseInt(new Date(activeUntil).getDate())
          : parseInt(new Date(activeUntil).getDate())
      }/${month[new Date(activeUntil).getMonth()]}/${new Date(
        activeUntil
      ).getFullYear()}`;
    }
    const postSbuHeadData = {
      sbuHeadName,
      sbuHeadDisplayName,
      strategicBusinessUnit: sbuName,
      activeFrom: activeFromDt,
      activeUntil: activeUntilDt,
      sbuHeadId: 0,
    };
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/${isEditId}`,
        postSbuHeadData
      );
    } else if (
      !sbuHeadName ||
      !sbuHeadDisplayName ||
      !sbuName ||
      !postSbuHeadData.activeFrom
    ) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead",
        postSbuHeadData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchSbuHeadData();
      handleModalClose();
    }
  };

  const openTheModalWithValues = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setSbuHeadName(data?.data?.sbuHeadName);
      setSbuName(data?.data?.strategicBusinessUnit);
      setSbuHeadDisplayName(data?.data?.sbuHeadDisplayName);
      setActiveForm(createDate(data?.data?.activeFrom));
      setActiveUntil(createDate(data?.data?.activeUntil));
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const createDate = (date) => {
    if (!date) {
      return ""; // Return an empty string or any other default value if date is not provided
    }

    let splitDate = date.split("/");
    let monthDate = `${
      month.indexOf(splitDate[1]) + 1 < 10
        ? "0" + String(month.indexOf(splitDate[1]) + 1)
        : month.indexOf(splitDate[1]) + 1
    }`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`;
  };

  //deleet record
  const deleteSelectedLocation = async (id) => {
    const { data } = await axios.delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      resetStateAndData();
    }
  };

  //activate/deactivate record
  const activeDeactivateTableData = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/activate-or-deactivate/${id}`
      );

      if (
        response.data?.message === "Success" &&
        response.data?.responseCode === 200
      ) {
        resetStateAndData();
      } else {
        setShowSnackbar(true);
        setSnackMessage("An error occurred while processing the request.");
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details);
    }
  };

  const resetStateAndData = () => {
    setIsOpen(false);
    fetchSbuHeadData();
    setIsEditId(null);
    setSbuHeadName(null);
    setSbuName(null);
    setSbuHeadDisplayName(null);
    setActiveForm(null);
    setActiveUntil(null);
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="SBU Head"
        buttonText="Setup SBU Head"
        columns={[
          "Name",
          "Display Name",
          "SBU Name",
          "Active From",
          "Active Until",
          "",
        ]}
        data={data}
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
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup SBU Head</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="reg-form" style={{ padding: "0px 30px" }}>
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
                    setSbuHeadName(e.target.value);
                  }}
                  value={sbuHeadName}
                  style={{
                    border: isSubmitted && !sbuHeadName ? "1px solid red" : "",
                    borderRadius: "4px",
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
                    setSbuHeadDisplayName(e.target.value);
                  }}
                  value={sbuHeadDisplayName}
                  style={{
                    border:
                      isSubmitted && !sbuHeadDisplayName ? "1px solid red" : "",
                    borderRadius: "4px",
                  }}
                />
              </div>
              {/* 
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>SBU Name</InputTextLabel>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    style={{ background: "white" }}
                    onChange={(e) => {
                      const sbuSelected = JSON.parse(e.target.value);
                      setSbuName(sbuSelected);
                    }}

                  >
                    {sbuNameData?.map((sbuData, index) => {
                      const sbuNameData = sbuData.sbuName;
                      return (
                        <MenuItem
                          value={JSON.stringify(sbuData)}
                          selected={sbuNameData === sbuName}
                          key={index}
                        >
                          {sbuNameData}

                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div> */}

              <div>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  <span style={{ color: "red" }}>*</span>

                  <span>SBU Name</span>
                </label>
                <select
                  style={{
                    height: "37px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
                    border:
                      isSubmitted && !sbuHeadName
                        ? "1px solid red"
                        : "1px solid lightgray",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => {
                    const sbuSelected = JSON.parse(e.target.value);
                    setSbuName(sbuSelected);
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {sbuNameData?.map((sbuData, index) => {
                    const sbuNameData = sbuData.sbuName;
                    if (sbuData.isActive) {
                      return (
                        <option
                          value={JSON.stringify(sbuData)}
                          selected={sbuNameData === sbuName}
                          key={index}
                        >
                          {sbuNameData}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>

                  <span>Active From</span>
                </InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  onChange={(e) => {
                    setActiveForm(e.target.value);
                  }}
                  value={activeForm}
                  style={{
                    fontFamily:"Roboto !important",
                    border:
                      isSubmitted && !activeForm
                        ? "1px solid red"
                        : "1px solid lightgray",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Active Until</InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  onChange={(e) => {
                    setActiveUntil(e.target.value);
                  }}
                  value={activeUntil}
                />
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={() => {
                    setSbuHeadData();
                  }}
                >
                  Save
                </ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    resetStateAndData();
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
  data: {
    sbuHeadName,
    sbuHeadDisplayName,
    strategicBusinessUnit: { sbuName },
    activeFrom,
    activeUntil,
    isActive,
    sbuHeadId,
  },
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
        <span>{sbuHeadName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{sbuHeadDisplayName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{sbuName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{activeFrom || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{activeUntil || ""}</span>
      </TableCellSection>
      <TableCellSection data-id={sbuHeadId}>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div
              style={{ float: "right", right: "20px", position: "fixed" }}
              class="dropdown-content"
            >
              <a
                className={!isActive && "disable-table-row"}
                onClick={(e) => {
                  openTheModalWithValues(e, sbuHeadId);
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
                  deleteSelectedLocation(sbuHeadId);
                }}
                href="#about"
                style={{ padding: "5px" }}
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
                  activeDeactivateTableData(sbuHeadId);
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
                  activeDeactivateTableData(sbuHeadId);
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

export default SbuHead;
