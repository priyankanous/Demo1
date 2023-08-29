import { GET_CURRENCY_DATA } from "../actions/currency";
export const initialState = {
  currencyData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCY_DATA:
      return {
        ...state,
        currencyData: action.payload,
      };
    default:
      return state;
  }
};
