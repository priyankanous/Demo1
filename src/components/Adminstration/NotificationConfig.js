import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import {
  modalStyleObject,
  notificationModalStyleObj,
} from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import EmailNotificationSetup from "./EmailNotificationSetup";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import * as AiIcons from "react-icons/ai";
import CloseIcon from '@mui/icons-material/Close';

const NotificationConfig = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [loadEmailSetup, setEmailSetup] = useState(false);
  const [isDropdown, setDropdown] = useState(false);


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
      <MemoizedBaseComponent
        field="Notification Templates"
        buttonText="setup Notification Template"
        columns={["Id", "Templ. Code", "Name",""]}
        data={data}
        Tr={Tr}
        setIsOpen={setIsOpen}
      />
      <Modal isOpen={isOpen} style={notificationModalStyleObj}>
        <EmailNotificationSetup setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

function Tr({ userId, id, title, completed }) {
  return (
    <TableRowSection >

      <TableCellSection >
        <span>{id || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection >
        <span>{userId || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection >
        <span>{title || "Unknown"}</span>
      </TableCellSection>
      <TableCellSection>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
            ></AiIcons.AiOutlineMore>
            </span>
            </TableCellSection>
    </TableRowSection>
  );
}

export default NotificationConfig;
