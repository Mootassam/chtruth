import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";
import notificationListActions from "src/modules/notification/list/notificationListActions";

let socket: Socket | null = null;

export default function useNotifications(
  userId: string,
  isAdmin: boolean = false
) {
  const [notifications, setNotifications] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("http://159.198.77.158:8084", {
        transports: ["websocket"], // ensure stable connection
      });
    }

    // Register user/admin on connect
    socket.emit("register", { userId, isAdmin });

    // Debug success message
    socket.on("success", (data) => {
    });

    // Listen to new notifications
    socket.on("newNotification", (notif) => {
      dispatch(notificationListActions.doFetch());
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off("success");
        socket.off("newNotification");
      }
    };
  }, [userId, isAdmin]);

  return { notifications };
}
