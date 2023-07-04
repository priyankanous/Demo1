import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
// import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


function Sbu() {
  const [data, setData] = useState(null);
  const [buNameData, setBuNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sbuData, setSbuData] = useState({
    sbuName: "",
    sbuDisplayName: "",
    businessUnit: {
      businessUnitId: "",
      businessUnitName: "",
      businessUnitDisplayName: "",
      organization: {
        id: 0,
        orgName: "",
        orgDisplayName: "",
      },
    },
  });
  useEffect(() => {
    getAllSbuData();
  }, []);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getBuNameData = async () => {
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setBuNameData(actualDataObject);
      });
  };
  const getAllSbuData = async () => {
    getBuNameData();
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  const AddDataToSbu = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu",
        sbuData
      );
      console.log("this is the response", response.data);
      setIsOpen(false);
      getAllSbuData();
    } catch { }
  };
  return (
    <div>
      <MemoizedBaseComponent
        field="SBU"
        buttonText="setup SBU"
        columns={["Name", "Display Name", "Parent Business Unit"]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              buNameData={buNameData}
              getAllSbuData={getAllSbuData}
              setSbuData={setSbuData}
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
            <ModalHeadingText>Setup SBU</ModalHeadingText>
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
                  spellcheck="false"
                  variant="outlined"
                  onChange={(e) => {
                    setSbuData({
                      ...sbuData,
                      sbuName: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Display Name</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="name"
                  spellcheck="false"
                  variant="outlined"
                  onChange={(e) => {
                    setSbuData({
                      ...sbuData,
                      sbuDisplayName: e.target.value,
                    });
                  }}

                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Parent of BU</InputTextLabel>
                <FormControl fullWidth>
                  <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    size="small"
                    style={{ background: "white" }}
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );
                      const selectedOrgId =
                        e.target.selectedOptions[0].getAttribute("data-orgId");
                      const selectedOrgDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgDisplayName"
                        );
                      const selectedOrgName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgName"
                        );

                      setSbuData({
                        ...sbuData,
                        businessUnit: {
                          ...sbuData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          organization: {
                            ...sbuData.businessUnit.organization,
                            id: selectedOrgId,
                            orgName: selectedOrgName,
                            orgDisplayName: selectedOrgDispName,
                          },
                        },
                      });
                    }}

                  >
                    {buNameData.map((buData, index) => {
                      const buNameData = buData.businessUnitName;
                      const buId = buData.businessUnitId;
                      const buDisplayName = buData.businessUnitDisplayName;
                      const orgId = buData.organization.id;
                      const orgName = buData.organization.orgName;
                      const orgDisplayName = buData.organization.orgDisplayName;
                      if (buData.isActive) {
                        return (
                          <MenuItem
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            data-orgId={orgId}
                            data-orgName={orgName}
                            data-orgDisplayName={orgDisplayName}
                            key={index}
                            value={JSON.stringify(sbuData)}
                          >

                            {buNameData}

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
                  onClick={AddDataToSbu}

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
  buNameData,
  getAllSbuData,
  setSbuData,
  data: { sbuId, sbuName, sbuDisplayName, businessUnit, isActive },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    sbuId: sbuId,
    sbuName: sbuName,
    sbuDisplayName: sbuDisplayName,
    businessUnit: {
      businessUnitId: businessUnit.businessUnitId,
      businessUnitName: businessUnit.businessUnitName,
      businessUnitDisplayName: businessUnit.businessUnitDisplayName,
      organization: {
        id: businessUnit.organization.id,
        orgName: businessUnit.organization.orgName,
        orgDisplayName: businessUnit.organization.orgDisplayName,
      },
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu/${sbuId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllSbuData();
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setSbuData({
        sbuName: "",
        sbuDisplayName: "",
        businessUnit: {
          businessUnitId: "",
          businessUnitName: "",
          businessUnitDisplayName: "",
          organization: {
            id: 0,
            orgName: "",
            orgDisplayName: "",
          },
        },
      });
      setIsOpen(false);
      getAllSbuData();
    }
  };
  // API calls to delete record

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu/${sbuId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllSbuData();
        setIsOpen(false);
      });
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection>
          <span>{sbuName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>{sbuDisplayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>
            {businessUnit.businessUnitName || "Unknown"}
          </span>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div style={{ float: "right", right: "20px", position: "fixed" }} class="dropdown-content">
                <a
                  style={{ padding: "5px" }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />

                  Edit
                </a>
                <a

                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                  Delete
                </a>
                {/* <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(sbuId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a> */}
                {/* <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(sbuId);
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
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Edit SBU</ModalHeading>
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
                    value={responseData.sbuName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        sbuName: e.target.value,
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
                    value={responseData.sbuDisplayName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        sbuDisplayName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Parent Business Unit</label>
                  <select
                    value={responseData.businessUnit.businessUnitName}
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );
                      const selectedOrgId =
                        e.target.selectedOptions[0].getAttribute("data-orgId");
                      const selectedOrgDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgDisplayName"
                        );
                      const selectedOrgName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgName"
                        );

                      setResponseData({
                        ...responseData,
                        businessUnit: {
                          ...responseData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          organization: {
                            ...responseData.businessUnit.organization,
                            id: selectedOrgId,
                            orgName: selectedOrgName,
                            orgDisplayName: selectedOrgDispName,
                          },
                        },
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {buNameData.map((buData, index) => {
                      const buNameData = buData.businessUnitName;
                      const buId = buData.businessUnitId;
                      const buDisplayName = buData.businessUnitDisplayName;
                      const orgId = buData.organization.id;
                      const orgName = buData.organization.orgName;
                      const orgDisplayName = buData.organization.orgDisplayName;
                      if (buData.isActive) {
                        return (
                          <option
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            data-orgId={orgId}
                            data-orgName={orgName}
                            data-orgDisplayName={orgDisplayName}
                            key={index}
                          >
                            {buNameData}
                          </option>
                        );
                      }
                    })}
                  </select>
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
      </Modal>
    </React.Fragment>
  );
}
export default Sbu;
