import { createAction } from "redux-actions";
import axios from "axios";

export const GET_WORK_ORDER_DATA = "GET_WORK_ORDER_DATA";

const getWorkOrderYear = createAction(GET_WORK_ORDER_DATA);

export const getWorkOrderYearData = () => async (dispatch) => {
  const data = await getWorkOrderYearDataAPI();
  console.log("This is arrayyyy onlyyyyyy", data);
  dispatch(getWorkOrderYear(data));
};

const getWorkOrderYearDataAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus"
  );

  const workOrderData = data.data;
  return workOrderData;
};
