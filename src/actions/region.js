import { createAction } from "redux-actions";
import axios from "axios";

export const GET_REGION_DATA = "GET_REGION_DATA";

const getRegion = createAction(GET_REGION_DATA);

export const getRegionData = () => async (dispatch) => {
  const data = await getRegionAPI();
  dispatch(getRegion(data));
};

const getRegionAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions"
  );

  const regionData = data.data;
  return regionData;
};
