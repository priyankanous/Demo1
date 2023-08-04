import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { defaultStyles } from "react-modal";
import { bdmStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value.js";
import { MemoizedBaseComponent } from "../CommonComponent/Calendar/CalendarBaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
// import Modal from "react-modal";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function BdmMeetings() {
    const [data, setData] = useState({ 
        actualDataObject: [],
        financialYearData: [],
      });
  const [isOpen, setIsOpen] = useState(false);
  const [regionDisplayName, setRegionDisplayName] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bdmFormData, setbdmFormData] = useState({
    meetingName: "",
    meetingDate: "",
    meetingTime: "",
    financialYear: {
        financialYearId: "",
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      },
      businessDevelopmentManager: {
      bdmId: "",
      bdmDisplayName:""
      },
    region: {
      regionId: "",
      regionName:""
     }, 
    });
  
  const [isBdmLinked, setBdmLinked] = useState(false);
  const [bdm, setBdm] = useState([]);
  const [isBdmMeetings, setIsBdmMeetings] = useState(true);
  const [financialYearData, setFinancialYearData] = useState([]);
  const [isRegionLinked, setRegionLinked] = useState(false);
  const [bdmDisNameLinked, setBdmDisNameLinked] = useState([]);
  const [region, setRegion] = useState([]);
  const [dropdownOpenBU, setdropdownOpenBU] = useState(false);
  const [dropdownOpenReg, setdropdownOpenReg] = useState(false);
  const [selectedBdmDisName, setselectedBdmDisName] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
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
    fetchBdmMeetingsData();
    getFinancialYearNameData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setbdmFormData({
      meetingName: "",
    meetingDate: "",
    meetingTime: "",
    financialYear: {
        financialYearId: "",
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      },
      businessDevelopmentManager: {
      bdmId: "",
      bdmDisplayName:""
      },
    region: {
      regionId: "",
      regionName:""
     }, 
    });
  };

  const fetchBdmData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm"
    );
    setBdm(data?.data);
      console.log("bdm", data);
  };

  const fetchRegionData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions"
    );
    setRegion(data?.data);
    console.log("Region", data);
  };

  const fetchBdmMeetingsData = async (e) => {
    fetchBdmData();
    fetchRegionData();
    await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/financial-year/${e}`
    )
        .then((response) => {
          const actualDataObject = response.data.data;
          setData({ ...data, actualDataObject: actualDataObject });
          console.log("data  ",data)
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

  const postBdmMeetingsData = async () => {
    const { meetingName, meetingDate, meetingTime,financialYear } = bdmFormData;
    const activeFromDt = `${parseInt(new Date(meetingDate).getDate()) < 10
      ? "0" + parseInt(new Date(meetingDate).getDate())
      : parseInt(new Date(meetingDate).getDate())
      }/${month[new Date(meetingDate).getMonth()]}/${new Date(
        meetingDate
      ).getFullYear()}`;
    let postData = {
      meetingDate: activeFromDt,
      meetingName,meetingTime,
      businessDevelopmentManager : bdmFormData.businessDevelopmentManager,
      region: bdmFormData.region,
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/${isEditId}`,
        postData
      );
    } else if (
      !bdmFormData?.meetingName ||
      !bdmFormData?.meetingTime ||
      !bdmFormData?.meetingDate ||
      !bdmFormData?.businessDevelopmentManager.bdmDisplayName ||
      !bdmFormData?.region.regionName ||
      !bdmFormData?.financialYear.financialYearName
    ){
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting",
        postData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      setBdmDisNameLinked(false);
      setRegionLinked(false);
      setselectedBdmDisName([]);
      setSelectedRegion([]);
      setdropdownOpenReg(false);
      fetchBdmMeetingsData();
    }
  };

  const editBDMData = async (id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      const response = data?.data;
      setbdmFormData({
        ...bdmFormData,
        ...response,
        meetingDate: createDate(data?.data?.meetingDate),
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const createDate = (date) => {
    console.log("date", date);
    let splitDate = date.split("/");
    let monthDate = `${month.indexOf(splitDate[1]) + 1 < 10
      ? "0" + String(month.indexOf(splitDate[1]) + 1)
      : month.indexOf(splitDate[1]) + 1
      }`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`;
  };

  const activateDeactivate = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
        setIsOpen(false);
        setBdmDisNameLinked(false);
        setRegionLinked(false);
        setselectedBdmDisName([]);
        setSelectedRegion([]);
        setdropdownOpenReg(false);
        fetchBdmMeetingsData();
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="BDM Meetings"
        buttonText="Add Meetings"
        columns={[
          "BDM Name",
          "Region",
          "Meeting Name",
          "Date",
          "Time(IST)",
          " ",
        ]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              setFinancialYearData={setFinancialYearData}
              editBDMData={editBDMData}
              activateDeactivate={activateDeactivate}
            />
          );
        }}
        setIsOpen={setIsOpen}
        bdmMeetings={isBdmMeetings}
        financialYearData={financialYearData}
        fetchBdmMeetingsData={fetchBdmMeetingsData}
      />
      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Add Meetings</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="bdm-form">
            <div >
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Financial Year</span></InputTextLabel>
                <select
                  style={{height:"37px", width:"100%", marginBottom:"5px",borderRadius:"7px",boxShadow:"none", 
                  border:
                      isSubmitted && !bdmFormData?.financialYear?.financialYearName
                        ? "1px solid red"
                        : "1px solid lightgray",
                      borderRadius: "5px"
                  }}
                  value={bdmFormData?.financialYear.financialYearName}
                  onChange={(e) => {
                    const selectedFyId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    const selectedfyDispName =
                      e.target.selectedOptions[0].getAttribute("data-fyDispName");
                      setbdmFormData({
                        ...bdmFormData,
                      financialYear: {
                        ...bdmFormData.financialYear,
                        financialYearId:selectedFyId,
                        financialYearName: e.target.value,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {financialYearData.map((fyData, index) => {
                    const fyNameData = fyData.financialYearName;
                    const fId = fyData.financialYearId;
                    
                    if(fyData.isActive){
                      return(
                          <option
                          data-fyId ={fId}
                          key={index}
                        >
                          {fyNameData}
                      </option>
                    );
                  }})}
                </select>
              </div>

              <div>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>BDM Name</span></InputTextLabel>
                <select 
                style = {{
                  height:"37px", width:"100%", marginBottom:"5px",borderRadius:"5px",
                  boxShadow:"none",
                  border:
                  isSubmitted && !bdmFormData?.businessDevelopmentManager.bdmDisplayName
                    ? "1px solid red"
                    : "1px solid lightgray",
                }}
                value={bdmFormData?.businessDevelopmentManager.bdmDisplayName}
                 onChange={(e) => {
                  const selectedBdmId =
                  e.target.selectedOptions[0].getAttribute("data-bId");
                const selectedBdmDispName =
                  e.target.selectedOptions[0].getAttribute(
                    "data-bDisplayName"
                  );
                  setbdmFormData({
                    ...bdmFormData,
                  businessDevelopmentManager:{
                    ...bdmFormData.businessDevelopmentManager,
                    bdmId: selectedBdmId,
                    bdmDisplayName: selectedBdmDispName,
                  },
                });
                }}
                >
                  <option value="" disabled selected hidden></option>
                { bdm.map((item,index) =>{
                  const bdmsId= item.bdmId
                  const bdmsName= item.bdmDisplayName;
                if(item.isActive){
                  return(
                      <option
                      data-bId = {bdmsId}
                      data-bDisplayName = {bdmsName}
                      key={index}
                    >
                      {bdmsName}
                  </option>
                  );
                }})}
                </select>
              </div>

              <div>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Region</span></InputTextLabel>
                <select style = {{
                  height:"37px", width:"100%", marginBottom:"5px",borderRadius:"5px",
                  boxShadow:"none",
                  border:
                  isSubmitted && !bdmFormData?.region.regionName
                    ? "1px solid red"
                    : "1px solid lightgray",
                }}
                value={bdmFormData?.region.regionName}
                 onChange={(e) => {
                  const selectedRegId =
                  e.target.selectedOptions[0].getAttribute("data-rId");
                  const selectedRegDispName =
                  e.target.selectedOptions[0].getAttribute(
                    "data-rDisplayName"
                  );
                  setbdmFormData({
                    ...bdmFormData,
                  region: {
                    ...bdmFormData.region,
                    regionId: selectedRegId,
                    regionName: selectedRegDispName,
                  },
                });
                }}
                >
                <option value="" disabled selected hidden></option>
                 { region.map((item,index) =>{
                  const regId= item.regionId;
                  const regName= item.regionName;
                  if(item.isActive){
                  return(
                    <option
                    data-rId= {regId}
                    data-rDisplayName= {regName}
                    key={index}
                  >
                    {regName}
                  </option>
                );
                  }})}
                </select>
              </div>

              <div >
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Meeting Name</span></InputTextLabel>
                <InputField style = {{
                  border:
                  isSubmitted && !bdmFormData?.meetingName
                    ? "1px solid red"
                    : "1px solid lightgray",
                  borderRadius: "5px"
                }}
                  size="small"
                  type="text"
                  id="bdm-name"
                  variant="outlined"
                  spellcheck="false"
                  value={bdmFormData?.meetingName}
                  onChange={(e) => {
                    setbdmFormData({
                      ...bdmFormData,
                      meetingName: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "2px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Date</span></InputTextLabel>
                <InputField style = {{
                  border:
                  isSubmitted && !bdmFormData?.meetingName
                    ? "1px solid red"
                    : "1px solid lightgray",
                  borderRadius: "5px"
                }}
                  fullWidth
                  size="small"
                  type="date"
                  id="bdm-date"
                  value={bdmFormData?.meetingDate}
                  onChange={(e) => {
                    setbdmFormData({
                      ...bdmFormData,
                      meetingDate: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "0px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Time(IST)</span></InputTextLabel>
                <InputField style = {{
                  border:
                  isSubmitted && !bdmFormData?.meetingName
                    ? "1px solid red"
                    : "1px solid lightgray",
                  borderRadius: "5px"
                }}
                  fullWidth
                  size="small"
                  type="time"
                  id="bdm-time"
                  value={bdmFormData?.meetingTime}
                  onChange={(e) => {
                    setbdmFormData({
                      ...bdmFormData,
                      meetingTime: e.target.value,
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
                    postBdmMeetingsData();
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
  )
}

function Tr({
    fetchBdmMeetingsData,
    bdmFormData,
    setbdmFormData,
    activateDeactivate,
    editBDMData,
  data: {
    isActive,
    bdmMeetingId,
    meetingName,
    meetingDate,
    meetingTime,
    businessDevelopmentManager:{bdmName},
    bdmNames,
    region:{regionName},
    financialYear
  },
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

  const DeleteRecord = async (id) => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/${id}`,
        bdmFormData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        fetchBdmMeetingsData();
        setIsOpen(false);
      });
  };

  return (
    <React.Fragment>
    <TableRowSection ref={wrapperRef}>
    <TableCellSection className={!isActive && "disable-table-row"}>
        <span>
         {bdmName}
        </span>
      </TableCellSection>
      <TableCellSection className={!isActive && "disable-table-row"}>
        {regionName}
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{meetingName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{meetingDate}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{meetingTime || "Unknown"}</span>
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

                style={{ padding: "5px" }}
                onClick={(e) => {
                  editBDMData(bdmMeetingId);
                }}
              >
                <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }}
                />{" "}
                Edit
              </a>
              <a
                className={!isActive && "disable-table-row"}
                style={{ padding: "5px" }}
                onClick={() => {
                    DeleteRecord(bdmMeetingId);
                  }}
              >
                <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                Delete
              </a>
              {/* <a
                onClick={() => {
                  activateDeactivate(bdmMeetingId);
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
                  activateDeactivate(bdmMeetingId);
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

    </React.Fragment>
  );
}
export default BdmMeetings;
