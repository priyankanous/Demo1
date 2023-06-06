import { createAction } from "redux-actions";
import axios from "axios";

export const GET_BDM_DATA = "GET_BDM_DATA";

const getBdm = createAction(GET_BDM_DATA);

export const getBdmData = () => async (dispatch) => {
  const data = await getBdmAPI();
  console.log("This is arrayyyy onlyyyyyy for probabilityyyyyyy", data);
  dispatch(getBdm(data));
};

const getBdmAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm"
  );

  const bdmData = data.data;
  return bdmData;
};
