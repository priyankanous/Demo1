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
    account: { accountID: "", accountName: "" },
    opportunity: { opportunityID: "", opportunityName: "" },
    bdm: { bdmID: "", bdmName: "" },
    projectCode: "",
    projectStartDate: "",
    projectEndDate: "",
    currency: { currencyID: "", currencyName: "" },
    probability: { probabilityTypeID: "", probabilityTypeName: "" },
    region: { regionID: "", regionName: "" },
    workOrder: { workOrderID: "", workOrderEndDate: "", workOrderStatus: "" },
    financialYear: { financialYearID: "", financialYearName: "" },
    pricingType: props.pricingType,
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
              const selectedFyId =
                e.target.selectedOptions[0].getAttribute("data-fyId");
              setFormData({
                ...formData,
                financialYear: {
                  ...formData.financialYear,
                  financialYearID: selectedFyId,
                  financialYearName: e.target.value,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear.map((fyData, index) => {
              const fyNameData = fyData.financialYearName;
              return (
                <option data-fyId={fyData.financialYearId} key={index}>
                  {fyNameData}
                </option>
              );
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
              const selectedFyId =
                e.target.selectedOptions[0].getAttribute("data-fyId");
              setFormData({
                ...formData,
                account: {
                  ...formData.account,
                  accountID: selectedFyId,
                  accountName: e.target.value,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear.map((fyData, index) => {
              const fyNameData = fyData.financialYearName;
              return (
                <option data-fyId={fyData.financialYearId} key={index}>
                  {fyNameData}
                </option>
              );
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
              const selectedFyId =
                e.target.selectedOptions[0].getAttribute("data-fyId");
              setFormData({
                ...formData,
                opportunity: {
                  ...formData.opportunity,
                  opportunityID: selectedFyId,
                  opportunityName: e.target.value,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.financialYear.financialYear.map((fyData, index) => {
              const fyNameData = fyData.financialYearName;
              return (
                <option data-fyId={fyData.financialYearId} key={index}>
                  {fyNameData}
                </option>
              );
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
              const selectedbdmId =
                e.target.selectedOptions[0].getAttribute("data-bdmId");
              setFormData({
                ...formData,
                bdm: {
                  ...formData.bdm,
                  bdmID: selectedbdmId,
                  bdmName: e.target.value,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.bdmData.bdmData &&
              props.bdmData.bdmData.map((obj, id) => (
                <option data-bdmId={obj.bdmId}>{obj.bdmName}</option>
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
            {props.financialYear.financialYear.map((fyData, index) => {
              const fyNameData = fyData.financialYearName;
              return (
                <option data-fyId={fyData.financialYearId} key={index}>
                  {fyNameData}
                </option>
              );
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
            {props.financialYear.financialYear.map((fyData, index) => {
              const fyNameData = fyData.financialYearName;
              return (
                <option data-fyId={fyData.financialYearId} key={index}>
                  {fyNameData}
                </option>
              );
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
            {props.financialYear.financialYear.map((fyData, index) => {
              const fyNameData = fyData.financialYearName;
              return (
                <option data-fyId={fyData.financialYearId} key={index}>
                  {fyNameData}
                </option>
              );
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
              const selectedcurrencyId =
                e.target.selectedOptions[0].getAttribute("data-currencyId");
              setFormData({
                ...formData,
                currency: {
                  ...formData.currency,
                  currencyID: selectedcurrencyId,
                  currencyName: e.target.value,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {currencyData &&
              currencyData.map((obj, id) => (
                <option data-currencyID={obj.currencyId}>
                  {obj.currencyName}
                </option>
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
              const selectedprobabilityId =
                e.target.selectedOptions[0].getAttribute("data-probabilityId");
              setFormData({
                ...formData,
                probability: {
                  ...formData.probability,
                  probabilityTypeID: selectedprobabilityId,
                  probabilityTypeName: e.target.value,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.probabilityData.probabilityData &&
              props.probabilityData.probabilityData.map((obj, id) => (
                <option data-probabilityId={obj.probabilityTypeId}>
                  {obj.probabilityTypeName}
                </option>
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
              const selectedregionId =
                e.target.selectedOptions[0].getAttribute("data-regionId");
              setFormData({
                ...formData,
                region: {
                  ...formData.region,
                  regionID: selectedregionId,
                  regionName: e.target.value,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.regionData.regionData &&
              props.regionData.regionData.map((obj, id) => (
                <option data-regionId={obj.regionId}>{obj.regionName}</option>
              ))}
          </select>
        </div>
        <div>
          <label for="username">Work Order </label>
          <select
            id="revenue-select"
            onChange={(e) => {
              const selectedworkOrderId =
                e.target.selectedOptions[0].getAttribute("data-workOrderId");
              setFormData({
                ...formData,
                workOrder: {
                  ...formData.workOrder,
                  workOrderID: selectedworkOrderId,
                },
              });
            }}
          >
            <option value="" disabled selected hidden>
              Select
            </option>
            {props.workOrderData.workOrderData &&
              props.workOrderData.workOrderData.map((obj, id) => (
                <option data-workOrderId={obj.woStatusId}>
                  {obj.woStatusName}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label for="username">Work Order End Date</label>
          <select
            id="revenue-select"
            onChange={(e) => {
              setFormData({
                ...formData,
                workOrder: {
                  ...formData.workOrder,
                  workOrderEndDate: e.target.value,
                },
              });
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
              setFormData({
                ...formData,
                workOrder: {
                  ...formData.workOrder,
                  workOrderStatus: e.target.value,
                },
              });
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
