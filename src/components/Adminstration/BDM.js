import React, { useState, useEffect } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon,ModalFormButton } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";

function Bdm() {
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
        field="BDM"
        actionButtonName="Setup BDM"
        columns={["BDM Name", "BDM Display Name", "BDM__"]}
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
              <ModalHeading>Setup BDM</ModalHeading>
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
                  <label for="name">BDM Name</label>
                  <input type="text" id="name" spellcheck="false" />
                </div>
                <div>
                  <label for="email">BDM Display Name</label>
                  <input type="text" id="email" spellcheck="false" />
                </div>
                <div>
                  <label for="email">BDM__</label>
                  <input type="text" id="email" spellcheck="false" />
                </div>
                <ModalFormButton>
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
                </ModalFormButton>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
function Tr({ name, username }) {
  return (
    <tr>
      <td>
        <span>{name || "Unknown"}</span>
      </td>
      <td>
        <span>{username || "Unknown"}</span>
      </td>
    </tr>
  );
}
export default Bdm;
