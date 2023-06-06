import React, { useState } from "react";
import { RevenueMemoizedBaseComponent } from "../CommonComponent/Revenue/RevenueBaseComponent";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import { apiV1 } from "../../utils/constantsValue";
import { MemoizedTrForRevenueOpportunity } from "../CommonComponent/Revenue/TrForRevenueOpportunity";

function RREntry() {
  const columns = [
    "",
    "",
    "BU",
    "SBU",
    "SBU HEAD",
    "BDM",
    "Buisness Type",
    "ACCOUNT",
    "REGION",
    "LOCATION",
    "PROBABILITY",
    "COC-PRACTICE",
    "STATUS",
  ];
  const columns2 = [
    "",
    "ID",
    "Project Code",
    "Opportunity Rate",
    "Pricing Type",
    "Start Date",
    "End Date",
    "CoC Practice",
    "No Of Resources",
    "Leave Ls Ftr",
  ];

  return (
    <div>
      <RevenueMemoizedBaseComponent
        columns={columns}
        Tr={(obj) => {
          return <Tr columns={columns} data={obj} columns2={columns2} />;
        }}
      />
    </div>
  );
}
function Tr({
  data: {
    businessUnit,
    strategicBusinessUnit,
    strategicBusinessUnitHead,
    businessDevelopmentManager,
    businessType,
    account,
    region,
    location,
    probabilityType,
    cocPractice,
    status,
    financialYearName,
  },
  columns2,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [revenueEntriesData, setRevenueEntriesData] = useState({
    financialYearName: financialYearName,
    businessUnit: businessUnit,
    strategicBusinessUnit: strategicBusinessUnit,
    strategicBusinessUnitHead: strategicBusinessUnitHead,
    businessDevelopmentManager: businessDevelopmentManager,
    businessType: businessType,
    account: account,
    region: region,
    location: location,
    probabilityType: probabilityType,
    cocPractice: cocPractice,
    status: status,
  });
  const [opportunityData, setOpportunityData] = useState([]);

  const [opportunityEntryData, setOpportunityEntryData] = useState({
    financialYearName: financialYearName,
    businessUnit: businessUnit,
    strategicBusinessUnit: strategicBusinessUnit,
    strategicBusinessUnitHead: strategicBusinessUnitHead,
    businessDevelopmentManager: businessDevelopmentManager,
    businessType: businessType,
    account: account,
    region: region,
    location: location,
    probabilityType: probabilityType,
    status: status,
  });
  const revenueOpportunity = async (e) => {
    try {
      const response = await axios.post(
        `${apiV1}/revenue-entry/opportunity`,
        revenueEntriesData
      );

      setOpportunityData(response.data.data.opportunities);
    } catch {}
  };

  const handleRowExpansion = (cell) => {
    console.log("cell value", cell);
    if (cell.innerHTML == "+") {
      cell.innerHTML = "-";
      setIsExpanded(true);
    } else {
      cell.innerHTML = "+";
      setIsExpanded(false);
    }
  };

  return (
    <React.Fragment>
      <tr className="nestedtablebgrevenue">
        <td className="rowtable">
          <input type="checkbox"></input>
        </td>
        <td
          className="rowtable"
          onClick={(e) => {
            revenueOpportunity();
            handleRowExpansion(e.target);
          }}
        >
          +
        </td>

        <td className="rowtable">
          <span>{businessUnit || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{strategicBusinessUnit || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{strategicBusinessUnitHead || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{businessDevelopmentManager || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{businessType || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{account || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{region || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{location || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{probabilityType || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{cocPractice || "Unknown"}</span>
        </td>
        <td className="rowtable">
          <span>{status || "Unknown"}</span>
        </td>
      </tr>
      {isExpanded && (
        <tr style={{ backgroundColor: "white" }}>
          <td colSpan={13}>
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
                {columns2.map((header) => {
                  return <th className="threvenue">{header}</th>;
                })}
              </tr>
              <tbody>
                {opportunityData.length > 0 &&
                  opportunityData.map((obj, id) => (
                    <MemoizedTrForRevenueOpportunity
                      data={obj}
                      opportunityEntryData={opportunityEntryData}
                    />
                  ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

export default RREntry;
