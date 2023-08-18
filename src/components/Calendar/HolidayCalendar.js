import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Calendar/CalendarBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button, Checkbox } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function HolidayCalendar() {
  const [data, setData] = useState({ 
    actualDataObject: [],
    financialYearData: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isHoliday, setIsHoliday] = useState(true);
  const [loc, setLoc] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [financialYearData, setFinancialYearData] = useState([]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([])
  const [isEditId, setIsEditId] = useState(null);

  const [holidayCalendarData, setHolidayCalendarData] = useState({
    //holidayId: 1,
    holidayName: "",
    holidayDate: "",
    financialYear: {
      //financialYearId: "",
      financialYearName: "",
      // financialYearCustomName: "",
      // startingFrom: "",
      // endingOn: "",
    },
    location: {
      // locationId: "",
      locationName: "",
      // locationDisplayName: ""
    },
  });
  const [isFinancialYearLinked, setFinancialYearLinked] = useState(false);
  const [isLocationLinked, setLocationLinked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


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
    getAllHcData();
    getFinancialYearNameData();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setHolidayCalendarData({
    holidayId: 0,
    holidayName: "",
    holidayDate: "",
    financialYear: {
      financialYearName: "",
    },
    location: {
      locationName: "",
    }
    });
  };

  const getAllHcData = async (e) => {
    getFinancialYearNameData();
    fetchLocationData();
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/holiday-calendar/financial-year/${e}`
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
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData({ ...data, financialYearData: actualDataObject });
        setFinancialYearData(actualDataObject);
      });
  };

  const fetchLocationData = async () => {
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/location`
      )
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData({ ...data, locationData: actualDataObject });
        setLocationData(actualDataObject);
      });
  };

  const AddDataToHc = async (e) => {
    const { holidayName, holidayDate, financialYear, location } = holidayCalendarData;
    console.log(holidayCalendarData,"holidayCalendarData");
    const activeFromDt = `${
      parseInt(new Date(holidayDate).getDate()) < 10
        ? "0" + parseInt(new Date(holidayDate).getDate())
        : parseInt(new Date(holidayDate).getDate())
    }/${month[new Date(holidayDate).getMonth()]}/${new Date(
      holidayDate
    ).getFullYear()}`;

    let postCal = {
      holidayName,
      holidayDate: activeFromDt,
      location: holidayCalendarData.location,
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/holiday-calendar/${isEditId}`,
        postCal
      );
    } else if (
      !holidayCalendarData?.holidayName ||
      !holidayCalendarData?.holidayDate ||
      !holidayCalendarData?.location.locationName ||
      !holidayCalendarData?.financialYear.financialYearName
    ){
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/holiday-calendar",
        postCal
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      setIsSubmitted(false);
      handleModalClose();
      setSelectedLocation([]);
    }
  };

  const editHCData = async (id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/holiday-calendar/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      const response = data?.data;
      setHolidayCalendarData({
        ...holidayCalendarData,
        ...response,
        holidayDate: createDate(data?.data?.holidayDate),
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

  return (
    <div >
      <MemoizedBaseComponent
        field="Holidays "
        buttonText="Add Holiday"
        columns={["Holiday Name", "Holiday Date", "Holiday Day", ""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              editHCData={editHCData}
              setFinancialYearData={setFinancialYearData}
              setLocationData={setLocationData}
              setHolidayCalendarData={setHolidayCalendarData}
            />
          );
        }}
        setIsOpen={setIsOpen}
        holiday={isHoliday}
        financialYearData={financialYearData}
        locationData={locationData}
        getAllHcData={getAllHcData}
      />
      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Holiday Calendar</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                //setIsOpen(false);
                handleModalClose();
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="reg-form">
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Financial Year</InputTextLabel>
                <select
                  style={{height:"37px", width:"100%", marginBottom:"5px",borderRadius:"7px",boxShadow:"none", 
                  border: isSubmitted && !holidayCalendarData?.financialYear.financialYearName ? "1px solid red" : "1px solid Darkgray",
                  borderRadius: "4px"}}
                  value={holidayCalendarData?.financialYear.financialYearName}
                  onChange={(e) => {
                    const selectedFyId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    const selectedfyDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-fyDispName"
                      );
                      setHolidayCalendarData({
                      ...holidayCalendarData,
                      financialYear: {
                        ...holidayCalendarData.financialYear,
                        financialYearId:selectedFyId,
                        financialYearName: e.target.value,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden></option>
                  {financialYearData.map((fyData, index) => {
                    const fyNameData = fyData.financialYearName;
                    const fId = fyData.financialYearId;

                    return <option 
                    data-fyId = {fId}
                    // data-fyDispName ={}
                    key={index}>{fyNameData}</option>;
                  })}
                </select>
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Location</span></InputTextLabel>
                <select
                 style={{height:"37px", width:"100%", marginBottom:"5px",borderRadius:"7px",boxShadow:"none", 
                 border:  isSubmitted && !holidayCalendarData?.location.locationName ? '1px solid red' : '1px solid Darkgray',
                 borderRadius: "5px"
                }}
                 value={holidayCalendarData?.location.locationName}
                 onChange={(e) => {
                  const selectedLocId =
                  e.target.selectedOptions[0].getAttribute("data-lId");
                const selectedLocDispName =
                  e.target.selectedOptions[0].getAttribute(
                    "data-lDisplayName"
                  );
                  setHolidayCalendarData({
                    ...holidayCalendarData,
                    location: {
                      ...holidayCalendarData.location,
                      locationId: selectedLocId,
                      locationName: selectedLocDispName,
                    },
                  });
                }}
                >
                  <option value="" disabled selected hidden></option>
                { locationData.map((item,index) =>{
                const locName= item.locationName;
                const locId = item.locationId;
                const locDisplayName = item.locationDisplayName;
                return <option 
                    data-lId ={locId}
                    data-lDisplayName = {locName}
                    key={index}>{locName}</option>;
                  })}
                </select>
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Holiday Name</span>
                </InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  value={holidayCalendarData?.holidayName}
                  onChange={(e) => {
                    setHolidayCalendarData({
                      ...holidayCalendarData,
                      holidayName: e.target.value,
                    });
                  }}
                  style={{    border:
                    isSubmitted && !holidayCalendarData?.holidayName ? "1px solid red" : "",
                  borderRadius: "4px",}}
                />
              </div>
              <div style={{ padding: "10px 0px"}}>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Holiday Date</span></InputTextLabel>
                <InputField style={{ width: "100%", backgroundColor: "white",
              border:
              isSubmitted && !holidayCalendarData?.holidayDate
                ? "1px solid red"
                : "1px solid lightgray",
              borderRadius:"4px"  
              }} size="small" 
                  type="date"
                  id="email"
                  variant="outlined"
                  value={holidayCalendarData?.holidayDate}
                  onChange={(e) => {
                    setHolidayCalendarData({
                      ...holidayCalendarData,
                      holidayDate: e.target.value,
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
                  onClick={AddDataToHc}
                >Save</ModalControlButton>
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
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>

    </div>
  );
}

function Tr({
  getAllHcData,
  setHolidayCalendarData,
  editHCData,
  data: {
    holidayId,
    holidayName,
    holidayDate,
    isActive,
    financialYear,
    location
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    holidayId: holidayId,
    holidayName: holidayName,
    holidayDate: holidayDate,
    financialYear: {
      financialYearId: financialYear.financialYearId,
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
    location: {
      locationId: location.locationId,
      locationName: "",
      locationDisplayName: "",
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

  const closeDropDown = (isopen, id) => {
    isopen ? setDropdown(false) : setDropdown(true);
  };

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/holiday-calendar/${holidayId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllHcData();
      });
  };

  const deleteRecord = async (id) => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/holiday-calendar/${id}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllHcData();
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/holiday-calendar/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setHolidayCalendarData({
        holidayId: "",
        holidayName: "",
        holidayDate: "",
        holidayDay: "",
        financialYear: {
          financialYearId: "",
          financialYearName: "",
          financialYearCustomName: "",
          startingFrom: "",
          endingOn: "", 
        }
      });
      setIsOpen(false);
      getAllHcData();
    }
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
        <TableCellSection className={!isActive && "disable-table-row"} >
          <span>{holidayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{holidayDate || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{getDayName(holidayDate)}</span>
        </TableCellSection> 
        <TableCellSection style={{ position: "relative" }} >
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown(isDropdown);
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div 
              style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none"  }}
              className="dropdown-content">
                <a
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    editHCData(holidayId);
                  }}
                >
                  <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />
                  Edit
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    deleteRecord(holidayId);
                  }}
                >
                  <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                  Delete
                </a>
                {/* <a
                  style={{ padding: "5px" }}
                  onClick={() => {
                    activeDeactivateTableData(holidayId);
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <ToggleOnIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                    <p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
                  </div>
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(holidayId);
                  }}
                  style={{ padding: "5px" }}
                >
                  <div style={{ display: "flex" }}>
                    <ToggleOffIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                    <p style={{ margin: "3px 0px 0px 0px" }}>Deactivate</p>
                  </div>
                </a> */}
              </div>
            )}
          </span>
        </TableCellSection>
      </TableRowSection>

    </React.Fragment>
  );
}

export default HolidayCalendar;