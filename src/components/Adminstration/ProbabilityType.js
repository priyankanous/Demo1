import React, { useState, useEffect } from "react";
import {  AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";

function Probability() {
  const [probabilityFormData,setProbabilityFormData] = useState({probabilityTypeName:"",percentage:0});
  const [isOpen, setIsOpen] = useState(false);
  const [probabilitydata,setProbabilityData] = useState([]);

  const fetchPercentageType = async ()=>{
    const {data} = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type');
    setProbabilityData(data?.data)
  }

  useEffect(() => {  
    fetchPercentageType();
  }, []);

  const setProbabilityTypeData = async ()=>{
    const {data} = await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/probability-type',probabilityFormData);
    if(data?.message === 'Success' && data?.responseCode === 200){
      setIsOpen(false);
      fetchPercentageType();
    }
  }

  return (
    <div>
      <BaseComponent
        field="Probability Type"
        actionButtonName="Setup Probability"
        columns={["Probability Type Name", "Percentage"]}
        data={probabilitydata}
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
                  <label for="name">Probability Type Name</label>
                  <input type="text" id="probability-type-name" spellcheck="false" value={probabilityFormData?.probabilityTypeName} onChange={(e)=>{setProbabilityFormData({...probabilityFormData,probabilityTypeName:e.target.value})}} />
                </div>
                <div>
                  <label for="email">Percentage</label>
                  <input type="text" id="probability-percentage" spellcheck="false" value={probabilityFormData?.percentage} onChange={(e)=>{setProbabilityFormData({...probabilityFormData,percentage:parseInt(e.target.value)})}} />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={()=>{setProbabilityTypeData()}}
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
function Tr({ probabilityTypeName, percentage }) {
  return (
    <tr>
      <td>
        <span>{probabilityTypeName || "Unknown"}</span>
      </td>
      <td>
        <span>{percentage || "Unknown"}</span>
      </td>
    </tr>
  );
}
export default Probability;
