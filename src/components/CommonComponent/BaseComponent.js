import React from "react";
import { AiFillPlusSquare ,AiOutlineMore} from "react-icons/ai";
import {
  TableHeadingSection,
  TableHeading,
  TableHeadingButton,
  TableHeadingButtonPlusIcon,
} from "../NavigationMenu/Value";

function BaseComponent(props) {
  const options = ['One', 'Two', 'Three', 'Four', 'Five'];
  const onOptionChangeHandler = (event) => {}
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
          <span style={{paddingRight: '2%'}}>Financial year: <select id="filterSelect" onChange={onOptionChangeHandler}>
                    <option>Choose Year</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                </select> </span>
          <span style={{display: props.globalLeave ?"none" :"",paddingRight: '2%'}}>Base Currency: <input type="text" id="email" spellcheck="false"/> </span>
          <span style={{paddingRight: '2%'}}>Copy From: <select id="filterSelect" onChange={onOptionChangeHandler}>
                    <option>Choose Year</option>
                    {options.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                </select>  </span>
          <span style={{paddingRight: '2%'}}><button id="filterButton">Apply</button></span>
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
