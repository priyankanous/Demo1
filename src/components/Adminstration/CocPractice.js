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
  MoadalStyle,
} from "../../utils/constantsValue";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SnackBar from "../CommonComponent/SnackBar";

function CocPractice() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buNameData, setBuNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cocPracticeData, setCocPracticeData] = useState({
    cocPracticeName: "",
    cocPracticeDisplayName: "",
    businessUnit: {
      businessUnitId: "",
      businessUnitName: "",
      businessUnitDisplayName: "",
    },
  });

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);
  const [isBu, setIsBu] = useState(false);

  useEffect(() => {
    getAllCocData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    setIsNameEmpty(false);
    setIsDisplayNameEmpty(false);
    setIsBu(false);
    setCocPracticeData({
      cocPracticeName: "",
      cocPracticeDisplayName: "",
      businessUnit: {
        businessUnitId: "",
        businessUnitName: "",
        businessUnitDisplayName: "",
      },
    });
  };

  const getAllCocData = () => {
    getAllBuNameData();
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  const getAllBuNameData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setBuNameData(actualDataObject);
      });
  };

  //save API call
  const AddDataToCocPractice = async (e) => {
    if (cocPracticeData.cocPracticeName.trim() === "") {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (cocPracticeData.cocPracticeDisplayName.trim() === "") {
      setIsDisplayNameEmpty(true);
    } else {
      setIsDisplayNameEmpty(false);
    }
    if (cocPracticeData.businessUnit.businessUnitName.trim() === "") {
      setIsBu(true);
    } else {
      setIsBu(false);
    }
    if (!isNameEmpty && !isDisplayNameEmpty && !isBu) {
      try {
        const response = await axios.post(
          "http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice",
          cocPracticeData
        );
        getAllCocData();
        setIsOpen(false);
      } catch {}
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="COC Practice"
        buttonText="setup COC Practice"
        columns={["Name", "Display Name", "Parent BU", ""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              buNameData={buNameData}
              getAllCocData={getAllCocData}
              setCocPracticeData={setCocPracticeData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup COC Practice</ModalHeadingText>
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
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setCocPracticeData({
                      ...cocPracticeData,
                      cocPracticeName: e.target.value,
                    });
                  }}
                  style={{
                    border: isNameEmpty
                      ? "1px solid red"
                      : "1px solid transparent",
                    borderRadius: "5px",
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
                    setCocPracticeData({
                      ...cocPracticeData,
                      cocPracticeDisplayName: e.target.value,
                    });
                  }}
                  style={{
                    border: isDisplayNameEmpty
                      ? "1px solid red"
                      : "1px solid transparent",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{ fontWeight: "400", fontSize: "16px" }}
                  for="email"
                >
                  <span style={{ color: "red" }}>*</span>
                  <span>Parent BU</span>
                </label>
                <select
                  style={{
                    height: "37px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    border: isBu ? "1px solid red" : "1px solid lightgray",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
                  }}
                  onChange={(e) => {
                    const selectedBuId =
                      e.target.selectedOptions[0].getAttribute("data-buId");
                    const selectedBuDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-buDisplayName"
                      );

                    setCocPracticeData({
                      ...cocPracticeData,
                      businessUnit: {
                        ...cocPracticeData.businessUnit,
                        businessUnitId: selectedBuId,
                        businessUnitName: e.target.value,
                        businessUnitDisplayName: selectedBuDispName,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {buNameData.map((buData, index) => {
                    const buNameData = buData.businessUnitName;
                    const buId = buData.businessUnitId;
                    const buDisplayName = buData.businessUnitDisplayName;
                    if (buData.isActive) {
                      return (
                        <option
                          data-buId={buId}
                          data-buDisplayName={buDisplayName}
                          key={index}
                        >
                          {buNameData}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={AddDataToCocPractice}
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
    </div>
  );
}

function Tr({
  getAllCocData,
  setCocPracticeData,
  buNameData,
  data: {
    cocPracticeId,
    cocPracticeName,
    cocPracticeDisplayName,
    businessUnit,
    isActive,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    cocPracticeId: cocPracticeId,
    cocPracticeName: cocPracticeName,
    cocPracticeDisplayName: cocPracticeDisplayName,
    businessUnit: {
      businessUnitId: businessUnit.businessUnitId,
      businessUnitName: businessUnit.businessUnitName,
      businessUnitDisplayName: businessUnit.businessUnitDisplayName,
    },
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/${cocPracticeId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllCocData();
      });
  };

  //activate/deactivate record
  const activeDeactivateTableData = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/activate-or-deactivate/${id}`
      );

      if (
        response.data?.message === "Success" &&
        response.data?.responseCode === 200
      ) {
        setIsOpen(false);
        setCocPracticeData({
          cocPracticeName: "",
          cocPracticeDisplayName: "",
          businessUnit: {
            businessUnitId: "",
            businessUnitName: "",
            businessUnitDisplayName: "",
          },
        });
        getAllCocData();
      } else {
        setShowSnackbar(true);
        setSnackMessage("An error occurred while processing the request.");
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackMessage(error.response.data.details);
    }
  };

  // API calls to delete Record
  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/${cocPracticeId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllCocData();
        setIsOpen(false);
      })
      .catch((error) => {
        setShowSnackbar(true);
        setSnackMessage(error.response.data.details);
      });
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{cocPracticeName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{cocPracticeDisplayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{businessUnit.businessUnitName || "Unknown"}</span>
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
                  className={!isActive && "disable-table-row"}
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
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={(e) => {
                    DeleteRecord();
                  }}
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
                    activeDeactivateTableData(cocPracticeId);
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
                    activeDeactivateTableData(cocPracticeId);
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
            <ModalHeadingText>Edit COC Practice</ModalHeadingText>
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
                  id="id"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData.cocPracticeName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      cocPracticeName: e.target.value,
                    });
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
                  id="id"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData.cocPracticeDisplayName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      cocPracticeDisplayName: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                 <span style={{ color: "red" }}>*</span>

                  Parent Business Unit
                </label>
                <select
                  style={{
                    height: "37px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    fontFamily:"Roboto",
                    fontSize:"16px",
                    fontWeight:"400",
                  }}
                  value={responseData.businessUnit.businessUnitName}
                  onChange={(e) => {
                    const selectedBuId =
                      e.target.selectedOptions[0].getAttribute("data-buId");
                    const selectedBuDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-buDisplayName"
                      );

                    setResponseData({
                      ...responseData,
                      businessUnit: {
                        ...responseData.businessUnit,
                        businessUnitId: selectedBuId,
                        businessUnitName: e.target.value,
                        businessUnitDisplayName: selectedBuDispName,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {buNameData.map((buData, index) => {
                    const buNameData = buData.businessUnitName;
                    const buId = buData.businessUnitId;
                    const buDisplayName = buData.businessUnitDisplayName;
                    // const orgId = buData.organization.id;
                    // const orgName = buData.organization.orgName;
                    // const orgDisplayName = buData.organization.orgDisplayName;
                    if (buData.isActive) {
                      return (
                        <option
                          data-buId={buId}
                          data-buDisplayName={buDisplayName}
                          // data-orgId={orgId}
                          // data-orgName={orgName}
                          // data-orgDisplayName={orgDisplayName}
                          key={index}
                        >
                          {buNameData}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={OnSubmit}
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
    </React.Fragment>
  );
}

export default CocPractice;
