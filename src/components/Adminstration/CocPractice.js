import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/BaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function CocPractice() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buNameData, setBuNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cocPracticeData, setCocPracticeData] = useState({
    cocPracticeName: "",
    cocPracticeDisplayName: "",
    businessUnit: {
      businessUnitId: "",
      businessUnitName: "",
      businessUnitDisplayName: "",
      organization: {
        id: 0,
        orgName: "",
        orgDisplayName: "",
      },
    },
  });

  useEffect(() => {
    getAllCocData();
  }, []);

  const getAllCocData = () => {
    getAllBuNameData();
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const getAllBuNameData = () => {
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setBuNameData(actualDataObject);
      });
  };
  const AddDataToCocPractice = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice",
        cocPracticeData
      );
      console.log("this is the response", response.data);
      getAllCocData();
      setIsOpen(false);
    } catch {}
  };

  return (
    <div>
      <MemoizedBaseComponent
        field="Coc Practice"
        actionButtonName="Setup Coc Practice"
        columns={["Name", " Display Name", "Parent Business Unit"]}
        data={data}
        Tr={(obj) => {
          return (
            <Tr
              data={obj}
              buNameData={buNameData}
              getAllCocData={getAllCocData}
              setCocPracticeData={setCocPracticeData}
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
              <ModalHeading>Setup CoC Practice</ModalHeading>
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
                  <label for="email">Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCocPracticeData({
                        ...cocPracticeData,
                        cocPracticeName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="username">Display Name</label>
                  <input
                    type="text"
                    id="email"
                    spellcheck="false"
                    onChange={(e) => {
                      setCocPracticeData({
                        ...cocPracticeData,
                        cocPracticeDisplayName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Parent Business Unit</label>
                  <select
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );
                      const selectedOrgId =
                        e.target.selectedOptions[0].getAttribute("data-orgId");
                      const selectedOrgDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgDisplayName"
                        );
                      const selectedOrgName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgName"
                        );

                      setCocPracticeData({
                        ...cocPracticeData,
                        businessUnit: {
                          ...cocPracticeData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          organization: {
                            ...cocPracticeData.businessUnit.organization,
                            id: selectedOrgId,
                            orgName: selectedOrgName,
                            orgDisplayName: selectedOrgDispName,
                          },
                        },
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {buNameData.map((buData, index) => {
                      const buNameData = buData.businessUnitName;
                      const buId = buData.businessUnitId;
                      const buDisplayName = buData.businessUnitDisplayName;
                      const orgId = buData.organization.id;
                      const orgName = buData.organization.orgName;
                      const orgDisplayName = buData.organization.orgDisplayName;
                      if (buData.isActive) {
                        return (
                          <option
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            data-orgId={orgId}
                            data-orgName={orgName}
                            data-orgDisplayName={orgDisplayName}
                            key={index}
                          >
                            {buNameData}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div>
                  <label>
                    <input
                      type="button"
                      value="Save"
                      id="create-account"
                      class="button"
                      onClick={AddDataToCocPractice}
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
  getAllCocData,
  setCocPracticeData,
  buNameData,
  data: {
    cocPracticeId,
    cocPracticeName,
    cocPracticeDisplayName,
    businessUnit,
    isActive,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    cocPracticeId: cocPracticeId,
    cocPracticeName: cocPracticeName,
    cocPracticeDisplayName: cocPracticeDisplayName,
    businessUnit: {
      businessUnitId: businessUnit.businessUnitId,
      businessUnitName: businessUnit.businessUnitName,
      businessUnitDisplayName: businessUnit.businessUnitDisplayName,
      organization: {
        id: businessUnit.organization.id,
        orgName: businessUnit.organization.orgName,
        orgDisplayName: businessUnit.organization.orgDisplayName,
      },
    },
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

  const closeDropDown = () => {
    isDropdown ? setDropdown(false) : setDropdown(true);
  };

  const OnSubmit = () => {
    axios
      .put(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/${cocPracticeId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllCocData();
      });
  };
  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setCocPracticeData({
        cocPracticeName: "",
        cocPracticeDisplayName: "",
        businessUnit: {
          businessUnitId: "",
          businessUnitName: "",
          businessUnitDisplayName: "",
          organization: {
            id: 0,
            orgName: "",
            orgDisplayName: "",
          },
        },
      });
      setIsOpen(false);
      getAllCocData();
    }
  };
  // API calls to delete Record

  // const DeleteRecord = () => {
  //   axios
  //     .delete(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/cocpractice/${cocPracticeId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllCocData();
  //       setIsOpen(false);
  //     });
  // };

  return (
    <React.Fragment>
      <tr ref={wrapperRef}>
        <td className={!isActive && "disable-table-row"}>
          <span>{cocPracticeName || "Unknown"}</span>
        </td>
        <td className={!isActive && "disable-table-row"}>
          <span>{cocPracticeDisplayName || "Unknown"}</span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {businessUnit.businessUnitName || "Unknown"}
          </span>
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
                {/* <a
                  style={{ padding: "5px" }}
                  onClick={(e) => {
                    DeleteRecord();
                  }}
                >
                  <AiIcons.AiOutlineDelete /> Delete
                </a> */}
                <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(cocPracticeId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(cocPracticeId);
                  }}
                  style={{ padding: "5px" }}
                >
                  <AiIcons.AiOutlineCloseCircle /> Deactivate
                </a>
              </div>
            )}
          </span>
        </td>
      </tr>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={modalStyleObject}
      >
        <div>
          <div class="main" className="ModalContainer">
            <div class="register">
              <ModalHeading>Edit Business Unit</ModalHeading>
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
                  <label for="coc_name">Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.cocPracticeName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        cocPracticeName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="coc_disp_name">Display Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.cocPracticeDisplayName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        cocPracticeDisplayName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="email">Parent Business Unit</label>
                  <select
                    value={responseData.businessUnit.businessUnitName}
                    onChange={(e) => {
                      const selectedBuId =
                        e.target.selectedOptions[0].getAttribute("data-buId");
                      const selectedBuDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-buDisplayName"
                        );
                      const selectedOrgId =
                        e.target.selectedOptions[0].getAttribute("data-orgId");
                      const selectedOrgDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgDisplayName"
                        );
                      const selectedOrgName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgName"
                        );

                      setResponseData({
                        ...responseData,
                        businessUnit: {
                          ...responseData.businessUnit,
                          businessUnitId: selectedBuId,
                          businessUnitName: e.target.value,
                          businessUnitDisplayName: selectedBuDispName,
                          organization: {
                            ...responseData.businessUnit.organization,
                            id: selectedOrgId,
                            orgName: selectedOrgName,
                            orgDisplayName: selectedOrgDispName,
                          },
                        },
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {buNameData.map((buData, index) => {
                      const buNameData = buData.businessUnitName;
                      const buId = buData.businessUnitId;
                      const buDisplayName = buData.businessUnitDisplayName;
                      const orgId = buData.organization.id;
                      const orgName = buData.organization.orgName;
                      const orgDisplayName = buData.organization.orgDisplayName;
                      if (buData.isActive) {
                        return (
                          <option
                            data-buId={buId}
                            data-buDisplayName={buDisplayName}
                            data-orgId={orgId}
                            data-orgName={orgName}
                            data-orgDisplayName={orgDisplayName}
                            key={index}
                          >
                            {buNameData}
                          </option>
                        );
                      }
                    })}
                  </select>
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
    </React.Fragment>
  );
}

export default CocPractice;
