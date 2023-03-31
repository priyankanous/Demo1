import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalFormButton, ModalHeading,ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";

function WorkOrderStatus() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        field="Work Order status"
        actionButtonName="Setup Work order status"
        columns={["Work order status name", "Work order status display name"]}
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
              <ModalHeading>Setup Work Order Status</ModalHeading>
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
                    <div class="main" className="ModalContainer">
                        <div class="register">
                            <ModalHeading>Setup Work Order Status</ModalHeading>
                            <ModalIcon onClick={()=>{setIsOpen(false)}}><AiOutlineClose></AiOutlineClose></ModalIcon>
                            <hr color="#62bdb8"></hr>
                            <form id="reg-form">
                                <div>
                                    <label for="name">Work order status name</label>
                                    <input type="text" id="name" spellcheck="false" />
                                </div>
                                <div>
                                    <label for="email">Work order status display name</label>
                                    <input type="text" id="email" spellcheck="false" />
                                </div>
                                <ModalFormButton>
                                    <input type="button" value="Save" id="create-account" class="button" />
                                    <input type="button" onClick={()=>{setIsOpen(false)}} value="Cancel" id="create-account" class="button" />
                                </ModalFormButton>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                  <label for="email">Work order status display name</label>
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

function Tr({ userId, id, title, completed }) {
  return (
    <tr>
      <td>
        <span>{id || "Unknown"}</span>
      </td>
      <td>
        <span>{userId || "Unknown"}</span>
      </td>
      <td>
        <span>{title || "Unknown"}</span>
      </td>
      <td>
        <span>{completed || "Unknown"}</span>
      </td>
    </tr>
  );
}

export default WorkOrderStatus;
