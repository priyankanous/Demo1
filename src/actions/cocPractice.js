import { createAction } from "redux-actions";
import axios from "axios";

export const GET_COC_PRACTICE_DATA = "GET_COC_PRACTICE_DATA";

const getCocPractice = createAction(GET_COC_PRACTICE_DATA);

export const getCocPracticeData = () => async (dispatch) => {
  const data = await getCocPracticeDataAPI();
  console.log("This is arrayyyy onlyyyyyy coccccccc", data);
  dispatch(getCocPractice(data));
};

const getCocPracticeDataAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice"
  );

  const cocPracticeData = data.data;
  return cocPracticeData;
};
