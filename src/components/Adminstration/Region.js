import BaseComponent from "../CommonComponent/BaseComponent";
import React, { useState, useEffect } from "react";

function Region() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
      });
  }, []);

  return (
    <div>
      <BaseComponent
        field="Region"
        actionButtonName="Setup Region"
        firstHeader="Region Name"
        secondHeader="Region Display Name"
        data={data}
        Tr={Tr}
      />
    </div>
  );
}
function Tr({ name, username }) {
  return (
    <tr>
      <td>
        <span>{name || "Unknown"}</span>
      </td>
      <td>
        <span>{username || "Unknown"}</span>
      </td>
    </tr>
  );
}
export default Region;
