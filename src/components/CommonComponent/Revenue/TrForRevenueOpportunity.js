/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { apiV1 } from "../../../utils/constantsValue";
import AddIcon from "@mui/icons-material/Add";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal, Box, FormControl, TextField } from "@mui/material";
import * as moment from "moment";
import {
  ModalHeadingSection,
  ModalHeadingText,
  ModalDetailSection,
  InputField,
  MoadalStyle,
  ButtonSection,
  ModalControlButton,
} from "../../../utils/constantsValue";
import CloseIcon from "@mui/icons-material/Close";
import RevenueResourceAccordian from "./RevenueResourceAccordian";
import { Accordion } from "react-accessible-accordion";
import { getProbabilityData } from "../../../actions/probability";
import { getRegionData } from "../../../actions/region";
import { getWorkOrderYearData } from "../../../actions/workOrder";
import { getBdmData } from "../../../actions/bdm";
import { getAccountData } from "../../../actions/account";
import Select from "react-select";
import { connect } from "react-redux";
import { getOpportunityData } from "../../../actions/opportunity";
import { getCurrencyData } from "../../../actions/currency";

function TrForRevenue(props) {
  useEffect(() => {
    props.getProbabilityData();
    props.getRegionData();
    props.getWorkOrderYearData();
    props.getBdmData();
    props.getAccountData();
    props.getOpportunityData();
    props.getCurrencyData();
  }, []);

  console.log("propsIn TrRevenue", props);
  // console.log("propsIn TrRevenue", props)

  const [isExpandedInnerRow, setIsExpandedInnerRow] = useState(false);
  const [resourceTableData, setResourceTableData] = useState([]);
  const column3 = [
    "Start Date",
    "End Date",
    "WO No",
    "Employee ID",
    "Resource Name",
    "COC Practice",
    "Rate",
    "Allocation %",
    "Leave loss %",
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
        setResourceTableData(response.data.data.tmResourceEntries);
      } else {
        setResourceTableData(response.data.data.fpResourceEntries);
      }
    } catch {}
  };

  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);
  const [isDropdown, setDropdown] = useState(false);
  const [isResourceDropdown, setIsResourceDropdown] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const toggleRowSelection = (rowIndex) => {
    if (selectedRow === rowIndex) {
      setSelectedRow(-1); // Deselect the row if it's already selected
    } else {
      setSelectedRow(rowIndex); // Select the clicked row
    }
  };

  const handleRowClick = (opportunityId) => {
    setSelectedOpportunityId((prevSelectedOpportunityId) =>
      prevSelectedOpportunityId === opportunityId ? null : opportunityId
    );
    console.log("selectedOpportunityId:", selectedOpportunityId);
  };

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };

  const closeResourceDropDown = () => {
    isResourceDropdown
      ? setIsResourceDropdown(false)
      : setIsResourceDropdown(true);
    // setIsResourceDropdown(false);
  };

  const DeleteRecord = () => {
    // console.log("delete", selectedOpportunityId);
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

  const handleResourceEmployeeID = (employeeId) => {
    setSelectedEmployeeID((prevSelectedEmployeeID) =>
      prevSelectedEmployeeID === employeeId ? null : employeeId
    );
    console.log("selectedEmployeeID:", selectedEmployeeID);
  };

  const handleResourceStartDate = (startDate) => {
    setSelectedStartDate((prevSelectedStartDate) =>
      prevSelectedStartDate === startDate ? null : startDate
    );
  };

  const deleteResourceRecord = () => {
    const parsedStartDate = new Date(selectedStartDate);
    const months = [
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

    const formattedDay = String(parsedStartDate.getDate()).padStart(2, "0"); // Add leading zero if needed
    const formattedMonth = months[parsedStartDate.getMonth()];
    const formattedYear = parsedStartDate.getFullYear();

    const formattedStartDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;

    const apiUrl =
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/delete/resources";
    const requestBody = {
      opportunityId: props.data.opportunityId,
      employeeId: selectedEmployeeID,
      resourceStartDate: formattedStartDate,
    };

    axios
      .delete(apiUrl, { data: requestBody })
      .then((res) => {
        // Handle the success response
        console.log("DELETE request successful:", res);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making DELETE request:", error);
      });
  };

  const [resourceDropdownStates, setResourceDropdownStates] = useState([]);

  useEffect(() => {
    setResourceDropdownStates(Array(resourceTableData.length).fill(false));
  }, [resourceTableData]);

  const toggleResourceDropdown = (id) => {
    const newStates = [...resourceDropdownStates];
    newStates[id] = !newStates[id];
    setResourceDropdownStates(newStates);
  };

  const [isClicked, setIsClicked] = useState(false);

  //edit modal code

  const [isOpen, setIsOpen] = useState(false);
  const [pricingType, setPricingType] = useState("T&M");
  // const [inputNumber, setInputNumber] = useState("");
  const [resourceData, setResourceData] = useState([]);
  const [gridItems, setGridItems] = useState([]);

  const onOptionChange = (e) => {
    setPricingType(e.target.value);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setTabIndex({ index: 0, formData: "" });

    // setSelectedFile(null);
  };

  // const handleInputChange = (event) => {
  //   setInputNumber(event.target.value);
  //   generateGrid(event.target.value);
  // };

  // const generateGrid = (value) => {
  //   const items = [];
  //   const iterator = value ? value : inputNumber;
  //   if (pricingType == "T&M") {
  //     const tempResourceDetails = [];
  //     for (let i = 0; i < iterator; i++) {
  //       const resourceDataRow = {
  //         index: i,
  //       };
  //       tempResourceDetails.push(resourceDataRow);
  //     }
  //     setResourceData(tempResourceDetails);
  //     for (let i = 0; i < iterator; i++) {
  //       items.push(
  //         <RevenueResourceAccordian
  //           id={i}
  //           // formData={props.tabIndex.formData}
  //           // updateResourceData={updateResourceData}
  //           pricingType={pricingType}
  //           resourceData={tempResourceDetails}
  //           updateResourceData={setResourceData}
  //           oppId={oppId}
  //           oppDataByOppId={oppDataByOppId}
  //         />
  //       );
  //     }
  //   } else {
  //     for (let i = 0; i < inputNumber; i++) {
  //       items
  //         .push
  //         // <RevenueMilestoneAccordian
  //         //   id={i}
  //         //   formData={props.tabIndex.formData}
  //         //   pricingType={pricingType}
  //         //   updateMilestoneData={updateMilestoneData}
  //         // />
  //         ();
  //     }
  //   }
  //   setGridItems(items);
  // };



  //2nd level edit 
  const [isOpenSecondLevelEdit, setIsOpenSecondLevelEdit] = useState(false);
  const [inputNumber, setInputNumber] = useState("");



  const handleInputChange = (event) => {
    setInputNumber(event.target.value);
    generateGrid(event.target.value);
  };

  // const handleInputChange = (event) => {
  //   setInputNumber(prevValue => {
  //     const newValue = event.target.value;
  //     generateGrid(newValue);
  //     return newValue;
  //   });
  // };
  const updateResourceData = (data, index) => {
    setResourceData(data);
  };

  const generateGrid = (value) => {
    console.log("inputNumber", inputNumber)
    const items = [];
    const iterator = value ? value : inputNumber;
    if (pricingType == "T&M") {
      const tempResourceDetails = [];
      for (let i = 0; i < iterator; i++) {
        const resourceDataRow = {
          index: i,
        };
        tempResourceDetails.push(resourceDataRow);
      }
      setResourceData(tempResourceDetails);
      for (let i = 0; i < iterator; i++) {
        items.push(
          <RevenueResourceAccordian
            id={i}
            // formData={props.tabIndex.formData}
            // updateResourceData={updateResourceData}
            pricingType={pricingType}
            resourceData={tempResourceDetails}
            updateResourceData={setResourceData}
            oppId={oppId}
            oppDataByOppId={oppDataByOppId}
            selectedFyIdToGetLocation={selectedFyIdToGetLocation}
          />
          // <TextField />
        );
      }
    } else {
      for (let i = 0; i < inputNumber; i++) {
        items
          .push
          // <RevenueMilestoneAccordian
          //   id={i}
          //   formData={props.tabIndex.formData}
          //   pricingType={pricingType}
          //   updateMilestoneData={updateMilestoneData}
          // />
          ();
      }
    }
    setGridItems(items);
  };


    const [tabIndex, setTabIndex] = useState({ index: 0, formData: "" });

  const handleNextClick = () => {
    setPricingType(pricingType);
    setTabIndex({
      index: 1,
      formData: "",
    });
  };

  const [oppId, setOppId] = useState();
  const [oppDataByOppId, setOppDataByOppId] = useState([]);
  console.log(
    "oppId",
    oppDataByOppId.tmRevenueEntryVO &&
      oppDataByOppId.tmRevenueEntryVO.opportunity.opportunityName
  );

  const getDataByOppId = (oppId) => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/getbyid/${oppId}`
      )
      .then((responseData) => {
        setOppDataByOppId(responseData.data.data);
      });
  };


    // useEffect(()=>{
    //   getDataByOppId();
    // },[]);

    useEffect(() => {
      if (oppId) {
        getDataByOppId(oppId);
      }
    }, [oppId]);


    const array = [];
    const [currencyData, setCurrencyData] = useState();
    const getAllCurrencyForFy = async (e) => {
      await axios
        .get(
          `http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency/financialyear/${e}`
        )
        .then((response) => {
          const actualDataObject = response.data.data;
          array.push(actualDataObject);
          setCurrencyData(actualDataObject);
        });
    };
    const opportunityNameByOppId = oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName || "";
    // console.log("oppId2--->", oppDataByOppId);

    // const initialAccountIdPassingToForm= oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.account.accountName


    const [formUpdateData, setFormUpdateData] = useState({
      account: { accountId: null
        , accountName:""
    },
      opportunity: {
        opportunityID: "",
        opportunityName:"" ,
        projectCode: "",
        projectStartDate: "",
        projectEndDate: "",
      },
      bdm: { bdmID: null, bdmName: "" },
      currency: { currencyID: null, currencyName: "" },
      probability: { probabilityID: "", probabilityTypeName: "" },
      region: { regionID: "", regionName: "" },
      workOrder: { workOrderID: "", workOrderEndDate: "", workOrderStatus: "" },
      financialYear: {
        financialYearId: "",
        financialYearName: "",
      },
      pricingType: pricingType,
    });

    // console.log("oppId3--->", formUpdateData)

  console.log("oppId3--->", formUpdateData);

  const formatDateA = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const payload = {
    account: {
      accountId: formUpdateData.account.accountId,
    },
    opportunity: {
      opportunityId: formUpdateData.opportunity.opportunityID,
      opportunityName: formUpdateData.opportunity.opportunityName,
    },
    projectCode: formUpdateData.opportunity.projectCode,
    projectStartDate: formUpdateData.opportunity.projectStartDate,
    projectEndDate: formUpdateData.opportunity.projectEndDate,

    businessDevelopmentManager: {
      bdmId: formUpdateData.bdm.bdmID,
    },
    currency: {
      currencyId: formUpdateData.currency.currencyID,
    },
    probabilityType: {
      probabilityTypeId: formUpdateData.probability.probabilityID,
    },
    region: {
      regionId: formUpdateData.region.regionID,
    },
    workOrder: {
      workOrderId: formUpdateData.workOrder.workOrderID,
    },
    workOrderEndDate: formUpdateData.workOrder.workOrderEndDate,
    workOrderStatus: formUpdateData.workOrder.workOrderStatus,

    financialYear: {
      financialYearId: formUpdateData.financialYear.financialYearId,
    },
    // resourceCount: resourceData.length,
    resourceCount: inputNumber,
    pricingType: pricingType,
    remarks: "TM Details adding",
    status: "Submitted",
    revenueResourceEntries: resourceData.map((ele) => ({
      strategicBusinessUnit: {
        sbuId: ele.sbuId,
      },
      strategicBusinessUnitHead: {
        sbuHeadId: ele.sbuHeadId,
      },
      businessUnit: {
        businessUnitId: ele.buisnessUnitId,
      },
      businessType: {
        businessTypeId: ele.businessTypeId,
      },
      location: {
        locationId: ele.locationId,
      },
      resourceName: ele.resouceName,
      employeeId: ele.employeeId,
      resourceStartDate: formatDateA(ele.startDate),
      resourceEndDate: formatDateA(ele.endDate),
      cocPractice: {
        cocPracticeId: ele.cocPracticeId,
      },
      leaveLossFactor: ele.leaveLossFactor,
      billingRateType: ele.billingRateType,
      billingRate: ele.billingRate,
      allocation: ele.allocation,
    })),
  };

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/TandM/${oppId}`,
        payload
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpenSecondLevelEdit(false);
        console.log("editSave", actualDataObject);
      });
  };

  const initialOpportunityId = oppDataByOppId.tmRevenueEntryVO;
  const selectedFyIdToGetLocation = formUpdateData.financialYear.financialYearName;

  useEffect(() => {
    const initialAccountID = oppDataByOppId?.tmRevenueEntryVO?.account?.accountId;
    const initialOpportunityId = oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityId;
    const initialOpportunityName = oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName;
    const initialProjectCode = oppDataByOppId.tmRevenueEntryVO?.projectCode;
    const initialProjectStartDate = oppDataByOppId.tmRevenueEntryVO?.projectStartDate;
    const initialProjectEndDate = oppDataByOppId.tmRevenueEntryVO?.projectEndDate;
    const initialCurrencyId = oppDataByOppId?.tmRevenueEntryVO?.currency?.currencyId;
    const initialBdm = oppDataByOppId?.tmRevenueEntryVO?.businessDevelopmentManager?.bdmId;
    const initialProbability = oppDataByOppId?.tmRevenueEntryVO?.probabilityType?.probabilityTypeId;
    const initialRegion = oppDataByOppId?.tmRevenueEntryVO?.region?.regionId;
    const initialFinancialYearId = oppDataByOppId?.tmRevenueEntryVO?.financialYear?.financialYearId;
    const initialFinancialYearName = oppDataByOppId?.tmRevenueEntryVO?.financialYear?.financialYearName;
    const initialWorkOrderId = oppDataByOppId?.tmRevenueEntryVO?.workOrder?.workOrderId;
    const initialWorkOrderEndDate = oppDataByOppId?.tmRevenueEntryVO?.workOrder?.workOrderEndDate;
    const initialWorkOrderStatus = oppDataByOppId?.tmRevenueEntryVO?.workOrder?.workOrderStatus;

    console.log("initialBdm",initialBdm);



    if (initialAccountID !== undefined && initialAccountID !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        account: {
          ...prevState.account,
          accountId: initialAccountID,
        },
      }));
    }

    if (initialOpportunityId !== undefined && initialOpportunityId !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        opportunity: {
          ...prevState.opportunity,
          opportunityID: initialOpportunityId,
          opportunityName: initialOpportunityName,
          projectCode: initialProjectCode,
          projectStartDate: initialProjectStartDate,
          projectEndDate: initialProjectEndDate,
        },
      }));
    }

    if (initialCurrencyId !== undefined && initialCurrencyId !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        currency: {
          ...prevState.currency,
          currencyID: initialCurrencyId,
        },
      }));
    }

    if (initialBdm !== undefined && initialBdm !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        bdm: {
          ...prevState.bdm,
          bdmID: initialBdm,
        },
      }));
    }

    if (initialProbability !== undefined && initialProbability !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        probability: {
          ...prevState.probability,
          probabilityID: initialProbability,
        },
      }));
    }

    if (initialRegion !== undefined && initialRegion !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        region: {
          ...prevState.region,
          regionID: initialRegion,
        },
      }));
    }

    if (initialFinancialYearId !== undefined && initialFinancialYearId !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        financialYear: {
          ...prevState.financialYear,
          financialYearId: initialFinancialYearId,
          financialYearName: initialFinancialYearName,
        },
      }));
    }

    if (initialWorkOrderId !== undefined && initialWorkOrderId !== null) {
      setFormUpdateData(prevState => ({
        ...prevState,
        workOrder: {
          ...prevState.workOrder,
          workOrderID: initialWorkOrderId,
          workOrderEndDate: initialWorkOrderEndDate,
          workOrderStatus: initialWorkOrderStatus,

        },
      }));
    }

    const initialResourceCount = oppDataByOppId?.tmRevenueEntryVO?.resourceCount;
    if (initialResourceCount !== undefined && initialResourceCount !== null) {
      setInputNumber(initialResourceCount);
      generateGrid(initialResourceCount);
    }



  }, [oppDataByOppId]);
  return (
    <React.Fragment>
      <tr
        key={props.data.opportunityId}
        style={{
          backgroundColor:
            selectedOpportunityId === props.data.opportunityId
              ? "rgba(192, 228, 234, 0.43)"
              : "white",
        }}
        // onClick={() => handleRowClick(props.data.opportunityId)}
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
            {moment(props.data.projectStartDate, "YYYY-MM-DD").format(
              "DD/MMM/YYYY"
            )}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {moment(props.data.projectEndDate, "YYYY-MM-DD").format(
              "DD/MMM/YYYY"
            )}
          </span>
        </td>
        {/* <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.cocPractice || "Unknown"}
          </span>
        </td> */}
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.noOfResources || "0"}
          </span>
        </td>
        <td className="rowtable" style={{ padding: "1px" }}>
          <span style={{ fontSize: "14px" }}>
            {props.data.leaveLossFactor || ""}
          </span>
        </td>
        <td className="rowtable" style={{ border: "none" }}>
          <span style={{ float: "right", cursor: "pointer" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                // console.log("wwwww--->", props.data.opportunityId);
                handleRowClick(props.data.opportunityId);
                setOppId(props.data.opportunityId);
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
                  boxShadow: "5px 5px 10px rgb(0 0 0 / 45%)",
                  backgroundColor: "#F2FBFF",
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
                class="dropdown-content"
              >
                <a style={{ padding: "5px", margin: "3px 0px" }}>
                  {/* <div style={{display:"flex"}}> */}
                  <FileCopyOutlinedIcon
                    style={{ fontSize: "15px", paddingRight: "5px" }}
                  />
                  copy
                  {/* </div> */}
                </a>
                <a
                  style={{ padding: "5px", margin: "3px 0px" }}
                  onClick={() => {
                    setIsOpenSecondLevelEdit(true);
                  }}
                >
                  <EditOutlinedIcon
                    style={{ fontSize: "15px", paddingRight: "5px" }}
                  />
                  Edit
                </a>
                <a
                  style={{ padding: "5px 0px 5px 10px", margin: "3px 0px" }}
                  onClick={() => DeleteRecord()}
                >
                  <DeleteOutlineIcon
                    style={{ fontSize: "15px", paddingRight: "5px" }}
                  />
                  Delete
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
            <table
              style={{
                backgroundColor: "rgba(225, 222, 222, 0.5)",
                borderBottom: "1px solid #0000004d",
              }}
            >
              <tr
                className="trrevenue"
                style={{ backgroundColor: "rgba(225, 222, 222, 0)" }}
              >
                <td
                  className="iconsColumn"
                  style={{
                    padding: "2px 0px 0px 10px",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <a
                  onClick={()=>{setIsClicked(true)}}
                  >
                    {/* <FaIcons.FaPlus /> */}
                    <AddIcon fontSize="small" />
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
                {resourceTableData.length > 0 &&
                  resourceTableData.map((obj, id) => (
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
                        {obj.resourceStartDate
    ? moment(obj.resourceEndDate, "YYYY-MM-DD").format("DD/MMM/YYYY")
    : ""}
                        </span>
                      </td>

                      <td className="rowtable">
                        <span>
                        {obj.resourceEndDate
    ? moment(obj.resourceEndDate, "YYYY-MM-DD").format("DD/MMM/YYYY")
    : ""}
                          </span>
                        
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.workOrderNumber || ""}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.employeeId || ""}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.resourceName || ""}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.cocPractice || ""}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.billingRate || ""}
                        </span>
                      </td>
                      <td className="rowtable">
                        <span>{obj.allocation || ""}</span>
                      </td>
                      <td className="rowtable">
                        <span style={{ fontSize: "14px" }}>
                          {obj.leaveLossFactor || ""}
                        </span>
                      </td>
                      <td className="rowtable" style={{ border: "none" }}>
                        <span style={{ float: "right", cursor: "pointer" }}>
                          <AiIcons.AiOutlineMore
                            onClick={(e) => {
                              // setSelectedResourceId(obj.resourceId);
                              // setIsResourceDropdown(true);
                              // closeResourceDropDown();
                              toggleResourceDropdown(id);
                              handleResourceEmployeeID(obj.employeeId);
                              handleResourceStartDate(obj.resourceStartDate);
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
                                  boxShadow: "5px 5px 10px rgb(0 0 0 / 45%)",
                                  backgroundColor: "#F2FBFF",
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
                                class="dropdown-content"
                              >
                                <a
                                  style={{ padding: "5px", margin: "3px 0px" }}
                                >
                                  <FileCopyOutlinedIcon
                                    style={{
                                      fontSize: "15px",
                                      paddingRight: "5px",
                                    }}
                                  />
                                  copy
                                </a>
                                <a
                                  style={{ padding: "5px", margin: "3px 0px" }}
                                  onClick={() => {
                                    setIsOpen(true);
                                  }}
                                >
                                  <EditOutlinedIcon
                                    style={{
                                      fontSize: "15px",
                                      paddingRight: "5px",
                                    }}
                                  />
                                  Edit
                                </a>
                                <a
                                  style={{
                                    padding: "5px 0px 5px 10px",
                                    margin: "3px 0px",
                                  }}
                                  onClick={() => {
                                    deleteResourceRecord();
                                  }}
                                >
                                  <DeleteOutlineIcon
                                    style={{
                                      fontSize: "15px",
                                      paddingRight: "5px",
                                    }}
                                  />
                                  Delete
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
      <Modal open={isClicked} onClose={handleModalClose}>
        <Box
          sx={MoadalStyle}
          style={{
            width: "80%",
            height: "max-content",
            borderRadius: "0px",
          }}
        >
          <ModalHeadingSection
            style={{ backgroundColor: "lightgray", borderRadius: "0Px" }}
          >
            <ModalHeadingText
              style={{ fontStyle: "normal", fontWeight: "200" }}
            >
              Add Resource
            </ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsClicked(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection style={{ borderRadius: "0px" }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "30px",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "10px" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexBasis: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div>
                      <label for="username">Pricing Type</label>
                      <input
                        type="radio"
                        value="T&M"
                        name="Pricing Type"
                        checked={pricingType === "T&M"}
                        onChange={onOptionChange}
                        style={{ boxShadow: "none" }}
                      />
                      T & M
                      <input
                        type="radio"
                        value="FP"
                        name="Pricing Type"
                        checked={pricingType === "FP"}
                        onChange={onOptionChange}
                        style={{ boxShadow: "none" }}
                      />
                      FP
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <span>FY :</span>
                      <div>
                        <FormControl>
                          <select
                            style={{
                              background: "white",
                              width: "150px",
                              marginLeft: "8px",
                              variant: "outlined",
                              borderRadius: "0px",
                              height: "35px",
                            }}
                            // onChange={(e) => {
                            //   getAllCurrencyForFy(e.target.value);
                            //   const selectedFyId =
                            //     e.target.selectedOptions[0].getAttribute("data-fyId");
                            //   setFormData({
                            //     ...formData,
                            //     financialYear: {
                            //       ...formData.financialYear,
                            //       financialYearId: selectedFyId,
                            //       financialYearName: e.target.value,
                            //     },
                            //   });
                            // }}
                          >
                            <option value="" disabled hidden>
                              Select
                            </option>

                            {props?.financialYear?.financialYear.map(
                              (fyData, index) => {
                                const fyNameData = fyData?.financialYearName;
                                return (
                                  <option
                                    data-fyId={fyData?.financialYearId}
                                    key={index}
                                    selected={fyNameData === "2023-2024"}
                                  >
                                    {fyNameData}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {pricingType == "T&M" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      <span style={{ marginLeft: "-9px" }}>
                        Resource count:
                      </span>
                      {/* <div>
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="number"
                        value={inputNumber}
                        onChange={handleInputChange}
                      />
                      <input
                        style={{
                          margin: "0px 0px 0px 8px",
                        }}
                        type="button"
                        value="Add"
                        id="create-account"
                        class="button"
                        onClick={generateGrid}
                      />
                    </label>
                  </div> */}
                      <InputField
                        style={{
                          background: "white",
                          width: "75Px",
                          marginLeft: "8px",
                          borderRadius: "0px !important",
                          height: "35px",
                        }}
                        size="small"
                        type="number"
                        id="name"
                        variant="outlined"
                        spellcheck="false"
                        onChange={handleInputChange}
                        value={inputNumber}
                      />
                    </div>
                  </div>
                )}
                {pricingType == "FP" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      <span style={{ marginLeft: "-9px" }}>
                        Milestone count:
                      </span>
                      {/* <div>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="number"
                      value={inputNumber}
                      onChange={handleInputChange}
                    />
                    <input
                      style={{
                        margin: "0px 0px 0px 8px",
                      }}
                      type="button"
                      value="Add"
                      id="create-account"
                      class="button"
                      onClick={generateGrid}
                    />
                  </label>
                </div> */}
                      <InputField
                        style={{
                          background: "white",
                          width: "75Px",
                          marginLeft: "8px",
                          borderRadius: "0px !important",
                          height: "35px",
                        }}
                        size="small"
                        type="text"
                        id="name"
                        variant="outlined"
                        spellcheck="false"
                        // onChange={(e) => {
                        //   setFormData({
                        //     ...formData,
                        //     opportunity: {
                        //       ...formData.opportunity,
                        //       projectCode: e.target.value,
                        //     },
                        //   });
                        // }}
                        // value={formData?.opportunity?.projectCode}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "0px",
                }}
              >
                <Accordion id="accordian">{gridItems}</Accordion>
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}
              >
                <div style={{ display: "flex", flexBasis: "100%", gap: "5px" }}>
                  <div style={{ display: "flex", flexBasis: "25%" }}>
                    <div style={{ width: "75px" }}>
                      <span>Remarks :</span>
                    </div>
                    <input style={{ width: "730px", borderRadius: "0px" }} />
                  </div>
                </div>
              </div>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>

      <Modal open={isOpenSecondLevelEdit} onClose={handleModalClose}>
        <Box
          sx={MoadalStyle}
          style={{
            width: "80%",
            height: "max-content",
            borderRadius: "0px",
          }}
        >
          <ModalHeadingSection
            style={{ backgroundColor: "lightgray", borderRadius: "0Px" }}
          >
            <ModalHeadingText
              style={{ fontStyle: "normal", fontWeight: "200" }}
            >
              Edit
            </ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpenSecondLevelEdit(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection style={{ borderRadius: "0px" }}>
          <form
        id="reg-form"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "30px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", rowGap: "10px" }}>
          <div
            style={{
              display: "flex",
              flexBasis: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <div>
                <label for="username">Pricing Type</label>
                <input
                  type="radio"
                  value="T&M"
                  name="Pricing Type"
                  checked={pricingType === "T&M"}
                  // onChange={onOptionChange}
                  style={{ boxShadow: "none" }}
                />
                T & M
                <input
                  type="radio"
                  value="FP"
                  name="Pricing Type"
                  checked={pricingType === "FP"}
                  // onChange={onOptionChange}
                  style={{ boxShadow: "none" }}
                  disabled
                />
                FP
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "25px",
              }}
            >
              <div
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <span>FY :</span>
                <div>
                  {/* <FormControl>
                    <select
                      style={{
                        background: "white",
                        width: "150px",
                        marginLeft: "8px",
                        variant: "outlined",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={(e) => {
                        getAllCurrencyForFy(e.target.value);
                        const selectedFyId =
                          e.target.selectedOptions[0].getAttribute("data-fyId");
                          setFormUpdateData({
                          ...formUpdateData,
                          financialYear: {
                            ...formUpdateData.financialYear,
                            financialYearId: selectedFyId,
                            financialYearName: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Select
                      </option>
                      {props?.financialYear?.financialYear.map(
                        (fyData, index) => {

                          const fyNameData = fyData?.financialYearName;
                          const fyId = fyData.financialYearId;
                          {console.log("check financial year new", fyNameData)}
                          return (
                            <option
                              data-fyId={fyId}
                              key={index}
                              // selected={fyNameData}
                            >
                              {fyNameData}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </FormControl> */}
                                    <FormControl>
                    <select
                      style={{
                        background: "white",
                        width: "150px",
                        marginLeft: "8px",
                        variant: "outlined",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={(e) => {
                        getAllCurrencyForFy(e.target.value);
                        const selectedFyId =
                          e.target.selectedOptions[0].getAttribute("data-fyId");
                          setFormUpdateData({
                          ...formUpdateData,
                          financialYear: {
                            ...formUpdateData.financialYear,
                            financialYearId: selectedFyId,
                            financialYearName: e.target.value,
                          },
                        });
                      }}
                    >
                      <option value="" disabled selected hidden>
                      {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.financialYear.financialYearName}
                      </option>
                      {props?.financialYear?.financialYear.map(
                        (fyData, index) => {

                          const fyNameData = fyData?.financialYearName;
                          const fyId = fyData.financialYearId;
                          return (
                            <option
                              data-fyId={fyId}
                              key={index}
                              // selected={fyNameData}
                            >
                              {fyNameData}
                              {/* {console.log("fyNameData", fyNameData)} */}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tabIndex?.index === 0 ? (
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexBasis: "100%",
                  gap: "100px",
                }}
              >
                <div
                  style={{
                    flexBasis: "25%",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Account</span>
                  </div>
                  <div>
                    {/* <FormControl>
                      <select
                        size="small"
                        value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.account.accountName}
                        style={{
                          background: "white",
                          width: "187Px",
                          marginLeft: "8px",
                          borderRadius: "0px",
                          height: "35px",

                        }}
                      >
                        <option value="" disabled selected hidden>
                          Select
                        </option>
                      </select>
                    </FormControl> */}
                                   <select
                  style={{
                    height: "35px",
                    width: "80%",
                    marginBottom: "10px",
                    borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black"
                  }}
                  // value={ oppDataByOppId.tmRevenueEntryVO?.account?.accountName ||
                  //   formUpdateData.account.accountName ||
                  //   ""}
                  onChange={(e)=>{
                    const selectedFyId =
                    e.target.selectedOptions[0].getAttribute(
                      "data-fyId"
                    );
                    setFormUpdateData({
                      ...formUpdateData,
                      account: {
                        ...formUpdateData.account,
                        accountId: selectedFyId,
                        accountName: e.target.value,
                      },
                    });
                    
                  }}
                  >
                  <option value="" disabled selected hidden>
                  {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.account.accountName}

                  </option>
                  {console.log("datacheckprop",formUpdateData )}
                  {props.accountData && props.accountData.accountData &&
                          props.accountData.accountData.map(
                            (accountData, index) => {
                              const accountNamedata = accountData.accountName;

                              return (
                                <option
                                  data-fyId={accountData?.accountId}
                                  key={index}
                                >
                                  {accountNamedata}
                                </option>
                              );
                            }
                          )}
                  </select>
                  

                  </div>
                </div>


                <div style={{ flexBasis: "25%" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>Opportunity Name</span>
                  <div>

                {/* <select
                  style={{
                    height: "35px",
                    width: "80%",
                    marginBottom: "10px",
                    borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black"
                  }}
                  value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.opportunity.opportunityName}
                  onChange={(e)=>{                  
                  }}
                  >
                  <option value="" disabled selected hidden>
                  {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.opportunity.opportunityName}

                  </option>

                  </select> */}
                                      {/* <FormControl> */}
                      {/* <select
                        size="small"
                        style={{
                          background: "white",
                          width: "187Px",
                          marginLeft: "8px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        // value={oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName}
                        onChange={(e) => {
                          const selectedOpportunityId =
                            e.target.selectedOptions[0].getAttribute(
                              "data-fyId"
                            );
                          const found =
                            props?.opportunityData?.opportunityData?.filter(
                              (each) => {
                                return (
                                  each?.opportunityId ===
                                  Number(selectedOpportunityId)
                                );
                              }
                            );
                          setFormUpdateData({
                            ...formUpdateData,
                            opportunity: {
                              ...formUpdateData.opportunity,
                              opportunityID: selectedOpportunityId,
                              opportunityName: e.target.value,
                              projectCode: found?.length
                                ? found[0]?.projectCode
                                : "",
                              projectStartDate: found?.length
                                ? found[0]?.projectStartDate
                                : "",
                              projectEndDate: found?.length
                                ? found[0]?.projectEndDate
                                : "",
                            },
                          });
                        }}
                      >
                        <option value="" disabled selected hidden>
                        {oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName}

                        </option>
                        {props?.opportunityData?.opportunityData &&
                          props?.opportunityData?.opportunityData.map(
                            (opportunityData, index) => {
                              const opportunityNamedata =
                                opportunityData.opportunityName;
                              return (
                                <option
                                  data-fyId={String(
                                    opportunityData.opportunityId
                                  )}
                                  key={index}
                                >
                                  {opportunityNamedata}
                                </option>
                              );
                            }
                          )}
                      </select> */}
                    {/* </FormControl> */}

                    {/* <Select
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          background: "white",
                          width: "187px",
                          marginLeft: "8px",
                          borderRadius: "0px",
                          height: "35px",
                        }),
                      }}
                      
                     // value={oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName}
                      options={props?.opportunityData?.opportunityData?.map(
                        (opportunityData, index) => ({
                          value: opportunityData.opportunityId,
                          label: opportunityData.opportunityName,
                        })
                      )}
                      onChange={(selectedOption) => {
                        const selectedOpportunityId = selectedOption.value;
                        const found =
                          props?.opportunityData?.opportunityData?.find(
                            (each) =>
                              each?.opportunityId === selectedOpportunityId
                          );

                        setFormUpdateData({
                          ...formUpdateData,
                          opportunity: {
                            ...formUpdateData.opportunity,
                            opportunityID: selectedOption.value,
                            opportunityName: selectedOption.label,
                            projectCode: found?.projectCode || "", // Set the auto-populated value or an empty string if not found
                            projectStartDate: found?.projectStartDate || "", // Set the auto-populated value or an empty string if not found
                            projectEndDate: found?.projectEndDate || "", // Set the auto-populated value or an empty string if not found
                          },
                        });
                      }}
                      
                      value={{
                        value: formUpdateData.opportunity.opportunityID,
                        label: formUpdateData.opportunity.opportunityName,
                      }}
                    /> */}

                                          <select
                        // size="small"
                        style={{
                          height: "35px",

                          background: "white",
                          borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black",
                          width: "187Px",
                          // marginLeft: "8px",
                        }}
                        // value={oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName}
                        onChange={(e) => {
                          const selectedOpportunityId =
                            e.target.selectedOptions[0].getAttribute(
                              "data-fyId"
                            );
                          const found =
                            props?.opportunityData?.opportunityData?.filter(
                              (each) => {
                                return (
                                  each?.opportunityId ===
                                  Number(selectedOpportunityId)
                                );
                              }
                            );
                          setFormUpdateData({
                            ...formUpdateData,
                            opportunity: {
                              ...formUpdateData.opportunity,
                              opportunityID: selectedOpportunityId,
                              opportunityName: e.target.value,
                              projectCode: found?.length
                                ? found[0]?.projectCode
                                : "",
                              projectStartDate: found?.length
                                ? found[0]?.projectStartDate
                                : "",
                              projectEndDate: found?.length
                                ? found[0]?.projectEndDate
                                : "",
                            },
                          });
                        }}
                        value={{
                          value: formUpdateData.opportunity.opportunityID,
                          label: formUpdateData.opportunity.opportunityName,
                        }}
                      >
                        <option value="" disabled selected hidden>
                        {oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName}
                        </option>
                        {props?.opportunityData?.opportunityData &&
                          props?.opportunityData?.opportunityData.map(
                            (opportunityData, index) => {
                              const opportunityNamedata =
                                opportunityData.opportunityName;
                              return (
                                <option
                                  data-fyId={String(
                                    opportunityData.opportunityId
                                  )}
                                  key={index}
                                >
                                  {opportunityNamedata}
                                </option>
                              );
                            }
                          )}
                      </select>
                  </div>
                </div>


                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>BDM</span>
                  </div>
                  <div style={{ width: "187px" }}>
                   

{/* <select
                  style={{
                    height: "35px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black"
                  }}
                  value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.businessDevelopmentManager.bdmDisplayName}
                  onChange={(e)=>{
                    
                  }}
                  >
                  <option value="" disabled selected hidden>
                  {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.businessDevelopmentManager.bdmDisplayName}

                  </option>

                  </select> */}
                                      <FormControl>
                      <select
                        size="small"
                        style={{
                          background: "white",
                          width: "187Px",
                          borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black",
                          height: "35px",
                        }}
                        // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.businessDevelopmentManager.bdmDisplayName}

                        onChange={(e) => {
                          const selectedbdmId =
                            e.target.selectedOptions[0].getAttribute(
                              "data-bdmId"
                            );
                          const foundBdm = props?.bdmData?.bdmData.find(
                            (ele) => {
                              return ele.bdmId === selectedbdmId;
                            }
                          );

                          setFormUpdateData({
                            ...formUpdateData,
                            bdm: {
                              ...formUpdateData.bdm,
                              bdmID: selectedbdmId,
                              bdmName: e.target.value,
                            },
                          });
                        }}
                      >
                        <option value="" disabled selected hidden>
                      {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.businessDevelopmentManager.bdmDisplayName}

                        </option>
                        {props?.bdmData?.bdmData &&
                          props?.bdmData?.bdmData.map((obj, id) => (
                            <option data-bdmId={obj.bdmId}>
                              {obj.bdmName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexBasis: "100%",
                  gap: "100px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Project Code</span>
                  </div>
                  <div style={{ width: "200px" }}>
                  <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.projectCode}
                  value={formUpdateData?.opportunity?.projectCode}

                  onChange={(e) => {
                    setFormUpdateData({
                      ...formUpdateData,
                      opportunity: {
                        ...formUpdateData.opportunity,
                        projectCode: e.target.value,
                      },
                    });
                  }}
                />
                  </div>
                </div>

                
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Project Start Date</span>
                  </div>
                  <div style={{ width: "188px" }}>
                  <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.projectStartDate}
                  value={formUpdateData?.opportunity?.projectStartDate}
                  onChange={(e) => {
                    setFormUpdateData({
                      ...formUpdateData,
                      opportunity: {
                        ...formUpdateData.opportunity,
                        projectStartDate: e.target.value,
                      },
                    });
                  }}
                />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Project End date</span>
                  </div>
                  <div style={{ width: "187px" }}>
                  <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.projectEndDate}
                  onChange={(e) => {
                    setFormUpdateData({
                      ...formUpdateData,
                      opportunity: {
                        ...formUpdateData.opportunity,
                        projectEndDate: e.target.value,
                      },
                    });
                  }}
                  value={formUpdateData?.opportunity?.projectEndDate}

                />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexBasis: "100%",
                  gap: "100px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Currency(As per WO)</span>
                  </div>
                  <select
                  style={{
                    height: "35px",
                    width: "80%",
                    marginBottom: "10px",
                    borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black"
                  }}
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.currency.currencyName}
                  onChange={(e) => {
                    const selectedFyId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    setFormUpdateData({
                      ...formUpdateData,
                      currency: {
                        ...formUpdateData.currency,
                        currencyID: selectedFyId,
                        currencyName: e.target.value,
                      },
                    });
                  }}
                  >
                  <option value="" disabled selected hidden>
                  {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.currency.currencyName}

                  </option>
                  {props?.currencyData?.currencyData &&
                        props?.currencyData?.currencyData.map(
                          (currencyData, index) => {
                            const currencyNamedata = currencyData?.currencyName;
                            return (
                              <option
                                data-fyId={currencyData.currencyId}
                                key={index}
                              >
                                {currencyNamedata}
                              </option>
                            );
                          }
                        )}
                  </select>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Probablity</span>
                  </div>

                  <select
                  style={{
                    height: "35px",
                    width: "74%",
                    marginBottom: "10px",
                    borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black"
                  }}
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.probabilityType.probabilityTypeName}
                  onChange={(e) => {
                    const selectedFyId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    setFormUpdateData({
                      ...formUpdateData,
                      probability: {
                        ...formUpdateData.probability,
                        probabilityID: selectedFyId,
                        probabilityTypeName: e.target.value,
                      },
                    });
                  }}
                  >
                  <option value="" disabled selected hidden>
                  {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.probabilityType.probabilityTypeName}

                  </option>
                  {props?.probabilityData?.probabilityData &&
                        props?.probabilityData?.probabilityData.map(
                          (probabilityData, index) => {
                            const probabilityNamedata =
                              probabilityData?.probabilityTypeName;
                            return (
                              <option
                                data-fyId={probabilityData.probabilityTypeId}
                                key={index}
                              >
                                {probabilityNamedata}
                              </option>
                            );
                          }
                        )}
                  </select>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Region</span>
                  </div>
                  <select
                  style={{
                    height: "35px",
                    width: "70%",
                    marginBottom: "10px",
                    borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black"
                  }}
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.region.regionDisplayName}
                  onChange={(e) => {
                    const selectedFyId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    setFormUpdateData({
                      ...formUpdateData,
                      region: {
                        ...formUpdateData.region,
                        regionID: selectedFyId,
                        regionName: e.target.value,
                      },
                    });
                  }}
                  >
                  <option value="" disabled selected hidden>
                  {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.region.regionDisplayName}

                  </option>
                  {props?.regionData?.regionData &&
                        props?.regionData?.regionData.map(
                          (regionData, index) => {
                            const regionNamedata = regionData?.regionName;
                            return (
                              <option
                                data-fyId={regionData.regionId}
                                key={index}
                              >
                                {regionNamedata}
                              </option>
                            );
                          }
                        )}
                  </select>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                rowGap: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexBasis: "100%",
                  gap: "100px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Work Order</span>
                  </div>
                  <select
                  style={{
                    height: "35px",
                    width: "80%",
                    marginBottom: "10px",
                    borderRadius: "1px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                    color:"black"
                  }}
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.workOrder.workOrderNumber}
                  onChange={(e) => {
                    const selectedWorkOrderId =
                      e.target.selectedOptions[0].getAttribute("data-fyId");
                    const found =
                      props?.workOrderData?.workOrderData?.filter(
                        (each) => {
                          return (
                            each?.workOrderId ===
                            Number(selectedWorkOrderId)
                          );
                        }
                      );

                    setFormUpdateData({
                      ...formUpdateData,
                      workOrder: {
                        ...formUpdateData.workOrder,
                        workOrderID: selectedWorkOrderId,
                        workOrderStatus: e.target.value,
                        workOrderEndDate: found?.length
                          ? found[0]?.workOrderEndDate
                          : "",
                        workOrderStatus: found?.length
                          ? found[0]?.workOrderStatus
                          : "",
                      },
                    });
                  }}
                  value={{
                    value: formUpdateData.workOrder.workOrderID,
                    label: formUpdateData.workOrder.workOrderID,
                  }}
                  >
                  <option value="" disabled selected hidden>
                  {oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.workOrder.workOrderNumber}

                  </option>
                  {props?.workOrderData?.workOrderData &&
                        props?.workOrderData?.workOrderData.map(
                          (workOrderData, index) => {
                            const workOrderNamedata =
                              workOrderData?.workOrderNumber;
                            return (
                              <option
                                data-fyId={String(workOrderData.workOrderId)}
                                key={index}
                              >
                                {workOrderNamedata}
                              </option>
                            );
                          }
                        )}
                  </select>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Work Order End Date</span>
                  </div>

                  <div style={{ width: "188px" }}>
                  <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.workOrder.workOrderEndDate}
                  value={formUpdateData?.workOrder?.workOrderEndDate}

                  onChange={(e) => {
                    setFormUpdateData({
                      ...formUpdateData,
                      workOrder: {
                        ...formUpdateData.workOrder,
                        workOrderEndDate: e.target.value,
                      },
                    });
                  }}
                />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Work Order Status</span>
                  </div>

                  <div style={{ width: "187px" }}>
                  <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.workOrder.workOrderStatus}
                  onChange={(e) => {
                    setFormUpdateData({
                      ...formUpdateData,
                      workOrder: {
                        ...formUpdateData.workOrder,
                        workOrderStatus: e.target.value,
                      },
                    });
                  }}
                  value={formUpdateData?.workOrder?.workOrderStatus}

                />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: "10px",
                // marginLeft: "-78px",
                display: "flex",
                alignItems: "center",
                width: "80%",
              }}
            >
              <ButtonSection>
                <ModalControlButton
                  sx={{ marginLeft: "400px", marginRight: "75px" }}
                  type="button"
                  value="Continue"
                  id="create-account"
                  variant="contained"
                  onClick={handleNextClick}
                >
                  Next
                </ModalControlButton>
                <ModalControlButton
                  sx={{ marginRight: "380px" }}
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpenSecondLevelEdit(false)
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalControlButton>
              </ButtonSection>
            </div>

          </div>
        ):( 
          <>
                        <div>
                {pricingType == "T&M" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      <span style={{ marginLeft: "-9px" }}>
                        Resource count:
                      </span>
                      {/* <div>
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="number"
                        value={inputNumber}
                        onChange={handleInputChange}
                      />
                      <input
                        style={{
                          margin: "0px 0px 0px 8px",
                        }}
                        type="button"
                        value="Add"
                        id="create-account"
                        class="button"
                        onClick={generateGrid}
                      />
                    </label>
                  </div> */}
                      <InputField
                        style={{
                          background: "white",
                          width: "75Px",
                          marginLeft: "8px",
                          borderRadius: "0px !important",
                          height: "35px",
                        }}
                        size="small"
                        type="number"
                        id="name"
                        variant="outlined"
                        spellcheck="false"
                        onChange={handleInputChange}
                        value={inputNumber}
                      />
                    </div>
                  </div>
                )}
                {pricingType == "FP" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      <span style={{ marginLeft: "-9px" }}>
                        Milestone count:
                      </span>
                      {/* <div>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="number"
                      value={inputNumber}
                      onChange={handleInputChange}
                    />
                    <input
                      style={{
                        margin: "0px 0px 0px 8px",
                      }}
                      type="button"
                      value="Add"
                      id="create-account"
                      class="button"
                      onClick={generateGrid}
                    />
                  </label>
                </div> */}
                      <InputField
                        style={{
                          background: "white",
                          width: "75Px",
                          marginLeft: "8px",
                          borderRadius: "0px !important",
                          height: "35px",
                        }}
                        size="small"
                        type="text"
                        id="name"
                        variant="outlined"
                        spellcheck="false"
                        // onChange={(e) => {
                        //   setFormData({
                        //     ...formData,
                        //     opportunity: {
                        //       ...formData.opportunity,
                        //       projectCode: e.target.value,
                        //     },
                        //   });
                        // }}
                        // value={formData?.opportunity?.projectCode}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "0px",
                }}
              >
                <Accordion id="accordian">{gridItems}</Accordion>
              </div>

              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}
              >
                <div style={{ display: "flex", flexBasis: "100%", gap: "5px" }}>
                  <div style={{ display: "flex", flexBasis: "25%" }}>
                    <div style={{ width: "75px" }}>
                      <span>Remarks :</span>
                    </div>
                    <input style={{ width: "730px", borderRadius: "0px" }} />
                  </div>
                </div>

                <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                width:"100%",
              }}
            >
              <ModalControlButton
                type="button"
                value="Continue"
                id="create-account"
                variant="contained"
                onClick={() => {
                  setPricingType(pricingType);
                  setTabIndex({
                    
                    index: 0,
                    formData:"",
                  });
                }}
              >
                Back
              </ModalControlButton>
              <ModalControlButton
                type="button"
                value="Continue"
                id="create-account"
                variant="contained"
                onClick={OnSubmit}
              >
                Save
              </ModalControlButton>
              <ModalControlButton
                type="button"
                variant="contained"
                onClick={() => {
                  // props.setGridItems([]);
                  setIsOpenSecondLevelEdit(false);
                  // props.setTabIndex({
                  //   index: 0,
                  //   formData: "",
                  // });
                }}
                value="Cancel"
                id="create-account"
              >
                Cancel
              </ModalControlButton>
            </div>

            
              </div>
          </>
        )}

      </form>

          </ModalDetailSection>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    probabilityData: state.probabilityData,
    regionData: state.regionData,
    workOrderData: state.workOrderData,
    bdmData: state.bdmData,
    accountData: state.accountData,
    opportunityData: state.opportunityData,
    financialYear: state.financialYear,
    currencyData: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProbabilityData: () => dispatch(getProbabilityData()),
    getRegionData: () => dispatch(getRegionData()),
    getWorkOrderYearData: () => dispatch(getWorkOrderYearData()),
    getBdmData: () => dispatch(getBdmData()),
    getAccountData: () => dispatch(getAccountData()),
    getOpportunityData: () => dispatch(getOpportunityData()),
    getCurrencyData: () => dispatch(getCurrencyData()),
  };
};

export const ConnectedTrForRevenueOpportunity = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrForRevenue);

// export const MemoizedTrForRevenueOpportunity = React.memo(
//   TrForRevenue,
//   (prevProps, nextProps) => {
//     if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
//       return true;
//     return false;
//   }
// );

export const MemoizedTrForRevenueOpportunity = React.memo(
  ConnectedTrForRevenueOpportunity,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data)) {
      return true;
    }
    return false;
  }
);
