import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Typography, styled } from "@mui/material";
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
import { ReportSearchModalBox, SearchModalButton, ReportSearchHeading,
  ReportSearchButtonSection,
  ReportModalCancelButton,
  ReportModalApplyButton,
  searchModalTitle,
  OutputTypeHEading,
  RadioInput,
  searchModalinnerContainer,
  SelectedFYDisplayDiv
} from "../../utils/constantsValue";

const RegionWiseReport = (props, onBuChange) => {

  //get the current financial year
  function getCurrentFinancialYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // January is 0
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


  //to open the search model
  const [open, setOpen] = useState(false);

  //to set the chart type
  const [viewType, setViewType] = useState("Monthly");
  const [chartType, setChartType] = useState("Tabular");

  const [filteredFinancialYear, setFilteredFinancialYear] = useState(currentFinancialYear);
  const [buId, setBuId] = useState("");
  const [sbuId, setSbuId] = useState("");
  const [sbuHeadId, setSbuHeadId] = useState("");
  const [businessTypeID, setBusinessTypeID] = useState("");
  const [probabilityId, setProbabilityId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [bdmId, setBdmId] = useState("");
  const [accountId, setAccountId] = useState("");
  // const [regionId, setRegionId] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  //   const regionHandler = (e) => {
  // 	setRegionId(e.target.value);
  //   }

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
    // Dispatch the action to get region data when the component mounts
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
    getReportRegionData();
  }, []);


  // chart related

  const [responseData, setResponseData] = useState(null);
  const [reportRegionData, setReportRegionData] = useState([]);
  const [filteredLabel, setFilteredLabel] = useState([]);

  const label = reportRegionData?.labels;
  const outDTOList = reportRegionData?.outDTOList;

  console.log("outDTOList", outDTOList)
  const naData = outDTOList?.find((item) => item.label === "NA")?.data;
  const euData = outDTOList?.find((item) => item.label === "EU")?.data;
  const apacData = outDTOList?.find((item) => item.label === "APAC")?.data;

  const dataList = label?.map((labels, index) => ({
    name: labels,
    // NA: Math.random() * 5000,
    NA: naData ? naData[index] : 0,
    EU: euData ? euData[index] : 0,
    APAC: apacData ? apacData[index] : 0,
    // EU: Math.random() * 5000,
    // APAC: Math.random() * 5000,
  }));

  const reportData = {
    viewType: viewType,
    data: {
      // financialYearName: "2023-2024",
      financialYearName: filteredFinancialYear,
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

  const getReportRegionData = async () => {
    var { data } = await axios.post(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/report/region",
      reportData
    );
    setReportRegionData(data.data);
    setFilteredLabel(data.data.labels);
  };

  const handleApplyButtonClick = () => {
    getReportRegionData();
    setOpen(false);
  };

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
    setOpen(false);
    setReportRegionData([]);
    getReportRegionData();
  };

  const calculateChartWidth = () => {
    const numItems = dataList ? dataList.length : 0;
    const labelWidth = 80; 
    const minWidth = 400;
    const calculatedWidth = Math.max(minWidth, numItems * labelWidth);
    return calculatedWidth;
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <FilterAltOutlinedIcon />
            <SearchModalButton onClick={handleOpen}>
              Apply filter here for other views
            </SearchModalButton>
          </div>
          <div style={{ display: "flex" }}>
          <SelectedFYDisplayDiv>
          <Typography>View:</Typography>
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
                value={`Region - ${viewType} View`}
              />
          </SelectedFYDisplayDiv>
          {/* <div style={{ display: "flex", alignItems: "center" }}> */}
          <SelectedFYDisplayDiv>

            {filteredFinancialYear ? (
                              <div style={{ display: "flex",alignItems:"center" }}>
              <Typography>
                Financial Year:
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
            {/* <Typography>Week :</Typography> */}
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
                <ReportSearchHeading>Report Filters: </ReportSearchHeading>
              </div>
              
                <div style={{ width: "60%",paddingTop:"5px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>Financial Year :</span>
                  </label>
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
                    value={filteredFinancialYear}
                    onChange={financialYearHeadHandler}
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
                Quarterly
                <br />
                <RadioInput
                  type="radio"
                  value="Monthly"
                  name="viewType"
                  onChange={handleViewTypeChange}
                  checked={viewType === "Monthly"}
                />{" "}
                Monthly
              </div>
              { viewType == "Monthly" && (
                <div style={{ width: "60%", paddingTop: "5px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>Week :</span>
                  </label>
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
                <OutputTypeHEading>Output Type: </OutputTypeHEading>
              </div>
              <div>
                <RadioInput
                  type="radio"
                  value="Chart"
                  name="chartType"
                  defaultChecked
                  onChange={handleChartTypeChange}
                />{" "}
                Chart
                <RadioInput
                  type="radio"
                  value="Tabular"
                  name="chartType"
                  disabled
                  onChange={handleChartTypeChange}
                />{" "}
                Tabular
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
                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>BU :</span>
                  </label>
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
                    {props?.buData?.buData &&
                      props.buData.buData.map((obj, id) => (
                        <option value={obj.businessUnitId}>
                          {obj.businessUnitName}
                        </option>
                      ))}
                  </select>
                </div>

                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>SBU:</span>
                  </label>
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
                    onChange={sbuIdHandler}
                  >
                    <option value="" disabled selected hidden></option>
                    {props.sbuData.sbuData &&
                      props.sbuData.sbuData.map((obj, id) => (
                        <option value={obj.sbuId}>{obj.sbuName}</option>
                      ))}
                  </select>
                </div>

                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>SBU Head :</span>
                  </label>
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
                    onChange={sbuHeadHandler}
                  >
                    <option value="" disabled selected hidden></option>
                    {props.sbuHeadData.sbuHeadData &&
                      props.sbuHeadData.sbuHeadData.map((obj, id) => (
                        <option value={obj.sbuHeadId}>{obj.sbuHeadName}</option>
                      ))}
                  </select>
                </div>

                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>Business Type :</span>
                  </label>
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
                    onChange={businessTypeHandler}
                  >
                    <option value="" disabled selected hidden></option>
                    {props.businessTypeData.businessTypeData &&
                      props.businessTypeData.businessTypeData.map((obj, id) => (
                        <option value={obj.businessTypeId}>
                          {obj.businessTypeDisplayName}
                        </option>
                      ))}
                  </select>
                </div>

                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>Probability Type:</span>
                  </label>
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
                    onChange={probabilityHandler}
                  >
                    <option value="" disabled selected hidden></option>
                    {props.probabilityData.probabilityData &&
                      props.probabilityData.probabilityData.map((obj, id) => (
                        <option value={obj.probabilityTypeId}>
                          {obj.probabilityTypeName}
                        </option>
                      ))}
                  </select>
                </div>

                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>Location:</span>
                  </label>
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
                    onChange={locationHandler}
                  >
                    <option value="" disabled selected hidden></option>
                    {props.locationData.locationData &&
                      props.locationData.locationData.map((obj, id) => (
                        <option value={obj.locationId}>
                          {obj.locationName}
                        </option>
                      ))}
                  </select>
                </div>

                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>Account:</span>
                    <select
                      id="revenue-select"
                      name="accountId"
                      onChange={accountHandler}
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
                    >
                      <option value="" disabled selected hidden></option>
                      {props.accountData.accountData &&
                        props.accountData.accountData.map((obj, id) => (
                          <option value={obj.accountId}>
                            {obj.accountName}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>

                <div style={{ padding: "3px 0px" }}>
                  <label
                    for="email"
                    style={{ fontWeight: "400", fontSize: "16px" }}
                  >
                    <span>BDM:</span>
                  </label>
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
                    onChange={bdmIdHandler}
                  >
                    <option value="" disabled selected hidden></option>
                    {props.bdmData.bdmData &&
                      props.bdmData.bdmData.map((obj, id) => (
                        <option value={obj.bdmId}>{obj.bdmName}</option>
                      ))}
                  </select>
                </div>
              </div>

              <ReportSearchButtonSection>
                <ReportModalCancelButton
                  type="button"
                  variant="contained"
                  value="Cancel"
                  id="create-account"
                  onClick={handleReset}
                >
                  reset view
                </ReportModalCancelButton>
                <ReportModalApplyButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={handleApplyButtonClick}
                >
                  apply
                </ReportModalApplyButton>
              </ReportSearchButtonSection>
            </ReportSearchModalBox>
          </Modal>
        </div>
      </div>

      <div style={{ marginLeft: "250px" }}>
        {reportRegionData !== "" && reportRegionData !== "0" && (
          <div>
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
              {/* <CartesianGrid strokeDasharray=" 3 3" /> */}
              {/* <XAxis  tick={{ fontSize: 12 }} tickFormatter={(value, index) => label[index]}/> */}
              {/* <XAxis  tick={{ fontSize: 12 }} tickFormatter={(value, index) => label[index]}/> */}
              <XAxis style={{ fontSize: "10px" }} dataKey="name" interval={0} />

              <YAxis style={{ fontSize: "10px" }} interval={0}>
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
              <Bar
                dataKey="NA"
                stackId="a"
                fill="#93B1A6"
                // label={{
                //   position: "top",
                //   formatter: (value) => (value !== 0 ? `$${value}` : null),
                // }}
              />
              <Bar
                dataKey="EU"
                stackId="a"
                fill="#5C8374"
                // label={{
                //   position: "top",
                //   formatter: (value) => (value !== 0 ? `$${value}` : null),
                // }}
              />
              <Bar
                dataKey="APAC"
                stackId="a"
                fill="#183D3D"
                // label={{
                //   position: "top",
                //   formatter: (value) => (value !== 0 ? `$${value}` : null),
                // }}
                label={{
                  position: "top",
                  formatter: (value) => {
                      const formattedValue = value !== 0 ? `$${(value / 1000).toFixed(0)}k` : null;
                      return formattedValue;
                  }
              }}            
              
              />
              {/* <Bar dataKey="bmy" stackId="a" fill="##040D12" /> */}

              {/* <Bar dataKey="bmy" fill="#8884d8" /> */}
              {/* <Bar dataKey="uv" fill="#ffc658" /> */}
            </BarChart>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("this is the state", state);

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
export default connect(mapStateToProps, mapDispatchToProps)(RegionWiseReport);
