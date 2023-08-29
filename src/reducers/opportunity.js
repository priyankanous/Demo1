import { GET_OPPORTUNITY_DATA } from "../actions/opportunity";
export const initialState = {
 opportunityData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OPPORTUNITY_DATA:
      return {
        ...state,
       opportunityData: action.payload,
      };
    default:
      return state;
  }
};
