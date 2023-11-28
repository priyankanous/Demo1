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
import { Button, Table, TableBody, TableHead, TableRow, TableCell, styled } from "@mui/material";



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
      <div className="table_main_container" style={{overflow:"hidden"}}>
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
              <TableRow className="nestedtablebgrevenue" >
                {/* {props.columns.map((header) => {
                  return <th className="threvenueposition" style={{backgroundColor:"rgba(72, 130, 225, 0.3)", padding:"2px 3px", height:"30px"}}>{header}</th>;
                })} */}
                        <TableHead>
          <TableRow  style={{backgroundColor:"rgba(72, 130, 225, 0.3)", padding:"2px 3px", height:"30px"}}>
            <TableCell style={{padding: "1px", textAlign:"center", width:"22px",fontFamily:"Roboto"}}></TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width:"20px", fontFamily:"Roboto"}}></TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "81px",fontFamily:"Roboto", fontWeight:"500", fontSize:"14px"}}>BU</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "81px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >SBU</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "81px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >SBU Head</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "83px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >BDM</TableCell>

            <TableCell style={{padding: "1px", textAlign:"center", width: "97px",fontFamily:"Roboto", fontWeight:"500", fontSize:"14px"}} >Business Type</TableCell>

            <TableCell style={{padding: "1px", textAlign:"center", width: "82px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >Account</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "80px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >Region</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "80px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >Location</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "80px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >Probability</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "90px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >COC-Practice</TableCell>
            <TableCell style={{padding: "1px", textAlign:"center", width: "98px",fontFamily:"Roboto",fontWeight:"500", fontSize:"14px"}} >Status</TableCell>

          </TableRow>
        </TableHead>
              </TableRow>
              <TableBody className="nestedtablebgrevenue"
              style={{
                overflowY: "scroll",
                height: "220px",
                display: "block",
                overflowX: "hidden",
                width: "100%",
                position: "absolute",
                fontFamily:"Roboto",
                fontWeight:"400",
              }}
              >
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
        {/* <TableScroll data={data} /> */}
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
