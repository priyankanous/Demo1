import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";

function SbuHead() {


  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sbuNameData, setSbuNameData] = useState([]);
  const [sbuHeadName, setSbuHeadName] = useState(null);
  const [sbuHeadDisplayName, setSbuHeadDisplayName] = useState(null);
  const [activeForm, setActiveForm] = useState(null);
  const [activeUntil, setActiveUntil] = useState(null);
  const [sbuName, setSbuName] = useState(null);


  const getAllSbuNameData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setSbuNameData(actualDataObject);
      });
  };

  const getAllSbuHeadData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  useEffect(() => {
    getAllSbuHeadData();
    getAllSbuNameData();
  }, []);

  const AddDataToSbuHead = async () => {
    const post = {
      sbuHeadName: sbuHeadName,
      sbuHeadDisplayName: sbuHeadDisplayName,
      sbuName: sbuName,
      activeForm: activeForm.split('-').reverse().join('/'),
      activeUntil: activeUntil.split('-').reverse().join('/'),
    };
    console.log(post);

    const response = await axios.post(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead",
      post
    );
    setIsOpen(false);
    getAllSbuHeadData();

  };

  return (
    <div>
      <BaseComponent
        field="SBU Head"
        actionButtonName="Setup SBU Head"
        columns={[
          "SBU Head Name",
          "SBU Head Display Name",
          "SBU Name",
          "Active From",
          "Active Untill",
          " "
        ]}
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
              <ModalHeading>Setup SBU Head</ModalHeading>
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
                  <label for="name">SBU Head Name</label>
                  <input type="text" id="name" spellcheck="false"
                    onChange={(e) => {
                      setSbuHeadName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="email">SBU Head Display Name</label>
                  <input type="text" id="email" spellcheck="false"
                    onChange={(e) => {
                      setSbuHeadDisplayName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="email">SBU Name</label>
                  <select
                    onChange={(e) => {
                      setSbuName(e.target.value);
                    }}
                  >
                    <option value="" disabled selected hidden >Please choose one option</option>
                    {sbuNameData.map((sbuData, index) => {
                      const sbuNameData = sbuData.sbuName;
                      return <option key={index}>{sbuNameData}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label for="email">Active From</label>
                  <input type="date" id="email" spellcheck="false"
                    onChange={(e) => {
                      setActiveForm(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="email">Active Untill</label>
                  <input type="date" id="email" spellcheck="false"
                    onChange={(e) => {
                      setActiveUntil(e.target.value);
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
                      onClick={() => { AddDataToSbuHead() }}
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


function Tr({ sbuHeadName, sbuHeadDisplayName, sbuName, activeFrom, activeUntil }) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropDown = (isopen) => {
    isopen ? setDropdown(false) : setDropdown(true)
  };
  return (
    <tr>
      <td>
        <span>{sbuHeadName || "Unknown"}</span>
      </td>
      <td>
        <span>{sbuHeadDisplayName || "Unknown"}</span>
      </td>
      <td>
        <span>{sbuName || "Unknown"}</span>
      </td>
      <td>
        <span>{activeFrom || "Unknown"}</span>
      </td>
      <td>
        <span>{activeUntil || "Unknown"}</span>
      </td>
      <td>
        <span style={{ float: 'right' }} ><AiIcons.AiOutlineMore onClick={(e) => closeDropDown(isDropdown)}></AiIcons.AiOutlineMore>
          {isDropdown && <div style={{ float: 'right' }} class="dropdown-content">
            <a style={{ padding: '5px' }}><AiIcons.AiOutlineEdit onClick={() => { setIsOpen(true); }} /> Edit</a>
            <a href="#about" style={{ padding: '5px' }}><AiIcons.AiOutlineDelete /> Delete</a>
            <a href="#about" style={{ padding: '5px' }}><AiIcons.AiOutlineCheckCircle /> Activate</a>
            <a href="#about" style={{ padding: '5px' }}><AiIcons.AiOutlineCloseCircle /> Deactivate</a>
          </div>} </span>
      </td>
    </tr>
  );
}
export default SbuHead;
