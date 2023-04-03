import React, { useState, useEffect } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";

function Location() {
  const [locationName, setLocationName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [locationFormData,setLocationFormData] = useState({locationName:"",locationDisplayName:""})


  const fetchLocationName = async ()=>{
    const {data} = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/location');
    setLocationName(data?.data)
  }

  useEffect(() => {  
    fetchLocationName();
  }, []);

  const setlocationDetails = async ()=>{
    const {data} = await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/location',locationFormData);
    if(data?.message === 'Success' && data?.responseCode === 200){
      setIsOpen(false);
      fetchLocationName();
    }
  }

  return (
    <div>
      <BaseComponent
        field="Location"
        actionButtonName="Setup Location"
        columns={["Location Name", "Location Display Name"]}
        data={locationName}
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
                  <input type="text" id="loc-name" value={locationFormData?.locationName} onChange={(e)=>{setLocationFormData({...locationFormData,locationName:e.target.value})}} />
                </div>
                <div>
                  <label for="email">Location Display Name</label>
                  <input type="text" id="loc-disp-name" value={locationFormData?.locationDisplayName} onChange={(e)=>{setLocationFormData({...locationFormData,locationDisplayName:e.target.value})}} />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={()=>{setlocationDetails()}}
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
function Tr({ locationName, locationDisplayName }) {
  return (
    <tr>
      <td>
        <span>{locationName || "Unknown"}</span>
      </td>
      <td>
        <span>{locationDisplayName || "Unknown"}</span>
      </td>
    </tr>
  );
}
export default Location;
