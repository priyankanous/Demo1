import React, { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";

function BaseComponent(props) {
  return (
    <div className="table_container">
      <div className="subDiv">
        <h3>Administration - {props.field}</h3>
        <button class="button1" onClick={props.setIsOpen}>
          <AiFillPlusSquare></AiFillPlusSquare> {props.actionButtonName}
        </button>
      </div>
      <table>
        <tr>
          <th>{props.firstHeader}</th>
          <th>{props.secondHeader}</th>
          <th>{props.thirdHeader}</th>
          <th>{props.fourthHeader}</th>
        </tr>
        <tbody>
          {props.data && props.data.map((obj, id) => props.Tr({ ...obj }))}
        </tbody>
      </table>
    </div>
  );
}

export default BaseComponent;
