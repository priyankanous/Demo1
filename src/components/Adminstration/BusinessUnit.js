import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { modalStyleObject } from "../../utils/constantsValue";
import { ModalHeading, ModalIcon } from "../NavigationMenu/Value";
import { MemoizedBaseComponent } from "../CommonComponent/AdminBaseComponent";
import axios from "axios";
import * as AiIcons from "react-icons/ai";

function BuisnessUnit() {
  const [data, setData] = useState(null);
  const [orgNameData, setOrgNameData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [businessUnitData, setBusinessUnitData] = useState({
    businessUnitName: "",
    businessUnitDisplayName: "",
    organization: { id: "", orgName: "", orgDisplayName: "" },
  });

  useEffect(() => {
    getAllBuData();
  }, []);

  const getAllBuData = () => {
    getOrgNameData();
    axios
      .get(
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit`
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setData(actualDataObject);
      });
  };
  const getOrgNameData = () => {
    axios
      .get(`http://192.168.16.55:8080/rollingrevenuereport/api/v1/organization`)
      .then((response) => {
        const actualDataObject = response.data.data;
        setOrgNameData(actualDataObject);
      });
  };
  const AddDataToBu = async (e) => {
    try {
      const response = await axios.post(
        "http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit",
        businessUnitData
      );
      setIsOpen(false);
      getAllBuData();
    } catch {}
  };
  return (
    <React.Fragment>
      <div>
        <MemoizedBaseComponent
          field="Business Unit"
          columns={["Name", "Display Name", "Parent Organization"]}
          data={data}
          Tr={(obj) => {
            return (
              <Tr
                data={obj}
                getAllBuData={getAllBuData}
                orgNameData={orgNameData}
                setBusinessUnitData={setBusinessUnitData}
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
                <ModalHeading>Setup Business Unit</ModalHeading>
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
                    <label for="name"> Name</label>
                    <input
                      type="text"
                      id="name"
                      spellcheck="false"
                      onChange={(e) => {
                        setBusinessUnitData({
                          ...businessUnitData,
                          businessUnitName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label for="email"> Display Name</label>
                    <input
                      type="text"
                      id="email"
                      spellcheck="false"
                      onChange={(e) => {
                        setBusinessUnitData({
                          ...businessUnitData,
                          businessUnitDisplayName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label for="username">Parent Organization</label>
                    <select
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        const selectedId =
                          e.target.selectedOptions[0].getAttribute(
                            "data-orgId"
                          );
                        const selectedOrgDispName =
                          e.target.selectedOptions[0].getAttribute(
                            "data-orgDispName"
                          );

                        setBusinessUnitData({
                          ...businessUnitData,
                          organization: {
                            ...businessUnitData.organization,
                            id: selectedId,
                            orgName: e.target.value,
                            orgDisplayName: selectedOrgDispName,
                          },
                        });
                      }}
                    >
                      <option value="" disabled selected hidden>
                        Please choose one option
                      </option>
                      {orgNameData.map((orgDataName, index) => {
                        const orgName = orgDataName.orgName;
                        const orgId = orgDataName.id;
                        const orgDisplayName = orgDataName.orgDisplayName;
                        if (orgDataName.isActive) {
                          return (
                            <option
                              data-orgId={orgId}
                              data-orgDispName={orgDisplayName}
                              key={index}
                            >
                              {orgName}
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
                        onClick={AddDataToBu}
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
    </React.Fragment>
  );
}

function Tr({
  getAllBuData,
  setBusinessUnitData,
  orgNameData,
  data: {
    businessUnitId,
    businessUnitName,
    businessUnitDisplayName,
    isActive,
    organization,
  },
}) {
  const [isDropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    businessUnitId: businessUnitId,
    businessUnitName: businessUnitName,
    businessUnitDisplayName: businessUnitDisplayName,
    organization: {
      id: organization.id,
      orgName: organization.orgName,
      orgDisplayName: organization.orgDisplayName,
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
        `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/${businessUnitId}`,
        responseData
      )
      .then((response) => {
        const actualDataObject = response.data.data;
        setIsOpen(false);
        getAllBuData();
      });
  };
  // API calls to delete Record

  // const DeleteRecord = () => {
  //   axios
  //     .delete(
  //       `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/${businessUnitId}`,
  //       responseData
  //     )
  //     .then((response) => {
  //       const actualDataObject = response.data.data;
  //       getAllBuData();
  //       setIsOpen(false);
  //     });
  // };

  const activeDeactivateTableData = async (id) => {
    const { data } = await axios.put(
      `http://192.168.16.55:8080/rollingrevenuereport/api/v1/business-unit/activate-or-deactivate/${id}`
    );
    if (data?.message === "Success" && data?.responseCode === 200) {
      setBusinessUnitData({
        businessUnitName: "",
        businessUnitDisplayName: "",
        organization: { id: "", orgName: "", orgDisplayName: "" },
      });
      setIsOpen(false);
      getAllBuData();
    }
  };

  return (
    <React.Fragment>
      <tr ref={wrapperRef}>
        <td className={!isActive && "disable-table-row"}>
          <span>{businessUnitName || "Unknown"}</span>
        </td>
        <td className={!isActive && "disable-table-row"}>
          <span>{businessUnitDisplayName || "Unknown"}</span>
        </td>
        <td>
          <span className={!isActive && "disable-table-row"}>
            {organization.orgName || "Unknown"}
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
                  onClick={() => {
                    DeleteRecord();
                  }}
                >
                  <AiIcons.AiOutlineDelete /> Delete
                </a> */}
                <a
                  style={{ padding: "5px" }}
                  className={isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(businessUnitId);
                  }}
                >
                  <AiIcons.AiOutlineCheckCircle /> Activate
                </a>
                <a
                  className={!isActive && "disable-table-row"}
                  onClick={() => {
                    activeDeactivateTableData(businessUnitId);
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
                  <label for="bu_name">Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.businessUnitName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        businessUnitName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="bu_disp_name">Display Name</label>
                  <input
                    type="text"
                    id="id"
                    spellcheck="false"
                    value={responseData.businessUnitDisplayName}
                    onChange={(e) => {
                      setResponseData({
                        ...responseData,
                        businessUnitDisplayName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <label for="parent_Organisation">Parent Organization</label>
                  <select
                    value={responseData.organization.orgName}
                    onChange={(e) => {
                      const selectedId =
                        e.target.selectedOptions[0].getAttribute("data-orgId");
                      const selectedOrgDispName =
                        e.target.selectedOptions[0].getAttribute(
                          "data-orgDispName"
                        );
                      setResponseData({
                        ...responseData,
                        organization: {
                          ...responseData.organization,
                          id: selectedId,
                          orgName: e.target.value,
                          orgDisplayName: selectedOrgDispName,
                        },
                      });
                    }}
                  >
                    <option value="" disabled selected hidden>
                      Please choose one option
                    </option>
                    {orgNameData.map((orgDataName, index) => {
                      const orgName = orgDataName.orgName;
                      const orgId = orgDataName.id;
                      const orgDisplayName = orgDataName.orgDisplayName;
                      if (orgDataName.isActive) {
                        return (
                          <option
                            data-orgId={orgId}
                            data-orgDispName={orgDisplayName}
                            key={index}
                          >
                            {orgName}
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

export default BuisnessUnit;
