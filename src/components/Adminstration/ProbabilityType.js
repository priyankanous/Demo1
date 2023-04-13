import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import {MemoizedBaseComponent} from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function Probability() {
  const [probabilityFormData, setProbabilityFormData] = useState({ probabilityTypeName: "", percentage: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [probabilitydata, setProbabilityData] = useState([]);
  const [isEditId, setIsEditId] = useState(null);

  const fetchPercentageType = async () => {
    const { data } = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type');
    setProbabilityData(data?.data)
  }

  useEffect(() => {
    fetchPercentageType();
  }, []);

  const setProbabilityTypeData = async () => {
    if(isEditId !== null){
      var { data } = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/${isEditId}`, probabilityFormData);
    }else{
      var { data } = await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type', probabilityFormData);
    }
    if (data?.message === 'Success' && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      fetchPercentageType();
    }
  }

  const openTheModalWithValues = async (e, id) => {
      const { data } = await axios.get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/${id}`);
      if (data?.message === 'Success' && data?.responseCode === 200) {
        setProbabilityFormData({ probabilityTypeName: data?.data?.probabilityTypeName, percentage: data?.data?.percentage })
        setIsOpen(true);
        setIsEditId(id);
      }
    }

    const deleteSelectedLocation = async(id)=>{
      const { data } = await axios.delete(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/${id}`);
      if (data?.message === 'Success' && data?.responseCode === 200) {
        setProbabilityFormData({ probabilityTypeName:"", percentage: 0 })
        setIsOpen(false);
        setIsEditId(null);
        fetchPercentageType()
      }
    }

    const activeDeactivateTableData = async(id)=>{
      const {data} = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type/activate-or-deactivate/${id}`);
      if(data?.message === 'Success' && data?.responseCode === 200){
        setProbabilityFormData({ probabilityTypeName:"", percentage: 0 })
        setIsOpen(false);
        setIsEditId(null);
        fetchPercentageType()
      }
    }


  return (
    <div>
      <MemoizedBaseComponent
        field="Probability Type"
        actionButtonName="Setup Probability"
        columns={["Name", "Percentage"]}
        data={probabilitydata}
        Tr={(obj)=>{return <Tr activeDeactivateTableData={activeDeactivateTableData} openTheModalWithValues={openTheModalWithValues} deleteSelectedLocation={deleteSelectedLocation} data={obj}/>}}
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
                  <label for="name">Name</label>
                  <input type="text" id="probability-type-name" spellcheck="false" value={probabilityFormData?.probabilityTypeName} onChange={(e) => { setProbabilityFormData({ ...probabilityFormData, probabilityTypeName: e.target.value }) }} />
                </div>
                <div>
                  <label for="email">Percentage</label>
                  <input type="number" id="probability-percentage" spellcheck="false" value={probabilityFormData?.percentage} onChange={(e) => { setProbabilityFormData({ ...probabilityFormData, percentage: parseInt(e.target.value) }) }} />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={() => { setProbabilityTypeData() }}
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
function Tr({ data:{probabilityTypeName, percentage,probabilityTypeId,isActive},openTheModalWithValues,activeDeactivateTableData,deleteSelectedLocation }) {
  const [isDropdown, setDropdown] = useState(false);

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
      <td className={!isActive && 'disable-table-row'}>
        <span>{probabilityTypeName || "Unknown"}</span>
      </td>
      <td className={!isActive && 'disable-table-row'} data-id={probabilityTypeId}>
        <span>{percentage || "Unknown"}</span>
        <span style={{ float: 'right' }} ><AiIcons.AiOutlineMore onClick={(e) => closeDropDown(isDropdown)}></AiIcons.AiOutlineMore>
          {isDropdown && <div style={{ float: 'right' }} class="dropdown-content">
            <a onClick={(e) => { openTheModalWithValues(e, probabilityTypeId) }} style={{ padding: '5px' }}><AiIcons.AiOutlineEdit /> Edit</a>
            <a onClick={()=>{deleteSelectedLocation(probabilityTypeId)}} href="#about" style={{ padding: '5px' }}><AiIcons.AiOutlineDelete /> Delete</a>
            <a className={isActive && 'disable-table-row'} onClick={()=>{activeDeactivateTableData(probabilityTypeId)}} style={{ padding: '5px' }}><AiIcons.AiOutlineCheckCircle /> Activate</a>
            <a className={!isActive && 'disable-table-row'} onClick={()=>{activeDeactivateTableData(probabilityTypeId)}} style={{ padding: '5px' }}><AiIcons.AiOutlineCloseCircle /> Deactivate</a>
          </div>} </span>
      </td>
    </tr>
  );
}
export default Probability;
