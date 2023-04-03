import React, { useState, useEffect } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";

function Region() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [regionName, setRegionName] = useState(null);
  const [regionDisplayName, setRegionDisplayName] = useState(null);

  useEffect(() => {
    getAllRegionData();
  }, []);
  const getAllRegionData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions`)
      .then((response) => {
        console.log("this is resp", response);
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };

  const AddDataToRegion = async (e) => {
    const post = {
      regionName: regionName,
      regionDisplayName: regionDisplayName,
    };
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions",
        post
      );
      console.log("this is the response", response.data);
    } catch {}
  };

  return (
    <div>
      <BaseComponent
        field="Region"
        actionButtonName="Setup Region"
        columns={["Region Name", "Region Display Name"]}
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
              <ModalHeading>Setup Region</ModalHeading>
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
                  <label for="name">Region Name</label>
                  <input
                    type="text"
                    id="name"
                    spellcheck="false"
                    onChange={(e) => {
                      setRegionName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="email">Region Display Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setRegionDisplayName(e.target.value);
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
                      onClick={AddDataToRegion}
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
function Tr({ regionName, regionDisplayName }) {
  return (
    <tr>
      <td>
        <span>{regionName || "Unknown"}</span>
      </td>
      <td>
        <span>{regionDisplayName || "Unknown"}</span>
      </td>
    </tr>
  );
}
export default Region;
