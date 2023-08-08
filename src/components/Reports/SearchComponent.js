import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getRegionData } from "../../actions/region";
import { getBuData } from "../../actions/bu";
import { getSbuHeadData } from "../../actions/sbuHead";
import { getSbuData } from "../../actions/sbu";
import { getLocationData } from "../../actions/locaion";
import { getAccountData } from "../../actions/account";
import { getBdmData } from "../../actions/bdm";
import { getReportData } from "../../actions/reportresource";

const SearchComponent = (props) => {

  const defaultObj = {
    "regionId": '',
    "buId": '',
    "sbuHeadId": '',
    "sbuId": '',
    "locationId": '',
    "accountId": '',
    "bdmId": '',
    "financialYearName": "2023-2024",
  }
  const [viewType, setViewType] = useState('Monthly');
  const [chartType, setChartType] = useState('Tabular');
  const [data, setData] = useState(defaultObj);

  useEffect(() => {
    props.getRegionData();
    props.getBuData();
    props.getSbuHeadData();
    props.getSbuData();
    props.getLocationData();
    props.getAccountData();
    props.getBdmData();
    props.getReportData({viewType, data});
  }, []);  

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleViewTypeChange = (event) => {
    setViewType(event.target.value);
  };

  const getReportDetails = () => {
    console.log(data);
    props.getReportData({ viewType, data });
  };

  return (
    <React.Fragment>
      <div style={{paddingTop:0}}>
      <h5>{viewType} wise : Business Type</h5>
        <div>
        
          <h5>Report Filters: </h5>
        </div>
        <div style={{ fontSize: 'small' }}>
          <input type="radio" value="Quarterly" name="viewType"
            onChange={handleViewTypeChange} style={{ boxShadow: "none" }} /> Quarterly
          <input type="radio" value="Monthly" name="viewType" defaultChecked
            onChange={handleViewTypeChange} style={{ boxShadow: "none" }} /> Monthly
        </div>
        
        
        <div style={{ fontSize: 'small', font: '-webkit-control' }}>
          <p>Output Type: </p>
        </div>
        <div style={{ fontSize: 'small' }}>
          <input type="radio" value="Chart" name="chartType"
            onChange={handleChartTypeChange} style={{ boxShadow: "none" }} /> Chart
          <input type="radio" value="Tabular" name="chartType" defaultChecked
            onChange={handleChartTypeChange} style={{ boxShadow: "none" }} /> Tabular
        </div>

        <div>
          <label>Region :</label>
        </div>
        <div>
          <select
            id="revenue-select"
            name="regionId"
            onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select
          </option>
            {props.regionData.regionData &&
              props.regionData.regionData.map((obj, id) => (
                <option value={obj.regionId}>{obj.regionName}</option>
              ))}
          </select>
        </div>

        <div>
          <label>BU :</label>
        </div>
        <div>
          <select
            id="revenue-select"
            name="buId"
            onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.buData.buData &&
              props.buData.buData.map((obj, id) => (
                <option value={obj.businessUnitId}>{obj.businessUnitName}</option>
              ))}
          </select>
        </div>

        <div>
          <label>SBU Head :</label>
        </div>
        <div>
          <select
            id="revenue-select"
            name="sbuHeadId"
            onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.sbuHeadData.sbuHeadData &&
              props.sbuHeadData.sbuHeadData.map((obj, id) => (
                <option value={obj.sbuHeadId}>{obj.sbuHeadName}</option>
              ))}
          </select>
        </div>

        <div>
          <label>SBU :</label>
        </div>
        <div>
          <select
            id="revenue-select"
            name="sbuId"
            onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.sbuData.sbuData &&
              props.sbuData.sbuData.map((obj, id) => (
                <option value={obj.sbuId}>{obj.sbuName}</option>
              ))}
          </select>
        </div>

        <div>
          <label>Location :</label>
        </div>
        <div>
          <select
            id="revenue-select"
            name="locationId"
            onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.locationData.locationData &&
              props.locationData.locationData.map((obj, id) => (
                <option value={obj.locationId}>{obj.locationName}</option>
              ))}
          </select>
        </div>

        <div>
          <label>Account :</label>
        </div>
        <div>
          <select
            id="revenue-select"
            name="accountId"
            onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.accountData.accountData &&
              props.accountData.accountData.map((obj, id) => (
                <option value={obj.accountId}>{obj.accountName}</option>
              ))}
          </select>
        </div>

        <div>
          <label>BDM :</label>
        </div>
        <div>
          <select
            id="revenue-select"
            name="bdmId"
            onChange={handleChange}>
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.bdmData.bdmData &&
              props.bdmData.bdmData.map((obj, id) => (
                <option value={obj.bdmId}>{obj.bdmName}</option>
              ))}
          </select>
        </div>

        <div>
          <button name="apply" type="button" value="Apply" onClick={() => { getReportDetails(); }}
            style={{ borderColor: "cornflowerblue", backgroundColor: "cornflowerblue", marginTop: "10px" }}>
            Apply
          </button>
        </div>
        <div>
          <button name="reset" type="button" value="Reset View" style={{
            borderColor: "cornflowerblue",
            backgroundColor: "cornflowerblue",
            marginTop: "10px"
          }}>Reset View
          </button>
        </div>
      </div>
    </React.Fragment>
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
    getReportData: (data) => dispatch(getReportData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
