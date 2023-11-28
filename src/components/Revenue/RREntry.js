import React, { useState, useEffect } from "react";
import { RevenueMemoizedBaseComponent } from "../CommonComponent/Revenue/RevenueBaseComponent";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import axios from "axios";
import { apiV1 } from "../../utils/constantsValue";
import { MemoizedTrForRevenueOpportunity } from "../CommonComponent/Revenue/TrForRevenueOpportunity";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal, Box } from "@mui/material";
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
  MoadalStyleRREntry,
  revenueModalStyleObject,
} from "../../utils/constantsValue";
import CloseIcon from "@mui/icons-material/Close";
import RevenueEntryForm from "../CommonComponent/Revenue/RevenueEntryForm";

function RREntry(props) {
  const columns = [
    "",
    "",
    "BU",
    "SBU",
    "SBU Head",
    "BDM",
    "Business Type",
    "Account",
    "Region",
    "Location",
    "Probability",
    "COC-Practice",
    "Status",
  ];
  const columns2 = [
    "",
    "ID",
    "Project Code",
    "Opportunity Name",
    "Pricing Type",
    "Start Date",
    "End Date",
    // "COC Practice",
    "No. Of Resources",
    "Leave loss %",
    "",
  ];

  console.log("fYear", props);
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
  props,
  columns2,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
  const [tabIndex, setTabIndex] = useState({ index: 0, formData: {} });

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
  const [selectedRowData, setSelectedRowData] = useState({});
  console.log("oppdata -->", opportunityEntryData);


  useEffect(() => {
    getAllRevenueEntries();
  }, []);
  const handleModalClose = () => {
    setIsOpen(false);
    setTabIndex({ index: 0, formData: "" });
    setSelectedRowData({});
    // setSelectedFile(null);
  };

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
    // console.log("cell value", cell);
    if (cell.innerHTML == "↓") {
      cell.innerHTML = "↑";
      setIsExpanded(true);
    } else {
      cell.innerHTML = "↓";
      setIsExpanded(false);
    }
  };

  const handleRowExpansionAll = () => {
    setIsExpanded(prevState => !prevState);
  };

  //   const handleRowExpansion = (cell) => {
  //   console.log("cell value", cell);
  //   if (cell.innerHTML == <ArrowDropDownIcon />) {
  //     cell.innerHTML = <ArrowDropUpIcon />;
  //     setIsExpanded(true);
  //   } else {
  //     cell.innerHTML = <ArrowDropDownIcon />;
  //     setIsExpanded(false);
  //   }
  // };

  const getAllRevenueEntries = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/${opportunityEntryData.financialYearName}`
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <React.Fragment>
      <tr className="nestedtablebgrevenue" style={{ backgroundColor: "white",cursor:"pointer" }}
      onClick={(e) => {
        revenueOpportunity();
        handleRowExpansionAll();
      }}
      >
        <td
          className="rowtable"
          style={{ padding: "1px", borderBottom: "none", width: "15px" }}
        >
          {/* <input type="checkbox"></input> */}
          <Checkbox size="small" style={{ padding: "1px" }} />
        </td>
        <td
          className="rowtable"
          onClick={(e) => {
            revenueOpportunity();
            // handleRowExpansion(e.target);
          }}

          style={{padding:"1px 6px", width:"10px", cursor:"pointer"}}
        >
                    {isExpanded ? "↑" : "↓"}

          {/* <ArrowDropDownIcon /> */}
        </td>

        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{businessUnit || "Unknown"}</span>
      </td> */}
        <td className="rowtable" style={{ padding: "1px", width: "79px" }}>
          <div
            style={{
              width: "79px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {businessUnit || "Unknown"}
            </span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}} >
        <span style={{fontSize:"14px"}}>{strategicBusinessUnit || "Unknown"}</span>
      </td> */}
        <td className="rowtable" style={{ padding: "1px", width: "81px" }}>
          <div
            style={{
              width: "81px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {strategicBusinessUnit || "Unknown"}
            </span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{strategicBusinessUnitHead || "Unknown"}</span>
      </td> */}
        <td className="rowtable" style={{ padding: "1px", width: "79px" }}>
          <div
            style={{
              width: "79px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {strategicBusinessUnitHead || "Unknown"}
            </span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{businessDevelopmentManager || "Unknown"}</span>
      </td> */}
        <td className="rowtable" style={{ padding: "1px", width: "82px" }}>
          <div
            style={{
              width: "82px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {businessDevelopmentManager || "Unknown"}
            </span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"150px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{businessType || "Unknown"}</span>
      </td> */}
        <td className="rowtable" style={{ padding: "1px", width: "97px" }}>
          <div
            style={{
              width: "97px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {businessType || "Unknown"}
            </span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{account || "Unknown"}</span>
      </td> */}

        <td className="rowtable" style={{ padding: "1px", width: "81px" }}>
          <div
            style={{
              width: "81px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>{account || "Unknown"}</span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{region || "Unknown"}</span>
      </td> */}
        <td className="rowtable" style={{ padding: "1px", width: "80px" }}>
          <div
            style={{
              width: "80px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>{region || "Unknown"}</span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{location || "Unknown"}</span>
      </td> */}
        <td className="rowtable" style={{ padding: "1px", width: "80px" }}>
          <div
            style={{
              width: "80px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>{location || "Unknown"}</span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"100px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{probabilityType || "Unknown"}</span>
      </td> */}

        <td className="rowtable" style={{ padding: "1px", width: "78px" }}>
          <div
            style={{
              width: "78px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {probabilityType || "Unknown"}
            </span>
          </div>
        </td>
        {/* <td className="rowtable" style={{padding:"1px", width:"150px", whiteSpace:"nowrap"}}>
        <span style={{fontSize:"14px"}}>{cocPractice || "Unknown"}</span>
      </td> */}

        <td className="rowtable" style={{ padding: "1px", width: "90px" }}>
          <div
            style={{
              width: "90px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>{cocPractice || "Unknown"}</span>
          </div>
        </td>
        <td
          className="rowtable"
          style={{ border: "none", padding: "1px", width: "95px" }}
        >
          <div
            style={{
              width: "95px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontSize: "14px" }}>{status || "Unknown"}</span>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr style={{ backgroundColor: "white" }}>
          <td colSpan={13} style={{ paddingTop: "0px" }}>
            <table style={{ backgroundColor: "rgba(225, 222, 222, 0.5)" }}>
              <tr
                className="trrevenue"
                style={{ backgroundColor: "rgba(225, 222, 222, 0)" }}
              >
                <td
                  className="iconsColumn"
                  style={{ padding: "2px 0px 0px 3px" }}
                >
                  <a
                    onClick={() => {
                      const tempObj = {};
                      tempObj["account"] = {
                        accountId: "",
                        accountName: account,
                      };
                      tempObj["opportunity"] = {
                        opportunityID: "",
                        opportunityName: "",
                        projectCode: "",
                        projectStartDate: "",
                        projectEndDate: "",
                      };
                      tempObj["bdm"] = {
                        bdmID: "",
                        bdmName: businessDevelopmentManager,
                      };
                      tempObj["currency"] = {
                        currencyID: "",
                        currencyName: "",
                      };
                      tempObj["probability"] = {
                        probabilityID: "",
                        probabilityTypeName: probabilityType,
                      };
                      tempObj["region"] = { regionID: "", regionName: region };
                      tempObj["workOrder"] = {
                        workOrderID: "",
                        workOrderEndDate: "",
                        workOrderStatus: "",
                      };
                      tempObj["financialYear"] = {
                        financialYearId: "",
                        financialYearName: financialYearName,
                      };
                      
                      tempObj["pricingType"] = "T&M"
                      setSelectedRowData({ ...tempObj });
                      setIsOpen(true);
                    }}

                  >
                    {/* <FaIcons.FaPlus /> */}
                    <AddIcon fontSize="small" />
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
                    {/* <DeleteOutlineIcon fontSize="small"/> */}
                  </a>
                </td>
              </tr>
              <tr className="nestedtablebgrevenue">
                {columns2.map((header) => {
                  return (
                    <th
                      className="threvenue"
                      style={{
                        backgroundColor: "rgba(72, 130, 225, 0.2)",
                        padding: "4px 0px",
                        fontFamily:"Roboto",
                        fontSize:"14px",
                        fontWeight:"500"
                      }}
                    >
                      {header}
                    </th>
                  );
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

                {/* <MemoizedTrForRevenueOpportunity
                    data={obj}
                    opportunityEntryData={opportunityEntryData}
                  /> */}
              </tbody>
            </table>
          </td>
        </tr>
      )}

      <Modal open={isOpen} onClose={handleModalClose}>
        <Box
          sx={MoadalStyleRREntry}
          style={{
            width: "80%",
            height: "max-content",
            borderRadius: "0px",
          }}
        >
          <ModalHeadingSection
            style={{ backgroundColor: "#EBEBEB", borderRadius: "0Px" }}
          >
            <ModalHeadingText 
                            style={{fontFamily:"Roboto", fontWeight: "400" }}
                            >
              New Entry
            </ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <RevenueEntryForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
            dataObj={selectedRowData}
            {...props}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default RREntry;
