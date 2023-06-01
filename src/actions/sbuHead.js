import { createAction } from "redux-actions";
import axios from "axios";

export const GET_SBU_HEAD_DATA = "GET_SBU_HEAD_DATA";

const getSbuHead = createAction(GET_SBU_HEAD_DATA);

export const getSbuHeadData = () => async (dispatch) => {
  const data = await getSbuHeadAPI();
  console.log("This is arrayyyy onlyyyyyy for probabilityyyyyyy", data);
  dispatch(getSbuHead(data));
};

const getSbuHeadAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead"
  );

  const sbuHeadData = data.data;
  return sbuHeadData;
};
