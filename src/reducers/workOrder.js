import { GET_WORK_ORDER_DATA } from "../actions/workOrder";
export const initialState = {
  workOrderData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WORK_ORDER_DATA:
      return {
        ...state,
        workOrderData: action.payload,
      };
    default:
      return state;
  }
};
