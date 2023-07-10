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

function FinanicalYear() {
  const [financialYear, setFinancialYear] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [financialYearFormData, setfinancialYearFormData] = useState({
    financialYearName: "",
    financialYearCustomName: "",
    startingFrom: "",
    endingOn: "",
  });
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

  const fetchFinancialYearData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year"
    );
    console.log(data);
    setFinancialYear(data?.data);
  };

  useEffect(() => {
    fetchFinancialYearData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const setFinancialYearData = async () => {
    const {
      financialYearCustomName,
      financialYearName,
      endingOn,
      startingFrom,
    } = financialYearFormData;
    console.log(startingFrom);
    const startingFromDt = `${parseInt(new Date(startingFrom).getDate()) < 10
      ? "0" + parseInt(new Date(startingFrom).getDate())
      : parseInt(new Date(startingFrom).getDate())
      }/${month[new Date(startingFrom).getMonth()]}/${new Date(
        startingFrom
      ).getFullYear()}`;
    const endingOnDt = `${parseInt(new Date(endingOn).getDate()) < 10
      ? "0" + parseInt(new Date(endingOn).getDate())
      : parseInt(new Date(endingOn).getDate())
      }/${month[new Date(endingOn).getMonth()]}/${new Date(
        endingOn
      ).getFullYear()}`;
    let financialYearData = {
      financialYearCustomName,
      financialYearName,
      endingOn: endingOnDt,
      startingFrom: startingFromDt,
    };
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/${isEditId}`,
        financialYearData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year",
        financialYearData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchFinancialYearData();
      setIsEditId(null);
      setfinancialYearFormData({
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      });
    }
  };

  const openTheModalWithValues = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setfinancialYearFormData({
        financialYearName: data?.data?.financialYearName,
        financialYearCustomName: data?.data?.financialYearCustomName,
        startingFrom: createDate(data?.data?.startingFrom),
        endingOn: createDate(data?.data?.endingOn),
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const createDate = (date) => {
    let splitDate = date.split("/");
    let monthDate = `${month.indexOf(splitDate[1]) + 1 < 10
      ? "0" + String(month.indexOf(splitDate[1]) + 1)
      : month.indexOf(splitDate[1]) + 1
      }`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`;
  };

  const deleteSelectedLocation = async (id) => {
    const { data } = await axios.delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchFinancialYearData();
      setIsEditId(null);
      setfinancialYearFormData({
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      });
    }
  };
  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchFinancialYearData();
      setIsEditId(null);
      setfinancialYearFormData({
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      });
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Financial Year"
        buttonText="setup Financial Year"

        columns={["Name", "Custom Name", "Active From", "Active Until", " "]}
        data={financialYear}
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
            <ModalHeadingText>Setup Financial Year</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
                setIsEditId(null);

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
                  value={financialYearFormData?.financialYearName}
                  onChange={(e) => {
                    setfinancialYearFormData({
                      ...financialYearFormData,
                      financialYearName: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Display</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="business-type-display-name"
                  variant="outlined"
                  spellcheck="false"
                  value={financialYearFormData?.financialYearCustomName}
                  onChange={(e) => {
                    setfinancialYearFormData({
                      ...financialYearFormData,
                      financialYearCustomName: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Active From</InputTextLabel>
                <InputField fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={financialYearFormData?.startingFrom}
                  onChange={(e) => {
                    setfinancialYearFormData({
                      ...financialYearFormData,
                      startingFrom: e.target.value,
                    });
                  }}
                />
              </div>


              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Active Untill</InputTextLabel>
                <InputField fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={financialYearFormData?.endingOn}
                  onChange={(e) => {
                    setfinancialYearFormData({
                      ...financialYearFormData,
                      endingOn: e.target.value,
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
                    setFinancialYearData();
                  }}
                >Save</ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpen(false);
                    setIsEditId(null);
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
  data: {
    financialYearName,
    financialYearCustomName,
    startingFrom,
    endingOn,
    financialYearId,
    isActive,
  },
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
      <TableCellSection className={!isActive && "disable-table-row"} >
        <span>{financialYearName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"} >
        <span>{financialYearCustomName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"} >
        <span>{startingFrom || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"} >
        <span>{endingOn || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection >
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right", right: "20px", position: "fixed" }} class="dropdown-content">
              <a
                className={!isActive && "disable-table-row"}
                onClick={(e) => {
                  openTheModalWithValues(e, financialYearId);
                }}
                style={{ padding: "5px" }}
              >
                <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />

                Edit
              </a>
              <a
                className={!isActive && "disable-table-row"}
                onClick={() => {
                  deleteSelectedLocation(financialYearId);
                }}
                href="#about"
                style={{ padding: "5px" }}
              >
                <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                Delete
              </a>
              <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(financialYearId);
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
                  activeDeactivateTableData(financialYearId);
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

export default FinanicalYear;
