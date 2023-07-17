import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import {
  TableHeadingSection,
  TableHeading,
  // TableButtons,
} from "../../../utils/Value";
import { Button, styled } from "@mui/material";
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


export function SettingBaseComponent(props) {
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
        <TableHeading>Settings - {props.field}</TableHeading>
        <TableButtons variant="contained" onClick={props.setIsOpen}>{props.buttonText}</TableButtons>
      </TableHeadingSection>
      
        <React.Fragment>
          <TableContainer style={{overflow:"hidden", width:"97%",marginTop:"25px"}}>

          <Table style={{overflow:"hidden"}} >
            <TableHead>
              <TableRow style={{background:"rgba(225, 222, 222, 0.5)"}} >
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
      
    </div>
  );
}

export const MemoizedBaseComponent = React.memo(
  SettingBaseComponent,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
      return true;
    return false;
  }
);
