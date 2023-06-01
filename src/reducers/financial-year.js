import { GET_FINANCIAL_YEAR_DATA } from "../actions/financial-year";

export const initialState = {
  financialYear: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FINANCIAL_YEAR_DATA:
      return {
        ...state,
        financialYear: action.payload,
      };
    default:
      return state;
  }
};
