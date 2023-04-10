import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function FinancialYear() {
  const [financialYear, setfinancialYear] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [financialYearFormData,setfinancialYearFormData] = useState({financialYearName:"",financialYearCustomName:"",startingFrom:"",endingOn:""})


  const fetchFinancialYearData = async ()=>{
    const {data} = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year');
    setfinancialYear(data?.data)
  }

  useEffect(() => {  
    fetchFinancialYearData();
  }, []);

  const setFinancialYearData = async ()=>{
    const financialYearFormDataFinal = {...financialYearFormData,startingFrom:financialYearFormData?.startingFrom.split('-').reverse().join('/'),endingOn:financialYearFormData?.endingOn.split('-').reverse().join('/')};
    console.log(financialYearFormDataFinal);
    const {data} = await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year',financialYearFormDataFinal);
    if(data?.message === 'Success' && data?.responseCode === 200){
      setIsOpen(false);
      fetchFinancialYearData();
    }
  }

  return (
    <div>
      <BaseComponent
        field="Financial Year"
        actionButtonName="Setup Financial yearr"
        columns={[
          "Name",
          "Custom name",
          "Starting on",
          "Ending on",
          " "
        ]}
        data={financialYear}
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
                  <label for="name">Name</label>
                  <input type="text" id="financial-year-name" value={financialYearFormData?.financialYearName} onChange={(e)=>{setfinancialYearFormData({...financialYearFormData,financialYearName:e.target.value})}} />
                </div>
                <div>
                  <label for="email">Custom name</label>
                  <input type="text" id="financial-year-custom-name" value={financialYearFormData?.financialYearCustomName} onChange={(e)=>{setfinancialYearFormData({...financialYearFormData,financialYearCustomName:e.target.value})}} />
                </div>
                <div>
                  <label for="email">Starting on</label>
                  <input type="date"  id="financial-year-starting-date"  value={financialYearFormData?.startingFrom} onChange={(e)=>{setfinancialYearFormData({...financialYearFormData,startingFrom:e.target.value})}} />
                </div>
                <div>
                  <label for="email">Ending on</label>
                  <input type="date" id="financial-year-ending-date" value={financialYearFormData?.endingOn} onChange={(e)=>{setfinancialYearFormData({...financialYearFormData,endingOn:e.target.value})}}/>
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={()=>{setFinancialYearData()}}
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

function Tr({ financialYearName, financialYearCustomName, startingFrom, endingOn }) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const closeDropDown = (isopen) => {
    isopen  ? setDropdown(false) : setDropdown(true)
  };
  return (
    <tr>
      <td>
        <span>{financialYearName || "Unknown"}</span>
      </td>
      <td>
        <span>{financialYearCustomName || "Unknown"}</span>
      </td>
      <td>
        <span>{startingFrom || "Unknown"}</span>
      </td>
      <td>
        <span>{endingOn || "Unknown"}</span>
      </td>
      <td>
      <span style={{float:'right'}} ><AiIcons.AiOutlineMore  onClick={(e)=>closeDropDown(isDropdown)}></AiIcons.AiOutlineMore>
        {isDropdown && <div style={{float:'right'}} class="dropdown-content">
                        <a style={{padding:'5px'}}><AiIcons.AiOutlineEdit onClick={() => {setIsOpen(true); }} /> Edit</a>
                        <a href="#about" style={{padding:'5px'}}><AiIcons.AiOutlineDelete/> Delete</a>
                        <a href="#about" style={{padding:'5px'}}><AiIcons.AiOutlineCheckCircle/> Activate</a>
                        <a href="#about" style={{padding:'5px'}}><AiIcons.AiOutlineCloseCircle/> Deactivate</a>
                    </div>} </span> 
      </td>
    </tr>
  );
}

export default FinancialYear;
