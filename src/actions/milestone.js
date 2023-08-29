import { createAction } from "redux-actions";
import axios from "axios";
import milestone from "../reducers/milestone";

export const SET_MILESTONE_DATA = "SET_MILESTONE_DATA";
export const SET_REVENUE_RESOURCE_ENTRIES = "SET_REVENUE_RESOURCE_ENTRIES";
const setMilestoneDataDetails = createAction(SET_MILESTONE_DATA);
const setRevenueResourceEntries = createAction(SET_REVENUE_RESOURCE_ENTRIES);
export const setRevenueResourceEntriesData = (data) => async (dispatch) => {
  dispatch(setRevenueResourceEntries(data));
};

export const SET_MILESTONES = "SET_MILESTONES";
const setMilestones = createAction(SET_MILESTONES);
export const saveMileStones = (data) => async (dispatch) => {
  dispatch(setMilestones(data));
};

export const SET_MILESTONE_DATA_NEW = "SET_MILESTONE_DATA_NEW";
const setMilestoneDataNew = createAction(SET_MILESTONE_DATA_NEW);
export const saveMileStoneDataNew = (data) => async (dispatch) => {
  dispatch(setMilestoneDataNew(data));
};
export const setMilestoneData = (data) => async (dispatch) => {
  dispatch(setMilestoneDataDetails(data));
};

export const SAVE_MILESTONE_DATA = "SAVE_MILESTONE_DATA";

const saveMilestoneDataDetails = createAction(SAVE_MILESTONE_DATA);

export const saveMilestoneData = (data) => async (dispatch) => {
  const payload = milestonePayLoad(data);

  const resp = await getSaveFPAPI(payload);
  dispatch(saveMilestoneDataDetails(data));
};

const getSaveFPAPI = async (payload) => {
  console.log("THIS IS THE PAYLOAD", payload);
  const { data } = await axios.post(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/revenue-entry/fixed-price",
    payload
  );

};

const milestonePayLoad = (data) => {

  const { allMilestones, formData } = data;
  const allMilestonesArray = allMilestones.map((milestone) => {
    return {
      milestoneResourceCount: milestone.milestoneResourceCount,
      milestoneNumber: milestone.milestoneNumber,
      milestoneRevenue: milestone.milestoneRevenue,
      milestoneBillingDate: milestone.milestoneBillingDate,
      revenueResourceEntries: milestone.revenueResourceEntries,
    };
  });
  return {
    account: {
      accountId: formData.account.accountID,
    },
    opportunity: {
      opportunityId: formData.opportunity.opportunityID,
    },
    projectCode: formData.projectCode,
    projectStartDate: "10/Apr/2023",
    projectEndDate: "28/Nov/2023",
    businessDevelopmentManager: {
      bdmId: formData.bdm.bdmID,
    },
    currency: {
      currencyId: formData.currency.currencyID,
    },
    probabilityType: {
      probabilityTypeId: formData.probability.probabilityTypeID,
    },
    region: {
      regionId: formData.region.regionID,
    },
    workOrder: {
      workOrderId: 27,
    },
    workOrderEndDate: "10/Apr/2023",
    workOrderStatus: "string",
    financialYear: {
      financialYearId: formData.financialYear.financialYearID,
    },
    milestoneCount: allMilestonesArray.length,
    pricingType: formData.pricingType,
    remarks: "string",
    status: "string",
    milestones: allMilestonesArray,
  };
};
