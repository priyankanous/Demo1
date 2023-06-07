import React, { useRef, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const ButtonTocroll = styled(Button)({
  color: "black",
  background: "transparent",
  border: "transparent",
  padding: "0px",
});

const TableScroll = (props) => {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  const column1 = [
    "App'22",
    "May'22",
    "Jun'22",
    "Q1-FY23_A",
    "Q1-FY23_B",
    "Jul'22",
    "Aug'22",
    "Sep'22",
    "Q1-FY23_A",
    "Q1-FY23_B",
    "Oct'22",
    "Nov'22",
    "Dec'22",
    "Q1-FY23_A",
    "Q1-FY23_B",
    "Jan'22",
    "Feb'22",
    "Mar'22",
    "Q1-FY23_A",
    "Q1-FY23_B",
  ];

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };
  const columnData1 =
    props.data.financialYearRevenue?.dataMap?.["April - 2023"];
  const columnData2 = props.data.financialYearRevenue?.dataMap?.["May-2023"];
  const columnData3 = props.data.financialYearRevenue?.dataMap?.["June-2023"];
  const columnData4 = props.data.financialYearRevenue?.dataMap?.["July-2023"];
  const columnData5 = props.data.financialYearRevenue?.dataMap?.["August-2023"];
  const columnData6 =
    props.data.financialYearRevenue?.dataMap?.["September-2023"];
  const columnData7 =
    props.data.financialYearRevenue?.dataMap?.["October-2023"];
  const columnData8 =
    props.data.financialYearRevenue?.dataMap?.["November-2023"];
  const columnData9 =
    props.data.financialYearRevenue?.dataMap?.["December-2023"];
  const columnData10 =
    props.data.financialYearRevenue?.dataMap?.["January-2023"];
  const columnData11 =
    props.data.financialYearRevenue?.dataMap?.["February-2023"];
  const columnData12 = props.data.financialYearRevenue?.dataMap?.["March-2023"];
  const columnData13 = props.data.financialYearRevenue?.dataMap?.["DiFF-FY 24"];
  const columnData23 = props.data.financialYearRevenue?.dataMap?.["FYB 24"];
  const columnData24 = props.data.financialYearRevenue?.dataMap?.["FYP 24"];
  const columnData14 = props.data.financialYearRevenue?.dataMap?.["FYS 24"];
  const columnData15 = props.data.financialYearRevenue?.dataMap?.["FYT 24"];
  const columnData16 = props.data.financialYearRevenue?.dataMap?.["q1FYA 23"];
  const columnData17 = props.data.financialYearRevenue?.dataMap?.["q1FYB 23"];
  const columnData18 = props.data.financialYearRevenue?.dataMap?.["q1FYP 23"];
  const columnData19 = props.data.financialYearRevenue?.dataMap?.["q1FYS 23"];
  const columnData20 = props.data.financialYearRevenue?.dataMap?.["q1FYT 23"];
  const columnData21 = props.data.financialYearRevenue?.dataMap?.["q2FYA 23"];
  const columnData22 = props.data.financialYearRevenue?.dataMap?.["q2FYB 23"];
  const columnData25 = props.data.financialYearRevenue?.dataMap?.["q2FYP 23"];
  const columnData26 = props.data.financialYearRevenue?.dataMap?.["q2FYS 23"];
  const columnData27 = props.data.financialYearRevenue?.dataMap?.["q2FYT 23"];
  const columnData28 = props.data.financialYearRevenue?.dataMap?.["q3FYA 23"];
  const columnData29 = props.data.financialYearRevenue?.dataMap?.["q3FYB 23"];
  const columnData30 = props.data.financialYearRevenue?.dataMap?.["q3FYP 23"];
  const columnData31 = props.data.financialYearRevenue?.dataMap?.["q3FYS 23"];
  const columnData32 = props.data.financialYearRevenue?.dataMap?.["q3FYT 23"];
  const columnData33 = props.data.financialYearRevenue?.dataMap?.["q4FYA 23"];
  const columnData34 = props.data.financialYearRevenue?.dataMap?.["q4FYB 23"];
  const columnData35 = props.data.financialYearRevenue?.dataMap?.["q4FYP 23"];
  const columnData36 = props.data.financialYearRevenue?.dataMap?.["q4FYS 23"];
  const columnData37 = props.data.financialYearRevenue?.dataMap?.["q4FYT 23"];

  return (
    <div
      className="table_main_container"
      style={{ position: "relative", overflow: "hidden", paddingBottom: "8px" }}
    >
      {console.log("this is table data")}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <ButtonTocroll
          onClick={() => {
            handleHorizantalScroll(elementRef.current, 25, 100, -10);
          }}
          disabled={arrowDisable}
        >
          <KeyboardDoubleArrowLeftIcon />
        </ButtonTocroll>
        <ButtonTocroll
          onClick={() => {
            handleHorizantalScroll(elementRef.current, 25, 100, 10);
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </ButtonTocroll>
      </div>
      <div>
        <TableContainer
          component={Paper}
          style={{ overflow: "hidden", margin: "0px 20px" }}
          ref={elementRef}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {column1.map((heading, index) => (
                  <TableCell style={{ padding: "0px 10px" }} key={index}>
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData1}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData2}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData3}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData4}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData5}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData6}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData7}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData8}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData9}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData10}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData11}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
                <TableCell
                  style={{ padding: "0px 10px 1px 10px" }}
                  align="center"
                >
                  {columnData12}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TableScroll;
