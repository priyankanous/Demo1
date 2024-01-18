/* eslint-disable jsx-a11y/anchor-is-valid */
/* esliresourceDatant-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { apiV1 } from "../../../utils/constantsValue";
import AddIcon from "@mui/icons-material/Add";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal, Box, FormControl, styled, Button } from "@mui/material";
import * as moment from "moment";
import {
  ModalHeadingSection,
  ModalHeadingText,
  ModalDetailSection,
  InputField,
  MoadalStyle,
  MoadalStyleRREntry,
  ButtonSection,
  ModalControlButton,
  ModalCancelButton,
  ModalBackButton,
} from "../../../utils/constantsValue";
import CloseIcon from "@mui/icons-material/Close";
import RevenueResourceAccordian from "./RevenueResourceAccordian";
import { Accordion } from "react-accessible-accordion";
import { getProbabilityData } from "../../../actions/probability";
import RevenueMilestoneAccordian from "./RevenueMilestoneAccordian";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { getRegionData } from "../../../actions/region";
import { getWorkOrderYearData } from "../../../actions/workOrder";
import { getBdmData } from "../../../actions/bdm";
import { getAccountData } from "../../../actions/account";
import { connect } from "react-redux";
import { getOpportunityData } from "../../../actions/opportunity";
import { getCurrencyData } from "../../../actions/currency";

const DownArrowSecordStage = styled("td")({
  padding: "1px 6px",
  width: "10px",
  color: "#000",
  fontWeight: 700,
  cursor: "pointer",
});

const TableCellSecondStage = styled("td")({
  padding: "1px",
});

const TableCellSecondStageSpan = styled("span")({
  fontSize: "14px",
  fontWeight: "400",
  fontFamily: "Roboto",
  cursor: "pointer",
  textAlign: "center",
});

const CopyIconSecondLEvel = styled(FileCopyOutlinedIcon)({
  fontSize: "15px",
  paddingRight: "5px",
});

const EditIconSecondLevel = styled(EditOutlinedIcon)({
  fontSize: "15px",
  paddingRight: "5px",
});

const DeleteIconSecondLevel = styled(DeleteOutlineIcon)({
  fontSize: "15px",
  paddingRight: "5px",
});

const TableThirdLevel = styled("table")({
  backgroundColor: "rgba(225, 222, 222, 0.5)",
  borderBottom: "1px solid #0000004d",
});

const ThirdLevelHeadingCell = styled("table")({
  padding: "2px 0px 0px 10px",
  display: "flex",
  justifyContent: "flex-start",
});

const ThirdLevelHeading = styled("th")({
  padding: "4px",
  fontFamily: "Roboto",
  fontWeight: "500",
  fontSize: "14px",
});

const ThirdLevelCopyIcon = styled(FileCopyOutlinedIcon)({
  fontSize: "15px",
  paddingRight: "5px",
});

const ThirdLevelEditIcon = styled(EditOutlinedIcon)({
  fontSize: "15px",
  paddingRight: "5px",
});

const ThirdLevelDeleteIcon = styled(DeleteOutlineIcon)({
  fontSize: "15px",
  paddingRight: "5px",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const [isExpandedInnerRow, setIsExpandedInnerRow] = useState(false);
  const [resourceTableData, setResourceTableData] = useState([]);
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
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(null);
  const [isDropdown, setDropdown] = useState(false);
  const [isResourceDropdown, setIsResourceDropdown] = useState(false);
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [resourceDropdownStates, setResourceDropdownStates] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  //edit modal code
  const [isOpen, setIsOpen] = useState(false);
  const [pricingType, setPricingType] = useState(props.data.pricingType);
  const [resourceData, setResourceData] = useState([]);
  const [milestoneData, setMilestoneData] = useState([]);

  console.log("revenueEntry114", milestoneData)

  const [gridItems, setGridItems] = useState([]);
  //2nd level edit
  const [isOpenSecondLevelEdit, setIsOpenSecondLevelEdit] = useState(false);
  const [isOpenThirdLevelEdit, setIsOpenThirdLevelEdit] = useState(false);
  const [oppId, setOppId] = useState();
  const [oppDataByOppId, setOppDataByOppId] = useState([]);


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

  const Fpcolumn3 = [
    "Start Date",
    "End Date",
    "WO No",
    "Milestone Number",
    "Resource Name",
    "Coc-Practice",
    "Milestone Billing Date",
    "Allocation % ",
    "Milestone Revenue",
    "",
  ];

  const initialResourceCount = oppDataByOppId?.tmRevenueEntryVO?.resourceCount;
  const initialMileStoneCount = oppDataByOppId?.fpRevenueEntryVO?.milestoneCount;

  const [inputNumber, setInputNumber] = useState(initialResourceCount);
  const [inputNumberMileStone, setInputNumberMileStone] = useState(initialMileStoneCount);
  console.log("initialMileStoneCount", initialMileStoneCount)

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const [tabIndex, setTabIndex] = useState({ index: 0, formData: "" });
  const array = [];
  const [currencyData, setCurrencyData] = useState();
  const [isTMSubmit, setIsTMSubmit] = useState(false)
  const [isFPSubmit, setIsFPSubmit] = useState(false)
  const [formUpdateData, setFormUpdateData] = useState({
    account: { accountId: null, accountName: "" },
    opportunity: {
      opportunityID: "",
      opportunityName: "",
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

  //3rd level add
  const [expandedOppId, setExpandedOppId] = useState("");
  const [expandedOppData, setExpandedOppData] = useState([]);

  //To expand the table row
  const handleInnerRowExpansion = (cell) => {
    if (cell.innerHTML == "↓") {
      cell.innerHTML = "↑";
      setIsExpandedInnerRow(true);
    } else {
      cell.innerHTML = "↓";
      setIsExpandedInnerRow(false);
    }
  };

  const handleRowExpansionAll = () => {
    setIsExpandedInnerRow((prevState) => !prevState);
  };

  console.log("resourceTableData", resourceTableData);

  const revenueResource = async (e) => {
    try {
      const response = await axios.post(`${apiV1}/revenue-entry/resources`, e);
      // response.data.data.opportunities.map((obj, id) => {
      //   return setOpportunityData(obj);
      // });
      console.log("response.data.data", response.data.data);
      if (e.pricingType == "T&M") {
        setResourceTableData(response.data.data.tmResourceEntries);
      } else {
        setResourceTableData(response.data.data.fpResourceEntries);
      }
    } catch { }
  };

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
        console.log("DELETE request successful:", res);
      })
      .catch((error) => {
        console.error("Error making DELETE request:", error);
      });
  };

  useEffect(() => {
    setResourceDropdownStates(Array(resourceTableData.length).fill(false));
  }, [resourceTableData]);

  const toggleResourceDropdown = (id) => {
    const newStates = [...resourceDropdownStates];
    newStates[id] = !newStates[id];
    setResourceDropdownStates(newStates);
  };

  const onOptionChange = (e) => {
    setPricingType(e.target.value);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setTabIndex({ index: 0, formData: "" });

    // setSelectedFile(null);
  };

  const getDataByOppId = (oppId) => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/getbyid/${oppId}`
      )
      .then((responseData) => {
        setOppDataByOppId(responseData.data.data);
      });
  };

  useEffect(() => {
    if (oppId) {
      getDataByOppId(oppId);
    }
  }, [oppId]);

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
      setIsTMSubmit(false)
      setIsFPSubmit(false)
      setInputNumber(inputValue);
      generateGrid(inputValue);
    }
  };

  const updateResourceData = (data, index) => {
    setResourceData(data);
  };

  useEffect(() => {
    if (pricingType == "T&M") {
      console.log("Hello T&M", resourceData)
      const items = [];
      const iterator = inputNumber >= 0 ? inputNumber : 0;
      const tempResourceDetails = [...resourceData];
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
            setInputNumber={setInputNumber}
            inputNumber={inputNumber}
            initialResourceCount={initialResourceCount}
            generateGrid={generateGrid}
            getDataByOppId={getDataByOppId}
            currencyID={formUpdateData.currency.currencyID}
            currencyLabelResourceLevel={currencyLabelResourceLevel}
            isTMSaved={isTMSubmit}
          />
        );
      }
      setGridItems(items);
    }
  }, [isTMSubmit, resourceData])

  const generateGrid = (value) => {
    console.log("inputNumber", inputNumber, value);
    const items = [];
    // const iterator = value ? value : inputNumber;
    const iterator = value;
    if (pricingType == "T&M") {
      const tempResourceDetails = [];
      for (let i = 0; i < iterator; i++) {
        const resourceDataRow = {
          index: i,
          sbuId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.strategicBusinessUnit?.sbuId,
          sbuHeadId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.strategicBusinessUnitHead?.sbuHeadId,
          businessUnitId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.businessUnit?.businessUnitId,
          locationId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.location?.locationId,
          resouceName:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.resourceName,
          employeeId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.employeeId,
          startDate:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.resourceStartDate,
          endDate:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.resourceStartDate,
          businessTypeId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.businessType.businessTypeId,
          cocPracticeId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.cocPractice.cocPracticeId,
          billingRateType:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.billingRateType,
          billingRate:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.billingRate,
          leaveLossFactor:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.leaveLossFactor,
          allocation:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[i]
              ?.allocation,
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
            setInputNumber={setInputNumber}
            inputNumber={inputNumber}
            initialResourceCount={initialResourceCount}
            generateGrid={generateGrid}
            getDataByOppId={getDataByOppId}
            currencyID={formUpdateData.currency.currencyID}
            currencyLabelResourceLevel={currencyLabelResourceLevel}
            isTMSubmit={isTMSubmit}
          />
        );
      }
    } else {
      const tempMilestoneDetails = [];
      for (let i = 0; i < iterator; i++) {
        console.log("datdata", tempMilestoneDetails)
        const milestoneDataRow = {
          index: i,
          milestoneEntryId: oppDataByOppId?.fpRevenueEntryVO?.milestones[i]
            ?.milestoneEntryId,
          milestoneNumber: oppDataByOppId?.fpRevenueEntryVO?.milestones[i]
            ?.milestoneNumber,
          milestoneBillingDate: oppDataByOppId?.fpRevenueEntryVO?.milestones[i]
            ?.milestoneBillingDate,
          milestoneResourceCount: oppDataByOppId?.fpRevenueEntryVO?.milestones[i]
            ?.milestoneResourceCount,
          milestoneRevenue: oppDataByOppId?.fpRevenueEntryVO?.milestones[i]
            ?.milestoneRevenue,
          revenueResourceEntries: oppDataByOppId?.fpRevenueEntryVO?.milestones[i]?.revenueResourceEntries.map((zzz, i) => (
            console.log("revenueEntry113", zzz.revenueResourceEntryId),
            {
              revenueResourceEntryId: oppDataByOppId?.fpRevenueEntryVO?.milestones[i]?.revenueResourceEntries[i]?.revenueResourceEntryId,
              allocation: zzz.allocation,
              milestoneResourceRevenue: zzz.milestoneResourceRevenue,
              employeeId: zzz.employeeId,
              resourceName: zzz.resourceName,
              businessTypeId: zzz.businessType.businessTypeId,
              location: zzz.location?.locationId,
              resourceStartDate: zzz.resourceStartDate,
              resourceEndDate: zzz.resourceEndDate,
              cocPracticeId: zzz.cocPractice.cocPracticeId,
              sbuId: zzz.strategicBusinessUnit?.sbuId,
              sbuHeadId: zzz.strategicBusinessUnitHead?.sbuHeadId,
              businessUnitId: zzz.businessUnit?.businessUnitId,

            }
          ))
        };
        tempMilestoneDetails.push(milestoneDataRow);
      }
      console.log(tempMilestoneDetails, 'tempMilestoneDetails')
      setMilestoneData(tempMilestoneDetails);
      for (let i = 0; i < iterator; i++) {
        items.push(
          <RevenueMilestoneAccordian
            id={i}
            // formData={props.tabIndex.formData}
            // myFormData={formData}
            pricingType={pricingType}
            milestoneData={tempMilestoneDetails}
            updateMilestoneData={setMilestoneData}
            oppId={oppId}
            //issue here
            selectedFyIdToGetLocation={selectedFyIdToGetLocation}
            inputNumberMileStone={inputNumberMileStone}
            isFPSubmit={isFPSubmit}
          // oppDataByOppId={oppDataByOppId}
          //done issue
          // setInputNumber={setInputNumber}
          // inputNumber={inputNumber}

          />
        );
      }
    }
    setGridItems(items);
  };

  useEffect(() => {
    if (pricingType == "FP") {
      const items = [];
      const iterator = inputNumber >= 0 ?
        inputNumber
        :
        initialMileStoneCount >= 0 ?
          initialMileStoneCount
          :
          0;
      const tempMilestoneDetails = [...milestoneData];
      for (let i = 0; i < iterator; i++) {
        items.push(
          <RevenueMilestoneAccordian
            id={i}
            pricingType={pricingType}
            milestoneData={tempMilestoneDetails}
            updateMilestoneData={setMilestoneData}
            oppId={oppId}
            selectedFyIdToGetLocation={selectedFyIdToGetLocation}
            inputNumberMileStone={inputNumberMileStone}
            isSaved={isFPSubmit}
          />
        )
      }
      setGridItems(items)
    }
  }, [isFPSubmit, milestoneData])

  const handleNextClick = () => {
    console.log("milestoneData", milestoneData)
    setPricingType(pricingType);
    setTabIndex({
      index: 1,
      formData: "",
    });
  };

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorSnackbar(false);
  };

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

  const opportunityNameByOppId =
    oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName || "";

  const formatDateA = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  // const payload = {
  //   account: {
  //     accountId: formUpdateData.account.accountId,
  //   },
  //   opportunity: {
  //     opportunityId: formUpdateData.opportunity.opportunityID,
  //     opportunityName: formUpdateData.opportunity.opportunityName,
  //   },
  //   projectCode: formUpdateData.opportunity.projectCode,
  //   projectStartDate: formUpdateData.opportunity.projectStartDate,
  //   projectEndDate: formUpdateData.opportunity.projectEndDate,

  //   businessDevelopmentManager: {
  //     bdmId: formUpdateData.bdm.bdmID,
  //   },
  //   currency: {
  //     currencyId: formUpdateData.currency.currencyID,
  //   },
  //   probabilityType: {
  //     probabilityTypeId: formUpdateData.probability.probabilityID,
  //   },
  //   region: {
  //     regionId: formUpdateData.region.regionID,
  //   },
  //   workOrder: {
  //     workOrderId: formUpdateData.workOrder.workOrderID,
  //   },
  //   workOrderEndDate: formUpdateData.workOrder.workOrderEndDate,
  //   workOrderStatus: formUpdateData.workOrder.workOrderStatus,

  //   financialYear: {
  //     financialYearId: formUpdateData.financialYear.financialYearId,
  //   },
  //   // resourceCount: resourceData.length,
  //   resourceCount: inputNumber,
  //   pricingType: pricingType,
  //   remarks: "TM Details adding",
  //   status: "Submitted",
  //   tmRevenueEntryId: oppDataByOppId?.tmRevenueEntryVO?.tmRevenueEntryId,
  //   revenueResourceEntries: resourceData.map((ele, index) => ({
  //     revenueResourceEntryId:
  //       oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[index]
  //         ?.revenueResourceEntryId,
  //     strategicBusinessUnit: {
  //       sbuId: ele.sbuId,
  //     },
  //     strategicBusinessUnitHead: {
  //       sbuHeadId: ele.sbuHeadId,
  //     },
  //     businessUnit: {
  //       businessUnitId: ele.businessUnitId,
  //     },
  //     businessType: {
  //       businessTypeId: ele.businessTypeId,
  //     },
  //     location: {
  //       locationId: ele.locationId,
  //     },
  //     resourceName: ele.resouceName,
  //     employeeId: ele.employeeId,
  //     resourceStartDate: formatDateA(ele.startDate),
  //     resourceEndDate: formatDateA(ele.endDate),
  //     cocPractice: {
  //       cocPracticeId: ele.cocPracticeId,
  //     },
  //     leaveLossFactor: ele.leaveLossFactor,
  //     billingRateType: ele.billingRateType,
  //     billingRate: ele.billingRate,
  //     allocation: ele.allocation,
  //   })),
  // };

  const OnSubmit = () => {
    console.log(milestoneData, 'abcd')
    if (pricingType === "T&M") {
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
        tmRevenueEntryId: oppDataByOppId?.tmRevenueEntryVO?.tmRevenueEntryId,
        revenueResourceEntries: resourceData.map((ele, index) => ({
          revenueResourceEntryId:
            oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[index]
              ?.revenueResourceEntryId,
          strategicBusinessUnit: {
            sbuId: ele.sbuId,
          },
          strategicBusinessUnitHead: {
            sbuHeadId: ele.sbuHeadId,
          },
          businessUnit: {
            businessUnitId: ele.businessUnitId,
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
      axios
        .put(
          `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/TandM/${oppId}`,
          payload
        )
        .then((response) => {
          const actualDataObject = response.data.data;
          setIsOpenSecondLevelEdit(false);
          setIsOpenThirdLevelEdit(false);
          console.log("editSave", actualDataObject);
        });
    } else if (pricingType === "FP") {
      console.log("oppDataByOppId.fpRevenueEntryVO.milestones", oppDataByOppId.fpRevenueEntryVO.milestones)
      const payloadForFPEditFirstLevel = {
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
        milestoneCount: initialMileStoneCount,
        pricingType: pricingType,
        remarks: "No",
        status: "Submitted",
        milestones: milestoneData?.map((ele, index) => (
          console.log("revenueEntry111", ele),
          {
            milestoneEntryId: ele.milestoneEntryId,
            milestoneNumber: ele?.milestoneNumber,
            milestoneBillingDate: ele?.milestoneBillingDate,
            milestoneRevenue: ele?.milestoneRevenue,
            milestoneResourceCount: ele?.milestoneResourceCount,
            revenueResourceEntries: ele?.revenueResourceEntries?.map(
              (revenueEntry) => {
                console.log("revenueEntry112---->", revenueEntry)
                return {
                  //     revenueResourceEntryId:
                  // oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[index]
                  //   ?.revenueResourceEntryId,
                  revenueResourceEntryId: revenueEntry?.revenueResourceEntryId,
                  strategicBusinessUnit: {
                    sbuId: revenueEntry?.sbuId,
                  },
                  strategicBusinessUnitHead: {
                    sbuHeadId: revenueEntry?.sbuHeadId,
                  },
                  businessUnit: {
                    businessUnitId: revenueEntry?.businessUnitId,
                  },
                  businessType: {
                    businessTypeId: revenueEntry?.businessTypeId,
                  },
                  location: {
                    locationId: revenueEntry?.locationId,
                  },
                  resourceName: revenueEntry?.resourceName,
                  employeeId: revenueEntry?.employeeId,
                  resourceStartDate: revenueEntry?.resourceStartDate,
                  resourceEndDate: revenueEntry?.resourceEndDate,
                  cocPractice: {
                    cocPracticeId: revenueEntry?.cocPracticeId,
                  },
                  allocation: revenueEntry?.allocation,
                  milestoneResourceRevenue:
                    revenueEntry?.milestoneResourceRevenue,
                };
              }
            ),
          })),
      };
      axios
        .put(
          `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/fixed-price/${oppId}`,
          payloadForFPEditFirstLevel
        )
        .then((response) => {
          const actualDataObject = response.data.data;
          setIsOpenSecondLevelEdit(false);
          setIsOpenThirdLevelEdit(false);
          console.log("editSave", actualDataObject);
        });
    }
  }
  console.log("formUpdateData", formUpdateData);

  // const OnSubmit = () => {
  //   axios
  //     .put(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/TandM/${oppId}`,
  //       payload
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       setIsOpenSecondLevelEdit(false);
  //       setIsOpenThirdLevelEdit(false);
  //       console.log("editSave", actualDataObject);
  //     });
  // };

  const initialOpportunityId = oppDataByOppId.tmRevenueEntryVO;
  const selectedFyIdToGetLocation =
    formUpdateData.financialYear.financialYearName;

  useEffect(() => {
    const initialAccountID =
      oppDataByOppId?.tmRevenueEntryVO?.account?.accountId || oppDataByOppId?.fpRevenueEntryVO?.account?.accountId;
    const initialOpportunityId =
      oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityId || oppDataByOppId.fpRevenueEntryVO?.opportunity?.opportunityId;
    const initialOpportunityName =
      oppDataByOppId.tmRevenueEntryVO?.opportunity?.opportunityName || oppDataByOppId.fpRevenueEntryVO?.opportunity?.opportunityName;

    const initialProjectCode = oppDataByOppId.tmRevenueEntryVO?.projectCode || oppDataByOppId.fpRevenueEntryVO?.projectCode;

    const initialProjectStartDate =
      oppDataByOppId.tmRevenueEntryVO?.projectStartDate || oppDataByOppId.fpRevenueEntryVO?.projectStartDate;

    const initialProjectEndDate =
      oppDataByOppId.tmRevenueEntryVO?.projectEndDate || oppDataByOppId.fpRevenueEntryVO?.projectEndDate;

    const initialCurrencyId =
      oppDataByOppId?.tmRevenueEntryVO?.currency?.currencyId || oppDataByOppId?.fpRevenueEntryVO?.currency?.currencyId;
    const initialBdm =
      oppDataByOppId?.tmRevenueEntryVO?.businessDevelopmentManager?.bdmId || oppDataByOppId?.fpRevenueEntryVO?.businessDevelopmentManager?.bdmId;
    const initialProbability =
      oppDataByOppId?.tmRevenueEntryVO?.probabilityType?.probabilityTypeId || oppDataByOppId?.fpRevenueEntryVO?.probabilityType?.probabilityTypeId;
    const initialRegion = oppDataByOppId?.tmRevenueEntryVO?.region?.regionId || oppDataByOppId?.fpRevenueEntryVO?.region?.regionId;
    const initialFinancialYearId =
      oppDataByOppId?.tmRevenueEntryVO?.financialYear?.financialYearId || oppDataByOppId?.fpRevenueEntryVO?.financialYear?.financialYearId;
    const initialFinancialYearName =
      oppDataByOppId?.tmRevenueEntryVO?.financialYear?.financialYearName || oppDataByOppId?.fpRevenueEntryVO?.financialYear?.financialYearName;
    const initialWorkOrderId =
      oppDataByOppId?.tmRevenueEntryVO?.workOrder?.workOrderId || oppDataByOppId?.fpRevenueEntryVO?.workOrder?.workOrderId;

    const initialWorkOrderEndDate =
      oppDataByOppId?.tmRevenueEntryVO?.workOrder?.workOrderEndDate || oppDataByOppId?.fpRevenueEntryVO?.workOrder?.workOrderEndDate;

    const initialWorkOrderStatus =
      oppDataByOppId?.tmRevenueEntryVO?.workOrder?.workOrderStatus || oppDataByOppId?.fpRevenueEntryVO?.workOrder?.workOrderStatus;

    if (initialAccountID !== undefined && initialAccountID !== null) {
      setFormUpdateData((prevState) => ({
        ...prevState,
        account: {
          ...prevState.account,
          accountId: initialAccountID,
        },
      }));
    }

    if (initialOpportunityId !== undefined && initialOpportunityId !== null) {
      setFormUpdateData((prevState) => ({
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
      setFormUpdateData((prevState) => ({
        ...prevState,
        currency: {
          ...prevState.currency,
          currencyID: initialCurrencyId,
        },
      }));
    }

    if (initialBdm !== undefined && initialBdm !== null) {
      setFormUpdateData((prevState) => ({
        ...prevState,
        bdm: {
          ...prevState.bdm,
          bdmID: initialBdm,
        },
      }));
    }

    if (initialProbability !== undefined && initialProbability !== null) {
      setFormUpdateData((prevState) => ({
        ...prevState,
        probability: {
          ...prevState.probability,
          probabilityID: initialProbability,
        },
      }));
    }

    if (initialRegion !== undefined && initialRegion !== null) {
      setFormUpdateData((prevState) => ({
        ...prevState,
        region: {
          ...prevState.region,
          regionID: initialRegion,
        },
      }));
    }

    if (
      initialFinancialYearId !== undefined &&
      initialFinancialYearId !== null
    ) {
      setFormUpdateData((prevState) => ({
        ...prevState,
        financialYear: {
          ...prevState.financialYear,
          financialYearId: initialFinancialYearId,
          financialYearName: initialFinancialYearName,
        },
      }));
    }

    if (initialWorkOrderId !== undefined && initialWorkOrderId !== null) {
      setFormUpdateData((prevState) => ({
        ...prevState,
        workOrder: {
          ...prevState.workOrder,
          workOrderID: initialWorkOrderId,
          workOrderEndDate: initialWorkOrderEndDate,
          workOrderStatus: initialWorkOrderStatus,
        },
      }));
    }

    // const initialResourceCount = oppDataByOppId?.tmRevenueEntryVO?.resourceCount;
    if (initialResourceCount !== undefined && initialResourceCount !== null) {
      setInputNumber(initialResourceCount);
      console.log("line 654");
      generateGrid(initialResourceCount);
    }

    if (initialMileStoneCount !== undefined && initialMileStoneCount !== null) {
      setInputNumberMileStone(initialMileStoneCount);
      console.log("line 654");
      generateGrid(initialMileStoneCount);
    }

    console.log("initialCOunt", initialResourceCount);
  }, [oppDataByOppId]);

  const getDataByExpandedOppId = (expandedOppId) => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/getbyid/${expandedOppId}`
      )
      .then((responseData) => {
        console.log("rescccc", responseData.data.data);
        setExpandedOppData(responseData.data.data);
      });
  };

  useEffect(() => {
    if (expandedOppId) {
      getDataByExpandedOppId(expandedOppId);
    }
  }, [expandedOppId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const currencyLabelResourceLevel =
    expandedOppData?.tmRevenueEntryVO?.currency?.currency;

  const resourcePayload = {
    account: {
      accountId: expandedOppData?.tmRevenueEntryVO?.account?.accountId,
    },
    opportunity: {
      opportunityId:
        expandedOppData?.tmRevenueEntryVO?.opportunity?.opportunityId,
      opportunityName:
        expandedOppData?.tmRevenueEntryVO?.opportunity?.opportunityName,
    },
    projectCode: expandedOppData?.tmRevenueEntryVO?.opportunity?.projectCode,
    projectStartDate:
      expandedOppData?.tmRevenueEntryVO?.opportunity?.projectStartDate,
    projectEndDate:
      expandedOppData?.tmRevenueEntryVO?.opportunity?.projectEndDate,

    businessDevelopmentManager: {
      bdmId:
        expandedOppData?.tmRevenueEntryVO?.businessDevelopmentManager?.bdmId,
    },
    currency: {
      currencyId: expandedOppData?.tmRevenueEntryVO?.currency?.currencyId,
    },
    probabilityType: {
      probabilityTypeId:
        expandedOppData?.tmRevenueEntryVO?.probabilityType?.probabilityTypeId,
    },
    region: {
      regionId: expandedOppData?.tmRevenueEntryVO?.region?.regionId,
    },
    workOrder: {
      workOrderId: expandedOppData?.tmRevenueEntryVO?.workOrder?.workOrderId,
    },
    workOrderEndDate:
      expandedOppData?.tmRevenueEntryVO?.workOrder?.workOrderEndDate,
    workOrderStatus:
      expandedOppData?.tmRevenueEntryVO?.workOrder?.workOrderStatus,

    financialYear: {
      financialYearId:
        expandedOppData?.tmRevenueEntryVO?.financialYear?.financialYearId,
    },
    // resourceCount: resourceData.length,
    resourceCount: inputNumber,
    pricingType: pricingType,
    remarks: "TM Details adding",
    status: "Submitted",
    revenueResourceEntries: resourceData?.map((ele) => ({
      strategicBusinessUnit: {
        sbuId: ele.sbuId,
      },
      strategicBusinessUnitHead: {
        sbuHeadId: ele.sbuHeadId,
      },
      businessUnit: {
        businessUnitId: ele.businessUnitId,
      },
      businessType: {
        businessTypeId: ele.businessTypeId,
      },
      location: {
        locationId: ele.locationId,
      },
      resourceName: ele.resouceName,
      employeeId: ele.employeeId,
      resourceStartDate: formatDate(ele.startDate),
      resourceEndDate: formatDate(ele.endDate),
      cocPractice: {
        cocPracticeId: ele.cocPracticeId,
      },
      leaveLossFactor: ele.leaveLossFactor,
      billingRateType: ele.billingRateType,
      billingRate: ele.billingRate,
      allocation: ele.allocation,
    })),
  };

  const milestonePayload = {
    account: {
      accountId: expandedOppData?.fpRevenueEntryVO?.account?.accountId,
    },
    opportunity: {
      opportunityId:
        expandedOppData?.fpRevenueEntryVO?.opportunity?.opportunityId,
    },
    projectCode: expandedOppData?.fpRevenueEntryVO?.projectCode,
    projectStartDate: expandedOppData?.fpRevenueEntryVO?.projectStartDate,
    projectEndDate: expandedOppData?.fpRevenueEntryVO?.projectEndDate,
    businessDevelopmentManager: {
      bdmId:
        expandedOppData?.fpRevenueEntryVO?.businessDevelopmentManager?.bdmId,
    },
    currency: {
      currencyId: expandedOppData?.fpRevenueEntryVO?.currency?.currencyId,
    },
    probabilityType: {
      probabilityTypeId:
        expandedOppData?.fpRevenueEntryVO?.probabilityType?.probabilityTypeId,
    },
    region: {
      regionId: expandedOppData?.fpRevenueEntryVO?.region?.regionId,
    },
    workOrder: {
      workOrderId: expandedOppData?.fpRevenueEntryVO?.workOrder?.workOrderId,
    },
    workOrderEndDate: expandedOppData?.fpRevenueEntryVO?.workOrderEndDate,
    workOrderStatus: expandedOppData?.fpRevenueEntryVO?.workOrderStatus,
    financialYear: {
      financialYearId:
        expandedOppData?.fpRevenueEntryVO?.financialYear?.financialYearId,
    },
    milestoneCount: expandedOppData?.fpRevenueEntryVO?.milestoneCount,
    pricingType: expandedOppData?.fpRevenueEntryVO?.pricingType,
    remarks: "No",
    status: expandedOppData?.fpRevenueEntryVO?.status,

    milestones: milestoneData?.map((ele) => ({
      milestoneNumber: ele?.milestoneNumber,
      milestoneBillingDate: ele?.milestoneBillingDate,
      milestoneRevenue: ele?.milestoneRevenue,
      milestoneResourceCount: ele?.milestoneResourceCount,
      revenueResourceEntries: ele?.revenueResourceEntries?.map(
        (revenueEntry) => {
          console.log("revenueResourceEntries", revenueEntry);
          return {
            strategicBusinessUnit: {
              sbuId: revenueEntry?.sbuId,
            },
            strategicBusinessUnitHead: {
              sbuHeadId: revenueEntry?.sbuHeadId,
            },
            businessUnit: {
              businessUnitId: revenueEntry?.businessUnitId,
            },
            businessType: {
              businessTypeId: revenueEntry?.businessTypeId,
            },
            location: {
              locationId: revenueEntry?.locationId,
            },
            resourceName: revenueEntry?.resourceName,
            employeeId: revenueEntry?.employeeId,
            resourceStartDate: revenueEntry?.resourceStartDate,
            resourceEndDate: revenueEntry?.resourceEndDate,
            cocPractice: {
              cocPracticeId: revenueEntry?.cocPracticeId,
            },
            allocation: revenueEntry?.allocation,
            milestoneResourceRevenue: revenueEntry?.milestoneResourceRevenue,
          };
        }
      ),
    })),
  };
  const calculateTotalRevenue = (revenueResourceEntries) => {
    let total = 0;
    revenueResourceEntries.forEach((data) => {
      total += Number(data.milestoneResourceRevenue);
    });
    return total;
  };


  const handleSave = () => {
    if (pricingType === "T&M") {
      const isTMError = resourceData?.filter((each) => !each.sbuName ||
        !each.locationName ||
        !each.resouceName ||
        !each.employeeId ||
        !each.startDate ||
        !each.endDate ||
        !each.businessTypeName ||
        !each.cocPracticeName ||
        !each.billingRateType ||
        !each.billingRate ||
        !each.leaveLossFactor ||
        !each?.allocation
      )
      if (isTMError?.length > 0) {
        setIsTMSubmit(true)
      } else {
        setIsTMSubmit(false)
        axios
          .post(
            "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/TandM",
            resourcePayload
          )
          .then((res) => {
            setIsClicked(false);
          })
          .catch((err) => {
            setIsClicked(false);
          });
      }
    } else if (pricingType === "FP") {
      const isError = milestoneData?.filter((each) => !each?.milestoneBillingDate ||
        !each?.milestoneRevenue ||
        !each?.milestoneResourceCount ||
        each?.revenueResourceEntries?.filter((ele) =>
          !ele?.sbuName ||
          !ele?.locationName ||
          !ele?.resourceName ||
          !ele?.resourceStartDate ||
          !ele?.resourceEndDate ||
          !ele?.cocPraticeName ||
          !ele?.employeeId ||
          !ele?.businessTypeName ||
          !ele?.allocation ||
          !ele?.milestoneResourceRevenue)?.length > 0
      )
      if (isError?.length > 0) {
        setIsFPSubmit(true);
        console.log('isError?.length', isError)
      } else {
        setIsFPSubmit(false);
        const filtered = milestoneData.filter((ele) => {
          const calculatedTotalRevenue = calculateTotalRevenue(
            ele.revenueResourceEntries
          );
          if (calculatedTotalRevenue !== Number(ele.milestoneRevenue)) {
            return true;
          } else {
            return false;
          }
        })

        if (filtered.length > 0) {
          console.log("filtered", filtered.length)

          setOpenErrorSnackbar(true);
        } else {
          axios
            .post(
              "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/fixed-price",
              milestonePayload
            )
            .then((res) => {
              setIsClicked(false);
            })
            .catch((err) => {
              setIsClicked(false);
            });
        }
      }
    }
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
        }}
        // onClick={() => handleRowClick(props.data.opportunityId)}
        onClick={(e) => {
          revenueResource(resourseEntryData);
          handleRowExpansionAll();
          setExpandedOppId(props.data.opportunityId);
        }}
      >
        <DownArrowSecordStage
          className="rowtable"
          onClick={(e) => {
            revenueResource(resourseEntryData);
            // handleInnerRowExpansion(e.target);
            setExpandedOppId(props.data.opportunityId);
          }}
        >
          {isExpandedInnerRow ? "↑" : "↓"}
        </DownArrowSecordStage>
        <TableCellSecondStage className="rowtable" style={{ width: "98px" }}>
          <div
            style={{
              width: "100px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <TableCellSecondStageSpan>
              {props.data.opportunityId || "Unknown"}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <TableCellSecondStage className="rowtable" style={{ width: "103px" }}>
          <div
            style={{
              width: "103px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <TableCellSecondStageSpan>
              {props.data.projectCode || "Unknown"}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <TableCellSecondStage className="rowtable" style={{ width: "112px" }}>
          <div
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "112px",
            }}
          >
            <TableCellSecondStageSpan>
              {props.data.opportunityName || "Unknown"}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <TableCellSecondStage className="rowtable" style={{ width: "103px" }}>
          <div
            style={{
              width: "103px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <TableCellSecondStageSpan>
              {props.data.pricingType || "Unknown"}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <TableCellSecondStage className="rowtable" style={{ width: "103px" }}>
          <div
            style={{
              width: "103px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <TableCellSecondStageSpan>
              {moment(props.data.projectStartDate, "YYYY-MM-DD").format(
                "DD/MMM/YYYY"
              )}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <TableCellSecondStage className="rowtable" style={{ width: "103px" }}>
          <div
            style={{
              width: "103px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <TableCellSecondStageSpan>
              {moment(props.data.projectEndDate, "YYYY-MM-DD").format(
                "DD/MMM/YYYY"
              )}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <TableCellSecondStage className="rowtable" style={{ width: "108px" }}>
          <div
            style={{
              width: "108px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <TableCellSecondStageSpan>
              {props.data.noOfResources || "0"}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <TableCellSecondStage className="rowtable" style={{ width: "103px" }}>
          <div
            style={{
              width: "103px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <TableCellSecondStageSpan>
              {props.data.leaveLossFactor || ""}
            </TableCellSecondStageSpan>
          </div>
        </TableCellSecondStage>

        <td
          className="rowtable"
          style={{ border: "none", display: "flex", justifyContent: "center" }}
        >
          <span style={{ float: "right", cursor: "pointer" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                handleRowClick(props.data.opportunityId);
                setOppId(props.data.opportunityId);
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div
                style={{
                  right: "20px",
                  position: "absolute",
                  overflow: "hidden",
                  boxShadow: "5px 5px 10px rgb(0 0 0 / 45%)",
                  backgroundColor: "#F2FBFF",
                  marginRight: "10px",
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
                  <CopyIconSecondLEvel />
                  copy
                </a>
                <a
                  style={{ padding: "5px", margin: "3px 0px" }}
                  onClick={() => {
                    setIsOpenSecondLevelEdit(true);
                  }}
                >
                  <EditIconSecondLevel />
                  Edit
                </a>
                <a
                  style={{ padding: "5px 0px 5px 10px", margin: "3px 0px" }}
                  onClick={() => DeleteRecord()}
                >
                  <DeleteIconSecondLevel />
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
            <TableThirdLevel>
              <tr
                className="trrevenue"
                style={{ backgroundColor: "rgba(225, 222, 222, 0)" }}
              >
                <ThirdLevelHeadingCell className="iconsColumn">
                  <a
                    onClick={() => {
                      setIsClicked(true);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </a>
                </ThirdLevelHeadingCell>
              </tr>
              <tr className="nestedtablebgrevenue">
                {resourseEntryData?.pricingType === "T&M"
                  ? column3.map((header) => (
                    <ThirdLevelHeading className="threvenue" key={header}>
                      {header}
                    </ThirdLevelHeading>
                  ))
                  : Fpcolumn3.map((header) => (
                    <ThirdLevelHeading className="threvenue" key={header}
                      style={{ width: "70px" }}
                    >
                      <div
                        style={{
                          width: "70px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {header}
                      </div>
                    </ThirdLevelHeading>
                  ))}
              </tr>
              <tbody>
                {resourceTableData.length > 0 &&
                  resourceTableData.map((obj, id) => {
                    const pricingType = resourseEntryData?.pricingType;
                    return (
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
                        }}
                      >
                        <td className="rowtable" style={{ width: "90px" }}>
                          <div
                            style={{
                              width: "90px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {obj.resourceStartDate
                                ? moment(
                                  obj.resourceStartDate,
                                  "YYYY-MM-DD"
                                ).format("DD/MMM/YYYY")
                                : ""}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "90px" }}
                        >
                          <div
                            style={{
                              width: "90px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {obj.resourceEndDate
                                ? moment(
                                  obj.resourceEndDate,
                                  "YYYY-MM-DD"
                                ).format("DD/MMM/YYYY")
                                : ""}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "90px" }}
                        >
                          <div
                            style={{
                              width: "90px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {obj.workOrderNumber || ""}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "90px" }}
                        >
                          <div
                            style={{
                              width: "90px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {pricingType === "T&M"
                                ? obj.employeeId
                                : obj.milestoneNumber}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "105px" }}
                        >
                          <div
                            style={{
                              width: "105px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {obj.resourceName || ""}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "92px" }}
                        >
                          <div
                            style={{
                              width: "92px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {obj.cocPractice || ""}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "90px" }}
                        >
                          <div
                            style={{
                              width: "90px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {pricingType === "T&M"
                                ? obj.billingRate
                                : obj.milestoneBillingDate}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "90px" }}
                        >
                          <div
                            style={{
                              width: "90px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span>{obj.allocation || ""}</span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{ padding: "1px", width: "90px" }}
                        >
                          <div
                            style={{
                              width: "90px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>
                              {pricingType === "T&M"
                                ? obj.leaveLossFactor
                                : obj.revenue}
                            </span>
                          </div>
                        </td>
                        <td
                          className="rowtable"
                          style={{
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            margin: "1px",
                          }}
                        >
                          <span style={{ float: "right", cursor: "pointer" }}>
                            <AiIcons.AiOutlineMore
                              onClick={(e) => {
                                toggleResourceDropdown(id);
                                handleResourceEmployeeID(obj.employeeId);
                                handleResourceStartDate(obj.resourceStartDate);
                                setOppId(props.data.opportunityId);
                              }}
                            ></AiIcons.AiOutlineMore>
                            {resourceDropdownStates[id] && (
                              <div
                                style={{
                                  right: "20px",
                                  position: "absolute",
                                  overflow: "hidden",
                                  boxShadow: "5px 5px 10px rgb(0 0 0 / 45%)",
                                  backgroundColor: "#F2FBFF",
                                  marginRight: "10px",
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
                                  <ThirdLevelCopyIcon />
                                  copy
                                </a>
                                <a
                                  style={{ padding: "5px", margin: "3px 0px" }}
                                  onClick={() => {
                                    setIsOpenThirdLevelEdit(true);
                                  }}
                                >
                                  <ThirdLevelEditIcon />
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
                                  <ThirdLevelDeleteIcon />
                                  Delete
                                </a>
                              </div>
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </TableThirdLevel>
          </td>
        </tr>
      )}
      <Modal open={isClicked} onClose={handleModalClose}>
        <Box
          sx={MoadalStyleRREntry}
          style={{
            width: "80%",
            height: "max-content",
            borderRadius: "0px",
          }}
        >
          <ModalHeadingSection
            style={{ backgroundColor: "#ebebeb", borderRadius: "0Px" }}
          >
            <ModalHeadingText
              style={{
                fontFamily: "Roboto",
                fontWeight: "400",
                paddingLeft: "30px",
              }}
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
          <ModalDetailSection
            style={{ borderRadius: "0px", padding: "12px 10px 12px 46px" }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                width: "100%",
                paddingRight: "10px",
                maxHeight: "470px",
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
                    margin: "10px 0px 0px 0px",
                  }}
                >
                  <div>
                    <div>
                      <label
                        for="username"
                        style={{
                          fontFamily: "roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        Pricing Type
                      </label>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                      <input
                        type="radio"
                        value="T&M"
                        name="Pricing Type"
                        checked={pricingType === "T&M"}
                        onChange={onOptionChange}
                        style={{
                          boxShadow: "none",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                          marginLeft: "0px",
                        }}
                      />
                      T & M
                      <input
                        type="radio"
                        value="FP"
                        name="Pricing Type"
                        checked={pricingType === "FP"}
                        onChange={onOptionChange}
                        style={{
                          boxShadow: "none",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      />
                      FP
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Roboto",
                      // marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        // display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <span style={{ color: "red" }}>*</span>
                      <span
                        style={{
                          marginLeft: "4px",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        FY :
                      </span>
                      <div style={{ width: "150px", fontFamily: "Roboto" }}>
                        <InputField
                          style={{
                            background: "white",
                            width: "138Px",
                            marginLeft: "3px",
                            borderRadius: "0px !important",
                            height: "35px",
                            fontFamily: "Roboto",
                          }}
                          size="small"
                          type="text"
                          id="name"
                          variant="outlined"
                          spellcheck="false"
                          onChange={(e) => {
                            setExpandedOppData({
                              ...expandedOppData,
                              financialYear: {
                                ...expandedOppData.financialYear,
                                financialYearName: e.target.value,
                              },
                            });
                          }}
                          value={
                            props?.financialYear?.financialYear[0]
                              ?.financialYearName
                          }
                        />
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
                        // display: "flex",
                        marginLeft: "-11px",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <div style={{ margin: "0px 0px 4px 4px" }}>
                        <span style={{ color: "red" }}>*</span>
                        <span>Resource count:</span>
                        <div></div>
                        <InputField
                          style={{
                            background: "white",
                            width: "75Px",
                            marginLeft: "12px",
                            borderRadius: "0px !important",
                            height: "35px",
                          }}
                          size="small"
                          type="number"
                          id="name"
                          variant="outlined"
                          spellcheck="false"
                          onChange={handleInputChange}
                          value={inputNumber >= 0 ? inputNumber : 0}
                        />
                      </div>
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
                        // display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                        marginLeft: "-10px",
                      }}
                    >
                      <div style={{ margin: "0px 0px 4px 4px" }}>
                        <span style={{ color: "red" }}>*</span>
                        <span>Milestone count:</span>
                      </div>
                      <div>
                        <InputField
                          style={{
                            background: "white",
                            width: "75Px",
                            marginLeft: "12px",
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
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  // width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginLeft: "-4px",
                  maxHeight: "250px",
                  overflowY: "auto",
                }}
              >
                <Accordion id="accordian">{gridItems}</Accordion>
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}
              >
                <div style={{ display: "flex", flexBasis: "100%", gap: "5px" }}>
                  <div
                    style={{
                      flexBasis: "25%",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "75px" }}>
                      <span style={{ fontWeight: "400", fontSize: "16px" }}>
                        Remarks :
                      </span>
                    </div>
                    <div style={{ paddingTop: "5px" }}>
                      <input
                        style={{
                          width: "935px",
                          borderRadius: "0px",
                          fontFamily: "Roboto",
                          fontWeight: "400",
                          fontSize: "14px",
                          boxShadow: "none",
                          border: "1px solid #00000066",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <ModalCancelButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    // props.setGridItems([]);
                    setIsClicked(false);
                    // props.setTabIndex({
                    //   index: 0,
                    //   formData: "",
                    // });
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalCancelButton>
                <ModalControlButton
                  type="button"
                  value="Continue"
                  id="create-account"
                  variant="contained"
                  onClick={handleSave}
                >
                  Save
                </ModalControlButton>
              </div>
              <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={5000} // 5 seconds
                onClose={handleCloseErrorSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                style={{
                  marginTop: "50px",
                  width: "300px",
                  padding: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                <Alert
                  onClose={handleCloseErrorSnackbar}
                  severity="error"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "14px",
                    border: "1px solid black",
                    borderRadius: "0px !important",
                    boxShadow: "none"
                  }}
                >
                  Error: Milestone Revenue and Resource Revenue Entry doesn't
                  match
                </Alert>
              </Snackbar>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>

      <Modal open={isOpenSecondLevelEdit} onClose={handleModalClose}>
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
              style={{
                fontFamily: "Roboto",
                fontWeight: "400",
                paddingLeft: "30px",
              }}
            >
              Edit Entry
            </ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpenSecondLevelEdit(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection
            style={{ borderRadius: "0px", padding: "12px 10px 12px 46px" }}
          >
            <form
              id="reg-form"
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                width: "100%",
                paddingRight: "10px",
                maxHeight: "470px",
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
                    margin: "10px 0px 0px 0px",
                  }}
                >
                  <div>
                    <div>
                      <label
                        for="username"
                        style={{
                          fontFamily: "roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        Pricing Type
                      </label>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                      <input
                        type="radio"
                        value="T&M"
                        name="Pricing Type"
                        checked={pricingType === "T&M"}
                        // onChange={onOptionChange}
                        style={{
                          boxShadow: "none",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      />
                      T & M
                      <input
                        type="radio"
                        value="FP"
                        name="Pricing Type"
                        checked={pricingType === "FP"}
                        // onChange={onOptionChange}
                        style={{
                          boxShadow: "none",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      />
                      FP
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        alignItems: "center",
                        columnGap: "10px",
                        fontFamily: "Roboto",
                        // marginRight: "46px",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: "4px",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        FY :
                      </span>
                      <div style={{ width: "150px", fontFamily: "Roboto" }}>
                        <FormControl>
                          <select
                            style={{
                              background: "white",
                              width: "103Px",
                              marginLeft: "3px",
                              variant: "outlined",
                              borderRadius: "5px",
                              height: "35px",
                              fontFamily: "Roboto",
                              boxShadow: "none",
                              border: "1px solid #0000004d",
                            }}
                            onChange={(e) => {
                              getAllCurrencyForFy(e.target.value);
                              const selectedFyId =
                                e.target.selectedOptions[0].getAttribute(
                                  "data-fyId"
                                );
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
                              {oppDataByOppId.tmRevenueEntryVO &&
                                oppDataByOppId.tmRevenueEntryVO.financialYear
                                  .financialYearName || oppDataByOppId.fpRevenueEntryVO &&
                                oppDataByOppId.fpRevenueEntryVO.financialYear
                                  .financialYearName}
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
                        // gap: "100px",
                        marginBottom: "20px",
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
                          <select
                            style={{
                              background: "white",
                              width: "187px",
                              marginLeft: "8px",
                              borderRadius: "5px",
                              height: "39px",
                              boxShadow: "none",
                              border: "1px solid lightgray",
                              color: "black",
                              fontFamily: "Roboto",
                            }}
                            // value={ oppDataByOppId.tmRevenueEntryVO?.account?.accountName ||
                            //   formUpdateData.account.accountName ||
                            //   ""}
                            onChange={(e) => {
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
                              {oppDataByOppId.tmRevenueEntryVO &&
                                oppDataByOppId.tmRevenueEntryVO.account
                                  .accountName || oppDataByOppId.fpRevenueEntryVO &&
                                oppDataByOppId.fpRevenueEntryVO.account
                                  .accountName}
                            </option>
                            {console.log("datacheckprop", formUpdateData)}
                            {props.accountData &&
                              props.accountData.accountData &&
                              props.accountData.accountData.map(
                                (accountData, index) => {
                                  const accountNamedata =
                                    accountData.accountName;

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
                          <select
                            // size="small"
                            style={{
                              height: "39px",
                              background: "white",
                              marginLeft: "8px",

                              width: "187px",
                              borderRadius: "5px",
                              boxShadow: "none",
                              border: "1px solid lightgray",
                              color: "black",
                              fontFamily: "Roboto",
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
                              {
                                oppDataByOppId.tmRevenueEntryVO?.opportunity
                                  ?.opportunityName || oppDataByOppId.fpRevenueEntryVO?.opportunity
                                  ?.opportunityName
                              }
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
                          <FormControl>
                            <select
                              size="small"
                              style={{
                                background: "white",
                                width: "187Px",
                                marginLeft: "8px",
                                borderRadius: "5px",
                                boxShadow: "none",
                                border: "1px solid lightgray",
                                color: "black",
                                height: "39px",
                                fontFamily: "Roboto",
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
                                {oppDataByOppId.tmRevenueEntryVO &&
                                  oppDataByOppId.tmRevenueEntryVO
                                    .businessDevelopmentManager.bdmDisplayName ||
                                  oppDataByOppId.fpRevenueEntryVO &&
                                  oppDataByOppId.fpRevenueEntryVO
                                    .businessDevelopmentManager.bdmDisplayName
                                }
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Project Code</span>
                        </div>
                        <div style={{ width: "187px" }}>
                          <InputField
                            disabled
                            style={{
                              background: "white",
                              width: "187Px",
                              marginLeft: "8px",
                              borderRadius: "0px !important",
                              height: "35px",
                              fontFamily: "Roboto",
                            }}
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
                        // gap: "100px",
                        marginBottom: "20px",
                      }}
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Project Start Date</span>
                        </div>
                        <div style={{ width: "187px" }}>
                          <InputField
                            disabled
                            style={{
                              background: "white",
                              width: "187Px",
                              marginLeft: "8px",
                              borderRadius: "0px !important",
                              height: "35px",
                            }}
                            size="small"
                            type="text"
                            id="email"
                            spellcheck="false"
                            variant="outlined"
                            // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.projectStartDate}
                            value={
                              formUpdateData?.opportunity?.projectStartDate
                            }
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
                            disabled
                            style={{
                              background: "white",
                              width: "187Px",
                              marginLeft: "8px",
                              borderRadius: "0px !important",
                              height: "35px",
                            }}
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

                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Currency(As per WO)</span>
                        </div>
                        <select
                          style={{
                            height: "39px",
                            width: "187px",
                            marginLeft: "8px",

                            borderRadius: "5px",
                            boxShadow: "none",
                            border: "1px solid lightgray",
                            color: "black",
                            fontFamily: "Roboto",
                          }}
                          // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.currency.currencyName}
                          onChange={(e) => {
                            const selectedFyId =
                              e.target.selectedOptions[0].getAttribute(
                                "data-fyId"
                              );
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
                            {oppDataByOppId.tmRevenueEntryVO &&
                              oppDataByOppId.tmRevenueEntryVO.currency
                                .currencyName ||
                              oppDataByOppId.fpRevenueEntryVO &&
                              oppDataByOppId.fpRevenueEntryVO.currency
                                .currencyName}
                          </option>
                          {props?.currencyData?.currencyData &&
                            props?.currencyData?.currencyData.map(
                              (currencyData, index) => {
                                const currencyNamedata =
                                  currencyData?.currencyName;
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
                            height: "39px",
                            width: "187px",
                            marginLeft: "8px",
                            borderRadius: "5px",
                            boxShadow: "none",
                            border: "1px solid lightgray",
                            color: "black",
                            fontFamily: "Roboto",
                          }}
                          // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.probabilityType.probabilityTypeName}
                          onChange={(e) => {
                            const selectedFyId =
                              e.target.selectedOptions[0].getAttribute(
                                "data-fyId"
                              );
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
                            {oppDataByOppId.tmRevenueEntryVO &&
                              oppDataByOppId.tmRevenueEntryVO.probabilityType
                                .probabilityTypeName ||
                              oppDataByOppId.fpRevenueEntryVO &&
                              oppDataByOppId.fpRevenueEntryVO.probabilityType
                                .probabilityTypeName
                            }
                          </option>
                          {props?.probabilityData?.probabilityData &&
                            props?.probabilityData?.probabilityData.map(
                              (probabilityData, index) => {
                                const probabilityNamedata =
                                  probabilityData?.probabilityTypeName;
                                return (
                                  <option
                                    data-fyId={
                                      probabilityData.probabilityTypeId
                                    }
                                    key={index}
                                  >
                                    {probabilityNamedata}
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
                        // gap: "100px",
                        marginBottom: "20px",
                      }}
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Region</span>
                        </div>
                        <select
                          style={{
                            height: "39px",
                            width: "187px",
                            marginLeft: "8px",

                            borderRadius: "5px",
                            boxShadow: "none",
                            border: "1px solid lightgray",
                            color: "black",
                            fontFamily: "Roboto",
                          }}
                          // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.region.regionDisplayName}
                          onChange={(e) => {
                            const selectedFyId =
                              e.target.selectedOptions[0].getAttribute(
                                "data-fyId"
                              );
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
                            {oppDataByOppId.tmRevenueEntryVO &&
                              oppDataByOppId.tmRevenueEntryVO.region
                                .regionDisplayName ||
                              oppDataByOppId.fpRevenueEntryVO &&
                              oppDataByOppId.fpRevenueEntryVO.region
                                .regionDisplayName}
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Work Order</span>
                        </div>
                        <select
                          style={{
                            height: "39px",
                            width: "187px",
                            marginLeft: "8px",

                            borderRadius: "5px",
                            boxShadow: "none",
                            border: "1px solid lightgray",
                            color: "black",
                            fontFamily: "Roboto",
                          }}
                          // value={oppDataByOppId.tmRevenueEntryVO && oppDataByOppId.tmRevenueEntryVO.workOrder.workOrderNumber}
                          onChange={(e) => {
                            const selectedWorkOrderId =
                              e.target.selectedOptions[0].getAttribute(
                                "data-fyId"
                              );
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
                            {oppDataByOppId?.tmRevenueEntryVO &&
                              oppDataByOppId?.tmRevenueEntryVO?.workOrder
                                .workOrderNumber ||
                              oppDataByOppId?.fpRevenueEntryVO &&
                              oppDataByOppId?.fpRevenueEntryVO?.workOrder
                                .workOrderNumber
                            }
                          </option>
                          {props?.workOrderData?.workOrderData &&
                            props?.workOrderData?.workOrderData.map(
                              (workOrderData, index) => {
                                const workOrderNamedata =
                                  workOrderData?.workOrderNumber;
                                return (
                                  <option
                                    data-fyId={String(
                                      workOrderData.workOrderId
                                    )}
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

                        <div style={{ width: "195px" }}>
                          <InputField
                            disabled
                            style={{
                              background: "white",
                              width: "187Px",
                              marginLeft: "8px",
                              borderRadius: "0px !important",
                              height: "35px",
                            }}
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
                            disabled
                            style={{
                              background: "white",
                              width: "187Px",
                              marginLeft: "8px",
                              borderRadius: "0px !important",
                              height: "35px",
                            }}
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
                      paddingTop: "8px",
                      paddingBottom: "10px",
                      // marginLeft: "-78px",
                      display: "flex",
                      // alignItems: "center",
                      width: "100%",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    {/* <ButtonSection> */}
                    <ModalCancelButton
                      sx={{ marginLeft: "-50px" }}
                      type="button"
                      variant="contained"
                      onClick={() => {
                        setIsOpenSecondLevelEdit(false);
                      }}
                      value="Cancel"
                      id="create-account"
                    >
                      Cancel
                    </ModalCancelButton>
                    <ModalControlButton
                      type="button"
                      value="Continue"
                      id="create-account"
                      variant="contained"
                      onClick={handleNextClick}
                    >
                      Next
                    </ModalControlButton>

                    {/* </ButtonSection> */}
                  </div>
                </div>
              ) : (
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
                              fontFamily: "Roboto !important",
                            }}
                            size="small"
                            type="number"
                            id="name"
                            variant="outlined"
                            spellcheck="false"
                            onChange={handleInputChange}
                            value={inputNumber}
                            disabled
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
                            value={inputNumberMileStone}
                            onChange={handleInputChange}

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
                      maxHeight: "250px",
                      overflowY: "auto",
                      marginTop: "-8px",
                    }}
                  >
                    <Accordion id="accordian">{gridItems}</Accordion>
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
                        flexWrap: "wrap",
                        gap: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexBasis: "100%",
                          gap: "5px",
                        }}
                      >
                        <div
                          style={{
                            flexBasis: "25%",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ width: "75px" }}>
                            <span
                              style={{ fontWeight: "400", fontSize: "16px" }}
                            >
                              Remarks :
                            </span>
                          </div>
                          <div style={{ paddingTop: "5px" }}>
                            <input
                              style={{
                                width: "935px",
                                borderRadius: "0px",
                                fontFamily: "Roboto",
                                fontWeight: "400",
                                fontSize: "14px",
                                boxShadow: "none",
                                border: "1px solid #00000066",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        gap: "20px",
                      }}
                    >
                      <ModalCancelButton
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
                      </ModalCancelButton>
                      <ModalBackButton
                        type="button"
                        value="Continue"
                        id="create-account"
                        variant="contained"
                        onClick={() => {
                          setPricingType(pricingType);
                          setTabIndex({
                            index: 0,
                            formData: "",
                          });
                        }}
                      >
                        Previous
                      </ModalBackButton>
                      <ModalControlButton
                        type="button"
                        value="Continue"
                        id="create-account"
                        variant="contained"
                        onClick={OnSubmit}
                      >
                        Save
                      </ModalControlButton>
                    </div>
                  </div>
                </>
              )}
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>

      <Modal open={isOpenThirdLevelEdit} onClose={handleModalClose}>
        <Box
          sx={MoadalStyleRREntry}
          style={{
            width: "80%",
            height: "max-content",
            borderRadius: "0px",
          }}
        >
          <ModalHeadingSection
            style={{ backgroundColor: "#ebebeb", borderRadius: "0Px" }}
          >
            <ModalHeadingText
              style={{
                fontFamily: "Roboto",
                fontWeight: "400",
                paddingLeft: "30px",
              }}
            >
              Edit Resource
            </ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpenThirdLevelEdit(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection
            style={{ borderRadius: "0px", padding: "12px 10px 12px 46px" }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
                width: "100%",
                paddingRight: "10px",
                maxHeight: "470px",
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
                    margin: "10px 0px 0px 0px",
                  }}
                >
                  <div>
                    <div>
                      <label
                        for="username"
                        style={{
                          fontFamily: "roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        Pricing Type
                      </label>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                      <input
                        type="radio"
                        value="T&M"
                        name="Pricing Type"
                        checked={pricingType === "T&M"}
                        // onChange={onOptionChange}
                        style={{
                          boxShadow: "none",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                          marginLeft: "0px",
                        }}
                      />
                      T & M
                      <input
                        type="radio"
                        value="FP"
                        name="Pricing Type"
                        checked={pricingType === "FP"}
                        // onChange={onOptionChange}
                        style={{
                          boxShadow: "none",
                          fontFamily: "Roboto",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      />
                      FP
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Roboto",
                      // marginRight: "25px",
                    }}
                  >
                    <div
                      style={{
                        width: "auto",
                        // display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                        fontFamily: "Roboto",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: "4px",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        FY :
                      </span>
                      <div style={{ width: "150px", fontFamily: "Roboto" }}>
                        <FormControl>
                          <select
                            style={{
                              background: "white",
                              width: "138px",
                              marginLeft: "3px",
                              variant: "outlined",
                              borderRadius: "5px",
                              height: "35px",
                              boxShadow: "none",
                              border: "1px solid #0000004d",
                            }}
                            onChange={(e) => {
                              getAllCurrencyForFy(e.target.value);
                              const selectedFyId =
                                e.target.selectedOptions[0].getAttribute(
                                  "data-fyId"
                                );
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
                            <option value="" disabled hidden>
                              {oppDataByOppId.tmRevenueEntryVO &&
                                oppDataByOppId.tmRevenueEntryVO.financialYear
                                  .financialYearName}
                            </option>

                            {props?.financialYear?.financialYear.map(
                              (fyData, index) => {
                                const fyNameData = fyData?.financialYearName;
                                const fyId = fyData.financialYearId;
                                return (
                                  <option data-fyId={fyId} key={index}>
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
                        // display: "flex",
                        alignItems: "center",
                        columnGap: "10px",
                      }}
                    >
                      <div style={{ margin: "0px 0px 4px 4px" }}>
                        <span style={{ color: "red" }}>*</span>
                        <span style={{ marginLeft: "4px" }}>
                          Resource count:
                        </span>
                      </div>
                      <div>
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
                          disabled
                        />
                      </div>
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
                        value={inputNumberMileStone}
                        onChange={handleInputChange}

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
                  maxHeight: "250px",
                  overflowY: "auto",
                }}
              >
                <Accordion id="accordian">{gridItems}</Accordion>
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}
              >
                <div style={{ display: "flex", flexBasis: "100%", gap: "5px" }}>
                  <div
                    style={{
                      // display: "flex",
                      flexBasis: "25%",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "75px" }}>
                      <span style={{ fontWeight: "400", fontSize: "16px" }}>
                        Remarks :
                      </span>
                    </div>
                    <div style={{ paddingTop: "5px" }}>
                      <input
                        style={{
                          width: "935px",
                          borderRadius: "0px",
                          fontFamily: "Roboto",
                          fontWeight: "400",
                          fontSize: "14px",
                          boxShadow: "none",
                          border: "1px solid #00000066",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <ModalCancelButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpenThirdLevelEdit(false);
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalCancelButton>
                <ModalControlButton
                  type="button"
                  value="Continue"
                  id="create-account"
                  variant="contained"
                  onClick={OnSubmit}
                >
                  Save
                </ModalControlButton>
              </div>

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

export const MemoizedTrForRevenueOpportunity = React.memo(
  ConnectedTrForRevenueOpportunity,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data)) {
      return true;
    }
    return false;
  }
);
