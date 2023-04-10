import React, { useState, useEffect } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function Sbu() {
  const [data, setData] = useState(null);
  const [buNameData, setBuNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sbuName, setSbuName] = useState(null);
  const [sbuDisplayName, setSbuDisplayName] = useState(null);
  const [buDisplayName, setBuDisplayName] = useState(null);
  useEffect(() => {
    getAllSbuData();
  }, []);

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
  const getAllSbuData = async () => {
    getBuNameData();
    await axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  const AddDataToSbu = async (e) => {
    const post = {
      sbuName: sbuName,
      sbuDisplayName: sbuDisplayName,
      buDisplayName: buDisplayName,
    };
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu",
        post
      );
      console.log("this is the response", response.data);
    } catch {}
  };
  return (
    <div>
      <BaseComponent
        field="Strategic Business Unit"
        actionButtonName="Setup Strategic Business Unit"
        columns={[" Name", " Display Name", "Parent Business Unit"]}
        data={data}
        Tr={Tr}
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
              <ModalHeading>Setup SBU</ModalHeading>
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
                    id="name"
                    spellcheck="false"
                    onChange={(e) => {
                      setSbuName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="email">Display Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setSbuDisplayName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="email">Parent Business Unit</label>
                  <select
                    onChange={(e) => {
                      setBuDisplayName(e.target.value);
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {buNameData.map((buData, index) => {
                      const buNameData = buData.businessUnitName;
                      return <option key={index}>{buNameData}</option>;
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
                      onClick={AddDataToSbu}
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
function Tr({ sbuName, sbuDisplayName, buDisplayName }) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropDown = (isopen) => {
    isopen ? setDropdown(false) : setDropdown(true);
  };
  return (
    <tr>
      <td>
        <span>{sbuName || "Unknown"}</span>
      </td>
      <td>
        <span>{sbuDisplayName || "Unknown"}</span>
      </td>
      <td>
        <span>{buDisplayName || "Unknown"}</span>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right" }} class="dropdown-content">
              <a style={{ padding: "5px" }}>
                <AiIcons.AiOutlineEdit
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />{" "}
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
          )}{" "}
        </span>
      </td>
    </tr>
  );
}
export default Sbu;
