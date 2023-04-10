import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
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

        const activeFromDt = `${parseInt(new Date(activeForm).getDate()) < 10 ? '0'+parseInt(new Date(activeForm).getDate()) : parseInt(new Date(activeForm).getDate()) }/${month[new Date(activeForm).getMonth()]}/${new Date(activeForm).getFullYear()}`;
        const activeUntilDt = `${parseInt(new Date(activeUntil).getDate()) < 10 ? '0'+parseInt(new Date(activeUntil).getDate()) : parseInt(new Date(activeUntil).getDate()) }/${month[new Date(activeUntil).getMonth()]}/${new Date(activeUntil).getFullYear()}`;
        const postSbuHeadData = {
            sbuHeadName,
            sbuHeadDisplayName,
            sbuName,
            activeFrom: activeFromDt,
            activeUntil: activeUntilDt,
        }
        console.log(postSbuHeadData);
        const { data } = await axios.post(
            "http://192.168.16.55:8080/rollingrevenuereport/api/v1/sbuhead",
            postSbuHeadData
        );
        // if (data?.message === 'Success' && data?.responseCode === 200) {
        //     setIsOpen(false);
        //     fetchSbuHeadData();
        // }
    }

    return (
        <div>
            <BaseComponent
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
                            <ModalHeading>Setup SBU Head</ModalHeading>
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
                                        onChange={(e) => {
                                            setSbuName(e.target.value);
                                        }}
                                    >
                                        <option value="" disabled selected hidden >Please choose one option</option>
                                        {sbuNameData?.map((sbuData, index) => {
                                            const sbuNameData = sbuData.sbuName;
                                            return <option key={index}>{sbuNameData}</option>
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

function Tr({ data: { sbuHeadName, sbuHeadDisplayName, sbuName, activeFrom, activeUntil } }) {
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
                <span>{sbuHeadName || "Unknown"}</span>
            </td>
            <td>
                <span>{sbuHeadDisplayName || "Unknown"}</span>
            </td>
            <td>
                <span>{sbuName || "Unknown"}</span>
            </td>
            <td>
                <span>{activeFrom || "Unknown"}</span>
            </td>
            <td>
                <span>{activeUntil || "Unknown"}</span>
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

export default SbuHead