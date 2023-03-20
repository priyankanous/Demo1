import React, { useState, useEffect } from "react";
import { AiFillPlusSquare,AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading,ModalIcon } from "../NavigationMenu/Value";


function BuisnessUnit() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                return response.json();
            })
            .then((actualData) => {
                setData(actualData);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="table_container" >
            <div style={{ display: "inline-block", padding: "6px" }}>
                <h3>Administration - BU</h3>
                <button  style={{float:'right'}} class="button1" onClick={setIsOpen}><AiFillPlusSquare></AiFillPlusSquare> Setup SBU</button>
            </div>

            <table>
                <tr>
                    <th>Business Unit  Name</th>
                    <th>BuisnessUnit Display Name</th>
                    <th>Child Of Organization</th>
                </tr>
                <tbody>{data && data.map((obj, id) => <Tr {...obj} key={id} />)}</tbody>
            </table>

            <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={modalStyleObject}
            >
                <div>
                    <div class="main" className="ModalContainer">
                        <div class="register">
                            <ModalHeading>Setup Business Unit</ModalHeading>
                            <ModalIcon onClick={()=>{setIsOpen(false)}}><AiOutlineClose></AiOutlineClose></ModalIcon>
                            <hr color="#62bdb8"></hr>
                            <form id="reg-form">
                                <div>
                                    <label for="name">Business Unit Name</label>
                                    <input type="text" id="name" spellcheck="false" />
                                </div>
                                <div>
                                    <label for="email">BusinessUnit Display Name</label>
                                    <input type="text" id="email" spellcheck="false" />
                                </div>
                                <div>
                                    <label for="username">Child Of Organization</label>
                                    <input type="text" id="email" spellcheck="false" />
                                </div>
                                <div>
                                    <label>
                                    <input type="button" value="Save" id="create-account" class="button" />
                                        <input type="button" onClick={()=>{setIsOpen(false)}} value="Cancel" id="create-account" class="button" />

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

function Tr({ name, username, email }) {
    return (
        <tr>
            <td>
                <span>{name || "Unknown"}</span>
            </td>
            <td>
                <span>{username || "Unknown"}</span>
            </td>
            <td>
                <span>{email || "Unknown"}</span>
            </td>
        </tr>
    );
}


export default BuisnessUnit;