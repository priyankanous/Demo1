import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import * as RiIcons from "react-icons/ri";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSbuData } from "../../../actions/sbu";
import { getSbuHeadData } from "../../../actions/sbuHead";
import { getBuData } from "../../../actions/bu";
import { getLocationData } from "../../../actions/locaion";
import { getBusinessTypeData } from "../../../actions/businessType";
import {
  setMilestoneData,
  saveMileStoneDataNew,
} from "../../../actions/milestone";
import axios from "axios";
import { InputField } from "../../../utils/constantsValue";
import RevenueMilestoneResourceData from "./RevenueMilestoneResourceData";

const RevenueMilestoneAccordian = (props) => {

  const { milestoneData, updateMilestoneData, id, oppId, isSaved, isFPSubmit } = props;

  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
  }, []);

  const [newOppData, setNewOppData] = useState([])

  let initialRe = newOppData?.fpRevenueEntryVO?.milestones[id]?.milestoneResourceCount;


  const [inputNumber, setInputNumber] = useState("");
  console.log("inp", inputNumber)



  const [milestoneGridItems, setMilestoneGridItems] = useState([]);
  // const [milestoneDetails, setMilestoneDetails] = useState({});
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

  const updateMilestoneDetails = (params) => {
    const dataArr = [...milestoneData];
    const data = dataArr[id];

    data[params.milestoneDetailsColumn] = params.event.target.value;

    if (params.attrKey) {
      data[params.selectedID] =
        params.event.target.selectedOptions[0].getAttribute(params.attrKey);
    }
    if (params.milestoneDetailsColumn == "milestoneBillingDate") {
      data[params.milestoneDetailsColumn] = createDate(
        params.event.target.value
      );
    }

    if (params.milestoneDetailsColumn == "milestoneResourceCount") {
      const inputNumber = parseInt(params.event.target.value);
      if (!isNaN(inputNumber) && inputNumber >= 0) {
        setInputNumber(inputNumber);
        generateMilestoneGrid(inputNumber);
      }
      data[params.milestoneDetailsColumn] = inputNumber;
    }
    dataArr[id] = data;
    updateMilestoneData(dataArr);
  };
  const createDate = (date) => {
    let t = new Date(date);
    let splitDate = date.split("-");
    return `${splitDate[2]}/${month[t.getMonth()]}/${t.getFullYear()}`;
  };

  const [milestones, setMilestonesData] = useState([]);

  // const saveOneMilestoneData = () => {
  //   const mileStoneData = {
  //     milestoneResourceCount: inputNumber,
  //     milestoneNumber: props.id + 1,
  //     milestoneRevenue: milestoneDetails.milestoneRevenue,
  //     milestoneBillingDate: milestoneDetails.milestoneBillingDate,
  //     revenueResourceEntries: props.revenueResourceEntries.filter(
  //       (revenueResourceEntry) => {
  //         const milestoneID = revenueResourceEntry.milestoneID;
  //         delete revenueResourceEntry.milestoneID;
  //         delete revenueResourceEntry.index;
  //         return milestoneID == props.id + 1;
  //       }
  //     ),
  //   };
  //   props.saveMileStoneDataNew(mileStoneData);
  // };

  console.log("cddd", newOppData?.fpRevenueEntryVO?.milestones[0]?.revenueResourceEntries[id]?.revenueResourceEntryId  )

  const allRevenueResourceEntryIds = [];

newOppData?.fpRevenueEntryVO?.milestones.forEach(milestone => {
  milestone?.revenueResourceEntries?.forEach(entry => {
    if (entry?.revenueResourceEntryId) {
      allRevenueResourceEntryIds.push(entry.revenueResourceEntryId);
    }
  });
});

console.log("allRevenueResourceEntryIds", allRevenueResourceEntryIds)

// Now allRevenueResourceEntryIds array contains all revenueResourceEntryId values
// You can use it as needed, send it to the backend, or perform other operations.


  // const mm = newOppData?.fpRevenueEntryVO?.milestones;
  // const revenueResourceEntryIds = [];
  
  // if (mm && mm.length > 0) {
  //   mm.forEach(milestone => {
  //     if (milestone && milestone.revenueResourceEntries && milestone.revenueResourceEntries.length > 0) {
  //       milestone.revenueResourceEntries.forEach(entry => {
  //         if (entry && entry.revenueResourceEntryId) {
  //           revenueResourceEntryIds.push(entry.revenueResourceEntryId); // Pushing each ID into the array
  //         }
  //       });
  //     }
  //   });
  // } else {
  //   console.log("No milestones or revenueResourceEntries found.");
  // }

  
  
  // Looping through each milestone and its revenueResourceEntries
  // mm.forEach(milestone => {
  //   milestone.revenueResourceEntries.forEach(entry => {
  //     console.log("revenueResourceEntryIdaa:", entry.revenueResourceEntryId);
  //   });
  // });
  
  const generateMilestoneGrid = (inputNumber) => {
    const dataArr = [...milestoneData];
    const data = dataArr[id];
    const items = [];
    const tempRevenueResourceItems = [];
    for (let i = 0; i < inputNumber; i++) {
      tempRevenueResourceItems.push({
        revenueResourceEntryId: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.revenueResourceEntryId,
        businessTypeId: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.businessType.businessTypeId,
        allocation: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.allocation,
        milestoneResourceRevenue: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.milestoneResourceRevenue,
        employeeId: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.employeeId,
        resourceName: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.resourceName ,
        locationId:newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.location?.locationId,
        resourceStartDate: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.resourceStartDate,
        resourceEndDate:newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.resourceEndDate,
        cocPracticeId:newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.cocPractice.cocPracticeId,
        sbuId: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.strategicBusinessUnit?.sbuId,
        sbuHeadId: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.strategicBusinessUnitHead?.sbuHeadId,
      businessUnitId: newOppData?.fpRevenueEntryVO?.milestones[id]?.revenueResourceEntries[i]?.businessUnit?.businessUnitId,
      });
      items.push(
        <RevenueMilestoneResourceData
          updateMilestoneData={updateMilestoneData}
          milestoneData={milestoneData}
          id={i}
          milestoneId={props.id}
          newOppData={newOppData}
          // oppDataByOppId={props.oppDataByOppId}
          isSaved={isSaved}
          // isFPSubmit={isFPSubmit}

        />
      );
    }
    data["revenueResourceEntries"] = [...tempRevenueResourceItems];
    dataArr[id] = data;
    updateMilestoneData(dataArr);
    setMilestoneGridItems(items);
  };

  const handleInputChange = (event) => {
    const inputNumber = parseInt(event.target.value);
    if (!isNaN(inputNumber) && inputNumber >= 0) {
      setInputNumber(inputNumber);
      generateMilestoneGrid(inputNumber);
    }
  };
  // useEffect(() => {
  //   if (props?.oppDataByOppId?.fpRevenueEntryVO?.milestones[id]?.milestoneResourceCount) {
  //     const receivedInputNumber = parseInt(props.oppDataByOppId.fpRevenueEntryVO.milestones[id].milestoneResourceCount); 
  //     if (!isNaN(receivedInputNumber) && receivedInputNumber >= 0) {
  //       setInputNumber(receivedInputNumber); 
  //       generateMilestoneGrid(receivedInputNumber); 
  //     }
  //   }
  // }, [props?.oppDataByOppId?.fpRevenueEntryVO?.milestones[id]?.milestoneResourceCount]);

  useEffect(() => {
    if (newOppData?.fpRevenueEntryVO?.milestones[id]?.milestoneResourceCount) {
      const receivedInputNumber = parseInt(newOppData?.fpRevenueEntryVO?.milestones[id]?.milestoneResourceCount); 
      if (!isNaN(receivedInputNumber) && receivedInputNumber >= 0) {
        setInputNumber(receivedInputNumber); 
        generateMilestoneGrid(receivedInputNumber); 
      }
    }
  }, [newOppData?.fpRevenueEntryVO?.milestones[id]?.milestoneResourceCount]);


  const getNewDataByOppId = (oppId) => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/getbyid/${oppId}`
      )
      .then((responseData) => {
        setNewOppData(responseData.data.data);
      });
  };

  useEffect(() => {
    if (oppId) {
      getNewDataByOppId(oppId);
    }
  }, [oppId]);

  useEffect(() => {
    // Check if newOppData exists and set inputNumber accordingly
    if (newOppData) {
      const initialRe = newOppData?.fpRevenueEntryVO?.milestones[id]?.milestoneResourceCount;
      setInputNumber(initialRe);
    }
  }, [newOppData, id]);

  useEffect(()=>{
    const dataArr = [...milestoneData];
    console.log("dataArr",dataArr)
    const items = []
    for (let i = 0; i < inputNumber; i++) {
      items.push(
        <RevenueMilestoneResourceData
          updateMilestoneData={updateMilestoneData}
          milestoneData={dataArr}
          id={i}
          newOppData={newOppData}
          milestoneId={props.id}
          isSaved={isSaved}          
        />
      );
    }
    setMilestoneGridItems(items);
  },[isSaved, milestoneData])

  // useEffect(()=>{
  //   const dataArr = [...milestoneData];
  //   console.log("dataArr",dataArr)
  //   const items = []
  //   for (let i = 0; i < inputNumber; i++) {
  //     items.push(
  //       <RevenueMilestoneResourceData
  //         updateMilestoneData={updateMilestoneData}
  //         milestoneData={dataArr}
  //         id={i}
  //         milestoneId={props.id}
  //         isSaved={isFPSubmit}          
  //       />
  //     );
  //   }
  //   setMilestoneGridItems(items);
  // },[isFPSubmit, milestoneData])

  
  

  console.log(" newOppData", milestoneData)
  return (
    <React.Fragment>
      <br></br>
      <AccordionItem id="accordianItem">
        <AccordionItemHeading id="accordianItemHeading">
          <AccordionItemButton
            style={{
              marginTop: "6px",
              width: "216px",
              marginLeft: "-47px",
              cursor: "pointer",
            }}
          >
            <RiIcons.RiArrowDownSFill />
            Milestones {props.id + 1}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
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
                gap: "35px",
                marginBottom: "15px",
              }}
            >
              <div style={{ flexBasis: "25%" }}>
                <div style={{ marginLeft: "4px" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>Milestone Number</span>
                </div>
                <div style={{ width: "187px" }}>
                  <InputField
                    style={{
                      background: "white",
                      width: "187px",
                      marginLeft: "8px",
                      borderRadius: "4.5px",
                      // height: "35px",
                    }}
                    size="small"
                    type="text"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
                    value={`M${props.id + 1}`}
                    onChange={(e) => {
                      updateMilestoneDetails({
                        event: e,
                        milestoneDetailsColumn: "milestoneNumber",
                      });
                    }}
                    disabled
                  />
                </div>
              </div>
              <div style={{ flexBasis: "25%" }}>
                <div style={{ marginLeft: "4px" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>M{props.id + 1} Billing date</span>
                </div>
                <div style={{ width: "187px" }}>
                  <InputField
                    style={{
                      background: "white",
                      width: "187Px",
                      marginLeft: "8px",
                      borderRadius: "4.5px",
                      // height: "30px",
                      // marginTop: "-15px",
                      border: isSaved && !milestoneData[id]?.milestoneBillingDate ? "1px solid red" : "",

                    }}
                    size="small"
                    type="date"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
                    onChange={(e) => {
                      updateMilestoneDetails({
                        event: e,
                        milestoneDetailsColumn: "milestoneBillingDate",
                      });
                    }}
                  />
                </div>
              </div>
              <div style={{ flexBasis: "25%" }}>
                <div style={{ marginLeft: "4px" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>M{props.id + 1} Revenue (INR)</span>
                </div>
                <div style={{ width: "187px" }}>
                  <InputField
                    style={{
                      background: "white",
                      width: "100",
                      marginLeft: "8px",
                      borderRadius: "4.5px",
                      // height: "35px",
                      // marginTop: "-15px",
                      border:  isSaved && !milestoneData[id]?.milestoneRevenue ? "1px solid red" : "",

                    }}
                    size="small"
                    type="text"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
                    placeholder={
                      newOppData.fpRevenueEntryVO?.milestones[id]?.milestoneRevenue
                    }
                    onChange={(e) => {
                      updateMilestoneDetails({
                        event: e,
                        milestoneDetailsColumn: "milestoneRevenue",
                      });
                    }}
                  />
                </div>
              </div>
              <div style={{ flexBasis: "25%" }}>
                <div style={{ marginLeft: "4px" }}>
                  <span style={{ color: "red" }}>*</span>
                  <span>Resources Count</span>
                </div>
                <div style={{ width: "187px" }}>
                  <InputField
                    style={{
                      background: "white",
                      width: "187Px",
                      marginLeft: "8px",
                      borderRadius: "4.5px",
                      // height: "35px",
                      // marginTop: "-15px",
                      border:  isSaved && !milestoneData[id]?.milestoneResourceCount ? "1px solid red" : "",

                    }}
                    size="small"
                    type="number"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
                    value={inputNumber}
                    // onChange={handleInputChange}

                    onChange={(e) => {
                      updateMilestoneDetails({
                        event: e,
                        milestoneDetailsColumn: "milestoneResourceCount",
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {milestoneGridItems}
        </AccordionItemPanel>
      </AccordionItem>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    sbuData: state.sbuData,
    sbuHeadData: state.sbuHeadData,
    locationData: state.locationData,
    buData: state.buData,
    businessTypeData: state.businessTypeData,
    resource: state.resource,
    revenueResourceEntries: state.milestone.revenueResourceEntries,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSbuData: () => dispatch(getSbuData()),
    getBuData: () => dispatch(getBuData()),
    getSbuHeadData: () => dispatch(getSbuHeadData()),
    getBusinessTypeData: () => dispatch(getBusinessTypeData()),
    getLocationData: () => dispatch(getLocationData()),
    setMilestoneData: (data) => dispatch(setMilestoneData(data)),
    saveMileStoneDataNew: (data) => dispatch(saveMileStoneDataNew(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueMilestoneAccordian);
