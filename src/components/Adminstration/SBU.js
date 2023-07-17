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
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';


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
      // organization: {
      //   id: 0,
      //   orgName: "",
      //   orgDisplayName: "",
      // },
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
        columns={["Name", "Display Name", "Parent Business Unit",""]}
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
            <form id="reg-form" style={{ padding: "0px 30px" }}>
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
              {/* <div style={{ padding: "10px 0px" }}>
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
                      // const selectedOrgId =
                      //   e.target.selectedOptions[0].getAttribute("data-orgId");
                      // const selectedOrgDispName =
                      //   e.target.selectedOptions[0].getAttribute(
                      //     "data-orgDisplayName"
                      //   );
                      // const selectedOrgName =
                      //   e.target.selectedOptions[0].getAttribute(
                      //     "data-orgName"
                      //   );

                      setSbuData({
                        ...sbuData,
                        businessUnit: {
                          ...sbuData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          // organization: {
                          //   ...sbuData.businessUnit.organization,
                          //   id: selectedOrgId,
                          //   orgName: selectedOrgName,
                          //   orgDisplayName: selectedOrgDispName,
                          // },
                        },
                      });
                    }}

                  >
                    {buNameData.map((buData, index) => {
                      const buNameData = buData.businessUnitName;
                      const buId = buData.businessUnitId;
                      const buDisplayName = buData.businessUnitDisplayName;
                      // const orgId = buData.organization.id;
                      // const orgName = buData.organization.orgName;
                      // const orgDisplayName = buData.organization.orgDisplayName;
                      if (buData.isActive) {
                        return (
                          <MenuItem
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            // data-orgId={orgId}
                            // data-orgName={orgName}
                            // data-orgDisplayName={orgDisplayName}
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
              </div> */}

<div>
                  <label for="email" style={{fontWeight:"400",fontSize:"16px"}}>Parent Business Unit</label>
                  <select
                  style={{height:"37px", width:"100%", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray"}}
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );
                      // const selectedOrgId =
                      //   e.target.selectedOptions[0].getAttribute("data-orgId");
                      // const selectedOrgDispName =
                      //   e.target.selectedOptions[0].getAttribute(
                      //     "data-orgDisplayName"
                      //   );
                      // const selectedOrgName =
                      //   e.target.selectedOptions[0].getAttribute(
                      //     "data-orgName"
                      //   );

                      setSbuData({
                        ...sbuData,
                        businessUnit: {
                          ...sbuData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          // organization: {
                          //   ...sbuData.businessUnit.organization,
                          //   id: selectedOrgId,
                          //   orgName: selectedOrgName,
                          //   orgDisplayName: selectedOrgDispName,
                          // },
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
                      // const orgId = buData.organization.id;
                      // const orgName = buData.organization.orgName;
                      // const orgDisplayName = buData.organization.orgDisplayName;
                      if (buData.isActive) {
                        return (
                          <option
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            // data-orgId={orgId}
                            // data-orgName={orgName}
                            // data-orgDisplayName={orgDisplayName}
                            key={index}
                          >
                            {buNameData}
                          </option>
                        );
                      }
                    })}
                  </select>
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
      // organization: {
      //   id: businessUnit.organization.id,
      //   orgName: businessUnit.organization.orgName,
      //   orgDisplayName: businessUnit.organization.orgDisplayName,
      // },
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
          // organization: {
          //   id: 0,
          //   orgName: "",
          //   orgDisplayName: "",
          // },
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
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{sbuName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{sbuDisplayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>
            {businessUnit.businessUnitName || "Unknown"}
          </span>
          </TableCellSection>
          <TableCellSection>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div style={{ float: "right", right: "20px", position: "fixed" }} class="dropdown-content">
                <a
                className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />

                  Edit
                </a>
                <a
className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                  Delete
                </a>
                <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(sbuId);
                  }}
                >
                                  <div style={{ display: "flex" }}>

<ToggleOnIcon style={{ fontSize: "22px", paddingRight: "3px" }} />

<p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
</div>
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(sbuId);
                  }}
                  style={{ padding: "5px" }}
                >
                                  <div style={{ display: "flex" }}>
                  <ToggleOffIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                  <p style={{ margin: "3px 0px 0px 0px" }}>Deactivate</p>
                </div>
                </a>
              </div>
            )}
          </span>
        </TableCellSection>
      </TableRowSection>
      <Modal
                open={isOpen}
                // onClose={handleModalClose}
      >
                <Box sx={MoadalStyle}>

                <ModalHeadingSection>
            <ModalHeadingText>Edit SBU</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>


              <form id="reg-form" style={{ padding: "0px 30px" }}>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Name</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="name"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.sbuName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      sbuName: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Display Name</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
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
                  <label for="email"  style={{fontWeight:"400",fontSize:"16px"}}>Parent Business Unit</label>
                  <select
                  style={{height:"35px", width:"100%", marginBottom:"10px", borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray"}}
                    value={responseData.businessUnit.businessUnitName}
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );
                      // const selectedOrgId =
                      //   e.target.selectedOptions[0].getAttribute("data-orgId");
                      // const selectedOrgDispName =
                      //   e.target.selectedOptions[0].getAttribute(
                      //     "data-orgDisplayName"
                      //   );
                      // const selectedOrgName =
                      //   e.target.selectedOptions[0].getAttribute(
                      //     "data-orgName"
                      //   );

                      setResponseData({
                        ...responseData,
                        businessUnit: {
                          ...responseData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          // organization: {
                          //   ...responseData.businessUnit.organization,
                          //   id: selectedOrgId,
                          //   orgName: selectedOrgName,
                          //   orgDisplayName: selectedOrgDispName,
                          // },
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
                      // const orgId = buData.organization.id;
                      // const orgName = buData.organization.orgName;
                      // const orgDisplayName = buData.organization.orgDisplayName;
                      if (buData.isActive) {
                        return (
                          <option
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            // data-orgId={orgId}
                            // data-orgName={orgName}
                            // data-orgDisplayName={orgDisplayName}
                            key={index}
                          >
                            {buNameData}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>

                <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={OnSubmit}


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
    </React.Fragment>
  );
}
export default Sbu;
