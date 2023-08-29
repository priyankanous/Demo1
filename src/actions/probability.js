import { createAction } from "redux-actions";
import axios from "axios";

export const GET_PROBABILITY_DATA = "GET_PROBABILITY_DATA";

const getProbability = createAction(GET_PROBABILITY_DATA);

export const getProbabilityData = () => async (dispatch) => {
  const data = await getProbabilityAPI();
  dispatch(getProbability(data));
};

const getProbabilityAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type"
  );

  const probabilityData = data.data;
  return probabilityData;
};
