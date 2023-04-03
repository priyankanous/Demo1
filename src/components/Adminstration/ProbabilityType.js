import React, { useState, useEffect } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import * as AiIcons from "react-icons/ai";

function Probability() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
      });
  }, []);

  return (
    <div>
      <BaseComponent
        field="Probability Type"
        actionButtonName="Setup Probability"
        columns={["Probability Type Name", "Percentage"]}
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
              <ModalHeading>Setup Probability</ModalHeading>
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
                  <label for="name">Probability Type Name</label>
                  <input type="text" id="name" spellcheck="false" />
                </div>
                <div>
                  <label for="email">Percentage</label>
                  <input type="text" id="email" spellcheck="false" />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
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
function Tr({ name, username }) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropDown = (isopen) => {
    isopen  ? setDropdown(false) : setDropdown(true)
  };
  return (
    <tr>
      <td>
        <span>{name || "Unknown"}</span>
      </td>
      <td>
        <span>{username || "Unknown"}</span>
      <span style={{float:'right'}} ><AiIcons.AiOutlineMore  onClick={(e)=>closeDropDown(isDropdown)}></AiIcons.AiOutlineMore>
        {isDropdown && <div style={{float:'right'}} class="dropdown-content">
                        <a style={{padding:'5px'}}><AiIcons.AiOutlineEdit onClick={() => {setIsOpen(true); }} /> Edit</a>
                        <a href="#about" style={{padding:'5px'}}><AiIcons.AiOutlineDelete/> Delete</a>
                        <a href="#about" style={{padding:'5px'}}><AiIcons.AiOutlineCheckCircle/> Activate</a>
                        <a href="#about" style={{padding:'5px'}}><AiIcons.AiOutlineCloseCircle/> Deactivate</a>
                    </div>} </span>
      </td>
    </tr>
  );
}
export default Probability;
