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

  const resp = await getSbuAPI(payload);
  dispatch(saveResourceDataDetails(data));
};

const getSbuAPI = async (payload) => {
  const { data } = await axios.get(
    "http://:8080/rollingrevenuereport/api/v1/sbu"
  );

  console.log("data--->", data.data);
  const sbuData = data.data;
  return sbuData;
};

const preparePayload = (data) => {
  const { resourceData, formData } = data;
  const resourceDataArry = resourceData.map((resource) => {
    return {
      // revenueResourceEntryId: resource.index,
      strategicBusinessUnit: {
        sbuId: resource.sbuId,
        sbuName: resource.sbuName,
      },
      strategicBusinessUnitHead: {
        sbuHeadId: resource.sbuHeadId,
        sbuHeadName: resource.sbuHeadName,
      },
      businessUnit: {
        businessUnitId: resource.businessUnitId,
        businessUnitName: resource.businessUnitName,
      },
      businessType: {
        businessTypeId: resource.businessTypeId,
        businessTypeName: resource.businessTypeName,
      },
      location: {
        locationId: resource.locationId,
        locationName: resource.locationName,
      },
      resourceName: resource.resourceName,
      employeeId: resource.employeeID,
      resourceStartDate: "2023-06-01",
      resourceEndDate: "2023-06-01",
      cocPractice: {
        cocPracticeId: resource.cocPracticeId,
        cocPracticeName: resource.cocPracticeName,
      },
      leaveLossFactor: {
        leaveLossFactorId: resource.leaveLossFactorId,
      },
      billingRateType: resource.billingRateType,
      billingRate: resource.billingRate,
      milestoneResourceRevenue: 0,
      allocation: resource.allocationPercent,
    };
  });
  return {
    tmRevenueEntryId: 0,
    account: {
      accountId: formData.account.accountID,
      accountName: formData.account.accountName,
    },
    opportunity: {
      opportunityId: formData.opportunity.opportunityID,
      opportunityName: formData.opportunity.opportunityName,
    },
    projectCode: formData.projectCode,
    projectStartDate: "2023-06-01",
    projectEndDate: "2023-06-01",
    businessDevelopmentManager: {
      bdmId: formData.bdm.bdmID,
      bdmName: formData.bdm.bdmName,
    },
    currency: {
      currencyId: formData.currency.currencyID,
      currencyName: formData.currency.currencyName,
    },
    probabilityType: {
      probabilityTypeId: formData.probability.probabilityTypeID,
      probabilityTypeName: formData.probability.probabilityTypeName,
    },
    region: {
      regionId: formData.region.regionID,
      regionName: formData.region.regionName,
    },
    workOrder: {
      workOrderId: formData.workOrder.workOrderID,
      workOrderNumber: "",
      workOrderEndDate: "2023-06-01",
      workOrderStatus: "string",
    },

    financialYear: {
      financialYearId: formData.financialYear.financialYearID,
      financialYearName: formData.financialYearName,
    },
    resourceCount: resourceDataArry.length,
    pricingType: formData.pricingType,
    remarks: "string",
    status: "string",
    revenueResourceEntries: resourceDataArry,
  };
};
