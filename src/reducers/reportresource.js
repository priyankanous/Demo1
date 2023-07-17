import { SET_REPORT_RESOURCE_DATA } from "../actions/reportresource";
export const initialState = {
    reportResourceData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORT_RESOURCE_DATA:
      return {
        ...state,
        reportResourceData: [...state.reportResourceData, action.payload],
      };
    default:
      return state;
  }
};