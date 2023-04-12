import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function BuisnessUnit() {
  const [data, setData] = useState(null);
  const [orgNameData, setOrgNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [businessUnitName, setBusinessUnitName] = useState(null);
  const [businessUnitDisplayName, setBusinessUnitDisplayName] = useState(null);
  const [childOfOrg, setChildOfOrganization] = useState(null);

  useEffect(() => {
    getAllBuData();
  }, []);

  const getAllBuData = () => {
    getOrgNameData();
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const getOrgNameData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/organization`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setOrgNameData(actualDataObject);
      });
  };
  const AddDataToBu = async (e) => {
    const post = {
      businessUnitName: businessUnitName,
      businessUnitDisplayName: businessUnitDisplayName,
      childOfOrg: childOfOrg,
    };
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit",
        post
      );
      setIsOpen(false);
      getAllBuData();
    } catch {}
  };
  return (
    <React.Fragment>
      <div>
        <MemoizedBaseComponent
          field="Business Unit"
          actionButtonName="Setup Business Unit"
          columns={["Name", "Display Name", "Parent Organization"]}
          data={data}
          Tr={(obj) => {
            return <Tr data={obj} />;
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
                <ModalHeading>Setup Business Unit</ModalHeading>
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
                    <label for="name"> Name</label>
                    <input
                      type="text"
                      id="name"
                      spellcheck="false"
                      onChange={(e) => {
                        setBusinessUnitName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label for="email"> Display Name</label>
                    <input
                      type="text"
                      id="email"
                      spellcheck="false"
                      onChange={(e) => {
                        setBusinessUnitDisplayName(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label for="username">Parent Organization</label>
                    <select
                      onChange={(e) => {
                        setChildOfOrganization(e.target.value);
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Please choose one option
                      </option>
                      {orgNameData.map((orgDataName, index) => {
                        const orgName = orgDataName.orgName;
                        return <option key={index}>{orgName}</option>;
                      })}
                    </select>
                  </div>
                  <div>
                    <label>
                      <input
                        type="button"
                        value="Save"
                        id="create-account"
                        class="button"
                        onClick={AddDataToBu}
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
    </React.Fragment>
  );
}

function Tr({
  data: { businessUnitName, businessUnitDisplayName, childOfOrg },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      <td>
        <span>{businessUnitName || "Unknown"}</span>
      </td>
      <td>
        <span>{businessUnitDisplayName || "Unknown"}</span>
      </td>
      <td>
        <span>{childOfOrg || "Unknown"}</span>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => {
              closeDropDown();
            }}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right" }} class="dropdown-content">
              <a style={{ padding: "5px" }}>
                <AiIcons.AiOutlineEdit
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
                Edit
              </a>
              <a href="#about" style={{ padding: "5px" }}>
                <AiIcons.AiOutlineDelete /> Delete
              </a>
              <a href="#about" style={{ padding: "5px" }}>
                <AiIcons.AiOutlineCheckCircle /> Activate
              </a>
              <a href="#about" style={{ padding: "5px" }}>
                <AiIcons.AiOutlineCloseCircle /> Deactivate
              </a>
            </div>
          )}
        </span>
      </td>
    </tr>
  );
}

export default BuisnessUnit;
