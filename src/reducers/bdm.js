import { GET_BDM_DATA } from "../actions/bdm";
export const initialState = {
  bdmData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BDM_DATA:
      return {
        ...state,
        bdmData: action.payload,
      };
    default:
      return state;
  }
};
