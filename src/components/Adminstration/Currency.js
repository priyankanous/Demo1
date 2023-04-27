import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import * as AiIcons from "react-icons/ai";
import { async } from "q";
function Currency() {
  const [data, setData] = useState({
    actualDataObject: [],
    financialYearData: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrency, setIsCurrency] = useState(true);
  const [financialYearData, setFinancialYearData] = useState([]);
  const [currencyData, setCurrencyData] = useState({
    currency: "",
    name: "",
    conversionRate: "",
    symbol: "",
    financialYear: {
      financialYearId: "",
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
  });

  useEffect(() => {
    getFinancialYearNameData();
  }, []);
  const getAllCurrency = async (e) => {
    console.log("in the getALLGlobalLLF", e);
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency/financial-year/${e}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData({ ...data, actualDataObject: actualDataObject });
      });
  };

  const getFinancialYearNameData = async () => {
    console.log("in financial year data");
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year`
      )
      .then((response) => {
        console.log("This is axios resp", response);
        const actualDataObject = response.data.data;
        setData({ ...data, financialYearData: actualDataObject });
        setFinancialYearData(actualDataObject);
      });
  };
  const AddDataToCurrency = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/currency",
        currencyData
      );
      setIsOpen(false);
    } catch {}
  };
  return (
    <div>
      <MemoizedBaseComponent
        field="Currency"
        columns={["Currency", "Name", "Symbol", "Conversion Rate"]}
        data={data}
        Tr={Tr}
        setIsOpen={setIsOpen}
        currency={isCurrency}
        financialYearData={financialYearData}
        getAllCurrency={getAllCurrency}
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
                  <label for="name">Financial Year</label>
                  <select
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      const selectedFyId =
                        e.target.selectedOptions[0].getAttribute("data-fyId");
                      const selectedfyDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-fyDispName"
                        );
                      const selectedFyStartingFrom =
                        e.target.selectedOptions[0].getAttribute(
                          "data-fyStartingFrom"
                        );
                      const selectedfyEndingOn =
                        e.target.selectedOptions[0].getAttribute(
                          "data-fyEndingOn"
                        );
                      setCurrencyData({
                        ...currencyData,
                        financialYear: {
                          ...currencyData.financialYear,
                          financialYearId: selectedFyId,
                          financialYearName: e.target.value,
                          financialYearCustomName: selectedfyDispName,
                          startingFrom: selectedFyStartingFrom,
                          endingOn: selectedfyEndingOn,
                        },
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {financialYearData.map((fyData, index) => {
                      const fyNameData = fyData.financialYearName;
                      const fyId = fyData.financialYearId;
                      const fyDispName = fyData.financialYearCustomName;
                      const fyStartingFrom = fyData.startingFrom;
                      const fyEndingOn = fyData.endingOn;
                      return (
                        <option
                          data-fyId={fyId}
                          data-fyDispName={fyDispName}
                          data-fyStartingFrom={fyStartingFrom}
                          data-fyEndingOn={fyEndingOn}
                          key={index}
                        >
                          {fyNameData}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label for="name">Currency</label>
                  <input
                    type="text"
                    id="name"
                    spellcheck="false"
                    onChange={(e) => {
                      setCurrencyData({
                        ...currencyData,
                        currency: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCurrencyData({
                        ...currencyData,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="username">Symbol</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCurrencyData({
                        ...currencyData,
                        symbol: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="username">Conversion Rate</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCurrencyData({
                        ...currencyData,
                        conversionRate: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={AddDataToCurrency}
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
              {/* <a href="#about" style={{ padding: "5px" }}>
                <AiIcons.AiOutlineDelete /> Delete
              </a> */}
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
