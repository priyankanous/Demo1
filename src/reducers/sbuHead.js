import { GET_SBU_HEAD_DATA } from "../actions/sbuHead";
export const initialState = {
  sbuHeadData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SBU_HEAD_DATA:
      return {
        ...state,
        sbuHeadData: action.payload,
      };
    default:
      return state;
  }
};
