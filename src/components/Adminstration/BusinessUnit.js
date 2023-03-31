import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";

function BuisnessUnit() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [businessUnitName, setBusinessUnitName] = useState(null);
  const [businessUnitDisplayName, setBusinessUnitDisplayName] = useState(null);
  const [childOfOrg, setChildOfOrganization] = useState(null);

  useEffect(() => {
    getAllBuData();
  }, []);

  const getAllBuData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        console.log("this is resp", response);
        const actualDataObject = response.data.data;
        setData(actualDataObject);
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
      console.log("this is the response", response.data);
    } catch {}
  };
  return (
    <React.Fragment>
      {data ? (
        <div>
          <BaseComponent
            field="BU"
            actionButtonName="Setup BU"
            columns={[
              "BusinessUnit Name",
              "BusinessUnit Display Name",
              "Child Of Organization",
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
                      <label for="name">Business Unit Name</label>
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
                      <label for="email">BusinessUnit Display Name</label>
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
                      <label for="username">Child Of Organization</label>
                      <input
                        type="text"
                        id="email"
                        spellcheck="false"
                        onChange={(e) => {
                          setChildOfOrganization(e.target.value);
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
      ) : (
        <div>no data found</div>
      )}
    </React.Fragment>
  );
}

function Tr({ businessUnitName, businessUnitDisplayName, childOfOrg }) {
  return (
    <tr>
      <td>
        <span>{businessUnitName || "Unknown"}</span>
      </td>
      <td>
        <span>{businessUnitDisplayName || "Unknown"}</span>
      </td>
      <td>
        <span>{childOfOrg || "Unknown"}</span>
      </td>
    </tr>
  );
}

export default BuisnessUnit;
