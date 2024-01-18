import React, { useState, useEffect } from "react";
import axios from "axios";

import { connect } from "react-redux";
import { getSbuData } from "../../../actions/sbu";
import { getSbuHeadData } from "../../../actions/sbuHead";
import { getBuData } from "../../../actions/bu";
import { getLocationData } from "../../../actions/locaion";
import { getBusinessTypeData } from "../../../actions/businessType";
import { getCocPracticeData } from "../../../actions/cocPractice";
import {
  setMilestoneData,
  setRevenueResourceEntriesData,
} from "../../../actions/milestone";

const RevenueMilestoneResourceData = (props) => {
  const { milestoneData, id, updateMilestoneData, milestoneId, isSaved } =
    props;
  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
    props.getCocPracticeData();
  }, []);
  const [coc, setCoc] = useState([]);
  const [selectedBuIdToGetCoc, setSelectedBuIdToGetCoc] = useState("");
  const [sbuHeadData, setSbuHeadData] = useState(null);


  const receivedSbuId = props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.strategicBusinessUnit?.sbuId;

  const [selectedSbuId, setSelectedSbuId] = useState(receivedSbuId || "");

  // const [selectedSbuId, setSelectedSbuId] = useState(receivedSbuId || "");

  console.log("selectedSbuId", selectedSbuId )

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

  console.log("sbu", sbuHeadData);

  useEffect(() => {
    const dataArr = [...milestoneData[milestoneId]?.revenueResourceEntries];
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
    const temp = [...milestoneData];
    temp[milestoneId]["revenueResourceEntries"] = dataArr;
    updateMilestoneData(temp);
  }, [sbuHeadData]);

  useEffect(() => {
    if (milestoneData[id] && milestoneData[id]?.sbuId) {
      setSelectedSbuId(milestoneData[id]?.sbuId);
    }
  }, [milestoneData]);

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

  const createDate = (date) => {
    let t = new Date(date);
    let splitDate = date?.split("-");
    return `${splitDate[2]}/${month[t?.getMonth()]}/${t?.getFullYear()}`;
  };

  const getSbuHeadBySbuId = async (selectedSbuId) => {
    try {
      const response = await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/sbu/${selectedSbuId}`
      );
      return response?.data;
    } catch (error) {
      console.error("Error fetching SBU Head data:", error);
      throw error;
    }
  };

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

  const getCocByBuId = async (selectedBuIdToGetCoc) => {
    try {
      const response = await axios.get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/businessUnitId/${selectedBuIdToGetCoc}`
      );
      return response.data;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };

  const updateMilestoneDetails = (params) => {
    console.log("Params -->", params);
    const dataArr = [...milestoneData[milestoneId]?.revenueResourceEntries];
    const data = dataArr[id];   
    let selectedOption
    // Store sbuId based on the selected option
    if (params?.event?.target?.selectedOptions) {
      selectedOption = params?.event?.target?.selectedOptions[0];
    }
    if (selectedOption) {
      const sbuId = selectedOption.getAttribute(params?.attrKeySbu);
      data[params?.selectedID] = sbuId;
      setSelectedSbuId(sbuId);
    }

    if (params?.attrKey) {
      // data[params.milestoneDetailsKey] = {
      data[params.milestoneDetailsColumn] = params.event.target.value;
      data[params.selectedID] =
        params.event.target.selectedOptions[0].getAttribute(params.attrKey);
      // };
    }

    if (params?.attrKeyBu) {
      data[params?.selectedID] =
        params?.event?.target?.selectedOptions[0]?.getAttribute(
          params?.attrKeyBu
        );
      setSelectedBuIdToGetCoc(data[params?.selectedID]);
    }

    if (
      params?.milestoneDetailsColumn == "resourceStartDate" ||
      params?.milestoneDetailsColumn == "resourceEndDate"
    ) {
      data[params?.milestoneDetailsColumn] = createDate(
        params.event.target.value
      );
    } else {
      data[params?.milestoneDetailsColumn] = params?.event?.target?.value;
    }

    dataArr[id] = data;
    const temp = [...milestoneData];
    temp[milestoneId]["revenueResourceEntries"] = dataArr;
    console.log("Milestone Data After Updation", temp);
    updateMilestoneData(temp);
  };

  // const updateMilestoneDetails = (params) => {
  //   console.log("Params -->", params)
  //   const dataArr = [...milestoneData[milestoneId]?.revenueResourceEntries];
  //   console.log("dataArr in updateResourceDetai ", dataArr);

  //   const data = dataArr[id];
  //   data[params?.milestoneDetailsColumn] = params?.event?.target?.value;

    
  //   let selectedOption
  //   selectedOption = params?.event?.target?.selectedOptions[0];
  //   if (selectedOption) {
  //     const sbuId = selectedOption.getAttribute(params?.attrKeySbu);
  //     data[params?.selectedID] = sbuId;
  //     setSelectedSbuId(sbuId);
  //   }

  //   if (params.attrKey) {
  //     data[params?.selectedID] =
  //       params?.event?.target?.selectedOptions[0]?.getAttribute(
  //         params?.attrKey
  //       );
  //   }
  //   if (params.attrKeyBu) {
  //     data[params?.selectedID] =
  //       params?.event?.target?.selectedOptions[0]?.getAttribute(
  //         params?.attrKeyBu
  //       );
  //     setSelectedBuIdToGetCoc(data[params?.selectedID]);
  //   }


  //   if (
  //     params?.milestoneDetailsColumn == "resourceStartDate" ||
  //     params?.milestoneDetailsColumn == "resourceEndDate"
  //   ) {
  //     data[params?.milestoneDetailsColumn] = createDate(
  //       params.event.target.value
  //     );
  //   } else {
  //     data[params?.milestoneDetailsColumn] = params?.event?.target?.value;
  //   }

  //   dataArr[id] = data;
  //   // const temp = [...milestoneData];
  //   // temp[milestoneId]["revenueResourceEntries"] = dataArr;
  //   // console.log("Milestone Data After Updation", temp);
  //   updateMilestoneData(dataArr);
  // };

    console.log("revenueaaa", props?.oppDataByOppId?.fpRevenueEntryVO?.milestones[id]
    ?.revenueResourceEntries[id]?.resourceName);
  
    const [mResourceName, setMResourceName] = useState(props?.oppDataByOppId?.fpRevenueEntryVO?.milestones || []);
//  const [naming , setNaming] = useState()
const [placeholderTexts, setPlaceholderTexts] = useState([]);

let recievedResourceName =""


    // useEffect(() => {
    //   const placeholders = [];
    //   mResourceName.forEach((milestone, milestoneIndex) => {
    //     milestone?.revenueResourceEntries?.forEach((entry, resourceId) => {
    //        recievedResourceName = getResourceName(milestoneIndex, resourceId);
    //        printResourceNameOutside(recievedResourceName);
    //        placeholders.push(recievedResourceName);

    //     });
    //   });
    //   setPlaceholderTexts(placeholders);
    // }, [mResourceName]);

    // const getResourceName = (milestoneIndex, id) => {
    //   const mile = mResourceName[milestoneIndex];
    //   if (mile && mile.revenueResourceEntries && mile.revenueResourceEntries[id]) {
    //     return  mile.revenueResourceEntries[id].resourceName;
    //   }
    //   return '';
    // };

    // const printResourceNameOutside = (name) => {
    //   console.log("namename", name); 
    // };

    const resourceNameArray = [];

props.newOppData?.fpRevenueEntryVO?.milestones.forEach((milestone) => {
  if (milestone && milestone.revenueResourceEntries) {
    milestone.revenueResourceEntries.forEach((entry) => {
      if (entry && entry.resourceName) {
        console.log("nameRec",entry.resourceName);
        resourceNameArray.push(entry.resourceName);
      }
    });
  }
});
console.log("resourceNameArray", resourceNameArray);


console.log("zzShyam", props.milestoneId);


const getMilestoneId = () => {
  return 0; // For example, this returns index 0, replace with your dynamic logic
};

const getResourceId = () => {
  return 1; // For example, this returns index 1, replace with your dynamic logic
};

const dynamicMilestoneId = getMilestoneId();
const dynamicResourceId = getResourceId();

const milestone = props?.oppDataByOppId?.fpRevenueEntryVO?.milestones?.[dynamicMilestoneId];
const resourceName = milestone?.revenueResourceEntries?.[dynamicResourceId]?.resourceName;

console.log(resourceName);



  return (
    <React.Fragment>
      <table
        style={{
          backgroundColor: "white",
        }}
      >
        <tr>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            SBU
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            SBU Head
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            BU
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            Location
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            Resource Name
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            Employee ID
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            Start Date
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            End Date
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            Revenue (INR)
          </td>

          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            Business Type
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            CoC Pratice
          </td>
          <td
            style={{
              textAlign: "center",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            <span style={{ color: "red" }}>*</span>
            Allocation %
          </td>
        </tr>
        <tr
          className="trmilestone"
          style={{ background: "white", border: "1px solid #898282" }}
        >
          <div>
            <td
              style={{
                borderRight: "1px solid #898282",
                height: "30px",
                verticalAlign: "middle",
                borderBottom:
                  isSaved &&
                  !milestoneData[milestoneId]?.revenueResourceEntries[id]
                    ?.sbuName
                    ? "1px solid red"
                    : "",
                borderTop:
                  isSaved &&
                  !milestoneData[milestoneId]?.revenueResourceEntries[id]
                    ?.sbuName
                    ? "1px solid red"
                    : "",
              }}
            >
              <select
                // id="milestoneselect"
                required
                onChange={(e) => {
                  updateMilestoneDetails({
                    event: e,
                    milestoneDetailsKey: "strategicBusinessUnit",
                    milestoneDetailsColumn: "sbuName",
                    selectedID: "sbuId",
                    attrKeySbu: "data-sbuId",
                  });
                }}
                style={{
                  width: "50px",
                  backgroundColor: "white",
                  borderRadius: "0px",
                  boxShadow: "0px 0px 0px 0px",
                  padding: "0px",
                }}
                value={
                  sbuHeadData?.data?.length > 0
                    ? sbuHeadData?.data[0]?.strategicBusinessUnit?.sbuName
                    : ""
                }
                
             >                
                <option value="" disabled selected hidden></option>
                {props.sbuData.sbuData &&
                  props.sbuData.sbuData.map((obj, id) => (
                    <option data-sbuId={obj.sbuId}>{obj.sbuName}</option>
                  ))}
              </select>
            </td>
          </div>
          <td style={{ borderRight: "1px solid #898282" }}>
            {/* <select
              required
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "strategicBusinessUnitHead",
                  milestoneDetailsColumn: "sbuHeadName",
                  selectedID: "sbuHeadId",
                  attrKey: "data-sbuHeadId",
                });
              }}
              style={{
                width: "50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px",
              }}
            >
              <option value="" disabled selected hidden></option>
              {props.sbuHeadData.sbuHeadData &&
                props.sbuHeadData.sbuHeadData.map((obj, id) => (
                  <option data-sbuHeadId={obj.sbuHeadId}>
                    {obj.sbuHeadName}
                  </option>
                ))}
            </select> */}
            <input
              style={{
                width: "50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px",
                fontFamily: "Roboto",
                fontSize: "14px",
              }}
              id="milestoneselect"
              required
              placeholder={
                // props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[
                //   id
                // ]?.strategicBusinessUnitHead?.sbuHeadName
                props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.strategicBusinessUnitHead?.sbuHeadName
              }
              // value={props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[id]?.strategicBusinessUnitHead?.sbuHeadIdsbuHeadIdsbuHeadId}
              onChange={(e) => {
                updateMilestoneDetails({
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
          </td>
          <td
            style={{
              borderRight: "1px solid #898282",
            }}
          >
            {/* <select
              required
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "businessUnit",
                  milestoneDetailsColumn: "businessUnitName",
                  selectedID: "businessUnitId",
                  attrKey: "data-businessUnitId",
                });
              }}
              style={{
                width: "50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px",
              }}
            >
              <option value="" disabled selected hidden></option>
              {props.buData.buData &&
                props.buData.buData.map((obj, id) => (
                  <option data-businessUnitId={obj.businessUnitId}>
                    {obj.businessUnitName}
                  </option>
                ))}
            </select> */}
            <input
              style={{
                width: "50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px",
                fontFamily: "Roboto",
                fontSize: "14px",
              }}
              id="milestoneselect"
              required
              placeholder={
                // props?.oppDataByOppId?.tmRevenueEntryVO?.revenueResourceEntries[
                //   id
                // ]?.businessUnit?.businessUnitDisplayName
                props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.businessUnit?.businessUnitDisplayName
              }
              onChange={(e) => {
                updateMilestoneDetails({
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
                  ? sbuHeadData?.data[0]?.strategicBusinessUnit?.businessUnit
                      ?.businessUnitName
                  : ""
              }
              disabled
            ></input>
          </td>
          <td
            style={{
              borderRight: "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.locationName
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.locationName
                  ? "1px solid red"
                  : "1px solid #898282",
                 
            }}
          >
            <select
              // id="milestoneselect"
              required
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "location",
                  milestoneDetailsColumn: "locationName",
                  selectedID: "locationId",
                  attrKey: "data-locationId",
                });
              }}
              style={{
                width: "50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px",
              }}
            >
              <option value="" disabled selected hidden>
              {
                        props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.location?.locationName

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
          <td
            style={{
              borderRight: "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.resourceName
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.resourceName
                  ? "1px solid red"
                  : "1px solid #898282",
                 
            }}
          >
            <input
              id="milestoneinput"
              type="text"
              placeholder={
                // props?.oppDataByOppId?.fpRevenueEntryVO?.milestones[id]
                // ?.revenueResourceEntries[id]?.resourceName
                //  props.newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[id]?.resourceName
                props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id].resourceName
                
              }
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "resourceName",
                });
              }}
            ></input>
          </td>
          <td
            style={{
              borderRight: "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.employeeId
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.employeeId
                  ? "1px solid red"
                  : "1px solid #898282",
                
            }}
          >
            <input
              id="milestoneinput"
              type="string"
              placeholder={
                // props?.oppDataByOppId?.fpRevenueEntryVO?.milestones[id]
                // ?.revenueResourceEntries[id]?.employeeId
        props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.employeeId
        // props.newOppData?.fpRevenueEntryVO?.milestones.map(milestone => {
        //   if (milestone.revenueResourceEntries[id]) {
        //     return milestone.revenueResourceEntries[id].employeeId;
        //   }
        //   return '';
        // })
    
       
              }
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "employeeId",
                });
              }}
            ></input>
          </td>
          <td
            style={{
              borderRight: "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.resourceStartDate
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.resourceStartDate
                  ? "1px solid red"
                  : "1px solid #898282",
                 
            }}
          >
            <input
              id="milestoneinput"
              type="date"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "resourceStartDate",
                });
              }}
            />
          </td>
          <td
            style={{
              borderRight: "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.resourceEndDate
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.resourceEndDate
                  ? "1px solid red"
                  : "1px solid #898282",
                
            }}
          >
            <input
              id="milestoneinput"
              type="date"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "resourceEndDate",
                });
              }}
            />
          </td>

          <td
            style={{
              borderRight: "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.milestoneResourceRevenue
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.milestoneResourceRevenue
                  ? "1px solid red"
                  : "1px solid #898282",
                 
            }}
          >
            <input
              id="milestoneinput"
              type="text"
              placeholder={
                // props?.oppDataByOppId?.fpRevenueEntryVO?.milestones[id]
              //   ?.revenueResourceEntries[id]?.milestoneResourceRevenue
              props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.milestoneResourceRevenue
              }
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "milestoneResourceRevenue",
                });
              }}
            ></input>
          </td>
          <td
            style={{
              borderRight: "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.businessTypeName
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.businessTypeName
                  ? "1px solid red"
                  : "1px solid #898282",
                 
            }}
          >
            <select
              // id="milestoneselect"
              required
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "businessType",
                  milestoneDetailsColumn: "businessTypeName",
                  selectedID: "businessTypeId",
                  attrKey: "data-businessTypeId",
                });
              }}
              style={{
                width: "50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px",
              }}
            >
              <option value="" disabled selected hidden>
              {
                        props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.businessType.businessTypeDisplayName

                    }
              </option>
              {props.businessTypeData.businessTypeData &&
                props.businessTypeData.businessTypeData.map((obj) => (
                  <option data-businessTypeId={obj.businessTypeId}>
                    {obj.businessTypeDisplayName}
                  </option>
                ))}
            </select>
          </td>
          <td
            style={{
              borderRight: "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.cocPraticeName
                  ? "1px solid red"
                  : "1px solid #898282",
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.cocPraticeName
                  ? "1px solid red"
                  : "1px solid #898282",
                 
            }}
          >
            <select
              // id="milestoneselect"
              required
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "cocPratice",
                  milestoneDetailsColumn: "cocPraticeName",
                  selectedID: "cocPracticeId",
                  attrKey: "data-cocPracticeId",
                });
              }}
              style={{
                width: "50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px",
              }}
            >
              <option value="" disabled selected hidden>
                    {
                      props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.cocPractice.cocPracticeDisplayName
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
          <td
            style={{
              borderTop:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.allocation
                  ? "1px solid red"
                  : "1px solid #898282",
              borderBottom:
                isSaved &&
                !milestoneData[milestoneId]?.revenueResourceEntries[id]
                  ?.allocation
                  ? "1px solid red"
                  : "1px solid #898282",
                 
            }}
          >
            <input
              type="text"
              id="milestoneinput"
              placeholder={
                // props?.oppDataByOppId?.fpRevenueEntryVO?.milestones[id]
                // ?.revenueResourceEntries[id]?.allocation
                props.newOppData?.fpRevenueEntryVO?.milestones[props.milestoneId]?.revenueResourceEntries[id]?.allocation
              }
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "allocation",
                });
              }}
            ></input>
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    sbuData: state.sbuData,
    cocPracticeData: state.cocPracticeData,
    sbuHeadData: state.sbuHeadData,
    locationData: state.locationData,
    buData: state.buData,
    businessTypeData: state.businessTypeData,
    resource: state.resource,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSbuData: () => dispatch(getSbuData()),
    getCocPracticeData: () => dispatch(getCocPracticeData()),
    getBuData: () => dispatch(getBuData()),
    getSbuHeadData: () => dispatch(getSbuHeadData()),
    getBusinessTypeData: () => dispatch(getBusinessTypeData()),
    getLocationData: () => dispatch(getLocationData()),
    setMilestoneData: (data) => dispatch(setMilestoneData(data)),
    setRevenueResourceEntriesData: (data) =>
      dispatch(setRevenueResourceEntriesData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueMilestoneResourceData);
