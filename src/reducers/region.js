import { GET_REGION_DATA } from "../actions/region";

export const initialState = {
  regionData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REGION_DATA:
      return {
        ...state,
        regionData: action.payload,
      };
    default:
      return state;
  }
};
