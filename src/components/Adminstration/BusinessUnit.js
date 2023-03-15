import React, { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import Modal from 'react-modal';



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
        <div class="div">
            <table><td><b>Administration - BU</b></td><td></td>
                <td><button class="button" onClick={setIsOpen}><AiFillPlusSquare></AiFillPlusSquare> Setup SBU</button></td>
            </table>
            <table>
                <tr>
                    <th>BusinessUnitName</th>
                    <th>BuisnessUnit DisplayName</th>
                    <th>ChildOfOrganization</th>
                </tr>
                <tbody>{data && data.map((obj, id) => <Tr {...obj} key={id} />)}</tbody>
            </table>
            <Modal
                isOpen={isOpen}
                contentLabel="Example Modal"
                onRequestClose={() => setIsOpen(false)}
                style={
                    {
                        overlay: { backgroundColor: 'rgb(0,0,0)', backgroundColor: 'rgba(0,0,0,0.2)' },
                        content: {
                            position:'absolute',
                            top:'20%',
                            left:'40%',
                            border: 'none',
                            overflow: 'auto',                            
                            outline: 'none',
                            padding: '20px',
                            width:'max-content',
                            margin:'0',
                            height:'max-content',
                            background:'none'
                        }
                    }
                }

            >
                <div>
                    <div class="main" className="ModalContainer">
                        <div class="register">
                            <h3>Setup Business Unit</h3>
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
                                        <input type="button" onClick={()=>{setIsOpen(false)}} value="Save" id="create-account" class="button" />
                                        <input type="button" onClick={()=>{setIsOpen(false)}} value="Cancel" id="create-account" class="button" />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <h2>TITLE HERE</h2> */}
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