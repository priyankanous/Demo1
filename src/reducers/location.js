import { GET_LOCATION_DATA } from "../actions/locaion";

export const initialState = {
  locationData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_DATA:
      return {
        ...state,
        locationData: action.payload,
      };
    default:
      return state;
  }
};
