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
import { apiV1 } from "../../../utils/constantsValue";
import RevenueMilestoneResourceData from "./RevenueMilestoneResourceData";

const RevenueMilestoneAccordian = (props) => {
  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
  }, []);
  const [inputNumber, setInputNumber] = useState("");

  const [milestoneGridItems, setMilestoneGridItems] = useState([]);
  const handleInputChange = (event) => {
    setInputNumber(event.target.value);
  };

  const [milestoneDetails, setMilestoneDetails] = useState({});

  const updateMilestoneDetails = (params) => {
    const data = { ...milestoneDetails };
    data[params.milestoneDetailsColumn] = params.event.target.value;
    if (params.attrKey) {
      data[params.selectedID] =
        params.event.target.selectedOptions[0].getAttribute(params.attrKey);
    }
    setMilestoneDetails({
      ...data,
    });
  };

  const [milestones, setMilestonesData] = useState([]);

  const saveOneMilestoneData = () => {
    const mileStoneData = {
      milestoneResourceCount: inputNumber,
      milestoneNumber: props.id + 1,
      milestoneRevenue: milestoneDetails.milestoneRevenue,
      milestoneBillingDate: milestoneDetails.milestoneBillingDate,
      revenueResourceEntries: props.revenueResourceEntries.filter(
        (revenueResourceEntry) => {
          return revenueResourceEntry.milestoneID == props.id + 1;
        }
      ),
    };
    props.saveMileStoneDataNew(mileStoneData);
  };
  const [revenueResourceEntries1, setRevenueResourceEntries] = useState([]);
  const setMilestoneData1 = (data) => {
    setRevenueResourceEntries([...revenueResourceEntries1, data]);
  };
  const generateMilestoneGrid = () => {
    const items = [];
    for (let i = 0; i < inputNumber; i++) {
      items.push(
        <RevenueMilestoneResourceData
          id={i}
          setMilestoneData1={setMilestoneData1}
          milestoneId={props.id + 1}
        />
      );
    }

    setMilestoneGridItems(items);
    console.log(
      "in the  generateMilestoneGrid@@@@@@@@@@@@@@@@@@@@",
      milestoneGridItems
    );
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
          <table>
            <tr>
              <td>
                <label className="required-field">MilestoneNumber</label>
                <input
                  type="text"
                  value={props.id + 1}
                  onChange={(e) => {
                    updateMilestoneDetails({
                      event: e,
                      milestoneDetailsColumn: "milestoneNumber",
                    });
                  }}
                ></input>
              </td>

              <td> </td>
              <td>
                <label className="required-field">Milestone Billing Date</label>
                <input type="date"></input>
              </td>
              <td></td>
              <td>
                <label className="required-field">MilestoneRevenue</label>
                <input
                  type="text"
                  onChange={(e) => {
                    updateMilestoneDetails({
                      event: e,
                      milestoneDetailsColumn: "milestoneRevenue",
                    });
                  }}
                ></input>
              </td>
              <td></td>
              <td>
                <label className="required-field">MilestoneCount</label>
                <input
                  type="text"
                  value={inputNumber}
                  onChange={handleInputChange}
                ></input>
              </td>
              <td style={{ alignContent: "center" }}>
                <button className="button" onClick={generateMilestoneGrid}>
                  Add
                </button>
              </td>
              <td style={{ alignContent: "center" }}>
                <button className="button" onClick={saveOneMilestoneData}>
                  Save
                </button>
              </td>
            </tr>
          </table>
          <br></br>
          {milestoneGridItems}
        </AccordionItemPanel>
      </AccordionItem>
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
