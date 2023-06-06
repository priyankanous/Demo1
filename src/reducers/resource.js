import { SET_RESOURCE_DATA } from "../actions/resource";
export const initialState = {
  resourceData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RESOURCE_DATA:
      return {
        ...state,
        resourceData: [...state.resourceData, action.payload],
      };
    default:
      return state;
  }
};
