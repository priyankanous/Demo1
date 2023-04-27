import React, { useEffect, useState } from "react";
import {
  TableHeadingSection,
  TableHeading,
  TableHeadingButton,
  TableHeadingButtonPlusIcon,
} from "../NavigationMenu/Value";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

export function RevenueBaseComponent(props) {
  const columns = ["+"];
  return (
    <div className="table_container">
      <TableHeadingSection>
        <TableHeading>Rolling Revenue Entry</TableHeading>
        <TableHeadingButton>Export</TableHeadingButton>
      </TableHeadingSection>
      <table>
        <tr className="trrevenue">
          <td style={{ paddingLeft: "10px" }}>
            <a>
              <FaIcons.FaPlus />
            </a>
            <a style={{ paddingLeft: "4px" }}>
              <AiIcons.AiFillCopy />
            </a>
            <a style={{ paddingLeft: "4px" }}>
              <AiIcons.AiOutlineEdit />
            </a>
            <a style={{ paddingLeft: "4px" }}>
              <AiIcons.AiOutlineDelete />
            </a>
          </td>
          <td className="tdrevenue">
            <input type="checkbox" className="revenueinput" />
            <label>Include Additional Quater Display</label>
            <button className="button">Submit</button>
          </td>
        </tr>
      </table>
      <React.Fragment>
        <table style={{ marginTop: "19px" }}>
          <tr>
            {props.columns.map((header) => {
              return <th>{header}</th>;
            })}
          </tr>
          <tbody>
            {props.data && props.data.map((obj, id) => props.Tr({ ...obj }))}
          </tbody>
          <tr id="hidden">
            <td></td>
            <td colSpan={3}>
              <table>
                <tbody>
                  {props.data2 &&
                    props.data2.map((obj, id) => props.Tr({ ...obj }))}
                </tbody>
              </table>
            </td>
          </tr>
        </table>
      </React.Fragment>
    </div>
  );
}

export const RevenueMemoizedBaseComponent = React.memo(
  RevenueBaseComponent,
  (prevProps, nextProps) => {
    if (JSON.stringify(prevProps?.data) === JSON.stringify(nextProps?.data))
      return true;
    return false;
  }
);
