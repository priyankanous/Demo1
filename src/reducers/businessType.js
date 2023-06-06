import { GET_BUSINESS_TYPE_DATA } from "../actions/businessType";

export const initialState = {
  businessTypeData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS_TYPE_DATA:
      return {
        ...state,
        businessTypeData: action.payload,
      };
    default:
      return state;
  }
};
