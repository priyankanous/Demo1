/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
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


function CocPractice() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buNameData, setBuNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cocPracticeData, setCocPracticeData] = useState({
    cocPracticeName: "",
    cocPracticeDisplayName: "",
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

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isDisplayNameEmpty, setIsDisplayNameEmpty] = useState(false);
  const [isBu, setIsBu] = useState(false);

  useEffect(() => {
    getAllCocData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
    setIsNameEmpty(false);
    setIsDisplayNameEmpty(false);
    setIsBu(false);
    setCocPracticeData({
    cocPracticeName: "",
    cocPracticeDisplayName: "",
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
  };

  const getAllCocData = () => {
    getAllBuNameData();
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const getAllBuNameData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setBuNameData(actualDataObject);
      });
  };
  const AddDataToCocPractice = async (e) => {
        if (cocPracticeData.cocPracticeName.trim() === '') {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
    }

    if (cocPracticeData.cocPracticeDisplayName.trim() === '') {
      setIsDisplayNameEmpty(true);
    } else {
      setIsDisplayNameEmpty(false);
    }
    if (cocPracticeData.businessUnit.businessUnitName.trim() === '') {
      setIsBu(true);
    } else {
      setIsBu(false);
    }
    if (!isNameEmpty && !isDisplayNameEmpty && !isBu) {

    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice",
        cocPracticeData
      );
      console.log("this is the response", response.data);
      getAllCocData();
      setIsOpen(false);
    } catch { }
  }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="COC Practice"
        buttonText="setup COC Practice"
        columns={["Name", "Display Name", "Parent BU", ""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              buNameData={buNameData}
              getAllCocData={getAllCocData}
              setCocPracticeData={setCocPracticeData}
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
            <ModalHeadingText>Setup COC Practice</ModalHeadingText>
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
                              <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Name</span>
                </InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setCocPracticeData({
                      ...cocPracticeData,
                      cocPracticeName: e.target.value,
                    });
                  }}
                  style={{ border: isNameEmpty ? '1px solid red' : '1px solid transparent',
                  borderRadius: '5px',}}

                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                              <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Display Name</span>
                </InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setCocPracticeData({
                      ...cocPracticeData,
                      cocPracticeDisplayName: e.target.value,
                    });
                  }}
style={{
                    border: isDisplayNameEmpty ? '1px solid red' : '1px solid transparent',
                    borderRadius: '5px',
                  }}
                />
              </div>

              {/* <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Parent Business Unit</InputTextLabel>
                <FormControl fullWidth>
                  <Select
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

                      setCocPracticeData({
                        ...cocPracticeData,
                        businessUnit: {
                          ...cocPracticeData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          // organization: {
                          //   ...cocPracticeData.businessUnit.organization,
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
                            key={index}
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            // data-orgId={orgId}
                            // data-orgName={orgName}
                            // data-orgDisplayName={orgDisplayName}
                            value={JSON.stringify(buNameData)}

                          >
                            {buNameData}

                          </MenuItem>
                        );
                      }
                    })}
                  </Select>
                </FormControl>
              </div> */}


              <div >
                <label style={{ fontWeight: "400", fontSize: "16px" }} for="email">
                  <span style={{color:"red"}}>*</span>
                  <span>Parent BU</span>
                </label>
                <select
                  style={{ height: "37px", width: "100%", marginBottom: "10px", borderRadius: "7px", boxShadow: "none", border: isBu ? '1px solid red' : '1px solid lightgray',
 }}
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

                    setCocPracticeData({
                      ...cocPracticeData,
                      businessUnit: {
                        ...cocPracticeData.businessUnit,
                        businessUnitId: selectedBuId,
                        businessUnitName: e.target.value,
                        businessUnitDisplayName: selectedBuDispName,
                        // organization: {
                        //   ...cocPracticeData.businessUnit.organization,
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
                  onClick={AddDataToCocPractice}


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
  getAllCocData,
  setCocPracticeData,
  buNameData,
  data: {
    cocPracticeId,
    cocPracticeName,
    cocPracticeDisplayName,
    businessUnit,
    isActive,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    cocPracticeId: cocPracticeId,
    cocPracticeName: cocPracticeName,
    cocPracticeDisplayName: cocPracticeDisplayName,
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/${cocPracticeId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllCocData();
      });
  };
  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setCocPracticeData({
        cocPracticeName: "",
        cocPracticeDisplayName: "",
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
      getAllCocData();
    }
  };
  // API calls to delete Record

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/${cocPracticeId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllCocData();
        setIsOpen(false);
      });
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection >
          <span>{cocPracticeName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection >
          <span>{cocPracticeDisplayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
          <span>
            {businessUnit.businessUnitName || "Unknown"}
          </span>
        </TableCellSection>
        <TableCellSection style={{position:"relative"}}>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div 
                            style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none"  }}

              class="dropdown-content">
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
                  onClick={(e) => {
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
                    activeDeactivateTableData(cocPracticeId);
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
                    activeDeactivateTableData(cocPracticeId);
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
            <ModalHeadingText>Edit COC Practice</ModalHeadingText>
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
                  id="id"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData.cocPracticeName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      cocPracticeName: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Display Name</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="id"
                  variant="outlined"
                  spellcheck="false"
                  value={responseData.cocPracticeDisplayName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      cocPracticeDisplayName: e.target.value,
                    });
                  }}
                />
              </div>


              <div >
                <label for="email" style={{ fontWeight: "400", fontSize: "16px" }}>Parent Business Unit</label>
                <select
                  style={{ height: "37px", width: "100%", marginBottom: "10px", borderRadius: "7px", boxShadow: "none", border: "1px solid lightgray" }}

                  value={responseData.businessUnit.businessUnitName}
                  onChange={(e) => {
                    const selectedBuId =
                      e.target.selectedOptions[0].getAttribute("data-buId");
                    const selectedBuDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-buDisplayName"
                      );

                    setResponseData({
                      ...responseData,
                      businessUnit: {
                        ...responseData.businessUnit,
                        businessUnitId: selectedBuId,
                        businessUnitName: e.target.value,
                        businessUnitDisplayName: selectedBuDispName,
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

export default CocPractice;
