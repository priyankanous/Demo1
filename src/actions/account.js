import { createAction } from "redux-actions";
import axios from "axios";

export const GET_ACCOUNT_DATA = "GET_ACCOUNT_DATA";

const getAccount = createAction(GET_ACCOUNT_DATA);

export const getAccountData = () => async (dispatch) => {
  const data = await getAccountAPI();
  console.log("This is arrayyyy onlyyyyyy for probabilityyyyyyy", data);
  dispatch(getAccount(data));
};

const getAccountAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts"
  );

  const accountData = data.data;
  return accountData;
};
