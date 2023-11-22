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


function PricingType() {
  const [pricingType, setpricingType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pricingTypeFormData, setpricingTypeFormData] = useState({
    pricingTypeName: "",
    pricingTypeDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const fetchpricingTypeData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type"
    );
    setpricingType(data?.data);
  };

  useEffect(() => {
    fetchpricingTypeData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    setIsNameEmpty(false);
    setIsDisplayNameEmpty(false);
    setpricingTypeFormData({
      pricingTypeName: "",
      pricingTypeDisplayName: "",
    });
  };

  const setpricingTypeData = async () => {
    if (pricingTypeFormData.pricingTypeName.trim() === '') {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (pricingTypeFormData.pricingTypeDisplayName.trim() === '') {
      setIsDisplayNameEmpty(true);
    } else {
      setIsDisplayNameEmpty(false);
    }

    if (!isNameEmpty && !isDisplayNameEmpty && isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type/${isEditId}`,
        pricingTypeFormData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type",
        pricingTypeFormData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      fetchpricingTypeData();
      handleModalClose();
    }
  };

  const openTheModalWithValues = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setpricingTypeFormData({
        pricingTypeName: data?.data?.pricingTypeName,
        pricingTypeDisplayName: data?.data?.pricingTypeDisplayName,
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  //delete record
  const deleteRecord = async (id) => {
    axios
    .delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type/${id}`,
      pricingTypeFormData
    )
    .then((response) => {
      const actualDataObject = response.data.data;
      setpricingTypeFormData({
        pricingTypeName: "",
        pricingTypeDisplayName: "",
      });
      setIsOpen(false);
      setIsEditId(null);
      fetchpricingTypeData();
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type/activate-or-deactivate/${id}`
      );
  
      if (response.data?.message === "Success" && response.data?.responseCode === 200) {
        setIsOpen(false);
        setpricingTypeFormData({
          pricingTypeName: "",
          pricingTypeDisplayName: "",
        });
        setIsEditId(null);
        fetchpricingTypeData();
      } else {
        setShowSnackbar(true);
        setSnackMessage("An error occurred while processing the request.");
      }
    } catch (error) {
      setShowSnackbar(true); 
      setSnackMessage(error.response.data.details);
    }
  };
  

  return (
    <div>
      <MemoizedBaseComponent
        field="Pricing Type"
        buttonText="setup pricing type"
        columns={["Name", "Display name", " "]}
        data={pricingType}
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
            <ModalHeadingText>Setup Pricing Type</ModalHeadingText>
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
                  id="pricing-type-name"
                  variant="outlined"
                  spellcheck="false"
                  value={pricingTypeFormData?.pricingTypeName}
                  onChange={(e) => {
                    setpricingTypeFormData({
                      ...pricingTypeFormData,
                      pricingTypeName: e.target.value,
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
                  id="pricing-type-display-name"
                  variant="outlined"
                  spellcheck="false"
                  value={pricingTypeFormData?.pricingTypeDisplayName}
                  onChange={(e) => {
                    setpricingTypeFormData({
                      ...pricingTypeFormData,
                      pricingTypeDisplayName: e.target.value,
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
                    setpricingTypeData();
                  }}
                >
                  Save
                </ModalControlButton>
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
  data: { pricingTypeDisplayName, pricingTypeName, isActive, pricingTypeId },
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
        <span>{pricingTypeName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{pricingTypeDisplayName || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection data-id={pricingTypeId} style={{position:"relative"}}>
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
                  openTheModalWithValues(e, pricingTypeId);
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
                  deleteRecord(pricingTypeId);
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
                  activeDeactivateTableData(pricingTypeId);
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
                  activeDeactivateTableData(pricingTypeId);
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

export default PricingType;
