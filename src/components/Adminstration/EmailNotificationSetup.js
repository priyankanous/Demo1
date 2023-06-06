import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  ModalFormButton,
  ModalHeading,
  ModalIcon,
  NotificationArrowIcons,
} from "../../utils/Value";
import {
  AiOutlineRight,
  AiOutlineCaretRight,
  AiOutlineCaretLeft,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlinePaperClip,
  AiOutlineUnderline,
  AiFillFileText,
  AiFillQuestionCircle,
  AiOutlineSearch,
} from "react-icons/ai";

const EmailNotificationSetup = ({ setIsOpen }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [availableUsers, setavailUsers] = useState([
    "Hulk",
    "Iron man",
    "Captain America",
    "Spider man",
    "Thor",
    "Black widow",
    "Black panther",
    "Loki",
  ]);
  const [selectedusers, setSelectedusers] = useState([
    "Batman",
    "Super man",
    "Wonder woman",
    "Flash",
    "Green lantern",
    "Aquaman",
    "Cyborg",
  ]);
  const [activeClass, setActiveClass] = useState(true);
  const [setUser, setActiveUser] = useState("");

  const cutAndPasteToUsers = (typeofuser) => {
    // if (typeofuser === 'availablePerson'){
    //     setSelectedusers([...availableUsers,setUser]);
    //     const avaialbleUsers = [...availableUsers];
    //     avaialbleUsers.filter
    // }
  };

  const highlightBackground = (e, key) => {
    console.log(key, e.target);
    e.target.style.color = "pink";
    setActiveClass(false);
    setActiveUser(key);
  };

  return (
    <>
      <ModalHeading>Setup Work Order Status</ModalHeading>
      <hr color="#62bdb8"></hr>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Template Details</Tab>
          <Tab>Email Contents</Tab>
          <Tab>Recipient Options</Tab>
        </TabList>
        <TabPanel>
          <div>
            <div class="main" className="ModalContainer">
              <div class="register notification-email">
                {/* <ModalHeading>Setup Work Order Status</ModalHeading>
                            <ModalIcon onClick={()=>{setIsOpen(false)}}><AiOutlineClose></AiOutlineClose></ModalIcon> */}
                <form id="notification-email-form">
                  <div>
                    <label for="name">ID:</label>
                    <input type="text" id="name" disabled />
                  </div>
                  <div>
                    <label for="templateCode">Template Code:</label>
                    <input type="text" id="templateCode" />
                  </div>
                  <div>
                    <label for="template-name">Name:</label>
                    <input type="text" id="template-name" />
                  </div>
                  <div>
                    <label for="template-desc">Description:</label>
                    <textarea
                      style={{ width: "100%" }}
                      type="text"
                      id="template-desc"
                    ></textarea>
                  </div>
                  <ModalFormButton>
                    <input
                      type="button"
                      onClick={() => {
                        setTabIndex(1);
                      }}
                      value="Continue"
                      id="create-account"
                      class="button notification-button"
                    />
                    <input
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      value="Cancel"
                      id="create-account"
                      class="button notification-button"
                    />
                  </ModalFormButton>
                </form>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="align-email-contents-notification">
            <div className="email-notification-form">
              <div className="row-1">
                <label className="email-label">From:</label>
                <input
                  className="email-input"
                  value="From of email here"
                  type="text"
                  disabled
                />
              </div>
              <div className="row-1">
                <label className="email-label">Subject:</label>
                <input
                  className="email-input"
                  value="Subject of email here"
                  type="text"
                  disabled
                />
              </div>
              <div className="row-1">
                <label className="email-label">Body:</label>
                {/* <input className='email-input' value='Value is coming here brother'  type='text' disabled/> */}
                <div className="email-input style-email-icons">
                  <select disabled>
                    <option>Paragraph</option>
                  </select>
                  <span className="email-icons">
                    <i>
                      <AiOutlineBold />
                    </i>
                    <i>
                      <AiOutlineItalic />
                    </i>
                    <i>
                      <AiOutlineOrderedList />
                    </i>
                    <i>
                      <AiOutlineAlignLeft />
                    </i>
                    <i>
                      <AiOutlineAlignCenter />
                    </i>
                    <i>
                      <AiOutlinePaperClip />
                    </i>
                    <i>
                      <AiOutlineUnderline />
                    </i>
                    <i>
                      <AiFillFileText />
                    </i>
                    <i>
                      <AiFillQuestionCircle></AiFillQuestionCircle>
                    </i>
                  </span>
                </div>
              </div>
              <div className="row-1">
                <textarea className="email-input email-notification-textarea"></textarea>
              </div>
            </div>
            <div className="email-contents-variables">
              <span>
                <i>
                  <AiOutlineRight />
                </i>
                Variables
              </span>
              <div>
                <input
                  placeholder="Enter your value"
                  type="text"
                  disabled
                ></input>
                <i className="align-search-icon">
                  <AiOutlineSearch />
                </i>
              </div>
              <div>
                <p>
                  <i>
                    <AiOutlineRight />
                  </i>
                  Recipient
                </p>
                <p>
                  <i>
                    <AiOutlineRight />
                  </i>
                  Submission status
                </p>
                <p>
                  <i>
                    <AiOutlineRight />
                  </i>
                  Due Date
                </p>
                <p>
                  <i>
                    <AiOutlineRight />
                  </i>
                  SBU Name
                </p>
                <p>
                  <i>
                    <AiOutlineRight />
                  </i>
                  Week Number
                </p>
              </div>
            </div>
          </div>

          <ModalFormButton>
            <input
              type="button"
              onClick={() => {
                setTabIndex(2);
              }}
              value="Continue"
              id="create-account"
              class="button notification-button"
            />
            <input
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
              value="Cancel"
              id="create-account"
              class="button notification-button"
            />
          </ModalFormButton>
        </TabPanel>
        <TabPanel>
          <h3 style={{ padding: "2px 0px" }}>
            Recipients (additional to programmed recipients)
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "",
              margin: "4px 0px",
            }}
          >
            <div
              style={{
                background: "",
                width: "30%",
                maxHeight: "300px",
                borderRadius: "10px",
                boxShadow: "1px 2px 3px 4px rgba(12,12,12,0.2)",
              }}
            >
              <p
                style={{
                  background: "",
                  margin: "2px 0px",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                Available Users
              </p>
              <div style={{ overflowY: "auto", height: "250px" }}>
                <ul>
                  {availableUsers.map((value, index) => {
                    return (
                      <li
                        key={index}
                        onClick={(e) => {
                          highlightBackground(e, value, "availableUsers");
                        }}
                      >
                        {value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <NotificationArrowIcons
              style={{
                width: "20%",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                color: "#0a8b9c",
              }}
            >
              <i
                onClick={() => {
                  cutAndPasteToUsers("availablePerson");
                }}
                disabled={!activeClass}
              >
                <AiOutlineCaretRight />
              </i>
              <i
                disabled={!activeClass}
                onClick={() => {
                  cutAndPasteToUsers("selectedUsers");
                }}
              >
                <AiOutlineCaretLeft />
              </i>
            </NotificationArrowIcons>
            <div
              style={{
                background: "",
                width: "30%",
                height: "300px",
                borderRadius: "10px",
                boxShadow: "1px 2px 3px 4px rgba(12,12,12,0.2)",
              }}
            >
              <p
                style={{
                  background: "",
                  margin: "2px 0px",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                Selected Users
              </p>
              <div style={{ overflowY: "auto", height: "250px" }}>
                <ul>
                  {selectedusers.map((value, index) => {
                    return (
                      <li
                        key={index}
                        onClick={(e) => {
                          highlightBackground(e, value, "selectedUsers");
                        }}
                      >
                        {value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <ModalFormButton>
            <input
              type="button"
              onClick={() => {
                setTabIndex(1);
              }}
              value="Save Email template"
              id="create-account"
              class="button notification-button"
            />
            <input
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
              value="Cancel"
              id="create-account"
              class="button notification-button"
            />
          </ModalFormButton>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default EmailNotificationSetup;
