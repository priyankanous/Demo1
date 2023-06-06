import { SET_MILESTONE_DATA } from "../actions/resourceMilestone";
export const initialState = {
  milestoneData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MILESTONE_DATA:
      return {
        ...state,
        milestoneData: action.payload,
      };
    default:
      return state;
  }
};
