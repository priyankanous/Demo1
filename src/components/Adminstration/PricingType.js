import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function PricingType() {
  const [pricingType, setpricingType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pricingTypeFormData, setpricingTypeFormData] = useState({
    pricingTypeName: "",
    pricingTypeDisplayName: "",
  });

  const fetchpricingTypeData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type"
    );
    setpricingType(data?.data);
  };

  useEffect(() => {
    fetchpricingTypeData();
  }, []);

  const setpricingTypeData = async () => {
    const { data } = await axios.post(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/pricing-type",
      pricingTypeFormData
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchpricingTypeData();
    }
  };
  return (
    <div>
      <BaseComponent
        field="Pricing Type"
        actionButtonName="Setup Pricing type"
        columns={["Name", "Display name"]}
        data={pricingType}
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
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="pricing-type-name"
                    value={pricingTypeFormData?.pricingTypeName}
                    onChange={(e) => {
                      setpricingTypeFormData({
                        ...pricingTypeFormData,
                        pricingTypeName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Display name</label>
                  <input
                    type="text"
                    id="pricing-type-display-name"
                    value={pricingTypeFormData?.pricingTypeDisplayName}
                    onChange={(e) => {
                      setpricingTypeFormData({
                        ...pricingTypeFormData,
                        pricingTypeDisplayName: e.target.value,
                      });
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
                      onClick={() => {
                        setpricingTypeData();
                      }}
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

function Tr({ data: { pricingTypeDisplayName, pricingTypeName } }) {
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
        <span>{pricingTypeName || "Unknown"}</span>
      </td>
      <td>
        <span>{pricingTypeDisplayName || "Unknown"}</span>
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

export default PricingType;
