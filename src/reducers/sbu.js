import { GET_SBU_DATA } from "../actions/sbu";
export const initialState = {
  sbuData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SBU_DATA:
      return {
        ...state,
        sbuData: action.payload,
      };
    default:
      return state;
  }
};
