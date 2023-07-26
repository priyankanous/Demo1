/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { defaultStyles } from "react-modal";
import { bdmStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value.js";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
// import Modal from "react-modal";
import {

  Modal
} from "@mui/material";
import {
  TableRowSection,
  TableCellSection,
  ModalHeadingSection,
  ModalHeadingText,
  ModalDetailSection,
  InputTextLabel,
  InputField,
  ButtonSection,
  ModalControlButton,
  MoadalStyle,
} from "../../utils/constantsValue";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

function Bdm() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bdmFormData, setbdmFormData] = useState({
    bdmName: "",
    bdmDisplayName: "",
    activeFrom: "",
    activeUntil: "",
    businessUnit: {
      businessUnitId: "",
      businessUnitName: "",
      businessUnitDisplayName: "",
    },
    regionUnit: {
      regionId: "",
      regionName: "",
      regionDisplayName: "",
    },
  });
  const [isBusinessUnitLinked, setBusinessUnitLinked] = useState(false);
  const [isRegionLinked, setRegionLinked] = useState(false);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [region, setRegion] = useState([]);
  const [dropdownOpenBU, setdropdownOpenBU] = useState(false);
  const [dropdownOpenReg, setdropdownOpenReg] = useState(false);
  const [selectedBusinessUnit, setselectedBusinessUnit] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const [buNameData, setBuNameData] = useState([]);
  const [regionData, setRegionData] = useState([]);

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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

  const getAllRegionData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions`)
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setRegionData(actualDataObject);
      });
  };

  const fetchBusinessUnitData = async () => {
    getBuNameData();
    getAllRegionData();
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit"
    );
    setBusinessUnit(data?.data);
  };

  const fetchRegionData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions"
    );
    setRegion(data?.data);
  };

  // const fetchBdmData = async () => {
  //   fetchBusinessUnitData();
  //   fetchRegionData();
  //   const { data } = await axios.get(
  //     "http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm"
  //   );
  //   setData(data?.data);
  // };

  const fetchBdmData = async () => {
    fetchBusinessUnitData();
    fetchRegionData();
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm`)
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  useEffect(() => {
    fetchBdmData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
        setbdmFormData({
          bdmName: "",
    bdmDisplayName: "",
    activeFrom: "",
    activeUntil: "",
    businessUnit: {
      businessUnitId: "",
      businessUnitName: "",
      businessUnitDisplayName: "",
    },
    regionUnit: {
      regionId: "",
      regionName: "",
      regionDisplayName: "",
    },
    })
  };

  const postBdmData = async () => {
    const { bdmDisplayName, bdmName, activeFrom, activeUntil,businessUnits, regions } = bdmFormData;
    let activeFromDt = "",
      activeUntilDt = "";

    if (activeFrom) {
      activeFromDt = `${
        parseInt(new Date(activeFrom).getDate()) < 10
          ? "0" + parseInt(new Date(activeFrom).getDate())
          : parseInt(new Date(activeFrom).getDate())
      }/${month[new Date(activeFrom).getMonth()]}/${new Date(
        activeFrom
      ).getFullYear()}`;
    }
    if (activeUntil) {
      activeUntilDt = `${
        parseInt(new Date(activeUntil).getDate()) < 10
          ? "0" + parseInt(new Date(activeUntil).getDate())
          : parseInt(new Date(activeUntil).getDate())
      }/${month[new Date(activeUntil).getMonth()]}/${new Date(
        activeUntil
      ).getFullYear()}`;
    }
    let bdmFromData = {
      bdmDisplayName,
      bdmName,
      activeFrom: activeFromDt,
      activeUntil: activeUntilDt,
      businessUnits: selectedBusinessUnit,
      regions: selectedRegion,
    };
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm/${isEditId}`,
        bdmFromData
      );
    } 
    else if(
      !bdmFormData?.bdmDisplayName ||
      !bdmFormData?.bdmName ||
      !bdmFormData.activeFrom 
      // !bdmFormData.businessUnits.businessUnitName
      // !bdmFormData.regionUnit.regionName ||
      // !bdmFormData.businessUnit.businessUnitName
    ){ 
      setIsSubmitted(true);
    }else {
      setIsSubmitted(false);
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm",
        bdmFromData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchBdmData();
      setIsEditId(null);
      setBusinessUnitLinked(false);
      setRegionLinked(false);
      setselectedBusinessUnit([]);
      setSelectedRegion([]);
      setdropdownOpenBU(false);
      setdropdownOpenReg(false);
    }
  };

  const editBDMData = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setbdmFormData({
        bdmName: data?.data?.bdmName,
        bdmDisplayName: data?.data?.bdmDisplayName,
        activeFrom: createDate(data?.data?.activeFrom),
        activeUntil: createDate(data?.data?.activeUntil),
      });
      setBusinessUnitLinked(
        data?.data?.businessUnits.length < 2 ? true : false
      );
      setRegionLinked(data?.data?.regions.length < 2 ? true : false);
      setselectedBusinessUnit(data?.data?.businessUnits);
      setSelectedRegion(data?.data?.regions);
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const createDate = (date) => {
    if (!date) {
      return ""; // Return an empty string or any other default value if date is not provided
    }

    let splitDate = date.split("/");
    let monthDate = `${
      month.indexOf(splitDate[1]) + 1 < 10
        ? "0" + String(month.indexOf(splitDate[1]) + 1)
        : month.indexOf(splitDate[1]) + 1
    }`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`;
  };

  const selectMarkDropdown = (value, type) => {
    console.log(value);
    if (type === "bu") {
      const indexOfSelectedValue = selectedBusinessUnit.findIndex(
        (valueObj) => {
          return valueObj.businessUnitName === value?.businessUnitName;
        }
      );
      if (indexOfSelectedValue === -1) {
        if (isBusinessUnitLinked) {
          setselectedBusinessUnit([value]);
        } else {
          setselectedBusinessUnit([...selectedBusinessUnit, value]);
        }
      } else {
        const arrayData = selectedBusinessUnit.filter((valueObj) => {
          return valueObj?.businessUnitName !== value?.businessUnitName;
        });
        setselectedBusinessUnit(arrayData);
      }
    } else if (type === "reg") {
      const indexOfSelectedValue = selectedRegion.findIndex((valueObj) => {
        return valueObj.regionName === value?.regionName;
      });
      if (indexOfSelectedValue === -1) {
        if (isRegionLinked) {
          setSelectedRegion([value]);
        } else {
          setSelectedRegion([...selectedRegion, value]);
        }
      } else {
        const arrayData = selectedRegion.filter((valueObj) => {
          return valueObj?.regionName !== value?.regionName;
        });
        setSelectedRegion(arrayData);
      }
    }
  };

  const checkElementInArray = (value, type) => {
    if (type === "bu") {
      if (
        selectedBusinessUnit.findIndex((valueObj) => {
          return valueObj.businessUnitName === value?.businessUnitName;
        }) === -1
      ) {
        return false;
      }
    } else if (type === "reg") {
      if (
        selectedRegion.findIndex((valueObj) => {
          return valueObj.regionName === value?.regionName;
        }) === -1
      ) {
        return false;
      }
    }
    return true;
  };

  const activateDeactivate = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      setBusinessUnitLinked(false);
      setRegionLinked(false);
      setselectedBusinessUnit([]);
      setSelectedRegion([]);
      setdropdownOpenBU(false);
      setdropdownOpenReg(false);
      fetchBdmData();
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="BDM"
        buttonText="Setup BDM"
        columns={[
          "Name",
          "Display Name",
          "Active From",
          "Active Until",
          "Linked BU",
          "Linked Region",
          " ",
        ]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              editBDMData={editBDMData}
              activateDeactivate={activateDeactivate}
              buNameData={buNameData}
              regionData={regionData}
              fetchBdmData={fetchBdmData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection style={{ height: "37px" }}>
            <ModalHeadingText>Setup BDM</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection
            style={{ padding: "2px 0px", height: "475px", overflow: "auto" }}
          >
            <form id="bdm-form">
              <div>
              <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="bdm-name"
                  variant="outlined"
                  spellcheck="false"
                  value={bdmFormData?.bdmName}
                  onChange={(e) => {
                    setbdmFormData({
                      ...bdmFormData,
                      bdmName: e.target.value,
                    });
                  }}
                  style={{    border:
                    isSubmitted && !bdmFormData?.bdmName ? "1px solid red" : "",
                  borderRadius: "4px",}}
                />
              </div>

              <div style={{ padding: "2px 0px" }}>
              <InputTextLabel>
                <span style={{ color: "red" }}>*</span>
<span>
                Display Name</span></InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="bdm-disp-name"
                  spellcheck="false"
                  variant="outlined"
                  value={bdmFormData?.bdmDisplayName}
                  onChange={(e) => {
                    setbdmFormData({
                      ...bdmFormData,
                      bdmDisplayName: e.target.value,
                    });
                  }}
                  style={{    border:
                    isSubmitted && !bdmFormData?.bdmDisplayName ? "1px solid red" : "",
                  borderRadius: "4px",}}
                />
              </div>

              <div style={{ padding: "2px 0px" }}>
                <InputTextLabel>
                <span style={{ color: "red" }}>*</span>
                <span>Active From</span></InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="bdm-activeFrom"
                  variant="outlined"
                  value={bdmFormData?.activeFrom}
                  onChange={(e) => {
                    setbdmFormData({
                      ...bdmFormData,
                      activeFrom: e.target.value,
                    });
                  }}
                  style={{                    border:
                    isSubmitted && !bdmFormData.activeFrom
                      ? "1px solid red"
                      : "1px solid lightgray",
                    borderRadius:"4px"}}
                />
              </div>

              <div style={{ padding: "2px 0px" }}>
                <InputTextLabel>
                
                Active Untill</InputTextLabel>
                <InputField
                  fullWidth
                  size="small"
                  type="date"
                  id="bdm-activeUntil"
                  value={bdmFormData?.activeUntil}
                  onChange={(e) => {
                    setbdmFormData({
                      ...bdmFormData,
                      activeUntil: e.target.value,
                    });
                  }}
                  
                />
              </div>

              {/* <div>
                  <label for="email" style={{fontWeight:"400",fontSize:"16px"}}>Linked Business Unit</label>
                  <select
                  style={{height:"37px", width:"100%", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray"}}
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );

                        setbdmFormData({
                        ...bdmFormData,
                        businessUnit: {
                          ...bdmFormData.businessUnit,
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
                </div> */}

              {/* <div>
                  <label for="email" style={{fontWeight:"400",fontSize:"16px"}}>Linked Rigion</label>
                  <select
                  style={{height:"37px", width:"100%", marginBottom:"10px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray"}}
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );

                        setbdmFormData({
                        ...bdmFormData,
                        regionUnit: {
                          ...bdmFormData.regionUnit,
                          regionId: selectedBuId,
                          regionName: e.target.value,
                          regionDisplayName: selectedBuDispName,
                        },
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {regionData.map((buData, index) => {
                      const regionData = buData.regionName;
                      const buId = buData.regionId;
                      const buDisplayName = buData.regionDisplayName;
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
                            {regionData}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div> */}

              <div>
                <label className="label-bdm">
                  <input
                    onClick={() => {
                      setBusinessUnitLinked(!isBusinessUnitLinked);
                      setselectedBusinessUnit([]);
                      setdropdownOpenBU(false);
                    }}
                    className={`label-bdm-input ${
                      isBusinessUnitLinked && "checkit"
                    }`}
                    type="checkbox"
                    style={{ border: "1px solid darkgray" }}
                  />
                  <span style={{ color: "red" }}>*</span>
                  <span style={{ verticalAlign: "middle", fontSize: "0.8rem" }}>
                    Is Linked to BU
                  </span>
                </label>
                <div class="container">
                  <div
                    onClick={() => {
                      setdropdownOpenBU(!dropdownOpenBU);
                    }}
                    style={{
                      position: "sticky",
                      backgroundColor: "#FFFFFF",
                      top: "0",
                      width: "95%",
                      height: "35px",
                      marginBottom: "10px",
                      borderRadius: "7px",
                      boxShadow: "none",
                      // border:"1px solid lightgray"
                      border:
                    isSubmitted && !bdmFormData.businessUnits ? "1px solid red" : "1px solid lightgray",
                      
                    }}
                    className={`select-btn ${dropdownOpenBU && "open"}`}
                  >
                    <span class="btn-text">Select Business Unit</span>
                    <span class="arrow-dwn">
                      <i class="fa-solid fa-chevron-down">
                        <AiIcons.AiOutlineCaretUp></AiIcons.AiOutlineCaretUp>
                      </i>
                    </span>
                  </div>

                  <ul
                    style={{
                      overflowY: "auto",
                      // height: "200px",
                      height: "auto",

                      width: "90%",
                    }}
                    className={`list-items ${
                      dropdownOpenBU && "open-list-items"
                    }`}
                  >
                    {businessUnit &&
                      businessUnit.map((value, index) => {
                        return (
                          <li
                            onClick={() => {
                              selectMarkDropdown(value, "bu");
                            }}
                            key={index}
                            class={`item ${
                              checkElementInArray(value, "bu") && "checked"
                            }`}
                          >
                            <span
                              style={{
                                borderRadius: isBusinessUnitLinked && "50%",
                              }}
                              class="checkbox"
                            >
                              {!isBusinessUnitLinked && (
                                <i class="fa-solid fa-check check-icon">
                                  <AiIcons.AiOutlineCheck />
                                </i>
                              )}
                            </span>
                            <span class="item-text">
                              {value?.businessUnitName}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div>
                <label className="label-bdm">
                  <input
                    onClick={() => {
                      setRegionLinked(!isRegionLinked);
                      setSelectedRegion([]);
                      setdropdownOpenReg(false);
                    }}
                    className={`label-bdm-input ${isRegionLinked && "checkit"}`}
                    type="checkbox"
                    style={{ border: "1px solid darkgray" }}
                  />
                  <span style={{ color: "red" }}>*</span>
                  <span style={{ verticalAlign: "middle", fontSize: "0.8rem" }}>
                    Is Linked to Region
                  </span>
                </label>
                <div class="container">
                  <div
                    onClick={() => {
                      setdropdownOpenReg(!dropdownOpenReg);
                    }}
                    style={{
                      position: "sticky",
                      backgroundColor: "#FFFFFF",
                      top: "0",
                      width: "95%",
                      height: "35px",
                      marginBottom: "10px",
                      borderRadius: "7px",
                      boxShadow: "none",
                      // border:"1px solid lightgray"
                      border:isSubmitted && !bdmFormData.regions ? "1px solid red" : "1px solid lightgray",

                      
                    }}
                    class="select-btn"
                    className={`select-btn ${dropdownOpenReg && "open"}`}
                  >
                    <span class="btn-text">Select Region</span>
                    <span class="arrow-dwn">
                      <i class="fa-solid fa-chevron-down">
                        <AiIcons.AiOutlineCaretUp></AiIcons.AiOutlineCaretUp>
                      </i>
                    </span>
                  </div>

                  <ul
                    style={{
                      overflowY: "auto",
                      // height: "200px",
                      height: "auto",

                      width: "90%",
                    }}
                    class="list-items open-list-items"
                    className={`list-items ${
                      dropdownOpenReg && "open-list-items"
                    }`}
                  >
                    {region &&
                      region.map((value, index) => {
                        return (
                          <li
                            onClick={() => {
                              selectMarkDropdown(value, "reg");
                            }}
                            key={index}
                            class={`item ${
                              checkElementInArray(value, "reg") && "checked"
                            }`}
                          >
                            <span
                              style={{
                                borderRadius: isRegionLinked && "50%",
                              }}
                              class="checkbox"
                            >
                              {!isRegionLinked && (
                                <i class="fa-solid fa-check check-icon">
                                  <AiIcons.AiOutlineCheck />
                                </i>
                              )}
                            </span>
                            <span class="item-text">{value?.regionName}</span>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={() => {
                    postBdmData();
                  }}
                >
                  Save
                </ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  value="Cancel"
                  id="create-account"
                >
                  Cancel
                </ModalControlButton>
              </ButtonSection>
            </form>
          </ModalDetailSection>
        </Box>
      </Modal>
    </div>
  );
}
function Tr({
  data: {
    isActive,
    bdmName,
    bdmDisplayName,
    activeFrom,
    activeUntil,
    businessUnits,
    regions,
    bdmId,
    bdmFormData,
    fetchBdmData,
  },
  activateDeactivate,
  editBDMData,
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    bdmName: "",
    bdmDisplayName: "",
    activeFrom: "",
    activeUntil: "",
    businessUnit: {
      businessUnitId: "",
      businessUnitName: "",
      businessUnitDisplayName: "",
    },
    regionUnit: {
      regionId: "",
      regionName: "",
      regionDisplayName: "",
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

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm/${bdmId}`,
        bdmFormData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        fetchBdmData();
        setIsOpen(false);
      });
  };

  return (
    <TableRowSection ref={wrapperRef}>
      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{bdmName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{bdmDisplayName || "Unknown"}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{activeFrom}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>{activeUntil}</span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>
          {(businessUnits &&
            businessUnits.map((_) => _.businessUnitDisplayName).join(", ")) ||
            "Unknown"}
        </span>
      </TableCellSection>

      <TableCellSection className={!isActive && "disable-table-row"}>
        <span>
          {(regions && regions.map((_) => _.regionDisplayName).join(", ")) ||
            "Unknown"}
        </span>
      </TableCellSection>

      <TableCellSection style={{position:"relative"}}>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div
            style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none"  }}

              class="dropdown-content"
            >
              <a
                className={!isActive && "disable-table-row"}
                style={{ padding: "5px" }}
                onClick={(e) => {
                  editBDMData(e, bdmId);
                }}
              >
                <BorderColorOutlinedIcon
                  style={{ fontSize: "12px", paddingRight: "5px" }}
                />{" "}
                Edit
              </a>
              <a
                className={!isActive && "disable-table-row"}
                style={{ padding: "5px" }}
                onClick={() => {
                  DeleteRecord();
                }}
              >
                <DeleteOutlinedIcon
                  style={{ fontSize: "15px", paddingRight: "5px" }}
                />
                Delete
              </a>
              <a
                onClick={() => {
                  activateDeactivate(bdmId);
                }}
                className={isActive && "disable-table-row"}
                style={{ padding: "5px" }}
              >
                <div style={{ display: "flex" }}>
                  <ToggleOnIcon
                    style={{ fontSize: "22px", paddingRight: "3px" }}
                  />

                  <p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
                </div>
              </a>
              <a
                onClick={() => {
                  activateDeactivate(bdmId);
                }}
                className={!isActive && "disable-table-row"}
                style={{ padding: "5px" }}
              >
                <div style={{ display: "flex" }}>
                  <ToggleOffIcon
                    style={{ fontSize: "22px", paddingRight: "3px" }}
                  />
                  <p style={{ margin: "3px 0px 0px 0px" }}>Deactivate</p>
                </div>
              </a>
            </div>
          )}{" "}
        </span>
      </TableCellSection>
    </TableRowSection>
  );
}
export default Bdm;
