import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { bdmStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
import * as AiIcons from "react-icons/ai";
import axios from "axios";

function SbuHead() {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [sbuNameData, setSbuNameData] = useState([]);
    const [sbuHeadName, setSbuHeadName] = useState(null);
    const [sbuHeadDisplayName, setSbuHeadDisplayName] = useState(null);
    const [activeForm, setActiveForm] = useState(null);
    const [activeUntil, setActiveUntil] = useState(null);
    const [sbuName, setSbuName] = useState(null);
    const [isEditId, setIsEditId] = useState(null);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const fetchSbuDetails = async () => {
        const data = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbu');
        setSbuNameData(data?.data?.data)
    }

    const fetchSbuHeadData = async () => {
        fetchSbuDetails();
        const data = await axios.get('http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead');
        setData(data?.data?.data);
    }

    useEffect(() => {
        fetchSbuHeadData();
    }, [])

    const setSbuHeadData = async () => {
        const activeFromDt = `${parseInt(new Date(activeForm).getDate()) < 10 ? '0' + parseInt(new Date(activeForm).getDate()) : parseInt(new Date(activeForm).getDate())}/${month[new Date(activeForm).getMonth()]}/${new Date(activeForm).getFullYear()}`;
        const activeUntilDt = `${parseInt(new Date(activeUntil).getDate()) < 10 ? '0' + parseInt(new Date(activeUntil).getDate()) : parseInt(new Date(activeUntil).getDate())}/${month[new Date(activeUntil).getMonth()]}/${new Date(activeUntil).getFullYear()}`;
        const postSbuHeadData = {
            sbuHeadName,
            sbuHeadDisplayName,
            strategicBusinessUnit:sbuName,
            activeFrom: activeFromDt,
            activeUntil: activeUntilDt,
            sbuHeadId: 0,
        }
        if (isEditId !== null) {
            var { data } = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/${isEditId}`, postSbuHeadData);
        } else {
            var { data } = await axios.post(
                "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead",
                postSbuHeadData
            );
        }
        if (data?.message === 'Success' && data?.responseCode === 200) {
            setIsOpen(false);
            fetchSbuHeadData();
        }
    }

    const openTheModalWithValues = async (e, id) => { 
        const { data } = await axios.get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/${id}`);
        if (data?.message === 'Success' && data?.responseCode === 200) {
            setSbuHeadName(data?.data?.sbuHeadName);
            setSbuName(data?.data?.strategicBusinessUnit);
            setSbuHeadDisplayName(data?.data?.sbuHeadDisplayName);
            setActiveForm(createDate(data?.data?.activeFrom));
            setActiveUntil(createDate(data?.data?.activeUntil));
            setIsOpen(true);
            setIsEditId(id);
        }
    }

    const createDate = (date) => {
        let splitDate = date.split('/');
        let monthDate = `${month.indexOf(splitDate[1]) + 1 < 10 ? '0' + String(month.indexOf(splitDate[1]) + 1) : month.indexOf(splitDate[1]) + 1}`;
        return `${splitDate[2]}-${monthDate}-${splitDate[0]}`
    }

    const deleteSelectedLocation = async (id) => {
        const { data } = await axios.delete(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/${id}`);
        if (data?.message === 'Success' && data?.responseCode === 200) {
            resetStateAndData();
        }
    }

    const activeDeactivateTableData = async (id) => {
        const { data } = await axios.put(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead/activate-or-deactivate/${id}`);
        if (data?.message === 'Success' && data?.responseCode === 200) {
            resetStateAndData();
        }
    }

    const resetStateAndData = () => {
        setIsOpen(false);
        fetchSbuHeadData();
        setIsEditId(null);
        setSbuHeadName(null);
        setSbuName(null);
        setSbuHeadDisplayName(null);
        setActiveForm(null);
        setActiveUntil(null);
    }

    return (
        <div>
            <MemoizedBaseComponent
                field="SBU Head"
                actionButtonName="Setup SBU Head"
                columns={[
                    "Name",
                    "Display Name",
                    "SBU Name",
                    "Active From",
                    "Active Untill",
                    " "
                ]}
                data={data}
                Tr={(obj) => { return <Tr activeDeactivateTableData={activeDeactivateTableData} openTheModalWithValues={openTheModalWithValues} deleteSelectedLocation={deleteSelectedLocation} data={obj} /> }}
                setIsOpen={setIsOpen}
            />
            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={bdmStyleObject}
                className='modal-container'
            >
                <div>
                    <div class="main" className="ModalContainer">
                        <div class="register">
                            <ModalHeading>Setup SBU Head</ModalHeading>
                            <ModalIcon
                                onClick={() => {
                                    resetStateAndData();
                                }}
                            >
                                <AiOutlineClose></AiOutlineClose>
                            </ModalIcon>
                            <hr color="#62bdb8"></hr>
                            <form id="reg-form">
                                <div>
                                    <label for="name">Name</label>
                                    <input type="text" id="name" spellcheck="false"
                                        onChange={(e) => {
                                            setSbuHeadName(e.target.value);
                                        }}
                                        value={sbuHeadName}
                                    />
                                </div>
                                <div>
                                    <label for="email">Display Name</label>
                                    <input type="text" id="email" spellcheck="false"
                                        onChange={(e) => {
                                            setSbuHeadDisplayName(e.target.value);
                                        }}
                                        value={sbuHeadDisplayName}
                                    />
                                </div>
                                <div>
                                    <label for="email">SBU Name</label>
                                    <select
                                    style={{width:"100%"}}
                                        onChange={(e) => {
                                            const sbuSelected = JSON.parse(e.target.value);
                                            setSbuName(sbuSelected);
                                        }}
                                    >
                                        <option value="" disabled selected={sbuName === null && true} hidden >Please choose one option</option>
                                        {sbuNameData?.map((sbuData, index) => {
                                            const sbuNameData = sbuData.sbuName;
                                            return <option value={JSON.stringify(sbuData)} selected={sbuNameData === sbuName} key={index}>{sbuNameData}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label for="email">Active From</label>
                                    <input type="date" id="email" spellcheck="false"
                                        onChange={(e) => {
                                            setActiveForm(e.target.value);
                                        }}
                                        value={activeForm}
                                    />
                                </div>
                                <div>
                                    <label for="email">Active Untill</label>
                                    <input type="date" id="email" spellcheck="false"
                                        onChange={(e) => {
                                            setActiveUntil(e.target.value);
                                        }}
                                        value={activeUntil}
                                    />
                                </div>
                                <div>
                                    <label>
                                        <input
                                            type="button"
                                            value="Save"
                                            id="create-account"
                                            class="button"
                                            onClick={() => { setSbuHeadData() }}
                                        />
                                        <input
                                            type="button"
                                            onClick={() => {
                                                resetStateAndData();
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

function Tr({ data: { sbuHeadName, sbuHeadDisplayName, strategicBusinessUnit:{sbuName}, activeFrom, activeUntil, isActive, sbuHeadId }, activeDeactivateTableData, openTheModalWithValues, deleteSelectedLocation }) {
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
            <td className={!isActive && 'disable-table-row'}>
                <span>{sbuHeadName || "Unknown"}</span>
            </td>
            <td className={!isActive && 'disable-table-row'}>
                <span>{sbuHeadDisplayName || "Unknown"}</span>
            </td>
            <td className={!isActive && 'disable-table-row'}>
                <span>{sbuName || "Unknown"}</span>
            </td>
            <td className={!isActive && 'disable-table-row'}>
                <span>{activeFrom || "Unknown"}</span>
            </td>
            <td className={!isActive && 'disable-table-row'}>
                <span>{activeUntil || "Unknown"}</span>
            </td>
            <td data-id={sbuHeadId}>
                <span style={{ float: "right" }}>
                    <AiIcons.AiOutlineMore
                        onClick={(e) => closeDropDown(isDropdown)}
                    ></AiIcons.AiOutlineMore>
                    {isDropdown && (
                        <div style={{ float: "right" }} class="dropdown-content">
                            <a onClick={(e) => { openTheModalWithValues(e, sbuHeadId) }} style={{ padding: "5px" }}>
                                <AiIcons.AiOutlineEdit
                                />{" "}
                                Edit
                            </a>
                            <a onClick={() => { deleteSelectedLocation(sbuHeadId) }} href="#about" style={{ padding: "5px" }}>
                                <AiIcons.AiOutlineDelete /> Delete
                            </a>
                            <a className={isActive && 'disable-table-row'} onClick={() => { activeDeactivateTableData(sbuHeadId) }} style={{ padding: "5px" }}>
                                <AiIcons.AiOutlineCheckCircle /> Activate
                            </a>
                            <a className={!isActive && 'disable-table-row'} onClick={() => { activeDeactivateTableData(sbuHeadId) }} style={{ padding: "5px" }}>
                                <AiIcons.AiOutlineCloseCircle /> Deactivate
                            </a>
                        </div>
                    )}{" "}
                </span>
            </td>
        </tr>
    );
}

export default SbuHead
