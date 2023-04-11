import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function GlobalLeaveLossFactor() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGlobalLeave] = useState(true);
  const [month, setMonth] = useState(null);
  const [onSite, setOnSite] = useState(null);
  const [offShore, setOffShore] = useState(null);
  const [financialYear, setFinancialYear] = useState(null);
  const [financialYearData, setFinancialYearData] = useState([]);

  useEffect(() => {
    getFinancialYearNameData();
  }, []);

  const getAllGlobalLLF = async (e) => {
    console.log("in the getALLGlobalLLF");
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${e}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const AddDataToGlobalLLF = async (e) => {
    const post = {
      month: month,
      onSite: onSite,
      offShore: offShore,
      financialYear: financialYear,
    };

    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor",
        post
      );
      setIsOpen(false);
    } catch {}
  };
  const getFinancialYearNameData = async () => {
    await axios
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
      <BaseComponent
        field="Global Leave Loss Factor"
        actionButtonName="Setup Global Leave Loss Factor"
        columns={["#", "Month", "Offshore", "Onshore"]}
        data={data}
        Tr={(obj) => {
          return <Tr data={obj} setFinancialYearData={setFinancialYearData} />;
        }}
        setIsOpen={setIsOpen}
        globalLeave={isGlobalLeave}
        financialYearData={financialYearData}
        getAllGlobalLLF={getAllGlobalLLF}
      />

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Setup Leave Loss Factor for a Month</ModalHeading>
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
                    onChange={(e) => {
                      setFinancialYear(e.target.value);
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {financialYearData.map((fyData, index) => {
                      const fyNameData = fyData.financialYearName;
                      return <option key={index}>{fyNameData}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label for="email">Month</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setMonth(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label for="email">OnSite</label>
                  <input
                    type="number"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setOnSite(e.target.value);
                    }}
                  />{" "}
                  %
                </div>
                <div>
                  <label for="email">OffShore</label>
                  <input
                    type="number"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setOffShore(e.target.value);
                    }}
                  />{" "}
                  %
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={AddDataToGlobalLLF}
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

function Tr({
  setFinancialYearData,
  data: { leaveLossFactorId, month, onSite, offShore, financialYear },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    leaveLossFactorId: leaveLossFactorId,
    month: month,
    onSite: onSite,
    offShore: offShore,
    financialYear: financialYear,
  });
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

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/${leaveLossFactorId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setFinancialYearData(actualDataObject);
        setIsOpen(false);
      });
  };

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };
  return (
    <tr ref={wrapperRef}>
      <td>
        <span>{leaveLossFactorId || "Unknown"}</span>
      </td>
      <td>
        <span>{month || "Unknown"}</span>
      </td>
      <td>
        <span>{offShore || "Unknown"}</span>
      </td>
      <td>
        <span>{onSite || "Unknown"}</span>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => {
              closeDropDown();
            }}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right" }} class="dropdown-content">
              <a
                style={{ padding: "5px" }}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <AiIcons.AiOutlineEdit />
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
          )}
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
              <ModalHeading>Edit Global Leave loss Factor</ModalHeading>
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
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.financialYear}
                  />
                </div>
                <div>
                  <label for="name">#</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.leaveLossFactorId}
                  />
                </div>
                <div>
                  <label for="email">Months</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={responseData.month}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        month: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label for="email">OffShore</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={responseData.offShore}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        offShore: e.target.value,
                      })
                    }
                  />{" "}
                  %
                </div>
                <div>
                  <label for="email">OnSite</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={responseData.onSite}
                    onChange={(e) =>
                      setResponseData({
                        ...responseData,
                        onSite: e.target.value,
                      })
                    }
                  />
                  %
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={OnSubmit}
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

export default GlobalLeaveLossFactor;
