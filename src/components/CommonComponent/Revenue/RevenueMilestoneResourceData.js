import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
    props.getCocPracticeData();
  }, []);
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
  const [milestoneDetails, setMilestoneDetails] = useState({
    index: props.id,
    milestoneID: props.milestoneId,
  });
  const createDate = (date) => {
    let t = new Date(date);
    let splitDate = date.split("-");
    return `${splitDate[2]}/${month[t.getMonth()]}/${t.getFullYear()}`;
  };

  const updateMilestoneDetails = (params) => {
    const data = { ...milestoneDetails };

    if (params.attrKey) {
      data[params.milestoneDetailsKey] = {
        [params.milestoneDetailsColumn]: params.event.target.value,
        [params.selectedID]:
          params.event.target.selectedOptions[0].getAttribute(params.attrKey),
      };
    } else {
      data[params.milestoneDetailsColumn] = params.event.target.value;
    }
    if (
      params.milestoneDetailsColumn == "resourceStartDate" ||
      params.milestoneDetailsColumn == "resourceEndDate"
    ) {
      data[params.milestoneDetailsColumn] = createDate(
        params.event.target.value
      );
    }
    setMilestoneDetails({
      ...data,
    });
  };
  const addMilestone = () => {
    console.log("resource Details for set resource Data", milestoneDetails);

    props.setRevenueResourceEntriesData(milestoneDetails);
  };

  return (
    <React.Fragment>
      {console.log("milestoneDetails1--->", milestoneDetails)}
      <br></br>
      <table>
        <tr className="trmilestone">
          <td style={{ borderRight: "solid" }}>
            <select
              id="milestoneselect"
              required
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "strategicBusinessUnit",
                  milestoneDetailsColumn: "sbuName",
                  selectedID: "sbuId",
                  attrKey: "data-sbuId",
                });
              }}
            >
              <option value="" disabled selected hidden>
                SBU
              </option>
              {props.sbuData.sbuData &&
                props.sbuData.sbuData.map((obj, id) => (
                  <option data-sbuId={obj.sbuId}>{obj.sbuName}</option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "solid" }}>
            <select
              id="milestoneselect"
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
            >
              <option value="" disabled selected hidden>
                SBU Head
              </option>
              {props.sbuHeadData.sbuHeadData &&
                props.sbuHeadData.sbuHeadData.map((obj, id) => (
                  <option data-sbuHeadId={obj.sbuHeadId}>
                    {obj.sbuHeadName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "solid" }}>
            <select
              id="milestoneselect"
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
            >
              <option value="" disabled selected hidden>
                BU
              </option>
              {props.buData.buData &&
                props.buData.buData.map((obj, id) => (
                  <option data-businessUnitId={obj.businessUnitId}>
                    {obj.businessUnitName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "solid" }}>
            <select
              id="milestoneselect"
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
            >
              <option value="" disabled selected hidden>
                Location
              </option>
              {props.locationData.locationData &&
                props.locationData.locationData.map((obj, id) => (
                  <option data-locationId={obj.locationId}>
                    {obj.locationName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "solid" }}>
            <input
              id="milestoneinput"
              type="text"
              placeholder="Resource Name"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "resourceName",
                });
              }}
            ></input>
          </td>
          <td style={{ borderRight: "solid" }}>
            <input
              id="milestoneinput"
              type="number"
              placeholder="Employee ID"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "employeeId",
                });
              }}
            ></input>
          </td>
          <td style={{ borderRight: "solid" }}>
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
          <td style={{ borderRight: "solid", borderLeft: "solid" }}>
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
        </tr>
      </table>
      <br></br>
      <table style={{ marginLeft: "200px" }}>
        <tr className="trmilestone">
          <td style={{ borderRight: "solid" }}>
            <select
              id="milestoneselect"
              required
              placeholder="CocPractice"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "cocPractice",
                  milestoneDetailsColumn: "cocPracticeName",
                  selectedID: "cocPracticeId",
                  attrKey: "data-cocPracticeId",
                });
              }}
            >
              <option value="" disabled selected hidden>
                CocPractice
              </option>
              {props.cocPracticeData.cocPracticeData &&
                props.cocPracticeData.cocPracticeData.map((obj, id) => (
                  <option data-cocPracticeId={obj.cocPracticeId}>
                    {obj.cocPracticeName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "solid", borderLeft: "solid" }}>
            <input
              id="milestoneinput"
              type="text"
              placeholder="Revenue"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "milestoneResourceRevenue",
                });
              }}
            ></input>
          </td>
          <td style={{ borderRight: "solid" }}>
            <select
              id="milestoneselect"
              required
              placeholder="BusinessType"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "businessType",
                  milestoneDetailsColumn: "businessTypeName",
                  selectedID: "businessTypeId",
                  attrKey: "data-businessTypeId",
                });
              }}
            >
              <option value="" disabled selected hidden>
                BusinessType
              </option>
              {props.businessTypeData.businessTypeData &&
                props.businessTypeData.businessTypeData.map((obj, id) => (
                  <option data-businessTypeId={obj.businessTypeId}>
                    {obj.businessTypeName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "solid" }}>
            <input
              type="text"
              id="milestoneinput"
              placeholder="Allocation %"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "allocation",
                });
              }}
            ></input>
          </td>
          <td>
            <button
              onClick={() => {
                addMilestone();
              }}
            >
              Add Milestone
            </button>
          </td>
        </tr>
      </table>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  console.log("this is the state", state);

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
