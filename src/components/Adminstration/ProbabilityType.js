import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
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

function Probability() {
  const [probabilityFormData, setProbabilityFormData] = useState({
    probabilityTypeName: "",
    percentage: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [probabilitydata, setProbabilityData] = useState([]);
  const [isEditId, setIsEditId] = useState(null);

  const fetchPercentageType = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type"
    );
    setProbabilityData(data?.data);
  };

  useEffect(() => {
    fetchPercentageType();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const setProbabilityTypeData = async () => {
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/${isEditId}`,
        probabilityFormData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type",
        probabilityFormData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      fetchPercentageType();
    }
  };

  const openTheModalWithValues = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setProbabilityFormData({
        probabilityTypeName: data?.data?.probabilityTypeName,
        percentage: data?.data?.percentage,
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const deleteSelectedLocation = async (id) => {
    const { data } = await axios.delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setProbabilityFormData({ probabilityTypeName: "", percentage: 0 });
      setIsOpen(false);
      setIsEditId(null);
      fetchPercentageType();
    }
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setProbabilityFormData({ probabilityTypeName: "", percentage: 0 });
      setIsOpen(false);
      setIsEditId(null);
      fetchPercentageType();
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Probability Type"
        buttonText="setup Probability type"
        columns={["Name", "Percentage", " "]}
        data={probabilitydata}
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
            <ModalHeadingText>Setup Probability Type</ModalHeadingText>
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
                  id="probability-type-name"
                  variant="outlined"
                  spellcheck="false"
                  value={probabilityFormData?.probabilityTypeName}
                  onChange={(e) => {
                    setProbabilityFormData({
                      ...probabilityFormData,
                      probabilityTypeName: e.target.value,
                    });
                  }}

                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Percentage</InputTextLabel>
                <InputField size="small"
                  type="number"
                  id="probability-percentage"
                  variant="outlined"
                  spellcheck="false"
                  value={probabilityFormData?.percentage}
                  onChange={(e) => {
                    setProbabilityFormData({
                      ...probabilityFormData,
                      percentage: parseInt(e.target.value),
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
                    setProbabilityTypeData();
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
  data: { probabilityTypeName, percentage, probabilityTypeId, isActive },
  openTheModalWithValues,
  activeDeactivateTableData,
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
        <span>{probabilityTypeName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection
        className={!isActive && "disable-table-row"}
        data-id={probabilityTypeId}
      >
        <span>{percentage || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right", right: "20px", position: "fixed" }} class="dropdown-content">
              <a
                className={!isActive && "disable-table-row"}

                onClick={(e) => {
                  openTheModalWithValues(e, probabilityTypeId);
                }}
                style={{ padding: "5px" }}
              >
                <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />

                Edit
              </a>
              <a
                className={!isActive && "disable-table-row"}
                onClick={() => {
                  deleteSelectedLocation(probabilityTypeId);
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
                  activeDeactivateTableData(probabilityTypeId);
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
                  activeDeactivateTableData(probabilityTypeId);
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
export default Probability;
