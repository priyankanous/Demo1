import { createAction } from "redux-actions";
import axios from "axios";

export const SET_MILESTONE_DATA = "SET_MILESTONE_DATA";

const setMilestoneData = createAction(SET_MILESTONE_DATA);

export const getSbuData = (data) => async (dispatch) => {
  dispatch(setMilestoneData(data));
};
