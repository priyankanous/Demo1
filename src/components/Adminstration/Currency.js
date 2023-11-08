/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
// import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import * as AiIcons from "react-icons/ai";
import { async } from "q";
import { Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, TextField, InputLabel, FormControl, Select, MenuItem, Button, Checkbox } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function Currency() {
  const [data, setData] = useState({
    actualDataObject: [],
    financialYearData: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrency, setIsCurrency] = useState(true);
  const [financialYearData, setFinancialYearData] = useState([]);
  const [currencyData, setCurrencyData] = useState({
    currency: "",
    currencyName: "",
    conversionRate: "",
    symbol: "",
    financialYear: {
      financialYearId: "",
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
  });

  useEffect(() => {
    getFinancialYearNameData();
  }, []);
  
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getAllCurrency = async (e) => {
    console.log("in the getALLGlobalLLF", e);
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency/financialyear/${e}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData({ ...data, actualDataObject: actualDataObject });
      });
  };

  const AddDataToCurrency = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency",
        currencyData
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

  const copyFromFyToNewFy = async (copyData) => {
    console.log("in copy functionn first", copyData);

    const response = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency/financialyear/${copyData.copyFromFy}`
    );

    const actualDataObject = response.data.data;
    const actualDataArray = [];
    actualDataObject.map((copiedData, index) => {
      actualDataArray.push({
        ...currencyData,
        currency: copiedData.currency,
        currencyName: copiedData.currencyName,
        conversionRate: copiedData.conversionRate,
        symbol: copiedData.symbol,
        financialYear: {
          ...currencyData.financialYear,
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

  return (
    <div>
      <MemoizedBaseComponent
        field="Currency"
        buttonText="setup Currency"
        columns={["No", "Currency", "Name", "Symbol", "Conversion Rate", ""]}
        data={data}
        Tr={(obj) => {
          return <Tr data={obj} setFinancialYearData={setFinancialYearData} />;
        }}
        setIsOpen={setIsOpen}
        currency={isCurrency}
        financialYearData={financialYearData}
        getAllCurrency={getAllCurrency}
        copyFromFyToNewFy={copyFromFyToNewFy}
      />
      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
        <Box sx={MoadalStyle}>

          <ModalHeadingSection>
            <ModalHeadingText>Setup Currency</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection style={{ height: "300px", overflow: "auto" }}>


            <form id="reg-form" style={{ padding: "0px 30px" }}>
              {/* <div style={{ padding: "10px 0px" }}>
                  <InputTextLabel>Financial Year</InputTextLabel>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      style={{ background: "white" }}
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
                        setCurrencyData({
                          ...currencyData,
                          financialYear: {
                            ...currencyData.financialYear,
                            financialYearId: selectedFyId,
                            financialYearName: e.target.value,
                            financialYearCustomName: selectedfyDispName,
                            startingFrom: selectedFyStartingFrom,
                            endingOn: selectedfyEndingOn,
                          },
                        });
                      }}
                    >
                                          {financialYearData.map((fyData, index) => {
                      const fyNameData = fyData.financialYearName;
                      const fyId = fyData.financialYearId;
                      const fyDispName = fyData.financialYearCustomName;
                      const fyStartingFrom = fyData.startingFrom;
                      const fyEndingOn = fyData.endingOn;
                          return (
                            <MenuItem
                            value={JSON.stringify(fyNameData)}
                            // selected={fyNameData === sbuName}
                            id={fyId}
                            data-fyDispName={fyDispName}
                            data-fyStartingFrom={fyStartingFrom}
                            data-fyEndingOn={fyEndingOn}
                            key={index}
                              // value={orgName}
                            >
                              {fyNameData}
                            </MenuItem>
                          );
                        
                      })}
                    </Select>
                  </FormControl>
                </div> */}


              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Financial Year</InputTextLabel>
                {/* <label for="name">Financial Year</label> */}
                <select
                  // style={{ width: "100%", height: "40px" }}
                  style={{height:"37px", width:"100%", marginBottom:"5px",borderRadius:"7px",boxShadow:"none", border:"1px solid lightgray", fontFamily:"Roboto"}}

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
                    setCurrencyData({
                      ...currencyData,
                      financialYear: {
                        ...currencyData.financialYear,
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
                <InputTextLabel>Currency</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setCurrencyData({
                      ...currencyData,
                      currency: e.target.value,
                    });
                  }}
                />
              </div>


              {/* <div>
                  <label for="name">Currency</label>
                  <input
                    type="text"
                    id="name"
                    spellcheck="false"
                    onChange={(e) => {
                      setCurrencyData({
                        ...currencyData,
                        currency: e.target.value,
                      });
                    }}
                  />
                </div> */}

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Name</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setCurrencyData({
                      ...currencyData,
                      currencyName: e.target.value,
                    });
                  }}
                />
              </div>

              {/* <div>
                  <label for="email">Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCurrencyData({
                        ...currencyData,
                        currencyName: e.target.value,
                      });
                    }}
                  />
                </div> */}

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Symbol</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setCurrencyData({
                      ...currencyData,
                      symbol: e.target.value,
                    });
                  }}
                />
              </div>


              {/* <div>
                  <label for="username">Symbol</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCurrencyData({
                        ...currencyData,
                        symbol: e.target.value,
                      });
                    }}
                  />
                </div> */}

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Conversion Rate</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setCurrencyData({
                      ...currencyData,
                      conversionRate: e.target.value,
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
                  onClick={AddDataToCurrency}


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
  AddDataToCurrency,
  getFinancialYearNameData,
  financialYearData,
  setCurrencyData,
  getAllCurrency,
   data: { currencyId, currencyName, currency, conversionRate, symbol, isActive,financialYear } }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setDropdown] = useState(false);
  const [responseData, setResponseData] = useState({
    // currencyId:currencyId,
    currency:currency,
    currencyName:currencyName,
    symbol:symbol,
    conversionRate:conversionRate,
    financialYear: {
      financialYearId: financialYear.financialYearId,
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
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
  const closeDropDown = (isopen, id) => {
    isopen ? setDropdown(false) : setDropdown(true);
  };

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency/${currencyId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        // getAllCurrency();
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setCurrencyData({ 
      currency: "",
      currencyName: "",
      conversionRate: "",
      symbol: "",
      financialYear: {
        financialYearId: "",
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "", 
      }
      });

      setIsOpen(false);
      getAllCurrency();
    }
  };

  console.log("currencyId",currencyId);

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"} >

          <span>{currencyId || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"} >
          <span>{currency || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"} >
          <span>{currencyName || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection className={!isActive && "disable-table-row"} >
          <span>{symbol || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"} >
          <span>{conversionRate || "Unknown"}</span>
        </TableCellSection>

        <TableCellSection >

          <span style={{ float: "right" }}>
            <AiIcons.AiOutlineMore
              onClick={(e) => {
                closeDropDown();
              }}
            ></AiIcons.AiOutlineMore>
            {isDropdown && (
              <div
                style={{ float: "right", right: "20px", position: "fixed" }}
                class="dropdown-content"
                id="dropdown"
              >

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

                {/* <a
                  className={!isActive && "disable-table-row"}
                  href="#about" style={{ padding: "5px" }}>
                  <AiIcons.AiOutlineDelete /> Delete
                </a> */}
                <a
                  // className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(currencyId);
                  }}
                  style={{ padding: "5px" }}>
                  <div style={{ display: "flex" }}>
                    <ToggleOnIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                    <p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
                  </div>
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(currencyId);
                  }}
                  style={{ padding: "5px" }}>
                  <div style={{ display: "flex" }}>
                    <ToggleOffIcon style={{ fontSize: "22px", paddingRight: "3px" }} />
                    <p style={{ margin: "3px 0px 0px 0px" }}>Deactivate</p>
                  </div>
                </a>
              </div>
            )}{" "}
          </span>
        </TableCellSection>
      </TableRowSection>
      <Modal
      open={isOpen}

      >
                        <Box sx={MoadalStyle}>

                        <ModalHeadingSection>
            <ModalHeadingText>Edit Setup Currency</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>

          <ModalDetailSection>

              <form id="reg-form">
                
              {/* <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Financial Year</InputTextLabel>
                <select
                  style={{ width: "100%", height: "40px" }}
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
                    setCurrencyData({
                      ...responseData,
                      financialYear: {
                        ...responseData.financialYear,
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
                    if(fyData.isActive){
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
                    }
                  })}
                </select>
              </div> */}

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Currency</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="id"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.currency}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      currency: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Name</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="id"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.currencyName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      currencyName: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Symbol</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="id"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.symbol}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      symbol: e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Conversion Rate</InputTextLabel>
                <InputField size="small"
                  type="text"
                  id="id"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.conversionRate}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      conversionRate: e.target.value,
                    });
                  }}
                />
              </div>

              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
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


                {/* <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
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
                </div> */}
              </form>
              </ModalDetailSection>
        </Box>
      </Modal>

    </React.Fragment>
  );
}

export default Currency;
