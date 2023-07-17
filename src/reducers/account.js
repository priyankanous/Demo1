import { GET_ACCOUNT_DATA } from "../actions/account";
export const initialState = {
  accountData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_DATA:
      return {
        ...state,
        accountData: action.payload,
      };
    default:
      return state;
  }
};
