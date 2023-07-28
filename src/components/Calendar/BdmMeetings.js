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
  const [selectedBdmDisName, setselectedBdmDisName] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
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
  };

  const fetchBdmData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm"
    );
    setBdm(data?.data);
    console.log("bdm data", bdm);
  };

  const fetchRegionData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions"
    );
    setRegion(data?.data);
    console.log("Region", data);
  };

  const fetchBdmMeetingsData = async () => {
    fetchBdmData();
    fetchRegionData();
    const { data } = await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/financial-year`
    );
    setData(data?.data?.data);
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
    const { meetingName, meetingDate, meetingTime } = bdmFormData;
    const activeFromDt = `${parseInt(new Date(meetingDate).getDate()) < 10
      ? "0" + parseInt(new Date(meetingDate).getDate())
      : parseInt(new Date(meetingDate).getDate())
      }/${month[new Date(meetingDate).getMonth()]}/${new Date(
        meetingDate
      ).getFullYear()}`;
    let bdmFromData = {
      meetingName,
      meetingDate: activeFromDt,
      meetingTime,
      bdmNames: selectedBdmDisName,
      regions: selectedRegion,
    };
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/${isEditId}`,
        bdmFromData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting",
        bdmFromData
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
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/financial-year/${id}`
    );
    if (data?.data) {
      setbdmFormData({
        meetingName: data?.data?.meetingName,
        meetingDate: createDate(data?.data?.meetingDate),
        meetingTime: data?.data?.meetingTime,
      });
      setBdmDisNameLinked(
        data?.data?.bdmNames.length < 2 ? true : false
      );
      setRegionLinked(data?.data?.regions.length < 2 ? true : false);
      setselectedBdmDisName(data?.data?.bdmNames);
      setSelectedRegion(data?.data?.regions);
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

  const selectMarkDropdown = (value, type) => {
    console.log(value);
    if (type === "bdmdisname") {
      const indexOfSelectedValue = selectedBdmDisName.findIndex(
        (valueObj) => {
          return valueObj.bdmDisplayName === value?.bdmDisplayName;
        }
      );
      if (indexOfSelectedValue === -1) {
        if (isBdmLinked) {
          setselectedBdmDisName([value]);
        } else {
          setselectedBdmDisName([...selectedBdmDisName, value]);
        }
      } else {
        const arrayData = selectedBdmDisName.filter((valueObj) => {
          return valueObj?.bdmDisplayName !== value?.bdmDisplayName;
        });
        setselectedBdmDisName(arrayData);
      }
    } else if (type === "reg") {
      const indexOfSelectedValue = selectedRegion.findIndex((valueObj) => {
        return valueObj.regionName === value?.regionName;
      });
      if (indexOfSelectedValue === -1) {
        if (isRegionLinked) {
          setSelectedRegion([value]);
        } else {
          setSelectedRegion([...selectedRegion, value]);
        }
      } else {
        const arrayData = selectedRegion.filter((valueObj) => {
          return valueObj?.regionName !== value?.regionName;
        });
        setSelectedRegion(arrayData);
      }
    }
  };

  const checkElementInArray = (value, type) => {
    if (type === "bdmdisname") {
      if (
        selectedBdmDisName.findIndex((valueObj) => {
          return valueObj.bdmDisplayName === value?.bdmDisplayName;
        }) === -1
      ) {
        return false;
      }
    } else if (type === "reg") {
      if (
        selectedRegion.findIndex((valueObj) => {
          return valueObj.regionName === value?.regionName;
        }) === -1
      ) {
        return false;
      }
    }
    return true;
  };

  const DeleteRecord = async (id) => {
    const { data } = await axios.delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm-meeting/${id}`,
      )
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
          "No",
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
          <ModalDetailSection style={{ height: "300px", overflow: "auto" }}>

            <form id="bdm-form">
            <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Financial Year</InputTextLabel>
                {/* <label for="name">Financial Year</label> */}
                <select
                  // style={{ width: "100%", height: "40px" }}
                  style={{height:"37px", width:"100%", marginBottom:"5px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray"}}

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
                      setbdmFormData({
                        ...bdmFormData,
                      financialYear: {
                        ...bdmFormData.financialYear,
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

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>BDM Name</span></InputTextLabel>
                <select
                 onChange={(e) => {
                    selectMarkDropdown(e.target.value, "bdmdisname");
                  }}
                  // style={{ width: "100%", height: "40px" }}
                  style={{height:"40px", width:"100%", marginBottom:"5px",borderRadius:"5px",
                  border:"1px solid lightgray", boxShadow: "black", textAlign: "Left", paddingLeft: "8px"}}
                >
                  <option value="" disabled selected hidden></option>
                { bdm.map((item,index) =>{
                //const bdmName= item.bdmDisplayName;
                if(item.isActive){
                  return(
                      <option
                      key={index}
                    >
                      {item.bdmDisplayName}
                  </option>
                  )
                }})}
                </select>
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Region</span></InputTextLabel>
                <select
                 onChange={(e) => {
                    selectMarkDropdown(e.target.value, "reg");
                  }}
                  // style={{ width: "100%", height: "40px" }}
                  style={{height:"40px", width:"100%", marginBottom:"5px",borderRadius:"5px", 
                  border:"1px solid lightgray", boxShadow: "black", textAlign: "Left", paddingLeft: "8px"}}
                >
                <option value="" disabled selected hidden></option>
                 { region.map((item,index) =>{
                //const regName= item.regionName;
                  if(item.isActive){
                return(
                    <option
                    key={index}
                  >
                    {item.regionName}
                  </option>
                )
                  }})}
                </select>
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Meeting Name</span></InputTextLabel>
                <InputField size="small"
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

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Date</span></InputTextLabel>
                <InputField fullWidth
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

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel><span style={{color:"red"}}>*</span>
                <span>Time(IST)</span></InputTextLabel>
                <InputField fullWidth
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
  );
}

function Tr({
    fetchBdmMeetingsData,
    setbdmFormData,
  data: {
    isActive,
    bdmMeetingId,
    meetingName,
    meetingDate,
    meetingTime,
    bdmNames,
    regions,
    financialYear
  },
  activateDeactivate,
  editBDMData,
  DeleteRecord,
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
    <React.Fragment>
    <TableRowSection ref={wrapperRef}>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{meetingName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{meetingTime || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{meetingDate}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>
          {(bdmNames &&
            bdmNames.map((_) => _.bdmDisplayName).join(", ")) ||
            "Unknown"}
        </span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>
          {(regions && regions.map((_) => _.regionDisplayName).join(", ")) ||
            "Unknown"}
        </span>
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
                onClick={() => {
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
              <a
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
              </a>
            </div>
          )}{" "}
        </span>
      </TableCellSection>
    </TableRowSection>

    </React.Fragment>
  );
}
export default BdmMeetings;
