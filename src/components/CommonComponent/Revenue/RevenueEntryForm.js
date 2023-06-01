import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getProbabilityData } from "../../../actions/probability";
import { getRegionData } from "../../../actions/region";
import { getWorkOrderYearData } from "../../../actions/workOrder";
import { getBdmData } from "../../../actions/bdm";
const ResourceEntryForm = (props) => {
  useEffect(() => {
    props.getProbabilityData();
    props.getRegionData();
    props.getWorkOrderYearData();
    props.getBdmData();
  }, []);
  const [currencyData, setCurrencyData] = useState();
  const array = [];
  const [formData, setFormData] = useState({
    account: "",
    opportunityName: "",
    bdm: "",
    projectCode: "",
    projectStartDate: "",
    projectEndDate: "",
    currency: "",
    probability: "",
    region: "",
    workOrder: "",
    workOrderEndDate: "",
    workOrderStatus: "",
  });
  const getAllCurrencyForFy = async (e) => {
    console.log("in the getALLGlobalLLF", e);
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency/financialyear/${e}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        console.log("the currency", actualDataObject);
        array.push(actualDataObject);
        setCurrencyData(actualDataObject);
      });
  };
  return (
    <React.Fragment>
      {console.log("The currency data required", currencyData)}
      <div
        className="grid-container"
        style={{ marginLeft: "-242px", width: "500px" }}
      >
        <div>
          <label for="username">ID:</label>
        </div>
        <div></div>
        <div>
          <label for="username">Financial Year</label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              getAllCurrencyForFy(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear &&
              props.financialYear.financialYear.map((fyData, index) => {
                const fyNameData = fyData.financialYearName;
                return <option key={index}>{fyNameData}</option>;
              })}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Account
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, account: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear &&
              props.financialYear.financialYear.map((fyData, index) => {
                const fyNameData = fyData.financialYearName;
                return <option key={index}>{fyNameData}</option>;
              })}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Opportunity Name
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, opportunityName: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear &&
              props.financialYear.financialYear.map((fyData, index) => {
                const fyNameData = fyData.financialYearName;
                return <option key={index}>{fyNameData}</option>;
              })}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            BDM
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, bdm: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.bdmData.bdmData &&
              props.bdmData.bdmData.map((obj, id) => (
                <option>{obj.bdmName}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Project Code
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, projectCode: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear &&
              props.financialYear.financialYear.map((fyData, index) => {
                const fyNameData = fyData.financialYearName;
                return <option key={index}>{fyNameData}</option>;
              })}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Project Start Date
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, projectStartDate: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear &&
              props.financialYear.financialYear.map((fyData, index) => {
                const fyNameData = fyData.financialYearName;
                return <option key={index}>{fyNameData}</option>;
              })}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Project End Date
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, projectEndDate: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear &&
              props.financialYear.financialYear.map((fyData, index) => {
                const fyNameData = fyData.financialYearName;
                return <option key={index}>{fyNameData}</option>;
              })}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Currency (As per WO)
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, currency: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {currencyData &&
              currencyData.map((obj, id) => (
                <option>{obj.currencyName}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Probability
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, probability: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.probabilityData.probabilityData &&
              props.probabilityData.probabilityData.map((obj, id) => (
                <option>{obj.probabilityTypeName}</option>
              ))}
          </select>
        </div>
        <div>
          <label className="required-field" for="username">
            Region
          </label>
          <select
            id="revenue-select"
            required
            onChange={(e) => {
              setFormData({ ...formData, region: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.regionData.regionData &&
              props.regionData.regionData.map((obj, id) => (
                <option>{obj.regionName}</option>
              ))}
          </select>
        </div>
        <div>
          <label for="username">Work Order </label>
          <select
            id="revenue-select"
            onChange={(e) => {
              setFormData({ ...formData, workOrder: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.workOrderData.workOrderData &&
              props.workOrderData.workOrderData.map((obj, id) => (
                <option>{obj.woStatusName}</option>
              ))}
          </select>
        </div>
        <div>
          <label for="username">Work Order End Date</label>
          <select
            id="revenue-select"
            onChange={(e) => {
              setFormData({ ...formData, workOrderEndDate: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.workOrderData.workOrderData &&
              props.workOrderData.workOrderData.map((obj, id) => (
                <option>{obj.woStatusName}</option>
              ))}
          </select>
        </div>
        <div>
          <label for="username">Work Order Status</label>
          <select
            id="revenue-select"
            onChange={(e) => {
              setFormData({ ...formData, workOrderStatus: e.target.value });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.workOrderData.workOrderData &&
              props.workOrderData.workOrderData.map((obj, id) => (
                <option>{obj.woStatusName}</option>
              ))}
          </select>
        </div>
        <div></div>
      </div>
      <br></br>
      <br></br>
      <div>
        <input
          type="button"
          value="Continue"
          id="create-account"
          class="button"
          onClick={() => {
            props.setTabIndex({
              ...props.tabIndex,
              index: 1,
              formData: formData,
            });
          }}
        />
      </div>
      <div>
        <input
          type="button"
          onClick={() => {
            props.setIsOpen(false);
            props.setGridItems([]);
          }}
          value="Cancel"
          id="create-account"
          class="button"
        />
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  console.log("this is the state", state);

  return {
    probabilityData: state.probabilityData,
    regionData: state.regionData,
    workOrderData: state.workOrderData,
    bdmData: state.bdmData,
    financialYear: state.financialYear,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProbabilityData: () => dispatch(getProbabilityData()),
    getRegionData: () => dispatch(getRegionData()),
    getWorkOrderYearData: () => dispatch(getWorkOrderYearData()),
    getBdmData: () => dispatch(getBdmData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourceEntryForm);
