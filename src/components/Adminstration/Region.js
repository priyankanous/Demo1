import React, { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import ReactModal from 'react-modal';

function Region() {

    const [data, setData] = useState(null);
    const [setLoading] = useState(true);
    const [setError] = useState(null);
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
        <div>
            <table><td><b>Administration - Region</b></td><td></td>
                <td><button class="button" onClick={setIsOpen}><AiFillPlusSquare></AiFillPlusSquare> Setup Region</button></td>
            </table>
            <table>
                <tr>
                    <th>Region Name</th>
                    <th>Region Display Name</th>
                </tr>
                <tbody>{data && data.map((obj, id) => <Tr {...obj} key={id} />)}</tbody>
            </table>
            <ReactModal
                isOpen={isOpen}
                contentLabel="Example Modal"
                onRequestClose={() => setIsOpen(false)}
                className="Modal"
                overlayClassName="Overlay"
            >
                <div>
                    <div class="main" className="ModalContainer">
                        <div class="register">
                            <h3>Setup Region</h3>
                            <hr color="#62bdb8"></hr>
                            <form id="reg-form">
                                <div>
                                    <label for="name">Region Name</label>
                                    <input type="text" id="name" spellcheck="false" />
                                </div>
                                <div>
                                    <label for="email">Region Display Name</label>
                                    <input type="text" id="email" spellcheck="false" />
                                </div>
                                <div>
                                    <label>
                                        <input type="button" value="Save" id="create-account" class="button" />
                                        <input type="button" onClick={()=>{console.log('in here');setIsOpen(false)}} value="Cancel" id="create-account" class="button" />
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ReactModal>
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
        </tr>
    );
}


export default Region;