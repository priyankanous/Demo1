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
  Checkbox,
  Radio,
} from "@mui/material";
import { Box, Typography, IconButton, Button } from "@mui/material";
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

function AnnualTargetEntry() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [regionName, setRegionName] = useState(null);

  const [regionDisplayName, setRegionDisplayName] = useState(null);
  const [regionData, setRegionData] = useState({
    regionName: "",
    regionDisplayName: "",
  });
  const [activeClass, setActiveClass] = useState(true);
  const [setUser, setActiveUser] = useState("");
  const [isAnnualEntrySelected, setIsAnnualEntrySelected] = useState(true);
  const [isUploadEntrySelected, setIsUploadEntrySelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
    setSelectedFile(null);
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

  const handleAnnualEntryChange = (e) => {
    setIsAnnualEntrySelected(e.target.checked);
    setIsUploadEntrySelected(false);
  };

  const handleUploadEntryChange = (e) => {
    setIsUploadEntrySelected(e.target.checked);
    setIsAnnualEntrySelected(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    e.dataTransfer.dropEffect = "copy";
  };

  const handleFileUpload = () => {
    console.log("");
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    console.log("Selected files:", files);
    setSelectedFile(files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent opening the file in a new tab
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };
  const DragAndDropContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    border: "1px solid #FFFFFF",
    borderRadius: "5px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    height: "150px",
  });
  return (
    <div>
      <MemoizedBaseComponent
        field="Region"
        columns={["Financial Year", "Date of Upload", "Uploaded By"]}
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
        <Box
          sx={MoadalStyle}
          style={{ width: "950px", height: "600px", overflow: "auto" }}
        >
          <ModalHeadingSection>
            <ModalHeadingText>Setup Add Annual Target Entry</ModalHeadingText>
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </ModalHeadingSection>
          <ModalDetailSection style={{ width: "1000px" }}>
            <form
              id="reg-form"
              style={{
                alignItems: "center",
                display: "flex",
                justifyC: "space-between",
                flexWrap: "wrap",
                flexBasis: "100%",
                gap: "30px",
              }}
            >
              <div
                style={{ display: "flex", flexWrap: "wrap", rowGap: "10px" }}
              >
                <div
                  style={{ display: "flex", flexBasis: "100%", gap: "75px" }}
                >
                  <div style={{ display: "flex" }}>
                    <div style={{ marginTop: "7px" }}>
                      <span style={{ color: "red" }}>*</span>
                      <span>Financial Year :</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginLeft: "-75px" }}>
                    <FormControl>
                      <Select
                        size="small"
                        style={{
                          background: "white",
                          width: "160px",
                          marginLeft: "8px",
                        }}
                        // onChange={(e) => {
                        //   setAccountName(e.target.value);
                        // }}
                        // value={accountName}
                      >
                        {childAccount?.map((accountName, index) => {
                          return (
                            <MenuItem
                              value={JSON.stringify(accountName)}
                              selected={childAccount === childAccount}
                              key={index}
                            >
                              {accountName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "100%" }}>
                      <Radio
                        checked={isAnnualEntrySelected}
                        onChange={handleAnnualEntryChange}
                      />
                      <span>Enter Annual data</span>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "100%" }}>
                      <Radio
                        checked={isUploadEntrySelected}
                        onChange={handleUploadEntryChange}
                      />
                      <span>Upload Annual data</span>
                    </div>
                  </div>
                </div>
              </div>
              {isAnnualEntrySelected && (
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
                      <div
                        style={{
                          flexBasis: "25%",
                          flexDirection: "row",
                        }}
                      >
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>BU</span>
                        </div>
                        <div>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>SBU</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>SBU Head</span>
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
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Location</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Region</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Account</span>
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
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Business Type</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>COC Pratice</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>BDM</span>
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
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q1 FY23 B</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q1 FY23 S</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q1 FY23 T</span>
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
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q2 FY23 B</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q2 FY23 S</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q2 FY23 T</span>
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
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q3 FY23 B</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q3 FY23 S</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q3 FY23 T</span>
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
                    >
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q4 FY23 B</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q4 FY23 S</span>
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
                      <div style={{ flexBasis: "25%" }}>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>Q4 FY23 T</span>
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
                    >
                      <div>
                        <div>
                          <span style={{ color: "red" }}>*</span>
                          <span>FY 23</span>
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
                    style={{ padding: "10px 0 0 10px", marginLeft: "-25px" }}
                  >
                    <ButtonSection>
                      <ModalControlButton
                        sx={{ marginLeft: "400px", marginRight: "75px" }}
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
                        sx={{ marginRight: "380px" }}
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
                </div>
              )}
              {isUploadEntrySelected && (
                <div>
                  <ModalDetailSection
                    style={{
                      backgroundColor: "#F2FBFF",
                      width: "800px",
                      height: "350px",
                    }}
                  >
                    <div style={{ marginTop: "20px" }}>
                      <span style={{ color: "red" }}>*</span>
                      <span>File :</span>
                    </div>
                    <Box style={{ backgroundColor: "#FFFFFF", margin: "20px" }}>
                      <DragAndDropContainer
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <Typography variant="body1">
                          Drag and drop your files here or{" "}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            const fileInput = document.createElement("input");
                            fileInput.type = "file";
                            fileInput.accept =
                              "application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; // Accept only Excel files
                            fileInput.addEventListener(
                              "change",
                              handleFileInputChange
                            );
                            fileInput.click();
                          }}
                          style={{
                            marginLeft: "10px",
                            backgroundColor: "#1E4482",
                            color: "#FFFFFF",
                          }}
                        >
                          Browse
                        </Button>
                      </DragAndDropContainer>
                    </Box>
                  </ModalDetailSection>
                  <Box
                    style={{
                      textAlign: "center",
                      paddingBottom: "15px",
                      backgroundColor: "#F2FBFF",
                      borderRadius: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleFileUpload}
                      style={{
                        backgroundColor: "#1E4482",
                        color: "#FFFFFF",
                        marginRight: "30px",
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleModalClose();
                      }}
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#1E4482",
                        color: "#FFFFFF",
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </div>
              )}
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
export default AnnualTargetEntry;
