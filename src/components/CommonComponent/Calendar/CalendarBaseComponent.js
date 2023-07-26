import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import {
  TableHeadingSection,
  TableHeading,
  // TableButtons,
} from "../../../utils/Value";
import { Button, Typography, styled } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const TableButtons = styled(Button)({
  background: "#1E4482",
  marginRight: "29px",
  color: "#FFFFFF",
  fontSize: "12px",
  padding: "0px 10px",
  height:"34px",
  marginTop:"6px",
  '&:hover': {
    backgroundColor: '#1E4482',
  },
});


export function CalendarBaseComponent(props) {
  const [copyData, setCopyData] = useState({
    copyFromFy: "",
    copyToFy: {
      financialYearId: "",
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
  });
  return (
    <div className="table_container">
      <TableHeadingSection>
        <TableHeading>Calendar - {props.field}</TableHeading>
        <TableButtons variant="contained" onClick={props.setIsOpen}>{props.buttonText}</TableButtons>
      </TableHeadingSection>
      {(props.holiday && props.financialYearData) ||
        (props.bdmMeetings && props.financialYearData) ? (
        <React.Fragment>
         <div class="filter">
            <div style={{ paddingRight: "2%", display:"flex", marginLeft:"35%", marginTop:"-3%" }}>
              <Typography>
              Financial year:
              </Typography>
                <select
                  id="filterSelect"
                  onChange={(e) => {
                  if (props.holiday == true) {
                  props.getAllHcData(e.target.value);
                  }
                  props.fetchBdmMeetingsData(e.target.value);
                  }}
              // style={{height:"35px", borderRadius:"7px"}}
                  style={{height:"30px", width:"22%", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray"}}
                  >
                  <option value="" disabled selected hidden>
                  Please choose one
                  </option>
                  {props.data.financialYearData.map((fyData, index) => {
                  const fyNameData = fyData.financialYearName;
                  return <option key={index}>{fyNameData}</option>;
                  })}
                </select>
            </div>
            <div>
            <span style={{ paddingRight: "2%",fontSize:"15px" }}>
              <TableButtons
                id="filterButton"
                onClick={(e) => props.copyFromFyToNewFy(copyData)}
              >
                OFFSHORE
              </TableButtons>
            </span>
            <span style={{ paddingRight: "2%",fontSize:"15px" }}>
              <TableButtons
                id="filterButton"
                onClick={(e) => props.copyFromFyToNewFy(copyData)}
              >
                ONSITE
              </TableButtons>
            </span>
            </div>
          </div>
          <TableContainer style={{overflow:"hidden"}}>
          <Table style={{overflow:"hidden"}}>
            <TableRow>
              {props.columns.map((header) => {
                return <TableCell>{header}</TableCell>;
              })}
            </TableRow>
            <tbody>
              {props.data &&
                props.data.actualDataObject.map((obj, id) =>
                  props.Tr({ ...obj })
                )}
            </tbody>
          </Table>
          </TableContainer>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TableContainer style={{overflow:"hidden", width:"97%",marginTop:"25px"}}>

          <Table style={{overflow:"hidden"}} >
            <TableHead>
              <TableRow style={{backgroundColor:"rgba(225, 222, 222, 0.5)"}} >
              {props.columns.map((header) => {
                return <TableCell style={{fontSize:"15px", fontWeight:"600", color:"#000000", padding :"13px 15px"}}>{header}</TableCell>;
              })}
              </TableRow>
            </TableHead>
            <tbody>
              {props.data && props.data.map((obj, id) => props.Tr({ ...obj }))}
            </tbody>
          </Table>
          </TableContainer>
        </React.Fragment>
      )}
    </div>
  );
}

export const MemoizedBaseComponent = React.memo(
  CalendarBaseComponent,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
      return true;
    return false;
  }
);
