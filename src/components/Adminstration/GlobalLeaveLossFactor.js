import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { bdmStyleObject, modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function GlobalLeaveLossFactor() {
  const [data, setData] = useState({
    actualDataObject: [],
    financialYearData: [],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isGlobalLeave] = useState(true);
  const [globalLeaveLossFactorData, setGlobalLeaveLoseFactorData] = useState({
    month: "",
    onSite: "",
    offShore: "",
    financialYear: {
      financialYearId: "",
      financialYearName: "",
      financialYearCustomName: "",
      startingFrom: "",
      endingOn: "",
    },
  });
  const [financialYearData, setFinancialYearData] = useState([]);

  useEffect(() => {
    getFinancialYearNameData();
  }, []);

  const getAllGlobalLLF = async (e) => {
    console.log("in the getALLGlobalLLF", e);
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${e}`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData({ ...data, actualDataObject: actualDataObject });
      });
  };
  const AddDataToGlobalLLF = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor",
        globalLeaveLossFactorData
      );
      setIsOpen(false);
    } catch {}
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
  const openTheModalWithValues = async (e, id) => {
    console.log(id, "HERE");
    await axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${id}`
      )
      .then((response) => {
        console.log("In the open modal", response);
        response.data.data.map((editData, index) => {
          console.log("this is month", editData.month);
          setGlobalLeaveLoseFactorData({
            ...globalLeaveLossFactorData,
            month: editData.month,
            onSite: editData.onSite,
            offShore: editData.onSite,
            financialYear: {
              ...globalLeaveLossFactorData,
              financialYearId: editData.financialYear.financialYearId,
              financialYearName: editData.financialYear.financialYearName,
              financialYearCustomName:
                editData.financialYear.financialYearCustomName,
              startingFrom: editData.financialYear.startingFrom,
              endingOn: editData.financialYear.endingOn,
            },
          });
        });
      });
    setIsOpen(true);
  };

  const copyFromFyToNewFy = async (copyData) => {
    console.log("in copy functionn first", copyData);

    const response = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/financial-year/${copyData.copyFromFy}`
    );

    const actualDataObject = response.data.data;
    const array = [];
    actualDataObject.map((copiedData, index) => {
      array.push({
        ...globalLeaveLossFactorData,
        month: copiedData.month,
        offShore: copiedData.offShore,
        onSite: copiedData.onSite,
        financialYear: {
          ...globalLeaveLossFactorData.financialYear,
          financialYearName: copyData.copyToFy.financialYearName,
          financialYearId: copyData.copyToFy.financialYearId,
          financialYearCustomName: copyData.copyToFy.financialYearCustomName,
          startingFrom: copyData.copyToFy.startingFrom,
          endingOn: copyData.copyToFy.endingOn,
        },
      });
    });

    const resOfPOST = await axios.post(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/leave-loss-factor/save-all",
      array
    );
  };
  return (
    <div>
      <MemoizedBaseComponent
        field="Global Leave Loss Factor"
        columns={["#", "Month", "Offshore", "Onshore"]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              setFinancialYearData={setFinancialYearData}
              openTheModalWithValues={openTheModalWithValues}
            />
          );
        }}
        setIsOpen={setIsOpen}
        globalLeave={isGlobalLeave}
        financialYearData={financialYearData}
        getAllGlobalLLF={getAllGlobalLLF}
        copyFromFyToNewFy={copyFromFyToNewFy}
      />

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={bdmStyleObject}
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
                    style={{ width: "100%" }}
                    value={
                      globalLeaveLossFactorData.financialYear.financialYearName
                    }
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
                      setGlobalLeaveLoseFactorData({
                        ...globalLeaveLossFactorData,
                        financialYear: {
                          ...globalLeaveLossFactorData.financialYear,
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
                  <label for="email">Month</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    value={globalLeaveLossFactorData.month}
                    onChange={(e) => {
                      setGlobalLeaveLoseFactorData({
                        ...globalLeaveLossFactorData,
                        month: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">OnSite (%)</label>
                  <input
                    type="number"
                    id="email"
                    spellcheck="false"
                    value={globalLeaveLossFactorData.onSite}
                    onChange={(e) => {
                      setGlobalLeaveLoseFactorData({
                        ...globalLeaveLossFactorData,
                        onSite: e.target.value,
                      });
                    }}
                  />
                  <span style={{ textAlign: "start" }}></span>
                </div>
                <div>
                  <label for="email">OffShore (%)</label>
                  <input
                    type="number"
                    id="email"
                    spellcheck="false"
                    value={globalLeaveLossFactorData.offShore}
                    onChange={(e) => {
                      setGlobalLeaveLoseFactorData({
                        ...globalLeaveLossFactorData,
                        offShore: e.target.value,
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
  openTheModalWithValues,
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
                onClick={(e) => {
                  openTheModalWithValues(e, financialYear.financialYearName);
                }}
              >
                <AiIcons.AiOutlineEdit />
                Edit
              </a>
              {/* <a style={{ padding: "5px" }}>
                <AiIcons.AiOutlineDelete /> Delete
              </a> */}
              <a style={{ padding: "5px" }}>
                <AiIcons.AiOutlineCheckCircle /> Activate
              </a>
              <a style={{ padding: "5px" }}>
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
                    value={responseData.financialYear.financialYearName}
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
                  <span>%</span>
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
