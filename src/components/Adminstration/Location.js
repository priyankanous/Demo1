import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function Location() {
  const [locationName, setLocationName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [locationFormData, setLocationFormData] = useState({ locationName: "", locationDisplayName: "" })
  const [isEditId, setIsEditId] = useState(null);


  const fetchLocationName = async () => {
    const { data } = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/location');
    setLocationName(data?.data)
  }

  useEffect(() => {
    fetchLocationName();
  }, []);

  const setlocationDetails = async () => {
    if (isEditId !== null) {
      var { data } = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/${isEditId}`, locationFormData);
    } else {
      var { data } = await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/location', locationFormData);
    }
    if (data?.message === 'Success' && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      fetchLocationName();
    }}

    const openTheModalWithValues = async (e, id) => {
      console.log(id, 'HERE');
      const { data } = await axios.get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/${id}`);
      if (data?.message === 'Success' && data?.responseCode === 200) {
        setLocationFormData({ locationName: data?.data?.locationName, locationDisplayName: data?.data?.locationDisplayName })
        setIsOpen(true);
        setIsEditId(id);
      }
    }

    const deleteSelectedLocation = async(id)=>{
      const { data } = await axios.delete(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/${id}`);
      if (data?.message === 'Success' && data?.responseCode === 200) {
        setLocationFormData({ locationName:"", locationDisplayName: "" })
        setIsOpen(false);
        setIsEditId(null);
        fetchLocationName()
      }
    }

    const activeDeactivateTableData = async(id)=>{
      const {data} = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/location/activate-or-deactivate/${id}`);
      if(data?.message === 'Success' && data?.responseCode === 200){
        setLocationFormData({ locationName:"", locationDisplayName: "" })
        setIsOpen(false);
        setIsEditId(null);
        fetchLocationName()
      }
    }

    return (
      <div>
        <MemoizedBaseComponent
          field="Location"
          actionButtonName="Setup Location"
          columns={["Name", "Display Name"," "]}
          data={locationName}
          Tr={(obj) => { return <Tr data={obj} activeDeactivateTableData={activeDeactivateTableData} openTheModalWithValues={openTheModalWithValues} deleteSelectedLocation={deleteSelectedLocation} /> }}
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
                    <label for="name">Name</label>
                    <input type="text" id="loc-name" value={locationFormData?.locationName} onChange={(e) => { setLocationFormData({ ...locationFormData, locationName: e.target.value }) }} />
                  </div>
                  <div>
                    <label for="email">Display Name</label>
                    <input type="text" id="loc-disp-name" value={locationFormData?.locationDisplayName} onChange={(e) => { setLocationFormData({ ...locationFormData, locationDisplayName: e.target.value }) }} />
                  </div>
                  <div>
                    <label>
                      <input
                        type="button"
                        value="Save"
                        id="create-account"
                        class="button"
                        onClick={() => { setlocationDetails() }}
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
  function Tr({ data: { locationName, locationDisplayName, locationId,isActive }, activeDeactivateTableData,openTheModalWithValues,deleteSelectedLocation }) {
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
      isDropdown ? setDropdown(false) : setDropdown(true)
    };


    return (
      <tr ref={wrapperRef}>
        <td className={!isActive && 'disable-table-row'}>
          <span>{locationName || "Unknown"}</span>
        </td>
        <td className={!isActive && 'disable-table-row'}>
          <span>{locationDisplayName || "Unknown"}</span>
        </td>
        <td data-id={locationId}>
        <span style={{ float: 'right' }} ><AiIcons.AiOutlineMore onClick={(e) => closeDropDown(isDropdown)}></AiIcons.AiOutlineMore>
            {isDropdown && <div style={{ float: 'right' }} class="dropdown-content">
              <a onClick={(e) => { openTheModalWithValues(e, locationId) }} style={{ padding: '5px' }}><AiIcons.AiOutlineEdit /> Edit</a>
              <a onClick={()=>{deleteSelectedLocation(locationId)}} style={{ padding: '5px' }}><AiIcons.AiOutlineDelete /> Delete</a>
              <a className={isActive && 'disable-table-row'} onClick={()=>{activeDeactivateTableData(locationId)}} style={{ padding: '5px' }}><AiIcons.AiOutlineCheckCircle /> Activate</a>
              <a className={!isActive && 'disable-table-row'} onClick={()=>{activeDeactivateTableData(locationId)}} style={{ padding: '5px' }}><AiIcons.AiOutlineCloseCircle /> Deactivate</a>
            </div>} </span>
        </td>
      </tr>
    );
  }
  export default Location;
