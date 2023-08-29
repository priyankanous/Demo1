import { createAction } from "redux-actions";
import axios from "axios";

export const GET_CURRENCY_DATA = "GET_CURRENCY_DATA";

const getCurrency = createAction(GET_CURRENCY_DATA);

export const getCurrencyData = () => async (dispatch) => {
  const data = await getCurrencyAPI();
  console.log("getCurrencyData", data);
  dispatch(getCurrency(data));
};

const getCurrencyAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency"
  );

  const currencyData = data.data;
  return currencyData;
};
