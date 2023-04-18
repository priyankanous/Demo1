import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import {
  TableHeadingSection,
  TableHeading,
  TableHeadingButton,
  TableHeadingButtonPlusIcon,
} from "../NavigationMenu/Value";

function BaseComponent(props) {
  return (
    <div className="table_container">
      <TableHeadingSection>
        <TableHeading>Administration - {props.field}</TableHeading>
        <TableHeadingButton onClick={props.setIsOpen}>
          <TableHeadingButtonPlusIcon>
            <AiFillPlusSquare></AiFillPlusSquare>
          </TableHeadingButtonPlusIcon>
          {props.actionButtonName}
        </TableHeadingButton>
      </TableHeadingSection>
      {props.globalLeave || props.currency ? (
        <React.Fragment>
          <div class="filter">
            <span style={{ paddingRight: "2%" }}>
              Financial year:
              <select
                id="filterSelect"
                onChange={(e) => {
                  props.getAllGlobalLLF(e.target.value);
                }}
              >
                <option value="" disabled selected hidden>
                  Please choose one option
                </option>
                {props.financialYearData.map((fyData, index) => {
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
              Copy From: <input type="text" id="email" spellcheck="false" />{" "}
            </span>
            <span style={{ paddingRight: "2%" }}>
              <button id="filterButton">Apply</button>
            </span>
          </div>
          <table>
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
      ) : (
        <React.Fragment>
          <table style={{fontSize:'1vw'}}>
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
  BaseComponent,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
      return true;
    return false;
  }
);
