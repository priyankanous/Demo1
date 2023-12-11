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
  const { milestoneData, updateMilestoneData, id } = props;
  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
  }, []);
  const [inputNumber, setInputNumber] = useState("");

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


  const generateMilestoneGrid = (inputNumber) => {
    const dataArr = [...milestoneData];
    const data = dataArr[id];
    const items = [];
    const tempRevenueResourceItems = [];
    for (let i = 0; i < inputNumber; i++) {
      tempRevenueResourceItems.push({
        revenueResourceEntryId: i,
      });
      items.push(
        <RevenueMilestoneResourceData
          updateMilestoneData={updateMilestoneData}
          milestoneData={milestoneData}
          id={i}
          // setMilestoneData1={setMilestoneData1}
          milestoneId={props.id}
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
                      borderRadius: "0px !important",
                      height: "35px",
                      // marginTop: "-15px",
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
                      borderRadius: "0px !important",
                      height: "35px",
                      // marginTop: "-15px",
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
                  <span>M{props.id + 1} Revenue</span>
                </div>
                <div style={{ width: "187px" }}>
                  <InputField
                    style={{
                      background: "white",
                      width: "187Px",
                      marginLeft: "8px",
                      borderRadius: "0px !important",
                      height: "35px",
                      // marginTop: "-15px",
                    }}
                    size="small"
                    type="text"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
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
                      borderRadius: "0px !important",
                      height: "35px",
                      // marginTop: "-15px",
                    }}
                    size="small"
                    type="number"
                    id="name"
                    variant="outlined"
                    spellcheck="false"
                    value={inputNumber}
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
