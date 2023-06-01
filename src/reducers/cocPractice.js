import { GET_COC_PRACTICE_DATA } from "../actions/cocPractice";

export const initialState = {
  cocPracticeData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COC_PRACTICE_DATA:
      return {
        ...state,
        cocPracticeData: action.payload,
      };
    default:
      return state;
  }
};
