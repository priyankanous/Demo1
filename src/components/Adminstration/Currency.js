// import React, { useState, useEffect, useRef } from "react";
// import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
// import Modal from "react-modal";
// import { modalStyleObject } from "../../utils/constantsValue";
// import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
// import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
// import * as AiIcons from "react-icons/ai";

// function Currency() {
//   const [data, setData] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCurrency, setIsCurrency] = useState(true);

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/users`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((actualData) => {
//         setData(actualData);
//       });
//   }, []);
//   return (
//     <div>
//       <MemoizedBaseComponent
//         field="Currency"
//         actionButtonName="Setup Currency"
//         columns={["Currency", "Name", "Symbol", "Conversion Rate", ""]}
//         data={data}
//         Tr={Tr}
//         setIsOpen={setIsOpen}
//         currency={isCurrency}
//       />
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={() => setIsOpen(false)}
//         style={modalStyleObject}
//       >
//         <div>
//           <div class="main" className="ModalContainer">
//             <div class="register">
//               <ModalHeading>Setup Currency</ModalHeading>
//               <ModalIcon
//                 onClick={() => {
//                   setIsOpen(false);
//                 }}
//               >
//                 <AiOutlineClose></AiOutlineClose>
//               </ModalIcon>
//               <hr color="#62bdb8"></hr>
//               <form id="reg-form">
//                 <div>
//                   <label for="name">Currency</label>
//                   <input type="text" id="name" spellcheck="false" />
//                 </div>
//                 <div>
//                   <label for="email">Name</label>
//                   <input type="text" id="email" spellcheck="false" />
//                 </div>
//                 <div>
//                   <label for="username">Symbol</label>
//                   <input type="text" id="email" spellcheck="false" />
//                 </div>
//                 <div>
//                   <label for="username">Conversion Rate</label>
//                   <input type="text" id="email" spellcheck="false" />
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="button"
//                       value="Save"
//                       id="create-account"
//                       class="button"
//                     />
//                     <input
//                       type="button"
//                       onClick={() => {
//                         setIsOpen(false);
//                       }}
//                       value="Cancel"
//                       id="create-account"
//                       class="button"
//                     />
//                   </label>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// function Tr({ id, name, symbol, rate }) {
//   const [isDropdown, setDropdown] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [responseData, setResponseData] = useState({
//     id: id,
//     name: name,
//     symbol: symbol,
//     rate: rate,
//   });
//   const closeDropDown = (isopen) => {
//     isopen ? setDropdown(false) : setDropdown(true);
//   };
//   return (
//     <tr>
//       <td>
//         <span>{id || "Unknown"}</span>
//       </td>
//       <td>
//         <span>{name || "Unknown"}</span>
//       </td>
//       <td>
//         <span>{symbol || "Unknown"}</span>
//       </td>
//       <td>
//         <span>{rate || "Unknown"}</span>
//         <span style={{ float: "right" }}>
//           <AiIcons.AiOutlineMore
//             onClick={() => closeDropDown(isDropdown)}
//           ></AiIcons.AiOutlineMore>
//           {isDropdown && (
//             <div style={{ float: "right" }} class="dropdown-content">
//               <a style={{ padding: "5px" }}>
//                 <AiIcons.AiOutlineEdit
//                   onClick={() => {
//                     setIsOpen(true);
//                   }}
//                 />{" "}
//                 Edit
//               </a>
//               <a href="#about" style={{ padding: "5px" }}>
//                 <AiIcons.AiOutlineDelete /> Delete
//               </a>
//               <a href="#about" style={{ padding: "5px" }}>
//                 <AiIcons.AiOutlineCheckCircle /> Activate
//               </a>
//               <a href="#about" style={{ padding: "5px" }}>
//                 <AiIcons.AiOutlineCloseCircle /> Deactivate
//               </a>
//             </div>
//           )}{" "}
//         </span>
//       </td>
//       <Modal
//         isOpen={isOpen}
//         onRequestClose={() => setIsOpen(false)}
//         style={modalStyleObject}
//       >
//         <div>
//           <div class="main" className="ModalContainer">
//             <div class="register">
//               <ModalHeading>Setup Currency</ModalHeading>
//               <ModalIcon
//                 onClick={() => {
//                   setIsOpen(false);
//                 }}
//               >
//                 <AiOutlineClose></AiOutlineClose>
//               </ModalIcon>
//               <hr color="#62bdb8"></hr>
//               <form id="reg-form">
//                 <div>
//                   <label for="name">Currency</label>
//                   <input
//                     type="text"
//                     id="id"
//                     spellcheck="false"
//                     value={responseData.id}
//                   />
//                 </div>
//                 <div>
//                   <label for="email">Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     spellcheck="false"
//                     value={responseData.name}
//                     onChange={(e) =>
//                       setResponseData({ ...responseData, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label for="username">Symbol</label>
//                   <input
//                     type="text"
//                     id="symbol"
//                     spellcheck="false"
//                     value={responseData.symbol}
//                     onChange={(e) =>
//                       setResponseData({
//                         ...responseData,
//                         symbol: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label for="username">Conversion Rate</label>
//                   <input
//                     type="text"
//                     id="rate"
//                     spellcheck="false"
//                     value={responseData.rate}
//                     onChange={(e) =>
//                       setResponseData({ ...responseData, rate: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="button"
//                       value="Save"
//                       id="create-account"
//                       class="button"
//                     />
//                     <input
//                       type="button"
//                       onClick={() => {
//                         setIsOpen(false);
//                       }}
//                       value="Cancel"
//                       id="create-account"
//                       class="button"
//                     />
//                   </label>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </tr>
//   );
// }

// export default Currency;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
import * as AiIcons from "react-icons/ai";
function Currency() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrency, setIsCurrency] = useState(true);
  const [financialYearData, setFinancialYearData] = useState([]);

  useEffect(() => {
    getFinancialYearNameData();
  }, []);
  const getFinancialYearNameData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year`
      )
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setFinancialYearData(actualDataObject);
      });
  };
  return (
    <div>
      <MemoizedBaseComponent
        field="Currency"
        actionButtonName="Setup Currency"
        columns={["Currency", "Name", "Symbol", "Conversion Rate"]}
        data={data}
        Tr={Tr}
        setIsOpen={setIsOpen}
        currency={isCurrency}
        financialYearData={financialYearData}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Setup Currency</ModalHeading>
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
                  <label for="name">Currency</label>
                  <input type="text" id="name" spellcheck="false" />
                </div>
                <div>
                  <label for="email">Name</label>
                  <input type="text" id="email" spellcheck="false" />
                </div>
                <div>
                  <label for="username">Symbol</label>
                  <input type="text" id="email" spellcheck="false" />
                </div>
                <div>
                  <label for="username">Conversion Rate</label>
                  <input type="text" id="email" spellcheck="false" />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
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

function Tr({ id, name, symbol, rate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdown, setDropdown] = useState(false);
  const [responseData, setResponseData] = useState({
    id: id,
    name: name,
    symbol: symbol,
    rate: rate,
  });

  document.addEventListener("click", function handleClickOutsideBox(event) {
    // 👇️ the element the user clicked console.log('user clicked: ', event.target);
    const popup = document.getElementById("dropdown");
    if (!popup.contains(event.target)) {
      isDropdown ? setDropdown(false) : setDropdown(true);
    }
  });

  const closeDropDown = (isopen, id) => {
    isopen ? setDropdown(false) : setDropdown(true);
  };

  return (
    <tr>
      <td>
        <span>{id || "Unknown"}</span>
      </td>
      <td>
        <span>{name || "Unknown"}</span>
      </td>
      <td>
        <span>{symbol || "Unknown"}</span>
      </td>
      <td>
        <span>{rate || "Unknown"}</span>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={() => closeDropDown(isDropdown, id)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div
              style={{ float: "right" }}
              class="dropdown-content"
              id="dropdown"
            >
              <a style={{ padding: "5px" }}>
                <AiIcons.AiOutlineEdit
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />{" "}
                Edit
              </a>
              <a href="#about" style={{ padding: "5px" }}>
                <AiIcons.AiOutlineDelete /> Delete
              </a>
              <a href="#about" style={{ padding: "5px" }}>
                <AiIcons.AiOutlineCheckCircle /> Activate
              </a>
              <a href="#about" style={{ padding: "5px" }}>
                <AiIcons.AiOutlineCloseCircle /> Deactivate
              </a>
            </div>
          )}{" "}
        </span>
      </td>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Setup Currency</ModalHeading>
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
                  <label for="name">Currency</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.id}
                  />
                </div>
                <div>
                  <label for="email">Name</label>
                  <input
                    type="text"
                    id="name"
                    spellcheck="false"
                    value={responseData.name}
                    onChange={(e) =>
                      setResponseData({ ...responseData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label for="username">Symbol</label>
                  <input
                    type="text"
                    id="symbol"
                    spellcheck="false"
                    value={responseData.symbol}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        symbol: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label for="username">Conversion Rate</label>
                  <input
                    type="text"
                    id="rate"
                    spellcheck="false"
                    value={responseData.rate}
                    onChange={(e) =>
                      setResponseData({ ...responseData, rate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
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
    </tr>
  );
}

export default Currency;
