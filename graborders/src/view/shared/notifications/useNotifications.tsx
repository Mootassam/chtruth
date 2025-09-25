import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export default function useNotifications(userId: string, isAdmin: boolean = false) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("http://localhost:8084", {
        transports: ["websocket"], // ensure stable connection
      });
    }

    // Register user/admin on connect
    socket.emit("register", { userId, isAdmin });

    // Debug success message
    socket.on("success", (data) => {
      console.log("✅ Backend says:", data);
    });

    // Listen to new notifications
    socket.on("newNotification", (notif) => {
      console.log("🔔 New notification:", notif);
      setNotifications((prev) => [notif, ...prev]);
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
