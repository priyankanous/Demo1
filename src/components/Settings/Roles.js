import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import { modalStyleObject } from "../../utils/constantsValue";
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
  MenuItem,
} from "@mui/material";
import { Box, Typography, IconButton } from "@mui/material";
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
import {
  ModalHeading,
  ModalIcon,
  NotificationArrowIcons,
} from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/Settings/settingBasedComponent";
import * as AiIcons from "react-icons/ai";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

function RoleUserPermission() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [regionName, setRegionName] = useState(null);
  const [availableUsers, setavailUsers] = useState([
    "Hulk",
    "Iron man",
    "Captain America",
    "Spider man",
    "Thor",
  ]);
  const [selectedusers, setSelectedusers] = useState([
    "Batman",
    "Super man",
    "Wonder woman",
    "Flash",
  ]);
  const [regionDisplayName, setRegionDisplayName] = useState(null);
  const [regionData, setRegionData] = useState({
    regionName: "",
    regionDisplayName: "",
  });
  const [activeClass, setActiveClass] = useState(true);
  const [setUser, setActiveUser] = useState("");

  useEffect(() => {
    getAllRegionData();
  }, []);

  const getAllRegionData = async () => {
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions`)
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const AddDataToRegion = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions",
        regionData
      );
      console.log("this is the response", response.data);
      getAllRegionData();
      setIsOpen(false);
    } catch {}
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const childAccount = ["nous", "nous", "nous"];

  const resetData = () => {
    // setIsOpen(false);
    // getAllRegionData();
    // setOpportunityId(null);
    // setOpportunityName(null);
    // setProjectCode(null);
    // setAccountName(null);
    // setProjectStartDate(null);
    // setProjectEndDate(null)
  };

  const cutAndPasteToUsers = (typeofuser) => {
    // if (typeofuser === 'availablePerson'){
    //     setSelectedusers([...availableUsers,setUser]);
    //     const avaialbleUsers = [...availableUsers];
    //     avaialbleUsers.filter
    // }
  };

  const highlightBackground = (e, key) => {
    console.log(key, e.target);
    e.target.style.color = "pink";
    setActiveClass(false);
    setActiveUser(key);
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Region"
        columns={["Roles", "Users"]}
        data={data}
        buttonText="Add New"
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              getAllRegionData={getAllRegionData}
              setRegionData={setRegionData}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal open={isOpen} onClose={handleModalClose}>
        <Box sx={MoadalStyle} style={{ width: "1000px", height: "500px" }}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Roles</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection>
            <form id="reg-form">
              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "12px",
                      flexBasis: "25%",
                    }}
                  >
                    Add Role Details and Assign the Permissions applicable
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      rowGap: "30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexBasis: "100%",
                        gap: "100px",
                      }}
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Display Name</span>
                        </div>

                        <div>
                          <InputField
                            size="small"
                            type="text"
                            id="name"
                            variant="outlined"
                            spellcheck="false"
                            // onChange={(e) => {
                            //   setAccountData({
                            //     ...accountData,
                            //     accountName: e.target.value,
                            //   });
                            // }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      rowGap: "30px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexBasis: "100%",
                        gap: "100px",
                      }}
                    ></div>
                  </div>
                </div>
                <div style={{ padding: "10px 0px", marginLeft: "-73px" }}>
                  <InputTextLabel style={{ marginLeft: "63px" }}>
                    <span style={{ color: "red" }}>*</span>
                    <span>Role Name</span>
                    <InputField
                      size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                      spellcheck="false"
                      // style={inputStyle}
                      // value={opportunityData?.opportunityName}
                      // onChange={(e) => {
                      //   setOpportunityData({
                      //     ...opportunityData,
                      //     opportunityName: e.target.value,
                      //   });
                      // }}
                    />
                  </InputTextLabel>
                </div>
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "30px" }}
              >
                <ButtonSection>
                  <div>
                    <ModalControlButton
                      sx={{ marginLeft: "140px" }}
                      type="button"
                      value="Save"
                      id="create-account"
                      variant="contained"
                      // onClick={() => {
                      //   setSbuHeadData();
                      // }}
                    >
                      Select All
                    </ModalControlButton>
                  </div>

                  <ModalControlButton
                    type="button"
                    variant="contained"
                    onClick={() => {
                      resetData();
                    }}
                    value="Cancel"
                    id="create-account"
                  >
                    Select None
                  </ModalControlButton>
                </ButtonSection>
                <div style={{ padding: "10px 0px", marginLeft: "-73px" }}>
                  <InputTextLabel style={{ marginLeft: "63px" }}>
                    <span style={{ color: "red" }}>*</span>
                    <span>Copy Form</span>
                    <InputField
                      size="small"
                      type="text"
                      id="name"
                      variant="outlined"
                      spellcheck="false"
                      // style={inputStyle}
                      // value={opportunityData?.opportunityName}
                      // onChange={(e) => {
                      //   setOpportunityData({
                      //     ...opportunityData,
                      //     opportunityName: e.target.value,
                      //   });
                      // }}
                    />
                  </InputTextLabel>
                </div>
                <ButtonSection>
                  <ModalControlButton
                    sx={{ marginLeft: "140px" }}
                    type="button"
                    value="Save"
                    id="create-account"
                    variant="contained"
                    // onClick={() => {
                    //   setSbuHeadData();
                    // }}
                  >
                    Apply
                  </ModalControlButton>
                </ButtonSection>
              </div>
              <div
                style={{
                  width: "420px",
                  height: "300px",
                  position: "relative",
                  backgroundColor: "white",
                  padding: "46px",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <span>dashboard</span>
                  <span>dashboard</span>
                  <span>dashboard</span>
                  <span>dashboard</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "",
                    margin: "4px 0px",
                    padding: "30px",
                  }}
                ></div>
              </div>
              <div style={{ paddingLeft: "16px", marginRight: "139px" }}></div>
              <div style={{ paddingLeft: "16px", marginRight: "139px" }}>
                <ButtonSection>
                  <ModalControlButton
                    sx={{ marginLeft: "140px" }}
                    type="button"
                    value="Save"
                    id="create-account"
                    variant="contained"
                    // onClick={() => {
                    //   setSbuHeadData();
                    // }}
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
              </div>
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
  data: { regionId, regionName, regionDisplayName, isActive },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    regionId: regionId,
    regionName: regionName,
    regionDisplayName: regionDisplayName,
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${regionId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllRegionData();
        setIsOpen(false);
      });
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setRegionData({ regionName: "", regionDisplayName: "" });
      setIsOpen(false);
      getAllRegionData();
    }
  };
  // API calls to delete Record

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

  return (
    <React.Fragment>
      <tr ref={wrapperRef}>
        <td className={!isActive && "disable-table-row"}>
          <span>{regionName || "Unknown"}</span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {regionDisplayName || "Unknown"}
          </span>
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
                    activeDeactivateTableData(regionId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(regionId);
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
                    value={responseData.regionName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        regionName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="region_disp_name">Display Name</label>
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
export default RoleUserPermission;
