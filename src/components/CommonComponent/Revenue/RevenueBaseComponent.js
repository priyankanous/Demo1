import React, { useEffect, useState } from "react";
import {
  TableHeadingSection,
  TableHeading,
  // TableButtons,
} from "../../../utils/Value";
import { apiV1 } from "../../../utils/constantsValue";
import axios from "axios";
import RevenueEntryScreens from "./RevenueEntryScreens";
import TableScroll from "./ScrollingTable";
import { Button, Table, TableBody, TableHead, TableRow, Typography, styled } from "@mui/material";



const TableButtons = styled(Button)({
  background: "#1E4482",
  marginRight: "10px",
  color: "#FFFFFF",
  fontSize: "12px",
  padding: "0px 10px",
  height:"30px",
  marginTop:"6px",
  '&:hover': {
    backgroundColor: '#1E4482',
  },
});

export function RevenueBaseComponent(props) {

  const [data, setData] = useState({});
  const getAllRevenueEntriesForFy = async (e) => {
    // console.log("in the getRevenueEntriesForFy", e);
    await axios.get(`${apiV1}/revenue-entry/${e}`).then((response) => {
      const actualDataObject = response.data.data;
      // console.log(
      //   "#######################the revenue data actual dta",
      //   actualDataObject
      // );
      setData(actualDataObject);
    });
  };

  // console.log("props----->", data);


  return (
    <React.Fragment>

      <div>
      <div className="table_main_container" style={{overflowY:"hidden"}}>
        <TableHeadingSection>
          <TableHeading>Rolling Revenue Entry</TableHeading>
          {/* <TableButtons>Export</TableButtons> */}
        </TableHeadingSection>
        <React.Fragment>
          <RevenueEntryScreens
            getAllRevenueEntriesForFy={getAllRevenueEntriesForFy}
          />
          <div className="revenue_table_container">
            <Table className="nestedtablebgrevenue">
              <TableRow className="nestedtablebgrevenue">
                {props.columns.map((header) => {
                  return <th className="threvenueposition" style={{backgroundColor:"rgba(72, 130, 225, 0.3)", padding:"2px 3px", height:"30px"}}>{header}</th>;
                })}
              </TableRow>
              <TableBody className="nestedtablebgrevenue">
                {data.revenueEntries &&
                  data.revenueEntries.map((obj, id) => {
                    obj.financialYearName = data.financialYearName;
                    return props.Tr({
                      ...obj,
                    });
                  })}
              </TableBody>
            </Table>
          </div>
        </React.Fragment>
      </div>
      </div>
      <div style={{position:"relative", top:"370px"}}>
        <TableScroll data={data} />
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
