import React, { useState, useEffect } from "react";
import BaseComponent from "../CommonComponent/BaseComponent";
import Modal from "react-modal";

function BuisnessUnit() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <BaseComponent
        field="BU"
        actionButtonName="Setup BU"
        firstHeader="BusinessUnit Name"
        secondHeader="BusinessUnit Display Name"
        thirdHeader="Child Of Organization"
        fourthHeader="Test"
        data={data}
        Tr={Tr}
      />
    </div>
  );
}

function Tr({ userId, id, title, completed }) {
  return (
    <tr>
      <td>
        <span>{id || "Unknown"}</span>
      </td>
      <td>
        <span>{userId || "Unknown"}</span>
      </td>
      <td>
        <span>{title || "Unknown"}</span>
      </td>
      <td>
        <span>{completed || "Unknown"}</span>
      </td>
    </tr>
  );
}

export default BuisnessUnit;
