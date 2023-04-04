import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";

function Status() {
  const [statusType, setstatusType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [statusTypeFormData,setstatusTypeFormData] = useState({statusName:"",statusDisplayName:""})


  const fetchstatusTypeData = async ()=>{
    const {data} = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/status');
    setstatusType(data?.data)
  }

  useEffect(() => {  
    fetchstatusTypeData();
  }, []);

  const setstatusTypeData = async ()=>{
    const {data} = await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/status',statusTypeFormData);
    if(data?.message === 'Success' && data?.responseCode === 200){
      setIsOpen(false);
      fetchstatusTypeData();
    }
  }

  return (
    <div>
      <BaseComponent
        field="Status"
        actionButtonName="Setup status"
        columns={["Status name", "Status display name"]}
        data={statusType}
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
              <ModalHeading>Setup Status</ModalHeading>
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
                  <label for="name">Status name</label>
                  <input type="text" id="status-name" value={statusTypeFormData?.statusName} onChange={(e)=>{setstatusTypeFormData({...statusTypeFormData,statusName:e.target.value})}} />
                </div>
                <div>
                  <label for="email">Status display name</label>
                  <input type="text" id="status-display-name" value={statusTypeFormData?.statusDisplayName} onChange={(e)=>{setstatusTypeFormData({...statusTypeFormData,statusDisplayName:e.target.value})}} />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={()=>{setstatusTypeData()}}
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

function Tr({ statusName,statusDisplayName}) {
  return (
    <tr>
      <td>
        <span>{statusName || "Unknown"}</span>
      </td>
      <td>
        <span>{statusDisplayName || "Unknown"}</span>
      </td>
    </tr>
  );
}

export default Status;
