import { createAction } from "redux-actions";
import axios from "axios";

export const SET_RESOURCE_DATA = "SET_RESOURCE_DATA";

const setResourceDataDetails = createAction(SET_RESOURCE_DATA);

export const setResourceData = (data) => async (dispatch) => {
  dispatch(setResourceDataDetails(data));
};

export const SAVE_RESOURCE_DATA = "SAVE_RESOURCE_DATA";

const saveResourceDataDetails = createAction(SAVE_RESOURCE_DATA);

export const saveResourceData = (data) => async (dispatch) => {
  const payload = preparePayload(data);

  const resp = await getSaveTandMAPI(payload);
  dispatch(saveResourceDataDetails(data));
};

const getSaveTandMAPI = async (payload) => {
  console.log("THIS IS THE PAYLOAD", payload);
  const { data } = await axios.post(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/TandM",
    payload
  );

  console.log("data--->", data.data);
};

const preparePayload = (data) => {
  console.log("thsi si the data......./////", data);
  const { resourceData, formData } = data;
  const resourceDataArry = resourceData.map((resource) => {
    return {
      // revenueResourceEntryId: resource.index,
      leaveLossFactor: resource.leaveLossFactor,
      strategicBusinessUnit: {
        sbuId: resource.sbuId,
        //sbuName: resource.sbuName,
      },
      strategicBusinessUnitHead: {
        sbuHeadId: resource.sbuHeadId,
        //sbuHeadName: resource.sbuHeadName,
      },
      businessUnit: {
        businessUnitId: resource.buisnessUnitId,
        //businessUnitName: resource.businessUnitName,
      },
      businessType: {
        businessTypeId: resource.businessTypeId,
        //businessTypeName: resource.businessTypeName,
      },
      location: {
        locationId: resource.locationId,
        //locationName: resource.locationName,
      },
      resourceName: resource.resouceName,
      employeeId: resource.employeeId,
      resourceStartDate: "10/Apr/2023",
      resourceEndDate: "28/Nov/2023",
      cocPractice: {
        cocPracticeId: resource.cocPracticeId,
        //cocPracticeName: resource.cocPracticeName,
      },
      billingRateType: resource.billingRateType,
      billingRate: resource.billingRate,
      milestoneResourceRevenue: 0,
      allocation: resource.allocation,
    };
  });
  return {
    //tmRevenueEntryId: 0,
    account: {
      accountId: formData.account.accountID,
      //accountName: formData.account.accountName,
    },
    opportunity: {
      opportunityId: formData.opportunity.opportunityID,
      //opportunityName: formData.opportunity.opportunityName,
    },
    projectCode: formData.projectCode,
    projectStartDate: "10/Apr/2023",
    projectEndDate: "28/Nov/2023",
    businessDevelopmentManager: {
      bdmId: formData.bdm.bdmID,
      //bdmName: formData.bdm.bdmName,
    },
    currency: {
      currencyId: formData.currency.currencyID,
      //currencyName: formData.currency.currencyName,
    },
    probabilityType: {
      probabilityTypeId: formData.probability.probabilityTypeID,
      //probabilityTypeName: formData.probability.probabilityTypeName,
    },
    region: {
      regionId: formData.region.regionID,
      //regionName: formData.region.regionName,
    },
    workOrder: {
      workOrderId: 27,
      // workOrderNumber: "",
      // workOrderEndDate: "28/Nov/2023",
      // workOrderStatus: "string",
    },

    financialYear: {
      financialYearId: formData.financialYear.financialYearID,
      //financialYearName: formData.financialYear.financialYearName,
    },
    resourceCount: resourceDataArry.length,
    pricingType: formData.pricingType,
    remarks: "string",
    status: "Submitted",
    revenueResourceEntries: resourceDataArry,
  };
};
