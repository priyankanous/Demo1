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
} from "@mui/material";
import RevenueResourceAccordian from "./RevenueResourceAccordian";
import RevenueMilestoneAccordian from "./RevenueMilestoneAccordian";
import { Accordion } from "react-accessible-accordion";

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
    currency: { currencyID: "", currencyName: "" },
    probability: { probabilityID: "", probabilityTypeName: "" },
    region: { regionID: "", regionName: "" },
    workOrder: { workOrderID: "", workOrderEndDate: "", workOrderStatus: "" },
    financialYear: {
      financialYearId: "",
      financialYearName: "",
    },
    pricingType: pricingType,
  });

  const onOptionChange = (e) => {
    setPricingType(e.target.value);
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
      workOrderId: formData.workOrder.workOrderID  ,
    },
    workOrderEndDate: formData.workOrder.workOrderEndDate,
    workOrderStatus: formData.workOrder.workOrderStatus,

    financialYear: {
      financialYearId: formData.financialYear.financialYearId,
    },
    resourceCount: resourceData.length,
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
      resourceStartDate: ele.startDate,
      resourceEndDate: ele.endDate,
      cocPractice: {
        cocPracticeId: ele.cocPracticeId,
      },
      leaveLossFactor: ele.leaveLossFactor,
      billingRateType: ele.billingRateType,
      billingRate: ele.billingRate,
      allocation: ele.allocation,
    })),
  };

  const saveTandMentry = () => {
    axios
      .post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/TandM",
        payload
      )
      .then((res) => {
        props.setIsOpen(false);
        console.log("res", res);
      })
      .catch((err) => {
        props.setIsOpen(false);
        console.log("err", err);
      });
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
      console.log("here", isSubmitted);
      setIsSubmitted(false);
      setPricingType(pricingType);
      props.setTabIndex({
        ...props.tabIndex,
        index: 1,
        y: formData,
      });
    }
  };

  const handleInputChange = (event) => {
    setInputNumber(event.target.value);
    generateGrid(event.target.value);
  };

  const updateResourceData = (data, index) => {
    setResourceData(data);
  };

  const [milestones, setMilestones] = useState([]);

  const updateMilestoneData = (data) => {
    // props.saveMileStones(props.milestoneDataNew);
  };

  const generateGrid = (value) => {
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
            formData={props.tabIndex.formData}
            // updateResourceData={updateResourceData}
            pricingType={pricingType}
            resourceData={tempResourceDetails}
            updateResourceData={setResourceData}
          />
        );
      }
    } else {
      for (let i = 0; i < inputNumber; i++) {
        items.push(
          <RevenueMilestoneAccordian
            id={i}
            formData={props.tabIndex.formData}
            pricingType={pricingType}
            updateMilestoneData={updateMilestoneData}
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

  const saveEntireMilestoneDetails = () => {
    props.saveMileStones(props.milestoneDataNew);
    props.saveMilestoneData({
      allMilestones: props.milestoneDataNew,
      formData: props.tabIndex.formData,
    });
  };

  const saveData = () => {
    if (pricingType == "T&M") {
      saveResourceDetails();
      props.setIsOpen(false);
    } else {
      saveEntireMilestoneDetails();
      props.setIsOpen(false);
    }
  };

  return (
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
                        setFormData({
                          ...formData,
                          financialYear: {
                            ...formData.financialYear,
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
                          {
                            console.log("check financial year", fyNameData);
                          }
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
                  </FormControl>
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
                    <Select
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          background: "white",
                          width: "187px",
                          marginLeft: "8px",
                          borderRadius: "0px",
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
                    />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>Opportunity Name</span>
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
                          borderRadius: "0px",
                          height: "35px",
                          border:
                            isSubmitted && !formData?.account?.accountName
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

                    <div>
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
                    </div>
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>BDM</span>
                  </div>
                  <div style={{ width: "187px" }}>
                    <Select
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          background: "white",
                          width: "187px",
                          marginLeft: "8px",
                          borderRadius: "0px",
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
                    <span>Project Code</span>
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
                            projectCode: e.target.value,
                          },
                        });
                      }}
                      value={formData?.opportunity?.projectCode}
                    />
                  </div>
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Project Start Date</span>
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
                    <span>Project End date</span>
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
                  <Select
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        background: "white",
                        width: "187px",
                        marginLeft: "8px",
                        borderRadius: "0px",
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
                      })
                    )}
                    onChange={(selectedOption) => {
                      setFormData({
                        ...formData,
                        currency: {
                          ...formData.currency,
                          currencyID: selectedOption.value,
                          currencyName: selectedOption.label,
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
                    <span>Probablity</span>
                  </div>

                  <Select
                    isSearchable
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        background: "white",
                        width: "187px",
                        marginLeft: "8px",
                        borderRadius: "0px",
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
                  />
                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Region</span>
                  </div>

                  <Select
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        background: "white",
                        width: "187px",
                        marginLeft: "8px",
                        borderRadius: "0px",
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
                        label: regionData?.regionName,
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
                    value={props?.regionData?.regionData
                      ?.map((regionData, index) => ({
                        value: regionData?.regionId,
                        label: regionData?.regionName,
                      }))
                      ?.filter(
                        ({ label, value }) => value === formData.region.regionID
                      )}
                    placeholder=""
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
                  gap: "100px",
                  marginBottom: "15px",
                }}
              >
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Work Order</span>
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
                        borderRadius: "0px",
                        height: "35px",
                        border:
                          isSubmitted && !formData?.workOrder?.workOrderID
                            ? "1px solid red"
                            : "",
                      }),
                    }}
                    placeholder=""
                    options={props?.workOrderData?.workOrderData?.map(
                      (workOrderData, index) => ({
                        value: workOrderData.workOrderId,
                        label: workOrderData.workOrderNumber || "TBD",
                        workOrderEndDate: workOrderData.workOrderEndDate,
                        workOrderStatus: workOrderData.workOrderStatus,
                      })
                    )}
                  
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
                            ...prevData.workOrder,
                            workOrderID: selectedWorkOrderId,
                            workOrderStatus: workOrderStatus,
                            workOrderEndDate: workOrderEndDate,
                          },
                        }));
                       
                      }
                    }}
                    value={formData.workOrder.workOrderID}

                  />

                </div>
                <div style={{ flexBasis: "25%" }}>
                  <div>
                    <span style={{ color: "red" }}>*</span>
                    <span>Work Order End Date</span>
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
                    <span>Work Order Status</span>
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
                    props.setIsOpen(false);
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalControlButton>
              </ButtonSection>
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
            <div style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}>
              <div style={{ display: "flex", flexBasis: "100%", gap: "5px" }}>
                <div style={{ display: "flex", flexBasis: "25%" }}>
                  <div style={{ width: "75px" }}>
                    <span>Remarks :</span>
                  </div>
                  <input style={{ width: "730px", borderRadius: "0px" }} />
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
              <ModalControlButton
                type="button"
                value="Continue"
                id="create-account"
                variant="contained"
                onClick={() => {
                  setPricingType(pricingType);
                  props.setTabIndex({
                    ...props.tabIndex,
                    index: 0,
                    y: formData,
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
                onClick={saveTandMentry}
              >
                Save
              </ModalControlButton>
              <ModalControlButton
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceEntryForm);
