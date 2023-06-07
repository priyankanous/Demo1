import React, { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { ModalHeading, ModalIcon } from "../../../utils/Value";
import { revenueModalStyleObject } from "../../../utils/constantsValue";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Accordion } from "react-accessible-accordion";
import RevenueEntryForm from "./RevenueEntryForm";
import RevenueResourceAccordian from "./RevenueResourceAccordian";
import RevenueMilestoneAccordian from "./RevenueMilestoneAccordian";
import { connect } from "react-redux";
import { getFinancialYearData } from "../../../actions/financial-year";
import { saveResourceData } from "../../../actions/resource";
import { saveMileStones, saveMilestoneData } from "../../../actions/milestone";
function RevenueEntryScreens(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [gridItems, setGridItems] = useState([]);
  const [tabIndex, setTabIndex] = useState({ index: 0, formData: "" });
  const [resourceData, setResourceData] = useState([]);
  const [pricingType, setPricingType] = useState("T & M");

  useEffect(() => {
    props.getFinacialYearData();
  }, []);

  const handleInputChange = (event) => {
    setInputNumber(event.target.value);
  };
  const onOptionChange = (e) => {
    setPricingType(e.target.value);
  };

  const updateResourceData = (data) => {
    setResourceData(data);
  };
  const [milestones, setMilestones] = useState([]);
  const updateMilestoneData = (data) => {
    // props.saveMileStones(props.milestoneDataNew);
  };
  const generateGrid = () => {
    const items = [];

    if (pricingType == "T & M") {
      for (let i = 0; i < inputNumber; i++) {
        items.push(
          <RevenueResourceAccordian
            id={i}
            formData={tabIndex.formData}
            updateResourceData={updateResourceData}
            pricingType={pricingType}
          />
        );
      }
    } else {
      for (let i = 0; i < inputNumber; i++) {
        items.push(
          <RevenueMilestoneAccordian
            id={i}
            formData={tabIndex.formData}
            pricingType={pricingType}
            updateMilestoneData={updateMilestoneData}
          />
        );
      }
    }

    setGridItems(items);
  };
  const saveResourceDetails = () => {
    props.saveResourceData({
      resourceData: props.resourceData,
      formData: tabIndex.formData,
    });
  };
  const saveEntireMilestoneDetails = () => {
    props.saveMileStones(props.milestoneDataNew);
    props.saveMilestoneData({
      allMilestones: props.milestoneDataNew,
      formData: tabIndex.formData,
    });
  };
  const saveData = () => {
    if (pricingType == "T & M") {
      saveResourceDetails();
      setIsOpen(false);
    } else {
      saveEntireMilestoneDetails();
      setIsOpen(false);
    }
  };
  return (
    <React.Fragment>
      {console.log("This is formData", tabIndex.formData)}
      {console.log("milestones--->", milestones)}
      <div>
        <table>
          <tr className="trrevenue">
            <td style={{ paddingLeft: "10px" }}>
              <a
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <FaIcons.FaPlus />
              </a>
              <a style={{ paddingLeft: "4px" }}>
                <AiIcons.AiFillCopy />
              </a>
              <a style={{ paddingLeft: "4px" }}>
                <AiIcons.AiOutlineEdit />
              </a>
              <a style={{ paddingLeft: "4px" }}>
                <AiIcons.AiOutlineDelete />
              </a>
            </td>
            <td style={{ paddingLeft: "150px" }}>
              <select
                id="revenue-select"
                onChange={(e) => {
                  props.getAllRevenueEntriesForFy(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  Please Choose One
                </option>
                {props.financialYear.financialYear &&
                  props.financialYear.financialYear.map((fyData, index) => {
                    const fyNameData = fyData.financialYearName;
                    return <option key={index}>{fyNameData}</option>;
                  })}
              </select>
            </td>
            <td className="tdrevenue">
              <input type="checkbox" className="revenueinput" />
              <label>Include Additional Quater Display</label>
              <button className="button">Submit</button>
            </td>
          </tr>
        </table>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={revenueModalStyleObject}
          className={"modal-container"}
        >
          <div>
            <div class="main" className="ModalContainer">
              <div class="register">
                <ModalHeading>Setup Entry</ModalHeading>
                <ModalIcon
                  onClick={() => {
                    setIsOpen(false);
                    setGridItems([]);
                  }}
                >
                  <AiOutlineClose></AiOutlineClose>
                </ModalIcon>
                <hr color="#62bdb8"></hr>

                <Tabs
                  selectedIndex={tabIndex.index}
                  onSelect={(index) =>
                    setTabIndex({ ...tabIndex, index: index })
                  }
                >
                  {pricingType == "T & M" && (
                    <TabList>
                      <Tab>Details</Tab>
                      <Tab>Resource Details</Tab>
                    </TabList>
                  )}
                  {pricingType == "FP" && (
                    <TabList>
                      <Tab>Details</Tab>
                      <Tab>Milestone Details</Tab>
                    </TabList>
                  )}

                  <TabPanel>
                    <div>
                      <label for="username">Pricing Type</label>
                      <input
                        type="radio"
                        value="T & M"
                        name="Pricing Type"
                        checked={pricingType === "T & M"}
                        onChange={onOptionChange}
                      />
                      T & M
                      <input
                        type="radio"
                        value="FP"
                        name="Pricing Type"
                        checked={pricingType === "FP"}
                        onChange={onOptionChange}
                      />
                      FP
                    </div>
                    {pricingType == "T & M" && (
                      <RevenueEntryForm
                        setGridItems={setGridItems}
                        setIsOpen={setIsOpen}
                        setTabIndex={setTabIndex}
                        tabIndex={tabIndex}
                        pricingType={pricingType}
                      />
                    )}
                    {pricingType == "FP" && (
                      <RevenueEntryForm
                        setGridItems={setGridItems}
                        setIsOpen={setIsOpen}
                        setTabIndex={setTabIndex}
                        pricingType={pricingType}
                      />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {pricingType == "T & M" && (
                      <label className="required-field" for="username">
                        Resource Count
                      </label>
                    )}
                    {pricingType == "FP" && (
                      <label className="required-field" for="username">
                        Milestone Count
                      </label>
                    )}

                    <label
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="number"
                        value={inputNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Count"
                      />
                      <input
                        style={{
                          margin: "0px 0px 0px 8px",
                        }}
                        type="button"
                        value="Add"
                        id="create-account"
                        class="button"
                        onClick={generateGrid}
                      />
                    </label>
                    <br></br>
                    <Accordion id="accordian">{gridItems}</Accordion>
                    <label
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="button"
                        onClick={() => {
                          saveData();
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="button"
                        onClick={() => {
                          setGridItems([]);
                          setIsOpen(false);
                        }}
                      >
                        Cancel
                      </button>
                    </label>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
          <br></br>
        </Modal>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    financialYear: state.financialYear,
    resourceData: state.resource.resourceData,
    milestoneDataNew: state.milestone.milestoneDataNew,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getFinacialYearData: () => dispatch(getFinancialYearData()),
    saveResourceData: (data) => dispatch(saveResourceData(data)),
    saveMileStones: (data) => dispatch(saveMileStones(data)),
    saveMilestoneData: (data) => dispatch(saveMilestoneData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevenueEntryScreens);
