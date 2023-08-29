import React, { useEffect, useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Modal, Box } from "@mui/material";
import { ModalHeading, ModalIcon } from "../../../utils/Value";
import {
  TableRowSection,
  TableCellSection,
  ModalHeadingSection,
  ModalHeadingText,
  ModalDetailSection,
  InputTextLabel,
  InputField,
  ButtonSection,
  ModalControlButton,
  MoadalStyle,
  revenueModalStyleObject,
} from "../../../utils/constantsValue";
import CloseIcon from "@mui/icons-material/Close";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import RevenueEntryForm from "./RevenueEntryForm";

import { connect } from "react-redux";
import { getFinancialYearData } from "../../../actions/financial-year";
import { saveResourceData } from "../../../actions/resource";
import { saveMileStones, saveMilestoneData } from "../../../actions/milestone";
import AddIcon from "@mui/icons-material/Add";
import { Checkbox } from "@mui/material";
import { Button, Typography, styled } from "@mui/material";

const TableButtons = styled(Button)({
  background: "#1E4482",
  marginRight: "5px",
  marginLeft: "10px",
  color: "#FFFFFF",
  fontSize: "12px",
  padding: "0px 10px",
  height: "24px",
  // marginTop: "6px",
  "&:hover": {
    backgroundColor: "#1E4482",
  },
});

function RevenueEntryScreens(props) {
  useEffect(() => {
    props.getFinacialYearData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState({ index: 0, formData: "" });

  const handleModalClose = () => {
    setIsOpen(false);
    setTabIndex({ index: 0, formData: "" });
    // setSelectedFile(null);
  };

  return (
    <React.Fragment>
      <div>
        <table>
          <tr
            className="trrevenue"
            style={{ backgroundColor: "rgba(225, 222, 222, 0.5)" }}
          >
            <td style={{ textAlign: "left", width: "10px", padding:"0px" }}>
              <Checkbox size="small" />
            </td>
            <td style={{ textAlign: "left", padding:"0px" }}>
              <a
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                {/* <FaIcons.FaPlus /> */}
                <AddIcon />
              </a>
            </td>
            <td style={{  padding:"0px 0px 0px 200px" }}>
              <select
                style={{
                  height: "24px",
                  width: "90%",
                  borderRadius: "7px",
                  boxShadow: "none",
                }}
                id="revenue-select"
                onChange={(e) => {
                  props.getAllRevenueEntriesForFy(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  Select Financial Year
                </option>
                {props.financialYear.financialYear &&
                  props.financialYear.financialYear.map((fyData, index) => {
                    const fyNameData = fyData.financialYearName;
                    return <option key={index}>{fyNameData}</option>;
                  })}
              </select>
            </td>
            <td className="tdrevenue" style={{padding:"0px"}}>
              <Checkbox size="small"/>
              {/* <input type="checkbox" className="revenueinput" /> */}
              <label>Include Additional Quater Display</label>
              <TableButtons>Submit</TableButtons>
            </td>
          </tr>
        </table>
        <Modal open={isOpen} onClose={handleModalClose}>
          <Box
            sx={MoadalStyle}
            style={{
              width: "80%",
              height: "max-content",
              borderRadius: "0px",
            }}
          >
            <ModalHeadingSection
              style={{ backgroundColor: "lightgray", borderRadius: "0Px" }}
            >
              <ModalHeadingText
                style={{ fontStyle: "normal", fontWeight: "200" }}
              >
                New Entry
              </ModalHeadingText>
              <CloseIcon
                onClick={() => {
                  setIsOpen(false);
                }}
                style={{ cursor: "pointer" }}
              />
            </ModalHeadingSection>
            <RevenueEntryForm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              {...props}
            />
          </Box>
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
