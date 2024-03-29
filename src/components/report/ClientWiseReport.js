import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Label, Tooltip, Legend } from "recharts";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Typography, Modal, styled, Button } from "@mui/material";
import { getRegionData } from "../../actions/region";
import { getBuData } from "../../actions/bu";
import { getSbuHeadData } from "../../actions/sbuHead";
import { getSbuData } from "../../actions/sbu";
import { getLocationData } from "../../actions/locaion";
import { getAccountData } from "../../actions/account";
import { getBdmData } from "../../actions/bdm";
import { getBusinessTypeData } from "../../actions/businessType";
import { getProbabilityData } from "../../actions/probability";
import { getFinancialYearData } from "../../actions/financial-year";
import {
  ReportSearchModalBox,
  SearchModalButton,
  ReportSearchHeading,
  ReportSearchButtonSection,
  ReportModalCancelButton,
  ReportModalApplyButton,
  searchModalTitle,
  OutputTypeHEading,
  RadioInput,
  searchModalinnerContainer,
  SelectOptions,
  ReportModalButtonDiv,
  SelectedFYDisplayDiv,
  ReportModalDropDownSection,
  LabelDisplay,
} from "../../utils/constantsValue";
import {
  APPLY_FILTER_HERE,
  FINANCIAL_YEAR,
  REPORT_FILTERS,
  WEEK,
  QUARTERLY,
  MONTHLY,
  OUTPUT_TYPE,
  CHART,
  TABULAR,
  REGION_LABEL,
  BU_LABEL,
  SBU_LABEL,
  SBU_HEAD_LABEL,
  BUSINESS_TYPE_LABEL,
  PROBABILITY_TYPE_LABEL,
  LOCATION_LABEL,
  ACCOUNT_LABEL,
  BDM_LABEL,
  RESET_VIEW,
  APPLY,
} from "../../utils/Constants";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const ButtonTocroll = styled(Button)({
  color: "black",
  background: "transparent",
  border: "transparent",
  padding: "0px",
});



const ClientWiseReport = (props, onBuChange) => {
  //get the current financial year
  function getCurrentFinancialYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    let financialYearStart;

    if (currentMonth >= 3) {
      financialYearStart = currentYear;
    } else {
      financialYearStart = currentYear - 1;
    }
    const financialYearEnd = financialYearStart + 1;
    return `${financialYearStart}-${financialYearEnd}`;
  }
  const currentFinancialYear = getCurrentFinancialYear();

  const [open, setOpen] = useState(false);
  const [viewType, setViewType] = useState("Monthly");
  const [chartType, setChartType] = useState("Chart");
  const [filteredFinancialYear, setFilteredFinancialYear] =
    useState(currentFinancialYear);
  const [buId, setBuId] = useState("");
  const [sbuId, setSbuId] = useState("");
  const [sbuHeadId, setSbuHeadId] = useState("");
  const [businessTypeID, setBusinessTypeID] = useState("");
  const [probabilityId, setProbabilityId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [bdmId, setBdmId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [rhs, setRhs] = useState([]);

  //open and close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const regionHandler = (e) => {
    setRegionId(e.target.value);
  };

  const financialYearHeadHandler = (e) => {
    setFilteredFinancialYear(e.target.value);
  };

  const handleBuChange = (e) => {
    const selectedBuId = e.target.value;
    setBuId(selectedBuId);
    onBuChange(selectedBuId);
  };
  const sbuHeadHandler = (e) => {
    setSbuHeadId(e.target.value);
  };

  const businessTypeHandler = (e) => {
    setBusinessTypeID(e.target.value);
  };
  const probabilityHandler = (e) => {
    setProbabilityId(e.target.value);
  };

  const sbuIdHandler = (e) => {
    setSbuId(e.target.value);
  };

  const locationHandler = (e) => {
    setLocationId(e.target.value);
  };
  const accountHandler = (e) => {
    setAccountId(e.target.value);
  };
  const bdmIdHandler = (e) => {
    setBdmId(e.target.value);
  };

  useEffect(() => {
    // Dispatch the action to get the data
    props.getRegionData();
    props.getBuData();
    props.getSbuHeadData();
    props.getSbuData();
    props.getLocationData();
    props.getAccountData();
    props.getBdmData();
    props.getBusinessTypeData();
    props.getProbabilityData();
    props.getFinancialYearData();
    getReportProbabilityData();
  }, []);

  // chart related states
  const [reportProbabilityData, setReportProbabilityData] = useState([]);
  const [filteredLabel, setFilteredLabel] = useState([]);

  //payload
  const reportData = {
    viewType: viewType,
    outPutType: chartType,
    data: {
      financialYearName: filteredFinancialYear,
      regionId: regionId,
      businessUnitId: buId,
      sbuId: sbuId,
      sbuHeadId: sbuHeadId,
      businessTypeId: businessTypeID,
      probabilityTypeId: probabilityId,
      locationId: locationId,
      accountId: accountId,
      bdmId: bdmId,
    },
  };

  const getReportProbabilityData = async () => {
    var { data } = await axios.post(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/report/clienttype",
      reportData
    );
    setReportProbabilityData(data.data);
    setFilteredLabel(data.data.labels);
  };

  //API response trigger
  const handleApplyButtonClick = () => {
    getReportProbabilityData();
    setOpen(false);
  };

  //reset modal filters
  const handleReset = () => {
    setFilteredFinancialYear("");
    setBuId("");
    setSbuId("");
    setSbuHeadId("");
    setBusinessTypeID("");
    setProbabilityId("");
    setLocationId("");
    setAccountId("");
    setBdmId("");
    setRegionId("");
    setOpen(false);
    setReportProbabilityData([]);
  };

  useEffect(() => {
    if (
      reportProbabilityData?.outDTOList &&
      reportProbabilityData?.outDTOList
    ) {
      const labels = reportProbabilityData?.outDTOList.map(
        (item) => item.label
      );
      setRhs(labels);
    }
  }, [reportProbabilityData?.outDTOList]);

  const label = reportProbabilityData?.labels;

  const outDTOList = reportProbabilityData?.outDTOList;

  const clientOne = outDTOList?.find((item) => item.label === rhs[0])?.data;

  const clientTwo = outDTOList?.find((item) => item.label === rhs[1])?.data;

  const dataList = label?.map((label, index) => ({
    name: label,
    ABCRetailInc: clientOne ? clientOne[index] : 0,
    other: clientOne ? clientTwo[index] : 0,
  }));

  const calculateChartWidth = () => {
    const numItems = dataList ? dataList.length : 0;
    const labelWidth = 80;
    const minWidth = 200;
    const calculatedWidth = Math.max(minWidth, numItems * labelWidth);
    return calculatedWidth;
  };
  const tableHeading = ['April-2023', 'May-2023', 'June-2023', 'July-2023', 'August-2023', 'September-2023', 'October-2023', 'November-2023', 'December-2023', 'January-2024', 'February-2024', 'March-2024']

  const [arrowDisable, setArrowDisable] = useState(true);
  const elementRef = useRef(null);

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <div>
      <div className="report-container">
        <searchModalTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "37px",
          }}
        >
          <ReportModalButtonDiv>
            <FilterAltOutlinedIcon />
            <SearchModalButton onClick={handleOpen}>
              {APPLY_FILTER_HERE}
            </SearchModalButton>
          </ReportModalButtonDiv>
          <div style={{ display: "flex" }}>
          <SelectedFYDisplayDiv>
            <Typography>
              View:
            </Typography>
            <input
                style={{
                  boxShadow: "none",
                  border: "1px solid #0000004d",
                  borderRadius: "6px",
                  background: "transparent",
                  margin: "0px 6px",
                  textAlign: "center",
                }}
                disabled
                // type="text" value={`${viewType} View`}
                // value={`${viewType} View`}
                value={`Client Wise - ${viewType} View`}
              />
          </SelectedFYDisplayDiv>
          <SelectedFYDisplayDiv>
            {filteredFinancialYear ? (
                              <div style={{ display: "flex",alignItems:"center" }}>

              <Typography>
                {FINANCIAL_YEAR} :
              </Typography>
              <input
                    style={{
                      boxShadow: "none",
                      border: "1px solid #0000004d",
                      borderRadius: "6px",
                      background: "transparent",
                      margin: "0px 6px",
                      width: "70px",
                      textAlign: "center",
                    }}
                    value={filteredFinancialYear}
                    disabled

                  />
                  </div>
            ) : (
              ""
            )}
            {/* <Typography>Week :</Typography> */}
          </SelectedFYDisplayDiv>
          {viewType == "Monthly" && (
              <SelectedFYDisplayDiv>
                <Typography>Week :</Typography>
                <input
                  style={{
                    boxShadow: "none",
                    border: "1px solid #0000004d",
                    borderRadius: "6px",
                    background: "transparent",
                    margin: "0px 6px",
                    width: "70px",
                    textAlign: "center",
                  }}
                  // value={2}
                  disabled

                />
              </SelectedFYDisplayDiv>
            )}
            </div>
        </searchModalTitle>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ReportSearchModalBox>
              <div>
                <ReportSearchHeading>{REPORT_FILTERS}: </ReportSearchHeading>
              </div>
              <div style={{ width: "60%", paddingTop: "5px" }}>
                <LabelDisplay>
                  <span>{FINANCIAL_YEAR} :</span>
                </LabelDisplay>
                <select
                  style={{
                    height: "28px",
                    width: "100%",
                    borderRadius: "3px",
                    boxShadow: "none",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    fontWeight: "400",
                    border: "1px solid #00000061",
                  }}
                  onChange={financialYearHeadHandler}
                  value={filteredFinancialYear}
                >
                  <option value="" disabled selected hidden></option>
                  {props?.financialYear?.financialYear &&
                    props.financialYear.financialYear.map((obj, id) => (
                      <option value={obj.financialYearName}>
                        {obj.financialYearName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <RadioInput
                  type="radio"
                  value="Quarterly"
                  name="viewType"
                  onChange={handleViewTypeChange}
                  checked={viewType === "Quarterly"}
                  // style={{ boxShadow: "none", marginTop:"10px", fontSize:"16px", fontWeight:"400", color:"#000000" }}
                />
                {QUARTERLY}
                <br />
                <RadioInput
                  type="radio"
                  value="Monthly"
                  name="viewType"
                  onChange={handleViewTypeChange}
                  checked={viewType === "Monthly"}
                />{" "}
                {MONTHLY}
              </div>
              {viewType == "Monthly" && (
                <div style={{ width: "60%", paddingTop: "5px" }}>
                  <LabelDisplay>
                    <span>{WEEK} :</span>
                  </LabelDisplay>
                  <select
                    style={{
                      height: "28px",
                      width: "100%",
                      borderRadius: "3px",
                      boxShadow: "none",
                      fontFamily: "Roboto",
                      fontSize: "16px",
                      fontWeight: "400",
                      border: "1px solid #00000061",
                    }}
                    onChange={handleBuChange}
                  >
                    <option value="" disabled selected hidden></option>
                  </select>
                </div>
              )}
              <div>
                <OutputTypeHEading>{OUTPUT_TYPE}: </OutputTypeHEading>
              </div>
              <div>
                <RadioInput
                  type="radio"
                  value="Chart"
                  name="chartType"
                  defaultChecked
                  onChange={handleChartTypeChange}
                  checked={chartType === "Chart"}

                />{" "}
                {CHART}
                <RadioInput
                  type="radio"
                  value="Tabular"
                  name="chartType"
                  onChange={handleChartTypeChange}
                  checked={chartType === "Tabular"}

                />{" "}
                {TABULAR}
              </div>
              <div
                className="searchFilterInnerContainer"
                style={{
                  paddingRight: "15px",
                  height: "170px",
                  overflowY: "auto",
                  paddingTop: "10px",
                }}
              >
                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{REGION_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={regionHandler}>
                    <option value="" disabled selected hidden></option>
                    {props.regionData.regionData &&
                      props.regionData.regionData.map((obj, id) => (
                        <option value={obj.regionId}>{obj.regionName}</option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{BU_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={handleBuChange}>
                    <option value="" disabled selected hidden></option>
                    {props?.buData?.buData &&
                      props.buData.buData.map((obj, id) => (
                        <option value={obj.businessUnitId}>
                          {obj.businessUnitName}
                        </option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{SBU_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={sbuIdHandler}>
                    <option value="" disabled selected hidden></option>
                    {props.sbuData.sbuData &&
                      props.sbuData.sbuData.map((obj, id) => (
                        <option value={obj.sbuId}>{obj.sbuName}</option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{SBU_HEAD_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={sbuHeadHandler}>
                    <option value="" disabled selected hidden></option>
                    {props.sbuHeadData.sbuHeadData &&
                      props.sbuHeadData.sbuHeadData.map((obj, id) => (
                        <option value={obj.sbuHeadId}>{obj.sbuHeadName}</option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{BUSINESS_TYPE_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={businessTypeHandler}>
                    <option value="" disabled selected hidden></option>
                    {props.businessTypeData.businessTypeData &&
                      props.businessTypeData.businessTypeData.map((obj, id) => (
                        <option value={obj.businessTypeId}>
                          {obj.businessTypeDisplayName}
                        </option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{PROBABILITY_TYPE_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={probabilityHandler}>
                    <option value="" disabled selected hidden></option>
                    {props.probabilityData.probabilityData &&
                      props.probabilityData.probabilityData.map((obj, id) => (
                        <option value={obj.probabilityTypeId}>
                          {obj.probabilityTypeName}
                        </option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{LOCATION_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={locationHandler}>
                    <option value="" disabled selected hidden></option>
                    {props.locationData.locationData &&
                      props.locationData.locationData.map((obj, id) => (
                        <option value={obj.locationId}>
                          {obj.locationName}
                        </option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{ACCOUNT_LABEL} :</span>
                    <SelectOptions name="accountId" onChange={accountHandler}>
                      <option value="" disabled selected hidden></option>
                      {props.accountData.accountData &&
                        props.accountData.accountData.map((obj, id) => (
                          <option value={obj.accountId}>
                            {obj.accountName}
                          </option>
                        ))}
                    </SelectOptions>
                  </LabelDisplay>
                </ReportModalDropDownSection>

                <ReportModalDropDownSection>
                  <LabelDisplay>
                    <span>{BDM_LABEL} :</span>
                  </LabelDisplay>
                  <SelectOptions onChange={bdmIdHandler}>
                    <option value="" disabled selected hidden></option>
                    {props.bdmData.bdmData &&
                      props.bdmData.bdmData.map((obj, id) => (
                        <option value={obj.bdmId}>{obj.bdmName}</option>
                      ))}
                  </SelectOptions>
                </ReportModalDropDownSection>
              </div>

              <ReportSearchButtonSection>
                <ReportModalCancelButton
                  type="button"
                  variant="contained"
                  value="Cancel"
                  id="create-account"
                  onClick={handleReset}
                >
                  {RESET_VIEW}
                </ReportModalCancelButton>
                <ReportModalApplyButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={handleApplyButtonClick}
                >
                  {APPLY}
                </ReportModalApplyButton>
              </ReportSearchButtonSection>
            </ReportSearchModalBox>
          </Modal>
        </div>
      </div>

      <div style={{ marginLeft: "250px" }}>
{chartType === "Chart" ? (
<div>
        {filteredFinancialYear !== "" && filteredFinancialYear !== "0" && (
          <div>
            <div
              className="searchFilterInnerContainer"
              style={{ width: "98%", overflowX: "auto", overflowY: "hidden" }}
            >
              <BarChart
                width={calculateChartWidth()}
                height={400}
                style={{ marginTop: "30px" }}
                data={dataList}
                margin={{
                  top: 30,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  style={{ fontSize: "9px" }}
                  dataKey="name"
                  interval={0}
                />
                <YAxis style={{ fontSize: "9px" }} interval={0}>
                  <Label
                    value="Revenue"
                    position="insideLeft"
                    angle={-90}
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip
                  formatter={(value, name, props) => ["$" + value, name]}
                />
                <Legend />
                <Bar dataKey="ABCRetailInc" stackId="a" fill="#E8BCB9" />
                <Bar
                  dataKey={rhs[1]}
                  stackId="a"
                  fill="#5C8374"
                  label={{
                    position: "top",
                    formatter: (value) => {
                      const formattedValue =
                        value !== 0 ? `$${(value / 1000).toFixed(0)}k` : null;
                      return formattedValue;
                    },
                  }}
                />
              </BarChart>
            </div>
          </div>
        )}
      </div>
):(
  <div
  style={{ marginTop:"60px", position: "relative", overflow: "hidden", paddingBottom: "8px", width:"97%" }}
>
<div
        style={{
          display: "flex",
          justifyContent: "space-between",
          // marginTop: "10px",
        }}
      >
        <ButtonTocroll
          onClick={() => {
            handleHorizantalScroll(elementRef.current, 25, 100, -10);
          }}
          disabled={arrowDisable}
        >
          <KeyboardDoubleArrowLeftIcon />
        </ButtonTocroll>
        <ButtonTocroll
          onClick={() => {
            handleHorizantalScroll(elementRef.current, 25, 100, 10);
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </ButtonTocroll> 
        </div>
      <div> 
      <TableContainer
          component={Paper}
          style={{ overflow: "hidden", margin: "0px 0px 0px 20px", width:"97%", 
          // boxShadow:"1px 1px 5px 0px rgba(0, 0, 0, 0.3)" 
        boxShadow:"none"
        }}
          ref={elementRef}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{backgroundColor:"rgba(225, 222, 222, 0.5)"}}>
                <TableCell style={{ whiteSpace: 'nowrap',textAlign:"center" }}>Probability</TableCell>
                {tableHeading.map((heading, index) => (
                  <TableCell style={{ padding: "0px 15px", whiteSpace: 'nowrap' }} key={index}>
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow style={{backgroundColor:"transparent"}}>
            <TableCell>confirmed</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
            </TableRow>

            <TableRow style={{backgroundColor:"transparent"}}>
            <TableCell>Expected</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
            </TableRow>
            <TableRow style={{backgroundColor:"transparent"}}>
            <TableCell>Upside</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
              <TableCell>126</TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </TableContainer>



    </div>
    </div>
)}
</div>
</div>
  );
};

const mapStateToProps = (state) => {
  return {
    regionData: state.regionData,
    buData: state.buData,
    sbuHeadData: state.sbuHeadData,
    sbuData: state.sbuData,
    locationData: state.locationData,
    accountData: state.accountData,
    bdmData: state.bdmData,
    businessTypeData: state.businessTypeData,
    probabilityData: state.probabilityData,
    financialYear: state.financialYear,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRegionData: () => dispatch(getRegionData()),
    getBuData: () => dispatch(getBuData()),
    getSbuHeadData: () => dispatch(getSbuHeadData()),
    getSbuData: () => dispatch(getSbuData()),
    getLocationData: () => dispatch(getLocationData()),
    getAccountData: () => dispatch(getAccountData()),
    getBdmData: () => dispatch(getBdmData()),
    getBusinessTypeData: () => dispatch(getBusinessTypeData()),
    getProbabilityData: () => dispatch(getProbabilityData()),
    getFinancialYearData: () => dispatch(getFinancialYearData()),
    //   getReportData: (data) => dispatch(getReportData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClientWiseReport);
