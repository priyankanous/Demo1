/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { apiV1 } from "../../../utils/constantsValue";
import AddIcon from "@mui/icons-material/Add";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function TrForRevenue(props) {
  const [isExpandedInnerRow, setIsExpandedInnerRow] = useState(false);
  const [resourceData, setResourceData] = useState([]);
  const column3 = [
    "Start Date",
    "End Date",
    "WO No",
    "Employee ID",
    "Resource Name",
    "Rate",
    "% Allocation",
    "Leave Ls Ftr",
    "",
  ];

  const [resourseEntryData, setResourceEntryData] = useState({
    ...props.opportunityEntryData,
    opportunityId: props.data.opportunityId,
    projectCode: props.data.projectCode,
    opportunityName: props.data.opportunityName,
    pricingType: props.data.pricingType,
    projectStartDate: props.data.projectStartDate,
    projectEndDate: props.data.projectEndDate,
    cocPractice: props.data.cocPractice,
    noOfResources: props.data.noOfResources,
    leaveLossFactor: props.data.leaveLossFactor,
  });

  const handleInnerRowExpansion = (cell) => {
    // console.log("cell value", cell);
    if (cell.innerHTML == "↓") {
      cell.innerHTML = "↑";
      setIsExpandedInnerRow(true);
    } else {
      cell.innerHTML = "↓";
      setIsExpandedInnerRow(false);
    }
  };

  const revenueResource = async (e) => {
    try {
      const response = await axios.post(`${apiV1}/revenue-entry/resources`, e);
      // response.data.data.opportunities.map((obj, id) => {
      //   return setOpportunityData(obj);
      // });

      if (e.pricingType == "T&M") {
        setResourceData(response.data.data.tmResourceEntries);
      } else {
        setResourceData(response.data.data.fpResourceEntries);
      }
      // console.log(
      //   "this is the response for resourceeeeeeeeeeeeeeeeeeeeeeeeeee ",
      //   response.data.data.tmResourceEntries
      // );
    } catch {}
  };

  const handleDeleteRow = () => {
    console.log("delete the data", resourseEntryData.opportunityId);
  };

  const [selectedRow, setSelectedRow] = useState(-1);

  const toggleRowSelection = (rowIndex) => {
    if (selectedRow === rowIndex) {
      setSelectedRow(-1); // Deselect the row if it's already selected
    } else {
      setSelectedRow(rowIndex); // Select the clicked row
    }
  };

  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);

  const handleRowClick = (opportunityId) => {
    setSelectedOpportunityId((prevSelectedOpportunityId) =>
      prevSelectedOpportunityId === opportunityId ? null : opportunityId
    );
    console.log(
      "Component re-rendered with opportunityId:",
      selectedOpportunityId
    );
  };

  const [isDropdown, setDropdown] = useState(false);

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };

  const [isResourceDropdown, setIsResourceDropdown] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState(null);

  const closeResourceDropDown = () => {
    isResourceDropdown
      ? setIsResourceDropdown(false)
      : setIsResourceDropdown(true);
    // setIsResourceDropdown(false);
  };

  const DeleteRecord = () => {
    console.log("delete", selectedOpportunityId);
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/${selectedOpportunityId}`
      )
      .then((response) => {
        console.log("Opportunity deleted:");
      })
      .catch((error) => {
        console.error("Error deleting opportunity:");
      });
  };

  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const handleResourceEmployeeID = (employeeId) => {
    setSelectedEmployeeID((prevSelectedEmployeeID) =>
    prevSelectedEmployeeID === employeeId ? null : employeeId
    );
    console.log(
      "Component re-rendered with opportunityId:",
      selectedEmployeeID
    );
  };

  const handleResourceStartDate = (startDate) => {
    setSelectedStartDate((prevSelectedStartDate) =>
    prevSelectedStartDate === startDate ? null : startDate
    );
    console.log(
      "Component re-rendered with startDate:",
      selectedStartDate
    );
  };

  const deleteResourceRecord = () =>{
    console.log("deleted");
    console.log("employeeID->", selectedEmployeeID);
    console.log("resourceDate->",selectedStartDate );
    console.log("OpportunityId->", props.data.opportunityId);

    const parsedStartDate = new Date(selectedStartDate);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedStartDate = `${parsedStartDate.getDate()}/${months[parsedStartDate.getMonth()]}/${parsedStartDate.getFullYear()}`;

    const apiUrl = 'http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/delete/resources';
    const requestBody = {
      opportunityId: props.data.opportunityId,
      employeeId: selectedEmployeeID,
      resourceStartDate: formattedStartDate
    };
    
    axios
  .delete(apiUrl, { data: requestBody })
  .then((res) => {
    // Handle the success response
    console.log('DELETE request successful:', res);
  })
  .catch((error) => {
    // Handle errors
    console.error('Error making DELETE request:', error);
  });
  }

  const [resourceDropdownStates, setResourceDropdownStates] = useState([]);

  useEffect(() => {
    setResourceDropdownStates(Array(resourceData.length).fill(false));
  }, [resourceData]);

  const toggleResourceDropdown = (id) => {
    const newStates = [...resourceDropdownStates];
    newStates[id] = !newStates[id];
    setResourceDropdownStates(newStates);
  };

  return (
    <React.Fragment>
      <tr
        key={props.data.opportunityId}
        style={{
          backgroundColor:
            selectedOpportunityId === props.data.opportunityId
              ? "rgba(192, 228, 234, 0.43)"
              : "white",
          // Other styling properties
        }}
        onClick={() => handleRowClick(props.data.opportunityId)}
      >
        <td
          style={{
            padding: "1px",
            color: "#000",
            fontWeight: 700,
            cursor: "pointer",
          }}
          className="rowtable"
          onClick={(e) => {
            revenueResource(resourseEntryData);
            handleInnerRowExpansion(e.target);
          }}
        >
          ↓
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.opportunityId || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.projectCode || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.opportunityName || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.pricingType || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.projectStartDate || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.projectEndDate || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.cocPractice || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.noOfResources || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px"}}>
          <span style={{ fontSize: "14px" }}>
            {props.data.leaveLossFactor || "Unknown"}
          </span>
        </td>
        <td className="rowtable" style={{border: "none" }}>
          <span style={{ float: "right", cursor: "pointer" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                console.log("wwwww--->", props.data.opportunityId);
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div
                style={{
                  // float: "left",
                  right: "20px",
                  position: "absolute",
                  overflow: "hidden",
                  // width: "100px",
                  boxShadow: "none",
                  backgroundColor: "#c6dcdc",
                  marginRight: "10px",
                  // overflow: "auto",
                  // box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                  zIndex: 1,
                  width: "8%",
                  fontSize: "small",
                  cursor: "pointer",
                  border: "1px solid transparent",
                  borderRadius: "5px",
                }}
              >
                <a style={{ display: "block", margin: "3px 0px" }}>
                  <FileCopyOutlinedIcon style={{ fontSize: "15px" }} />
                </a>
                <a style={{ display: "block", margin: "3px 0px" }}>
                  <EditOutlinedIcon style={{ fontSize: "15px" }} />
                </a>
                <a
                  style={{ display: "block", margin: "3px 0px" }}
                  onClick={() => DeleteRecord()}
                >
                  <DeleteOutlineIcon style={{ fontSize: "15px" }} />
                </a>
              </div>
            )}
          </span>
        </td>
      </tr>
      {isExpandedInnerRow && (
        <tr
          className="nestedtablebgrevenue"
          style={{ backgroundColor: "white" }}
        >
          <td colSpan={10} style={{ padding: "0px 0px 0px 40px" }}>
            <table style={{ backgroundColor: "rgba(225, 222, 222, 0.5)" }}>
              <tr
                className="trrevenue"
                style={{ backgroundColor: "rgba(225, 222, 222, 0)" }}
              >
                <td
                  className="iconsColumn"
                  style={{ padding: "2px 0px 0px 0px" }}
                >
                  <a>
                    {/* <FaIcons.FaPlus /> */}
                    <AddIcon fontSize="small"/>
                  </a>
                  <a>
                    {/* <AiIcons.AiFillCopy /> */}
                    {/* <FileCopyOutlinedIcon fontSize="small" /> */}
                  </a>
                  <a>
                    {/* <AiIcons.AiOutlineEdit /> */}
                    {/* <EditOutlinedIcon fontSize="small" /> */}
                  </a>
                  <a>
                    {/* <AiIcons.AiOutlineDelete /> */}
                    {/* <DeleteOutlineIcon
                      fontSize="small"
                    /> */}
                  </a>
                </td>
              </tr>
              <tr className="nestedtablebgrevenue">
                {column3.map((header) => {
                  return (
                    <th className="threvenue" style={{ padding: "4px" }}>
                      {header}
                    </th>
                  );
                })}
              </tr>
              <tbody>
                {resourceData.length > 0 &&
                  resourceData.map((obj, id) => (
                    <tr
                      key={obj.employeeId}
                      style={{
                        backgroundColor:
                          selectedRow === id
                            ? "rgba(192, 228, 234, 0.43)"
                            : "white",
                      }}
                      onClick={() => {
                        toggleRowSelection(id);
                        handleResourceEmployeeID(obj.employeeId);
                        handleResourceStartDate(obj.resourceStartDate);
                        // setSelectedOpportunityId(obj.opportunityId);
                      }}
                    >
                      {/* <td>
                      <a
                                style={{ display: "block", margin: "3px 0px" }}
                                // onClick={() => DeleteRecord()}
                                onClick={()=>{
                                  deleteResourceRecord();
                              
                              }}
                              >
                                <DeleteOutlineIcon
                                  style={{ fontSize: "15px" }}
                                />
                              </a>
                      </td> */}
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.resourceStartDate || "Unknown"}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.resourceEndDate || "Unknown"}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.workOrderNumber || "Unknown"}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.employeeId || "Unknown"}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.resourceName || "Unknown"}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.billingRate || "Unknown"}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span>{obj.allocation || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.leaveLossFactor || "Unknown"}
                        </span>
                      </td>
                      <td className="rowtable" style={{border:"none"}}>
                        <span style={{ float: "right", cursor: "pointer" }}>
                          <AiIcons.AiOutlineMore
                            onClick={(e) => {

                              // setSelectedResourceId(obj.resourceId);
                              // setIsResourceDropdown(true);
                              // closeResourceDropDown();
                              toggleResourceDropdown(id);
                                                      handleResourceEmployeeID(obj.employeeId);
                        handleResourceStartDate(obj.resourceStartDate);
                                                      console.log(
                                "wwwww--->",
                                obj.employeeId
                              );
                            }}
                          ></AiIcons.AiOutlineMore>
                           {resourceDropdownStates[id] && (
                            <div
                              style={{
                                // float: "left",
                                right: "20px",
                                position: "absolute",
                                overflow: "hidden",
                                // width: "100px",
                                boxShadow: "none",
                                backgroundColor: "#c6dcdc",
                                marginRight: "10px",
                                // overflow: "auto",
                                // box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
                                zIndex: 1,
                                width: "8%",
                                fontSize: "small",
                                cursor: "pointer",
                                border: "1px solid transparent",
                                borderRadius: "5px",
                              }}
                            >
                              <a
                                style={{ display: "block", margin: "3px 0px" }}
                              >
                                <FileCopyOutlinedIcon
                                  style={{ fontSize: "15px" }}
                                />
                              </a>
                              <a
                                style={{ display: "block", margin: "3px 0px" }}
                              >
                                <EditOutlinedIcon
                                  style={{ fontSize: "15px" }}
                                />
                              </a>
                              <a
                                style={{ display: "block", margin: "3px 0px" }}
                                onClick={()=>{
                                  
                                  deleteResourceRecord();
                              
                              }}
                              >
                                <DeleteOutlineIcon
                                  style={{ fontSize: "15px" }}
                                />
                              </a>
                            </div>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

export const MemoizedTrForRevenueOpportunity = React.memo(
  TrForRevenue,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
      return true;
    return false;
  }
);
