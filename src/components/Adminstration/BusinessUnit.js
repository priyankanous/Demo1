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
        <div className="table_container" >
            <div style={{ display: "inline-block", padding: "6px" }}>
                <h3>Administration - BU</h3>
                <button class="button1" onClick={setIsOpen}><AiFillPlusSquare></AiFillPlusSquare> Setup SBU</button>
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
                contentLabel="Example Modal"
                onRequestClose={() => setIsOpen(false)}
                style={
                    {
                        overlay: { backgroundColor: 'rgb(0,0,0)', backgroundColor: 'rgba(0,0,0,0.2)' },
                        content: {
                            position: 'absolute',
                            top: '20%',
                            left: '40%',
                            border: 'none',
                            overflow: 'auto',
                            outline: 'none',
                            padding: '20px',
                            width: 'max-content',
                            margin: '0',
                            height: 'max-content',
                            background: 'none'
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
                                        <input type="submit" value="Save" id="create-account" class="button" />
                                        <input type="submit" value="Cancel" id="create-account" class="button" />
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