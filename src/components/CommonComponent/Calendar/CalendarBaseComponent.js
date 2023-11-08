import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import {
  TableHeadingSection,
  TableHeading,
  // TableButtons,
} from "../../../utils/Value";
import { Button, Typography, styled } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TableButtons = styled(Button)({
  background: "#1E4482",
  marginRight: "29px",
  color: "#FFFFFF",
  fontSize: "12px",
  padding: "0px 10px",
  height: "34px",
  marginTop: "6px",
  fontFamily:"Roboto",
  "&:hover": {
    backgroundColor: "#1E4482",
  },
});

export function CalendarBaseComponent(
  props,
  { locationData, activeTab, handleTabChange }
) {
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

  const [tableData, setTableData] = useState([]);
  const [value, setValue] = useState("one");
  const [onsiteLocations, setOnsiteLocations] = useState([]);
  const [offshoreLocations, setOffshoreLocations] = useState([]);

  useEffect(() => {
    setTableData([])
    const iterableArr = [...props?.data?.actualDataObject];
    const onsite = iterableArr?.filter(
      (each) => each?.location?.locationName === "Onsite"
    );
    const offshore = iterableArr?.filter(
      (each) => each?.location?.locationName === "Offshore"
    );
    console.log("on", onsite, "off", offshore)
    setOffshoreLocations(offshore?.length ? [...offshore] : []);
    setOnsiteLocations(onsite?.length ? [...onsite] : []);
  }, [props?.data?.actualDataObject]);

  useEffect(() => {
    setTableData([])
    if (value === "one") {
      setTableData([...offshoreLocations]);
    } else {
      setTableData([...onsiteLocations]);
    }
  }, [value, offshoreLocations, onsiteLocations]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(tableData, "data --->")

  return (
    <div className="table_container">
      <TableHeadingSection>
        <TableHeading>Calendar - {props.field}</TableHeading>
        <TableButtons variant="contained" onClick={props.setIsOpen}>
          {props.buttonText}
        </TableButtons>
      </TableHeadingSection>
      {(props.holiday && props.financialYearData) ||
      (props.fortnightlyMeetings && props.financialYearData) ||
      (props.bdmMeetings && props.financialYearData) ? (
        <React.Fragment>
          <div class="filter">
            <div
              style={{
                paddingRight: "2%",
                display: "flex",
                marginLeft: "35%",
                marginTop: "-3%",
              }}
            >
              <Typography style={{fontFamily:"Roboto"}}>Financial year:</Typography>
              <select
                id="filterSelect"
                onChange={(e) => {
                  if (props.holiday == true) {
                    props.getAllHcData(e.target.value);
                  } else if (props.bdmMeetings == true) {
                    props.fetchBdmMeetingsData(e.target.value);
                  } else {
                    props.fetchFornightlyMeetingsData(e.target.value);
                  }
                }}
                style={{
                  height: "30px",
                  width: "180px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  boxShadow: "none",
                  border: "1px solid gray",
                  fontFamily:"Roboto"
                }}
              >
                <option value="" disabled selected hidden></option>
                {props.data.financialYearData.map((fyData, index) => {
                  const fyNameData = fyData.financialYearName;
                  return <option key={index}>{fyNameData}</option>;
                })}
              </select>
            </div>
            {props.holiday && (
              <div>
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="black"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                  >
                    <Tab value="one" label="OFFSHORE" style={{fontFamily:"Roboto"}} />
                    <Tab value="two" label="ONSITE" style={{fontFamily:"Roboto"}} />
                  </Tabs>
                </Box>
              </div>
            )}
          </div>
          <TableContainer style={{ overflow: "hidden" }}>
            <Table style={{ overflow: "hidden" }}>
              <TableRow style={{ background: "rgba(225, 222, 222, 0.5)" }}>
                {props.columns.map((header) => {
                  return <TableCell style={{fontFamily:"Roboto"}}>{header}</TableCell>;
                })}
              </TableRow>
              <tbody>
                {(props.holiday && props.financialYearData)
                  ? tableData.map((obj, id) => props.Tr({ ...obj }))
                  : props?.data &&
                    props?.data?.actualDataObject.map((obj, id) =>
                      props.Tr({ ...obj })
                    )}
              </tbody>
            </Table>
          </TableContainer>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <TableContainer
            style={{ overflow: "hidden", width: "97%", marginTop: "25px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {props.columns.map((header) => {
                    return (
                      <TableCell
                        style={{
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#000000",
                          padding: "13px 15px",
                        }}
                      >
                        {header}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <tbody>
                {props.data &&
                  props.data.map((obj, id) => props.Tr({ ...obj }))}
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
