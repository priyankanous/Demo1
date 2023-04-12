import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function CocPractice() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buNameData, setBuNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [buDisplayName, setBuDisplayName] = useState(null);
  const [cocPracticeName, setCocPracticeName] = useState(null);
  const [cocPracticeDisplayName, setCocPracticeDisplayName] = useState(null);

  useEffect(() => {
    getAllCocData();
  }, []);

  const getAllCocData = () => {
    getAllBuNameData();
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const getAllBuNameData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setBuNameData(actualDataObject);
      });
  };
  const AddDataToCocPractice = async (e) => {
    const post = {
      cocPracticeName: cocPracticeName,
      cocPracticeDisplayName: cocPracticeDisplayName,
      buDisplayName: buDisplayName,
    };
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice",
        post
      );
      console.log("this is the response", response.data);
      getAllCocData();
      setIsOpen(false);
    } catch {}
  };
  return (
    <div>
      <MemoizedBaseComponent
        field="Coc Practice"
        actionButtonName="Setup Coc Practice"
        columns={["Name", " Display Name", "Parent Business Unit"]}
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
              <ModalHeading>Setup CoC Practice</ModalHeading>
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
                  <label for="email">Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCocPracticeName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="username">name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCocPracticeDisplayName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="name">Parent Business Unit</label>
                  <select
                    onChange={(e) => {
                      setBuDisplayName(e.target.value);
                    }}
                  >
                    <option>Please choose one option</option>
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
                      onClick={AddDataToCocPractice}
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

function Tr({
  data: { cocPracticeName, cocPracticeDisplayName, buDisplayName },
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
        <span>{cocPracticeName || "Unknown"}</span>
      </td>
      <td>
        <span>{cocPracticeDisplayName || "Unknown"}</span>
      </td>
      <td>
        <span>{buDisplayName || "Unknown"}</span>
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

export default CocPractice;
