import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function BusinessType() {
  const [businessType, setBusinessType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [businessTypeFormData,setbusinessTypeFormData] = useState({businessTypeName:"",businessTypeDisplayName:""})


  const fetchBusinessTypeData = async ()=>{
    const {data} = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type');
    setBusinessType(data?.data)
  }

  useEffect(() => {  
    fetchBusinessTypeData();
  }, []);

  const setBusinessTypeData = async ()=>{
    const {data} = await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-type',businessTypeFormData);
    if(data?.message === 'Success' && data?.responseCode === 200){
      setIsOpen(false);
      fetchBusinessTypeData();
    }
  }


  return (
    <div>
      <BaseComponent
        field="Business Type"
        actionButtonName="Setup Business Type"
        columns={["Name", "Display Name"]}
        data={businessType}
        Tr={(obj)=>{return <Tr data={obj}/>}}
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
              <ModalHeading>Setup Business Type</ModalHeading>
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
                  <input type="text" id="business-type-name" value={businessTypeFormData?.businessTypeName} onChange={(e)=>{setbusinessTypeFormData({...businessTypeFormData,businessTypeName:e.target.value})}}  />
                </div>
                <div>
                  <label for="email">Display Name</label>
                  <input type="text" id="business-type-display-name" value={businessTypeFormData?.businessTypeDisplayName} onChange={(e)=>{setbusinessTypeFormData({...businessTypeFormData,businessTypeDisplayName:e.target.value})}}  />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={()=>{setBusinessTypeData()}}
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

function Tr({ businessTypeName, businessTypeDisplayName }) {
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
    isDropdown  ? setDropdown(false) : setDropdown(true)
  };
  return (
    <tr ref={wrapperRef}>
      <td>
        <span>{businessTypeName || "Unknown"}</span>
      </td>
      <td>
        <span>{businessTypeDisplayName || "Unknown"}</span>
      </td>
      <td>
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

export default BusinessType;
