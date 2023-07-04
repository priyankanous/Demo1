import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button, Checkbox } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel,InputField, ButtonSection,ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


function BuisnessUnit() {
  const [data, setData] = useState(null);
  const [orgNameData, setOrgNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [businessUnitData, setBusinessUnitData] = useState({
    businessUnitName: "",
    businessUnitDisplayName: "",
    organization: { id: "", orgName: "", orgDisplayName: "" },
  });

  useEffect(() => {
    getAllBuData();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getAllBuData = () => {
    getOrgNameData();
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const getOrgNameData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/organization`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setOrgNameData(actualDataObject);
      });
  };
  const AddDataToBu = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit",
        businessUnitData
      );
      setIsOpen(false);
      getAllBuData();
    } catch { }
  };

  return (   
      <div>
        <MemoizedBaseComponent
          field="BU"
          buttonText="setup bu"
          columns={["Name","Display Name",""]}
          data={data}
          Tr={(obj) => {
            return (
              <Tr
                data={obj}
                getAllBuData={getAllBuData}
                orgNameData={orgNameData}
                setBusinessUnitData={setBusinessUnitData}
              />
            );
          }}
          setIsOpen={setIsOpen}
        />
        <Modal
          open={isOpen}
          onClose={handleModalClose}
        >
          <Box sx={MoadalStyle}>
            <ModalHeadingSection>
              <ModalHeadingText>Setup Business Unit</ModalHeadingText>
              <CloseIcon
                onClick={() => {
                  setIsOpen(false);
                }}
                style={{ cursor: "pointer" }}
              />
            </ModalHeadingSection>
            <ModalDetailSection>
              <form id="reg-form">
                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Name</InputTextLabel>
                  <InputField size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                    onChange={(e) => {
                      setBusinessUnitData({
                        ...businessUnitData,
                        businessUnitName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Display Name </InputTextLabel>
                  <InputField size="small"
                    type="text"
                    id="email"
                    variant="outlined"
                    onChange={(e) => {
                      setBusinessUnitData({
                        ...businessUnitData,
                        businessUnitDisplayName: e.target.value,
                      });
                    }}

                  />
                </div>
                <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Parent Org</InputTextLabel>
                  <FormControl fullWidth>
                    <Select
                      label="Candidate Type"
                      size="small"
                      style={{ background: "white" }}
                      onChange={(e) => {
                        const selectedId =
                          e.target.selectedOptions[0].getAttribute(
                            "data-orgId"
                          );
                        const selectedOrgDispName =
                          e.target.selectedOptions[0].getAttribute(
                            "data-orgDispName"
                          );

                        setBusinessUnitData({
                          ...businessUnitData,
                          organization: {
                            ...businessUnitData.organization,
                            id: selectedId,
                            orgName: e.target.value,
                            orgDisplayName: selectedOrgDispName,
                          },
                        });
                      }}
                    >
                      {orgNameData.map((orgDataName, index) => {
                        const orgName = orgDataName.orgName;
                        const orgId = orgDataName.id;
                        const orgDisplayName = orgDataName.orgDisplayName;
                        if (orgDataName.isActive) {
                          return (
                            <MenuItem
                              data-orgId={orgId}
                              data-orgDispName={orgDisplayName}
                              key={index}
                              value={orgName}
                            >
                              {orgName}
                            </MenuItem>
                          );
                        }
                      })}
                    </Select>
                  </FormControl>
                </div>
                <ButtonSection>
                  <ModalControlButton
                    type="button"
                    value="Save"
                    id="create-account"
                    variant="contained"
                    onClick={AddDataToBu}

                  >Save</ModalControlButton>
                  <ModalControlButton
                    type="button"
                    variant="contained"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    value="Cancel"
                    id="create-account"

                  >Cancel</ModalControlButton>
                </ButtonSection>
              </form>

            </ModalDetailSection>
          </Box>
        </Modal>

      </div>
  );
}

function Tr({
  getAllBuData,
  setBusinessUnitData,
  orgNameData,
  data: {
    businessUnitId,
    businessUnitName,
    businessUnitDisplayName,
    isActive,
    organization,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    businessUnitId: businessUnitId,
    businessUnitName: businessUnitName,
    businessUnitDisplayName: businessUnitDisplayName,
    organization: {
      id: organization.id,
      orgName: organization.orgName,
      orgDisplayName: organization.orgDisplayName,
    },
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/${businessUnitId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllBuData();
      });
  };
  // API calls to delete Record

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/${businessUnitId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllBuData();
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setBusinessUnitData({
        businessUnitName: "",
        businessUnitDisplayName: "",
        organization: { id: "", orgName: "", orgDisplayName: "" },
      });
      setIsOpen(false);
      getAllBuData();
    }
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection >
          <span>{businessUnitName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>{businessUnitDisplayName || "Unknown"}</span>
        </TableCellSection>
        {/* <TableCellSection>
          <span>
            {organization.orgName || "Unknown"}
          </span>
          </TableCellSection> */}
          <TableCellSection>
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
                  <BorderColorOutlinedIcon style={{fontSize:"12px", paddingRight:"5px"}} />
                  Edit
                </a>
                <a
                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <DeleteOutlinedIcon style={{fontSize:"15px", paddingRight:"5px"}} /> 
                  Delete
                </a>
                {/* <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(businessUnitId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a> */}
                {/* <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(businessUnitId);
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

    </React.Fragment>
  );
}

export default BuisnessUnit;
