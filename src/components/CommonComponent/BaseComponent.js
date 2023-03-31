import React from "react";
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
          <span style={{paddingRight: '2%'}}>Financial year: <input type="text" id="email" spellcheck="false"/> </span>
          <span style={{display: props.globalLeave ?"none" :"",paddingRight: '2%'}}>Base Currency: <input type="text" id="email" spellcheck="false"/> </span>
          <span style={{paddingRight: '2%'}}>Copy From: <input type="text" id="email" spellcheck="false"/> </span>
          <span style={{paddingRight: '2%'}}><TableHeadingButton>Apply</TableHeadingButton></span>
        </div>
          <table id="style">
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
      )}
    </div>
  );
}

export default BaseComponent;
