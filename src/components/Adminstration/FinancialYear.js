import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../../utils/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function BusinessType() {
  const [financialYear, setFinancialYear] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [financialYearFormData, setfinancialYearFormData] = useState({
    financialYearName: "",
    financialYearCustomName: "",
    startingFrom: "",
    endingOn: "",
  });
  const [isEditId, setIsEditId] = useState(null);
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fetchFinancialYearData = async () => {
    const { data } = await axios.get(
      "http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year"
    );
    console.log(data);
    setFinancialYear(data?.data);
  };

  useEffect(() => {
    fetchFinancialYearData();
  }, []);

  const setFinancialYearData = async () => {
    const {
      financialYearCustomName,
      financialYearName,
      endingOn,
      startingFrom,
    } = financialYearFormData;
    console.log(startingFrom);
    const startingFromDt = `${
      parseInt(new Date(startingFrom).getDate()) < 10
        ? "0" + parseInt(new Date(startingFrom).getDate())
        : parseInt(new Date(startingFrom).getDate())
    }/${month[new Date(startingFrom).getMonth()]}/${new Date(
      startingFrom
    ).getFullYear()}`;
    const endingOnDt = `${
      parseInt(new Date(endingOn).getDate()) < 10
        ? "0" + parseInt(new Date(endingOn).getDate())
        : parseInt(new Date(endingOn).getDate())
    }/${month[new Date(endingOn).getMonth()]}/${new Date(
      endingOn
    ).getFullYear()}`;
    let financialYearData = {
      financialYearCustomName,
      financialYearName,
      endingOn: endingOnDt,
      startingFrom: startingFromDt,
    };
    if (isEditId !== null) {
      var { data } = await axios.put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/${isEditId}`,
        financialYearData
      );
    } else {
      var { data } = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year",
        financialYearData
      );
    }
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchFinancialYearData();
      setIsEditId(null);
      setfinancialYearFormData({
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      });
    }
  };

  const openTheModalWithValues = async (e, id) => {
    const { data } = await axios.get(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setfinancialYearFormData({
        financialYearName: data?.data?.financialYearName,
        financialYearCustomName: data?.data?.financialYearCustomName,
        startingFrom: createDate(data?.data?.startingFrom),
        endingOn: createDate(data?.data?.endingOn),
      });
      setIsOpen(true);
      setIsEditId(id);
    }
  };

  const createDate = (date) => {
    let splitDate = date.split("/");
    let monthDate = `${
      month.indexOf(splitDate[1]) + 1 < 10
        ? "0" + String(month.indexOf(splitDate[1]) + 1)
        : month.indexOf(splitDate[1]) + 1
    }`;
    return `${splitDate[2]}-${monthDate}-${splitDate[0]}`;
  };

  const deleteSelectedLocation = async (id) => {
    const { data } = await axios.delete(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchFinancialYearData();
      setIsEditId(null);
      setfinancialYearFormData({
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      });
    }
  };
  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/financial-year/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setIsOpen(false);
      fetchFinancialYearData();
      setIsEditId(null);
      setfinancialYearFormData({
        financialYearName: "",
        financialYearCustomName: "",
        startingFrom: "",
        endingOn: "",
      });
    }
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Financial Year"
        columns={["Name", "Custom Name", "Active From", "Active Until", " "]}
        data={financialYear}
        Tr={(obj) => {
          return (
            <Tr
              activeDeactivateTableData={activeDeactivateTableData}
              openTheModalWithValues={openTheModalWithValues}
              deleteSelectedLocation={deleteSelectedLocation}
              data={obj}
            />
          );
        }}
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
              <ModalHeading>Setup Financial Year</ModalHeading>
              <ModalIcon
                onClick={() => {
                  setIsOpen(false);
                  setIsEditId(null);
                  setfinancialYearFormData({
                    financialYearName: "",
                    financialYearCustomName: "",
                    startingFrom: "",
                    endingOn: "",
                  });
                }}
              >
                <AiOutlineClose></AiOutlineClose>
              </ModalIcon>
              <hr color="#62bdb8"></hr>
              <form id="reg-form">
                <div>
                  <label for="name">Name</label>
                  <input
                    type="text"
                    id="business-type-name"
                    value={financialYearFormData?.financialYearName}
                    onChange={(e) => {
                      setfinancialYearFormData({
                        ...financialYearFormData,
                        financialYearName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Display Name</label>
                  <input
                    type="text"
                    id="business-type-display-name"
                    value={financialYearFormData?.financialYearCustomName}
                    onChange={(e) => {
                      setfinancialYearFormData({
                        ...financialYearFormData,
                        financialYearCustomName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Active From</label>
                  <input
                    type="date"
                    id="email"
                    spellcheck="false"
                    value={financialYearFormData?.startingFrom}
                    onChange={(e) => {
                      setfinancialYearFormData({
                        ...financialYearFormData,
                        startingFrom: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Active Untill</label>
                  <input
                    type="date"
                    id="email"
                    spellcheck="false"
                    value={financialYearFormData?.endingOn}
                    onChange={(e) => {
                      setfinancialYearFormData({
                        ...financialYearFormData,
                        endingOn: e.target.value,
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
                      onClick={() => {
                        setFinancialYearData();
                      }}
                    />
                    <input
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setIsEditId(null);
                        setfinancialYearFormData({
                          financialYearName: "",
                          financialYearCustomName: "",
                          startingFrom: "",
                          endingOn: "",
                        });
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
  data: {
    financialYearName,
    financialYearCustomName,
    startingFrom,
    endingOn,
    financialYearId,
    isActive,
  },
  activeDeactivateTableData,
  openTheModalWithValues,
  deleteSelectedLocation,
}) {
  const [isDropdown, setDropdown] = useState(false);

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
    isDropdown ? setDropdown(false) : setDropdown(true);
  };
  return (
    <tr ref={wrapperRef}>
      <td className={!isActive && "disable-table-row"}>
        <span>{financialYearName || "Unknown"}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{financialYearCustomName || "Unknown"}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{startingFrom || "Unknown"}</span>
      </td>
      <td className={!isActive && "disable-table-row"}>
        <span>{endingOn || "Unknown"}</span>
      </td>
      <td data-id={financialYearId}>
        <span style={{ float: "right" }}>
          <AiIcons.AiOutlineMore
            onClick={(e) => closeDropDown(isDropdown)}
          ></AiIcons.AiOutlineMore>
          {isDropdown && (
            <div style={{ float: "right" }} class="dropdown-content">
              <a
                onClick={(e) => {
                  openTheModalWithValues(e, financialYearId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineEdit /> Edit
              </a>
              {/* <a
                onClick={() => {
                  deleteSelectedLocation(financialYearId);
                }}
                href="#about"
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineDelete /> Delete
              </a> */}
              <a
                className={isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(financialYearId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineCheckCircle /> Activate
              </a>
              <a
                className={!isActive && "disable-table-row"}
                onClick={() => {
                  activeDeactivateTableData(financialYearId);
                }}
                style={{ padding: "5px" }}
              >
                <AiIcons.AiOutlineCloseCircle /> Deactivate
              </a>
            </div>
          )}{" "}
        </span>
      </td>
    </tr>
  );
}

export default BusinessType;
