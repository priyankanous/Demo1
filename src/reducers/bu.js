import { GET_BU_DATA } from "../actions/bu";
export const initialState = {
  buData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BU_DATA:
      return {
        ...state,
        buData: action.payload,
      };
    default:
      return state;
  }
};
