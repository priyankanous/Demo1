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

const TableScroll = () => {
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

  return (
    <div className="table_container">
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
                  <TableCell key={index}>{heading}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
                <TableCell align="center">data</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TableScroll;
