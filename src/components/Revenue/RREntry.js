import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { RevenueMemoizedBaseComponent } from "../CommonComponent/RevenueBaseComponent";

function RREntry() {
  function collapse(cell) {
    const row = cell.parentElement;
    const target_row = row.parentElement.children[row.rowIndex + 1];
    if (target_row.style.display == "table-row") {
      cell.innerHTML = "+";
      target_row.style.display = "none";
    } else {
      cell.innerHTML = "-";
      target_row.style.display = "table-row";
    }
  }
  return (
    <div>
      <RevenueMemoizedBaseComponent
        collapse={collapse}
        columns={[" ", "Name", "Serial", "Email"]}
        data={[
          { Name: "Jame", Serial: "1", Email: "James@" },
          { Name: "Him", Serial: "1", Email: "Him@" },
        ]}
        data2={[{ DOB: "06", Country: "India" }]}
        Tr={(obj) => {
          return <Tr data={obj} data2={obj} collapse={collapse} />;
        }}
      />
    </div>
  );
}
function Tr({
  data: { Name, Serial, Email },
  data2: { DOB, Country },
  collapse,
}) {
  return (
    <React.Fragment>
      {console.log("This is the inneHTML")}
      <tr>
        <td id="collapseButton">
          <span>+</span>
        </td>
        <td>
          <span>{Name || "Unknown"}</span>
        </td>
        <td>
          <span>{Serial || "Unknown"}</span>
        </td>
        <td>
          <span>{Email || "Unknown"}</span>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default RREntry;
