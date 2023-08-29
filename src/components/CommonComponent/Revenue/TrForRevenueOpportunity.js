import React, { useState } from "react";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { apiV1 } from "../../../utils/constantsValue";
import AddIcon from '@mui/icons-material/Add';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


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

  const handleDeleteRow = () =>{
    console.log("delete the data", resourseEntryData.opportunityId);
  }

  const [selectedRow, setSelectedRow] = useState(-1);

  const toggleRowSelection = (rowIndex) => {
    if (selectedRow === rowIndex) {
      setSelectedRow(-1); // Deselect the row if it's already selected
    } else {
      setSelectedRow(rowIndex); // Select the clicked row
    }
  };


  return (
    <React.Fragment>
      <tr>
        {/* {console.log("this is propsss data", props.data)} */}
        <td
        style={{padding:"1px", color:"#000", fontWeight:700}}
          className="rowtable"
          onClick={(e) => {
            revenueResource(resourseEntryData);
            handleInnerRowExpansion(e.target);
          }}
        >
          {/* + */}
          ↓
        </td>
        <td className="rowtable"  style={{padding:"1px"}}
>
          <span style={{fontSize:"14px"}}>{props.data.opportunityId || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px"}}>
          <span style={{fontSize:"14px"}}>{props.data.projectCode || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px"}}>
          <span style={{fontSize:"14px"}}>{props.data.opportunityName || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px"}}>
          <span style={{fontSize:"14px"}}>{props.data.pricingType || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px"}}>
          <span style={{fontSize:"14px"}}>{props.data.projectStartDate || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px"}}>
          <span style={{fontSize:"14px"}}>{props.data.projectEndDate || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px"}}>
          <span style={{fontSize:"14px"}}>{props.data.cocPractice || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px"}}>
          <span style={{fontSize:"14px"}}>{props.data.noOfResources || "Unknown"}</span>
        </td>
        <td className="rowtable" style={{padding:"1px", border:"none"}}>
          <span style={{fontSize:"14px"}}>{props.data.leaveLossFactor || "Unknown"}</span>
        </td>
      </tr>
      {isExpandedInnerRow && (
        <tr
          className="nestedtablebgrevenue"
          style={{ backgroundColor: "white" }}
        >
          <td colSpan={10} style={{paddingTop:"0px"}}>
            <table  style={{backgroundColor:"rgba(225, 222, 222, 0.5)"}}>
              <tr className="trrevenue" style={{backgroundColor:"rgba(225, 222, 222, 0)"}}>
                <td className="iconsColumn" style={{ padding:"2px 0px 0px 3px"}}>
                  <a>
                    {/* <FaIcons.FaPlus /> */}
                    {/* <AddIcon fontSize="small"/> */}

                  </a>
                  <a>
                    {/* <AiIcons.AiFillCopy /> */}
                    <FileCopyOutlinedIcon fontSize="small"/>

                  </a>
                  <a>
                    {/* <AiIcons.AiOutlineEdit /> */}
                    <EditOutlinedIcon fontSize="small"/>

                  </a>
                  <a>
                    {/* <AiIcons.AiOutlineDelete /> */}
                    <DeleteOutlineIcon fontSize="small" onClick={handleDeleteRow} />

                  </a>
                </td>
              </tr>
              <tr className="nestedtablebgrevenue">
                {column3.map((header) => {
                  return <th className="threvenue" style={{padding:"4px"}}>{header}</th>;
                })}
              </tr>
              <tbody>
                {console.log("IMPPP RESOURCE DATA", resourceData)}
                {resourceData.length > 0 &&
                  resourceData.map((obj, id) => (
                    <tr style={{
                      backgroundColor: selectedRow === id ? 'rgba(192, 228, 234, 0.43)' : 'white',
                    }}
                    onClick={() => toggleRowSelection(id)}

                    >
                      <td className="rowtable">
                        <span style={{fontSize:"14px"}}>{obj.resourceStartDate || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
                        <span style={{fontSize:"14px"}}>{obj.resourceEndDate || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
                        <span style={{fontSize:"14px"}}>{obj.workOrderNumber || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
                        <span style={{fontSize:"14px"}}>{obj.employeeId || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
                        <span style={{fontSize:"14px"}}>{obj.resourceName || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
                        <span style={{fontSize:"14px"}}>{obj.billingRate || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
                        <span>{obj.allocation || "Unknown"}</span>
                      </td>
                      <td className="rowtable" style={{border:"none"}}>
                        <span style={{fontSize:"14px"}}>{obj.leaveLossFactor || "Unknown"}</span>
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