import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
import * as AiIcons from "react-icons/ai";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import axios from "axios";
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
} from "@mui/material";
import SnackBar from "../CommonComponent/SnackBar";
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
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Opportunity() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [accountNameData, setAccountnameData] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isEditId, setIsEditId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [opportunityData, setOpportunityData] = useState({
    opportunityId: "",
    opportunityName: "",
    account: {
      accountId: "",
      // accountName: "",
      // accountOrClientCode: "string",
    },
    projectCode: "",
    projectStartDate: "",
    projectEndDate: "",
  });

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

  useEffect(() => {
    getAllOpportunityData();
  }, []);

  const handleModalClose = () => {
    setOpportunityData({
      opportunityId: "",
      opportunityName: "",
      account: {
        accountId: "",
        // accountName: "",
        // accountOrClientCode: "string",
      },
      projectCode: "",
      projectStartDate: "",
      projectEndDate: "",
    });
    setIsOpen(false);
  };
  const getAllAccountData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setAccountnameData(actualDataObject);
      });
  };
  const getAllOpportunityData = async () => {
    getAllAccountData();
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  const setSbuHeadData = async () => {
    const {
      opportunityId,
      opportunityName,
      projectCode,
      projectStartDate,
      projectEndDate,
      account,
    } = opportunityData;

    let activeFromDt,
      activeUntilDt = "";
    if (projectStartDate) {
      activeFromDt = `${
        parseInt(new Date(projectStartDate).getDate()) < 10
          ? "0" + parseInt(new Date(projectStartDate).getDate())
          : parseInt(new Date(projectStartDate).getDate())
      }/${month[new Date(projectStartDate).getMonth()]}/${new Date(
        projectStartDate
      ).getFullYear()}`;
    }

    if (projectEndDate) {
      activeUntilDt = `${
        parseInt(new Date(projectEndDate).getDate()) < 10
          ? "0" + parseInt(new Date(projectEndDate).getDate())
          : parseInt(new Date(projectEndDate).getDate())
      }/${month[new Date(projectEndDate).getMonth()]}/${new Date(
        projectEndDate
      ).getFullYear()}`;
    }

    const postSbuHeadData = {
      opportunityId,
      opportunityName,
      projectCode,
      account,
      projectStartDate: activeFromDt,
      projectEndDate: activeUntilDt,
    };
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity/${isEditId}`,
        postSbuHeadData
      );
    } else if (
      !opportunityData?.opportunityName ||
      !opportunityData?.account?.accountNameData ||
      !opportunityData.projectCode ||
      !opportunityData.projectStartDate
    ) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);

      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity",
        postSbuHeadData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      getAllOpportunityData();
      setOpportunityData({
        opportunityId: "",
        opportunityName: "",
        account: {
          accountId: "",
        },
        projectCode: "",
        projectStartDate: "",
        projectEndDate: "",
      });
    }
  };

  const activeDeactivateTableData = async (opportunityId) => {
    try {
      const response= await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity/activate-or-deactivate/${opportunityId}`
      );
      if (response.data?.message === "Success" && response.data?.responseCode === 200) {
        setOpportunityData({
          opportunityId: "",
          opportunityName: "",
          projectCode: "",
          projectStartDate: "",
          projectEndDate: "",
          account: {
            accountId: "",
          },
        });
        setIsOpen(false);
        getAllOpportunityData();
      } else {
        setShowSnackbar(true); 
        setSnackMessage(response.data?.details);
      }
    } catch (error) {
      setShowSnackbar(true);
      setSnackMessage("An error occurred while processing the request.");
    }
  };

  const openTheModalWithValues = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity/${id}`
    );

    if (data?.message === "Success" && data?.responseCode === 200) {
      const response = data?.data;
      setOpportunityData({
        ...opportunityData,
        ...response,
        projectStartDate: createDate(response?.projectStartDate),
        projectEndDate: createDate(response?.projectEndDate),
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const createDate = (date) => {
    // if (!date) {
    //   return "";
    // }
    let splitDate = date?.split("/");
    let monthDate = `${
      month?.indexOf(splitDate[1]) + 1 < 10
        ? "0" + String(month?.indexOf(splitDate[1]) + 1)
        : month?.indexOf(splitDate[1]) + 1
    }`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`;
  };
  const inputStyle = {
    border:
      isSubmitted && !opportunityData.opportunityName ? "1px solid red" : "",
    borderRadius: "4px",
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Opportunity"
        columns={[
          "Name",
          "Child of Account",
          "Project Code",
          "Project Start Date",
          "Project End Date",
          "",
        ]}
        data={data}
        buttonText="Add New"
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              accountNameData={accountNameData}
              getAllOpportunityData={getAllOpportunityData}
              setOpportunityData={setOpportunityData}
              openTheModalWithValues={openTheModalWithValues}
              activeDeactivateTableData={activeDeactivateTableData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Opportunity</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form style={{ padding: "0px 30px" }} id="reg-form">
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
                  style={inputStyle}
                  value={opportunityData?.opportunityName}
                  onChange={(e) => {
                    setOpportunityData({
                      ...opportunityData,
                      opportunityName: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <span style={{ color: "red" }}>*</span>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  Child of Account
                </label>
                <select
                  style={{
                    height: "37px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    border:
                      isSubmitted && !opportunityData?.account?.accountNameData
                        ? "1px solid red"
                        : "1px solid lightgray",
                  }}
                  value={opportunityData?.account?.accountName}
                  onChange={(e) => {
                    const selectedAccountId =
                      e.target.selectedOptions[0].getAttribute(
                        "data-accountId"
                      );
                    const selectedAccountName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-accountNameData"
                      );

                    setOpportunityData({
                      ...opportunityData,
                      account: {
                        ...opportunityData.account,
                        accountId: selectedAccountId,
                        accountNameData: selectedAccountName,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {accountNameData?.map((account, index) => {
                    const accountName = account.accountName;
                    const accountId = account.accountId;
                    if (account.isActive) {
                      return (
                        <option
                          data-accountId={accountId}
                          data-accountNameData={accountName}
                          key={index}
                        >
                          {accountName}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Project Code</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  style={{
                    border:
                      isSubmitted && !opportunityData.projectCode
                        ? "1px solid red"
                        : "",
                    borderRadius: "4px",
                  }}
                  spellcheck="false"
                  value={opportunityData?.projectCode}
                  onChange={(e) => {
                    setOpportunityData({
                      ...opportunityData,
                      projectCode: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Project Start date</span>
                </InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  style={{
                    border:
                      isSubmitted && !opportunityData.projectStartDate
                        ? "1px solid red"
                        : "",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => {
                    setOpportunityData({
                      ...opportunityData,
                      projectStartDate: e.target.value,
                    });
                  }}
                  value={opportunityData?.projectStartDate}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Project End Date</InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  style={{
                    border:
                      isSubmitted && !opportunityData.projectEndDate
                        ? "1px solid red"
                        : "",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => {
                    setOpportunityData({
                      ...opportunityData,
                      projectEndDate: e.target.value,
                    });
                  }}
                  value={opportunityData?.projectEndDate}
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
  getAllOpportunityData,
  setOpportunityData,
  data,
  openTheModalWithValues,
  activeDeactivateTableData,
}) {
  const {
    opportunityId,
    opportunityData,
    opportunityName,
    projectCode,
    accountNameData,
    projectStartDate,
    projectEndDate,
    account,
    isActive,
  } = data;
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [responseData, setResponseData] = useState({
    opportunityId: "",
    opportunityName: "",
    projectCode: "",
    projectStartDate: "",
    projectEndDate: "",
    account: {
      accountId: "",
    },
  });

  useEffect(() => {
    setResponseData({ ...responseData, ...data });
  }, [data]);

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

  const DeleteRecord = (opportunityId) => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity/${opportunityId}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        // setShowSnackbar(true);
        // setSnackMessage("Deleted");
        getAllOpportunityData();
        setIsOpen(false);
      })
      .catch((error) => {
        // Handle error if delete operation fails
        setShowSnackbar(true); // Show the Snackbar with error message
        setSnackMessage(error.response.data.details); // Set the error message for the Snackbar
        // setSnackMessage("Error deleting the record");
      });
  };
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef);

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };

  // const OnSubmit = () => {
  //   axios
  //     .put(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity/${opportunityId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllOpportunityData();
  //       setIsOpen(false);
  //     });
  // };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{opportunityName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{account?.accountName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{projectCode}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{projectStartDate}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{projectEndDate}</span>
        </TableCellSection>

        <TableCellSection style={{ position: "relative" }}>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => closeDropDown()}
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
                  onClick={(e) => {
                    // setIsOpen(true);
                    openTheModalWithValues(e, opportunityId);
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
                  onClick={() => {
                    DeleteRecord(opportunityId);
                  }}
                >
                  <DeleteOutlinedIcon
                    style={{ fontSize: "15px", paddingRight: "5px" }}
                  />
                  Delete
                </a>
                <a
                  onClick={() => {
                    activeDeactivateTableData(opportunityId);
                  }}
                  className={isActive && "disable-table-row"}
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
                  onClick={() => {
                    activeDeactivateTableData(opportunityId);
                  }}
                  className={!isActive && "disable-table-row"}
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
      {/* <Modal open={isOpen}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Edit Opportunity</ModalHeadingText>
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
                  id="name"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData?.opportunityName}
                  onChange={(e) => {
                    setResponseData({
                      ...opportunityData,
                      opportunityName: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  Child of Account
                </label>
                <select
                  style={{
                    height: "37px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                  }}
                  value={responseData?.account?.accountName}
                  onChange={(e) => {
                    const selectedAccountId =
                      e.target.selectedOptions[0].getAttribute(
                        "data-accountId"
                      );
                    const selectedAccountName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-accountNameData"
                      );

                    setResponseData({
                      ...responseData,
                      account: {
                        ...responseData.account,
                        accountId: selectedAccountId,
                        accountNameData: selectedAccountName,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {accountNameData?.map((account, index) => {
                    const accountName = account.accountName;
                    const accountId = account.accountId;
                    if (account.isActive) {
                      return (
                        <option
                          data-accountId={accountId}
                          data-accountNameData={accountName}
                          key={index}
                        >
                          {accountNameData}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Project Code</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData.projectCode}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      projectCode: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Project Start date</span>
                </InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  value={responseData.projectStartDate}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      projectStartDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Project End Date</InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  value={responseData.projectEndDate}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      projectEndDate: e.target.value,
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
                  onClick={onsubmit}
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
      </Modal> */}
    </React.Fragment>
  );
}
export default Opportunity;

