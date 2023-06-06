import { createAction } from "redux-actions";
import axios from "axios";

export const GET_FINANCIAL_YEAR_DATA = "GET_FINANCIAL_YEAR_DATA";

const getFinancialYear = createAction(GET_FINANCIAL_YEAR_DATA);

export const getFinancialYearData = () => async (dispatch) => {
  const data = await getFinancialYearDataAPI();
  console.log("This is arrayyyy onlyyyyyy", data);
  dispatch(getFinancialYear(data));
};

const getFinancialYearDataAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year"
  );

  const financialYearData = data.data;
  return financialYearData;
};
