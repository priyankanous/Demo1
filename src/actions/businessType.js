import { createAction } from "redux-actions";
import axios from "axios";

export const GET_BUSINESS_TYPE_DATA = "GET_BUSINESS_TYPE_DATA";

const getBusinessType = createAction(GET_BUSINESS_TYPE_DATA);

export const getBusinessTypeData = () => async (dispatch) => {
  const data = await getBusinessTypeAPI();
  dispatch(getBusinessType(data));
};

const getBusinessTypeAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type"
  );

  const businessTypeData = data.data;
  return businessTypeData;
};
