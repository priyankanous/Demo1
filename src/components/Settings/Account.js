import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
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
import { Box, Typography, IconButton, Checkbox, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
import * as AiIcons from "react-icons/ai";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import axios from "axios";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import {
  Table,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  TextField,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

function AccountSettings() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [regionNameData, setRegionNameData] = useState([]);
  const [accountId, setAccountId] = useState(null);
  const [accountName, setAccountName] = useState(null);
  const [isDropdown, setDropdown] = useState(false);
  const [regionDisplayName, setRegionDisplayName] = useState(null);
  const [accountData, setAccountData] = useState({
    accountName: "",
    accountId: 0,
    accountOrClientCode: "string",
    regions: {
      regionId: 0,
      regionName: "",
      regionDisplayName: "",
    },
  });

  useEffect(() => {
    getAllAccountsData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getAllRegionData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setRegionNameData(actualDataObject);
      });
  };
  const getAllAccountsData = async () => {
    getAllRegionData();
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const AddDataToAccount = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts",
        accountData
      );
      setIsOpen(false);
      getAllAccountsData();
    } catch {}
  };

  // const setAccountsData = async () => {
  //   const postaccountData = {
  //     accountName,
  //     regionDisplayName,
  //     accountId: 0,
  //   };
  //   if (accountId !== null) {
  //     var { data } = await axios.put(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts/${accountId}`,
  //       postaccountData
  //     );
  //   } else {
  //     var { data } = await axios.post(
  //       "http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts",
  //       postaccountData
  //     );
  //   }
  //   if (data?.message === "Success" && data?.responseCode === 200) {
  //     setIsOpen(false);
  //     getAllRegionData();
  //   }
  // };

  const resetData = () => {
    setIsOpen(false);
    getAllRegionData();
    setAccountName(null);
    setRegionDisplayName(null);
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Account"
        columns={["No.", "Name", "Region", ""]}
        data={data}
        buttonText="Add New"
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              getAllAccountsData={getAllAccountsData}
              regionNameData={regionNameData}
              setAccountData={setAccountData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Account</ModalHeadingText>
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
                <InputTextLabel>
                  <span style={{ color: "red" }}>*</span>
                  <span>Name</span>
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setAccountData({
                      ...accountData,
                      accountName: e.target.value,
                    });
                  }}
                />
              </div>

              <div>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  Region
                </label>
                <select
                  style={{
                    height: "37px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                  }}
                  onChange={(e) => {
                    const selectedRegionId =
                      e.target.selectedOptions[0].getAttribute("data-regionId");
                    const selectedRegionDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-regionDisplayName"
                      );

                    setAccountData({
                      ...accountData,
                      regions: {
                        ...accountData.regions,
                        regionId: selectedRegionId,
                        regionName: e.target.value,
                        regionDisplayName: selectedRegionDispName,
                      },
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {regionNameData?.map((regions, index) => {
                    const regionNameData = regions.regionName;
                    const regionId = regions.regionId;
                    const regionDisplayName = regions.regionDisplayName;

                    if (regions.isActive) {
                      return (
                        <option
                          data-regionId={regionId}
                          data-regionDisplayName={regionDisplayName}
                          key={index}
                        >
                          {regionDisplayName}
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
                  onClick={AddDataToAccount}
                >
                  Save
                </ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    resetData();
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
  getAllAccountsData,
  regionNameData,
  setRegionData,
  setAccountData,
  data,
}) {
  const { accountId, accountName, regionDisplayName,regions, isActive } = data
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    accountName: "",
    accountId: "",
    accountOrClientCode: "",
    regions: {
      regionId:"",
      regionName: "",
      regionDisplayName: "",
    },
  });

  useEffect(() => {
    setResponseData({...responseData, ...data})
  }, [data])

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
    console.log("accid", accountId);
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts/${accountId}`,
        responseData
      )
      .then((response) => {
        console.log("res", response);
        const actualDataObject = response.data.data;
        getAllAccountsData();
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setAccountData({
        accountName: "",
        accountId: "",
        accountOrClientCode: "string",
        regions: {
          regionName: "",
          regionDisplayName: "",
        },
      });
      setIsOpen(false);
      getAllAccountsData();
    }
  };
  // API calls to delete Record

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts/${accountId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllAccountsData();
        setIsOpen(false);
      });
  };

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{accountId || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{accountName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{regions?.regionDisplayName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection>
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
              >
                <a
                  className={!isActive && "disable-table-row"}
                  style={{ padding: "5px" }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <BorderColorOutlinedIcon
                    style={{ fontSize: "12px", paddingRight: "5px" }}
                  />
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
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(accountId);
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <ToggleOnIcon
                      style={{ fontSize: "22px", paddingRight: "3px" }}
                    />

                    <p style={{ margin: "3px 0px 0px 0px" }}>Activate</p>
                  </div>
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(accountId);
                  }}
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
            )}
          </span>
        </TableCellSection>
      </TableRowSection>
      <Modal open={isOpen}>
        <Box sx={MoadalStyle}>
        <ModalHeadingSection>
            <ModalHeadingText>Edit Account</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
          <form id="reg-form" style={{ padding: "0px 30px" }}>
            <div  style={{ padding: "10px 0px" }}>
              <InputTextLabel>Name</InputTextLabel>
              <InputField
                  size="small"
                  type="text"
                  id="name"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.accountName}
                  onChange={(e) => {
                    setResponseData({
                      ...responseData,
                      accountName: e.target.value,
                    });
                  }}
                />
            </div>
            {/* <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Region</InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="email"
                  spellcheck="false"
                  variant="outlined"
                  value={responseData.regions.regionDisplayName}
                  onChange={(e) => {
                    const temp = {...responseData}
                    temp["regions"] = {...responseData?.regions, regionDisplayName: e.target.value}
                    setResponseData(temp);
                  }}
                />
              </div> */}
              <div>
                <label
                  for="email"
                  style={{ fontWeight: "400", fontSize: "16px" }}
                >
                  Region
                </label>
                <select
                  style={{
                    height: "35px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "7px",
                    boxShadow: "none",
                    border: "1px solid lightgray",
                  }}
                  value={responseData.regions.regionDisplayName}
                  onChange={(e) => {
                    const selectedRegionId =
                      e.target.selectedOptions[0].getAttribute("data-regionId");
                    const selectedRegionDispName =
                      e.target.selectedOptions[0].getAttribute(
                        "data-regionDisplayName"
                      );
                    setResponseData({
                      ...responseData,
                      regions: {
                        ...responseData.regions,
                        regionId: selectedRegionId,
                        regionName: e.target.value,
                        regionDisplayName: selectedRegionDispName,
                      }
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Please choose one option
                  </option>
                  {regionNameData?.map((regions, index) => {
                    const regionNameData = regions.regionName;
                    const regionId = regions.regionId;
                    const regionDisplayName = regions.regionDisplayName;
                    if (regions.isActive) {
                      return (
                        <option
                          data-regionId={regionId}
                          data-regionDisplayName={regionDisplayName}
                          key={index}
                        >
                          {regionDisplayName}
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
    </React.Fragment>
  );
}
export default AccountSettings;
