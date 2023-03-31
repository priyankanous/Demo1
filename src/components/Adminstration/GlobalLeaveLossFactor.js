import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";

function GlobalLeaveLossFactor() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGlobalLeave, setIsGlobalLeave] = useState(true);

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
        field="#"
        actionButtonName="Apply"
        columns={["#", "Month", "Offshore", "Onshore", ""]}
        data={data}
        Tr={Tr}
        setIsOpen={setIsOpen}
        globalLeave={isGlobalLeave}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Setup Location</ModalHeading>
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
                  <label for="name">Location Name</label>
                  <input type="text" id="name" spellcheck="false" />
                </div>
                <div>
                  <label for="email">Location Display Name</label>
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

function Tr({ name, id, username, email }) {
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    name: name,
    id: id,
    username: username,
    email: email,
  });

  const OnSubmit = () => {
    //update the data using update API
    //refatch the data using the get API
  };

  return (
    <tr>
      <td>
        <span>{id || "Unknown"}</span>
      </td>
      <td>
        <span>{name || "Unknown"}</span>
      </td>
      <td>
        <span>{username || "Unknown"}</span>
      </td>
      <td>
        <span>{email || "Unknown"}</span>
      </td>
      <td>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Edit
        </button>
      </td>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Setup Financial Year</ModalHeading>
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
                  <label for="name">#</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.id}
                  />
                </div>
                <div>
                  <label for="email">Months</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={responseData.name}
                    onChange={(e) =>
                      setResponseData({ ...responseData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label for="email">OffShore</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={responseData.email}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label for="email">OnSite</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={responseData.username}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={OnSubmit}
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
    </tr>
  );
}

export default GlobalLeaveLossFactor;
