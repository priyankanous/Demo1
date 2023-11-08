import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import {
  TableHeadingSection,
  TableHeading,
  // TableButtons,
} from "../../utils/Value";
import { Button, Typography, styled } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TableButtons = styled(Button)({
  fontFamily: "Roboto",
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

const Cell = styled(TableCell)({
  fontFamily: "Roboto",
});


export function AdminBaseComponent(props) {
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
        <TableHeading>Administration - {props.field}</TableHeading>
        <TableButtons variant="contained" onClick={props.setIsOpen}>{props.buttonText}</TableButtons>
      </TableHeadingSection>
      {(props.globalLeave && props.financialYearData) ||
      (props.currency && props.financialYearData) ? (
        <React.Fragment>
          <div class="filter">
            <div style={{ paddingRight: "2%", display:"flex" }}>
              <Typography style={{fontFamily:"Roboto"}}>
              Financial year:
              </Typography>
              <select
            
                id="filterSelect"
                onChange={(e) => {
                  if (props.currency == true) {
                    props.getAllCurrency(e.target.value);
                  }
                  props.getAllGlobalLLF(e.target.value);
                }}
                // style={{height:"35px", borderRadius:"7px"}}
                style={{height:"37px", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray",fontFamily:"Roboto"}}

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
            <div style={{margin:"8px 0px"}}>
            <span
              style={{
                display: props.globalLeave ? "none" : "",
                paddingRight: "2%",
                fontSize:"15px",
              }}
            >
              Base Currency: <input type="text" id="email" spellcheck="false" style={{height:"23px", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray"}} />{" "}
            </span>
            <span style={{ paddingRight: "2%",fontSize:"15px" }}>
              Copy From:{" "}
              <select
                id="filterSelect"
                type="text"
                onChange={(e) => {
                  setCopyData({ ...copyData, copyFromFy: e.target.value });
                }}
                style={{marginLeft:"32px",borderRadius:"7px",height:"37px", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray", fontFamily:"Roboto"}}
              >
                <option value="" disabled selected hidden>
                  Please choose one
                </option>
                {props.data.financialYearData.map((fyData, index) => {
                  const fyNameData = fyData.financialYearName;
                  return <option key={index}>{fyNameData}</option>;
                })}
              </select>
            </span>
            <span style={{ paddingRight: "2%",fontSize:"15px" }}>
              Copy To:{" "}
              <select
                type="text"
                id="filterSelect"
                onChange={(e) => {
                  const selectedFyId =
                    e.target.selectedOptions[0].getAttribute("data-fyId");
                  const selectedfyDispName =
                    e.target.selectedOptions[0].getAttribute("data-fyDispName");
                  const selectedFyStartingFrom =
                    e.target.selectedOptions[0].getAttribute(
                      "data-fyStartingFrom"
                    );
                  const selectedfyEndingOn =
                    e.target.selectedOptions[0].getAttribute("data-fyEndingOn");
                  setCopyData({
                    ...copyData,
                    copyToFy: {
                      ...copyData.copyToFy,
                      financialYearId: selectedFyId,
                      financialYearName: e.target.value,
                      financialYearCustomName: selectedfyDispName,
                      startingFrom: selectedFyStartingFrom,
                      endingOn: selectedfyEndingOn,
                    },
                  });
                }}
                style={{marginLeft:"32px",borderRadius:"7px",height:"37px", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray", fontFamily:"Roboto"}}
              >
                <option value="" disabled selected hidden>
                  Please choose one
                </option>
                {props.data.financialYearData.map((fyData, index) => {
                  const fyNameData = fyData.financialYearName;
                  if (fyNameData !== copyData.copyFromFy) {
                  return (
                    <option
                      data-fyId={fyData.financialYearId}
                      data-fyDispName={fyData.financialYearCustomName}
                      data-fyStartingFrom={fyData.startingFrom}
                      data-fyEndingOn={fyData.endingOn}
                      key={index}
                    >
                      {fyNameData}
                    </option>
                  );
                }
                return null;
              })}
              </select>
            </span>
            <span style={{ paddingRight: "2%",fontSize:"15px" }}>
              <TableButtons
                id="filterButton"
                onClick={(e) => props.copyFromFyToNewFy(copyData)}
              >
                Apply
              </TableButtons>
            </span>
            </div>
          </div>
          <TableContainer style={{overflow:"hidden"}}>
          <Table style={{overflow:"hidden"}}>
            <TableRow>
              {props.columns.map((header) => {
                return <TableCell style={{fontFamily:"Roboto"}} >{header}</TableCell>;
              })}
            </TableRow>
            <tbody style={{fontFamily:"Roboto"}}>
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
          <TableContainer style={{ width:"98%",marginTop:"25px",overflowY:"scroll",height:"70vh",   
        }}>

          <Table  >
            <TableHead >
              <TableRow style={{background:"rgba(225, 222, 222, 0.5)", }} >
              {props.columns.map((header) => {
                return <TableCell style={{fontSize:"15px", fontWeight:"600", color:"#000000", padding :"13px 15px", fontFamily:"Roboto"}}>{header}</TableCell>;
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
  AdminBaseComponent,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
      return true;
    return false;
  }
);
