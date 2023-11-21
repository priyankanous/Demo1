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
  const { milestoneData, id, updateMilestoneData, milestoneId } = props;
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

  const createDate = (date) => {
    let t = new Date(date);
    let splitDate = date.split("-");
    return `${splitDate[2]}/${month[t.getMonth()]}/${t.getFullYear()}`;
  };

  console.log("dddddd", props.cocPracticeData)


  const updateMilestoneDetails = (params) => {
    const dataArr = [...milestoneData[milestoneId]?.revenueResourceEntries];
    const data = dataArr[id];
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
    dataArr[id] = data;
    const temp = [...milestoneData]
    temp[milestoneId]["revenueResourceEntries"] = dataArr
    console.log('Milestone Data After Updation', temp)
    updateMilestoneData(temp);
  };

 console.log("milestone", milestoneData)

  return (
    <React.Fragment>
      
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
          <td
            style={{
              textAlign: "left",
              fontWeight: "400",
              fontSize: "14px",
              color: "#525252",
            }}
          >
            Revenue
          </td>
          
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
            Coc Pratice
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
        <tr className="trmilestone" style={{ background: "white", border:"1px solid #898282" }}>
          <div >
          <td style={{borderRight:"1px solid #898282"}}>
            <select
              // id="milestoneselect"
              required
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsKey: "strategicBusinessUnit",
                  milestoneDetailsColumn: "sbuName",
                  selectedID: "sbuId",
                  attrKey: "data-sbuId",
                })
              }}
              style={{
                width:"50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px" }}
            >
              <option value="" disabled selected hidden>
                
              </option>
              {props.sbuData.sbuData &&
                props.sbuData.sbuData.map((obj, id) => (
                  <option data-sbuId={obj.sbuId}>{obj.sbuName}</option>
                ))}
            </select>
          </td>
          </div>
          <td style={{ borderRight: "1px solid #898282" }}>
            <select
              // id="milestoneselect"
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
                width:"50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px" }}

            >
              <option value="" disabled selected hidden></option>
              {props.sbuHeadData.sbuHeadData &&
                props.sbuHeadData.sbuHeadData.map((obj, id) => (
                  <option data-sbuHeadId={obj.sbuHeadId}>
                    {obj.sbuHeadName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "1px solid #898282" }}>
            <select
              // id="milestoneselect"
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
                width:"50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px" }}
              
            >
              <option value="" disabled selected hidden></option>
              {props.buData.buData &&
                props.buData.buData.map((obj, id) => (
                  <option data-businessUnitId={obj.businessUnitId}>
                    {obj.businessUnitName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "1px solid #898282" }}>
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
                width:"50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px" }}
            >
              <option value="" disabled selected hidden></option>
              {props.locationData.locationData &&
                props.locationData.locationData.map((obj, id) => (
                  <option data-locationId={obj.locationId}>
                    {obj.locationName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "1px solid #898282" }}>
            <input
              id="milestoneinput"
              type="text"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "resourceName",
                });
              }}
            ></input>
          </td>
          <td style={{ borderRight: "1px solid #898282" }}>
            <input
              id="milestoneinput"
              type="number"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "employeeId",
                });
              }}
            ></input>
          </td>
          <td style={{ borderRight: "1px solid #898282" }}>
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
          <td style={{ borderRight: "1px solid #898282" }}>
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

          <td style={{ borderRight: "1px solid #898282" }}>
            <input
              id="milestoneinput"
              type="text"
              onChange={(e) => {
                updateMilestoneDetails({
                  event: e,
                  milestoneDetailsColumn: "milestoneResourceRevenue",
                });
              }}
            ></input>
          </td>
          <td style={{ borderRight: "1px solid #898282" }}>
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
                width:"50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px" }}
            >
              <option value="" disabled selected hidden></option>
              {props.businessTypeData.businessTypeData &&
                props.businessTypeData.businessTypeData.map((obj, id) => (
                  <option data-businessTypeId={obj.businessTypeId}>
                    {obj.businessTypeName}
                  </option>
                ))}
            </select>
          </td>
          <td style={{ borderRight: "1px solid #898282" }}>
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
                width:"50px",
                backgroundColor: "white",
                borderRadius: "0px",
                boxShadow: "0px 0px 0px 0px",
                padding: "0px" }}

            >
              <option value="" disabled selected hidden></option>
              {props.cocPracticeData.cocPracticeData &&
                props.cocPracticeData.cocPracticeData.map((obj, id) => (
                  <option data-cocPracticeId={obj.cocPracticeId}>
                    {obj.cocPracticeName}
                  </option>
                ))}
            </select>
          </td>
          <td>
            <input
              type="text"
              id="milestoneinput"
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
