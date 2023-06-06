import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function Status() {
  const [statusType, setstatusType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [statusTypeFormData, setstatusTypeFormData] = useState({
    statusName: "",
    statusDisplayName: "",
  });
  const [isEditId, setIsEditId] = useState(null);

  const fetchstatusTypeData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/status"
    );
    setstatusType(data?.data);
  };

  useEffect(() => {
    fetchstatusTypeData();
  }, []);

  const setstatusTypeData = async () => {
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/${isEditId}`,
        statusTypeFormData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/status",
        statusTypeFormData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchstatusTypeData();
      setIsEditId(null);
    }
  };

  const openTheModalWithValues = async (e, id) => {
    console.log(id, "HERE");
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setstatusTypeFormData({
        statusName: data?.data?.statusName,
        statusDisplayName: data?.data?.statusDisplayName,
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const deleteSelectedLocation = async (id) => {
    const { data } = await axios.delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setstatusTypeFormData({ statusName: "", statusDisplayName: "" });
      setIsOpen(false);
      setIsEditId(null);
      fetchstatusTypeData();
    }
  };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/status/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setstatusTypeFormData({ statusName: "", statusDisplayName: "" });
      setIsOpen(false);
      setIsEditId(null);
      fetchstatusTypeData();
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Status"
        columns={["Name", "Display name", " "]}
        data={statusType}
        Tr={(obj) => {
          return (
            <Tr
              activeDeactivateTableData={activeDeactivateTableData}
              openTheModalWithValues={openTheModalWithValues}
              deleteSelectedLocation={deleteSelectedLocation}
              data={obj}
            />
          );
        }}
        setIsOpen={setIsOpen}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Setup Status</ModalHeading>
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
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="status-name"
                    value={statusTypeFormData?.statusName}
                    onChange={(e) => {
                      setstatusTypeFormData({
                        ...statusTypeFormData,
                        statusName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Display name</label>
                  <input
                    type="text"
                    id="status-display-name"
                    value={statusTypeFormData?.statusDisplayName}
                    onChange={(e) => {
                      setstatusTypeFormData({
                        ...statusTypeFormData,
                        statusDisplayName: e.target.value,
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
                      onClick={() => {
                        setstatusTypeData();
                      }}
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
    </div>
  );
}

function Tr({
  data: { statusName, statusDisplayName, isActive, statusId },
  activeDeactivateTableData,
  openTheModalWithValues,
  deleteSelectedLocation,
}) {
  const [isDropdown, setDropdown] = useState(false);

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
  return (
    <tr ref={wrapperRef}>
      <td className={!isActive && "disable-table-row"}>
        <span>{statusName || "Unknown"}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{statusDisplayName || "Unknown"}</span>
      </td>
      <td data-id={statusId}>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right" }} class="dropdown-content">
              <a
                onClick={(e) => {
                  openTheModalWithValues(e, statusId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineEdit /> Edit
              </a>
              {/* <a onClick={()=>{deleteSelectedLocation(statusId)}} style={{ padding: '5px' }}><AiIcons.AiOutlineDelete /> Delete</a> */}
              <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(statusId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineCheckCircle /> Activate
              </a>
              <a
                className={!isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(statusId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineCloseCircle /> Deactivate
              </a>
            </div>
          )}{" "}
        </span>
      </td>
    </tr>
  );
}

export default Status;
