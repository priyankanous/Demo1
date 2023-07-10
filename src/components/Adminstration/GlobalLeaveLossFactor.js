import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
// import Modal from "react-modal";
import { bdmStyleObject, modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import { Table,Modal, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, Typography } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function GlobalLeaveLossFactor() {
  const [data, setData] = useState({
    actualDataObject: [],
    financialYearData: [],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isGlobalLeave] = useState(true);
  const [globalLeaveLossFactorData, setGlobalLeaveLoseFactorData] = useState({
    month: "",
    onSite: "",
    offShore: "",
    financialYear: {
      financialYearId: "",
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
  });
  const [financialYearData, setFinancialYearData] = useState([]);

  useEffect(() => {
    getFinancialYearNameData();
  }, []);
  

  const getAllGlobalLLF = async (e) => {
    console.log("in the getALLGlobalLLF", e);
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${e}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData({ ...data, actualDataObject: actualDataObject });
      });
  };
  const AddDataToGlobalLLF = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor",
        globalLeaveLossFactorData
      );
      setIsOpen(false);
    } catch { }
  };
  const getFinancialYearNameData = async () => {
    console.log("in financial year data");
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year`
      )
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData({ ...data, financialYearData: actualDataObject });
        setFinancialYearData(actualDataObject);
      });
  };
  const openTheModalWithValues = async (e, id) => {
    console.log(id, "HERE");
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${id}`
      )
      .then((response) => {
        console.log("In the open modal", response);
        response.data.data.map((editData, index) => {
          console.log("this is month", editData.month);
          setGlobalLeaveLoseFactorData({
            ...globalLeaveLossFactorData,
            month: editData.month,
            onSite: editData.onSite,
            offShore: editData.onSite,
            financialYear: {
              ...globalLeaveLossFactorData,
              financialYearId: editData.financialYear.financialYearId,
              financialYearName: editData.financialYear.financialYearName,
              financialYearCustomName:
                editData.financialYear.financialYearCustomName,
              startingFrom: editData.financialYear.startingFrom,
              endingOn: editData.financialYear.endingOn,
            },
          });
        });
      });
    setIsOpen(true);
  };

  const copyFromFyToNewFy = async (copyData) => {
    console.log("in copy functionn first", copyData);

    const response = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${copyData.copyFromFy}`
    );

    const actualDataObject = response.data.data;
    const actualDataArray = [];
    actualDataObject.map((copiedData, index) => {
      actualDataArray.push({
        ...globalLeaveLossFactorData,
        month: copiedData.month,
        offShore: copiedData.offShore,
        onSite: copiedData.onSite,
        financialYear: {
          ...globalLeaveLossFactorData.financialYear,
          financialYearName: copyData.copyToFy.financialYearName,
          financialYearId: copyData.copyToFy.financialYearId,
          financialYearCustomName: copyData.copyToFy.financialYearCustomName,
          startingFrom: copyData.copyToFy.startingFrom,
          endingOn: copyData.copyToFy.endingOn,
        },
      });
    });

    const resOfPOST = await axios.post(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/save-all",
      actualDataArray
    );
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <MemoizedBaseComponent
        field="Global Leave Loss Factor"
        buttonText="setup global leave loss factor"
        columns={["No", "Month", "OffShore", "OnShore", ""]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              setFinancialYearData={setFinancialYearData}
              openTheModalWithValues={openTheModalWithValues}
            />
          );
        }}
        setIsOpen={setIsOpen}
        globalLeave={isGlobalLeave}
        financialYearData={financialYearData}
        getAllGlobalLLF={getAllGlobalLLF}
        copyFromFyToNewFy={copyFromFyToNewFy}
      />

      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
                <Box sx={MoadalStyle}>
                <ModalHeadingSection>
            <ModalHeadingText>Setup Leave Loss Factor</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection style={{ height: "300px", overflow: "auto" }}>

              <form id="reg-form"
              style={{padding:"0px 20px"}}
              >
                <div>
                  <label for="name">Financial Year</label>
                  <select
                    style={{ width: "100%",height:"35px" }}
                    value={
                      globalLeaveLossFactorData.financialYear.financialYearName
                    }
                    onChange={(e) => {
                      const selectedFyId =
                        e.target.selectedOptions[0].getAttribute("data-fyId");
                      const selectedfyDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-fyDispName"
                        );
                      const selectedFyStartingFrom =
                        e.target.selectedOptions[0].getAttribute(
                          "data-fyStartingFrom"
                        );
                      const selectedfyEndingOn =
                        e.target.selectedOptions[0].getAttribute(
                          "data-fyEndingOn"
                        );
                      setGlobalLeaveLoseFactorData({
                        ...globalLeaveLossFactorData,
                        financialYear: {
                          ...globalLeaveLossFactorData.financialYear,
                          financialYearId: selectedFyId,
                          financialYearName: e.target.value,
                          financialYearCustomName: selectedfyDispName,
                          startingFrom: selectedFyStartingFrom,
                          endingOn: selectedfyEndingOn,
                        },
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {financialYearData.map((fyData, index) => {
                      const fyNameData = fyData.financialYearName;
                      const fyId = fyData.financialYearId;
                      const fyDispName = fyData.financialYearCustomName;
                      const fyStartingFrom = fyData.startingFrom;
                      const fyEndingOn = fyData.endingOn;
                      return (
                        <option
                          data-fyId={fyId}
                          data-fyDispName={fyDispName}
                          data-fyStartingFrom={fyStartingFrom}
                          data-fyEndingOn={fyEndingOn}
                          key={index}
                        >
                          {fyNameData}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Month</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={globalLeaveLossFactorData.month}
                  onChange={(e) => {
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      month: e.target.value,
                    });
                  }}
                />
              </div>
                {/* <div>
                  <label for="email">Month</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={globalLeaveLossFactorData.month}
                    onChange={(e) => {
                      setGlobalLeaveLoseFactorData({
                        ...globalLeaveLossFactorData,
                        month: e.target.value,
                      });
                    }}
                  />
                </div> */}
                <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>OnSite (%)</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={globalLeaveLossFactorData.onSite}
                  onChange={(e) => {
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      onSite: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>OffShore (%)</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  value={globalLeaveLossFactorData.offShore}
                  onChange={(e) => {
                    setGlobalLeaveLoseFactorData({
                      ...globalLeaveLossFactorData,
                      offShore: e.target.value,
                    });
                  }}
                />
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  variant="contained"
                  onClick={AddDataToGlobalLLF}

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
  setFinancialYearData,
  openTheModalWithValues,
  data: { leaveLossFactorId, month, onSite, offShore, financialYear, isActive },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    leaveLossFactorId: leaveLossFactorId,
    month: month,
    onSite: onSite,
    offShore: offShore,
    financialYear: financialYear,
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

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/${leaveLossFactorId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setFinancialYearData(actualDataObject);
        setIsOpen(false);
      });
  };

  // const activeDeactivateTableData = async (id) => {
  //   const { data } = await axios.put(
  //     `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/activate-or-deactivate/${id}`
  //   );
  //   if (data?.message === "Success" && data?.responseCode === 200) {
  //     setRegionData({ regionName: "", regionDisplayName: "" });
  //     setIsOpen(false);
  //     getAllRegionData();
  //   }
  // };

  // const DeleteRecord = () => {
  //   axios
  //     .delete(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${regionId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllRegionData();
  //       setIsOpen(false);
  //     });
  // };

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };
  return (
    <React.Fragment style={{ height: "200px" }}>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{leaveLossFactorId || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{month || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>        <span>{offShore || "Unknown"}</span>
          </span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{onSite || "Unknown"}</span>
        </TableCellSection>


        <TableCellSection>
          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div style={{ float: "right", right: "20px", position: "absolute", overflow: "hidden", width: "100px", boxShadow: "none" }} class="dropdown-content">
                <a
                  className={!isActive && "disable-table-row"}


                  style={{ padding: "5px" }}
                  onClick={(e) => {
                    openTheModalWithValues(e, financialYear.financialYearName);
                  }}
                >
                  <BorderColorOutlinedIcon style={{ fontSize: "12px", paddingRight: "5px" }} />

                  Edit
                </a>
                <a
                  className={!isActive && "disable-table-row"}

                  style={{ padding: "5px" }}>

                  <DeleteOutlinedIcon style={{ fontSize: "15px", paddingRight: "5px" }} />
                  Delete
                </a>
                <a
                  className={!isActive && "disable-table-row"}

                  style={{ padding: "5px" }}>

                  <div style={{ display: "flex" }}>
                    <ToggleOnIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                    <p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
                  </div>
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  // onClick={() => {
                  //   activeDeactivateTableData(leaveLossFactorId);
                  // }}

                  style={{ padding: "5px" }}>

                  <div style={{ display: "flex" }}>
                    <ToggleOffIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                    <p style={{ margin: "3px 0px 0px 0px" }}>Deactivate</p>
                  </div>
                </a>
              </div>
            )}
          </span>
        </TableCellSection>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={modalStyleObject}
        >
          <div>
            <div class="main" className="ModalContainer">
              <div class="register">
                <ModalHeading>Edit Global Leave loss Factor</ModalHeading>
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
                    <label for="name">Financial Year</label>
                    <input
                      type="text"
                      id="id"
                      spellcheck="false"
                      value={responseData.financialYear.financialYearName}
                    />
                  </div>
                  <div>
                    <label for="name">#</label>
                    <input
                      type="text"
                      id="id"
                      spellcheck="false"
                      value={responseData.leaveLossFactorId}
                    />
                  </div>
                  <div>
                    <label for="email">Months</label>
                    <input
                      type="text"
                      id="email"
                      spellcheck="false"
                      value={responseData.month}
                      onChange={(e) =>
                        setResponseData({
                          ...responseData,
                          month: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label for="email">OffShore</label>
                    <input
                      type="text"
                      id="email"
                      spellcheck="false"
                      value={responseData.offShore}
                      onChange={(e) =>
                        setResponseData({
                          ...responseData,
                          offShore: e.target.value,
                        })
                      }
                    />{" "}
                    <span>%</span>
                  </div>
                  <div>
                    <label for="email">OnSite</label>
                    <input
                      type="text"
                      id="email"
                      spellcheck="false"
                      value={responseData.onSite}
                      onChange={(e) =>
                        setResponseData({
                          ...responseData,
                          onSite: e.target.value,
                        })
                      }
                    />
                    %
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
      </TableRowSection>
    </React.Fragment>
  );
}

export default GlobalLeaveLossFactor;
