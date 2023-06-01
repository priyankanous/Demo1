import React, { useEffect } from "react";
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

const RevenueResourceAccordian = (props) => {
  useEffect(() => {
    props.getSbuData();
    props.getBuData();
    props.getBusinessTypeData();
    props.getSbuHeadData();
    props.getLocationData();
    props.getCocPracticeData();
  }, []);
  return (
    <React.Fragment>
      {console.log("this is form data in resouce accordian", props.formData)}
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
            Resources {props.i + 1}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <br></br>
          <table>
            <tr className="trmilestone">
              <td style={{ borderRight: "solid", borderLeft: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    SBU
                  </option>
                  {props.sbuData.sbuData &&
                    props.sbuData.sbuData.map((obj, id) => (
                      <option>{obj.sbuName}</option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    SBU Head
                  </option>
                  {props.sbuHeadData.sbuHeadData &&
                    props.sbuHeadData.sbuHeadData.map((obj, id) => (
                      <option>{obj.sbuHeadName}</option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    BU
                  </option>
                  {props.buData.buData &&
                    props.buData.buData.map((obj, id) => (
                      <option>{obj.businessUnitName}</option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    Location
                  </option>
                  {props.locationData.locationData &&
                    props.locationData.locationData.map((obj, id) => (
                      <option>{obj.locationName}</option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <input
                  id="milestoneinput"
                  type="text"
                  placeholder="Resource Name"
                ></input>
              </td>
              <td style={{ borderRight: "solid" }}>
                <input
                  id="milestoneinput"
                  type="number"
                  placeholder="Employee ID"
                ></input>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    Start Date
                  </option>
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
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
                >
                  <option value="" disabled selected hidden>
                    BusinessType
                  </option>
                  {props.businessTypeData.businessTypeData &&
                    props.businessTypeData.businessTypeData.map((obj, id) => (
                      <option>{obj.businessTypeName}</option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid", borderLeft: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  placeholder="BusinessType"
                >
                  <option value="" disabled selected hidden>
                    CoC Practice
                  </option>
                  {props.cocPracticeData.cocPracticeData &&
                    props.cocPracticeData.cocPracticeData.map((obj, id) => (
                      <option>{obj.cocPracticeName}</option>
                    ))}
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <input
                  type="text"
                  id="resourceinput"
                  placeholder="Billing Rate Type"
                ></input>
              </td>
              <td style={{ borderRight: "solid" }}>
                <input
                  type="text"
                  id="resourceinput"
                  placeholder="Billing Rate"
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
                ></input>
              </td>
              <td style={{ borderRight: "solid" }}>
                <input
                  type="text"
                  id="resourceinput"
                  placeholder="Allocation %"
                ></input>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueResourceAccordian);
