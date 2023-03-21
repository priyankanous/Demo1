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
      <table>
        <tr>
          <th>{props.firstHeader}</th>
          <th>{props.secondHeader}</th>
          <th>{props.thirdHeader}</th>
          <th>{props.fourthHeader}</th>
          <th>{props.fifthHeader}</th>
        </tr>
        <tbody>
          {props.data && props.data.map((obj, id) => props.Tr({ ...obj }))}
        </tbody>
      </table>
    </div>
  );
}

export default BaseComponent;
