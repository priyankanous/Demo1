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
import { Box, Typography, IconButton, Checkbox,MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
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
  const [accountName, setAccountName] = useState(null);
  const [regionDisplayName, setRegionDisplayName] = useState(null);
  const[accountId, setAccountId]=useState(null)
  const [regionData, setRegionData] = useState({
    accountName: "",
    regionDisplayName: "",
  });

  useEffect(() => {
    getAllRegionData();
  }, []);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const getAllRegionData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts`)
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const AddDataToAccount = async (e) => {
    console.log("check",e.target.value)
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts",
        regionData
      );
      console.log("this is the response", response.data);
      getAllRegionData();
      setIsOpen(false);
    } catch {}
  };

  const setAccountsData = async () => {
    const postaccountData = {
      accountName,
      regionDisplayName,
      accountId: 0,
    };
    if (accountId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts/${accountId}`,
        postaccountData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts",
        postaccountData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      getAllRegionData();
    }
  };

  const resetData = () => {
    setIsOpen(false);
    getAllRegionData();
    setAccountName(null);
    setRegionDisplayName(null)
  };

  const childAccount=[1, 2, 3]

  return (
    <div>
      <MemoizedBaseComponent
        field="Region"
        columns={["No." ,"Name", "Region"]}
        data={data}
        buttonText="Add New"
        Tr={(obj) => {
          return (
            <Tr
              accData={data}
              data={obj}
              getAllRegionData={getAllRegionData}
              setRegionData={setRegionData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Set Account</ModalHeadingText>
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
                <span style={{color:"red"}}>*</span>
                <span>Name</span>
                
                </InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="name"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setAccountName(e.target.value);
                  }}
                  value={accountName}
                />
              </div>
              {/* <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>
                <span style={{color:"red"}}>*</span>
                <span>Child of SBU</span>
                </InputTextLabel>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    style={{ background: "white" }}
                    onChange={(e) => {
                      setRegionDisplayName(e.target.value);
                    }}
                    value={regionDisplayName}
                  >
                    {childAccount?.map((accountName, index) => {
                      return (
                        <MenuItem
                        value={JSON.stringify(accountName)}
                        selected={childAccount === childAccount}
                        key={index}
                      >
                          {regionDisplayName}
                        
                      </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div> */}
                    
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel style={{marginTop:"-6px", marginLeft:"-4px"}}>
                  <span style={{color:"red"}}>*</span>
                <span>Region</span></InputTextLabel>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    style={{ background: "white" }}
                    onChange={(e) => {
                      setRegionDisplayName(e.target.value);
                    }}
                    value={regionDisplayName}
                  >
                   {childAccount?.map((ele, index) => {
                      return (
                        <MenuItem
                        value={JSON.stringify(ele)}
                        selected={regionDisplayName === regionDisplayName}
                        key={index}
                      >
                          {ele}
                        
                      </MenuItem>
                      );
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
                  onClick={setAccountsData}
                >
                  Save
                </ModalControlButton>
                <ModalControlButton
                  type="button"
                  variant="contained"
                  onClick={() => {
                    resetData()
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
  getAllRegionData,
  setRegionData,
  accData,
  data: { accountId, accountName, regionDisplayName, isActive },
}) {
  console.log("data",accData[0].locations[0].regionDisplayName)
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    accountId: accountId,
    accountName: accountName,
    regionDisplayName: accData[0].locations[0].regionDisplayName,
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
    console.log("accid",accountId)
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/accounts/${accountId}`,
        responseData
      )
      .then((response) => {
        console.log("res",response)
        const actualDataObject = response.data.data;
        getAllRegionData(actualDataObject);
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setRegionData({ accountName: "", regionDisplayName: "" });
      setIsOpen(false);
      getAllRegionData();
    }
  };
  // API calls to delete Record

  // const DeleteRecord = () => {
  //   axios
  //     .delete(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${accountId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllRegionData();
  //       setIsOpen(false);
  //     });
  // };

  return (
    <React.Fragment>
      <tr ref={wrapperRef}>
      <td className={!isActive && "disable-table-row"}>
          <span>{accountId || "Unknown"}</span>
        </td>
        <td className={!isActive && "disable-table-row"}>
          <span>{accountName || "Unknown"}</span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {responseData.regionDisplayName || "Unknown"}
          </span>
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
                {/* <a
                 
                  style={{ padding: "5px" }}
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <AiIcons.AiOutlineDelete /> Delete
                </a> */}
                <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(accountId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(accountId);
                  }}
                  style={{ padding: "5px" }}
                >
                  <AiIcons.AiOutlineCloseCircle /> Deactivate
                </a>
              </div>
            )}
          </span>
        </td>
      </tr>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Edit Region</ModalHeading>
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
                  <label for="region_name">Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.accountName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        accountName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="region_disp_name">Location</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.regionDisplayName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        regionDisplayName: e.target.value,
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
      </Modal>
    </React.Fragment>
  );
}
export default AccountSettings;
