import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import {
  TableHeadingSection,
  TableHeading,
  TableHeadingButton,
  TableHeadingButtonPlusIcon,
} from "../NavigationMenu/Value";
import { auto } from "@popperjs/core";

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
        <TableHeadingButton onClick={props.setIsOpen}>
          <TableHeadingButtonPlusIcon></TableHeadingButtonPlusIcon>
          Add New
        </TableHeadingButton>
      </TableHeadingSection>
      {(props.globalLeave && props.financialYearData) ||
      (props.currency && props.financialYearData) ? (
        <React.Fragment>
          <div class="filter">
            <span style={{ paddingRight: "2%" }}>
              Financial year:
              <select
                id="filterSelect"
                onChange={(e) => {
                  if (props.currency == true) {
                    props.getAllCurrency(e.target.value);
                  }
                  props.getAllGlobalLLF(e.target.value);
                }}
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
            <span
              style={{
                display: props.globalLeave ? "none" : "",
                paddingRight: "2%",
              }}
            >
              Base Currency: <input type="text" id="email" spellcheck="false" />{" "}
            </span>
            <span style={{ paddingRight: "2%" }}>
              Copy From:{" "}
              <select
                type="text"
                id="email"
                onChange={(e) => {
                  setCopyData({ ...copyData, copyFromFy: e.target.value });
                }}
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
            <span style={{ paddingRight: "2%" }}>
              Copy To:{" "}
              <select
                type="text"
                id="email"
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
              >
                <option value="" disabled selected hidden>
                  Please choose one
                </option>
                {props.data.financialYearData.map((fyData, index) => {
                  const fyNameData = fyData.financialYearName;
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
                })}
              </select>
            </span>
            <span style={{ paddingRight: "2%" }}>
              <button
                id="filterButton"
                onClick={(e) => props.copyFromFyToNewFy(copyData)}
              >
                Apply
              </button>
              {console.log("this is in BC copyFromFy", copyData.copyFromFy)}
            </span>
          </div>
          <table style={{ overflow: auto }}>
            <tr>
              {props.columns.map((header) => {
                return <th>{header}</th>;
              })}
            </tr>
            <tbody>
              {props.data &&
                props.data.actualDataObject.map((obj, id) =>
                  props.Tr({ ...obj })
                )}
            </tbody>
          </table>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <table style={{ fontSize: "1vw" }}>
            <tr>
              {props.columns.map((header) => {
                return <th>{header}</th>;
              })}
            </tr>
            <tbody>
              {props.data && props.data.map((obj, id) => props.Tr({ ...obj }))}
            </tbody>
          </table>
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
