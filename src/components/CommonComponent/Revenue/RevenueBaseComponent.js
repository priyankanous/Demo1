import React, { useEffect, useState } from "react";
import {
  TableHeadingSection,
  TableHeading,
  TableButtons,
} from "../../../utils/Value";
import { apiV1 } from "../../../utils/constantsValue";
import axios from "axios";
import RevenueEntryScreens from "./RevenueEntryScreens";

export function RevenueBaseComponent(props) {
  const [data, setData] = useState({});
  const getAllRevenueEntriesForFy = async (e) => {
    console.log("in the getRevenueEntriesForFy", e);
    await axios.get(`${apiV1}/revenue-entry/${e}`).then((response) => {
      const actualDataObject = response.data.data;
      console.log(
        "#######################the revenue data actual dta",
        actualDataObject
      );
      setData(actualDataObject);
    });
  };

  return (
    <React.Fragment>
      <div className="table_main_container">
        <TableHeadingSection>
          <TableHeading>Rolling Revenue Entry</TableHeading>
          <TableButtons>Export</TableButtons>
        </TableHeadingSection>
        <React.Fragment>
          <RevenueEntryScreens
            getAllRevenueEntriesForFy={getAllRevenueEntriesForFy}
          />
          <div className="revenue_table_container">
            <table className="nestedtablebgrevenue">
              <tr className="nestedtablebgrevenue">
                {props.columns.map((header) => {
                  return <th className="threvenueposition">{header}</th>;
                })}
              </tr>
              <tbody className="nestedtablebgrevenue">
                {data.revenueEntries &&
                  data.revenueEntries.map((obj, id) => {
                    obj.financialYearName = data.financialYearName;
                    return props.Tr({
                      ...obj,
                    });
                  })}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export const RevenueMemoizedBaseComponent = React.memo(
  RevenueBaseComponent,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
      return true;
    return false;
  }
);
