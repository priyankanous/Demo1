import { createAction } from "redux-actions";
import axios from "axios";

export const GET_OPPORTUNITY_DATA = "GET_OPPORTUNITY_DATA";

const getOpportunity = createAction(GET_OPPORTUNITY_DATA);

export const getOpportunityData = () => async (dispatch) => {
  const data = await getOpportunityAPI();
  dispatch(getOpportunity(data));
};

const getOpportunityAPI = async () => {
  const { data } = await axios.get(
    "http://192.168.16.55:8080/rollingrevenuereport/api/v1/opportunity"
  );
  const opportunityData = data.data;
  return opportunityData;
};
