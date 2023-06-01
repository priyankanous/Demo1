import { createAction } from "redux-actions";
import axios from "axios";

export const GET_LOCATION_DATA = "GET_LOCATION_DATA";

const getLocation = createAction(GET_LOCATION_DATA);

export const getLocationData = () => async (dispatch) => {
  const data = await getLocationAPI();
  console.log("This is arrayyyy onlyyyyyy for probabilityyyyyyy", data);
  dispatch(getLocation(data));
};

const getLocationAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/location"
  );

  const locationData = data.data;
  return locationData;
};
