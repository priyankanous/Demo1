import { GET_PROBABILITY_DATA } from "../actions/probability";

export const initialState = {
  probabilityData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROBABILITY_DATA:
      return {
        ...state,
        probabilityData: action.payload,
      };
    default:
      return state;
  }
};
