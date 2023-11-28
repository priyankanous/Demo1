import React, { useState, useEffect } from "react";
import axios from "axios";
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
  ModalCancelButton,
  ModalBackButton,
  MoadalStyle,
  revenueModalStyleObject,
} from "../../../utils/constantsValue";
import CloseIcon from "@mui/icons-material/Close";

import { connect } from "react-redux";
import { getProbabilityData } from "../../../actions/probability";
import { getRegionData } from "../../../actions/region";
import { getWorkOrderYearData } from "../../../actions/workOrder";
import { getBdmData } from "../../../actions/bdm";
import { getAccountData } from "../../../actions/account";
import { getOpportunityData } from "../../../actions/opportunity";
import { getCurrencyData } from "../../../actions/currency";
import { getFinancialYearData } from "../../../actions/financial-year";

import Select from "react-select";
import {
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  MenuItem,
  Checkbox,
  Radio,
  Modal,
  styled,
} from "@mui/material";
import RevenueResourceAccordian from "./RevenueResourceAccordian";
import RevenueMilestoneAccordian from "./RevenueMilestoneAccordian";
import { Accordion } from "react-accessible-accordion";
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const Label = styled('span')({
  fontFamily: "Roboto",
  color: "#000000",
  fontSize: "14px",
});

const ResourceEntryForm = (props) => {
  useEffect(() => {
    props.getProbabilityData();
    props.getRegionData();
    props.getWorkOrderYearData();
    props.getBdmData();
    props.getAccountData();
    props.getOpportunityData();
    props.getCurrencyData();
  }, []);
  const [currencyData, setCurrencyData] = useState();
  const array = [];
  const [inputNumber, setInputNumber] = useState("");
  const [gridItems, setGridItems] = useState([]);
  const [resourceData, setResourceData] = useState([]);
  const [milestoneData, setMilestoneData] = useState([]);
  const [pricingType, setPricingType] = useState("T&M");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    account: { accountId: "", accountName: "" },
    opportunity: {
      opportunityID: "",
      opportunityName: "",
      projectCode: "",
      projectStartDate: "",
      projectEndDate: "",
    },
    bdm: { bdmID: "", bdmName: "" },
    currency: { currencyID: "", currencyName: "", currencyDisplayNAme:"" },
    probability: { probabilityID: "", probabilityTypeName: "" },
    region: { regionID: "", regionName: "" },
    workOrder: { workOrderID: "", workOrderEndDate: "", workOrderStatus: "" },
    financialYear: {
      financialYearId: "",
      financialYearName: "",
    },
    pricingType: pricingType,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  console.log("milestonedata", milestoneData)
  const onOptionChange = (e) => {
    setPricingType(e.target.value);
  };

  useEffect(() => {
    if (props?.dataObj && Object.keys(props?.dataObj)?.length) {
      const accountObj = props?.accountData?.accountData?.filter(
        (each) => each?.accountName === props?.dataObj?.account?.accountName
      );
      const bdmObj = props?.bdmData?.bdmData?.filter(
        (each) => each?.bdmName === props?.dataObj?.bdm?.bdmName
      );
      const regionObj = props?.regionData?.regionData?.filter(
        (each) => each?.regionDisplayName === props?.dataObj?.region?.regionName
      );
      const probabilityObj = props?.probabilityData?.probabilityData?.filter(
        (each) =>
          each?.probabilityTypeName ===
          props?.dataObj?.probability?.probabilityTypeName
      );
      const modifiedObj = {
        ...formData,
      };
      if (accountObj?.length) {
        modifiedObj["account"]["accountId"] = accountObj[0]?.accountId;
        modifiedObj["account"]["accountName"] = accountObj[0]?.accountName;
      }
      if (bdmObj?.length) {
        modifiedObj["bdm"]["bdmID"] = bdmObj[0]?.bdmId;
        modifiedObj["bdm"]["bdmName"] = bdmObj[0]?.bdmName;
      }
      if (regionObj?.length) {
        modifiedObj["region"]["regionID"] = regionObj[0]?.regionId;
        modifiedObj["region"]["regionName"] = regionObj[0]?.regionDisplayName;
      }
      if (probabilityObj?.length) {
        modifiedObj["probability"]["probabilityID"] =
          probabilityObj[0]?.probabilityTypeId;
        modifiedObj["probability"]["probabilityTypeName"] =
          probabilityObj[0]?.probabilityTypeName;
      }
      setFormData(modifiedObj);
      setIsDisabled(true);
    }
  }, [props]);

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

  const formatDateFirstEntry = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSave = () => {
    if (pricingType === "T&M") {
      const payload = {
        account: {
          accountId: formData.account.accountId,
        },
        opportunity: {
          opportunityId: formData.opportunity.opportunityID,
          opportunityName: formData.opportunity.opportunityName,
        },
        projectCode: formData.opportunity.projectCode,
        projectStartDate: formData.opportunity.projectStartDate,
        projectEndDate: formData.opportunity.projectEndDate,

        businessDevelopmentManager: {
          bdmId: formData.bdm.bdmID,
        },
        currency: {
          currencyId: formData.currency.currencyID,
        },
        probabilityType: {
          probabilityTypeId: formData.probability.probabilityID,
        },
        region: {
          regionId: formData.region.regionID,
        },
        workOrder: {
          workOrderId: formData.workOrder.workOrderID,
        },
        workOrderEndDate: formData.workOrder.workOrderEndDate,
        workOrderStatus: formData.workOrder.workOrderStatus,

        financialYear: {
          financialYearId:
            props?.financialYear?.financialYear[0]?.financialYearId,
        },
        resourceCount: resourceData.length,
        pricingType: pricingType,
        remarks: "TM Details",
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
          resourceStartDate: formatDateFirstEntry(ele.startDate),
          resourceEndDate: formatDateFirstEntry(ele.endDate),
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
        .post(
          "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/TandM",
          payload
        )
        .then((res) => {
          props.setIsOpen(false);
        })
        .catch((err) => {
          props.setIsOpen(false);
        });
    } else if (pricingType === "FP") {

      const payload2 = {
        account: {
          accountId: formData.account.accountId,
        },
        opportunity: {
          opportunityId: formData.opportunity.opportunityID,
        },
        projectCode: formData.opportunity.projectCode,
        projectStartDate: formData.opportunity.projectStartDate,
        projectEndDate: formData.opportunity.projectEndDate,
        businessDevelopmentManager: {
          bdmId: formData.bdm.bdmID,
        },
        currency: {
          currencyId: formData.currency.currencyID,
        },
        probabilityType: {
          probabilityTypeId: formData.probability.probabilityID,
        },
        region: {
          regionId: formData.region.regionID,
        },
        workOrder: {
          workOrderId: formData.workOrder.workOrderID,
        },
        workOrderEndDate: formData.workOrder.workOrderEndDate,
        workOrderStatus: formData.workOrder.workOrderStatus,
        financialYear: {
          financialYearId:
            props?.financialYear?.financialYear[0]?.financialYearId,
        },
        milestoneCount: milestoneData.length,
        pricingType: pricingType,
        remarks: "No",
        status: "Submitted",

        milestones: milestoneData?.map((ele) => ({
          milestoneNumber: ele?.milestoneNumber,
          milestoneBillingDate: ele?.milestoneBillingDate,
          milestoneRevenue: ele?.milestoneRevenue,
          milestoneResourceCount: ele?.milestoneResourceCount,
          revenueResourceEntries: ele?.revenueResourceEntries?.map(
            (revenueEntry) => {
              return {
                strategicBusinessUnit: {
                  sbuId: revenueEntry?.strategicBusinessUnit?.sbuId,
                },
                strategicBusinessUnitHead: {
                  sbuHeadId: revenueEntry?.strategicBusinessUnitHead?.sbuHeadId,
                },
                businessUnit: {
                  businessUnitId: revenueEntry?.businessUnit?.businessUnitId,
                },
                businessType: {
                  businessTypeId: revenueEntry?.businessType?.businessTypeId,
                },
                location: {
                  locationId: revenueEntry?.location?.locationId,
                },
                resourceName: revenueEntry?.resourceName,
                employeeId: revenueEntry?.employeeId,
                resourceStartDate: revenueEntry?.resourceStartDate,
                resourceEndDate: revenueEntry?.resourceEndDate,
                cocPractice: {
                  cocPracticeId: revenueEntry?.cocPratice.cocPracticeId
                },
                allocation: revenueEntry?.allocation,
                milestoneResourceRevenue: revenueEntry?.milestoneResourceRevenue,
              };
            }
          ),
        })),
      };
      axios
        .post(
          "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/fixed-price",
          payload2
        )
        .then((res) => {
          props.setIsOpen(false);
        })
        .catch((err) => {
          props.setIsOpen(true);
        });
    }
  };

  const resetData = () => {
    // setIsOpen(false);
    // getAllRegionData();
    // setOpportunityId(null);
    // setOpportunityName(null);
    // setProjectCode(null);
    // setAccountName(null);
    // setProjectStartDate(null);
    // setProjectEndDate(null)
  };

  const handleNextClick = () => {
    if (
      !formData.account.accountName ||
      !formData?.opportunity?.opportunityName ||
      !formData?.bdm?.bdmName ||
      !formData?.currency?.currencyName ||
      !formData?.probability?.probabilityTypeName ||
      !formData?.region?.regionName
    ) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
      setPricingType(pricingType);
      props.setTabIndex({
        // ...props.tabIndex,
        index: 1,
        formData: formData,
      });
    }
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
      setInputNumber(inputValue);
      generateGrid(inputValue);
    }
  };

  const updateMilestoneData = (data, index) => {
    setMilestoneData(data);
  };

  const updateResourceData = (data, index) => {
    setResourceData(data);
  };

  const generateGrid = (value) => {
    const items = [];
    const iterator = value >= 0 ? value : inputNumber;
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
            formData={props.tabIndex.formData}
            myFormData={formData}
            pricingType={pricingType}
            resourceData={tempResourceDetails}
            updateResourceData={setResourceData}
            selectedFyIdToGetLocation={selectedFyIdToGetLocation}
            currencyId={formData.currency.currencyDisplayNAme}
          />
        );
      }
    } else {
      const tempMilestoneDetails = [];
      for (let i = 0; i < iterator; i++) {
        const milestoneDataRow = {
          index: i,
          revenueResourceEntries: [],
        };
        tempMilestoneDetails.push(milestoneDataRow);
      }
      setMilestoneData(tempMilestoneDetails);
      for (let i = 0; i < iterator; i++) {
        items.push(
          <RevenueMilestoneAccordian
            id={i}
            formData={props.tabIndex.formData}
            myFormData={formData}
            pricingType={pricingType}
            milestoneData={tempMilestoneDetails}
            updateMilestoneData={setMilestoneData}
            selectedFyIdToGetLocation={selectedFyIdToGetLocation}
          />
        );
      }
    }
    setGridItems(items);
  };

  const saveResourceDetails = () => {
    props.saveResourceData({
      resourceData: props.resourceData,
      formData: props.tabIndex.formData,
    });
  };
  // const saveEntireMilestoneDetails = () => {
  //   props.saveMileStones(props.milestoneDataNew);
  //   props.saveMilestoneData({
  //     allMilestones: props.milestoneDataNew,
  //     formData: props.tabIndex.formData,
  //   });
  // };

  const saveData = () => {
    if (pricingType == "T&M") {
      saveResourceDetails();
      props.setIsOpen(false);
    } else {
      // saveEntireMilestoneDetails();
      props.setIsOpen(false);
    }
  };

  const selectedFyIdToGetLocation = formData.financialYear.financialYearName;

  const getWorkOrderValue = () => {
    const iterable =
      Array.isArray(props?.workOrderData?.workOrderData) &&
      props?.workOrderData?.workOrderData?.length
        ? props?.workOrderData?.workOrderData?.map((workOrderData, index) => ({
            value: workOrderData?.workOrderId,
            label: workOrderData?.workOrderNumber,
            workOrderEndDate: workOrderData?.workOrderEndDate,
            workOrderStatus: workOrderData?.workOrderStatus,
          }))
        : [{ label: "TBD", value: 0 }];

    return iterable?.filter(
      ({ label, value }) => value === formData?.workOrder?.workOrderID
    );
  };

  return (
    <ModalDetailSection style={{ borderRadius: "0px", padding:"12px 10px 12px 46px" }}>
      <form
        id="reg-form"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          width: "100%",
          paddingRight:"10px"
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
                <label for="username" style={{fontFamily:"roboto", fontSize:"16px", fontWeight:"400"}}>Pricing Type</label>
                <input
                  type="radio"
                  value="T&M"
                  name="Pricing Type"
                  checked={pricingType === "T&M"}
                  onChange={onOptionChange}
                  style={{ boxShadow: "none", fontFamily:"Roboto", fontSize:"16px", fontWeight:"400" }}
                />
                T & M
                <input
                  type="radio"
                  value="FP"
                  name="Pricing Type"
                  checked={pricingType === "FP"}
                  onChange={onOptionChange}
                  style={{ boxShadow: "none", fontFamily:"Roboto",fontSize:"16px", fontWeight:"400" }}
                />
                FP
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily:"Roboto",

              }}
            >
              <div
                style={{
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                  fontFamily:"Roboto",

                }}
              >
                <span style={{ color: "red" }}>*</span>
                <span style={{ marginLeft: "-9px", fontSize:"14px",fontWeight:"400" }}>FY :</span>
                <div style={{ width: "150px", fontFamily:"Roboto", }}>
                  <InputField
                    style={{
                      background: "white",
                      width: "103Px",
                      marginLeft: "3px",
                      borderRadius: "0px !important",
                      height: "35px",
                      fontFamily:"Roboto !important",
                    }}
                    size="small"
                    type="text"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        financialYear: {
                          ...formData.financialYear,
                          financialYearName: e.target.value,
                        },
                      });
                    }}
                    value={
                      props?.financialYear?.financialYear[0]?.financialYearName
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {props?.tabIndex?.index === 0 ? (
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
                    <Label>Account</Label>
                  </div>
                  <div>
                    <Select
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          background: "white",
                          width: "187px",
                          marginLeft: "8px",
                          borderRadius: "4px",
                          height: "35px",
                          border:
                            isSubmitted && !formData?.account?.accountName
                              ? "1px solid red"
                              : "",
                        }),
                      }}
                      options={props?.accountData?.accountData?.map(
                        (accountData, index) => ({
                          value: accountData?.accountId,
                          label: accountData?.accountName,
                        })
                      )}
                      onChange={(selectedOption) => {
                        setFormData({
                          ...formData,
                          account: {
                            ...formData.account,
                            accountId: selectedOption.value,
                            accountName: selectedOption.label,
                          },
                        });
                      }}
                      value={{
                        value: formData.account.accountId,
                        label: formData.account.accountName,
                      }}
                      isDisabled={isDisabled ? true : false}
                    />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <span style={{ color: "red" }}>*</span>
                  <Label>Opportunity Name</Label>
                  <Tooltip title="Add Opportunity" placement="top">
            {/* <Button> */}
            <a
                        href="/administration/opportunity"
                        style={{
                          display: "inline-block",
                          textDecoration: "none",
                          color: "#000000",
                          fontWeight: "400",
                          fontSize: "12px",
                        }}
                      >
                                     <AddIcon style={{fontWeight:"400", fontSize:"20px", fontWeight:"700",marginTop:"-7px"}}/>
                      </a>
            {/* </Button> */}
          </Tooltip>
                  <div>
                    {/* <FormControl>
                      <select
                        size="small"
                        style={{
                          background: "white",
                          width: "187Px",
                          marginLeft: "8px",
                          borderRadius: "0px",
                          height: "35px",
                          border:
                            isSubmitted &&
                            !formData?.opportunity?.opportunityName
                              ? "1px solid red"
                              : "",
                        }}
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
                          setFormData({
                            ...formData,
                            opportunity: {
                              ...formData.opportunity,
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
                          Select
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
                    </FormControl> */}
                    <Select
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          background: "white",
                          width: "187px",
                          marginLeft: "8px",
                          borderRadius: "4px",
                          height: "35px",
                          border:
                            isSubmitted &&
                            !formData?.opportunity?.opportunityName
                              ? "1px solid red"
                              : "",
                        }),
                      }}
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

                        setFormData({
                          ...formData,
                          opportunity: {
                            ...formData.opportunity,
                            opportunityID: selectedOption.value,
                            opportunityName: selectedOption.label,
                            projectCode: found?.projectCode || "", // Set the auto-populated value or an empty string if not found
                            projectStartDate: found?.projectStartDate || "", // Set the auto-populated value or an empty string if not found
                            projectEndDate: found?.projectEndDate || "", // Set the auto-populated value or an empty string if not found
                          },
                        });
                      }}
                      value={{
                        value: formData.opportunity.opportunityID,
                        label: formData.opportunity.opportunityName,
                      }}
                    />

                    {/* <div>
                      <a
                        href="/administration/opportunity"
                        style={{
                          display: "inline-block",
                          textDecoration: "none",
                          color: "#1E4482",
                          fontWeight: "500",
                          fontSize: "16px",
                          padding: "5px 10px",
                        }}
                      >
                        Add Opportunity
                      </a>
                    </div> */}
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>BDM</Label>
                  </div>
                  <div style={{ width: "187px" }}>
                    <Select
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          background: "white",
                          width: "187px",
                          marginLeft: "8px",
                          borderRadius: "4px",
                          height: "35px",
                          border:
                            isSubmitted && !formData?.bdm?.bdmName
                              ? "1px solid red"
                              : "",
                        }),
                      }}
                      options={props?.bdmData?.bdmData?.map(
                        (bdmData, index) => ({
                          value: bdmData?.bdmId,
                          label: bdmData?.bdmName,
                        })
                      )}
                      onChange={(selectedOption) => {
                        setFormData({
                          ...formData,
                          bdm: {
                            ...formData.bdm,
                            bdmID: selectedOption.value,
                            bdmName: selectedOption.label,
                          },
                        });
                      }}
                      value={{
                        value: formData.bdm.bdmID,
                        label: formData.bdm.bdmName,
                      }}
                      isDisabled={isDisabled ? true : false}
                    />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>Project Code</Label>
                  </div>
                  <div style={{ width: "187px" }}>
                    <InputField
                      style={{
                        background: "white",
                        width: "187Px",
                        marginLeft: "8px",
                        borderRadius: "0px !important",
                        height: "35px",
                        fontFamily:"Roboto",
                      }}
                      size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                      spellcheck="false"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          opportunity: {
                            ...formData.opportunity,
                            projectCode: e.target.value,
                          },
                        });
                      }}
                      value={formData?.opportunity?.projectCode}
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
                    <Label>Project Start Date</Label>
                  </div>
                  <div style={{ width: "187px" }}>
                    <InputField
                      style={{
                        background: "white",
                        width: "187Px",
                        marginLeft: "8px",
                        borderRadius: "0px !important",
                        height: "35px",
                      }}
                      size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                      spellcheck="false"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          opportunity: {
                            ...formData.opportunity,
                            projectStartDate: e.target.value,
                          },
                        });
                      }}
                      value={formData?.opportunity?.projectStartDate}
                    />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>Project End date</Label>
                  </div>
                  <div style={{ width: "187px" }}>
                    <InputField
                      style={{
                        background: "white",
                        width: "187Px",
                        marginLeft: "8px",
                        borderRadius: "0px !important",
                        height: "35px",
                      }}
                      size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                      spellcheck="false"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          opportunity: {
                            ...formData.opportunity,
                            projectEndDate: e.target.value,
                          },
                        });
                      }}
                      value={formData?.opportunity?.projectEndDate}
                    />
                  </div>
                </div>

                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>Currency(As per WO)</Label>
                  </div>
                  <Select
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        background: "white",
                        width: "187px",
                        marginLeft: "8px",
                        borderRadius: "4px",
                        height: "35px",
                        border:
                          isSubmitted && !formData?.currency?.currencyName
                            ? "1px solid red"
                            : "",
                      }),
                    }}
                    options={props?.currencyData?.currencyData?.map(
                      (currencyData, index) => ({
                        value: currencyData?.currencyId,
                        label: currencyData?.currencyName,
                        currencyLabel: currencyData?.currency,
                      })
                    )}
                    onChange={(selectedOption) => {
                      setFormData({
                        ...formData,
                        currency: {
                          ...formData.currency,
                          currencyID: selectedOption.value,
                          currencyName: selectedOption.label,
                          currencyDisplayNAme: selectedOption.currencyLabel,
                        },
                      });
                    }}
                    value={{
                      value: formData.currency.currencyID,
                      label: formData.currency.currencyName,
                    }}
                  />
                </div>

                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>Probablity</Label>
                  </div>

                  <Select
                    isSearchable
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        background: "white",
                        width: "187px",
                        marginLeft: "8px",
                        borderRadius: "4px",
                        height: "35px",
                        border:
                          isSubmitted &&
                          !formData?.probability?.probabilityTypeName
                            ? "1px solid red"
                            : "",
                      }),
                    }}
                    options={props?.probabilityData?.probabilityData?.map(
                      (probabilityData, index) => ({
                        value: probabilityData?.probabilityTypeId,
                        label: probabilityData?.probabilityTypeName,
                      })
                    )}
                    onChange={(selectedOption) => {
                      setFormData({
                        ...formData,
                        probability: {
                          ...formData.probability,
                          probabilityID: selectedOption.value,
                          probabilityTypeName: selectedOption.label,
                        },
                      });
                    }}
                    value={{
                      value: formData.probability.probabilityID,
                      label: formData.probability.probabilityTypeName,
                    }}
                    isDisabled={isDisabled ? true : false}
                  />
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
                    <Label>Region</Label>
                  </div>

                  <Select
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        background: "white",
                        width: "187px",
                        marginLeft: "8px",
                        borderRadius: "4px",
                        height: "35px",
                        border:
                          isSubmitted && !formData?.region?.regionName
                            ? "1px solid red"
                            : "",
                      }),
                    }}
                    options={props?.regionData?.regionData?.map(
                      (regionData, index) => ({
                        value: regionData?.regionId,
                        label: regionData?.regionDisplayName,
                      })
                    )}
                    onChange={(selectedOption) => {
                      setFormData({
                        ...formData,
                        region: {
                          ...formData.region,
                          regionID: selectedOption.value,
                          regionName: selectedOption.label,
                        },
                      });
                    }}
                    isDisabled={isDisabled ? true : false}
                    value={props?.regionData?.regionData
                      ?.map((regionData, index) => ({
                        value: regionData?.regionId,
                        label: regionData?.regionDisplayName,
                      }))
                      ?.filter(
                        ({ label, value }) =>
                          label === formData.region.regionName
                      )}
                    placeholder=""
                  />
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>Work Order</Label>
                  </div>
                  {/* <FormControl>
                    <select
                      size="small"
                      style={{
                        background: "white",
                        width: "187Px",
                        marginLeft: "8px",
                        borderRadius: "0px",
                        height: "35px",
                        border:
                          isSubmitted && !formData?.workOrder?.workOrderID
                            ? "1px solid red"
                            : "",
                      }}
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

                        setFormData({
                          ...formData,
                          workOrder: {
                            ...formData.workOrder,
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
                    >
                      <option value="" disabled selected hidden>
                        Select
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
                  </FormControl> */}
                  <Select
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        background: "white",
                        width: "187px",
                        marginLeft: "8px",
                        borderRadius: "4px",
                        height: "35px",
                        border:
                          isSubmitted && !formData?.workOrder?.workOrderID
                            ? "1px solid red"
                            : "",
                      }),
                    }}
                    placeholder=""
                    options={
                      Array.isArray(props?.workOrderData?.workOrderData) &&
                      props?.workOrderData?.workOrderData?.length
                        ? props?.workOrderData?.workOrderData?.map(
                            (workOrderData, index) => ({
                              value: workOrderData.workOrderId,
                              label: workOrderData.workOrderNumber,
                              workOrderEndDate: workOrderData.workOrderEndDate,
                              workOrderStatus: workOrderData.workOrderStatus,
                            })
                          )
                        : [{ label: "TBD", value: 0 }]
                    }
                    onChange={(selectedOption) => {
                      const selectedWorkOrderId = selectedOption.value;
                      const foundOption =
                        props?.workOrderData?.workOrderData?.find(
                          (each) =>
                            each?.workOrderId === Number(selectedWorkOrderId)
                        );

                      if (foundOption) {
                        const { workOrderEndDate, workOrderStatus } =
                          foundOption;
                        setFormData((prevData) => ({
                          ...prevData,
                          workOrder: {
                            ...prevData?.workOrder,
                            workOrderID: selectedWorkOrderId,
                            workOrderStatus: workOrderStatus,
                            workOrderEndDate: workOrderEndDate,
                          },
                        }));
                      } else {
                        setFormData((prevData) => ({
                          ...prevData,
                          workOrder: {
                            ...prevData.workOrder,
                            workOrderID: 0,
                            workOrderStatus: "TBD",
                            workOrderEndDate: "31/Dec/2023",
                          },
                        }));
                      }
                    }}
                    value={getWorkOrderValue()}
                  />
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>Work Order End Date</Label>
                  </div>

                  <div style={{ width: "195px" }}>
                    <InputField
                      style={{
                        background: "white",
                        width: "187Px",
                        marginLeft: "8px",
                        borderRadius: "0px !important",
                        height: "35px",
                      }}
                      size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                      spellcheck="false"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          workOrder: {
                            ...formData.workOrder,
                            workOrderEndDate: e.target.value,
                          },
                        });
                      }}
                      value={formData.workOrder.workOrderEndDate}
                    />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <Label>Work Order Status</Label>
                  </div>

                  <div style={{ width: "187px" }}>
                    <InputField
                      style={{
                        background: "white",
                        width: "187Px",
                        marginLeft: "8px",
                        borderRadius: "0px !important",
                        height: "35px",
                      }}
                      size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                      spellcheck="false"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          workOrder: {
                            ...formData.workOrder,
                            workOrderStatus: e.target.value,
                          },
                        });
                      }}
                      value={formData.workOrder.workOrderStatus}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: "8px",
                paddingBottom:"10px",
                // marginLeft: "-20px",
                display: "flex",
                // alignItems: "center",
                width: "100%",
                justifyContent:"center",
                gap:"12px"
              }}
            >
              {/* <ButtonSection style={{marginLeft:"-25px"}}> */}

                <ModalCancelButton
                                  sx={{ marginLeft: "-50px" }}

                  type="button"
                  variant="contained"
                  onClick={() => {
                    props.setIsOpen(false);
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
                  <span style={{ marginLeft: "-9px" }}>Resource count:</span>

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
                    value={inputNumber >= 0 ? inputNumber : 0}
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
                  <span style={{ marginLeft: "-9px" }}>Milestone count:</span>

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
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                marginLeft: "0px",
                maxHeight:"250px",
                overflowY:"auto"
              }}
            >
              <Accordion id="accordian">{gridItems}</Accordion>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}>
              <div style={{ display: "flex", flexBasis: "100%", gap: "5px" }}>
                <div style={{ display: "flex", flexBasis: "25%",alignItems:"center" }}>
                  <div style={{ width: "75px" }}>
                    <span style={{fontWeight:"400", fontSize:"16px"}}>Remarks :</span>
                  </div>
                  <input style={{ width: "862px", borderRadius: "0px", fontFamily:"Roboto",fontWeight:"400", fontSize:"14px", boxShadow:"none",border:"1px solid #00000066" }} />
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
                  props.setIsOpen(false);
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
                  props.setTabIndex({
                    // ...props.tabIndex,
                    index: 0,
                    formData: formData,
                  });
                }}
              >
                Back
              </ModalBackButton>


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
          </>
        )}
      </form>
    </ModalDetailSection>
  );
};
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
    getFinacialYearData: () => dispatch(getFinancialYearData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceEntryForm);
