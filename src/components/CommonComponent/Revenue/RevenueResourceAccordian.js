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
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const RevenueResourceAccordian = (props) => {
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

  const updateResourceDetails = async (params) => {
    const dataArr = [...resourceData];
    const data = dataArr[id];
    console.log("update Data Obj at", id, data, dataArr);
    data[params?.resourseDetailsColumn] = params?.event?.target?.value;
    if (params.attrKey) {
      data[params?.selectedID] =
        params?.event?.target?.selectedOptions[0]?.getAttribute(
          params?.attrKey
        );
    }
    if (params?.attrKey == "data-locationId") {
      const response = await axios.get(
        `${apiV1}/location/${props?.formData?.financialYear?.financialYearName}/${params?.event?.target?.value}`
      );
      console.log("THE MANINNNN GLLF", response?.data?.data);
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
    dataArr[id] = data;
    console.log(dataArr, "After update", updateResourceData);
    updateResourceData(dataArr);
  };

  const createDate = (date) => {
    let t = new Date(date);
    let splitDate = date.split("-");
    return `${splitDate[2]}/${month[t.getMonth()]}/${t.getFullYear()}`;
  };

  // const addResource = () => {
  //   console.log("resource Details for set resource Data", resourseDetails);
  //   props.updateResourceData(resourseDetails, id);
  // };

  return (
    <React.Fragment>
      <br></br>
      <AccordionItem id="accordianItem">
        <AccordionItemHeading id="accordianItemHeading">
          <AccordionItemButton
            style={{
              marginTop: "6px",
            }}
          >
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
                  <RiIcons.RiArrowDownSFill />
                  <span>Resources {id + 1} Details </span>
                  <FileCopyOutlinedIcon
                    style={{ marginRight: "5px", alignfontSize: "large" }}
                  />
                  <EditOutlinedIcon style={{ alignfontSize: "large" }} />
                  <DeleteOutlineIcon style={{ alignfontSize: "large" }} />
                </div>
              </div>
            </div>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <br></br>
          <table>
            <tr className="trmilestone">
              <td style={{ borderRight: "solid 1px", borderLeft: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "sbuName",
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
              <td style={{ borderRight: "solid 1px" }}>
                <select
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
              <td style={{ borderRight: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "buisnessUnitName",
                      selectedID: "buisnessUnitId",
                      attrKey: "data-buisnessUnitId",
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    BU
                  </option>
                  {props.buData.buData &&
                    props.buData.buData.map((obj, id) => (
                      <option data-buisnessUnitId={obj.businessUnitId}>
                        {obj.businessUnitName}
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
                      resourseDetailsColumn: "locationName",
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
              <td style={{ borderRight: "solid 1px" }}>
                <input
                  id="milestoneinput"
                  type="text"
                  placeholder="Resource Name"
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
                  id="milestoneinput"
                  type="number"
                  placeholder="Employee ID"
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
                  id="milestoneselect"
                  type="date"
                  required
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
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "endDate",
                    });
                  }}
                />
              </td>
            </tr>
            <br></br>
          </table>
          <table style={{ marginLeft: "110px" }}>
            <tr className="trmilestone">
              <td style={{ borderRight: "solid 1px", borderLeft: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  placeholder="BusinessType"
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "businessTypeName",
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
              <td style={{ borderRight: "solid 1px", borderLeft: "solid 1px" }}>
                <select
                  id="milestoneselect"
                  required
                  placeholder="BusinessType"
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "cocPracticeName",
                      selectedID: "cocPracticeId",
                      attrKey: "data-cocPracticeId",
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    CoC Practice
                  </option>
                  {props.cocPracticeData.cocPracticeData &&
                    props.cocPracticeData.cocPracticeData.map((obj, id) => (
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
                >
                  <option value="" disabled selected hidden>
                    Billing Rate Type
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
                  placeholder="Billing Rate"
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "billingRate",
                    });
                  }}
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
                  placeholder="Leave Loss Factor"
                  value={resourceData[id]?.leaveLossFactor}
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "leaveLossFactor",
                    });
                  }}
                ></input>
              </td>
              <td style={{ borderRight: "solid 1px" }}>
                <input
                  type="text"
                  id="resourceinput"
                  placeholder="Allocation %"
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "allocation",
                    });
                  }}
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
