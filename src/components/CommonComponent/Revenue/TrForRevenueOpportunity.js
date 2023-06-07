import React, { useState } from "react";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { apiV1 } from "../../../utils/constantsValue";

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
    console.log("cell value", cell);
    if (cell.innerHTML == "+") {
      cell.innerHTML = "-";
      setIsExpandedInnerRow(true);
    } else {
      cell.innerHTML = "+";
      setIsExpandedInnerRow(false);
    }
  };
  const revenueResource = async (e) => {
    try {
      console.log("this is rersource in Posttttttt");
      const response = await axios.post(`${apiV1}/revenue-entry/resources`, e);
      // response.data.data.opportunities.map((obj, id) => {
      //   return setOpportunityData(obj);
      // });
      if (e.pricingType == "T & M") {
        setResourceData(response.data.data.tmResourceEntries);
      } else {
        setResourceData(response.data.data.fpResourceEntries);
      }
      console.log(
        "this is the response for resourceeeeeeeeeeeeeeeeeeeeeeeeeee ",
        response.data.data.tmResourceEntries
      );
    } catch {}
  };

  return (
    <React.Fragment>
      <tr>
        {console.log("this is propsss data", props.opportunityEntryData)}
        <td
          className="rowtable"
          onClick={(e) => {
            revenueResource(resourseEntryData);
            handleInnerRowExpansion(e.target);
          }}
        >
          +
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.opportunityId || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.projectCode || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.opportunityName || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.pricingType || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.projectStartDate || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.projectEndDate || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.cocPractice || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.noOfResources || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span style={{fontSize:"14px"}}>{props.data.leaveLossFactor || "Unknown"}</span>
        </td>
      </tr>
      {isExpandedInnerRow && (
        <tr
          className="nestedtablebgrevenue"
          style={{ backgroundColor: "white" }}
        >
          <td colSpan={10}>
            <table>
              <tr className="trrevenue">
                <td className="iconsColumn" style={{ paddingLeft: "10px" }}>
                  <a>
                    <FaIcons.FaPlus />
                  </a>
                  <a>
                    <AiIcons.AiFillCopy />
                  </a>
                  <a>
                    <AiIcons.AiOutlineEdit />
                  </a>
                  <a>
                    <AiIcons.AiOutlineDelete />
                  </a>
                </td>
              </tr>
              <tr className="nestedtablebgrevenue">
                {column3.map((header) => {
                  return <th className="threvenue">{header}</th>;
                })}
              </tr>
              <tbody>
                {console.log("IMPPP RESOURCE DATA", resourceData)}
                {resourceData.length > 0 &&
                  resourceData.map((obj, id) => (
                    <tr>
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
                        <span style={{fontSize:"14px"}}>{obj.allocation || "Unknown"}</span>
                      </td>
                      <td className="rowtable">
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