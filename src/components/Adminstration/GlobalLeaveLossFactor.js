/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Modal, Box } from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SnackBar from "../CommonComponent/SnackBar";

function GlobalLeaveLossFactor() {
  const [data, setData] = useState({
    actualDataObject: [],
    financialYearData: [],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isGlobalLeave] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [globalLeaveLossFactorData, setGlobalLeaveLoseFactorData] = useState({
    month: "",
    onSite: "",
    offShore: "",
    financialYear: {
      financialYearId: "",
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
  });
  const [financialYearData, setFinancialYearData] = useState([]);

  useEffect(() => {
    getFinancialYearNameData();
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getAllGlobalLLF = async (e) => {
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${e}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData({ ...data, actualDataObject: actualDataObject });
      });
  };
  const AddDataToGlobalLLF = async (e) => {
    if (
      !globalLeaveLossFactorData?.month ||
      !globalLeaveLossFactorData?.onSite ||
      !globalLeaveLossFactorData?.offShore ||
      !globalLeaveLossFactorData?.financialYear?.financialYearName
    ) {
      setIsSubmitted(true);
    } else {
      try {
        const response = await axios.post(
          "http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor",
          globalLeaveLossFactorData
        );
        setIsOpen(false);
      } catch {}
    }
  };

  const getFinancialYearNameData = async () => {
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData({ ...data, financialYearData: actualDataObject });
        setFinancialYearData(actualDataObject);
      });
  };

  const openTheModalWithValues = async (e, id) => {
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${id}`
      )
      .then((response) => {
        response.data.data.map((editData, index) => {
          setGlobalLeaveLoseFactorData({
            ...globalLeaveLossFactorData,
            month: editData.month,
            onSite: editData.onSite,
            offShore: editData.onSite,
            financialYear: {
              ...globalLeaveLossFactorData,
              financialYearId: editData.financialYear.financialYearId,
              financialYearName: editData.financialYear.financialYearName,
              financialYearCustomName:
                editData.financialYear.financialYearCustomName,
              startingFrom: editData.financialYear.startingFrom,
              endingOn: editData.financialYear.endingOn,
            },
          });
        });
      });
    setIsOpen(true);
  };

  const copyFromFyToNewFy = async (copyData) => {
    const response = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${copyData.copyFromFy}`
    );

    const actualDataObject = response.data.data;
    const actualDataArray = [];
    actualDataObject.map((copiedData, index) => {
      actualDataArray.push({
        ...globalLeaveLossFactorData,
        month: copiedData.month,
        offShore: copiedData.offShore,
        onSite: copiedData.onSite,
        financialYear: {
          ...globalLeaveLossFactorData.financialYear,
          financialYearName: copyData.copyToFy.financialYearName,
          financialYearId: copyData.copyToFy.financialYearId,
          financialYearCustomName: copyData.copyToFy.financialYearCustomName,
          startingFrom: copyData.copyToFy.startingFrom,
          endingOn: copyData.copyToFy.endingOn,
        },
      });
    });

    const resOfPOST = await axios.post(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/save-all",
      actualDataArray
    );
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setGlobalLeaveLoseFactorData({
      month: "",
      onSite: "",
      offShore: "",
      financialYear: {
        financialYearId: "",
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      },
    });
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Global Leave Loss Factor"
        buttonText="setup global leave loss factor"
        columns={["Month", "OffShore", "OnShore", ""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              setFinancialYearData={setFinancialYearData}
              openTheModalWithValues={openTheModalWithValues}
              setGlobalLeaveLoseFactorData={setGlobalLeaveLoseFactorData}
            />
          );
        }}
        setIsOpen={setIsOpen}
        globalLeave={isGlobalLeave}
        financialYearData={financialYearData}
        getAllGlobalLLF={getAllGlobalLLF}
        copyFromFyToNewFy={copyFromFyToNewFy}
      />

      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Leave Loss Factor</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection style={{ height: "370px", overflow: "auto" }}>
            <form id="reg-form" style={{ padding: "0px 30px" }}>
              <div>
                <label for="name">
                  <span style={{ color: "red" }}>*</span>
                  <span style={{fontSize:"15px", fontWeight:"500"}}>Financial Year</span>
                </label>
                <select
                  style={{
                    width: "100%",
                    height: "37px",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    border:
                      isSubmitted &&
                      !globalLeaveLossFactorData?.financialYear
                        .financialYearName
                        ? "1px solid red"
                        : "1px solid lightgray",
                  }}
                  value={
                    globalLeaveLossFactorData.financialYear.financialYearName
                  }
                  onChange={(e) => {
                    const selectedFyId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    const selectedfyDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-fyDispName"
                      );
                    const selectedFyStartingFrom =
                      e.target.selectedOptions[0].getAttribute(
                        "data-fyStartingFrom"
                      );
                    const selectedfyEndingOn =
                      e.target.selectedOptions[0].getAttribute(
                        "data-fyEndingOn"
                      );
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      financialYear: {
                        ...globalLeaveLossFactorData.financialYear,
                        financialYearId: selectedFyId,
                        financialYearName: e.target.value,
                        financialYearCustomName: selectedfyDispName,
                        startingFrom: selectedFyStartingFrom,
                        endingOn: selectedfyEndingOn,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {financialYearData.map((fyData, index) => {
                    const fyNameData = fyData.financialYearName;
                    const fyId = fyData.financialYearId;
                    const fyDispName = fyData.financialYearCustomName;
                    const fyStartingFrom = fyData.startingFrom;
                    const fyEndingOn = fyData.endingOn;
                    return (
                      <option
                        data-fyId={fyId}
                        data-fyDispName={fyDispName}
                        data-fyStartingFrom={fyStartingFrom}
                        data-fyEndingOn={fyEndingOn}
                        key={index}
                      >
                        {fyNameData}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Month</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={globalLeaveLossFactorData.month}
                  onChange={(e) => {
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      month: e.target.value,
                    });
                  }}
                />
              </div> */}

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Month</span>
                </InputTextLabel>
                <select
                  style={{
                    height: "37px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    fontFamily:"Roboto",
                    border:
                      isSubmitted && !globalLeaveLossFactorData?.month
                        ? "1px solid red"
                        : "1px solid lightgray",
                  }}
                  value={globalLeaveLossFactorData.month}
                  onChange={(e) => {
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      month: e.target.value,
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please select a month
                  </option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* <div>
                  <label for="email">Month</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={globalLeaveLossFactorData.month}
                    onChange={(e) => {
                      setGlobalLeaveLoseFactorData({
                        ...globalLeaveLossFactorData,
                        month: e.target.value,
                      });
                    }}
                  />
                </div> */}
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>OnSite (%)</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={globalLeaveLossFactorData.onSite}
                  onChange={(e) => {
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      onSite: e.target.value,
                    });
                  }}
                  style={{
                    border:
                      isSubmitted && !globalLeaveLossFactorData?.onSite
                        ? "1px solid red"
                        : "1px solid lightgray",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>OffShore (%)</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={globalLeaveLossFactorData.offShore}
                  onChange={(e) => {
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      offShore: e.target.value,
                    });
                  }}
                  style={{
                    border:
                      isSubmitted && !globalLeaveLossFactorData?.offShore
                        ? "1px solid red"
                        : "1px solid lightgray",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={AddDataToGlobalLLF}
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
  setFinancialYearData,
  getAllGlobalLLF,
  openTheModalWithValues,
  setGlobalLeaveLoseFactorData,
  data: { leaveLossFactorId, month, onSite, offShore, financialYear, isActive },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    leaveLossFactorId: leaveLossFactorId,
    month: month,
    onSite: onSite,
    offShore: offShore,
    financialYear: financialYear,
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/${leaveLossFactorId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        // setFinancialYearData(actualDataObject);
        // setGlobalLeaveLoseFactorData(actualDataObject);
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    try {
      const response = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/activate-or-deactivate/${id}`
      );

      if (
        response.data?.message === "Success" &&
        response.data?.responseCode === 200
      ) {
        setShowSnackbar(true); // Show the success Snackbar
        setSnackMessage("Record activated/deactivated successfully.");
        setIsOpen(false);
        setGlobalLeaveLoseFactorData({
          month: "",
          onSite: "",
          offShore: "",
          financialYear: {
            financialYearId: "",
            financialYearName: "",
            financialYearCustomName: "",
            startingFrom: "",
            endingOn: "",
          },
        });
      } else {
        setShowSnackbar(true);
        setSnackMessage("Error activating/deactivating the record.");
      }
    } catch (error) {
      // Handle error if the API call fails
      setShowSnackbar(true); // Show the Snackbar with error message
      setSnackMessage(error.response.data.details);
    }
  };

  // const DeleteRecord = () => {
  //   axios
  //     .delete(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${leaveLossFactorId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllGlobalLLF();
  //       setIsOpen(false);
  //     });
  // };

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };
  return (
    <React.Fragment style={{ height: "200px" }}>
      <TableRowSection ref={wrapperRef}>
        {/* <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{leaveLossFactorId || "Unknown"}</span>
        </TableCellSection> */}
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{month || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>
            {" "}
            <span>{offShore || "Unknown"}</span>
          </span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{onSite || "Unknown"}</span>
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
                // style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none" }}
                style={{
                  float: "left",
                  right: "20px",
                  position: "initial",
                  overflow: "hidden",
                  width: "100px",
                  boxShadow: "none",
                }}
                class="dropdown-content"
              >
                <a
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  // onClick={(e) => {
                  //   openTheModalWithValues(e, financialYear.financialYearName);
                  // }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <BorderColorOutlinedIcon
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
                  Edit
                </a>
                {/* <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => { DeleteRecord(leaveLossFactorId) }} 

                  style={{ padding: "5px" }}>
                  <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                  Delete
                </a> */}
                <a
                  // className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(leaveLossFactorId);
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
                    activeDeactivateTableData(leaveLossFactorId);
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
        <Modal
          open={isOpen}
          // onClose={handleModalClose}
        >
          <Box sx={MoadalStyle}>
            <ModalHeadingSection>
              <ModalHeadingText>Edit Global Leave loss Factor</ModalHeadingText>
              <CloseIcon
                onClick={() => {
                  setIsOpen(false);
                }}
                style={{ cursor: "pointer" }}
              />
            </ModalHeadingSection>
            <ModalDetailSection style={{ height: "300px", overflow: "auto" }}>
              <form id="reg-form">
                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Financial Year</InputTextLabel>
                  <InputField
                    size="small"
                    type="text"
                    id="id"
                    spellcheck="false"
                    variant="outlined"
                    value={responseData.financialYear.financialYearName}
                  />
                </div>

                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>No</InputTextLabel>
                  <InputField
                    size="small"
                    type="text"
                    id="name"
                    spellcheck="false"
                    variant="outlined"
                    value={responseData.leaveLossFactorId}
                  />
                </div>

                {/* <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Month</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.month}
                  onChange={(e) =>
                    setResponseData({
                      ...responseData,
                      month: e.target.value,
                    })
                  }
                />
              </div> */}

                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Month</InputTextLabel>
                  <select
                    style={{
                      height: "37px",
                      width: "100%",
                      marginBottom: "10px",
                      borderRadius: "7px",
                      boxShadow: "none",
                      border: "1px solid lightgray",
                    }}
                    value={responseData.month}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        month: e.target.value,
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please select a month
                    </option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>OffShore</InputTextLabel>
                  <InputField
                    size="small"
                    type="text"
                    id="email"
                    spellcheck="false"
                    variant="outlined"
                    value={responseData.offShore}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        offShore: e.target.value,
                      })
                    }
                  />
                </div>

                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>OnSite</InputTextLabel>
                  <InputField
                    size="small"
                    type="text"
                    id="email"
                    spellcheck="false"
                    variant="outlined"
                    value={responseData.onSite}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        onSite: e.target.value,
                      })
                    }
                  />
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
      </TableRowSection>
      <SnackBar
        open={showSnackbar}
        message={snackMessage}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={10000}
      />
    </React.Fragment>
  );
}

export default GlobalLeaveLossFactor;
