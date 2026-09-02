import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import socket from "../../socket/socket.js";

import {
  selectIsAuthenticated,
  selectUser,
} from "../../features/auth/authSelectors.js";

import {
  getNewNotificationCount,
} from "../../features/notifications/notificationThunks.js";

const NotificationSocket = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!isAuthenticated || !user?._id) {
      return;
    }

    socket.connect();

    const handleConnect = () => {
      socket.emit("join", user._id);
    };

    const handleNewNotification = (notification) => {
      dispatch(getNewNotificationCount());
    };

    socket.on("connect", handleConnect);
    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("newNotification", handleNewNotification);

      socket.disconnect();
    };
  }, [isAuthenticated, user?._id, dispatch]);

  return null;
};

export default NotificationSocket;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import socket from "../../socket/socket.js";

// import {
//   selectIsAuthenticated,
//   selectUser,
// } from "../../features/auth/authSelectors.js";

// import {
//   getNewNotificationCount,
// } from "../../features/notifications/notificationThunks.js";

// const NotificationSocket = () => {
//   const dispatch = useDispatch();

//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const user = useSelector(selectUser);

//   useEffect(() => {
//     if (!isAuthenticated || !user?._id) {
//       console.log("Socket not started:", {
//         isAuthenticated,
//         userId: user?._id,
//       });

//       return;
//     }

//     socket.connect();

//     const handleConnect = () => {
//       // Join this user's room
//       socket.emit("join", user._id);
//     };

//     const handleNewNotification = (notification) => {
//       dispatch(getNewNotificationCount());
//     };

//     socket.on("connect", handleConnect);
//     socket.on("newNotification", handleNewNotification);

//     return () => {
//       socket.off("connect", handleConnect);
//       socket.off("newNotification", handleNewNotification);

//       socket.disconnect();
//     };
//   }, [isAuthenticated, user?._id, dispatch]);

//   return null;
// };

// export default NotificationSocket;