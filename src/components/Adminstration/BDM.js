import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal, { defaultStyles } from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";
import Select from 'react-select';



function Bdm() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bdmFormData, setbdmFormData] = useState({ bdmName: "", bdmDisplayName: "", activeFrom: "", activeUntil: "", linkedToBusinessUnit: [], linkedToRegion: [] });
  const [isBusinessUnitLinked, setBusinessUnitLinked] = useState(false);
  const [isRegionLinked, setRegionLinked] = useState(false);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [region, setRegion] = useState([]);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];


  const fetchBusinessUnitData = async () => {
    const { data } = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit');
    setBusinessUnit(data?.data);
  }

  const fetchRegionData = async () => {
    const { data } = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/regions');
    setRegion(data?.data)
  }

  const fetchBdmData = async () => {
    fetchBusinessUnitData();
    fetchRegionData();
    const { data } = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm');
    setData(data?.data);
  }

  useEffect(() => {
    fetchBdmData()
  }, [])


  const postBdmData = async () => {
    console.log(bdmFormData);
  }

  return (
    <div>
      <BaseComponent
        field="BDM"
        actionButtonName="Setup BDM"
        columns={["BDM Name", "BDM Display Name", "Active From", "Active Until", "Linked BU", "Linked Region", " "]}
        data={data}
        Tr={(obj) => { return <Tr data={obj} /> }} 
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
                  <input type="text" value={bdmFormData?.bdmName} onChange={(e) => { setbdmFormData({ ...bdmFormData, bdmName: e.target.value }) }} id="bdm-name" />
                </div>
                <div>
                  <label for="email">BDM Display Name</label>
                  <input type="text" value={bdmFormData?.bdmDisplayName} onChange={(e) => { setbdmFormData({ ...bdmFormData, bdmDisplayName: e.target.value }) }} id="bdm-disp-name" spellcheck="false" />
                </div>
                <div>
                  <label for="email">Active From</label>
                  <input type="date" value={bdmFormData?.activeFrom} onChange={(e) => { setbdmFormData({ ...bdmFormData, activeFrom: e.target.value }) }} id="bdm-activeFrom" spellcheck="false" />
                </div>
                <div>
                  <label for="email">Active Until</label>
                  <input type="date" value={bdmFormData?.activeUntil} onChange={(e) => { setbdmFormData({ ...bdmFormData, activeUntil: e.target.value }) }} id="bdm-activeUntil" spellcheck="false" />
                </div>

                <div>
              <label>
                <input
                  type="button"
                  value="Save"
                  id="create-account"
                  class="button"
                  onClick={() => { postBdmData() }}
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
              {/* <div style={{width:'350px',float:'right',borderRadius:"5px"}}>
              <Select isSearchable={false} options={options} />
              </div>             */}
          </div>
        </div>
      </Modal>
    </div>
  );
}
function Tr({ data: { bdmName, bdmDisplayName, activeFrom, activeUntil, linkedToBusinessUnit, linkedToRegion } }) {
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
    isDropdown ? setDropdown(false) : setDropdown(true)
  };
  return (
    <tr ref={wrapperRef}>
      <td>
        <span>{bdmName || "Unknown"}</span>
      </td>
      <td>
        <span>{bdmDisplayName || "Unknown"}</span>
      </td>
      <td>
        <span>{activeFrom}</span>
      </td>
      <td>
        <span>{activeUntil}</span>
      </td>
      <td>
        <span>{linkedToBusinessUnit && linkedToBusinessUnit?.length > 1 ? 'Multiple BU' : linkedToBusinessUnit[0] || 'Unknown'}</span>
      </td>
      <td>
        <span>{linkedToRegion && linkedToRegion?.length > 1 ? 'Multiple Region' : linkedToRegion[0] || 'Unknown'}</span>
      </td>
      <td>
        <span style={{ float: 'right' }} ><AiIcons.AiOutlineMore onClick={(e) => closeDropDown(isDropdown)}></AiIcons.AiOutlineMore>
          {isDropdown && <div style={{ float: 'right' }} class="dropdown-content">
            <a style={{ padding: '5px' }}><AiIcons.AiOutlineEdit onClick={() => { setIsOpen(true); }} /> Edit</a>
            <a href="#about" style={{ padding: '5px' }}><AiIcons.AiOutlineDelete /> Delete</a>
            <a href="#about" style={{ padding: '5px' }}><AiIcons.AiOutlineCheckCircle /> Activate</a>
            <a href="#about" style={{ padding: '5px' }}><AiIcons.AiOutlineCloseCircle /> Deactivate</a>
          </div>} </span>
      </td>
    </tr>
  );
}
export default Bdm;
