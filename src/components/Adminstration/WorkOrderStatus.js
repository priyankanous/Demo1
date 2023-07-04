import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalFormButton, ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel,InputField, ButtonSection,ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function WorkOrderStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [woStatusName, setWorkOrderStatusName] = useState(null);
  const [woStatusDisplayName, setWorkOrderStatusDisplayName] = useState(null);
  const [woStatusData, setWoStatusData] = useState({
    woStatusName: "",
    woStatusDisplayName: "",
  });

  useEffect(() => {
    getAllWorkOrderData();
  }, []);
  const getAllWorkOrderData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const AddDataToWorkOrderStatus = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus",
        woStatusData
      );
      setIsOpen(false);
      getAllWorkOrderData();
    } catch {}
  };
  return (
    <div>
      <MemoizedBaseComponent
        field="Work Order status"
        buttonText="setup WO Status"
        columns={["Name", "Display Name",""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              getAllWorkOrderData={getAllWorkOrderData}
              setWoStatusData={setWoStatusData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Setup Work Order Status</ModalHeading>
              <ModalIcon
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <AiOutlineClose></AiOutlineClose>
              </ModalIcon>
              <hr color="#62bdb8"></hr>
              <form id="reg-form">
                <div>
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    spellcheck="false"
                    onChange={(e) => {
                      setWoStatusData({
                        ...woStatusData,
                        woStatusName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Display Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setWoStatusData({
                        ...woStatusData,
                        woStatusDisplayName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={AddDataToWorkOrderStatus}
                    />
                    <input
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      value="Cancel"
                      id="create-account"
                      class="button"
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Tr({
  getAllWorkOrderData,
  setWoStatusData,
  data: { woStatusId, woStatusName, woStatusDisplayName, isActive },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    woStatusId: woStatusId,
    woStatusName: woStatusName,
    woStatusDisplayName: woStatusDisplayName,
  });

  const OutsideClick = (ref) => {
    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef);

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus/${woStatusId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllWorkOrderData();
      });
  };
  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setWoStatusData({ woStatusName: "", woStatusDisplayName: "" });
      setIsOpen(false);
      getAllWorkOrderData();
    }
  };
  // API calls to delete Record

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/wostatus/${woStatusId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllWorkOrderData();
        setIsOpen(false);
      });
  };
  return (
    <React.Fragment>
            <TableRowSection ref={wrapperRef}>
        <TableCellSection >
          <span>{woStatusName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection >
          <span>{woStatusDisplayName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection >
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div style={{ float: "right", right:"20px",position:"fixed" }} class="dropdown-content">
                <a
                  style={{ padding: "5px" }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <AiIcons.AiOutlineEdit />
                  Edit
                </a>
                <a
                 
                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <AiIcons.AiOutlineDelete /> Delete
                </a>
                {/* <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(woStatusId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a> */}
                {/* <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(woStatusId);
                  }}
                  style={{ padding: "5px" }}
                >
                  <AiIcons.AiOutlineCloseCircle /> Deactivate
                </a> */}
              </div>
            )}
          </span>
        </TableCellSection>
      </TableRowSection>
      {/* <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Edit Work Order Status</ModalHeading>
              <ModalIcon
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <AiOutlineClose></AiOutlineClose>
              </ModalIcon>
              <hr color="#62bdb8"></hr>
              <form id="reg-form">
                <div>
                  <label for="financial_year_name">Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.woStatusName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        woStatusName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="financial_year_disp_name">Display Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.woStatusDisplayName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        woStatusDisplayName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={OnSubmit}
                    />
                    <input
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      value="Cancel"
                      id="create-account"
                      class="button"
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal> */}
    </React.Fragment>
  );
}

export default WorkOrderStatus;
