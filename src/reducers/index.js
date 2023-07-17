import { combineReducers } from "redux";
import financialYear from "./financial-year";
import probabilityData from "./probability";
import regionData from "./region";
import workOrderData from "./workOrder";
import bdmData from "./bdm";
import sbuData from "./sbu";
import sbuHeadData from "./sbuHead";
import buData from "./bu";
import locationData from "./location";
import businessTypeData from "./businessType";
import cocPracticeData from "./cocPractice";
import resource from "./resource";
import milestone from "./milestone";
import accountData from "./account";
import reportResourceData from "./reportresource";
export default combineReducers({
  financialYear,
  probabilityData,
  regionData,
  workOrderData,
  bdmData,
  sbuData,
  sbuHeadData,
  buData,
  locationData,
  businessTypeData,
  cocPracticeData,
  resource,
  milestone,
  accountData,
  reportResourceData,
});
