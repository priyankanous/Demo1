import { createAction } from "redux-actions";
import axios from "axios";

export const GET_SBU_DATA = "GET_SBU_DATA";

const getSbu = createAction(GET_SBU_DATA);

export const getSbuData = () => async (dispatch) => {
  const data = await getSbuAPI();
  dispatch(getSbu(data));
};

const getSbuAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu"
  );

  console.log("data--->", data.data);
  const sbuData = data.data;
  return sbuData;
};
