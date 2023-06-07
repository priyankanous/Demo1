import {
  SET_MILESTONE_DATA,
  SET_MILESTONE_DATA_NEW,
  SET_REVENUE_RESOURCE_ENTRIES,
  SET_MILESTONES,
} from "../actions/milestone";
export const initialState = {
  milestoneData: [],
  revenueResourceEntries: [],
  milestoneDataNew: [],
  milestones: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MILESTONE_DATA:
      return {
        ...state,
        milestoneData: [...state.milestoneData, action.payload],
      };
    case SET_MILESTONES:
      return {
        ...state,
        milestones: [...state.milestones, action.payload],
      };
    case SET_REVENUE_RESOURCE_ENTRIES:
      return {
        ...state,
        revenueResourceEntries: [
          ...state.revenueResourceEntries,
          action.payload,
        ],
      };
    case SET_MILESTONE_DATA_NEW:
      return {
        ...state,
        milestoneDataNew: [...state.milestoneDataNew, action.payload],
      };
    default:
      return state;
  }
};
