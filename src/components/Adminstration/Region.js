import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
// import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import { Table, Modal, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, Typography } from '@mui/material';
import { TableRowSection, TableCellSection, ModalHeadingSection, ModalHeadingText, ModalDetailSection, InputTextLabel, InputField, ButtonSection, ModalControlButton, MoadalStyle } from "../../utils/constantsValue";
import CloseIcon from '@mui/icons-material/Close';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

function Region() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [regionName, setRegionName] = useState(null);
  const [regionDisplayName, setRegionDisplayName] = useState(null);
  const [regionData, setRegionData] = useState({
    regionName: "",
    regionDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);


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
    } catch { }
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  // const openTheModalWithValues = async (e, id) => {
  //   const { data } = await axios.get(
  //     `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${id}`
  //   );
  //   if (data?.message === "Success" && data?.responseCode === 200) {
  //     setRegionData({
  //       regionName: data?.data?.regionName,
  //       regionDisplayName: data?.data?.regionDisplayName,
  //     });
  //     setIsOpen(true);
  //     // setIsEditId(id);
  //   }
  // };

  return (
    <div>
      <MemoizedBaseComponent
        field="Region"
        buttonText="setup Region"
        columns={["Name", "Display Name", ""]}
        data={data}
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
      <Modal
        open={isOpen}
        onClose={handleModalClose}
      >
        <Box sx={MoadalStyle}>
          <ModalHeadingSection>
            <ModalHeadingText>Setup Region</ModalHeadingText>
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
                    setRegionData({
                      ...regionData,
                      regionName: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ padding: "10px 0px" }}>
                <InputTextLabel>Display Name</InputTextLabel>
                <InputField
                  size="small"
                  type="text"
                  id="email"
                  variant="outlined"
                  spellcheck="false"
                  onChange={(e) => {
                    setRegionData({
                      ...regionData,
                      regionDisplayName: e.target.value,
                    });
                  }}
                />
              </div>
              <ButtonSection>
                <ModalControlButton
                  type="button"
                  value="Save"
                  id="create-account"
                  onClick={AddDataToRegion}
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

  const DeleteRecord = () => {
    axios
      .delete(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions/${regionId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        getAllRegionData();
        setIsOpen(false);
      });
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  console.log("regionId",regionId)

  return (
    <React.Fragment>
      <TableRowSection ref={wrapperRef}>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>{regionName || "Unknown"}</span>
        </TableCellSection>
        <TableCellSection className={!isActive && "disable-table-row"}>
          <span>
            {regionDisplayName || "Unknown"}
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
                    activeDeactivateTableData(regionId);
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
                    activeDeactivateTableData(regionId);
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
        isOpen={isOpen}
        onClose={handleModalClose}
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
export default Region;
