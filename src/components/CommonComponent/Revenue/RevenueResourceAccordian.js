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

const RevenueResourceAccordian = (props) => {
  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
    props.getCocPracticeData();
  }, []);
  const [resourseDetails, setResourseDetails] = useState({ index: props.id });
  const updateResourceDetails = (params) => {
    const data = { ...resourseDetails };
    data[params.resourseDetailsColumn] = params.event.target.value;
    data[params.selectedID] = params.attrKey;
    setResourseDetails({
      ...data,
    });
  };
  const addResource = () => {
    props.setResourceData(resourseDetails);
  };
  return (
    <React.Fragment>
      {console.log("this is form data in resouce accordian", props.formData)}
      {console.log("resoufrce--->", props.resource)}
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
            Resources {props.id + 1}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <br></br>
          <table>
            <tr className="trmilestone">
              <td style={{ borderRight: "solid", borderLeft: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    const selectedsbuId =
                      e.target.selectedOptions[0].getAttribute("data-sbuId");
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "sbuName",
                      selectedID: "sbuId",
                      attrKey: selectedsbuId,
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
                    const selectedsbuHeadId =
                      e.target.selectedOptions[0].getAttribute(
                        "data-sbuHeadId"
                      );
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "sbuHeadName",
                      selectedID: "sbuHeadId",
                      attrKey: selectedsbuHeadId,
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
                    const selectedbuisnessUnitId =
                      e.target.selectedOptions[0].getAttribute(
                        "data-buisnessUnitId"
                      );
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "buisnessUnitName",
                      selectedID: "buisnessUnitId",
                      attrKey: selectedbuisnessUnitId,
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
              <td style={{ borderRight: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    const selectedLocationId =
                      e.target.selectedOptions[0].getAttribute(
                        "data-locationId"
                      );
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "locationName",
                      selectedID: "locationId",
                      attrKey: selectedLocationId,
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
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "resourceName",
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
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "employeeID",
                    });
                  }}
                ></input>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "startDate",
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Start Date
                  </option>
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "endDate",
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    End Date
                  </option>
                </select>
              </td>
            </tr>
            <br></br>
          </table>
          <table style={{ marginLeft: "110px" }}>
            <tr className="trmilestone">
              <td style={{ borderRight: "solid", borderLeft: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  placeholder="BusinessType"
                  onChange={(e) => {
                    const selectedBusinessTypeId =
                      e.target.selectedOptions[0].getAttribute(
                        "data-businessTypeId"
                      );
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "businessTypeName",
                      selectedID: "businessTypeId",
                      attrKey: selectedBusinessTypeId,
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
              <td style={{ borderRight: "solid", borderLeft: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  placeholder="BusinessType"
                  onChange={(e) => {
                    const selectedCocPracticeId =
                      e.target.selectedOptions[0].getAttribute(
                        "data-cocPracticeId"
                      );
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "cocPracticeName",
                      selectedID: "cocPracticeId",
                      attrKey: selectedCocPracticeId,
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
              <td style={{ borderRight: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  placeholder="BusinessType"
                  onChange={(e) => {}}
                >
                  <option value="" disabled selected hidden>
                    Billing Rate Type
                  </option>
                  <option>Common</option>
                  <option>Resource Level</option>
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
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
                  borderRight: "solid",
                }}
              >
                <input
                  id="resourceinput"
                  type="text"
                  placeholder="Leave Loss Factor"
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "leaveLossFactor",
                    });
                  }}
                ></input>
              </td>
              <td style={{ borderRight: "solid" }}>
                <input
                  type="text"
                  id="resourceinput"
                  placeholder="Allocation %"
                  onChange={(e) => {
                    updateResourceDetails({
                      event: e,
                      resourseDetailsColumn: "allocationPercent",
                    });
                  }}
                ></input>
              </td>
              <td>
                <button
                  onClick={() => {
                    addResource();
                  }}
                >
                  Add Resource
                </button>
              </td>
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

//Welcome01HM*
