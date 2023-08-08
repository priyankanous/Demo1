import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { modalStyleObject, ModalDetailSection2 } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Calendar/CalendarBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button, Checkbox } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle, MoadalStyle2 } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function FortnightlyMeetings() {
  const [data, setData] = useState({
    actualDataObject: [],
      financialYearData: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [financialYearData, setFinancialYearData] = useState([]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState([]);
  const [isFinancialYearLinked, setFinancialYearLinked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fortnightlyMeetingsData, setFortnightlyMeetingsData] = useState ({
    meetingId: "",
    meetingDate: "",
    meetingName1: "",
    meetingName2: "",
    meetingName3: "",
    meetingName4: "",
    financialYear: {
      financialYearId: "",
      financialYearName: "",
      // financialYearCustomName: "",
      // startingFrom: "",
      // endingOn: "",
    },
  });
  const [isFortnightlyMeetings, setIsFortnightlyMeetings] = useState(true);
  const [dropdownOpenReg, setdropdownOpenReg] = useState(false);
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

  useEffect(() => {
    fetchFornightlyMeetingsData();
    getFinancialYearNameData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    setFortnightlyMeetingsData({
    meetingId: 0,
    meetingDate: "",
    meetingName1: "",
    meetingName2: "",
    meetingName3: "",
    meetingName4: "",
    financialYear: {
      financialYearId: "",
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
    });
  };

  const fetchFornightlyMeetingsData = async (e) => {
    getFinancialYearNameData();
    await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/fortnightly-meeting/${e}`
    )
    .then((response) => {
      const actualDataObject = response.data.data;
      setData({ ...data, actualDataObject: actualDataObject });
    });
  };

  const getFinancialYearNameData = async () => {
    console.log("in financial year data");
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year`
      )
      .then((response) => {
        console.log("Financial Year", response);
        const actualDataObject = response.data.data;
        setData({ ...data, financialYearData: actualDataObject });
        setFinancialYearData(actualDataObject);
      });
  };

  const postFortnightlyMeetingsData = async () => {
    const { financialYear, meetingId, meetingDate, meetingName1, meetingName2, meetingName3, meetingName4 } = fortnightlyMeetingsData;
    const activeFromDt = `${parseInt(new Date(meetingDate).getDate()) < 10
      ? "0" + parseInt(new Date(meetingDate).getDate())
      : parseInt(new Date(meetingDate).getDate())
      }/${month[new Date(meetingDate).getMonth()]}/${new Date(
        meetingDate
      ).getFullYear()}`;
    let postFortData = {
      meetingId,
      meetingDate: activeFromDt,
      meetingName1,meetingName2,
      meetingName3,meetingName4,
      financialYear: {
        financialYearId: financialYear.financialYearId,
        financialYearName: financialYear.financialYearName,
        financialYearCustomName: financialYear.financialYearCustomName,
        startingFrom: financialYear.startingFrom,
        endingOn: financialYear.endingOn
      },
    };
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/fortnightly-meeting`,
        postFortData      
      );
    } else if (
      !fortnightlyMeetingsData?.meetingDate ||
      !fortnightlyMeetingsData?.meetingName1 || 
      !fortnightlyMeetingsData?.meetingName2 || 
      !fortnightlyMeetingsData?.meetingName3 || 
      !fortnightlyMeetingsData?.meetingName4 ||
      !fortnightlyMeetingsData?.financialYear.financialYearName
    ){
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/fortnightly-meeting",
        postFortData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
    }
  };

  const editFortnightlyMeetingsData = async (id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/fortnightly-meeting/meetingId/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      const response = data?.data;
      setFortnightlyMeetingsData({
        ...fortnightlyMeetingsData,
        ...response,
        meetingDate: createDate(data?.data?.meetingDate),
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const createDate = (meetingDate) => {
    let splitDate = meetingDate.split("/");
    let monthDate = `${month.indexOf(splitDate[1]) + 1 < 10
      ? "0" + String(month.indexOf(splitDate[1]) + 1)
      : month.indexOf(splitDate[1]) + 1
      }`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`;
  };

  const activateDeactivate = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/fortnightly-meeting/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
        setIsOpen(false);
        setdropdownOpenReg(false);
        //fetchFornightlyMeetingsData();
    }
  };

  return (
    <div >
      <MemoizedBaseComponent
        field="Fornightly Meetings "
        buttonText="New FY Meetings"
        columns={["Date", "Meeting Name", "Day", ""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr 
              data={obj}
              setFinancialYearData={setFinancialYearData}
              editFortnightlyMeetingsData={editFortnightlyMeetingsData}
              setFortnightlyMeetingsData={setFortnightlyMeetingsData}
              
            />
          );
        }}
        setIsOpen={setIsOpen}
        fortnightlyMeetings={isFortnightlyMeetings}
        financialYearData={financialYearData}
        fetchFornightlyMeetingsData={fetchFornightlyMeetingsData}
      />
      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
        <Box sx={MoadalStyle} 
        style={{ width:"35%" }}>
          <ModalHeadingSection>
            <ModalHeadingText>New FY Meetings</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                //setIsOpen(false);
                handleModalClose();
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection2>
            
              <span>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Financial Year</span></InputTextLabel>
                <select
                  style={{height:"40px", width:"185px", marginBottom:"5px",borderRadius:"5px",boxShadow:"none", 
                  border:
                      isSubmitted && !fortnightlyMeetingsData?.financialYear?.financialYearName
                        ? "1px solid red"
                        : "1px solid Darkgray",
                  borderRadius: "5px"
                  }}
                  value={fortnightlyMeetingsData?.financialYear.financialYearName}
                  onChange={(e) => {
                    const selectedFyId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    const selectedfyDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-fyDispName"
                      );
                    // const selectedFyStartingFrom =
                    //   e.target.selectedOptions[0].getAttribute(
                    //     "data-fyStartingFrom"
                    //   );
                    // const selectedfyEndingOn =
                    //   e.target.selectedOptions[0].getAttribute(
                    //     "data-fyEndingOn"
                    //   );
                      setFortnightlyMeetingsData({
                      ...fortnightlyMeetingsData,
                      financialYear: {
                        ...fortnightlyMeetingsData.financialYear,
                        financialYearId:selectedFyId,
                        financialYearName: selectedfyDispName,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden></option>
                  {financialYearData.map((fyData, index) => {
                    const fId = fyData.financialYearId;
                    const fyNameData = fyData.financialYearName;
                    if(fyData.isActive){
                      return(
                          <option
                          data-fyId = {fId}
                          data-fyDispName = {fyNameData}
                          key={index}
                        >
                          {fyNameData}
                      </option>
                    );
                  }})}
                </select>
              </span>
              <span style={{ paddingLeft: "10%" }}>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>First Meeting Date</span></InputTextLabel>
                <InputField style={{ width: "180px", backgroundColor: "white",
                border:
                isSubmitted && !fortnightlyMeetingsData?.meetingDate
                  ? "1px solid red"
                  : "1px solid lightgray",
                borderRadius: "5px", marginTop: "-1px"
                }} 
                value={fortnightlyMeetingsData?.meetingDate}
                  size="small" 
                  type="date"
                  id="email"
                  variant="outlined"
                  onChange={(e) => {
                    setFortnightlyMeetingsData({
                      ...fortnightlyMeetingsData,
                      meetingDate: e.target.value,
                    });
                  }}
                />
              </span>
            </ModalDetailSection2>
            <ModalDetailSection>
            <div>
              <form id="reg-form">
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel style={{marginBottom:"-4%", marginTop:"-8%"}}>
                <span style={{color:"red", fontSize:"Medium"}}>*</span>
                </InputTextLabel>
                <InputField style={{
                border:
                isSubmitted && !fortnightlyMeetingsData?.meetingName1
                  ? "1px solid red"
                  : "1px solid lightgray",
                borderRadius: "5px"
                }} 
                value={fortnightlyMeetingsData?.meetingName1}
                  size="small"
                  type="text"
                  id="inputID"
                  placeholder="Meeting Name"
                  variant="outlined"
                  onChange={(e) => {
                    setFortnightlyMeetingsData({
                      ...fortnightlyMeetingsData,
                      meetingName1: e.target.value,
                    });
                  }}
                  />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel style={{marginBottom:"-4%", marginTop:"-8%"}}>
                <span style={{color:"red", fontSize:"Medium"}}>*</span>
                </InputTextLabel>
                <InputField style={{
                border:
                isSubmitted && !fortnightlyMeetingsData?.meetingName2
                  ? "1px solid red"
                  : "1px solid lightgray",
                borderRadius: "5px"
                }} 
                value={fortnightlyMeetingsData?.meetingName2}
                  size="small"
                  type="text"
                  id="inputID"
                  placeholder="Meeting Name"
                  variant="outlined"
                  onChange={(e) => {
                    setFortnightlyMeetingsData({
                      ...fortnightlyMeetingsData,
                      meetingName2: e.target.value,
                    });
                  }}
                  />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel style={{marginBottom:"-4%", marginTop:"-8%"}}>
                <span style={{color:"red", fontSize:"Medium"}}>*</span>
                </InputTextLabel>
                <InputField style={{
                border:
                isSubmitted && !fortnightlyMeetingsData?.meetingName3
                  ? "1px solid red"
                  : "1px solid lightgray",
                borderRadius: "5px"
                }} 
                value={fortnightlyMeetingsData?.meetingName3}
                  size="small"
                  type="text"
                  id="inputID"
                  placeholder="Meeting Name"
                  variant="outlined"
                  onChange={(e) => {
                    setFortnightlyMeetingsData({
                      ...fortnightlyMeetingsData,
                      meetingName3: e.target.value,
                    });
                  }}
                  />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel style={{marginBottom:"-4%", marginTop:"-8%"}}>
                <span style={{color:"red", fontSize:"Medium"}}>*</span>
                </InputTextLabel>
                <InputField 
                  style={{
                    border:
                    isSubmitted && !fortnightlyMeetingsData?.meetingName4
                      ? "1px solid red"
                      : "1px solid lightgray",
                    borderRadius: "5px"
                    }} 
                    value={fortnightlyMeetingsData?.meetingName4}
                  size="small"
                  type="text"
                  id="inputID"
                  placeholder="Meeting Name"
                  variant="outlined"
                  onChange={(e) => {
                    setFortnightlyMeetingsData({
                      ...fortnightlyMeetingsData,
                      meetingName4: e.target.value,
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
                    postFortnightlyMeetingsData();
                  }}

                >Apply</ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    //setIsOpen(false);
                    handleModalClose();
                  }}
                  value="Cancel"
                  id="create-account"

                >Cancel</ModalControlButton>
              </ButtonSection>
            </form></div>
          </ModalDetailSection>
        </Box>
      </Modal>
    </div>
  )

}

function Tr({
  fetchBdmMeetingsData,
  setbdmFormData,
  setFortnightlyMeetingsData,
data: {
  isActive,
  meetingId,
  meetingDate,
  meetingName1,
  meetingName2,
  meetingName3,
  meetingName4,
  financialYear,
},
fetchFornightlyMeetingsData,
activateDeactivate,
editFortnightlyMeetingsData,
DeleteRecord,
}) {
const [isDropdown, setDropdown] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const [responseData, setResponseData] = useState({
  meetingId: meetingId,
  meetingName1: meetingName1,
  meetingName2: meetingName2,
  meetingName3: meetingName3,
  meetingName4: meetingName4,
  financialYear: {
    financialYearId: financialYear.financialYearId,
    financialYearName: "",
    financialYearCustomName: "",
    startingFrom: "",
    endingOn: "",
  },
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

const getDayName = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const dateObject = new Date(`${month} ${day}, ${year}`);
  const options = { weekday: 'long' };
  const dayName = dateObject.toLocaleDateString('en-US', options);
  return dayName;
}

return (
  <React.Fragment>
  <TableRowSection ref={wrapperRef}>
    <TableCellSection className={!isActive && "disable-table-row"}>
      <span>{meetingDate || "Unknown"}</span>
    </TableCellSection>
    <TableCellSection className={!isActive && "disable-table-row"}>
      <span>{meetingName1 || "Unknown"}</span><br></br>
      <span>{meetingName2 || "Unknown"}</span><br></br>
      <span>{meetingName3 || "Unknown"}</span><br></br>
      <span>{meetingName4 || "Unknown"}</span><br></br>
    </TableCellSection>
    <TableCellSection className={!isActive && "disable-table-row"}>
      <span>{getDayName(meetingDate)}</span>
    </TableCellSection>
    <TableCellSection style={{ position: "relative" }}>
      <span style={{ float: "right" }}>
        <AiIcons.AiOutlineMore
          onClick={(e) => closeDropDown(isDropdown)}
        ></AiIcons.AiOutlineMore>
        {isDropdown && (
          <div 
          style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none"  }}
          class="dropdown-content">
            <a
              className={!isActive && "disable-table-row"}

              style={{ padding: "5px" }}
              onClick={() => {
                setIsOpen(true);
              }}
              // onClick={() => {
              //   editFortnightlyMeetingsData(meetingId);
              // }}
            >
              <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }}
              />{" "}
              Edit
            </a>
            {/* <a
              className={!isActive && "disable-table-row"}
              style={{ padding: "5px" }}
              onClick={() => {
                  DeleteRecord(meetingId);
                }}
            >
              <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
              Delete
            </a> */}
            {/* <a
              onClick={() => {
                activateDeactivate(meetingId);
              }}
              className={isActive && "disable-table-row"}
              style={{ padding: "5px" }}
            >
              <div style={{ display: "flex" }}>

                <ToggleOnIcon style={{ fontSize: "22px", paddingRight: "3px" }} />

                <p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
              </div>
            </a>
            <a
              onClick={() => {
                activateDeactivate(meetingId);
              }}
              className={!isActive && "disable-table-row"}
              style={{ padding: "5px" }}
            >
              <div style={{ display: "flex" }}>
                <ToggleOffIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                <p style={{ margin: "3px 0px 0px 0px" }}>Deactivate</p>
              </div>
            </a> */}
          </div>
        )}{" "}
      </span>
    </TableCellSection>
  </TableRowSection>
  <Modal open={isOpen}>
        <Box sx={MoadalStyle2}>
          <ModalDetailSection>
            <form id="reg-form">
              <div style = {{ padding:"0px 10px" }}>
              <p>Changing the <b>Meeting Date / Meeting Name </b> 
                will Change the Whole occurance of the Fortnightly meeting.</p>
              </div>
              <ButtonSection style = {{ padding:"0px 65px"}}>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={() => {
                    editFortnightlyMeetingsData(meetingId);
                    setIsOpen(false);
                   }}
                >
                  Proceed
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
  </React.Fragment>
);
}

export default FortnightlyMeetings;