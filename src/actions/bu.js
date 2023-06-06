import { createAction } from "redux-actions";
import axios from "axios";

export const GET_BU_DATA = "GET_BU_DATA";

const getBu = createAction(GET_BU_DATA);

export const getBuData = () => async (dispatch) => {
  const data = await getBuAPI();
  console.log("This is arrayyyy onlyyyyyy for probabilityyyyyyy", data);
  dispatch(getBu(data));
};

const getBuAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit"
  );

  const buData = data.data;
  return buData;
};
