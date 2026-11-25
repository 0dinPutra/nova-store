import {
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { useStore } from "../context/useStore";

function Notification() {

  const { notifications } = useStore();

  return (

    <div className="notification-container">

      {notifications.map((notification) => (

        <div
          key={notification.id}
          className={`toast-notification ${
            notification.type === "error" ? "error" : "success"
          }`}
        >

          {notification.type === "error"
            ? <AlertCircle size={19} />
            : <CheckCircle size={19} />
          }

          <span>{notification.message}</span>

        </div>

      ))}

    </div>

  );

}

export default Notification;