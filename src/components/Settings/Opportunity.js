import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
import * as AiIcons from "react-icons/ai";
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
  MenuItem
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
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function Opportunity() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [opportunityName, setOpportunityName] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [projectCode, setProjectCode] = useState(null);
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);
  const [opportunityId, setOpportunityId] = useState(null);
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

  const [regionData, setRegionData] = useState({
    opportunityName: "",
    projectCode: "",
    accountName: "",
    projectStartDate: "",
    projectEndDate: "",
  });

  useEffect(() => {
    getAllRegionData();
  }, []);

  // console.log("accountname",data?.map((ele)=>{
  //   return ele.account.accountName
  // }))

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getAllRegionData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity`)
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const AddDataToRegion = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions",
        regionData
      );
      console.log("this is the response", response.data);
      getAllRegionData();
      setIsOpen(false);
    } catch {}
  };
  const setSbuHeadData = async () => {
    const activeFromDt = `${
      parseInt(new Date(projectStartDate).getDate()) < 10
        ? "0" + parseInt(new Date(projectStartDate).getDate())
        : parseInt(new Date(projectStartDate).getDate())
    }/${month[new Date(projectStartDate).getMonth()]}/${new Date(
      projectStartDate
    ).getFullYear()}`;
    const activeUntilDt = `${
      parseInt(new Date(projectEndDate).getDate()) < 10
        ? "0" + parseInt(new Date(projectEndDate).getDate())
        : parseInt(new Date(projectEndDate).getDate())
    }/${month[new Date(projectEndDate).getMonth()]}/${new Date(
      projectEndDate
    ).getFullYear()}`;
    const postSbuHeadData = {
      opportunityName,
      projectCode,
      accountName,
      projectStartDate:activeFromDt,
      projectStartDate:activeUntilDt,
      opportunityId: 0,
    };
    if (opportunityId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity/${opportunityId}`,
        postSbuHeadData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity",
        postSbuHeadData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      getAllRegionData();
    }
  };

  const resetData = () => {
    setIsOpen(false);
    getAllRegionData();
    setOpportunityId(null);
    setOpportunityName(null);
    setProjectCode(null);
    setAccountName(null);
    setProjectStartDate(null);
    setProjectEndDate(null)
  };
  const childAccount=["nous", "nous1", "nous2"]


  return (
    <div>
      <MemoizedBaseComponent
        field="Region"
        columns={[
          "Name",
          "Project Code",
          "Child of Account",
          "Project Start Date",
          "Project End Date",
        ]}
        data={data}
        buttonText="Add New"
        Tr={(obj) => {
          return (
            <Tr
              accData={data}
              data={obj}
              getAllRegionData={getAllRegionData}
              setRegionData={setRegionData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Set Opportunity</ModalHeadingText>
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
                <span style={{color:"red"}}>*</span>
                <span>Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setOpportunityName(e.target.value);
                  }}
                  value={opportunityName}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Child of Account</span>
                </InputTextLabel>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    style={{ background: "white" }}
                    onChange={(e) => {
                      setAccountName(e.target.value);
                    }}
                    value={accountName}
                  >
                    {childAccount?.map((accountName, index) => {
                      return (
                        <MenuItem
                        value={JSON.stringify(accountName)}
                        selected={childAccount === childAccount}
                        key={index}
                      >
                          {accountName}
                        
                      </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Project Code</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setProjectCode(e.target.value);
                  }}
                  value={projectCode}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Project Start date</span>
                </InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="email"
                  variant="outlined"
                  onChange={(e) => {
                    setProjectStartDate(e.target.value);
                  }}
                  value={projectStartDate}
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
                  onChange={(e) => {
                    setProjectEndDate(e.target.value);
                  }}
                  value={projectEndDate}
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
                    resetData()
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
  getAllRegionData,
  setRegionData,
  accData,
  data: {
    regionId,
    opportunityName,
    projectCode,
    accountName,
    projectStartDate,
    projectEndDate,
    isActive,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const childOfAccount = accData?.map((ele) => {
    return ele.account.accountName;
  });
  const [responseData, setResponseData] = useState({
    regionId: regionId,
    opportunityName: opportunityName,
    projectCode: projectCode,
    accountName: childOfAccount,
    projectStartDate: projectStartDate,
    projectEndDate: projectEndDate,
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${regionId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllRegionData();
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setRegionData({
        opportunityName: "",
        projectCode: "",
        accountName: "",
        projectStartDate: "",
        projectEndDate: "",
      });
      setIsOpen(false);
      getAllRegionData();
    }
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
      <tr ref={wrapperRef}>
        <td className={!isActive && "disable-table-row"}>
          <span>{opportunityName || "Unknown"}</span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {projectCode || "Unknown"}
          </span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {responseData.accountName || "Unknown"}
          </span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {projectStartDate || "Unknown"}
          </span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {projectEndDate || "Unknown"}
          </span>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div
                style={{ float: "right", right: "20px", position: "fixed" }}
                class="dropdown-content"
              >
                <a
                  style={{ padding: "5px" }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <AiIcons.AiOutlineEdit />
                  Edit
                </a>
                {/* <a
                 
                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <AiIcons.AiOutlineDelete /> Delete
                </a> */}
                <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(regionId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(regionId);
                  }}
                  style={{ padding: "5px" }}
                >
                  <AiIcons.AiOutlineCloseCircle /> Deactivate
                </a>
              </div>
            )}
          </span>
        </td>
      </tr>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Edit Region</ModalHeading>
              <ModalIcon
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <AiOutlineClose></AiOutlineClose>
              </ModalIcon>
              <hr color="#62bdb8"></hr>
              <form id="reg-form">
                <div>
                  <label for="region_name">Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.opportunityName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        opportunityName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="region_disp_name">Display Name</label>
                  <input
                    type="text"
                    id="id"
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
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={OnSubmit}
                    />
                    <input
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      value="Cancel"
                      id="create-account"
                      class="button"
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
export default Opportunity;
