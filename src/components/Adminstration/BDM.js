import React, { useState, useEffect, useRef } from "react";
import { AiFillPlusSquare, AiOutlineClose } from "react-icons/ai";
import Modal, { defaultStyles } from "react-modal";
import { bdmStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";



function Bdm() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bdmFormData, setbdmFormData] = useState({ bdmName: "", bdmDisplayName: "", activeFrom: "", activeUntil: "" });
  const [isBusinessUnitLinked, setBusinessUnitLinked] = useState(false);
  const [isRegionLinked, setRegionLinked] = useState(false);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [region, setRegion] = useState([]);
  const [dropdownOpenBU, setdropdownOpenBU] = useState(false);
  const [dropdownOpenReg, setdropdownOpenReg] = useState(false);
  const [selectedBusinessUnit, setselectedBusinessUnit] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    const { bdmDisplayName, bdmName, activeFrom, activeUntil } = bdmFormData
    const activeFromDt = `${parseInt(new Date(activeFrom).getDate()) < 10 ? '0' + parseInt(new Date(activeFrom).getDate()) : parseInt(new Date(activeFrom).getDate())}/${month[new Date(activeFrom).getMonth()]}/${new Date(activeFrom).getFullYear()}`;
    const activeUntilDt = `${parseInt(new Date(activeUntil).getDate()) < 10 ? '0' + parseInt(new Date(activeUntil).getDate()) : parseInt(new Date(activeUntil).getDate())}/${month[new Date(activeUntil).getMonth()]}/${new Date(activeUntil).getFullYear()}`;
    let bdmFromData = { bdmDisplayName, bdmName, activeFrom: activeFromDt, activeUntil: activeUntilDt, businessUnits: selectedBusinessUnit, regions: selectedRegion };
    if(isEditId !== null){
      var {data} = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm/${isEditId}`,bdmFromData);
    }else{
      var {data} =  await axios.post('http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm', bdmFromData);
    }    
    if (data?.message === 'Success' && data?.responseCode === 200) {
      setIsOpen(false);
      setIsEditId(null);
      setBusinessUnitLinked(false);
      setRegionLinked(false);
      setselectedBusinessUnit([]);
      setSelectedRegion([]);
      setdropdownOpenBU(false);
      setdropdownOpenReg(false);
      fetchBdmData();
    }
  }

  const editBDMData = async (id) => {
    const { data } = await axios.get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm/${id}`);
    if (data?.data) {
      setbdmFormData({
        bdmName: data?.data?.bdmName,
        bdmDisplayName: data?.data?.bdmDisplayName,
        activeFrom: createDate(data?.data?.activeFrom),
        activeUntil: createDate(data?.data?.activeUntil)
      });
      setBusinessUnitLinked(data?.data?.businessUnits.length < 2 ? true : false);
      setRegionLinked(data?.data?.regions.length < 2 ? true : false);
      setselectedBusinessUnit(data?.data?.businessUnits);
      setSelectedRegion(data?.data?.regions);
      setIsOpen(true);
      setIsEditId(id);
    }
  }

  const createDate = (date) => {
    let splitDate = date.split('/');
    let monthDate = `${month.indexOf(splitDate[1]) + 1 < 10 ? '0' + String(month.indexOf(splitDate[1]) + 1) : month.indexOf(splitDate[1]) + 1}`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`
  }

  const selectMarkDropdown = (value, type) => {
    console.log(value);
    if (type === 'bu') {
      const indexOfSelectedValue = selectedBusinessUnit.findIndex((valueObj) => { return valueObj.businessUnitName === value?.businessUnitName });
      if (indexOfSelectedValue === -1) {
        if (isBusinessUnitLinked) {
          setselectedBusinessUnit([value])
        }
        else { setselectedBusinessUnit([...selectedBusinessUnit, value]) }
      } else {
        const arrayData = selectedBusinessUnit.filter((valueObj) => { return valueObj?.businessUnitName !== value?.businessUnitName });
        setselectedBusinessUnit(arrayData);
      }
    } else if (type === 'reg') {
      const indexOfSelectedValue = selectedRegion.findIndex((valueObj) => { return valueObj.regionName === value?.regionName });
      if (indexOfSelectedValue === -1) {
        if (isRegionLinked) {
          setSelectedRegion([value])
        }
        else { setSelectedRegion([...selectedRegion, value]) }
      } else {
        const arrayData = selectedRegion.filter((valueObj) => { return valueObj?.regionName !== value?.regionName });
        setSelectedRegion(arrayData);
      }
    }
  }

  const checkElementInArray = (value, type) => {
    if (type === 'bu') {
      if (selectedBusinessUnit.findIndex((valueObj) => { return valueObj.businessUnitName === value?.businessUnitName }) === -1) {
        return false;
      }
    } else if (type === 'reg') {
      if (selectedRegion.findIndex((valueObj) => { return valueObj.regionName === value?.regionName }) === -1) {
        return false;
      }
    }
    return true;
  }

  const activateDeactivate = async (id) => {
    const { data } = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/bdm/activate-or-deactivate/${id}`);
    if (data?.message === 'Success' && data?.responseCode === 200) {
      setIsOpen(false);
      setBusinessUnitLinked(false);
      setRegionLinked(false);
      setselectedBusinessUnit([]);
      setSelectedRegion([]);
      setdropdownOpenBU(false);
      setdropdownOpenReg(false);
      fetchBdmData();
    }
  }

  return (
    <div>
      <MemoizedBaseComponent
        field="BDM"
        actionButtonName="Setup BDM"
        columns={["BDM Name", "BDM Display Name", "Active From", "Active Until", "Linked BU", "Linked Region", " "]}
        data={data}
        Tr={(obj) => { return <Tr data={obj} editBDMData={editBDMData} activateDeactivate={activateDeactivate} /> }}
        setIsOpen={setIsOpen}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={bdmStyleObject}
        className={'modal-container'}
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
              <form id="bdm-form">
                <div >
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
                  <label className="label-bdm"><input onClick={() => { setBusinessUnitLinked(!isBusinessUnitLinked); setselectedBusinessUnit([]); setdropdownOpenBU(false) }} className={`label-bdm-input ${isBusinessUnitLinked && 'checkit'}`} type='checkbox' /><span style={{ verticalAlign: "middle", fontSize: '0.8rem' }}>Is Linked to BU</span></label>
                  <div class="container">
                    <div onClick={() => { setdropdownOpenBU(!dropdownOpenBU); }} style={{ position: 'sticky', top: '0' }} className={`select-btn ${dropdownOpenBU && 'open'}`}>
                      <span class="btn-text">Select Business Unit</span>
                      <span class="arrow-dwn">
                        <i class="fa-solid fa-chevron-down"><AiIcons.AiOutlineCaretUp></AiIcons.AiOutlineCaretUp></i>
                      </span>
                    </div>

                    <ul style={{ overflowY: 'auto', height: '200px', width: '90%' }} className={`list-items ${dropdownOpenBU && 'open-list-items'}`}>
                      {businessUnit && businessUnit.map((value, index) => {
                        return <li onClick={() => { selectMarkDropdown(value, 'bu') }} key={index} class={`item ${checkElementInArray(value, 'bu') && 'checked'}`}>
                          <span style={{ borderRadius: isBusinessUnitLinked && '50%' }} class="checkbox">
                            {!isBusinessUnitLinked && <i class="fa-solid fa-check check-icon"><AiIcons.AiOutlineCheck /></i>}
                          </span>
                          <span class="item-text">{value?.businessUnitName}</span>
                        </li>
                      })}
                    </ul>
                  </div>
                </div>
                <div>
                  <label className="label-bdm"><input onClick={() => { setRegionLinked(!isRegionLinked); setSelectedRegion([]); setdropdownOpenReg(false) }} className={`label-bdm-input ${isRegionLinked && 'checkit'}`} type='checkbox' /><span style={{ verticalAlign: "middle", fontSize: '0.8rem' }}>Is Linked to Region</span></label>
                  <div class="container">
                    <div onClick={() => { setdropdownOpenReg(!dropdownOpenReg); }} style={{ position: 'sticky', top: '0' }} class="select-btn" className={`select-btn ${dropdownOpenReg && 'open'}`}>
                      <span class="btn-text">Select Region</span>
                      <span class="arrow-dwn">
                        <i class="fa-solid fa-chevron-down"><AiIcons.AiOutlineCaretUp></AiIcons.AiOutlineCaretUp></i>
                      </span>
                    </div>

                    <ul style={{ overflowY: 'auto', height: '200px', width: "90%" }} class="list-items open-list-items" className={`list-items ${dropdownOpenReg && 'open-list-items'}`}>
                      {region && region.map((value, index) => {
                        return <li onClick={() => { selectMarkDropdown(value, 'reg') }} key={index} class={`item ${checkElementInArray(value, 'reg') && 'checked'}`}>
                          <span style={{ borderRadius: isRegionLinked && '50%' }} class="checkbox">
                            {!isRegionLinked && <i class="fa-solid fa-check check-icon"><AiIcons.AiOutlineCheck /></i>}
                          </span>
                          <span class="item-text">{value?.regionName}</span>
                        </li>
                      })}
                    </ul>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'flex', flexDirection: "row", justifyContent: "center" }}>
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
          </div>
        </div>
      </Modal>
    </div>
  );
}
function Tr({ data: { isActive, bdmName, bdmDisplayName, activeFrom, activeUntil, businessUnits, regions, bdmId }, activateDeactivate, editBDMData }) {
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
      <td className={!isActive && "disable-table-row"}>
        <span>{bdmName || "Unknown"}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{bdmDisplayName || "Unknown"}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{activeFrom}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{activeUntil}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{businessUnits && businessUnits.map(_ => _.businessUnitDisplayName).join(', ') || 'Unknown'}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{regions && regions.map(_ => _.regionDisplayName).join(', ') || 'Unknown'}</span>
      </td>
      <td>
        <span style={{ float: 'right' }} ><AiIcons.AiOutlineMore onClick={(e) => closeDropDown(isDropdown)}></AiIcons.AiOutlineMore>
          {isDropdown && <div style={{ float: 'right' }} class="dropdown-content">
            <a style={{ padding: '5px' }} onClick={() => { editBDMData(bdmId) }}><AiIcons.AiOutlineEdit onClick={() => { setIsOpen(true); }} /> Edit</a>
            <a onClick={() => { activateDeactivate(bdmId) }} className={isActive && "disable-table-row"} style={{ padding: '5px' }}><AiIcons.AiOutlineCheckCircle /> Activate</a>
            <a onClick={() => { activateDeactivate(bdmId) }} className={!isActive && "disable-table-row"} style={{ padding: '5px' }}><AiIcons.AiOutlineCloseCircle /> Deactivate</a>
          </div>} </span>
      </td>
    </tr>
  );
}
export default Bdm;

