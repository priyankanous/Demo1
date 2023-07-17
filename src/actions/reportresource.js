import { createAction } from "redux-actions";
import axios from "axios";

export const SET_REPORT_RESOURCE_DATA = "SET_REPORT_RESOURCE_DATA";

const getReport = createAction(SET_REPORT_RESOURCE_DATA);

export const getReportData = (payload) => async (dispatch) => {
  const data = await getReportAPI(payload);
  console.log("This is report request ", data);
  dispatch(getReport(data));
};

const getReportAPI = async (payload) => {
  const { data } = await axios.post(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/report/businesstype",
    payload
  );

  console.log("report response data--->", data.data);
  
   const reportResourceData = data.data;
  return reportResourceData;
};

