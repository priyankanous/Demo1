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

  console.log("data---> for MileStone", data.data);
};

const pay = {
  account: {
    accountId: 0,
  },
  opportunity: {
    opportunityId: 0,
  },
  projectCode: "string",
  projectStartDate: "2023-06-06",
  projectEndDate: "2023-06-06",
  businessDevelopmentManager: {
    bdmId: 0,
  },
  currency: {
    currencyId: 0,
  },
  probabilityType: {
    probabilityTypeId: 0,
  },
  region: {
    regionId: 0,
  },
  workOrder: {
    workOrderId: 27,
  },
  workOrderEndDate: "2023-06-06",
  workOrderStatus: "string",
  financialYear: {
    financialYearId: 0,
  },
  milestoneCount: 0,
  pricingType: "string",
  remarks: "string",
  status: "string",
  milestones: [
    {
      milestoneNumber: "string",
      milestoneBillingDate: "2023-06-06",
      milestoneRevenue: 0,
      milestoneResourceCount: 0,
      revenueResourceEntries: [
        {
          strategicBusinessUnit: {
            sbuId: 0,
          },
          strategicBusinessUnitHead: {
            sbuHeadId: 0,
          },
          businessUnit: {
            businessUnitId: 0,
          },
          businessType: {
            businessTypeId: 0,
          },
          location: {
            locationId: 0,
          },
          resourceName: "string",
          employeeId: "string",
          resourceStartDate: "2023-06-06",
          resourceEndDate: "2023-06-06",
          milestoneResourceRevenue: 0,
          allocation: 0,
        },
      ],
    },
  ],
};
const milestonePayLoad = (data) => {
  console.log(
    "_________________this is main data in the main payload generation",
    data
  );
  const { allMilestones, formData } = data;
  const allMilestonesArray = allMilestones.map((milestone) => {
    return {
      milestoneResourceCount: milestone.milestoneResourceCount,
      milestoneNumber: milestone.milestoneNumber,
      milestoneRevenue: milestone.milestoneRevenue,
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
const obj = {
  allMilestons: [
    {
      milestoneResourceCount: "2",
      milestoneNumber: 1,
      milestoneRevenue: "222",
      revenueResourceEntries: [
        {
          index: 0,
          milestoneID: 1,
          sbuName: "Euro Test",
          sbuId: "1",
          sbuHeadName: "Ganesh",
          sbuHeadId: "1",
          businessUnitName: "GSS",
          businessUnitId: "1",
          locationName: "OffShore",
          locationId: "1",
          employeeId: "123",
          milestoneMilestoneRevenue: "100",
          businessTypeName: "ECNB",
          businessTypeId: "1",
          allocation: "100",
        },
        {
          index: 1,
          milestoneID: 1,
          sbuName: "Euro Test",
          sbuId: "1",
          sbuHeadName: "Ganesh",
          sbuHeadId: "1",
          businessUnitName: "vServe",
          businessUnitId: "2",
          locationName: "OnSite",
          locationId: "2",
          employeeId: "456",
          milestoneMilestoneRevenue: "200",
          businessTypeName: "ECNB",
          businessTypeId: "1",
          allocation: "200",
        },
      ],
    },
  ],
  formData: {
    account: {
      accountID: "1",
      accountName: "2023-2024",
    },
    opportunity: {
      opportunityID: "1",
      opportunityName: "2023-2024",
    },
    bdm: {
      bdmID: "1",
      bdmName: "Peter",
    },
    projectCode: "2023-2024",
    projectStartDate: "2023-2024",
    projectEndDate: "2023-2024",
    currency: {
      currencyID: "2",
      currencyName: "USD",
    },
    probability: {
      probabilityTypeID: "3",
      probabilityTypeName: "Upside",
    },
    region: {
      regionID: "2",
      regionName: "Europe",
    },
    workOrder: {
      workOrderID: "1",
      workOrderEndDate: "Signed",
      workOrderStatus: "Signed",
    },
    financialYear: {
      financialYearID: "1",
      financialYearName: "2023-2024",
    },
    pricingType: "FP",
  },
};
