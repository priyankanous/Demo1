import React, { useEffect, useState } from "react";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import * as RiIcons from "react-icons/ri";
import { connect } from "react-redux";
import { getSbuData } from "../../../actions/sbu";
import { getSbuHeadData } from "../../../actions/sbuHead";
import { getBuData } from "../../../actions/bu";
import { getLocationData } from "../../../actions/locaion";
import { getBusinessTypeData } from "../../../actions/businessType";
import { getCocPracticeData } from "../../../actions/cocPractice";
import { setResourceData } from "../../../actions/resource";
import axios from "axios";
import { apiV1 } from "../../../utils/constantsValue";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SnackBar from "../../CommonComponent/SnackBar";

const RevenueResourceAccordian = (props) => {
  const {
    selectedFyIdToGetLocation,
    formData,
    pricingType,
    inputNumber,
    initialResourceCount,
    setInputNumber,
    generateGrid,
    getDataByOppId,
    oppId,
    currencyId,
    currencyCheck,
    currencyID,
    currencyLabelResourceLevel,
  } = props;

  console.log("currencyId->", currencyID);
  console.log("inputNumber->", inputNumber);

  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
    props.getCocPracticeData();
  }, []);
  const { resourceData, updateResourceData, id } = props;
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
  console.log("Props in accordion new------>", props);
  const [selectedSbuId, setSelectedSbuId] = useState("");
  const [sbuHeadData, setSbuHeadData] = useState(null);
  const [buDataBySbuId, setBuDataBySbuId] = useState(null);
  const [selectedBuIdToGetCoc, setSelectedBuIdToGetCoc] = useState("");

  useEffect(() => {
    if (resourceData[id] && resourceData[id]?.sbuId) {
      setSelectedSbuId(resourceData[id]?.sbuId);
    }
  }, [resourceData]);

  const updateResourceDetails = async (params) => {
    const dataArr = [...resourceData];
    console.log("dataArr in updateResourceDetails: ", dataArr);
    const data = dataArr[id];
    // console.log("update Data Obj at", id, data, dataArr);
    data[params?.resourseDetailsColumn] = params?.event?.target?.value;

    // Store sbuId based on the selected option
    const selectedOption = params?.event?.target?.selectedOptions[0];
    if (selectedOption) {
      const sbuId = selectedOption.getAttribute(params?.attrKeySbu);
      data[params?.selectedID] = sbuId;
      setSelectedSbuId(sbuId);
    }

    // const selectedOptionBu = params?.event?.target?.selectedOptions[0];
    // if (selectedOptionBu) {
    //   const buId = selectedOption.getAttribute(params?.attrKeyBu);
    //   data[params?.selectedID] = buId;
    //   setSelectedBuIdToGetCoc(buId);
    // }
    if (params.attrKey) {
      data[params?.selectedID] =
        params?.event?.target?.selectedOptions[0]?.getAttribute(
          params?.attrKey
        );
    }

    if (params.attrKeyBu) {
      data[params?.selectedID] =
        params?.event?.target?.selectedOptions[0]?.getAttribute(
          params?.attrKeyBu
        );
      setSelectedBuIdToGetCoc(data[params?.selectedID]);
    }
    if (params?.attrKey == "data-locationId") {
      const response = await axios.get(
        `${apiV1}/location/${props?.formData?.financialYear?.financialYearName}/${params?.event?.target?.value}`
      );
      // console.log("THE MANINNNN GLLF", response?.data?.data);
      data["leaveLossFactor"] = response?.data?.data;
    }
    if (
      params?.resourseDetailsColumn == "startDate" ||
      params?.resourseDetailsColumn == "endDate"
    ) {
      data[params?.resourseDetailsColumn] = createDate(
        params?.event?.target?.value
      );
    }
    console.log("data in component:", data);
    dataArr[id] = data;
    // console.log(dataArr, "After update", updateResourceData);
    updateResourceData(dataArr);
  };
  // setSelectedSbuId(resourceData[0].sbuId);

  console.log("Selected sbuId state-->:", selectedSbuId);

  const getSbuHeadBySbuId = async (selectedSbuId) => {
    try {
      const response = await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/sbu/${selectedSbuId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching SBU Head data:", error);
      throw error;
    }
  };

  const getCocByBuId = async (selectedBuIdToGetCoc) => {
    try {
      const response = await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/businessUnitId/${selectedBuIdToGetCoc}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching SBU Head data:", error);
      throw error;
    }
  };

  // console.log("sbuHeadData", sbuHeadData.data[0].sbuHeadName)
  // console.log("sbuHeadDataBU", sbuHeadData.data[0].strategicBusinessUnit.businessUnit.businessUnitName)

  const createDate = (date) => {
    let t = new Date(date);
    let splitDate = date.split("-");
    return `${splitDate[2]}/${month[t.getMonth()]}/${t.getFullYear()}`;
  };

  // const addResource = () => {
  //   console.log("resource Details for set resource Data", resourseDetails);
  //   props.updateResourceData(resourseDetails, id);
  // };

  const [selectedLocationToGetLs, setSelectedLocationToGetLs] = useState("");
  const [leaveLossData, setLeaveLossData] = useState(null);

  // const getLeaveLossByLocation = async (selectedLocationToGetLs) => {
  //   console.log("selectedLocation  value---->",selectedLocationToGetLs);

  //   try {
  //     const response = await axios.get(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/2023-2024/${selectedLocationToGetLs}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching SBU Head data:", error);
  //     throw error;
  //   }
  // };

  const formatDateB = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getLeaveLossByLocation = async (
    selectedFyIdToGetLocation,
    selectedLocationToGetLs
  ) => {
    try {
      const response = await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/${selectedFyIdToGetLocation}/${selectedLocationToGetLs}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Leave Loss data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (selectedLocationToGetLs) {
      getLeaveLossByLocation(selectedFyIdToGetLocation, selectedLocationToGetLs)
        .then((data) => {
          console.log("Data:", data.data);
          setLeaveLossData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedLocationToGetLs, selectedFyIdToGetLocation]);

  useEffect(() => {
    if (selectedSbuId) {
      getSbuHeadBySbuId(selectedSbuId)
        .then((res) => {
          setSbuHeadData(res);
        })
        .catch((error) => {
          console.error("Error fetching SBU Head data:", error);
        });
    }
  }, [selectedSbuId]);

  const [coc, setCoc] = useState([]);

  useEffect(() => {
    if (selectedBuIdToGetCoc) {
      getCocByBuId(selectedBuIdToGetCoc)
        .then((data) => {
          setCoc(data.data);
        })
        .catch((error) => {
          console.error("Error fetching SBU Head data:", error);
        });
    }
  }, [selectedBuIdToGetCoc]);
  console.log("coc---->", coc);

  useEffect(() => {
    const dataArr = [...resourceData];
    const data = dataArr[id];
    data["sbuHeadId"] =
      sbuHeadData?.data?.length > 0 ? sbuHeadData?.data[0]?.sbuHeadId : "";
    data["sbuHeadName"] =
      sbuHeadData?.data?.length > 0 ? sbuHeadData?.data[0]?.sbuHeadName : "";
    data["businessUnitId"] =
      sbuHeadData?.data?.length > 0
        ? sbuHeadData?.data[0].strategicBusinessUnit?.businessUnit
            ?.businessUnitId
        : "";
    data["businessUnitName"] =
      sbuHeadData?.data?.length > 0
        ? sbuHeadData?.data[0].strategicBusinessUnit?.businessUnit
            ?.businessUnitName
        : "";
    dataArr[id] = data;
    setSelectedBuIdToGetCoc(data["businessUnitId"]);
    updateResourceData(dataArr);
  }, [sbuHeadData]);

  // useEffect(() => {
  //   if (selectedLocationToGetLs) {
  //     getLeaveLossByLocation()
  //       .then((data) => {
  //         setLeaveLossData(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching Leave Loss data:", error);
  //       });
  //   }
  // }, []);

  // console.log("with id", props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.revenueResourceEntryId);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleDeleteRevenueResourceEntries = (revenueResourceEntryId) => {
    console.log("Deleting entry with ID:", initialResourceCount);
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/revenueresource/${revenueResourceEntryId}`
      )
      .then((response) => {
        console.log("Entry deleted successfully");
        setShowSnackbar(true);
        setSnackMessage("Record has been deleted");
        getDataByOppId(oppId);
      })
      .catch((error) => {
        console.error("Error deleting entry:", error);
      });
  };

  const selectedCurrency =
    props?.oppDataByOppId?.tmRevenueEntryVO?.currency?.currency;

  return (
    <React.Fragment>
      <br></br>
      <AccordionItem id="accordianItem">
        <AccordionItemHeading id="accordianItemHeading">
          <AccordionItemButton
            style={{
              marginTop: "6px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "10px",
              }}
            >
              <div>
                <RiIcons.RiArrowDownSFill />
                <span style={{fontSize:"16px", fontWeight:"400", fontFamily:"Roboto"}}>Resource {id + 1} Details </span>
              </div>
              <div>
                <DeleteOutlineIcon
                  style={{ fontSize: "20px", paddingRight: "5px" }}
                  onClick={() =>
                    handleDeleteRevenueResourceEntries(
                      props?.oppDataByOppId?.tmRevenueEntryVO
                        ?.revenueResourceEntries[id]?.revenueResourceEntryId
                    )
                  }
                />
              </div>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <br></br>
          <table style={{ backgroundColor: "white" }}>
            <tr>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                  
                }}
              >
                SBU
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                SBU Head
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                BU
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Location
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Resource Name
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Employee ID
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Start Date
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                End Date
              </td>
            </tr>

            <tr className="trmilestone" style={{ background: "white" }}>
              <td style={{ borderRight: "solid 1px", borderLeft: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  value={
                    sbuHeadData?.data?.length > 0
                      ? sbuHeadData?.data[0]?.strategicBusinessUnit?.sbuName
                      : ""
                  }
                  style={{fontFamily:"Roboto", fontSize:"14px", fontFamily:"Roboto"}}        
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "sbuName",
                      selectedID: "sbuId",
                      attrKeySbu: "data-sbuId",
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    {/* Select SBU */}
                    {/* {props.oppDataByOppId.tmRevenueEntryVO.revenueResourceEntries[0].strategicBusinessUnit.sbuName} */}
                  </option>
                  {props.sbuData.sbuData &&
                    props.sbuData.sbuData.map((obj, id) => (
                      <option key={id} data-sbuId={obj.sbuId}>
                        {obj.sbuName}
                      </option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                style={{fontFamily:"Roboto",fontSize:"14px"}}
                  id="milestoneselect"
                  required
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.strategicBusinessUnitHead
                      ?.sbuHeadName
                  }
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.strategicBusinessUnitHead?.sbuHeadIdsbuHeadIdsbuHeadId}
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e.target.value,
                      resourseDetailsColumn: "sbuHeadName",
                      selectedID: "sbuHeadId",
                      attrKey: "data-sbuHeadId",
                    });
                  }}
                  type="text"
                  data-sbuHeadId={1}
                  value={
                    sbuHeadData?.data?.length > 0
                      ? sbuHeadData?.data[0]?.sbuHeadName
                      : ""
                  }
                  disabled
                ></input>

                {/* <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "sbuHeadName",
                      selectedID: "sbuHeadId",
                      attrKey: "data-sbuHeadId",
                    });
                  }}
                  style={{fontFamily:"Roboto"}}        
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.strategicBusinessUnitHead?.sbuHeadName}
                >
                  <option value="" disabled selected hidden>
                    {props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.strategicBusinessUnitHead?.sbuHeadName}
                  </option>
                  {props.sbuHeadData.sbuHeadData &&
                    props.sbuHeadData.sbuHeadData.map((obj, id) => (
                      <option data-sbuHeadId={obj.sbuHeadId}>
                        {obj.sbuHeadName}
                      </option>
                    ))}
                </select> */}
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                {/* <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "buisnessUnitName",
                      selectedID: "buisnessUnitId",
                      attrKeyBu: "data-buisnessUnitId",
                    });
                  }}
                  style={{fontFamily:"Roboto"}}        
                >
                  <option value="" disabled selected hidden>
                    {
                      props?.oppDataByOppId?.tmRevenueEntryVO
                        ?.revenueResourceEntries[id]?.businessUnit
                        ?.businessUnitDisplayName
                    }
                  </option>
                  {props.buData.buData &&
                    props.buData.buData.map((obj, id) => (
                      <option data-buisnessUnitId={obj.businessUnitId}>
                        {obj.businessUnitName}
                      </option>
                    ))}
                </select> */}
                <input
                                style={{fontFamily:"Roboto",fontSize:"14px"}}

                  id="milestoneselect"
                  required
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.businessUnit
                      ?.businessUnitDisplayName
                  }
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "businessUnitName",
                      selectedID: "businessUnitId",
                      attrKey: "data-businessUnitId",
                    });
                  }}
                  type="text"
                  data-sbuHeadId={1}
                  value={
                    sbuHeadData?.data?.length > 0
                      ? sbuHeadData?.data[0]?.strategicBusinessUnit
                          ?.businessUnit?.businessUnitName
                      : ""
                  }
                  disabled
                ></input>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}        
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.location?.locationName}

                  onChange={(e) => {
                    // const newLocationId = e.target.value

                    // const newLocationId = e.target.options[e.target.selectedIndex].getAttribute('data-locationId');
                    // setSelectedLocationToGetLs(newLocationId);
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "locationName",
                      selectedID: "locationId",
                      attrKey: "data-locationId",
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    {
                      props?.oppDataByOppId?.tmRevenueEntryVO
                        ?.revenueResourceEntries[id]?.location?.locationName
                    }
                  </option>
                  {props.locationData.locationData &&
                    props.locationData.locationData.map((obj, id) => (
                      <option data-locationId={obj.locationId}>
                        {obj.locationName}
                      </option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}
                  id="milestoneinput"
                  type="text"
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.resourceName}
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.resourceName
                  }
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "resouceName",
                    });
                  }}
                ></input>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}
                  id="milestoneinput"
                  type="string"
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.employeeId
                  }
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.employeeId}

                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "employeeId",
                    });
                  }}
                ></input>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                                style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}

                  id="milestoneselect"
                  type="date"
                  required
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.resourceStartDate
                  }
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.resourceStartDate}

                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "startDate",
                    });
                  }}
                />
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                  id="milestoneselect"
                  type="date"
                  required
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.resourceEndDate
                  }
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.resourceEndDate}
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "endDate",
                    });
                  }}
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}
       

                />
              </td>
            </tr>
            <br></br>
          </table>
          <table style={{ marginLeft: "110px", backgroundColor: "white" }}>
            <tr>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Business Type
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                CoC Practice
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Billing Rate Type
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Billing Rate (
                {currencyId || selectedCurrency || currencyLabelResourceLevel})
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                  padding: "0px",
                }}
              >
                Leave Loss Factor %
              </td>
              <td
                style={{
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#525252",
                }}
              >
                Allocation %
              </td>
            </tr>
            <tr className="trmilestone" style={{ background: "white" }}>
              <td style={{ borderRight: "solid 1px", borderLeft: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  // placeholder="BusinessType"
                  // value={{
                  //   value: props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.businessType.businessTypeId,
                  //   label: props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.businessType.businessTypeName,
                  // }}

                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "businessTypeName",
                      selectedID: "businessTypeId",
                      attrKey: "data-businessTypeId",
                    });
                  }}
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}        

                >
                  <option value="" disabled selected hidden>
                    {
                      props?.oppDataByOppId?.tmRevenueEntryVO
                        ?.revenueResourceEntries[id]?.businessType
                        .businessTypeDisplayName
                    }
                  </option>
                  {props.businessTypeData.businessTypeData &&
                    props.businessTypeData.businessTypeData.map((obj, id) => (
                      <option data-businessTypeId={obj.businessTypeId}>
                        {obj.businessTypeDisplayName}
                      </option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid 1px", borderLeft: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  // placeholder="BusinessType"
                  // value={{
                  //   value: props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.cocPractice.cocPracticeId,
                  //   label: props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.cocPractice.cocPracticeName,
                  // }}
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "cocPracticeName",
                      selectedID: "cocPracticeId",
                      attrKey: "data-cocPracticeId",
                    });
                  }}
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}        
        
                >
                  <option value="" disabled selected hidden>
                    {
                      props?.oppDataByOppId?.tmRevenueEntryVO
                        ?.revenueResourceEntries[id]?.cocPractice
                        .cocPracticeDisplayName
                    }
                  </option>

                  {coc &&
                    coc.map((obj, id) => (
                      <option data-cocPracticeId={obj.cocPracticeId}>
                        {obj.cocPracticeName}
                      </option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "billingRateType",
                    });
                  }}
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}        

                  // value={{
                  //   value: props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.billingRateType,
                  //   label: props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.billingRateType,
                  // }}
                >
                  <option value="" disabled selected hidden>
                    {
                      props?.oppDataByOppId?.tmRevenueEntryVO
                        ?.revenueResourceEntries[id]?.billingRateType
                    }
                  </option>
                  <option>Hourly</option>
                  <option>Daily</option>
                  <option>Monthly</option>
                  <option>Quaterly</option>
                  <option>Half Annually</option>
                </select>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                  type="text"
                  id="resourceinput"
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.billingRate
                  }
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.billingRate}

                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "billingRate",
                    });
                  }}
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}        
       
                ></input>
              </td>
              <td
                style={{
                  borderRight: "solid 1px",
                }}
              >
                <input
                  id="resourceinput"
                  type="number"
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.leaveLossFactor
                  }
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.leaveLossFactor}
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "leaveLossFactor",
                    });
                  }}
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}        
      
                  // value={leaveLossData}
                ></input>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                  type="text"
                  id="resourceinput"
                  placeholder={
                    props?.oppDataByOppId?.tmRevenueEntryVO
                      ?.revenueResourceEntries[id]?.allocation
                  }
                  // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.allocation}
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "allocation",
                    });
                  }}
                  style={{fontFamily:"Roboto",fontSize:"14px", fontWeight:"400"}}        
       
                ></input>
              </td>
              {/* <td>
                <button
                  onClick={() => {
                    addResource();
                  }}
                >
                  Add Resource
                </button>
              </td> */}
            </tr>
          </table>
        </AccordionItemPanel>
      </AccordionItem>
      <SnackBar
        open={showSnackbar}
        message={snackMessage}
        onClose={() => setShowSnackbar(false)}
        autoHideDuration={1000}
      />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  console.log("this is the state", state);

  return {
    sbuData: state.sbuData,
    sbuHeadData: state.sbuHeadData,
    locationData: state.locationData,
    buData: state.buData,
    businessTypeData: state.businessTypeData,
    cocPracticeData: state.cocPracticeData,
    resource: state.resource,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSbuData: () => dispatch(getSbuData()),
    getBuData: () => dispatch(getBuData()),
    getSbuHeadData: () => dispatch(getSbuHeadData()),
    getBusinessTypeData: () => dispatch(getBusinessTypeData()),
    getLocationData: () => dispatch(getLocationData()),
    getCocPracticeData: () => dispatch(getCocPracticeData()),
    setResourceData: (data) => dispatch(setResourceData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueResourceAccordian);
