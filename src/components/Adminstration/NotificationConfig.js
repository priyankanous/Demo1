import React,{useState,useEffect} from 'react';
import { AiOutlineClose } from "react-icons/ai";
import Modal from 'react-modal';
import { modalStyleObject, notificationModalStyleObj } from "../../utils/constantsValue";
import { ModalHeading,ModalIcon } from "../NavigationMenu/Value";
import BaseComponent from "../CommonComponent/BaseComponent";
import EmailNotificationSetup from './EmailNotificationSetup';

const NotificationConfig = ()=>{
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const [loadEmailSetup,setEmailSetup] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
      });
  }, []);

  return (
    <div>
      <BaseComponent
        field="Notification Templates"
        actionButtonName="Create new Email Templates"
        columns={["Id", "Templ. Code", "Name"," "]}
        data={data}
        Tr={Tr}
        setIsOpen={setIsOpen}
      />
      <Modal isOpen={isOpen} style={notificationModalStyleObj}>
        <EmailNotificationSetup setIsOpen={setIsOpen}/>
      </Modal>
    </div>
  );
}

function Tr({ userId, id, title, completed }) {
    return (
      <tr>
        <td>
          <span>{id || "Unknown"}</span>
        </td>
        <td>
          <span>{userId || "Unknown"}</span>
        </td>
        <td>
          <span>{title || "Unknown"}</span>
        </td>
        <td>
          <span>{completed || "Unknown"}</span>
        </td>
      </tr>
    );
  }

export default NotificationConfig
