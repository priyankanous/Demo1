import React, { useState, useEffect } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";

function Sbu() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sbuName, setSbuName] = useState(null);
  const [sbuDisplayName, setSbuDisplayName] = useState(null);
  const [buDisplayName, setBuDisplayName] = useState(null);

  useEffect(() => {
    getAllSbuData();
  }, []);
  const getAllSbuData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu`)
      .then((response) => {
        console.log("this is resp", response);
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
        field="SBU"
        actionButtonName="Setup SBU"
        columns={["SBU Name", "SBU Display Name", "Child of BU"]}
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
                  <label for="name">SBU Name</label>
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
                  <label for="email">SBU Display Name</label>
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
                  <label for="email">Child of BU</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setBuDisplayName(e.target.value);
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
      </td>
    </tr>
  );
}
export default Sbu;
