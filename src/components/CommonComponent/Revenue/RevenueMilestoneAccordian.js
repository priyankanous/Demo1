import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import * as RiIcons from "react-icons/ri";
import React, { useState } from "react";
const RevenueMilestoneAccordian = (props) => {
  const [inputNumber, setInputNumber] = useState("");

  const [milestoneGridItems, setMilestoneGridItems] = useState([]);
  const handleInputChange = (event) => {
    setInputNumber(event.target.value);
  };

  const generateMilestoneGrid = () => {
    const items = [];
    for (let i = 0; i < inputNumber; i++) {
      items.push(
        <React.Fragment>
          <br></br>
          <table>
            <tr className="trmilestone">
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    SBU
                  </option>
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    SBU Head
                  </option>
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    BU
                  </option>
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select id="milestoneselect" required>
                  <option value="" disabled selected hidden>
                    Location
                  </option>
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
              <td style={{ borderRight: "solid" }}>
                <input
                  id="milestoneinput"
                  type="text"
                  placeholder="Revenue"
                ></input>
              </td>
              <td style={{ borderRight: "solid" }}>
                <select
                  id="milestoneselect"
                  required
                  placeholder="BusinessType"
                >
                  <option value="" disabled selected hidden>
                    BusinessType
                  </option>
                </select>
              </td>
              <td style={{ borderRight: "solid" }}>
                <input
                  type="text"
                  id="milestoneinput"
                  placeholder="Allocation %"
                ></input>
              </td>
            </tr>
          </table>
        </React.Fragment>
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
            Milestones {props.i + 1}
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <table>
            <tr>
              <td>
                <label className="required-field">MilestoneNumber</label>
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
              <td> </td>
              <td>
                <label className="required-field">Milestone Billing Date</label>
                <input type="date"></input>
              </td>
              <td></td>
              <td>
                <label className="required-field">MilestoneRevenue</label>
                <input type="text"></input>
              </td>
              <td></td>
              <td>
                <label className="required-field">ResourceCount</label>
                <input type="text"></input>
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
export default RevenueMilestoneAccordian;
